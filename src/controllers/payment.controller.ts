import { Request, Response, NextFunction } from 'express';
import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto } from '../dtos/payment.dto';
// import { HttpException } from '../exceptions/http.exception';
import { HttpException } from '../exceptions/HttpException';

export class PaymentController {
  private paymentService = new PaymentService();

  public createPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const paymentData: CreatePaymentDto = req.body;
      const payment = await this.paymentService.createPayment(paymentData);
      res.status(201).json(payment);
    } catch (error) {
      next(error);
    }
  };

  public getPayments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payments = await this.paymentService.getPayments();
      res.status(200).json(payments);
    } catch (error) {
      next(error);
    }
  };

  public getPaymentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payment = await this.paymentService.getPaymentById(req.params.id);
      res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  };

  public updatePayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payment = await this.paymentService.updatePayment(req.params.id, req.body);
      res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  };

  public deletePayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.paymentService.deletePayment(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
} 