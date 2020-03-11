import { query, METHOD } from "../../query";
import { API_URL, SERVICE } from "../../service";

export const createOrganization = ({ organizationID,token  }) =>
  query({
    method: METHOD.DELETE,
    url: `${API_URL}/${SERVICE.USER}/api/user/organization`,
    params: {organizationID},
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });