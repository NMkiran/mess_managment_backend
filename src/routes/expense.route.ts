import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ExpenseController } from '@controllers/expense.controller';
import { authMiddleware } from '@middlewares/auth.middleware';

export class ExpenseRoute implements Routes {
  public path = '/expenses';
  public router = Router();
  public expense = new ExpenseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/`, authMiddleware, this.expense.getAllExpenses);
    this.router.get(`/:id`, authMiddleware, this.expense.getExpenseById);
    this.router.get(`/category/:category`, authMiddleware, this.expense.getExpensesByCategory);
    this.router.post(`/`, authMiddleware, this.expense.createExpense);
    this.router.put(`/:id`, authMiddleware, this.expense.updateExpense);
    this.router.delete(`/:id`, authMiddleware, this.expense.deleteExpense);
  }
} 