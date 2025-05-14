import { Request } from 'express';
import { User } from '@interfaces/users.interface';

export interface DataStoredInToken {
  userId: string;
  username: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: {
    userId: string;
    username: string;
  };
}
