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
  const account = {
    account: {
      accountId: '6290ccfd42831958a405debc',
      isDefault: true,
      balance: {
        total: 129430,
        blocked: 0,
        available: 129430,
      },
    },
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          account,
        }),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource({ id: 'some_id' });
  expect(response).toEqual({
    account,
  });
});
