import { Payment, IPayment } from '../models/payment.model';
import { CreatePaymentDto } from '../dtos/payment.dto';
import { HttpException } from '../exceptions/HttpException';
import { HistoryService } from './history.service';
import { TransactionType } from '../models/history.model';

export class PaymentService {
  private historyService = new HistoryService();

  public async createPayment(paymentData: CreatePaymentDto): Promise<IPayment> {
    try {
      const payment = new Payment(paymentData);
      const savedPayment = await payment.save();

      // Create history entry
      await this.historyService.createHistoryEntry({
        type: TransactionType.PAYMENT,
        amount: paymentData.amount,
        // date: paymentData.date,
        description: paymentData.description || `Payment from ${paymentData.name}`,
        paymentMethod: paymentData.paymentMethod,
        upiSubType: paymentData.upiSubType,
        imageUrl: paymentData.imageUrl
      });

      return savedPayment;
    } catch (error) {
      throw new HttpException(400, 'Error creating payment');
    }
  }

  public async getPayments(): Promise<IPayment[]> {
    try {
      
      return await Payment.find().sort({ date: -1 });
    } catch (error) {
      throw new HttpException(400, 'Error fetching payments');
    }
  }

  public async getPaymentById(id: string): Promise<IPayment> {
    try {
      const payment = await Payment.findById(id);
      if (!payment) {
        throw new HttpException(404, 'Payment not found');
      }
      return payment;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(400, 'Error fetching payment');
    }
  }

  public async updatePayment(id: string, paymentData: Partial<CreatePaymentDto>): Promise<IPayment> {
    try {
      const payment = await Payment.findByIdAndUpdate(id, paymentData, { new: true });
      if (!payment) {
        throw new HttpException(404, 'Payment not found');
      }
      return payment;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(400, 'Error updating payment');
    }
  }

  public async deletePayment(id: string): Promise<void> {
    try {
      const payment = await Payment.findByIdAndDelete(id);
      if (!payment) {
        throw new HttpException(404, 'Payment not found');
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(400, 'Error deleting payment');
    }
  }
} 