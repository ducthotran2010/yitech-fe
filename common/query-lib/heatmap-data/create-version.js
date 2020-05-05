import { query, METHOD } from '../../query';
import { API_URL, SERVICE } from '../../service';

export const createVersion = (trackingHeatmapInfoID, captureUrl, token) =>
  query({
    method: METHOD.POST,
    url: `${API_URL}/${SERVICE.TRACKING}/api/tracking-info/version`,
    data: { trackingHeatmapInfoID, captureUrl },
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  }); 
