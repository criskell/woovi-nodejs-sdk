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
      pixKey: '9134e286-6f71-427a-bf00-241681624587',
      name: 'Test Account',
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
          SubAccount: {
            name: 'test-sub-account',
            pixKey: 'c4249323-b4ca-43f2-8139-8232aab09b93',
          },
        }),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource({
    pixKey: '9134e286-6f71-427a-bf00-241681624587',
    name: 'Test Account',
  });

  expect(response).toEqual({
    SubAccount: {
      name: 'test-sub-account',
      pixKey: 'c4249323-b4ca-43f2-8139-8232aab09b93',
    },
  });
});
