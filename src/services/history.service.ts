import { History, IHistory, TransactionType } from '../models/history.model';
import { HttpException } from '../exceptions/HttpException';

export class HistoryService {
  public async createHistoryEntry(historyData: Partial<IHistory>): Promise<IHistory> {
    try {
      const history = new History(historyData);
      return await history.save();
    } catch (error) {
      throw new HttpException(400, 'Error creating history entry');
    }
  }

  public async getHistory(): Promise<IHistory[]> {
    try {
      return await History.find().sort({ date: -1 });
    } catch (error) {
      throw new HttpException(400, 'Error fetching history');
    }
  }

  public async getHistoryByType(type: TransactionType): Promise<IHistory[]> {
    try {
      return await History.find({ type }).sort({ date: -1 });
    } catch (error) {
      throw new HttpException(400, 'Error fetching history by type');
    }
  }

  private getDateRange(period: 'today' | 'month' | 'all'): { startDate: Date; endDate: Date } {
    const now = new Date();
    const startDate = new Date();
    const endDate = new Date();

    switch (period) {
      case 'today':
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        break;
      case 'month':
        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0);
        endDate.setHours(23, 59, 59, 999);
        break;
      case 'all':
        startDate.setFullYear(1970);
        break;
    }

    return { startDate, endDate };
  }

  private async calculateTotals(startDate: Date, endDate: Date): Promise<{ income: number; expense: number; balance: number }> {
    try {
      const payments = await History.find({
        type: TransactionType.PAYMENT,
        date: { $gte: startDate, $lte: endDate }
      });

      const expenses = await History.find({
        type: TransactionType.EXPENSE,
        date: { $gte: startDate, $lte: endDate }
      });

      const income = payments.reduce((sum, payment) => sum + payment.amount, 0);
      const expense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
      const balance = income - expense;

      return { income, expense, balance };
    } catch (error) {
      throw new HttpException(400, 'Error calculating totals');
    }
  }

  public async getHistorySummary(): Promise<{
    today: { income: number; expense: number; balance: number };
    month: { income: number; expense: number; balance: number };
    allTime: { income: number; expense: number; balance: number };
  }> {
    try {
      const todayRange = this.getDateRange('today');
      const monthRange = this.getDateRange('month');
      const allTimeRange = this.getDateRange('all');

      const [today, month, allTime] = await Promise.all([
        this.calculateTotals(todayRange.startDate, todayRange.endDate),
        this.calculateTotals(monthRange.startDate, monthRange.endDate),
        this.calculateTotals(allTimeRange.startDate, allTimeRange.endDate)
      ]);

      return {
        today,
        month,
        allTime
      };
    } catch (error) {
      throw new HttpException(400, 'Error calculating history summary');
    }
  }
} 