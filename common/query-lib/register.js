import { query, METHOD } from '../query';
import { API_URL, SERVICE } from '../service';

export const register = ({ email, fullName, password, domainUrl , organizationName }) =>
  query({
    method: METHOD.POST,
    url: `${API_URL}/${SERVICE.AUTH}/api/user`,
    data: { email, fullName, password, domainUrl , organizationName },
  });
