import type { Customer } from '../commonTypes';

export type GetPayload = {
  id: string;
};

export type GetResponse = {
  customer: Customer;
};
