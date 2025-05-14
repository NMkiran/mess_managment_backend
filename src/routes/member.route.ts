import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { MemberController } from '@controllers/member.controller';
import { authMiddleware } from '@middlewares/auth.middleware';

export class MemberRoute implements Routes {
  public path = '/members';
  public router = Router();
  public member = new MemberController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/`, authMiddleware, this.member.getAllMembers);
    this.router.get(`/:id`, authMiddleware, this.member.getMemberById);
    this.router.post(`/`, authMiddleware, this.member.createMember);
    this.router.put(`/:id`, authMiddleware, this.member.updateMember);
    this.router.delete(`/:id`, authMiddleware, this.member.deleteMember);
  }
} 