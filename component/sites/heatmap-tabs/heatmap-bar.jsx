import React from 'react';

const getHeatmapBarStyle = (left) => ({
  width: 10,
  height: 150,
  backgroundImage: 'url(/heatmap.png)',
  backgroundPosition: left ? 'left' : 'right',
});

export const HeatmapBar = ({ click, showedScroll, showedClick }) => {
  let totalClicks = 0;
  try {
    totalClicks = JSON.parse(click).length;
  } catch (_) {}

  return (
    <div className="z-10 fixed bottom-0 right-0 flex flex-row text-gray-300">
      {showedClick && (
        <div className="flex flex-col flex-end justify-end mb-4">
          <div className="bg-gray-900 rounded p-3">
            <span className="block">CLICKS RECORDED</span>
            <span className="block text-3xl text-center">{totalClicks}</span>
          </div>
        </div>
      )}
      <div className="bg-gray-900 flex flex-col items-center m-4 p-2 rounded text-xs">
        HOT
        <div className="my-1" style={getHeatmapBarStyle(!showedScroll)}></div>
        COLD
      </div>
    </div>
  );
};
