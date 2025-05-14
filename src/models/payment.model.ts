import { Schema, model, Document } from 'mongoose';

export interface IPayment extends Document {
  name: string;
  amount: number;
  // date?: Date;
  paymentMethod: string;
  upiSubType?: string;
  description?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    // date: {
    //   type: Date,
    //   required: false,
    // },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['CASH', 'UPI', 'CARD', 'BANK_TRANSFER'],
    },
    upiSubType: {
      type: String,
      enum: ['GOOGLE_PAY', 'PHONE_PAY', 'PAYTM', 'OTHER'],
      required: function() {
        return this.paymentMethod === 'UPI';
      },
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = model<IPayment>('Payment', paymentSchema); 