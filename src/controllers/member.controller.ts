import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { MemberService } from '@services/member.service';
import { IMember } from '@models/member.model';

export class MemberController {
  public member = Container.get(MemberService);

  public createMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const memberData: IMember = req.body;
      const createMemberData: IMember = await this.member.createMember(memberData);

      res.status(201).json({ data: createMemberData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const memberId: string = req.params.id;
      const memberData: IMember = req.body;
      const updateMemberData: IMember = await this.member.updateMember(memberId, memberData);

      res.status(200).json({ data: updateMemberData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public getMemberById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const memberId: string = req.params.id;
      const findMemberData: IMember = await this.member.getMemberById(memberId);

      res.status(200).json({ data: findMemberData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getAllMembers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllMembersData: IMember[] = await this.member.getAllMembers();

      res.status(200).json({ data: findAllMembersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public deleteMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const memberId: string = req.params.id;
      const deleteMemberData: IMember = await this.member.deleteMember(memberId);

      res.status(200).json({ data: deleteMemberData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
} 