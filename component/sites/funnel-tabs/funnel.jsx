import React, { Component } from 'react';

import { CanvasJSChart } from '../../canvasjs-chart';
import { StepNames } from './step-names';
import { StepDetails } from './step-details';

export const Funnel = ({ data }) => {
  const maximumX = data.length;
  const maximumY = Math.max(
    Math.floor(
      (data.reduce(
        (maximum, { sessions: value }) => (value > maximum ? value : maximum),
        0,
      ) *
        5) /
        4,
    ),
    20,
  );

  const options = {
    theme: 'light2',
    animationEnabled: true,
    toolTip: { enabled: false },
    exportEnabled: false,
    axisX: {
      minimum: 0,
      maximum: maximumX,
      gridThickness: 1,
      gridColor: '#ddd',
      lineColor: '#fff',
      tickColor: '#ddd',
      includeZero: true,
      interval: 1,
      labelFontColor: '#ffff',
    },
    axisY: {
      maximum: maximumY,
      gridThickness: 0,
      tickColor: '#fff',
      lineColor: '#ddd',
      title: 'Sessions',
      includeZero: true,
    },
    data: [
      {
        type: 'area',
        color: '#ffa41b',
        dataPoints: (() => {
          const clone = [...data];

          if (clone.length - 1 >= 0) {
            clone.push(clone[clone.length - 1]);
          }

          return clone.map(({ sessions }) => ({ y: sessions }));
        })(),
      },
    ],
  };

  return (
    <div className="w-full overflow-y-auto">
      <div
        className="relative w-full"
        style={{ paddingBottom: 54, minWidth: 250 * maximumX }}
      >
        <CanvasJSChart options={options} />
        <StepNames data={data} />
        <StepDetails data={data} />
      </div>
    </div>
  );
};
