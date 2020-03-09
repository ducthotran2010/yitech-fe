import { query, METHOD } from '../../query';
import { API_URL, SERVICE } from '../../service';

export const deletWebOwner = ({ webOwnerId , token }) =>
  query({
    method: METHOD.DELETE,
    url: `${API_URL}/${SERVICE.WEB_OWNER}/api/web-owner`,
    headers : {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
    },
    params : {
        'webOwnerId' : webOwnerId
    }
  });