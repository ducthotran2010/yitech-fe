import { query, METHOD } from '../../query';
import { API_URL, SERVICE } from '../../service';

export const getCheckingInfo = (webID, token, cancelToken) =>
  query({
    method: METHOD.GET,
    url: `${API_URL}/${SERVICE.TRACKING}/api/tracking-info`,
    params: { webID },
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    cancelToken,
  });
