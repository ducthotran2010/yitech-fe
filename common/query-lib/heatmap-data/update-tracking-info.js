import { query, METHOD } from "../../query";
import { API_URL, SERVICE } from "../../service";

export const updateTrackingInfo = ({ trackingHeatmapInfoID,webID,trackingUrl,token  }) =>
  query({
    method: METHOD.POST,
    url: `${API_URL}/${SERVICE.TRACKING}/api/tracking-info`,
    data: { trackingHeatmapInfoID,webID,trackingUrl},
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });