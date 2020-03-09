import { query, METHOD } from "../../query";
import { API_URL, SERVICE } from "../../service";

export const getCheckingInfo = ({ webId,trackingUrl  }) =>
  query({
    method: METHOD.POST,
    url: `${API_URL}/${SERVICE.TRACKING}/api/tracking/check`,
    params : { webId:webId,trackingUrl: trackingUrl },
    headers: {
      "Content-Type": "application/json"
    }
  });