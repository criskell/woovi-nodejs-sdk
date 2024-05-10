import { RestClient } from '@utils/restClient';
import create from '.';

const unmockedFetch = global.fetch;

afterAll(() => {
  global.fetch = unmockedFetch;
});

declare var global: {
  fetch: unknown;
};

const client = RestClient({ appId: '123' });
const resource = create(client);

test('Should get error', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ error: 'not exists' }),
      ok: false,
      status: 400,
    }),
  );

  await expect(
    resource({ id: '9134e286-6f71-427a-bf00-241681624587' }),
  ).rejects.toEqual({
    error: 'not exists',
  });
});

test('Should have success', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          withdraw: {
            account: {
              status: 'CREATED',
              value: 100,
              correlationID: 'TESTING1323',
              destinationAlias: 'pixKeyTest@test.com',
              comment: 'testing-transaction',
            },
          },
        }),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource({
    id: '9134e286-6f71-427a-bf00-241681624587',
  });

  expect(response).toEqual({
    withdraw: {
      account: {
        status: 'CREATED',
        value: 100,
        correlationID: 'TESTING1323',
        destinationAlias: 'pixKeyTest@test.com',
        comment: 'testing-transaction',
      },
    },
  });
});
