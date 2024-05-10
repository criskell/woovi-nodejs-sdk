import { RestClient } from '@utils/restClient';
import list from '.';

const unmockedFetch = global.fetch;

afterAll(() => {
  global.fetch = unmockedFetch;
});

declare var global: {
  fetch: unknown;
};

const client = RestClient({ appId: '123' });
const resource = list(client);

test('Should get error', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ error: 'not exists' }),
      ok: false,
      status: 400,
    }),
  );

  await expect(resource()).rejects.toEqual({
    error: 'not exists',
  });
});

test('Should have success', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          pageInfo: {
            skip: 0,
            limit: 100,
            totalCount: 2,
            hasPreviousPage: false,
            hasNextPage: true,
          },
          webhooks: [
            {
              id: 'V2ViaG9vazo2MDNlYmUxZWRlYjkzNWU4NmQyMmNmMTg=',
              name: 'webhookName',
              url: 'https://mycompany.com.br/webhook',
              authorization: 'openpix',
              event: 'OPENPIX:TRANSACTION_RECEIVED',
              isActive: true,
              createdAt: '2021-03-02T22:29:10.720Z',
              updatedAt: '2021-03-02T22:29:10.720Z',
            },
            {
              id: 'V2ViaG9vazo2MDNlYmUxZWRlYjkzNWU4NmQyMmNmOTk=',
              name: 'webhookName',
              url: 'https://mycompany.com.br/webhook',
              authorization: 'openpix',
              event: 'OPENPIX:CHARGE_CREATED',
              isActive: true,
              createdAt: '2021-03-02T22:29:10.720Z',
              updatedAt: '2021-03-02T22:29:10.720Z',
            },
          ],
        }),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource();
  expect(response).toEqual({
    pageInfo: {
      skip: 0,
      limit: 100,
      totalCount: 2,
      hasPreviousPage: false,
      hasNextPage: true,
    },
    webhooks: [
      {
        id: 'V2ViaG9vazo2MDNlYmUxZWRlYjkzNWU4NmQyMmNmMTg=',
        name: 'webhookName',
        url: 'https://mycompany.com.br/webhook',
        authorization: 'openpix',
        event: 'OPENPIX:TRANSACTION_RECEIVED',
        isActive: true,
        createdAt: '2021-03-02T22:29:10.720Z',
        updatedAt: '2021-03-02T22:29:10.720Z',
      },
      {
        id: 'V2ViaG9vazo2MDNlYmUxZWRlYjkzNWU4NmQyMmNmOTk=',
        name: 'webhookName',
        url: 'https://mycompany.com.br/webhook',
        authorization: 'openpix',
        event: 'OPENPIX:CHARGE_CREATED',
        isActive: true,
        createdAt: '2021-03-02T22:29:10.720Z',
        updatedAt: '2021-03-02T22:29:10.720Z',
      },
    ],
  });
});
