import { query, METHOD } from "../../query";
import { API_URL, SERVICE } from "../../service";

export const getTrackedData = ({ trackingId  }) =>
  query({
    method: METHOD.GET,
    url: `${API_URL}/${SERVICE.TRACKING}/api/tracking/data`,
    data: { trackingId: trackingId },
    headers: {
      "Content-Type": "application/json"
    }
  });
