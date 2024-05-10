import type { RestClientApi } from '@utils/types';
import create from './create';
import _delete from './delete';
import handler from './handler';
import list from './list';

export default (restClient: RestClientApi) => {
  return {
    create: create(restClient),
    delete: _delete(restClient),
    handler: handler,
    list: list(restClient),
  };
};
