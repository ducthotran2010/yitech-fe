import { query, METHOD } from "../../query";
import { API_URL, SERVICE } from "../../service";

export const deleteCheckedData = ({ trackingId , token }) =>
  query({
    method: METHOD.DELETE,
    url: `${API_URL}/${SERVICE.TRACKING}/api/tracking/data`,
    data: { trackingId: trackingId },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });
