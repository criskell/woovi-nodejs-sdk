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
            limit: 10,
            totalCount: 20,
            hasPreviousPage: false,
            hasNextPage: true,
          },
          payments: [
            {
              payment: {
                value: 100,
                status: 'CONFIRMED',
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
      limit: 10,
      totalCount: 20,
      hasPreviousPage: false,
      hasNextPage: true,
    },
    payments: [
      {
        payment: {
          value: 100,
          status: 'CONFIRMED',
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
      },
    ],
  });
});
