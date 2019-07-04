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
  const trainList = Array.isArray(res.data)
  console.log(trainList);
  function sortByTime(a, b) {
    return a.timeToStation - b.timeToStation;
  };
  const sortedTrains = trainList && res.data.sort(sortByTime)
  console.log(sortedTrains);
  return (
    <section className="dispay-flex flex-container__column">
      <h2>Please see today's train schedule for this station down below1</h2>


    </section>
  )
}

export default TrainTimes
