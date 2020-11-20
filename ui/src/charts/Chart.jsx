import React from 'react';
import { createClassFromSpec } from 'react-vega';

function Chart({ specFn, data, args }) {

  const ChartComponent =  createClassFromSpec({
    mode: 'vega-lite',
    spec: specFn(data, ...args)
  });

  return <ChartComponent actions={ false } />
}

export default Chart;
