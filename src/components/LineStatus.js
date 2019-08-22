import React, { useState, useEffect } from "react";

import { useFetch } from './hooks/useFetch';

const TrainTimes = ()  => {
  const res = useFetch("https://api.tfl.gov.uk/Line/circle%2C%20metropolitan%2C%20hammersmith-city/Status");
  if (!res.data) {
    return <h3>Loading statuses</h3>
  }

  const table = res.data.map(line => {
    return (
      <tr key={line.id}>
        <td className={line.id}>{line.name}</td>
        <td>
          {line.lineStatuses[0].statusSeverityDescription }
        </td>
      </tr>
    )
  });



  return (
    <div className="flex-container__row">
      <h3 className="train-table__title">Line Statuses</h3>
      <table align="center" className="train-table">
        <thead>
          <tr>
            <th>Line</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {table}
        </tbody>
      </table>
    </div>
  )
};

export default TrainTimes;
