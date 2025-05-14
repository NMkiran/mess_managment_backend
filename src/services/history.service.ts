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

  public async getHistorySummary(): Promise<{ totalIncome: number; totalExpense: number; balance: number }> {
    try {
      const payments = await History.find({ type: TransactionType.PAYMENT });
      const expenses = await History.find({ type: TransactionType.EXPENSE });

      const totalIncome = payments.reduce((sum, payment) => sum + payment.amount, 0);
      const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      const balance = totalIncome - totalExpense;

      return { totalIncome, totalExpense, balance };
    } catch (error) {
      throw new HttpException(400, 'Error calculating history summary');
    }
  }
} 