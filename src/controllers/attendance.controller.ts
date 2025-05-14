import { Request, Response, NextFunction } from 'express';
import { AttendanceService } from '../services/attendance.service';
import { CreateAttendanceDto } from '../dtos/attendance.dto';

export class AttendanceController {
  private attendanceService = new AttendanceService();

  public createAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const attendanceData: CreateAttendanceDto = req.body;
      const attendance = await this.attendanceService.createAttendance(attendanceData);
      res.status(201).json(attendance);
    } catch (error) {
      next(error);
    }
  };

  public getAttendanceByDate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const date = new Date(req.query.date as string || new Date());
      const attendance = await this.attendanceService.getAttendanceByDate(date);
      res.status(200).json(attendance);
    } catch (error) {
      next(error);
    }
  };

  public getAttendanceByMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const attendance = await this.attendanceService.getAttendanceByMember(req.params.memberId);
      res.status(200).json(attendance);
    } catch (error) {
      next(error);
    }
  };

  public getAttendanceSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const date = new Date(req.query.date as string || new Date());
      const summary = await this.attendanceService.getAttendanceSummary(date);
      res.status(200).json(summary);
    } catch (error) {
      next(error);
    }
  };

  public getDetailedAttendanceSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const date = new Date(req.query.date as string || new Date());
      const summary = await this.attendanceService.getDetailedAttendanceSummary(date);
      res.status(200).json(summary);
    } catch (error) {
      next(error);
    }
  };
} 