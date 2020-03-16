import React from 'react';
import classNames from 'classnames';
import { CanvasJSChart } from '../../../canvasjs-chart';

const rankStyle = { width: 250 };

export const VisitLine = () => {
  const ranks = [];
  for (let i = 0; i < 10; i++) {
    ranks.push({
      date: new Date(),
      views: Math.floor(Math.random() * 10000),
    });
  }
  ranks.sort(({ views: a }, { views: b }) => b - a);

  const dataPoints = [];
  let last = 10000;
  for (let year = 2019; year <= 2020; year++) {
    for (let month = 0; month < 12; month++) {
      for (let date = 0; date <= 31; date++) {
        last = Math.floor(Math.random() * 1000) - 500 + last;
        while (last < 0) {
          last = Math.floor(Math.random() * 1000) - 500 + last;
        }
        dataPoints.push({
          y: last,
          x: new Date(year, month, date),
        });
      }
    }
  }

  const options = {
    animationEnabled: true,
    theme: 'light2',
    axisX: {
      includeZero: false,
    },
    axisY: {
      gridColor: '#f1f1f1',
      tickColor: '#fff',
      includeZero: false,
    },
    data: [
      {
        type: 'splineArea',
        indexLabelFontSize: 16,
        yValueFormatString: '# Visits',
        dataPoints,
      },
    ],
  };

  return (
    <div className="flex flex-row">
      <div className="flex-1">
        <h2 className="mb-4 text-base">Visit Trend</h2>
        <CanvasJSChart options={options} />
      </div>

      <div style={rankStyle}>
        <h2 className="mb-4 text-base">Ranking</h2>
        <div className="h-full flex flex-col justify-between pb-16">
          {ranks.map(({ date, views }, index) => (
            <div
              className="flex flex-row items-center p-1"
              key={`${date}-${views}`}
            >
              <div
                className={classNames(
                  'mr-2',
                  'flex',
                  'items-center',
                  'justify-center',
                  'rounded-full',
                  'text-gray-200',
                  { 'bg-gray-900': index < 3, 'bg-gray-500': index >= 3 },
                )}
                style={{ width: 22, height: 22 }}
              >
                {index + 1}
              </div>
              <div className="mr-1 flex-1">{date.toLocaleDateString()}</div>
              <div>{views}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
