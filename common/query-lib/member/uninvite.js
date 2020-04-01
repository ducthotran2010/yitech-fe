import { query, METHOD } from '../../query';
import { API_URL, SERVICE } from '../../service';

export const uninvited = ({ email, organizationID, token }) =>
  query({
    method: METHOD.DELETE,
    url: `${API_URL}/${SERVICE.USER}/api/user/organization/member/uninvite`,
    params: { email, organizationID },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
