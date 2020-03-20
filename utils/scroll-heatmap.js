export const removeAllChild = id => {
  const container = document.getElementById(id);
  if (!container) {
    return;
  }

  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }

  return container;
};

export const createScrollCanvas = id => {
  const canvas = document.createElement('CANVAS');
  canvas.className = 'absolute';
  canvas.id = id;
  canvas.style.maxWidth = '100%';
  canvas.style.height = 'auto';
  canvas.style.left = '-50%';
  canvas.style.top = '-50%';
  canvas.style.transform = 'translate(50%, 50%)';
  return canvas;
};

export const initImage = ({ rawData, imageUrl, canvasID }) => {
  const img = new Image();
  img.src = imageUrl;
  img.classList = 'm-auto';
  img.onload = () => {
    const data = JSON.parse(rawData);
    if (data.length === 0) {
      return;
    }

    const positionData = [];
    data.forEach(({ height, positions: rawPositions }) => {
      JSON.parse(rawPositions).forEach(position => {
        for (let i = 0; i < 100; i++) {
          positionData.push({
            height: height + i * 2,
            positions: [position - i],
          });
        }
      });
    });

    const Heatmap = window.Heatmap;
    if (Heatmap) {
      new Heatmap(canvasID, imageUrl, positionData, {
        screenshotAlpha: 0.6,
        heatmapAlpha: 0.8,
      });

      const canvas = document.getElementById(canvasID);
      setTimeout(() => (canvas.style.height = 'auto'), 50);
    }
  };

  return img;
};
