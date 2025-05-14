import { model, Schema, Document } from 'mongoose';

export interface IMember extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  pic?: string;
  aadharCard?: string;
  address?: string;
  roomNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MemberSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  pic: {
    type: String,
    required: false,
  },
  aadharCard: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
    trim: true,
  },
  roomNumber: {
    type: String,
    required: false,
    trim: true,
  }
}, {
  timestamps: true,
});

export const Member = model<IMember>('Member', MemberSchema); 