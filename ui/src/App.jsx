import React from 'react'

import './App.css';
import ReleaseTable from './ReleaseTable';
import Chart from './charts/Chart';
import * as spec from './charts/chart-specs';
import * as data from './charts/data';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ReleaseTable />
        <Chart
          specFn={ spec.velocity }
          data={ data.timesheet.filter(e => e.dev === 'a') }
          args={ ['estimated', 'actual'] }
        />
        <Chart
          specFn={ spec.releaseConfidence }
          data={ data.shipDatesConfidence }
          args={ Object.keys(data.shipDatesConfidence[0]) }
        />
        <Chart
          specFn={ spec.devShipDate }
          data={ data.devFutures }
          args={ ['ship dates', 'dev'] }
        />
      </header>
    </div>
  );
}

export default App;
