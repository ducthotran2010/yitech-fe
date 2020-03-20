import { query, METHOD } from '../../query';
import { API_URL, SERVICE } from '../../service';

export const getFunnelInfo = (webID, token) =>
  query({
    method: METHOD.GET,
    url: `${API_URL}/${SERVICE.TRACKING}/api/funnel-info`,
    params: { webID },
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    }
  });
