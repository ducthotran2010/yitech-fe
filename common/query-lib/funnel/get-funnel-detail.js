import { query, METHOD } from '../../query';
import { API_URL, SERVICE } from '../../service';

export const getFunnelDetail = (webID, trackingInfoID, from, to, token) =>
  query({
    method: METHOD.GET,
    url: `${API_URL}/${SERVICE.TRACKING}/api/funnel/statistic/${webID}/${trackingInfoID}`,
    params: { from, to },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
