import type { Destination, Payment, Transaction } from '../commonTypes';

export type GetPayload = {
  id: string;
};

export type GetResponse = {
  payment: Payment;
  destination: Destination;
  transaction: Transaction;
};
