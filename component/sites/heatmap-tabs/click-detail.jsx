import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';

import { initHeatMap } from '../../../utils/heatmap-utils';

const elementID = 'click-detail';

export const ClickDetail = ({ data, imageUrl }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    initHeatMap({ data, elementID: `#${elementID}` });
  }, []);

  return (
    <div id={elementID} className="relative">
      <img src={imageUrl} />
    </div>
  );
};
