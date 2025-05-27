import { Request, Response, NextFunction } from 'express';
import { HistoryService } from '../services/history.service';
import { TransactionType } from '../models/history.model';

export class HistoryController {
  private historyService = new HistoryService();

  public getHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const history = await this.historyService.getHistory();
      res.status(200).json(history);
    } catch (error) {
      next(error);
    }
  };

  public getHistoryByType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const type = req.params.type as TransactionType;
      const history = await this.historyService.getHistoryByType(type);
      res.status(200).json(history);
    } catch (error) {
      next(error);
    }
  };

  public getHistorySummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const summary = await this.historyService.getHistorySummary();
      res.status(200).json({
        data: summary,
        message: 'History summary retrieved successfully'
      });
    } catch (error) {
      next(error);
    }
  };
} 