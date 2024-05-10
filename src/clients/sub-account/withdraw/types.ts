import { type Account, SubAccount } from '../commonTypes';

export type WithDrawPayload = {
  id: string;
};

export type WithDrawResponse = {
  withdraw: Account;
};
