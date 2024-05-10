import type { RestClientApi } from '@utils/types';
import type { GetPayload, GetResponse } from './types';

export default (restClient: RestClientApi) => {
  return (data: GetPayload) =>
    restClient<GetResponse>(`/api/v1/partner/company/${data.taxID}`);
};
