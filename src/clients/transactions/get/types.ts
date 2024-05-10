import type { Transaction } from '../commonTypes';

export type GetPayload = {
  id: string;
};

export type GetResponse = {
  transaction: Transaction;
};
