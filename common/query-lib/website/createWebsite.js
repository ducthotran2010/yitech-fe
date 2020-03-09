import { query, METHOD } from "../../query";
import { API_URL, SERVICE } from "../../service";

export const createWebsite = ({ webOwnerId, webUrl, token }) =>
  query({
    method: METHOD.POST,
    url: `${API_URL}/${SERVICE.WEB_OWNER}/api/web-owner/website`,
    data: { webOwnerId: webOwnerId, webUrl: webUrl },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });
