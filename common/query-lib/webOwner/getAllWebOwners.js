import { query, METHOD } from '../../query';
import { API_URL, SERVICE } from '../../service';

export const getAllWebOwners = ({ token }) =>
  query({
    method: METHOD.GET,
    url: `${API_URL}/${SERVICE.WEB_OWNER}/api/web-owners`,
    headers : {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
    }
  });