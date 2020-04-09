import React, { useEffect } from 'react';
import { Skeleton } from 'antd';

import {
  removeAllChild,
  createScrollCanvas,
  initImage,
} from '../../../utils/scroll-heatmap';

const elementID = 'scroll-detail';
const canvasID = 'scroll-detail-canvas';

export const ScrollDetail = ({ loading, data: rawData, imageUrl }) => {
  useEffect(() => {
    if (rawData && imageUrl) {
      const container = removeAllChild(elementID);
      const canvas = createScrollCanvas(canvasID);
      container.appendChild(canvas);
      const img = initImage({ rawData, imageUrl, canvasID });
      container.appendChild(img);
    }
  }, [rawData, imageUrl]);

  return loading ? (
    <>
      <Skeleton loading={loading} active />
      <Skeleton loading={loading} active />
    </>
  ) : (
    <div className="relative" id={elementID}></div>
  );
};
