import { query, METHOD } from "../../query";
import { API_URL, SERVICE } from "../../service";

export const createCheckedData = ({ trackingUrl, webID,data,eventType }) =>
  query({
    method: METHOD.POST,
    url: `${API_URL}/${SERVICE.TRACKING}/api/tracked-data`,
    data: { trackingUrl, webID,data,eventType },
    headers: {
      "Content-Type": "application/json"
    }
  });
