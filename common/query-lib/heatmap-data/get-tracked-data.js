import { query, METHOD } from "../../query";
import { API_URL, SERVICE } from "../../service";

export const getTrackedData = ({ trackingUrl, eventType  }) =>
  query({
    method: METHOD.GET,
    url: `${API_URL}/${SERVICE.TRACKING}/api/tracked-data`,
    data: { trackingUrl, eventType },
    headers: {
      "Content-Type": "application/json"
    }
  });
