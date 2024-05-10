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
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          preRegistrations: [
            {
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
          ],
          pageInfo: {
            errors: [
              {
                message: 'string',
                data: {
                  skip: 0,
                  limit: 0,
                },
              },
            ],
            skip: 0,
            limit: 0,
            totalCount: 0,
            hasPreviousPage: true,
            hasNextPage: true,
          },
        }),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource();
  expect(response).toEqual({
    preRegistrations: [
      {
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
    ],
    pageInfo: {
      errors: [
        {
          message: 'string',
          data: {
            skip: 0,
            limit: 0,
          },
        },
      ],
      skip: 0,
      limit: 0,
      totalCount: 0,
      hasPreviousPage: true,
      hasNextPage: true,
    },
  });
});
