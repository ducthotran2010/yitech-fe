import { query, METHOD } from '../../query';
import { API_URL, SERVICE } from '../../service';

export const deleteUser = ({ token }) =>
  query({
    method: METHOD.DELETE,
    url: `${API_URL}/${SERVICE.WEB_OWNER}/api/user`,
    headers : {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
    }
  });