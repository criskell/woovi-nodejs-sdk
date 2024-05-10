import type { Subscription } from '../commonTypes';

export type GetPayload = {
  id: string;
};

export type GetResponse = {
  subscription: Subscription;
};
