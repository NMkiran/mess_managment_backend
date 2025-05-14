import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { ExpenseService } from '@services/expense.service';
import { IExpense } from '@models/expense.model';

export class ExpenseController {
  public expense = Container.get(ExpenseService);

  public createExpense = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const expenseData: IExpense = req.body;
      const createExpenseData: IExpense = await this.expense.createExpense(expenseData);

      res.status(201).json({ data: createExpenseData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateExpense = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const expenseId: string = req.params.id;
      const expenseData: IExpense = req.body;
      const updateExpenseData: IExpense = await this.expense.updateExpense(expenseId, expenseData);

      res.status(200).json({ data: updateExpenseData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public getExpenseById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const expenseId: string = req.params.id;
      const findExpenseData: IExpense = await this.expense.getExpenseById(expenseId);

      res.status(200).json({ data: findExpenseData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getAllExpenses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllExpensesData: IExpense[] = await this.expense.getAllExpenses();

      res.status(200).json({ data: findAllExpensesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public deleteExpense = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const expenseId: string = req.params.id;
      const deleteExpenseData: IExpense = await this.expense.deleteExpense(expenseId);

      res.status(200).json({ data: deleteExpenseData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getExpensesByCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const category: string = req.params.category;
      const findExpensesByCategoryData: IExpense[] = await this.expense.getExpensesByCategory(category);

      res.status(200).json({ data: findExpensesByCategoryData, message: 'findByCategory' });
    } catch (error) {
      next(error);
    }
  };
} 