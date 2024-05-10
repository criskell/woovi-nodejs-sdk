import type { PageInfo } from '@src/clients/commonTypes';
import type { Account } from '../commonTypes';

export type ListResponse = {
  accounts: Account[];
  pageInfo: PageInfo;
};
