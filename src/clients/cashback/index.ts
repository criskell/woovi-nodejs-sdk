import type { RestClientApi } from '@utils/types';
import get from './get';
import getOrCreate from './get-or-create';

export default (restClient: RestClientApi) => {
  return {
    get: get(restClient),
    getOrCreate: getOrCreate(restClient),
  };
};
