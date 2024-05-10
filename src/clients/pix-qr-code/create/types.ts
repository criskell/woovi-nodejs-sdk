import type { PixQRCode } from '../commonTypes';

export type CreatePayload = {
  name: string;
  correlationID?: string;
  value?: number;
  comment?: string;
};

export type CreateResponse = {
  pixQrCode: PixQRCode & { correlationID: string; brCode: string };
};
