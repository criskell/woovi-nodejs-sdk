import type { Pagination } from '@src/types';
import { objectToQueryString } from '@utils/restClient';
import type { RestClientApi } from '@utils/types';
import type { ListPayload, ListResponse } from './types';

export default (restClient: RestClientApi) => {
  return (
    config: { pagination?: Pagination; query?: ListPayload } = {
      pagination: { limit: 10, skip: 0 },
      query: {},
    },
  ) =>
    restClient<ListResponse>(
      `/api/v1/transaction?${objectToQueryString({
        ...config.pagination,
        ...config.query,
      })}`,
    );
};
