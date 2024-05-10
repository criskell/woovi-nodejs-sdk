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
          pageInfo: {
            skip: 0,
            limit: 10,
            totalCount: 20,
            hasPreviousPage: false,
            hasNextPage: true,
          },
          refunds: [
            {
              status: 'IN_PROCESSING',
              value: 100,
              correlationID: '9134e286-6f71-427a-bf00-241681624586',
              refundId: '9134e2866f71427abf00241681624586',
              time: '2021-03-02T17:28:51.882Z',
              comment: 'Comentário do reembolso',
            },
          ],
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
    refunds: [
      {
        status: 'IN_PROCESSING',
        value: 100,
        correlationID: '9134e286-6f71-427a-bf00-241681624586',
        refundId: '9134e2866f71427abf00241681624586',
        time: '2021-03-02T17:28:51.882Z',
        comment: 'Comentário do reembolso',
      },
    ],
  });
});
