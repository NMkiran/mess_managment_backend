import { IsString, IsNumber, IsDate, IsEnum, IsOptional, Min } from 'class-validator';

export enum PaymentMethod {
  CASH = 'CASH',
  UPI = 'UPI',
  CARD = 'CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
}

export enum UpiSubType {
  GOOGLE_PAY = 'GOOGLE_PAY',
  PHONE_PAY = 'PHONE_PAY',
  PAYTM = 'PAYTM',
  OTHER = 'OTHER',
}

export class CreatePaymentDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  amount: number;

  // @IsDate()
  // date?: Date;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsEnum(UpiSubType)
  @IsOptional()
  upiSubType?: UpiSubType;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}

export class PaymentResponseDto extends CreatePaymentDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
} 