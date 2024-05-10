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
      chargeId: 'charge id',
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
              value: 10,
              correlationID: '9134e286-6f71-427a-bf00-241681624586',
              endToEndId: 'E23114447202304181826HJNwY577YDX',
              time: '2021-03-02T17:28:51.882Z',
            },
            {
              status: 'CONFIRMED',
              value: 40,
              correlationID: '589a378e-ab45-4f30-bd4d-4496c60f88cf',
              endToEndId: 'E23114447202304181057pOhPMsp2pJZ',
              time: '2021-03-05T14:49:02.922Z',
              comment: 'Comentário do reembolso',
            },
          ],
        }),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource({
    chargeId: 'charge id',
  });
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
        value: 10,
        correlationID: '9134e286-6f71-427a-bf00-241681624586',
        endToEndId: 'E23114447202304181826HJNwY577YDX',
        time: '2021-03-02T17:28:51.882Z',
      },
      {
        status: 'CONFIRMED',
        value: 40,
        correlationID: '589a378e-ab45-4f30-bd4d-4496c60f88cf',
        endToEndId: 'E23114447202304181057pOhPMsp2pJZ',
        time: '2021-03-05T14:49:02.922Z',
        comment: 'Comentário do reembolso',
      },
    ],
  });
});
