import React, {useEffect, useState} from 'react';
import {ConversionHistoryTableComponent} from "./cmp-conversion-history";
import {LOCAL_STORAGE_KEY} from "../utils";


export const ConversionHistoryTableContainer = ({onViewConversionClicked}) => {
  const [conversions, setConversions] = useState([]);

  useEffect(() => {
    const stringifiedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
    const conversionHistory = stringifiedHistory ? JSON.parse(stringifiedHistory) : [];
    setConversions(conversionHistory);
  }, []);

  const onDeleteConversionClicked = (rowData) => {
    let updatedConversions = conversions.filter(conversion => conversion.date !== rowData.date);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedConversions));
    setConversions(updatedConversions);
  }

  return (
    <ConversionHistoryTableComponent
      conversions={conversions}
      onViewConversionClicked={onViewConversionClicked}
      onDeleteConversionClicked={onDeleteConversionClicked}
    />
  );
}
