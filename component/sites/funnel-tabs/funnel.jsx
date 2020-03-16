import React, { Component } from 'react';

import { CanvasJSChart } from '../../canvasjs-chart';
import { StepNames } from './step-names';
import { StepDetails } from './step-details';

export const Funnel = () => {
  const options = {
    theme: 'light2',
    animationEnabled: true,
    toolTip: { enabled: false },
    exportEnabled: false,
    axisX: {
      minimum: 0,
      maximum: 7,
      gridThickness: 1,
      gridColor: '#ddd',
      lineColor: '#fff',
      tickColor: '#ddd',
      includeZero: true,
      interval: 1,
      labelFontColor: '#ffff',
    },
    axisY: {
      maximum: 1000,
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
        yValueFormatString: '# Visits',
        dataPoints: [
          { y: 786 },
          { y: 673 },
          { y: 564 },
          { y: 353 },
          { y: 245 },
          { y: 138 },
          { y: 82 },
          { y: 82 },
        ],
      },
    ],
  };

  return (
    <div className="relative" style={{ paddingBottom: 54 }}>
      <CanvasJSChart options={options} />
      <StepNames />
      <StepDetails />
    </div>
  );
};
