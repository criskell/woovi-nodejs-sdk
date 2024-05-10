import type { SubAccount } from '../commonTypes';

export type CreatePayload = {
  pixKey: string;
  name: string;
};

export type CreateResponse = {
  SubAccount: SubAccount;
};
