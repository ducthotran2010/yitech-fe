import { query, METHOD } from '../../query';
import { API_URL, SERVICE } from '../../service';

export const deleteVersion = (trackingHeatmapInfoID, token, isVersion = true) =>
  query({
    method: METHOD.DELETE,
    url: `${API_URL}/${SERVICE.TRACKING}/api/tracking-info`,
    params: { trackingHeatmapInfoID, isVersion },
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  }); 
