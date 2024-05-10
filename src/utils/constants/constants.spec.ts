import Constants from '.';

jest.mock('../../../package.json', () => ({
  version: '1.0.0-test',
}));

describe('Constants', () => {
  let originalNodeVersion: string;
  let originalNodeArchitecture: string;
  let originalNodePlatform: string;

  beforeEach(() => {
    originalNodeVersion = Constants.getNodeVersion();
    originalNodeArchitecture = Constants.getNodeArchitecture();
    originalNodePlatform = Constants.getNodePlatform();

    Constants['SDK_VERSION'] = '1.0.0-test';
    Constants['getNodeVersion'] = jest.fn(() => 'v13.14.0');
    Constants['getNodeArchitecture'] = jest.fn(() => 'x64');
    Constants['getNodePlatform'] = jest.fn(() => 'linux');
  });

  afterEach(() => {
    Constants['getNodeVersion'] = jest.fn(() => originalNodeVersion);
    Constants['getNodeArchitecture'] = jest.fn(() => originalNodeArchitecture);
    Constants['getNodePlatform'] = jest.fn(() => originalNodePlatform);
  });

  it('should have correct constants', () => {
    expect(Constants.API_RETRIE_DELAY).toEqual(1000);
    expect(Constants.API_RETRIES).toEqual(2);
    expect(Constants.API_BASE_URL).toEqual('https://api.woovi.com');
    expect(Constants.WH_ALGORITHM).toEqual('sha256');
    expect(Constants.WH_SIGNATURE_FORMAT).toEqual('base64');
    expect(Constants.WH_PUBLIC_KEY).toEqual(
      'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FDLytOdElranpldnZxRCtJM01NdjNiTFhEdApwdnhCalk0QnNSclNkY2EzcnRBd01jUllZdnhTbmQ3amFnVkxwY3RNaU94UU84aWVVQ0tMU1dIcHNNQWpPL3paCldNS2Jxb0c4TU5waS91M2ZwNnp6MG1jSENPU3FZc1BVVUcxOWJ1VzhiaXM1WloySVpnQk9iV1NwVHZKMGNuajYKSEtCQUE4MkpsbitsR3dTMU13SURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQo=',
    );
    expect(Constants.getNodeVersion()).toEqual('v13.14.0');
    expect(Constants.getNodeArchitecture()).toEqual('x64');
    expect(Constants.getNodePlatform()).toEqual('linux');
  });

  it('should return correct user agent', () => {
    const expectedUserAgent = `Woovi Node.js SDK v1.0.0 (node ${process.version}-x64-linux)`;
    expect(Constants.getUserAgent()).toEqual(expectedUserAgent);
  });
});
