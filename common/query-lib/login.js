import { query, METHOD } from '../query';
import { API_URL, SERVICE } from '../service';

export const login = async data =>
  await query({
    method: METHOD.POST,
    url: `${API_URL}/${SERVICE.AUTH}/api/auth/login`,
    data,
  });
