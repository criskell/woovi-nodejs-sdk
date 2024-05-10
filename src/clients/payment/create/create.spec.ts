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
      destinationAlias: 'c4249323-b4ca-43f2-8139-8232aab09b93',
      destinationAliasType: 'RANDOM',
      comment: 'payment comment',
      correlationID: 'payment1',
      sourceAccountId: 'my-source-account-id',
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
          payment: {
            value: 100,
            status: 'CREATED',
            destinationAlias: 'c4249323-b4ca-43f2-8139-8232aab09b93',
            destinationAliasType: 'RANDOM',
            qrCode:
              '000201010212261060014br.gov.bcb.pix2584https://api.openpix.com.br/openpix/testing?transactionID=867ba5173c734202ac659721306b38c952040000530398654040.015802BR5909LOCALHOST6009Sao Paulo62360532867ba5173c734202ac659721306b38c963044BCA',
            comment: 'payment comment',
            correlationID: 'payment1',
            sourceAccountId: 'my-source-account-id',
          },
        }),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource({
    qrCode:
      '000201010212261060014br.gov.bcb.pix2584https://api.openpix.com.br/openpix/testing?transactionID=867ba5173c734202ac659721306b38c952040000530398654040.015802BR5909LOCALHOST6009SaoPaulo62360532867ba5173c734202ac659721306b38c963044BCA',
    comment: 'payment comment',
    correlationID: 'payment1',
    sourceAccountId: 'my-source-account-id',
  });

  expect(response).toEqual({
    payment: {
      value: 100,
      status: 'CREATED',
      destinationAlias: 'c4249323-b4ca-43f2-8139-8232aab09b93',
      destinationAliasType: 'RANDOM',
      qrCode:
        '000201010212261060014br.gov.bcb.pix2584https://api.openpix.com.br/openpix/testing?transactionID=867ba5173c734202ac659721306b38c952040000530398654040.015802BR5909LOCALHOST6009Sao Paulo62360532867ba5173c734202ac659721306b38c963044BCA',
      comment: 'payment comment',
      correlationID: 'payment1',
      sourceAccountId: 'my-source-account-id',
    },
  });
});
