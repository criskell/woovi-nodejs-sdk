import { RestClient } from '@utils/restClient';
import approve from '.';

const unmockedFetch = global.fetch;

afterAll(() => {
  global.fetch = unmockedFetch;
});

declare var global: {
  fetch: unknown;
};

const client = RestClient({ appId: '123' });
const resource = approve(client);

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
          pixQrCode: {
            name: 'pix qrcode static',
            value: 100,
            comment: 'pix qrcode static',
            correlationID: 'fe7834b4060c488a9b0f89811be5f5cf',
            identifier: 'zr7833b4060c488a9b0f89811',
            paymentLinkID: '7777-6f71-427a-bf00-241681624586',
            paymentLinkUrl:
              'https://openpix.com.br/pay/fe7834b4060c488a9b0f89811be5f5cf',
            qrCodeImage:
              'https://api.openpix.com.br/openpix/charge/brcode/image/fe7834b4060c488a9b0f89811be5f5cf.png',
            brCode:
              '000201010212261060014br.gov.bcb.pix2584https://api.openpix.com.br/openpix/testing?transactionID=867ba5173c734202ac659721306b38c952040000530398654040.015802BR5909LOCALHOST6009Sao Paulo62360532867ba5173c734202ac659721306b38c963044BCA',
            createdAt: '2021-03-02T17:28:51.882Z',
            updatedAt: '2021-03-02T17:28:51.882Z',
          },
        }),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource({ id: 'some_id' });
  expect(response).toEqual({
    pixQrCode: {
      name: 'pix qrcode static',
      value: 100,
      comment: 'pix qrcode static',
      correlationID: 'fe7834b4060c488a9b0f89811be5f5cf',
      identifier: 'zr7833b4060c488a9b0f89811',
      paymentLinkID: '7777-6f71-427a-bf00-241681624586',
      paymentLinkUrl:
        'https://openpix.com.br/pay/fe7834b4060c488a9b0f89811be5f5cf',
      qrCodeImage:
        'https://api.openpix.com.br/openpix/charge/brcode/image/fe7834b4060c488a9b0f89811be5f5cf.png',
      brCode:
        '000201010212261060014br.gov.bcb.pix2584https://api.openpix.com.br/openpix/testing?transactionID=867ba5173c734202ac659721306b38c952040000530398654040.015802BR5909LOCALHOST6009Sao Paulo62360532867ba5173c734202ac659721306b38c963044BCA',
      createdAt: '2021-03-02T17:28:51.882Z',
      updatedAt: '2021-03-02T17:28:51.882Z',
    },
  });
});
