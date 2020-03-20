import React, { useEffect } from 'react';

import { initHeatMap } from '../../../utils/heatmap-utils';

const elementID = 'hover-detail';

export const HoverDetail = ({ data, imageUrl }) => {
  useEffect(() => {
    if (data && imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        initHeatMap({ data, elementID: `#${elementID}` });
      };
      const container = document.getElementById(elementID);
      while (container.firstChild) {
        container.removeChild(container.lastChild);
      }
      container.appendChild(img);
    }
  }, [imageUrl, data]);

  return <div id={elementID}></div>;
};
