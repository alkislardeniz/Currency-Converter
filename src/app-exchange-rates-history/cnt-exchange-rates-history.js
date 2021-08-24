import React from 'react';
import {ExchangeRatesHistoryTableComponent} from "./cmp-exchange-rates-history-table";
import {ExchangeRatesHistoryGraphComponent} from "./cmp-exchange-rates-history-graph";
import {TabPanel, TabView} from "primereact/tabview";
import {useTranslation} from "react-i18next";

const DURATIONS = [{label: '7 Days', value: 7}, {label: '14 Days', value: 14}, {label: '30 Days', value: 30}];

export const ExchangeRatesHistoryContainer = ({setDuration, duration, exchangeHistories, durationSelectionDisabled}) => {

  const {t} = useTranslation();

  const getStatistics = () => {
    const statistics = {};
    const exchangeRates = [...exchangeHistories.map(history => parseFloat(history.rate))];

    if (exchangeRates.length > 0) {
      statistics.lowest = Math.min(...exchangeRates);
      statistics.highest = Math.max(...exchangeRates);
      statistics.average = exchangeRates.reduce((a, b) => a + b) / exchangeRates.length;
    }
    return statistics;
  }

  return (
    <TabView>
      <TabPanel header={t("table")}>
        <ExchangeRatesHistoryTableComponent
          durationSelectionDisabled={durationSelectionDisabled}
          exchangeHistories={exchangeHistories}
          setDuration={setDuration}
          selectedDuration={duration}
          durations={DURATIONS}
          statistics={getStatistics()}
        />
      </TabPanel>
      <TabPanel header={t("chart")}>
        <ExchangeRatesHistoryGraphComponent
          durationSelectionDisabled={durationSelectionDisabled}
          exchangeHistories={exchangeHistories}
          setDuration={setDuration}
          selectedDuration={duration}
          durations={DURATIONS}
        />
      </TabPanel>
    </TabView>
  );
}
