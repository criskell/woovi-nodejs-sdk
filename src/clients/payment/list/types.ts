import type { PageInfo } from '@src/clients/commonTypes';
import type { Destination, Payment, Transaction } from '../commonTypes';

type payments = {
  payment: Payment;
  Destination: Destination;
  transaction: Transaction;
};

export type ListResponse = {
  payments: payments[];
  pageInfo: PageInfo;
};
