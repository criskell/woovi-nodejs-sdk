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
      correlationID: '9134e286-6f71-427a-bf00-241681624586',
      value: 100,
      comment: 'Comentário do reembolso',
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
          refund: {
            status: 'IN_PROCESSING',
            value: 100,
            correlationID: 'a273e72c-9547-4c75-a213-3b0a2735b8d5',
            endToEndId: 'E23114447202304181826HJNwY577YDX',
            time: '2023-03-02T17:28:51.882Z',
            comment: 'Comentário do reembolso',
          },
        }),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource({
    correlationID: '9134e286-6f71-427a-bf00-241681624586',
    value: 100,
    comment: 'Comentário do reembolso',
  });

  expect(response).toEqual({
    refund: {
      status: 'IN_PROCESSING',
      value: 100,
      correlationID: 'a273e72c-9547-4c75-a213-3b0a2735b8d5',
      endToEndId: 'E23114447202304181826HJNwY577YDX',
      time: '2023-03-02T17:28:51.882Z',
      comment: 'Comentário do reembolso',
    },
  });
});
