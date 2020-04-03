import { query, METHOD } from '../../query';
import { API_URL, SERVICE } from '../../service';

export const updateFunnelName = async ({
  trackingFunnelInfoID,
  newName,
  steps,
  token,
}) =>
  query({
    method: METHOD.PUT,
    url: `${API_URL}/${SERVICE.TRACKING}/api/funnel-info`,
    data: {
      trackingFunnelInfoID,
      newName,
      steps,
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
