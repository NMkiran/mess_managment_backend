import { Schema, model, Document } from 'mongoose';

export enum MealType {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER'
}

export interface IAttendance extends Document {
  memberId: string;
  memberName: string;
  roomNumber: string;
  mealType: MealType;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const attendanceSchema = new Schema<IAttendance>(
  {
    memberId: {
      type: String,
      required: true,
      ref: 'Member'
    },
    memberName: {
      type: String,
      required: true,
      trim: true
    },
    roomNumber: {
      type: String,
      required: true,
      trim: true
    },
    mealType: {
      type: String,
      required: true,
      enum: Object.values(MealType)
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);



export const Attendance = model<IAttendance>('Attendance', attendanceSchema); 