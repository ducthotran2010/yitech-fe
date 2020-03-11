import React, { Component } from 'react';

import { CanvasJSChart } from '../canvasjs-chart';

export class ChartJS extends Component {
  render() {
    const options = {
      theme: 'light1',
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Conversion rate',
      },
      axisX: {
        gridThickness: 1,
        gridColor: '#ddd',
        includeZero: true,
      },
      axisY: {
        gridThickness: 0,
        title:"Visits",
        includeZero: true,
      },
      data: [
        {
          type: 'area',
          color:'#ffa51b',
          yValueFormatString: '# Visits',
          dataPoints: [
            { x: 1, y: 786 },
            { x: 2, y: 673 },
            { x: 3, y: 564 },
            { x: 4, y: 153 },
            { x: 5, y: 45 },
            { x: 6, y: 38 },
            { x: 7, y: 12 },
          ],
        },
      ],
    };

    return (
      <div>
        <CanvasJSChart options={options} />
      </div>
    );
  }
}
