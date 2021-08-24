import {ConversionResultComponent} from "./cmp-conversion-result";
import React from "react";

export const ConversionResultContainer = ({toCurrency, fromCurrency, fromAmount, toAmount, conversionResultDisabled}) => {

  return (
    <ConversionResultComponent toCurrency={toCurrency} fromCurrency={fromCurrency} fromAmount={fromAmount}
                               toAmount={toAmount} conversionResultDisabled={conversionResultDisabled}/>
  );
}

