import type { Account } from '../commonTypes';

export type WithdrawPayload = {
  accountId: string;
  value: number;
};

export type WithdrawTransaction = {
  endToEndId: string;
  value: number;
};

export type WithdrawResponse = {
  account: Account;
  transaction: WithdrawTransaction;
};
