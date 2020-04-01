import { query, METHOD } from '../../query';
import { API_URL, SERVICE } from '../../service';

export const deleteFunnelInfo = ({ trackingFunnelInfoID, token }) =>
  query({
    method: METHOD.DELETE,
    url: `${API_URL}/${SERVICE.TRACKING}/api/funnel-info`,
    params: { trackingFunnelInfoID },
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
