import { IsString, IsEnum, IsDate, IsOptional } from 'class-validator';
import { MealType } from '../models/attendance.model';

export class CreateAttendanceDto {
  @IsString()
  memberId: string;

  @IsString()
  memberName: string;

  @IsString()
  roomNumber: string;

  @IsEnum(MealType)
  mealType: MealType;

  @IsDate()
  @IsOptional()
  date?: Date;
}

export class AttendanceResponseDto extends CreateAttendanceDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AttendanceSummary {
  totalMembers: number;
  mealCounts: {
    [MealType.BREAKFAST]: number;
    [MealType.LUNCH]: number;
    [MealType.DINNER]: number;
  };
  memberDetails: Array<{
    memberId: string;
    memberName: string;
    roomNumber: string;
    meals: {
      [MealType.BREAKFAST]: boolean;
      [MealType.LUNCH]: boolean;
      [MealType.DINNER]: boolean;
    };
  }>;
} 