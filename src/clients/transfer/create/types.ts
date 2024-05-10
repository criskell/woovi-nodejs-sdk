import type { Transfer } from '../commonTypes';

export type CreatePayload = {
  value: number;
  fromPixKey: string;
  toPixKey: string;
};
export type CreateResponse = {
  transaction: Transfer;
};
