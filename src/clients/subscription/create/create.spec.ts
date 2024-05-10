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
    resource({
      value: 100,
      customer: {
        name: 'Dan',
        taxID: '31324227036',
        email: 'email0@example.com',
        phone: '5511999999999',
      },
      dayGenerateCharge: 15,
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
          subscription: {
            globalID:
              'UGF5bWVudFN1YnNjcmlwdGlvbjo2M2UzYjJiNzczZDNkOTNiY2RkMzI5OTM=',
            customer: {
              name: 'Dan',
              email: 'email0@example.com',
              phone: '5511999999999',
              taxID: {
                taxID: '31324227036',
                type: 'BR:CPF',
              },
            },
            value: 100,
            dayGenerateCharge: 5,
          },
        }),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource({
    value: 100,
    customer: {
      name: 'Dan',
      taxID: '31324227036',
      email: 'email0@example.com',
      phone: '5511999999999',
    },
    dayGenerateCharge: 15,
  });

  expect(response).toEqual({
    subscription: {
      globalID: 'UGF5bWVudFN1YnNjcmlwdGlvbjo2M2UzYjJiNzczZDNkOTNiY2RkMzI5OTM=',
      customer: {
        name: 'Dan',
        email: 'email0@example.com',
        phone: '5511999999999',
        taxID: {
          taxID: '31324227036',
          type: 'BR:CPF',
        },
      },
      value: 100,
      dayGenerateCharge: 5,
    },
  });
});
