import { Request, Response } from 'express';
import { AuthService } from '@services/auth.service';

export class AuthController {
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required' });
        return;
      }

      const result = await AuthService.login(username, password);
      res.status(200).json({
        message: 'Login successful',
        token: result.token,
        user: {
          id: result.user._id,
          username: result.user.username
        }
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        message: error.message || 'Internal server error'
      });
    }
  }

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required' });
        return;
      }

      const user = await AuthService.register(username, password);
      res.status(201).json({
        message: 'Registration successful',
        user: {
          id: user._id,
          username: user.username
        }
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        message: error.message || 'Internal server error'
      });
    }
  }
} 