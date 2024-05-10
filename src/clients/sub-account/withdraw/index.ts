import type { RestClientApi } from '@utils/types';
import type { WithDrawPayload } from './types';

export default (restClient: RestClientApi) => {
  return (data: WithDrawPayload) =>
    restClient<WithDrawPayload>(
      `/api/v1/subaccount/${data.id}/withdraw`,
      {},
      { method: 'POST' },
    );
};
