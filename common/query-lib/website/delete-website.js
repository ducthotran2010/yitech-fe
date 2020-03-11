import { query, METHOD } from "../../query";
import { API_URL, SERVICE } from "../../service";

export const deleteWebsite = ({ webID, token }) =>
  query({
    method: METHOD.DELETE,
    url: `${API_URL}/${SERVICE.WEB_OWNER}/api/user/website`,
    data: { webID : webID },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });
