import React, { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [url]);
  return { data, error };
};

const TrainTimes = ()  => {
  const res = useFetch("https://api.tfl.gov.uk/StopPoint/940GZZLUGPS/Arrivals?mode=tube");
  if (!res.data) {
  return <div>
          Loading data...
        </div>
}
  const trainList = Array.isArray(res.data)
  function sortByTime(a, b) {
    return a.timeToStation - b.timeToStation;
  };
  const sortedTrains = trainList && res.data.sort(sortByTime)

  const table = sortedTrains.map(train => {
  return (
    <tr key={train.id}>
      <td className={train.lineId}>{train.lineName}</td>
      <td className={!train.destinationName?"nis":""}>
        {train.destinationName ? train.destinationName : "Not in Service"}
      </td>
      <td>{Math.round(train.timeToStation/60)} Minutes</td>
    </tr>
    )
  });
  return (
    <section className="dispay-flex flex-container__column">
      <h2>Please see today's train schedule for this station down below</h2>

      <div className="flex-container__row">
        <table align="center" className="train-table">
          <thead>
            <tr>
              <th>Line</th>
              <th>Destination</th>
              <th>Time to Arrival</th>
            </tr>
          </thead>
          <tbody>
            {table}
          </tbody>
        </table>
      </div>

    </section>
  )
}

export default TrainTimes
