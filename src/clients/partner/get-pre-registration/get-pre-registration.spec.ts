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

  await expect(resource({ taxID: 'some_id' })).rejects.toEqual({
    error: 'not exists',
  });
});

test('Should have success', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          preRegistration: {
            preRegistration: {
              name: 'string',
              taxID: {
                taxID: 'string',
                type: 'BR:CNPJ',
              },
            },
            user: {
              firstName: 'string',
              lastName: 'string',
              email: 'string',
              phone: 'string',
            },
            company: {
              id: 'string',
              name: 'string',
              taxID: {
                taxID: 'string',
                type: 'BR:CNPJ',
              },
            },
            account: {
              clientId: 'string',
            },
          },
        }),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource({ taxID: 'some_id' });
  expect(response).toEqual({
    preRegistration: {
      preRegistration: {
        name: 'string',
        taxID: {
          taxID: 'string',
          type: 'BR:CNPJ',
        },
      },
      user: {
        firstName: 'string',
        lastName: 'string',
        email: 'string',
        phone: 'string',
      },
      company: {
        id: 'string',
        name: 'string',
        taxID: {
          taxID: 'string',
          type: 'BR:CNPJ',
        },
      },
      account: {
        clientId: 'string',
      },
    },
  });
});
