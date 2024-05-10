export type Webhook = {
  id: string;
  name: string;
  event: WebhookEventEnum;
  url: string;
  authorization: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SimpleWebhook = {
  name: string;
  event: WebhookEventEnum;
  url: string;
  authorization: string;
  isActive: boolean;
};

type WebhookEventEnum =
  | 'OPENPIX:CHARGE_CREATED'
  | 'OPENPIX:CHARGE_COMPLETED'
  | 'OPENPIX:CHARGE_EXPIRED'
  | 'OPENPIX:TRANSACTION_RECEIVED'
  | 'OPENPIX:TRANSACTION_REFUND_RECEIVED'
  | 'OPENPIX:MOVEMENT_CONFIRMED'
  | 'OPENPIX:MOVEMENT_FAILED'
  | 'OPENPIX:MOVEMENT_REMOVED';
