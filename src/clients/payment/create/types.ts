import type { Payment } from '../commonTypes';

type DestinationAliasType = 'CPF' | 'CNPJ' | 'EMAIL' | 'PHONE' | 'RANDOM';

interface PaymentPixRequest {
  value: number;
  destinationAlias: string;
  destinationAliasType: DestinationAliasType;
  correlationID: string;
  comment?: string;
  sourceAccountId?: string;
}

interface PaymentQRRequest {
  qrCode: string;
  correlationID: string;
  comment?: string;
  sourceAccountId?: string;
}

export type CreatePayload = PaymentQRRequest | PaymentPixRequest;

export type CreateResponse = {
  payment: Payment;
};
