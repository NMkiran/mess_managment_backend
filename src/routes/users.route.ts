import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/`, this.user.getUsers);
    this.router.get(`/:id`, this.user.getUserById);
    this.router.post(`/`, ValidationMiddleware(CreateUserDto), this.user.createUser);
    this.router.put(`/:id`, ValidationMiddleware(CreateUserDto, true), this.user.updateUser);
    this.router.delete(`/:id`, this.user.deleteUser);
  }
}
