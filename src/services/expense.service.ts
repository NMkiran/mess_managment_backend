import { Service } from 'typedi';
import { IExpense } from '@models/expense.model';
import { ExpenseModel } from '@models/expense.model';
import { HttpException } from '@/exceptions/HttpException';
import { HistoryService } from './history.service';
import { TransactionType } from '../models/history.model';

@Service()
export class ExpenseService {
  private historyService = new HistoryService();

  public async createExpense(expenseData: Partial<IExpense>): Promise<IExpense> {
    try {
      const expense = new ExpenseModel(expenseData);
      const savedExpense = await expense.save();

      // Create history entry
      await this.historyService.createHistoryEntry({
        type: TransactionType.EXPENSE,
        amount: expenseData.amount,
        date: new Date(),
        description: expenseData.description,
        category: expenseData.category,
        subCategory: expenseData.subCategory,
        imageUrl: expenseData.pic
      });

      return savedExpense;
    } catch (error) {
      throw new HttpException(400, 'Error creating expense');
    }
  }

  public async updateExpense(expenseId: string, expenseData: Partial<IExpense>): Promise<IExpense> {
    const updateExpenseData: IExpense = await ExpenseModel.findByIdAndUpdate(expenseId, expenseData, { new: true });
    if (!updateExpenseData) throw new HttpException(404, "Expense not found");

    return updateExpenseData;
  }

  public async getExpenseById(expenseId: string): Promise<IExpense> {
    const findExpense: IExpense = await ExpenseModel.findById(expenseId);
    if (!findExpense) throw new HttpException(404, "Expense not found");

    return findExpense;
  }

  public async getAllExpenses(): Promise<IExpense[]> {
    const expenses: IExpense[] = await ExpenseModel.find();
    return expenses;
  }

  public async deleteExpense(expenseId: string): Promise<IExpense> {
    const deleteExpenseData: IExpense = await ExpenseModel.findByIdAndDelete(expenseId);
    if (!deleteExpenseData) throw new HttpException(404, "Expense not found");

    return deleteExpenseData;
  }

  public async getExpensesByCategory(category: string): Promise<IExpense[]> {
    const expenses: IExpense[] = await ExpenseModel.find({ category });
    return expenses;
  }
} 