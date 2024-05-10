import type { RestClientApi } from '@utils/types';
import create from './create';
import list from './list';

export default (restClient: RestClientApi) => {
  return {
    list: list(restClient),
    create: create(restClient),
  };
};
