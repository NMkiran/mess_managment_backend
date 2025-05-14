import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';
// import { validationMiddleware } from '../middlewares/validation.middleware';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import { CreatePaymentDto } from '../dtos/payment.dto';

export class PaymentRoute {
  public path = '/payments';
  public router = Router();
  public paymentController = new PaymentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `/`,
      ValidationMiddleware(CreatePaymentDto),
      this.paymentController.createPayment
    );
    this.router.get(`/`, this.paymentController.getPayments);
    this.router.get(`/:id`, this.paymentController.getPaymentById);
    this.router.put(
      `/:id`,
      ValidationMiddleware(CreatePaymentDto, true),
      this.paymentController.updatePayment
    );
    this.router.delete(`/:id`, this.paymentController.deletePayment);
  }
} 