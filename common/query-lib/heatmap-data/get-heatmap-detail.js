import { query, METHOD } from '../../query';
import { API_URL, SERVICE } from '../../service';

export const getHeatmapDetail = (
  webID,
  trackingInfoID,
  from,
  to,
  device,
  token,
) =>
  query({
    method: METHOD.GET,
    url: `${API_URL}/${SERVICE.TRACKING}/api/user/statistic/${webID}/${trackingInfoID}`,
    params: { from, to, device },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
