import { query, METHOD } from "../../query";
import { API_URL, SERVICE } from "../../service";

export const getAllWebsiteByWebOwner = ({ webOwnerId, token }) =>
  query({
    method: METHOD.GET,
    url: `${API_URL}/${SERVICE.WEB_OWNER}/api/web-owner/websites`,
    params: { webOwnerId: webOwnerId },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });
