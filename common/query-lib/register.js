import { query, METHOD } from '../query';
import { API_URL, SERVICE } from '../service';

export const register = ({ username, email, webUrl, password }) =>
  query({
    method: METHOD.POST,
    url: `${API_URL}/${SERVICE.AUTH}/api/Auth/login`,
    data: { username, email, webUrl, password },
  });
