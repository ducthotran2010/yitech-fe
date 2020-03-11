import { query, METHOD } from "../../query";
import { API_URL, SERVICE } from "../../service";

export const createWebsite = ({ organizationID,domainUrl, token }) =>
  query({
    method: METHOD.POST,
    url: `${API_URL}/${SERVICE.WEB_OWNER}/api/user/website`,
    data: { organizationID: organizationID, domainUrl: domainUrl },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });
