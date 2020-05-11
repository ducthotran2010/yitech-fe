import { Skeleton } from 'antd';
import classNames from 'classnames';
import React, { useEffect } from 'react';

import { initHeatMap } from '../../../utils/heatmap-utils';

const elementID = 'click-detail';

export const ClickDetail = ({ loading, data, imageUrl }) => {
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
      return;
    }
  }, [imageUrl, data]);

  return (
    <>
      <Skeleton loading={loading} active />
      <Skeleton loading={loading} active />
      <div className={classNames("flex items-center justify-center", { "hidden": loading })}>
        <div id={elementID}></div>
      </div>
    </>
  );
};
