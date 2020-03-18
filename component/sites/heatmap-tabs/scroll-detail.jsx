import React, { useEffect, useRef, useState } from 'react';

const elementID = 'scroll-detail';

export const ScrollDetail = ({ data, imageUrl }) => {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [imageHeight, setImageHeight] = useState();

  useEffect(() => {
    if (imageHeight && data && imageUrl) {
      const parsedData = JSON.parse(data);
      const _data = parsedData.map(
        ({
          height: currentHeight,
          documentHeight,
          positions: currentPositions,
        }) => {
          const base = imageHeight / documentHeight;
          const height = Math.floor(currentHeight * base);
          const positions = JSON.parse(currentPositions).map(position =>
            Math.floor(position * base),
          );

          return { height, positions };
        },
      );

      const Heatmap = window.Heatmap;
      if (Heatmap) {
        new Heatmap(elementID, imageUrl, _data, {
          screenshotAlpha: 0.6,
          heatmapAlpha: 0.8,
        });
      }
    }
  }, [data, imageUrl, imageHeight]);

  useEffect(() => {
    if (imgRef && imgRef.current) {
      setImageHeight(imgRef.current.height);
    }

    if (canvasRef && canvasRef.current) {
      setTimeout(() => (canvasRef.current.style.height = 'auto'), 500);
    }
  }, []);

  return (
    <div className="relative">
      <img ref={imgRef} src={imageUrl} />
      <canvas
        className="absolute top-0 left-0"
        ref={canvasRef}
        id={elementID}
        style={{ maxWidth: '100%', height: 'auto' }}
      ></canvas>
    </div>
  );
};
