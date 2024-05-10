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
      name: 'Cristiano',
      phone: '11123456789',
    }),
  ).rejects.toEqual({
    error: 'not exists',
  });
});

test('Should have success', async () => {
  const customer = {
    name: 'Dan',
    email: 'email0@example.com',
    phone: '5511999999999',
    taxID: {
      taxID: '31324227036',
      type: 'BR:CPF',
    },
    address: {
      zipcode: '30421322',
      street: 'Street',
      number: '100',
      neighborhood: 'Neighborhood',
      city: 'Belo Horizonte',
      state: 'MG',
      complement: 'APTO',
      country: 'BR',
    },
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          customer,
        }),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource({
    ...customer,
    taxID: '31324227036',
  });

  expect(response).toEqual({
    customer,
  });
});
