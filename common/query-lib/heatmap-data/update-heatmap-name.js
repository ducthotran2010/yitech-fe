import { query, METHOD } from '../../query';
import { API_URL, SERVICE } from '../../service';

export const updateHeatmapName = ({ trackingHeatmapInfoID, newName, token }) =>
  query({
    method: METHOD.PUT,
    url: `${API_URL}/${SERVICE.TRACKING}/api/tracking-info`,
    data: { trackingHeatmapInfoID, newName },
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
