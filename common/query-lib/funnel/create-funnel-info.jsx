import { query, METHOD } from "../../query";
import { API_URL, SERVICE } from "../../service";

export const createFunnelInfo = async (data, token) =>
  query({
    method: METHOD.POST,
    url: `${API_URL}/${SERVICE.TRACKING}/api/funnel-info`,
    data,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  });