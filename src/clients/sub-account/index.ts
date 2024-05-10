import type { RestClientApi } from '@utils/types';
import create from './create';
import get from './get';
import list from './list';
import withdraw from './withdraw';

export default (restClient: RestClientApi) => {
  return {
    get: get(restClient),
    create: create(restClient),
    withdraw: withdraw(restClient),
    list: list(restClient),
  };
};
