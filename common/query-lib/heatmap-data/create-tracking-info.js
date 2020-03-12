import { query, METHOD } from "../../query";
import { API_URL, SERVICE } from "../../service";

export const createTrackingInfo = async (data, token) =>
  query({
    method: METHOD.POST,
    url: `${API_URL}/${SERVICE.TRACKING}/api/tracking-info`,
    data,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  });