import { query, METHOD } from '../../query';
import { API_URL, SERVICE } from '../../service';

export const changeRole = ({ email, organizationID, token }) =>
  query({
    method: METHOD.PUT,
    url: `${API_URL}/${SERVICE.USER}/api/user/organization/member/change-role`,
    params: { email, organizationID },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
