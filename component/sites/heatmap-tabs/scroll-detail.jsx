import React, { useEffect } from 'react';

const elementID = 'scroll-detail';

const positionData = [
  {
    height: 1600,
    positions: [0, 10, 20, 30],
  },
  {
    height: 800,
    positions: [0, 10, 20, 30],
  },
  {
    height: 1200,
    positions: [0, 10, 20, 30],
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
