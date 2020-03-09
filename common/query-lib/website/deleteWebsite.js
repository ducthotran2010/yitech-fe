import { query, METHOD } from "../../query";
import { API_URL, SERVICE } from "../../service";

export const deleteWebsite = ({ webOwnerId, email, token }) =>
  query({
    method: METHOD.DELETE,
    url: `${API_URL}/${SERVICE.WEB_OWNER}/api/web-owner/website`,
    data: { webOwnerId: webOwnerId, email: email },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });
