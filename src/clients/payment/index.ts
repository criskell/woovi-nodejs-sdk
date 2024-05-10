import type { RestClientApi } from '@utils/types';
import approve from './approve';
import create from './create';
import get from './get';
import list from './list';

export default (restClient: RestClientApi) => {
  return {
    get: get(restClient),
    create: create(restClient),
    approve: approve(restClient),
    list: list(restClient),
  };
};
