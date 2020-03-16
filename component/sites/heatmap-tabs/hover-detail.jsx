import React, { useEffect } from 'react';

import { initHeatMap } from '../../../utils/heatmap-utils';

const elementID = 'hover-detail';

export const HoverDetail = ({ data, imageUrl }) => {
  useEffect(() => {
    initHeatMap({ data, elementID: `#${elementID}` });
  }, []);

  return (
    <div id={elementID}>
      <img src={imageUrl} />
    </div>
  );
};
