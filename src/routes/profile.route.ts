import { Router } from 'express';
import ProfileController from '@controllers/profile.controller';
import { Routes } from '@interfaces/routes.interface';

export class ProfileRoute implements Routes {
  public path = '/profile';
  public router = Router();
  public profileController = new ProfileController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/:id`, this.profileController.getProfile);
    this.router.put(`/:id`, this.profileController.updateProfile);
    this.router.delete(`/:id`, this.profileController.deleteProfile);
  }
}

export default ProfileRoute; 