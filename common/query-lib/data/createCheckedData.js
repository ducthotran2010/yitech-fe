import { query, METHOD } from "../../query";
import { API_URL, SERVICE } from "../../service";

export const createCheckedData = ({ trackingId, data }) =>
  query({
    method: METHOD.POST,
    url: `${API_URL}/${SERVICE.TRACKING}/api/tracking/data`,
    data: { trackingId: trackingId, data: data },
    headers: {
      "Content-Type": "application/json"
    }
  });
