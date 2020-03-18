import React, { useEffect } from 'react';

import { initHeatMap } from '../../../utils/heatmap-utils';

const elementID = 'hover-detail';

export const HoverDetail = ({ data, imageUrl }) => {
  useEffect(() => {
    var img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      initHeatMap({ data, elementID: `#${elementID}` });
    };
    document.getElementById(elementID).appendChild(img);
  }, []);

  return <div id={elementID}></div>;
};
