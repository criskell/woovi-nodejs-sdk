import type { PageInfo } from '@src/clients/commonTypes';
import type { Refund } from '../commonTypes';

export type ListResponse = {
  refunds: Refund[];
  pageInfo: PageInfo;
};
