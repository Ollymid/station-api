import React, { useState, useEffect } from "react";
import TrainTable from './TrainTable';
import logo from './../underground.svg';

const useFetch = (stationCode) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (stationCode) => {
      try {
        const res = await fetch(`https://api.tfl.gov.uk/StopPoint/${stationCode}/Arrivals?mode=tube`);
        const json = await res.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData(stationCode);
  }, [stationCode]);
  return { data, loading, error };
};

const TrainTimes = ()  => {
  const res = useFetch("940GZZLUOXC");
  if (res.data.length === 0 || res.loading ) {
    return (
      <div>
        <img src={logo} className="spinner" alt="logo" />
      </div>
    )
  } else if (res.error) {
    return (
      <div className="warning">
        <h3>Woops! You have an error: {res.error}</h3>
      </div>
    )
  }
  const trainList = Array.isArray(res.data)
  function sortByTime(a, b) {
    return a.timeToStation - b.timeToStation;
  };
  const sortedTrains = trainList && res.data.sort(sortByTime)

  const eastbound = sortedTrains.filter(train => {
  return train.platformName.toLowerCase().includes("eastbound")
  })
  const westbound = sortedTrains.filter(train => {
    return train.platformName.toLowerCase().includes("westbound")
  })


  return (
      <section className="dispay-flex flex-container__column">
        <h2>Please see today's train schedule for this station down below</h2>
        <TrainTable title="Eastbound Platform" trains={eastbound} />
        <TrainTable title="Westbound Platform" trains={westbound} />
      </section>

  )
};

export default TrainTimes;
