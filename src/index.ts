import { RestClient } from '@utils/restClient';
import type { ApiConfig } from './types';

import account from './clients/account';
import cashback from './clients/cashback';
import charge from './clients/charge';
import charge_refund from './clients/charge-refund';
import customer from './clients/customer';
import partner from './clients/partner';
import payment from './clients/payment';
import pix_qr_code from './clients/pix-qr-code';
import refund from './clients/refund';
import sub_account from './clients/sub-account';
import subscription from './clients/subscription';
import transactions from './clients/transactions';
import transfer from './clients/transfer';
import webhook from './clients/webhook';

const createClient = (config: ApiConfig) => {
  const requestSender = RestClient(config);

  return {
    account: account(requestSender),
    cashback: cashback(requestSender),
    charge: charge(requestSender),
    chargeRefund: charge_refund(requestSender),
    customer: customer(requestSender),
    partner: partner(requestSender),
    payment: payment(requestSender),
    pixQrCode: pix_qr_code(requestSender),
    refund: refund(requestSender),
    subAccount: sub_account(requestSender),
    subscription: subscription(requestSender),
    transactions: transactions(requestSender),
    transfer: transfer(requestSender),
    webhook: webhook(requestSender),
  };
};

export { createClient };

export default {
  createClient,
};
