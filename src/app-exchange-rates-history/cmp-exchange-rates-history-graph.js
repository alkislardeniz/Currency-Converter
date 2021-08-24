import React from 'react';
import {Chart} from 'primereact/chart';
import {Dropdown} from "primereact/dropdown";

export const ExchangeRatesHistoryGraphComponent =
  ({exchangeHistories, selectedDuration, durations, setDuration, durationSelectionDisabled}) => {

    const chartData = {
      labels: [...exchangeHistories.map(history => history.timestamp.substr(0, history.timestamp.indexOf('T')))],
      datasets: [
        {
          label: 'Rates',
          data: [...exchangeHistories.map(history => history.rate)],
          fill: false,
          borderColor: '#42A5F5',
          tension: .4
        }
      ]
    };

    const basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: .9
    };

    return (
      <div>
        <Dropdown disabled={durationSelectionDisabled} value={selectedDuration} options={durations} onChange={(e) => setDuration(e.value)}/>
        <Chart type="line" data={chartData} options={basicOptions}/>
      </div>
    );
  }
