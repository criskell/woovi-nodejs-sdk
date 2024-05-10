import type { BasicCustomer } from '../commonTypes';

export interface Charge {
  value: number;
  customer: BasicCustomer;
  type: 'DYNAMIC' | 'OVERDUE';
  comment?: string;
  brCode?: string;
  status?: 'ACTIVE' | 'COMPLETED' | 'EXPIRED';
  correlationID: string;
  paymentLinkID?: string;
  paymentLinkUrl?: string;
  globalID?: string;
  transactionID?: string;
  identifier?: string;
  qrCodeImage?: string;
  additionalInfo?: {
    key: string;
    value: string;
  }[];
  pixKey?: string;
  createdAt?: string;
  updatedAt?: string;
  expiresIn?: string;
}
