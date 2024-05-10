import type { Refund } from '../commonTypes';

export type GetPayload = {
  id: string;
};

export type GetResponse = {
  pixTransactionRefund: Refund;
};
