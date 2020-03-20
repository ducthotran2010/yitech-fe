import { query, METHOD } from '../../query';
import { API_URL, SERVICE } from '../../service';

export const getOrganizationMembers = ({ organizationID, token }) =>
  query({
    method: METHOD.GET,
    url: `${API_URL}/${SERVICE.USER}/api/user/organization/members`,
    params: { organizationID },
    headers: {
      'Content-Type': 'application/json',
      Authorization: "Bearer " + token
    },
  });
