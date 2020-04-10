import React, { useEffect } from 'react';
import { Skeleton } from 'antd';

import { initHeatMap } from '../../../utils/heatmap-utils';

const elementID = 'hover-detail';

export const HoverDetail = ({ loading, data, imageUrl }) => {
  useEffect(() => {
    if (data && imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        initHeatMap({
          data,
          elementID: `#${elementID}`,
          radius: 20,
          isHover: true,
        });
      };
      const container = document.getElementById(elementID);
      while (container.firstChild) {
        container.removeChild(container.lastChild);
      }
      container.appendChild(img);
    }
  }, [imageUrl, data]);

  return loading ? (
    <>
      <Skeleton loading={loading} active />
      <Skeleton loading={loading} active />
    </>
  ) : (
    <div className="flex items-center justify-center">
      <div id={elementID}></div>
    </div>
  );
};
