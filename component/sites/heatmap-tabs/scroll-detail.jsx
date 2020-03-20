import React, { useEffect } from 'react';

import {
  removeAllChild,
  createScrollCanvas,
  initImage,
} from '../../../utils/scroll-heatmap';

const elementID = 'scroll-detail';
const canvasID = 'scroll-detail-canvas';

export const ScrollDetail = ({ data: rawData, imageUrl }) => {
  useEffect(() => {
    if (rawData && imageUrl) {
      const container = removeAllChild(elementID);
      const canvas = createScrollCanvas(canvasID);
      container.appendChild(canvas);
      const img = initImage({ rawData, imageUrl, canvasID });
      container.appendChild(img);
    }
  }, [rawData, imageUrl]);

  return <div className="relative" id={elementID}></div>;
};
