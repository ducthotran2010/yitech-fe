import * as heatmap from 'heatmap.js';

const EPS = 1e-6;

export const initHeatMap = async ({ elementID, data }) => {
  const container = document.querySelector(elementID);
  const div = document.createElement('DIV');
  div.className = 'absolute';
  div.style.background = '#252525aa';
  div.style.width = '100%';
  div.style.height = '100%';
  div.style.left = '50%';
  div.style.top = '50%';
  div.style.transform = 'translate(-50%, -50%)';
  container.appendChild(div);

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
    radius: 15,
    maxOpacity: 0.7,
  });

  const max = heatmapData
    .map(({ value }) => value)
    .reduce((max, value) => Math.max(max, value), 0);

  console.log({ max });

  instance.setData({
    max,
    data: heatmapData,
  });
};
