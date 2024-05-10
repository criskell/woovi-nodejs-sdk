import type { AdditionalInfo, BasicCustomer } from '../commonTypes';

export type Charge = {
  value: number;
  customer: BasicCustomer;
  type: 'DYNAMIC' | 'OVERDUE';
  brCode: string;
  status: 'ACTIVE' | 'COMPLETED' | 'EXPIRED';
  correlationID: string;
  paymentLinkID: string;
  paymentLinkUrl: any;
  globalID: any;
  transactionID: any;
  identifier: string;
  qrCodeImage: any;
  additionalInfo?: AdditionalInfo[];
  pixKey: string;
  createdAt: string;
  updatedAt: string;
  expiresIn: string;
};

type Withdraw = {
  value: number;
  time: string;
  endToEndID: string;
  transactionID: string;
  infoPagador: string;
  endToEndId: string;
  payer: BasicCustomer;
  type: string;
};

type PixQRCode = {
  name: string;
  value: string;
  comment: string;
  brCode: string;
  correlationID: string;
  paymentLinkID: string;
  paymentLinkUrl: any;
  qrCodeImage: any;
  createdAt: string;
  updatedAt: string;
};

export type Transaction = {
  charge: Charge;
  value: number;
  time: string;
  endToEndID: string;
  transactionID: string;
  infoPagador: string;
  endToEndId: string;
  customer: BasicCustomer;
  withdraw: Withdraw;
  payer: BasicCustomer;
  type: 'PAYMENT' | 'WITHDRAW' | 'REFUND' | 'FEE';
  globalID: any;
  pixQrCode: PixQRCode;
};
