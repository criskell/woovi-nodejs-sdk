import type { BasicCustomer } from '@src/clients/commonTypes';
import type { Charge } from '@src/clients/transactions/commonTypes';

export type WebhooksHandler = {
  config: WebhookRegistrationConfig;
  POST: (req: Request) => Promise<Response>;
};

type Raw = {
  endToEndId: string;
  txid: string;
  valor: string;
  horario: string;
  infoPagador: string;
};

type PixQrCode = {
  name: string;
  value: string;
  comment: string;
  brCode: string;
  correlationID: string;
  paymentLinkID: string;
  paymentLinkUrl: any;
  qrCodeImage: any;
  createdAt: string;
  updatedAt: string;
};

type Pix = {
  pixQrCode?: PixQrCode;
  charge: Charge;
  customer: BasicCustomer;
  payer: BasicCustomer;
  time: string;
  value: string;
  transactionID: string;
  infoPagador: string;
  raw: Raw;
};

type ChargePayload = {
  charge: ChargePayload;
  pix: Pix;
  pixQrCode?: PixQrCode;
};

type TransactionPayload = {
  charge?: ChargePayload;
  pix: Pix;
};

type MoventPayload = {
  charge?: ChargePayload;
  pix: Pix;
};

export type WebhookPayload =
  | ({
      event: 'OPENPIX:CHARGE_CREATED';
    } & ChargePayload)
  | ({
      event: 'OPENPIX:CHARGE_COMPLETED';
    } & ChargePayload)
  | ({
      event: 'OPENPIX:CHARGE_EXPIRED';
    } & ChargePayload)
  | ({
      event: 'OPENPIX:TRANSACTION_RECEIVED';
    } & TransactionPayload)
  | ({
      event: 'OPENPIX:TRANSACTION_REFUND_RECEIVED';
    } & TransactionPayload)
  | ({
      event: 'OPENPIX:MOVEMENT_CONFIRMED';
    } & MoventPayload)
  | ({
      event: 'OPENPIX:MOVEMENT_FAILED';
    } & MoventPayload)
  | ({
      event: 'OPENPIX:MOVEMENT_REMOVED';
    } & MoventPayload);

export type HandlerFn<T> = (
  payload: T,
) => Promise<void | Response> | void | Response;

export type VerifyPayloadType = {
  payload: string;
  signature: string;
};

export type WebhooksHandlerMap = {
  [path: string]: HandlerFn<WebhookPayload> | undefined;
};

export type WebhookRegistrationConfig = {
  onChargeCreated?: HandlerFn<WebhookPayload>;
  onChargeCompleted?: HandlerFn<WebhookPayload>;
  onChargeExpired?: HandlerFn<WebhookPayload>;
  onTransactionReceived?: HandlerFn<WebhookPayload>;
  onTransactionRefundReceived?: HandlerFn<WebhookPayload>;
  onMovementConfirmed?: HandlerFn<WebhookPayload>;
  onMovementFailed?: HandlerFn<WebhookPayload>;
  onMovementRemoved?: HandlerFn<WebhookPayload>;
};
