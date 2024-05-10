import constants from '@utils/constants';
import { RestClient } from '.';

const unmockedFetch = global.fetch;

afterAll(() => {
  global.fetch = unmockedFetch;
});

declare var global: {
  fetch: unknown;
};

const client = RestClient({ appId: '123' });

describe('RestClient', () => {
  test('Should set GET http as default method', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
        ok: true,
      }),
    );

    await client('/test');

    expect(fetch).toHaveBeenCalledWith(expect.any(String), {
      method: 'GET',
      headers: expect.any(Object),
    });
  });

  test('Should append query parameters to the URL', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
        ok: true,
      }),
    );

    const queryParams = { param1: 'value1', param2: 'value2' };
    await client('/test', { queryParams });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('param1=value1&param2=value2'),
      {
        method: 'GET',
        headers: expect.any(Object),
      },
    );
  });

  test('Should handle network errors and retry according to the retry count', async () => {
    var fetchCounter = 0;

    global.fetch = jest.fn(() => {
      fetchCounter++;
      switch (fetchCounter) {
        case 1:
          return Promise.reject(new Error('Network Error 1'));
        case 2:
          return Promise.reject(new Error('Network Error 2'));
        case 3:
          return Promise.resolve({
            json: () => Promise.resolve({ success: true }),
            ok: true,
          });
        default:
          return Promise.reject(new Error('Unknown Error'));
      }
    });

    const retries = 3;
    const endpoint = '/test-network-retry';
    const response = await client<{ success: true; api_response: unknown }>(
      endpoint,
      { retries },
    );

    expect(fetch).toHaveBeenCalledTimes(retries);
    expect(response.success).toEqual(true);
  }, 10000);

  test('Should allow custom headers to be set in the request', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
        ok: true,
      }),
    );

    const customHeaders = {
      'x-custom-header': '123',
    };

    const endpoint = '/test-custom-headers';
    await client(endpoint, { headers: customHeaders });

    expect(fetch).toHaveBeenCalledWith(expect.any(String), {
      method: 'GET',
      headers: {
        ...customHeaders,
        'User-Agent': expect.any(String),
        Authorization: expect.any(String),
        'Content-Type': expect.any(String),
      },
    });
  });

  test('Should support custom request methods', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
        ok: true,
      }),
    );

    const endpoint = '/test-custom-method';
    const customMethod = 'PUT';
    await client(endpoint, { method: customMethod });

    expect(fetch).toHaveBeenCalledWith(expect.any(String), {
      method: customMethod,
      headers: expect.any(Object),
    });
  });
});
