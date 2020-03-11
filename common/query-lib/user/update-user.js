import { query, METHOD } from "../../query";
import { API_URL, SERVICE } from "../../service";

export const updateUser = ({ email, fullName, token }) =>
  query({
    method: METHOD.PUT,
    url: `${API_URL}/${SERVICE.WEB_OWNER}/api/user`,
    data: {
      email: email,
      fullName: fullName
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });
