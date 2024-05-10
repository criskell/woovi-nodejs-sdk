import type { PageInfo } from '@src/clients/commonTypes';
import type { Webhook } from '../commonTypes';

export type ListPayload = {
  url: string;
};

export type ListResponse = {
  pageInfo: PageInfo;
  pixQrCodes: Webhook[];
};
