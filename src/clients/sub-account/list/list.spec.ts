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
          subAccounts: [
            {
              subaccount: {
                name: 'test-sub-account',
                pixKey: 'c4249323-b4ca-43f2-8139-8232aab09b93',
                balance: 100,
              },
            },
          ],
          pageInfo: {
            skip: 0,
            limit: 10,
            totalCount: 20,
            hasPreviousPage: false,
            hasNextPage: true,
          },
        }),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource();
  expect(response).toEqual({
    subAccounts: [
      {
        subaccount: {
          name: 'test-sub-account',
          pixKey: 'c4249323-b4ca-43f2-8139-8232aab09b93',
          balance: 100,
        },
      },
    ],
    pageInfo: {
      skip: 0,
      limit: 10,
      totalCount: 20,
      hasPreviousPage: false,
      hasNextPage: true,
    },
  });
});
