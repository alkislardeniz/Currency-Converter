import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import React, {useState} from "react";
import {Button} from "primereact/button";
import {useTranslation} from 'react-i18next';

export const ConversionHistoryTableComponent =
  ({conversions, onViewConversionClicked, onDeleteConversionClicked}) => {
    const {t} = useTranslation();
    const [multiSortMeta, setMultiSortMeta] = useState([{field: 'date', order: -1}]);

    const setOpacityOfElementById = (id, opacity) => {
      document.getElementById(id).style.setProperty('opacity', opacity);
    }

    const getActionButtonsTemplate = rowData => {
      return (
        <div
          id={rowData.date}
          className={"opacity-0"}
          onMouseEnter={() => setOpacityOfElementById(rowData.date, "1")}
          onMouseLeave={() => setOpacityOfElementById(rowData.date, "0")}
        >
          <div className={"inline-display right-margin-05"}>
            <Button icon="pi pi-eye" className="p-button-info" onClick={() => onViewConversionClicked(rowData)}/>
          </div>
          <div className={"inline-display"}>
            <Button icon="pi pi-trash" className="p-button-danger" onClick={() => onDeleteConversionClicked(rowData)}/>
          </div>
        </div>
      );
    }

    const getEventTemplate = rowData => {
      return <div>{`${rowData.amount} ${rowData.fromCurrency} -> ${rowData.toAmount} ${rowData.toCurrency}`}</div>
    };

    return (
      <DataTable
        multiSortMeta={multiSortMeta}
        onSort={(e) => setMultiSortMeta(e.multiSortMeta)}
        sortMode="multiple"
        stripedRows
        showGridlines
        value={conversions}
      >
        <Column sortable field="date" header={t("timestamp")}/>
        <Column field="event" body={getEventTemplate} header={t("event")}/>
        <Column field="actions" header={t("actions")} body={getActionButtonsTemplate}/>
      </DataTable>
    );
  }
