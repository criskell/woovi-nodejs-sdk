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
      fromPixKey: 'from@openpix.com.br',
      toPixKey: 'to@openpix.com.br',
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
          transaction: {
            value: 100,
            time: '2023-06-22T15:33:27.165Z,',
            correlationID: 'c782e0ac-833d-4a89-9e73-9b60b2b41d3a',
          },
        }),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource({
    value: 100,
    fromPixKey: 'from@openpix.com.br',
    toPixKey: 'to@openpix.com.br',
  });

  expect(response).toEqual({
    transaction: {
      value: 100,
      time: '2023-06-22T15:33:27.165Z,',
      correlationID: 'c782e0ac-833d-4a89-9e73-9b60b2b41d3a',
    },
  });
});
