import { query, METHOD } from '../../query';
import { API_URL, SERVICE } from '../../service';

export const deleteTrackingInfo = ({ trackingHeatmapInfoID, token }) =>
  query({
    method: METHOD.DELETE,
    url: `${API_URL}/${SERVICE.TRACKING}/api/tracking-info`,
    params: { trackingHeatmapInfoID },
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
