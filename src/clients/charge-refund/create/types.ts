import type { ChargeRefund } from '../commonTypes';

export type CreatePayload = {
  value: number;
  correlationID: string;
  comment?: string;
};

export type CreateResponse = {
  refund: ChargeRefund;
};
