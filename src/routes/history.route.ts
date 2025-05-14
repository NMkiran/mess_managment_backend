import { Router } from 'express';
import { HistoryController } from '../controllers/history.controller';

export class HistoryRoute {
  public path = '/history';
  public router = Router();
  public historyController = new HistoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.historyController.getHistory);
    this.router.get(`${this.path}/type/:type`, this.historyController.getHistoryByType);
    this.router.get(`${this.path}/summary`, this.historyController.getHistorySummary);
  }
} 