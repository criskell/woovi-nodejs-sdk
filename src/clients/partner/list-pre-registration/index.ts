import type { RestClientApi } from '@utils/types';
import type { ListResponse } from './types';

export default (restClient: RestClientApi) => {
  return () => restClient<ListResponse>(`/api/v1/partner/company`);
};
