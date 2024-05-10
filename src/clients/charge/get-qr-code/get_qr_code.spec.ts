import getQrCode from '.';

test('Should get link', () => {
  expect(
    getQrCode({ id: 'fe7834b4060c488a9b0f89811be5f5cf', size: 1024 }),
  ).toEqual(
    'https://api.woovi.com/openpix/charge/brcode/image/fe7834b4060c488a9b0f89811be5f5cf.png?size=1024',
  );
});
