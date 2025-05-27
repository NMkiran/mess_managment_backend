import { Router } from 'express';
import { HomeController } from '../controllers/home.controller';

export class HomeRoute {
  public path = '/home';
  public router = Router();
  public homeController = new HomeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/dashboard`, this.homeController.getDashboard);
  }
}