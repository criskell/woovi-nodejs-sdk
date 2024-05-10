import { RestClient } from '@utils/restClient';
import approve from '.';

const unmockedFetch = global.fetch;

afterAll(() => {
  global.fetch = unmockedFetch;
});

declare var global: {
  fetch: unknown;
};

const client = RestClient({ appId: '123' });
const resource = approve(client);

test('Should get error', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ error: 'not exists' }),
      ok: false,
      status: 400,
    }),
  );

  await expect(
    resource({
      webhook: {
        name: 'webhookName',
        event: 'OPENPIX:CHARGE_CREATED',
        url: 'https://mycompany.com.br/webhook',
        authorization: 'openpix',
        isActive: true,
      },
    }),
  ).rejects.toEqual({
    error: 'not exists',
  });
});

test('Should have success', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          webhook: {
            id: 'V2ViaG9vazo2MDNlYmUxZWRlYjkzNWU4NmQyMmNmMTg=',
            name: 'webhookName',
            url: 'https://mycompany.com.br/webhook',
            authorization: 'openpix',
            isActive: true,
            event: 'OPENPIX:TRANSACTION_RECEIVED',
            createdAt: '2021-03-02T22:29:10.720Z',
            updatedAt: '2021-03-02T22:29:10.720Z',
          },
        }),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource({
    webhook: {
      name: 'webhookName',
      event: 'OPENPIX:CHARGE_CREATED',
      url: 'https://mycompany.com.br/webhook',
      authorization: 'openpix',
      isActive: true,
    },
  });
  expect(response).toEqual({
    webhook: {
      id: 'V2ViaG9vazo2MDNlYmUxZWRlYjkzNWU4NmQyMmNmMTg=',
      name: 'webhookName',
      url: 'https://mycompany.com.br/webhook',
      authorization: 'openpix',
      isActive: true,
      event: 'OPENPIX:TRANSACTION_RECEIVED',
      createdAt: '2021-03-02T22:29:10.720Z',
      updatedAt: '2021-03-02T22:29:10.720Z',
    },
  });
});
