import type { RestClientApi } from '@utils/types';
import create from './create';
import get from './get';

export default (restClient: RestClientApi) => {
  return {
    get: get(restClient),
    create: create(restClient),
  };
};
