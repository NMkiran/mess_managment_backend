import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';

export class IndexRoute implements Routes {
  public path = '/';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', (req, res) => {
      res.status(200).json({
        message: 'Server is running',
        timestamp: new Date().toISOString(),
      });
    });
  }
}
