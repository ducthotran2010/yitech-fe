import { query, METHOD } from "../../query";
import { API_URL, SERVICE } from "../../service";

export const checkWebOwnerInfor = ({ username, email }) =>
  query({
    method: METHOD.GET,
    url: `${API_URL}/${SERVICE.WEB_OWNER}/api/web-owner/check`,
    params: { username: username, email: email },
    headers: {
      "Content-Type": "application/json"
    }
  });
