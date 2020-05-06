import { query, METHOD } from '../query';
import { API_URL, SERVICE } from '../service';

export const acceptInvite = ({  fullName, password }, token) =>
  query({
    method: METHOD.POST,
    url: `${API_URL}/${SERVICE.USER}/api/user/organization/member/invite/new`,
    data: { fullName, password},
    headers: { 
        'Authorization' : 'Bearer ' + token
    }
  });
