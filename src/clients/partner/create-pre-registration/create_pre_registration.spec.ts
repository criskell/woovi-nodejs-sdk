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
      preRegistration: {
        name: 'Example LLC',
        taxID: {
          taxID: '11111111111111',
          type: 'BR:CNPJ',
        },
        website: 'examplellc.com',
      },
      user: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@examplellc.com',
        phone: '+5511912345678',
      },
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
          preRegistration: {
            name: 'string',
            website: 'string',
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
        }),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource({
    preRegistration: {
      name: 'Example LLC',
      taxID: {
        taxID: '11111111111111',
        type: 'BR:CNPJ',
      },
      website: 'examplellc.com',
    },
    user: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@examplellc.com',
      phone: '+5511912345678',
    },
  });

  expect(response).toEqual({
    preRegistration: {
      name: 'string',
      website: 'string',
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
  });
});
