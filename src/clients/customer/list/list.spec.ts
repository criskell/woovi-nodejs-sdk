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
  const result = {
    pageInfo: {
      skip: 0,
      limit: 10,
      totalCount: 20,
      hasPreviousPage: false,
      hasNextPage: true,
    },
    customers: [
      {
        name: 'Dan',
        email: 'email0@example.com',
        phone: '5511999999999',
        taxID: {
          taxID: '31324227036',
          type: 'BR:CPF',
        },
      },
    ],
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(result),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource();
  expect(response).toEqual(result);
});
