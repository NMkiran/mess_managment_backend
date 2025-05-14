import { Request, Response, NextFunction } from 'express';
import { HomeService } from '../services/home.service';

export class HomeController {
  private homeService = new HomeService();

  public getDashboard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dashboardData = await this.homeService.getDashboardData();
      res.status(200).json(dashboardData);
    } catch (error) {
      next(error);
    }
  };
} 