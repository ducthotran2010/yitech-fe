import * as heatmap from 'heatmap.js';

const minUnit = 20;

const EPS = 1;
const distance = (a, b) =>
  Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));

const getMidPoint = (point, nextPoint) => ({
  x: Math.floor((nextPoint.x - point.x) / 2 + point.x),
  y: Math.floor((nextPoint.y - point.y) / 2 + point.y),
});

const amazingHoverData = (data) => {
  let ptr = 0;
  while (ptr + 1 < data.length) {
    let point = data[ptr];
    let nextPoint = data[ptr + 1];
    let midPoint = getMidPoint(point, nextPoint);
    if (
      distance(point, nextPoint) > minUnit &&
      distance(point, midPoint) > minUnit
    ) {
      data.splice(ptr + 1, 0, midPoint);
      continue;
    }
    ptr += 1;
  }
  return data;
};

export const initHeatMap = async ({ elementID, data, radius, isHover }) => {
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

  const instance = heatmap.create({
    container: document.querySelector(elementID),
    radius: radius || 15,
    maxOpacity: 0.7,
  });
  instance.setDataMin(0);

  //-----------------------------------------------------------------------------

  let parsedData = JSON.parse(data).map(({ x, y }) => ({
    x: Math.floor((x / width) * clientWidth),
    y: Math.floor((y / height) * clientHeight),
  }));

  let max = 1;
  let pointMap = new Map();
  for (let i = 0; i + 1 < parsedData.length; ++i) {
    let point = parsedData[i];
    let nextPoint = parsedData[i + 1];
    let points = isHover
      ? [point, nextPoint]
      : [point, nextPoint];

    points.forEach((point) => {
      pointMap.set(
        JSON.stringify(point),
        (pointMap.get(JSON.stringify(point)) || 0) + 1,
      );

      let value = pointMap.get(JSON.stringify(point));
      if (value > max) {
        max = value;
        instance.setDataMax(max);
      }
    });

    instance.addData(points.map((point) => ({ ...point, value: 1 })));
  }

  let lastPoint = parsedData[parsedData.length - 1];
  pointMap.set(
    JSON.stringify(lastPoint),
    (pointMap.get(JSON.stringify(lastPoint)) || 0) + 1,
  );

  let value = pointMap.get(JSON.stringify(lastPoint));
  if (value > max) {
    max = value;
    instance.setDataMax(max);
  }
  instance.addData({ ...lastPoint, value: 1 });
};
