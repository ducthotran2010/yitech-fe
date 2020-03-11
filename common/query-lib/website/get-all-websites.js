import { query, METHOD } from "../../query";
import { API_URL, SERVICE } from "../../service";

export const getAllWebsiteByUser = ({token }) =>
  query({
    method: METHOD.GET,
    url: `${API_URL}/${SERVICE.WEB_OWNER}/api/user/websites`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });
