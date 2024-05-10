import type { RestClientApi } from '@utils/types';
import get from './get';
import list from './list';
import withdraw from './withdraw';

export default (restClient: RestClientApi) => {
  return {
    get: get(restClient),
    list: list(restClient),
    withdraw: withdraw(restClient),
  };
};
