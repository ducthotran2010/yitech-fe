import React, { useEffect } from 'react';

const elementID = 'scroll-detail';

const positionData = [
  {
    height: 600,
    positions: [0, 0, 300],
  },
];

export const ScrollDetail = ({ data, imageUrl }) => {
  useEffect(() => {
    const Heatmap = window.Heatmap;
    if (Heatmap) {
      new Heatmap(elementID, imageUrl, positionData, {
        screenshotAlpha: 0.6,
        heatmapAlpha: 0.8,
      });
    }
  }, []);

  return (
    <div>
      <canvas id={elementID} style={{ maxWidth: '100%' }}></canvas>
    </div>
  );
};
