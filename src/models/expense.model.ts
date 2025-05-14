import { model, Schema, Document } from 'mongoose';

export interface IExpense extends Document {
  category: string;
  description: string;
  amount: number;
  subCategory: string;
  // pic?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema: Schema = new Schema({
  category: {
    type: String,
    required: true,
    enum: ['utilities', 'food', 'maintenance', 'staff'],
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  subCategory: {
    type: String,
    required: true,
    trim: true,
  },
  // pic: {
  //   type: String,
  //   required: false,
  // }
}, {
  timestamps: true,
});

export const ExpenseModel = model<IExpense>('Expense', ExpenseSchema); 