import { query, METHOD } from '../query';
import { API_URL, SERVICE } from '../service';

export const login = ({ username, password }) =>
  query({
    method: METHOD.POST,
    url: `${API_URL}/${SERVICE.AUTH}/api/Auth/login`,
    data: { username, password },
  });
