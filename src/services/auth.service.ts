import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';
import jwt from 'jsonwebtoken';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';

@Service()
export class AuthService {
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
  private static readonly JWT_EXPIRES_IN = '24h';

  public static async login(username: string, password: string): Promise<{ token: string; user: User }> {
    const user = await UserModel.findOne({ username });
    
    if (!user) {
      throw new UnauthorizedException('Invalid username');
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      this.JWT_SECRET,
      { expiresIn: this.JWT_EXPIRES_IN }
    );

    return { token, user };
  }

  public static async register(username: string, password: string): Promise<User> {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      throw new UnauthorizedException('Username already exists');
    }

    // Create user without hashing password - it will be hashed by the pre-save hook
    const user = await UserModel.create({ username, password });
    return user;
  }
}
