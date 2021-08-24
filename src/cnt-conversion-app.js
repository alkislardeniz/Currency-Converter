import {ConverterContainer} from "./app-currency-converter/cnt-currency-converter";
import React, {useEffect, useState} from "react";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {ExchangeRatesHistoryContainer} from "./app-exchange-rates-history/cnt-exchange-rates-history";
import {ConversionResultContainer} from "./app-conversion-result/cnt-conversion-result";
import {ConversionHistoryTableContainer} from "./app-conversion-history/cnt-conversion-history";
import {TabPanel, TabView} from "primereact/tabview";
import {useTranslation} from "react-i18next";
import {fetchExchangeRatesHistory} from "./app-exchange-rates-history/cns-exchange-rates-history";
import {fetchConversionRates} from "./app-currency-converter/cns-currency-converter";
import {API_WAIT_DURATION_IN_MS, DAY_TO_MILLISECONDS} from "./utils";

export const ConversionAppContainer = ({toast}) => {
  const {t} = useTranslation();
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [exchangeHistories, setExchangeHistories] = useState([]);
  const [duration, setDuration] = useState(7);
  const [conversionResultDisabled, setConversionResultDisabled] = useState(true);
  const [convertButtonDisabled, setConvertButtonDisabled] = useState(false);
  const [durationSelectionDisabled, setDurationSelectionDisabled] = useState(false);
  const [rates, setRates] = useState([]);

  useEffect(() => {
    initializeRates();
  }, []);

  useEffect(() => {
    fetchExchangeHistories();
  }, [duration, convertedAmount]);

  const onViewConversionClicked = rowData => {
    setToCurrency(rowData.toCurrency);
    setFromCurrency(rowData.fromCurrency);
    setAmount(rowData.amount);
    setConvertedAmount(rowData.toAmount);
    setActiveIndex(0);
    setConversionResultDisabled(false);
    disableConvertButtonAndDurationSelectionForASecond();
  }

  const convertDateToString = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    date = `${year}-${month}-${day}`;
    return date;
  }

  const initializeRates = async () => {
    const fetchedRates = await fetchConversionRates(toast);
    setRates(fetchedRates);
  }

  const fetchExchangeHistories = async () => {
    let startDate = Date.now() - (DAY_TO_MILLISECONDS * (duration - 1));
    startDate = convertDateToString(new Date(startDate));

    if (toCurrency && fromCurrency && convertedAmount > 0) {
      const fetchedHistoryOfFromCurrency = await fetchExchangeRatesHistory(fromCurrency, startDate, toast);
      const fetchedHistoryOfToCurrency = await fetchExchangeRatesHistory(toCurrency, startDate, toast);
      if (fetchedHistoryOfFromCurrency && fetchedHistoryOfToCurrency) {
        const exchangeHistories = [];
        fetchedHistoryOfToCurrency.forEach((toExchangeRate, index) => {
          const fromExchangeRate = fetchedHistoryOfFromCurrency[index];
          exchangeHistories.push({
            timestamp: toExchangeRate.timestamp,
            rate: (parseFloat(fromExchangeRate.rate) / parseFloat(toExchangeRate.rate))
          })
        })
        setExchangeHistories(exchangeHistories);
      }
    }
  }

  //TODO remove this after purchasing Nomics API because there is a limit of 1 req per sec
  const disableConvertButtonAndDurationSelectionForASecond = () => {
    setConvertButtonDisabled(true);
    setDurationSelectionDisabled(true);
    setTimeout(() => setConvertButtonDisabled(false), API_WAIT_DURATION_IN_MS);
    setTimeout(() => setDurationSelectionDisabled(false), API_WAIT_DURATION_IN_MS);
  }

  const setConvertedAmountAndShowResult = convertedAmount => {
    setConvertedAmount(convertedAmount);
    setConversionResultDisabled(false);
    disableConvertButtonAndDurationSelectionForASecond();
  }

  const setFromCurrencyAndDisableResult = fromCurrency => {
    setConversionResultDisabled(true);
    setFromCurrency(fromCurrency);
  }

  const setToCurrencyAndDisableResult = toCurrency => {
    setConversionResultDisabled(true);
    setToCurrency(toCurrency);
  }

  const setAmountAndDisableResult = amount => {
    setConversionResultDisabled(true);
    setAmount(amount);
  }

  const setDurationAndDisableSelection = duration => {
    setDuration(duration);
    disableConvertButtonAndDurationSelectionForASecond();
  }

  return (
    <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
      <TabPanel header={t("currency.converter")}>
        <ConverterContainer amount={amount} setAmount={setAmountAndDisableResult} toCurrency={toCurrency}
                            setToCurrency={setToCurrencyAndDisableResult}
                            fromCurrency={fromCurrency}
                            setFromCurrency={setFromCurrencyAndDisableResult}
                            setConvertedAmount={setConvertedAmountAndShowResult}
                            convertButtonDisabled={convertButtonDisabled}
                            rates={rates}
                            toast={toast}/>
        <ConversionResultContainer toCurrency={toCurrency} fromCurrency={fromCurrency} fromAmount={amount}
                                   toAmount={convertedAmount} conversionResultDisabled={conversionResultDisabled}/>
        <ExchangeRatesHistoryContainer setDuration={setDurationAndDisableSelection} duration={duration}
                                       exchangeHistories={exchangeHistories} toCurrency={toCurrency}
                                       fromCurrency={fromCurrency}
                                       durationSelectionDisabled={durationSelectionDisabled}/>
      </TabPanel>
      <TabPanel header={t("view.conversion.history")}>
        <ConversionHistoryTableContainer onViewConversionClicked={onViewConversionClicked}/>
      </TabPanel>
    </TabView>
  );
}
