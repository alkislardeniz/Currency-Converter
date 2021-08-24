import React from 'react';
import {ConverterComponent} from "./cmp-currency-converter";
import {LOCAL_STORAGE_KEY} from "../utils";


export const ConverterContainer =
  ({setConvertedAmount, toCurrency, setToCurrency, fromCurrency, setFromCurrency, amount, setAmount, rates, convertButtonDisabled}) => {

  const convert = () => {
    const fromCurrencyRate = rates.find(rate => rate.currency === fromCurrency).rate;
    const toCurrencyRate = rates.find(rate => rate.currency === toCurrency).rate;
    const toAmount = amount * fromCurrencyRate / toCurrencyRate;
    saveConversionResultToLocalStorage(toAmount);
    setConvertedAmount(toAmount);
  }

  const saveConversionResultToLocalStorage = (toAmount) => {
    const stringifiedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
    const conversionHistory = stringifiedHistory ? JSON.parse(stringifiedHistory) : [];
    conversionHistory.push({toCurrency, fromCurrency, amount, toAmount, date: new Date().toLocaleString()})
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(conversionHistory));
  }

  const switchCurrencies = () => {
    const toCurrencyFromState = toCurrency;
    setToCurrency(fromCurrency);
    setFromCurrency(toCurrencyFromState);
  };

  return (
    <ConverterComponent
      convertButtonDisabled={convertButtonDisabled || !fromCurrency || !toCurrency || !amount}
      amount={amount}
      setAmount={setAmount}
      rates={rates}
      fromCurrency={fromCurrency}
      setFromCurrency={setFromCurrency}
      toCurrency={toCurrency}
      setToCurrency={setToCurrency}
      switchCurrencies={switchCurrencies}
      convert={convert}
    />
  );
}
