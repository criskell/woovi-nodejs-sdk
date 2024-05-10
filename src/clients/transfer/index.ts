import type { RestClientApi } from '@utils/types';
import create from './create';

export default (restClient: RestClientApi) => {
  return {
    create: create(restClient),
  };
};
