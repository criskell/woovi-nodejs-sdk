import type { Charge } from '../commonTypes';

export type GetPayload = {
  id: string;
};

export type GetResponse = {
  charge: Charge;
};
