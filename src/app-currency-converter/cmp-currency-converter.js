import React from 'react';
import {useTranslation} from 'react-i18next';
import {Dropdown} from "primereact/dropdown";
import {InputNumber} from "primereact/inputnumber";
import {Button} from "primereact/button";

export const ConverterComponent =
  ({amount, setAmount, fromCurrency, rates, setFromCurrency, switchCurrencies, toCurrency, setToCurrency, convert, convertButtonDisabled}) => {
    const {t} = useTranslation();

    return (
      <div>
        <h5>{t("title")}</h5>
        <div className="p-grid">
          <div className="p-col-3 p-mr-25 inline-display">
            <InputNumber value={amount} onValueChange={(e) => setAmount(e.value)} min={1} max={Number.MAX_VALUE}
                         placeholder={t("amount")}/>
          </div>
          <div className="p-col-3 inline-display">
            <Dropdown value={fromCurrency} options={rates} onChange={(e) => setFromCurrency(e.value)}
                      optionLabel="currency" optionValue="currency" filter showClear filterBy="currency"
                      placeholder={t("select.from.currency")}/>
          </div>
          <div className="p-col-2 inline-display">
            <Button icon="pi pi-sort-alt" className="p-button-warning" onClick={switchCurrencies}/>
          </div>
          <div className="p-col-3 inline-display">
            <Dropdown value={toCurrency} options={rates} onChange={(e) => setToCurrency(e.value)}
                      optionLabel="currency" optionValue="currency" filter showClear filterBy="currency"
                      placeholder={t("select.to.currency")}/>
          </div>
          <div className="p-col-2 inline-display">
            <Button icon="pi pi-check-circle" className="p-button-success" onClick={convert}
                    disabled={convertButtonDisabled}/>
          </div>
        </div>
      </div>
    );
  }
