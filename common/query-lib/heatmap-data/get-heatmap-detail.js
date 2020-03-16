import { query, METHOD } from '../../query';
import { API_URL, SERVICE } from '../../service';

export const getHeatmapDetail = (webID, trackingInfoID, from, to, token) =>
  query({
    method: METHOD.GET,
    url: `${API_URL}/${SERVICE.USER}/api/user/statistic/${webID}/${trackingInfoID}`,
    params: { from, to },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
