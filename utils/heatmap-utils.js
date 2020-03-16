import * as heatmap from 'heatmap.js';

const EPS = 1e-6;

export const initHeatMap = async ({ elementID, data }) => {
  const {
    offsetWidth: clientWidth,
    offsetHeight: clientHeight,
    naturalWidth: width,
    naturalHeight: height,
  } = document.querySelector(`${elementID} > img`);

  const parsedData = JSON.parse(data).map(({ x, y }) => ({
    x: Math.floor((x / width) * clientWidth),
    y: Math.floor((y / height) * clientHeight),
  }));

  const heatmapData = parsedData
    .filter(({ x, y }, index) =>
      parsedData
        .slice(0, index)
        .every(({ x: x_, y: y_ }) => x - x_ > EPS || y - y_ > EPS),
    )
    .map(({ x, y }) => ({
      x,
      y,
      value: parsedData.reduce(
        (total, { x: x_, y: y_ }) =>
          x - x_ > EPS && y - y_ > EPS ? total + 1 : total,
        0,
      ),
    }));

  const instance = heatmap.create({
    container: document.querySelector(elementID),
    radius: 25,
    maxOpacity: 0.7,
  });

  const max =
    (heatmapData
      .map(({ value }) => value)
      .reduce((max, value) => Math.max(max, value), 0) /
      5) *
    4;

  instance.setData({
    max,
    data: heatmapData,
  });
};
