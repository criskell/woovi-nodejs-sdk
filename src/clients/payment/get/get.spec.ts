import { RestClient } from '@utils/restClient';
import get from '.';

const unmockedFetch = global.fetch;

afterAll(() => {
  global.fetch = unmockedFetch;
});

declare var global: {
  fetch: unknown;
};

const client = RestClient({ appId: '123' });
const resource = get(client);

test('Should get error', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ error: 'not exists' }),
      ok: false,
      status: 400,
    }),
  );

  await expect(resource({ id: 'some_id' })).rejects.toEqual({
    error: 'not exists',
  });
});

test('Should have success', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          payment: {
            value: 100,
            status: 'APPROVED',
            destinationAlias: 'c4249323-b4ca-43f2-8139-8232aab09b93',
            comment: 'payment comment',
            correlationID: 'payment1',
            sourceAccountId: 'my-source-account-id',
          },
          transaction: {
            value: 100,
            endToEndId: 'transaction-end-to-end-id',
            time: '2023-03-20T13:14:17.000Z',
          },
          destination: {
            name: 'Dan',
            taxID: '31324227036',
            pixKey: 'c4249323-b4ca-43f2-8139-8232aab09b93',
            bank: 'A Bank',
            branch: '1',
            account: '123456',
          },
        }),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource({ id: 'some_id' });
  expect(response).toEqual({
    payment: {
      value: 100,
      status: 'APPROVED',
      destinationAlias: 'c4249323-b4ca-43f2-8139-8232aab09b93',
      comment: 'payment comment',
      correlationID: 'payment1',
      sourceAccountId: 'my-source-account-id',
    },
    transaction: {
      value: 100,
      endToEndId: 'transaction-end-to-end-id',
      time: '2023-03-20T13:14:17.000Z',
    },
    destination: {
      name: 'Dan',
      taxID: '31324227036',
      pixKey: 'c4249323-b4ca-43f2-8139-8232aab09b93',
      bank: 'A Bank',
      branch: '1',
      account: '123456',
    },
  });
});
