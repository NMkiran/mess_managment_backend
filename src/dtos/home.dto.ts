import { MealType } from '../models/attendance.model';

export interface MealAttendance {
  count: number;
  percentage: number;
}

export interface HomeResponseDto {
  members: {
    total: number;
    active: number;
    absent: number;
  };
  expenses: {
    total: number;
    today: number;
  };
  attendance: {
    [MealType.BREAKFAST]: MealAttendance;
    [MealType.LUNCH]: MealAttendance;
    [MealType.DINNER]: MealAttendance;
  };
} 