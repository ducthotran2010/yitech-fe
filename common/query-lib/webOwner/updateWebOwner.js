import { query, METHOD } from "../../query";
import { API_URL, SERVICE } from "../../service";

export const updateWebOwner = ({ webOwnerId, email, fullName, role, token }) =>
  query({
    method: METHOD.PUT,
    url: `${API_URL}/${SERVICE.WEB_OWNER}/api/web-owner`,
    data: {
      webOwnerId: webOwnerId,
      email: email,
      fullName: fullName,
      role: role
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });
