## Installing

Preferably, we recommend NodeJs in its LTS (latest) version.

Run the command below which installs the necessary dependencies with npm:

```bash
$ npm install @woovi/node-sdk
```

This way, the SDK will be installed.

## Creating the client

The SDK entry point is a `createClient` for the service.

CommonJs:

```js
const WooviSdk = require('@woovi/node-sdk');

// To initialize
const woovi = WooviSdk.createClient({ appId: 'your-app-id' });
```

Ts/Module:

```ts
import { createClient } from '@woovi/node-sdk';

// To initialize
const woovi = createClient({ appId: 'your-app-id' });
```

The `createClient` method creates a new client from an application ID obtained from the [OpenPix website](https://app.openpix.com.br/home/applications/tab/list).

## Calling the API

A client has _resources_ (e.g. customers, billings, subscriptions, etc.) that can be accessed through `createClient`.

```js
woovi.customer;
```

Each resource will have a set of methods that can be executed to perform operations:

```js
const client = woovi.customer.create({}); //remember to pass the client creation payload
```

## Operations on resources

In each resource, there is a convention in the names of operations, which, for the most part, are summarized as:

- `get`: Get just one resource. Associated with the HTTP verb `GET`.
- `list`: Get various resources, in a paginated form. Associated with the HTTP verb `GET`.
- `create`: Create a resource. Associated with the HTTP verb `POST`.
- `delete`: Remove a resource. Associated with the HTTP verb `DELETE`.

### Input format

In the case of listing operations, an object with an optional paging key is normally accepted.

```js
woovi.refund.list({ skip: 0, limit: 20 });
```

### Output format

Executing an operation will return API results in the form of a direct array or in the form of a pager, if this is applied to the method used.

## Typing

For each operation available for a given type of resource, there are types available directly in the response, informing the input and output format of the operation with a link to the Rest API documentation and usage example.

To use, it is suggested to use an editor with Intellisense such as [Visual Studio Code](https://code.visualstudio.com/).

You can also consult the documentation on the OpenPix website if you have any questions.

## Available resources

The following features are available in the generated `Client`:

- `woovi.account`: Operations on an account.
- `woovi.cashback`: Cashback operations.
- `woovi.charge`: Operations on a payment charge.
- `woovi.chargeRefund`: Operations in return for a charge.
- `woovi.customer`: Operations on customers.
- `woovi.partner`: Operations on partners.
- `woovi.pixQrCode`: Operations on pix-related qr codes.
- `woovi.refund`: Exfund operations.
- `woovi.subAccount`: Operations on sub accounts.
- `woovi.subscription`: Subscription operations.
- `woovi.transactions`: Operations on transactions.
- `woovi.transfer`: Transfer operations.
- `woovi.webhook`: Webhook operations.

## Webhook

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

## Dependencies

The project does not use external dependencies for its operation.

Take a look at [the resources.](./resources.md.md)
