import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dropdown} from "primereact/dropdown";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Badge} from "primereact/badge";

export const ExchangeRatesHistoryTableComponent =
  ({exchangeHistories, selectedDuration, durations, setDuration, statistics, durationSelectionDisabled}) => {
    const {t} = useTranslation();
    const [multiSortMeta, setMultiSortMeta] = useState([{field: 'timestamp', order: -1}]);

    const header = (
      <Dropdown disabled={durationSelectionDisabled} value={selectedDuration} options={durations}
                onChange={(e) => setDuration(e.value)}/>
    );

    const footer = (
      <div className={"p-grid"}>
        <Badge className={"inline-display right-margin-05"} value={t("highest")} severity="success"/>
        <div className={"inline-display right-margin-2"}>{statistics.highest}</div>
        <Badge className={"inline-display right-margin-05"} value={t("lowest")} severity="danger"/>
        <div className={"inline-display right-margin-2"}>{statistics.lowest}</div>
        <Badge className={"inline-display right-margin-05"} value={t("average")} severity="info"/>
        <div className={"inline-display"}>{statistics.average}</div>
      </div>
    );

    const getTimestampTemplate = row => {
      return <div>{row.timestamp.substr(0, row.timestamp.indexOf('T'))}</div>
    };

    return (
      <DataTable stripedRows showGridlines footer={footer} multiSortMeta={multiSortMeta} sortMode="multiple"
                 onSort={(e) => setMultiSortMeta(e.multiSortMeta)}
                 value={exchangeHistories} header={header}>
        <Column sortable filter field="timestamp" body={getTimestampTemplate} header={t("timestamp")}/>
        <Column sortable filter field="rate" header={t("rate")}/>
      </DataTable>
    );
  }
