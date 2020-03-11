import { query, METHOD } from "../../query";
import { API_URL, SERVICE } from "../../service";

export const createTrackingInfo = ({ webID,trackingUrl,token  }) =>
  query({
    method: METHOD.POST,
    url: `${API_URL}/${SERVICE.TRACKING}/api/tracking-info`,
    data: { webID,trackingUrl},
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });