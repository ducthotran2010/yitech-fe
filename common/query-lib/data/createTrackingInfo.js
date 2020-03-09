import { query, METHOD } from "../../query";
import { API_URL, SERVICE } from "../../service";

export const createTrackingInfo = ({ webId,trackingUrl,trackingType,token  }) =>
  query({
    method: METHOD.POST,
    url: `${API_URL}/${SERVICE.TRACKING}/api/tracking/info`,
    data: { webId:webId,trackingUrl: trackingUrl ,trackingType:trackingType},
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });