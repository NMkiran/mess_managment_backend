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
    this.router.get(`/`, this.historyController.getHistory);
    this.router.get(`/type/:type`, this.historyController.getHistoryByType);
    this.router.get(`/summary`, this.historyController.getHistorySummary);
  }
} 