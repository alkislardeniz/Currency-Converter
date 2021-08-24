import React from "react";

export const ConversionResultComponent =
  ({fromAmount, fromCurrency, toAmount, toCurrency, conversionResultDisabled}) => {

    return (
      !conversionResultDisabled &&
      <div>
        <h1>{`${fromAmount} ${fromCurrency} = ${toAmount} ${toCurrency}`}</h1>
        <h5>{`1 ${fromCurrency} = ${toAmount / fromAmount} ${toCurrency}`}</h5>
        <h5>{`1 ${toCurrency} = ${fromAmount / toAmount} ${fromCurrency}`}</h5>
      </div>
    );
  }
