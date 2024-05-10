## Account

Call the `account` method from your API client to get the accounts resource.

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/account).

### Get an account

Call the `get` method on the accounts resource by passing an accountId:

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/account/paths/~1api~1v1~1account~1%7BaccountId%7D/get).

```js
const response = await woovi.account.get({ accountId: 'some-id' });
```

### Get a list of accounts

Get the accounts using the `list` method in the accounts resource:

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/account/paths/~1api~1v1~1account~1/get).

```js
const response = await woovi.account.list({ limit: 10, skip: 0 }); //the pagination object is optional
```

### Make a withdrawal (withdraw)

Withdraw from a account using the `withdraw` method in the account feature.

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/account/paths/~1api~1v1~1account~1%7BaccountId%7D~1withdraw/post).

```js
const response = await woovi.account.withdraw({
  accountId: 'string',
  value: 200,
});
```

## Cashback loyalty

Call the `cashbackFidelity` method on your API client to get the cashback loyalty feature.

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/cashback-fidelity).

### Get the amount of cashback a user has to receive

Call the `get` method on the cashback loyalty feature by passing a taxID:

[Endpoint documentation for more details](https://developers.woovi.com/api#tag/cashback-fidelity/paths/~1api~1v1~1cashback-fidelity~1balance~1%7BtaxID%7D/get).

```js
const response = await woovi.cashbackFidelity.get({ taxID: 'some-tax-id' });
```

### Create (or get) a cashback loyalty for a customer

Create the resource by calling the `create` method on the cashback loyalty resource.

[Endpoint documentation for more details](https://developers.woovi.com/api#tag/cashback-fidelity/paths/~1api~1v1~1cashback-fidelity/post).

```js
const response = await woovi.cashbackFidelity.create({
  value: 100,
  taxID: 11111111111,
});
```

## Charge

Call the `charge` method on your API client to get the charging feature.

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/charge).

### Get a charge

Call the `get` method on the charges resource by passing an id:

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/charge/paths/~1api~1v1~1charge~1%7Bid%7D/delete).

```js
const response = await woovi.charge.get({ id: 'some-id' });
```

### Get a list of charges

Get the charges using the `list` method in the charges resource:

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/charge/paths/~1api~1v1~1charge~1%7Bid%7D/get).

```js
const response = await woovi.charge.list({ limit: 10, skip: 0 }); //the pagination object is optional
```

### Create a charge

Create a charge using the `create` method in the charges resource:

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/charge/paths/~1api~1v1~1charge/get).

````js
const response = await woovi.charge.create({
  "correlationID": "9134e286-6f71-427a-bf00-241681624587",
  "value": 100,
  "comment": "good",
  "customer": {
    "name": "Dan",
    "taxID": "31324227036",
    "email": "email0@example.com",
    "phone": "5511999999999"
  },
  "additionalInfo": [
    {
      "key": "Product",
      "value": "Pencil"
    },
    {
      "key": "Invoice",
      "value": "18476"
    },
    {
      "key": "Order",
      "value": "302"
    }
  ]
});
```### Get image of a QR code from a charge

Get the qr code of a charge using the `getQrCode` method in the charges resource:

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/charge/paths/~1openpix~1charge~1brcode~1image~1%7B:id%7D.png?size= 1024/get).

```js
const response = await woovi.charge.getQrCode({size: "768"});
````

### Delete a charge

Delete a charge using the `delete` method in the charges feature:

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/charge/paths/~1api~1v1~1charge~1%7Bid%7D/delete).

```js
const response = await woovi.charge.delete({ id: 'some-id' });
```

## Billing Exit

Call the `chargeRefund` method on your API client to get the ability to refund a charge.

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/charge-refund).

### Get a list of extortion charges

Get the chargebacks using the `list` method in the chargeback feature:

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/charge-refund/paths/~1api~1v1~1charge~1%7Bid%7D~1refund/get).

```js
const response = await woovi.chargeRefund.list({ limit: 10, skip: 0 }); //the pagination object is optional
```

### Create a charge

Create a billing statement using the `create` method in the billing statement feature:

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/charge/paths/~1api~1v1~1charge/get).

```js
const response = await woovi.chargeRefund.create({
  id: 'algum-id',
  correlationID: 'a273e72c-9547-4c75-a213-3b0a2735b8d5',
  value: 100,
  comment: 'Comentário do reembolso',
});
```

## Client

Call the `customer` method on your API client to get the customer resource.

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/customer).

### Pick up a client

Call the `get` method on the customers resource passing an id:

[Endpoint documentation for more details](https://developers.woovi.com/api#tag/customer/paths/~1api~1v1~1customer~1%7Bid%7D/get).

```js
const response = await woovi.customer.get({ id: 'some-id' });
```

### Get a list of customers

Get the customers using the `list` method in the customers resource:

[Endpoint documentation for more details](https://developers.woovi.com/api#tag/customer/paths/~1api~1v1~1customer/get).

```js
const response = await woovi.customer.list({ limit: 10, skip: 0 }); //the pagination object is optional
```

### Create a client

Create a client using the `create` method in the clients resource:

[Endpoint documentation for more details](https://developers.woovi.com/api#tag/customer/paths/~1api~1v1~1customer/post).

```js
const response = await woovi.customer.create({
  name: 'Dan',
  taxID: '31324227036',
  email: 'email0@example.com',
  phone: '5511999999999',
  correlationID: '9134e286-6f71-427a-bf00-241681624586',
  address: {
    zipcode: '30421322',
    street: 'Street',
    number: '100',
    neighborhood: 'Neighborhood',
    city: 'Belo Horizonte',
    state: 'MG',
    complement: 'APTO',
    country: 'BR',
  },
});
```

### Update a client

Update a client using the `update` method in the clients resource.

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/customer/paths/~1api~1v1~1customer/post).

```js
const response = await woovi.customer.update({
  correlationID: 'some id',
  name: 'Dan',
  email: 'email0@example.com',
  phone: '5511999999999',
  address: {
    zipcode: '30421322',
    street: 'Street',
    number: '100',
    neighborhood: 'Neighborhood',
    city: 'Belo Horizonte',
    state: 'MG',
    complement: 'APTO',
    country: 'BR',
  },
});
```

## Partners

Call the `partner` method on your API client to get the partners resource.

[Endpoint documentation for more details](<https://developers.woovi.com/api#tag/partner-(request-access)>).

### Get a partner pre-registration

Call the `getPreRegistration` method on the partners resource passing a taxID:

[Endpoint documentation for more details](<https://developers.woovi.com/api#tag/partner-(request-access)/paths/~1api~1v1~1partner~1company~1%7BtaxID%7D/get>) .

```js
const response = await woovi.partner.getPreRegistration({
  taxID: 'some-tax-id',
});
```

### Get all pre-registrations

Get partner pre-registrations using the `list` method in the partners resource:

[Endpoint documentation for more details](<https://developers.openpix.com.br/api#tag/partner-(request-access)/paths/~1api~1v1~1partner~1company/get>).

```js
const response = await woovi.partner.list({ limit: 10, skip: 0 }); //the pagination object is optional
```

### Create a partner

Create a partner using the `create` method in the partners resource:

[Endpoint documentation for more details](<https://developers.openpix.com.br/api#tag/partner-(request-access)/paths/~1api~1v1~1partner~1company/post>).

```js
const response = await woovi.partner.create({
  preRegistration: {
    name: 'Example LLC',
    taxID: {
      taxID: '11111111111111',
      type: 'BR:CNPJ',
    },
    website: 'examplellc.com',
  },
  user: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@examplellc.com',
    phone: '+5511912345678',
  },
});
```

### Criar uma aplicação para algum de seus pré-registros

Para criar uma aplicação, use o método `createApplication` no recurso de parceiros.

[Documentação do endpoint para mais detalhes](<https://developers.openpix.com.br/api#tag/partner-(request-access)/paths/~1api~1v1~1partner~1application/post>).

```js
const response = await woovi.partner.createApplication({
  application: {
    name: 'MyAPIAccess',
    type: 'API',
  },
  taxID: {
    taxID: '65914571000187',
    type: 'BR:CNPJ',
  },
});
```

## Payment

Call the `payment` method on your API client to get the payments feature.

[Endpoint documentation for more details](<https://developers.woovi.com/api#tag/partner-(request-access)/>).

### Approve a payment

Call the `approve` method in the payments resource by passing a correlationID:

[Endpoint documentation for more details](<https://developers.openpix.com.br/api#tag/payment-(request-access)/paths/~1api~1v1~1payment~1approve/post>).

```js
const response = await woovi.payment.approve({
  correlationID: 'some-correlation-id',
});
```

### Get a payment

Get a payment using the `get` method in the payments feature:

[Endpoint documentation for more details](<https://developers.openpix.com.br/api#tag/payment-(request-access)/paths/~1api~1v1~1payment~1%7Bid%7D/get>) .

```js
const response = await woovi.payment.get({ id: 'some-id' });
```

### Get a list of payments

Get a list of payments using the `list` method in the payments feature.

[Endpoint documentation for more details](<https://developers.openpix.com.br/api#tag/payment-(request-access)/paths/~1api~1v1~1payment/get>).

```js
const response = await woovi.payment.list({ limit: 10, skip: 0 }); //the pagination object is optional
```

### Create a payment request

To create a payment request, use the `create` method in the payment resource.

[Endpoint documentation for more details](<https://developers.openpix.com.br/api#tag/payment-(request-access)/paths/~1api~1v1~1payment/post>).

```js
const response = await woovi.payment.create({
  value: 100,
  destinationAlias: 'c4249323-b4ca-43f2-8139-8232aab09b93',
  destinationAliasType: 'RANDOM',
  comment: 'payment comment',
  correlationID: 'payment1',
  sourceAccountId: 'my-source-account-id',
});
```

## Get a Qr Code

Call the `pixQrCode` method on your API client to get the qr code resource.

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/pixQrCode).

### Get a qr code

Get a qr code using the `get` method in the qr code resource:

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/pixQrCode/paths/~1api~1v1~1qrcode-static~1%7Bid%7D/get).

```js
const response = await woovi.pixQrCode.get({ id: 'some-id' });
```

### Get a list of payments

Get a list of qr codes using the `list` method in the qr code resource.

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/pixQrCode/paths/~1api~1v1~1qrcode-static/get).

```js
const response = await woovi.pixQrCode.list({ limit: 10, skip: 0 }); //the pagination object is optional
```

### Create a static qr code.

To create a static qr code, use the `create` method in the qr code resource.

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/pixQrCode/paths/~1api~1v1~1qrcode-static/post).

```js
const response = await woovi.pixQrCode.create({
  name: 'my-qr-code',
  correlationID: '9134e286-6f71-427a-bf00-241681624586',
  value: 100,
  comment: 'good',
});
```

##Extorno

Call the `refund` method on your API client to obtain the refund resource.

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/refund).

### Get a refund

Get a refund using the `get` method in the refund resource:

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/refund/paths/~1api~1v1~1refund~1%7Bid%7D/get).

```js
const response = await woovi.refund.get({ id: 'some-id' });
```

### Get a list of extortionists

Get a list of refunds using the `list` method in the refund resource.

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/refund/paths/~1api~1v1~1refund/get).

```js
const response = await woovi.refund.list({ limit: 10, skip: 0 }); //the pagination object is optional
```

### Create a new extortion

To create a return, use the `create` method on the return resource.

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/refund/paths/~1api~1v1~1refund/post).

```js
const response = await woovi.refund.create({
  transactionEndToEndId: '9134e286-6f71-427a-bf00-241681624586',
  correlationID: '9134e286-6f71-427a-bf00-241681624586',
  value: 100,
  comment: 'Comentário do reembolso',
});
```

## Subscription

Call the `subscription` method on your API client to get the subscription resource.

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/subscription).

### Get a subscriptions

Get a Subscription from exbacks using the `get` method in the Subscription resource.

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/subscription/paths/~1api~1v1~1subscriptions~1%7Bid%7D/get).

```js
const response = await woovi.subscription.get({ id: 'some-id' });
```

### Create a Subscription

To create a Subscription, use the `create` method on the Subscription resource.

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/subscription/paths/~1api~1v1~1subscriptions/post).

```js
const response = await woovi.subscriptions.create({
  value: 100,
  customer: {
    name: 'Dan',
    taxID: '31324227036',
    email: 'email0@example.com',
    phone: '5511999999999',
  },
  dayGenerateCharge: 15,
});
```

## Transactions

Call the `transactions` method on your API client to get the transactions resource.

[Endpoint documentation for more details](https://developers.openpix.com.br/api#tag/transactions).

### Get a transaction

Get a transaction using the `get` method in the transactions resource.

[Endpoint documentation for more details](https://developers.woovi.com/api#tag/transactions/paths/~1api~1v1~1transaction~1%7Bid%7D/get).

```js
const response = await woovi.transactions.get({ id: 'some-id' });
```

### Get a list of transactions

Get a list of transactions using the `list` method in the transaction resource.

[Endpoint documentation for more details](https://developers.woovi.com/api#tag/transactions/paths/~1api~1v1~1transaction/get).

```js
const response = await woovi.transactions.list({
  pagination: { limit: 10, skip: 0 },
  query: {},
}); //the pagination object and query parameters are optional
```

## Transfers

Call the `transfer` method on your API client to obtain the transfer resource.

[Endpoint documentation for more details](<https://developers.openpix.com.br/api#tag/transfer-(request-access)>).

### Create a transfer

To create a transfer, use the `create` method in the transfers resource.

[Endpoint documentation for more details](<https://developers.woovi.com/api#tag/transfer-(request-access)/paths/~1api~1v1~1transfer/post>).

```js
const response = await woovi.transfer.create({
  value: 100,
  fromPixKey: 'from@openpix.com.br',
  toPixKey: 'to@openpix.com.br',
});
```

## Webhooks

Call the `webhook` method on your API client to obtain the webhook resource.

[Endpoint documentation for more details](https://developers.woovi.com/api#tag/webhook).

### Delete a webhook

Delete a webhook using the `delete` method in the webhooks resource.

[Endpoint documentation for more details](https://developers.woovi.com/api#tag/webhook/paths/~1api~1v1~1webhook~1%7Bid%7D/delete).

```js
const response = await woovi.webhook.delete({ id: 'some-id' });
```

### Get a list of webhooks

Get a list of webhooks using the `list` method in the webhook resource.

[Endpoint documentation for more details](https://developers.woovi.com/api#tag/webhook/paths/~1api~1v1~1webhook/get).

```js
const response = await woovi.webhook.list({
  pagination: { limit: 10, skip: 0 },
  query: {},
}); //the pagination object and query are optional
```

### Create a new webhook

To create a webhook, use the `create` method in the webhook resource.

[Endpoint documentation for more details](https://developers.woovi.com/api#tag/webhook/paths/~1api~1v1~1webhook/post).

```js
const response = await woovi.webhook.create({
  webhook: {
    name: 'webhookName',
    event: 'OPENPIX:CHARGE_CREATED',
    url: 'https://mycompany.com.br/webhook',
    authorization: 'openpix',
    isActive: true,
  },
});
```

### HTTP Handler

The webhook method has a special feature called handle, great for using to validate resources directly in your api. See below how to use it:

```js
import { createClient } from '@woovi/node-sdk';

const woovi = createClient({ appId: 'your-app-id' });

const handler = woovi.webhook.handler({
  onChargeCompleted: async (payload) => {},
  onChargeExpired: async (payload) => {},
});

export const POST = handler.POST;
```

Post receives your request.

This allows you to validate a webhook in an API that you can build.

## Subaccounts

Call the `subAccount` method from your API client to get the subaccounts resource.

[Endpoint documentation for more details](<https://developers.woovi.com/api#tag/sub-account-(request-access)>).

### Get details from a subaccount

To get details from a subaccount, use the `get` method in the subaccounts resource.

[Endpoint documentation for more details](<https://developers.woovi.com/api#tag/sub-account-(request-access)/paths/~1api~1v1~1subaccount~1%7Bid%7D/get >).

```js
const response = await woovi.subAccount.get({ id: 'some-id' });
```

### List subaccounts

Get a list of subaccounts using the `list` method in the subaccounts resource.

[Endpoint documentation for more details](<https://developers.woovi.com/api#tag/sub-account-(request-access)/paths/~1api~1v1~1subaccount/get>).

```js
const response = await woovi.subAccount.list({ limit: 10, skip: 0 }); //the pagination object is optional
```

### Create a new subaccount

To create a subaccount, use the `create` method in the subaccount resource.

[Endpoint documentation for more details](<https://developers.woovi.com/api#tag/sub-account-(request-access)/paths/~1api~1v1~1subaccount/post>).

```js
const response = await woovi.subAccount.create({
  pixKey: '9134e286-6f71-427a-bf00-241681624587',
  name: 'Test Account',
});
```

### Make a withdrawal (withdraw)

Withdraw from a subaccount using the `withdraw` method in the subaccounts resource.

[Endpoint documentation for more details](<https://developers.woovi.com/api#tag/sub-account-(request-access)/paths/~1api~1v1~1subaccount~1%7Bid%7D~1withdraw /post>).

```js
const response = await woovi.subAccount.withdraw({ id: 'pix-key' });
```
