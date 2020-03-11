import { query, METHOD } from "../../query";
import { API_URL, SERVICE } from "../../service";

export const createOrganization = ({ organirzationName,token  }) =>
  query({
    method: METHOD.POST,
    url: `${API_URL}/${SERVICE.USER}/api/user/organization`,
    data: {organirzationName},
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });