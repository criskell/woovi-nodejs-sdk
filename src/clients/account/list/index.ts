import type { Pagination } from '@src/types';
import { objectToQueryString } from '@utils/restClient';
import type { RestClientApi } from '@utils/types';
import type { ListResponse } from './types';

export default (restClient: RestClientApi) => {
  return (pagination: Pagination = { limit: 10, skip: 0 }) =>
    restClient<ListResponse>(
      `/api/v1/account?${objectToQueryString({ ...pagination })}`,
    );
};
