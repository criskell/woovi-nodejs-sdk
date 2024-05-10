import type { BinaryToTextEncoding } from 'crypto';

export const API_BASE_URL = 'https://api.woovi.com' as const;
export const API_RETRIES = 2 as const;
export const API_RETRIE_DELAY = 1000 as const;

export const SDK_VERSION: string = '1.0.0';

export const WH_PUBLIC_KEY =
  'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FDLytOdElranpldnZxRCtJM01NdjNiTFhEdApwdnhCalk0QnNSclNkY2EzcnRBd01jUllZdnhTbmQ3amFnVkxwY3RNaU94UU84aWVVQ0tMU1dIcHNNQWpPL3paCldNS2Jxb0c4TU5waS91M2ZwNnp6MG1jSENPU3FZc1BVVUcxOWJ1VzhiaXM1WloySVpnQk9iV1NwVHZKMGNuajYKSEtCQUE4MkpsbitsR3dTMU13SURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQo=';
export const WH_ALGORITHM = 'sha256';
export const WH_SIGNATURE_FORMAT: BinaryToTextEncoding = 'base64';

export const Headers: {
  AUTHORIZATION: 'Authorization';
  CONTENT_TYPE: 'Content-Type';
  USER_AGENT: 'User-Agent';
} = {
  AUTHORIZATION: 'Authorization',
  CONTENT_TYPE: 'Content-Type',
  USER_AGENT: 'User-Agent',
};

export const getNodeVersion = (): string => {
  return process.version;
};

export const getNodeArchitecture = (): string => {
  return process.arch;
};

export const getNodePlatform = (): string => {
  return process.platform;
};

export const getUserAgent = (): string => {
  return (
    'Woovi Node.js SDK v' +
    SDK_VERSION +
    ' (node ' +
    getNodeVersion() +
    '-' +
    getNodeArchitecture() +
    '-' +
    getNodePlatform() +
    ')'
  );
};

export default {
  API_BASE_URL,
  API_RETRIES,
  API_RETRIE_DELAY,
  SDK_VERSION,
  Headers,
  WH_ALGORITHM,
  WH_SIGNATURE_FORMAT,
  WH_PUBLIC_KEY,
  getNodeVersion,
  getNodeArchitecture,
  getNodePlatform,
  getUserAgent,
};
