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
          pixTransactionRefund: {
            value: 100,
            correlationID: '7777-6f71-427a-bf00-241681624586',
            refundId: '11bf5b37e0b842e08dcfdc8c4aefc000',
            returnIdentification: 'D09089356202108032000a543e325902',
            comment: 'Comentário do reembolso',
          },
        }),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource({ id: 'some_id' });
  expect(response).toEqual({
    pixTransactionRefund: {
      value: 100,
      correlationID: '7777-6f71-427a-bf00-241681624586',
      refundId: '11bf5b37e0b842e08dcfdc8c4aefc000',
      returnIdentification: 'D09089356202108032000a543e325902',
      comment: 'Comentário do reembolso',
    },
  });
});
