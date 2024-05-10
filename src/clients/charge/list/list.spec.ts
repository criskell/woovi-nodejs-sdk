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
  const charges = {
    pageInfo: {
      skip: 0,
      limit: 10,
      totalCount: 20,
      hasPreviousPage: false,
      hasNextPage: true,
    },
    charges: [
      {
        status: 'ACTIVE',
        customer: {
          name: 'Dan',
          email: 'email0@example.com',
          phone: '5511999999999',
          taxID: {
            taxID: '31324227036',
            type: 'BR:CPF',
          },
        },
        value: 100,
        comment: 'good',
        correlationID: '9134e286-6f71-427a-bf00-241681624586',
        paymentLinkID: '7777a23s-6f71-427a-bf00-241681624586',
        paymentLinkUrl:
          'https://openpix.com.br/pay/9134e286-6f71-427a-bf00-241681624586',
        qrCodeImage:
          'https://api.openpix.com.br/openpix/charge/brcode/image/9134e286-6f71-427a-bf00-241681624586.png',
        brCode:
          '000201010212261060014br.gov.bcb.pix2584https://api.openpix.com.br/openpix/testing?transactionID=867ba5173c734202ac659721306b38c952040000530398654040.015802BR5909LOCALHOST6009Sao Paulo62360532867ba5173c734202ac659721306b38c963044BCA',
        additionalInfo: [
          {
            key: 'Product',
            value: 'Pencil',
          },
          {
            key: 'Invoice',
            value: '18476',
          },
          {
            key: 'Order',
            value: '302',
          },
        ],
        expiresIn: 2592000,
        expiresDate: '2021-04-01T17:28:51.882Z',
        createdAt: '2021-03-02T17:28:51.882Z',
        updatedAt: '2021-03-02T17:28:51.882Z',
      },
    ],
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(charges),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource();
  expect(response).toEqual(charges);
});
