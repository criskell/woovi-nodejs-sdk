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
          transaction: {
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
              createdAt: '2021-03-03T12:33:00.546Z',
            },
            infoPagador: 'payer info 0',
            value: 100,
            time: '2021-03-03T12:33:00.536Z',
            transactionID: 'transactionID',
            type: 'PAYMENT',
            endToEndId: 'E18236120202012032010s0133872GZA',
            globalID: 'UGl4VHJhbnNhY3Rpb246NzE5MWYxYjAyMDQ2YmY1ZjUzZGNmYTBi',
          },
        }),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource({ id: 'some_id' });
  expect(response).toEqual({
    transaction: {
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
        createdAt: '2021-03-03T12:33:00.546Z',
      },
      infoPagador: 'payer info 0',
      value: 100,
      time: '2021-03-03T12:33:00.536Z',
      transactionID: 'transactionID',
      type: 'PAYMENT',
      endToEndId: 'E18236120202012032010s0133872GZA',
      globalID: 'UGl4VHJhbnNhY3Rpb246NzE5MWYxYjAyMDQ2YmY1ZjUzZGNmYTBi',
    },
  });
});
