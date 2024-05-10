import type { RestClientApi } from '@utils/types';
import get from './get';
import list from './list';

export default (restClient: RestClientApi) => {
  return {
    get: get(restClient),
    list: list(restClient),
  };
};
