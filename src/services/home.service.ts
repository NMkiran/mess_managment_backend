
import { Member } from '../models/member.model';
import { Attendance, MealType } from '../models/attendance.model';
import { ExpenseModel } from '../models/expense.model';
import { HomeResponseDto, MealAttendance } from '../dtos/home.dto';
import { HttpException } from '../exceptions/HttpException';

export class HomeService {
  public async getDashboardData(): Promise<HomeResponseDto> {
    try {
      // Get member statistics
      const totalMembers = await Member.countDocuments();
      const activeMembers = await Member.countDocuments({ status: 'active' });
      const absentMembers = totalMembers - activeMembers;

      // Get today's date range
      const today = new Date();
      const startOfDay = new Date(today);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(today);
      endOfDay.setHours(23, 59, 59, 999);

      // Get attendance for today
      const todayAttendance = await Attendance.find({
        date: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      });

      // Calculate meal attendance
      const mealAttendance = {
        [MealType.BREAKFAST]: this.calculateMealAttendance(todayAttendance, MealType.BREAKFAST, activeMembers),
        [MealType.LUNCH]: this.calculateMealAttendance(todayAttendance, MealType.LUNCH, activeMembers),
        [MealType.DINNER]: this.calculateMealAttendance(todayAttendance, MealType.DINNER, activeMembers)
      };

      // Get expense statistics
      const totalExpenses = await this.getTotalExpenses();
      const todayExpenses = await this.getTodayExpenses(startOfDay, endOfDay);

      return {
        members: {
          total: totalMembers,
          active: activeMembers,
          absent: absentMembers
        },
        expenses: {
          total: totalExpenses,
          today: todayExpenses
        },
        attendance: mealAttendance
      };
    } catch (error) {
      throw new HttpException(400, 'Error fetching dashboard data');
    }
  }

  private calculateMealAttendance(attendance: any[], mealType: MealType, totalActiveMembers: number): MealAttendance {
    const count = attendance.filter(record => record.mealType === mealType).length;
    const percentage = totalActiveMembers > 0 ? (count / totalActiveMembers) * 100 : 0;
    return {
      count,
      percentage: Math.round(percentage * 100) / 100 // Round to 2 decimal places
    };
  }

  private async getTotalExpenses(): Promise<number> {
    const result = await ExpenseModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);
    return result[0]?.total || 0;
  }

  private async getTodayExpenses(startOfDay: Date, endOfDay: Date): Promise<number> {
    const result = await ExpenseModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay
          }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);
    return result[0]?.total || 0;
  }
} 