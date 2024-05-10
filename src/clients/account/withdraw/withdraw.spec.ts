import { RestClient } from '@utils/restClient';
import withdraw from '.';

const unmockedFetch = global.fetch;

afterAll(() => {
  global.fetch = unmockedFetch;
});

declare var global: {
  fetch: unknown;
};

const client = RestClient({ appId: '123' });
const resource = withdraw(client);

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
      accountId: '6290ccfd42831958a405debc',
      value: 7000,
    }),
  ).rejects.toEqual({
    error: 'not exists',
  });
});

test('Should have success', async () => {
  const responseData = {
    withdraw: {
      account: {
        accountId: '6290ccfd42831958a405debc',
        isDefault: true,
        balance: {
          total: 122430,
          blocked: 0,
          available: 122430,
        },
      },
      transaction: {
        endToEndId: 'E23114447202205191817cx6VMrbwtw6',
        value: 7000,
      },
    },
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(responseData),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource({
    accountId: '6290ccfd42831958a405debc',
    value: 7000,
  });

  expect(response).toEqual(responseData);
});
