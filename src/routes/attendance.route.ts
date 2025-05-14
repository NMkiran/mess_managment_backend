import { Router } from 'express';
import { AttendanceController } from '../controllers/attendance.controller';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import { CreateAttendanceDto } from '../dtos/attendance.dto';

export class AttendanceRoute {
  public path = '/attendance';
  public router = Router();
  public attendanceController = new AttendanceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `/`,
      ValidationMiddleware(CreateAttendanceDto),
      this.attendanceController.createAttendance
    );
    this.router.get(`${this.path}/date`, this.attendanceController.getAttendanceByDate);
    this.router.get(`${this.path}/member/:memberId`, this.attendanceController.getAttendanceByMember);
    this.router.get(`${this.path}/summary`, this.attendanceController.getAttendanceSummary);
    this.router.get(`${this.path}/detailed-summary`, this.attendanceController.getDetailedAttendanceSummary);
  }
} 