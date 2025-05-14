import { Attendance, IAttendance, MealType } from '../models/attendance.model';
import { CreateAttendanceDto, AttendanceSummary } from '../dtos/attendance.dto';
import { HttpException } from '../exceptions/HttpException';

export class AttendanceService {
  public async createAttendance(attendanceData: CreateAttendanceDto): Promise<IAttendance> {
    try {
      const attendance = new Attendance({
        ...attendanceData,
        date: attendanceData.date || new Date(),
      });
      return await attendance.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException(400, 'Attendance already marked for this meal');
      }
      throw new HttpException(400, 'Error creating attendance');
    }
  }

  public async getAttendanceByDate(date: Date): Promise<IAttendance[]> {
    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      return await Attendance.find({
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      }).sort({ mealType: 1, memberName: 1 });
    } catch (error) {
      throw new HttpException(400, 'Error fetching attendance');
    }
  }

  public async getAttendanceByMember(memberId: string): Promise<IAttendance[]> {
    try {
      return await Attendance.find({ memberId }).sort({ date: -1 });
    } catch (error) {
      throw new HttpException(400, 'Error fetching member attendance');
    }
  }

  public async getDetailedAttendanceSummary(date: Date): Promise<AttendanceSummary> {
    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const attendance = await Attendance.find({
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });

      // Get unique members
      const uniqueMembers = new Map();
      const mealCounts = {
        [MealType.BREAKFAST]: 0,
        [MealType.LUNCH]: 0,
        [MealType.DINNER]: 0,
      };

      // Process attendance records
      attendance.forEach(record => {
        mealCounts[record.mealType]++;

        if (!uniqueMembers.has(record.memberId)) {
          uniqueMembers.set(record.memberId, {
            memberId: record.memberId,
            memberName: record.memberName,
            roomNumber: record.roomNumber,
            meals: {
              [MealType.BREAKFAST]: false,
              [MealType.LUNCH]: false,
              [MealType.DINNER]: false,
            },
          });
        }

        const member = uniqueMembers.get(record.memberId);
        member.meals[record.mealType] = true;
      });

      return {
        totalMembers: uniqueMembers.size,
        mealCounts,
        memberDetails: Array.from(uniqueMembers.values()),
      };
    } catch (error) {
      throw new HttpException(400, 'Error calculating detailed attendance summary');
    }
  }

  public async getAttendanceSummary(date: Date) {
    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
    } catch (error) {
      throw new HttpException(400, 'Error fetching attendance summary');
    }
  }
}
