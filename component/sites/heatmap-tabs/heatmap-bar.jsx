import React from 'react';

const getHeatmapBarStyle = left => ({
  width: 10,
  height: 150,
  backgroundImage: 'url(/heatmap.png)',
  backgroundPosition: left ? 'left' : 'right',
});

export const HeatmapBar = ({ showedScroll }) => (
  <div className="z-10 bg-gray-900 bottom-0 fixed flex flex-col items-center m-4 p-2 right-0 rounded text-gray-300 text-xs">
    HOT
    <div className="my-1" style={getHeatmapBarStyle(!showedScroll)}></div>
    COLD
  </div>
);
