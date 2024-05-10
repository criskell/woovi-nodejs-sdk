import type { Account } from '../commonTypes';

export type GetPayload = {
  id: string;
};

export type GetResponse = {
  account: Account;
};
