import type { PixQRCode } from '../commonTypes';

export type GetPayload = {
  id: string;
};

export type GetResponse = {
  pixQrCode: PixQRCode;
};
