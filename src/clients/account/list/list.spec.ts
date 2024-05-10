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
  const list = {
    pageInfo: {
      skip: 0,
      limit: 10,
      totalCount: 20,
      hasPreviousPage: false,
      hasNextPage: true,
    },
    accounts: [
      {
        accountId: '6290ccfd42831958a405debc',
        isDefault: true,
        balance: {
          total: 129430,
          blocked: 0,
          available: 129430,
        },
      },
      {
        accountId: '6286b467a7910113577e00ce',
        isDefault: false,
        balance: {
          total: 130,
          blocked: 100,
          available: 30,
        },
      },
    ],
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(list),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource();
  expect(response).toEqual(list);
});
