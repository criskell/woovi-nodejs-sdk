import type { PageInfo } from '@src/clients/commonTypes';
import type { Charge } from '../commonTypes';

export type ListResponse = {
  refunds: Charge[];
  pageInfo: PageInfo;
};
