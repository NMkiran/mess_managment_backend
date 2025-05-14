import { Request, Response } from 'express';
import { Member } from '@models/member.model';
import { HttpException } from '@exceptions/HttpException';

class ProfileController {
  public getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const memberId = req.params.id;
      const profile = await Member.findById(memberId);
      
      if (!profile) {
        throw new HttpException(404, 'Profile not found');
      }

      res.status(200).json({ data: profile, message: 'Profile retrieved successfully' });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  };

  public updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const memberId = req.params.id;
      const updateData = req.body;

      const updatedProfile = await Member.findByIdAndUpdate(
        memberId,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!updatedProfile) {
        throw new HttpException(404, 'Profile not found');
      }

      res.status(200).json({ data: updatedProfile, message: 'Profile updated successfully' });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  };

  public deleteProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const memberId = req.params.id;
      const deletedProfile = await Member.findByIdAndDelete(memberId);

      if (!deletedProfile) {
        throw new HttpException(404, 'Profile not found');
      }

      res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  };
}

export default ProfileController; 