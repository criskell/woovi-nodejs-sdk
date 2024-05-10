import type { RestClientApi } from '@utils/types';
import create from './create';
import _delete from './delete';
import get from './get';
import getQrCode from './get-qr-code';
import list from './list';

export default (restClient: RestClientApi) => {
  return {
    get: get(restClient),
    create: create(restClient),
    delete: _delete(restClient),
    getQrCode: getQrCode,
    list: list(restClient),
  };
};
