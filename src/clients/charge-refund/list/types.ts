import type { PageInfo } from '@src/clients/commonTypes';
import type { ChargeRefund } from '../commonTypes';

export type ListPayload = {
  chargeId: string;
};

export type ListResponse = {
  refunds: ChargeRefund[];
  pageInfo: PageInfo;
};
