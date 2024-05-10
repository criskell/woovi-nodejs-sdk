import type { GetPayload } from './types';

export default ({ id, size }: GetPayload) =>
  `https://api.woovi.com/openpix/charge/brcode/image/${id}.png?size=${
    size || 1024
  }`;
