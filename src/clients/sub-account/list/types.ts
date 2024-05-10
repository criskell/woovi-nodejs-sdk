import type { PageInfo } from '@src/clients/commonTypes';
import type { SubAccount } from '../commonTypes';

export type ListResponse = {
  subAccounts: SubAccount[];
  pageInfo: PageInfo;
};
