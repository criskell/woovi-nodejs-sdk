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

  await expect(
    resource({
      pagination: { limit: 10, skip: 10 },
      query: { charge: 'sseraphini' },
    }),
  ).rejects.toEqual({
    error: 'not exists',
  });

  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.woovi.com/api/v1/transaction?limit=10&skip=10&charge=sseraphini',
    expect.any(Object),
  );
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
          transactions: {
            customer: {
              name: 'Dan',
              email: 'email0@example.com',
              phone: '5511999999999',
              taxID: {
                taxID: '31324227036',
                type: 'BR:CPF',
              },
              correlationID: '9134e286-6f71-427a-bf00-241681624586',
            },
            payer: {
              name: 'Dan',
              email: 'email0@example.com',
              phone: '5511999999999',
              taxID: {
                taxID: '31324227036',
                type: 'BR:CPF',
              },
              correlationID: '9134e286-6f71-427a-bf00-241681624586',
            },
            charge: {
              status: 'ACTIVE',
              customer: '603f81fcc6bccc24326ffb43',
              correlationID: '9134e286-6f71-427a-bf00-241681624586',
              createdAt: '2021-03-03T12:33:00.546Z',
              updatedAt: '2021-03-03T12:33:00.546Z',
            },
            withdraw: {
              value: 100,
              time: '2021-03-03T12:33:00.536Z',
              infoPagador: 'payer info 1',
              endToEndId: 'E18236120202012032010s01345689XBY',
            },
            type: 'PAYMENT',
            infoPagador: 'payer info 0',
            value: 100,
            time: '2021-03-03T12:33:00.536Z',
            transactionID: 'transactionID',
            endToEndId: 'E18236120202012032010s0133872GZA',
          },
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
    transactions: {
      customer: {
        name: 'Dan',
        email: 'email0@example.com',
        phone: '5511999999999',
        taxID: {
          taxID: '31324227036',
          type: 'BR:CPF',
        },
        correlationID: '9134e286-6f71-427a-bf00-241681624586',
      },
      payer: {
        name: 'Dan',
        email: 'email0@example.com',
        phone: '5511999999999',
        taxID: {
          taxID: '31324227036',
          type: 'BR:CPF',
        },
        correlationID: '9134e286-6f71-427a-bf00-241681624586',
      },
      charge: {
        status: 'ACTIVE',
        customer: '603f81fcc6bccc24326ffb43',
        correlationID: '9134e286-6f71-427a-bf00-241681624586',
        createdAt: '2021-03-03T12:33:00.546Z',
        updatedAt: '2021-03-03T12:33:00.546Z',
      },
      withdraw: {
        value: 100,
        time: '2021-03-03T12:33:00.536Z',
        infoPagador: 'payer info 1',
        endToEndId: 'E18236120202012032010s01345689XBY',
      },
      type: 'PAYMENT',
      infoPagador: 'payer info 0',
      value: 100,
      time: '2021-03-03T12:33:00.536Z',
      transactionID: 'transactionID',
      endToEndId: 'E18236120202012032010s0133872GZA',
    },
  });
});
