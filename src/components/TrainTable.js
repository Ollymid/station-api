import React from "react";


const TrainTable = (props)  => {

  const table = props.trains.map(train => {
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

  return(
    <div className="flex-container__row">
      <h3 className="train-table__title">{props.title}</h3>
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
  )
}

export default TrainTable
