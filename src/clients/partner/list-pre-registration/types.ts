import type { PageInfo } from '@src/clients/commonTypes';
import type { PreRegistration } from '../commonTypes';

export type ListResponse = {
  preRegistrations: PreRegistration[];
  pageInfo: PageInfo;
};
