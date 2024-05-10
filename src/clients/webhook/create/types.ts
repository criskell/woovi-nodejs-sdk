import type { SimpleWebhook, Webhook } from '../commonTypes';

export type CreatePayload = {
  webhook: SimpleWebhook;
};

export type CreateResponse = {
  webhook: Webhook;
};
