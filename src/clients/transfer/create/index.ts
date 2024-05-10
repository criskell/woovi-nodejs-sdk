import type { RestClientApi } from '@utils/types';
import type { CreatePayload, CreateResponse } from './types';

export default (restClient: RestClientApi) => {
  return (data: CreatePayload) =>
    restClient<CreateResponse>(`/api/v1/transfer`, { method: 'POST' }, data);
};
