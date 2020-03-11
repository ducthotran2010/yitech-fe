import { query, METHOD } from "../../query";
import { API_URL, SERVICE } from "../../service";

export const createOrganization = ({ organizationID,organirzationName,token  }) =>
  query({
    method: METHOD.PUT,
    url: `${API_URL}/${SERVICE.USER}/api/user/organization`,
    data: {organizationID,organirzationName},
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });