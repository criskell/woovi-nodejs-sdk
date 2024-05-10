import type { Destination, Payment, Transaction } from '../commonTypes';

export type ApprovePayload = {
  correlationID: string;
};

export type ApproveResponse = {
  payment: Payment;
  destination: Destination;
  transaction: Transaction;
};
