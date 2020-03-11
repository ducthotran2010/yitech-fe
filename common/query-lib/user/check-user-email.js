import { query, METHOD } from "../../query";
import { API_URL, SERVICE } from "../../service";

export const checkUserEmail = ({ email }) =>
  query({
    method: METHOD.GET,
    url: `${API_URL}/${SERVICE.WEB_OWNER}/api/user/check`,
    params: { email: email },
    headers: {
      "Content-Type": "application/json"
    }
  });
