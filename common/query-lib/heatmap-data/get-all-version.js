import { query, METHOD } from '../../query';
import { API_URL, SERVICE } from '../../service';

export const getAllVersionTrackingHeatmapInfo = (trackingHeatmapInfoID, token) =>
  query({
    method: METHOD.GET,
    url: `${API_URL}/${SERVICE.TRACKING}/api/tracking-info/all-version`,
    params: { trackingHeatmapInfoID },
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  }); 
