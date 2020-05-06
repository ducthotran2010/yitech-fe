import { query, METHOD } from '../../query';
import { API_URL, SERVICE } from '../../service';

export const invited = ({ email, organizationID, roleID, token }) =>
  query({
    method: METHOD.POST,
    url: `${API_URL}/${SERVICE.USER}/api/user/organization/member/invite`,
    data: {
        email,
        organizationID,
        roleID
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });