import type { PageInfo } from '@src/clients/commonTypes';
import type { Customer } from '../commonTypes';

export type ListResponse = {
  customers: Customer[];
  pageInfo: PageInfo;
};
