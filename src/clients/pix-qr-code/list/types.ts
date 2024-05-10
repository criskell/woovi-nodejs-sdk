import type { PageInfo } from '@src/clients/commonTypes';
import type { PixQRCode } from '../commonTypes';

export type ListResponse = {
  pageInfo: PageInfo;
  pixQrCodes: PixQRCode[];
};
