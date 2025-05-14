import { Schema, model, Document } from 'mongoose';

export enum TransactionType {
  PAYMENT = 'PAYMENT',
  EXPENSE = 'EXPENSE'
}

export interface IHistory extends Document {
  type: TransactionType;
  amount: number;
  date?: Date;
  description: string;
  category?: string;
  subCategory?: string;
  paymentMethod?: string;
  upiSubType?: string;
  // imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const historySchema = new Schema<IHistory>(
  {
    type: {
      type: String,
      required: true,
      enum: Object.values(TransactionType),
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Date,
      required: false,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    subCategory: {
      type: String,
      trim: true,
    },
    paymentMethod: {
      type: String,
      enum: ['CASH', 'UPI', 'CARD', 'BANK_TRANSFER'],
    },
    upiSubType: {
      type: String,
      enum: ['GOOGLE_PAY', 'PHONE_PAY', 'PAYTM', 'OTHER'],
    },
  //   imageUrl: {
  //     type: String,
  //   },
  },
  {
    timestamps: true,
  }
);

export const History = model<IHistory>('History', historySchema); 