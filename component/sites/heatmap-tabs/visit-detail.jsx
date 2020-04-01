import React from 'react';
import classNames from 'classnames';
import { CanvasJSChart } from '../../canvasjs-chart';
import moment from 'moment';

const rankStyle = { width: 250 };

export const VisitDetail = ({ data }) => {
  let parsedData = [];
  try {
    parsedData = JSON.parse(data);
  } catch (error) {}

  const ranks = parsedData.map(({ x, y }) => ({
    date: moment(x * 1000).format('DD-MM-YYYY'),
    views: y,
  }));
  ranks.sort(({ views: a }, { views: b }) => b - a);

  const options = {
    animationEnabled: true,
    theme: 'light2',
    axisX: {
      includeZero: false,
      interval: 1,
      intervalType: 'day',
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
        xValueType: 'dateTime',
        yValueFormatString: '# Visits',
        dataPoints: parsedData.map(({ x, y }) => ({
          x: x * 1000,
          y,
        })),
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
        {ranks
          .filter((_, index) => index < 10)
          .map(({ date, views }, index) => (
            <div
              className="flex flex-row items-center py-2"
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
              <div className="mr-1 flex-1">{date}</div>
              <div>{views}</div>
            </div>
          ))}
      </div>
    </div>
  );
};
