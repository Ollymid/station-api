import React, { useState, useEffect } from "react";
import TrainTable from './TrainTable';
import logo from './../underground.svg';

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
