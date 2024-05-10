import type { RestClientApi } from '@utils/types';
import type { ApprovePayload, ApproveResponse } from './types';

export default (restClient: RestClientApi) => {
  return (data: ApprovePayload) =>
    restClient<ApproveResponse>(
      '/api/v1/payment/approve',
      { method: 'POST' },
      data,
    );
};
