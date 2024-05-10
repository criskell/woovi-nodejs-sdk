import type { Refund } from '../commonTypes';

export type CreatePayload = {
  value: number;
  transactionEndToEndId: string;
  correlationID: string;
  comment?: string;
};

export type CreateResponse = {
  refund: Refund;
};
