import axios from 'axios';

import {API_KEY, API_WAIT_DURATION_IN_MS, getErrorContent} from "../utils";

const HISTORY_API_BASE = `https://api.nomics.com/v1/exchange-rates/history?key=${API_KEY}`;

export const fetchExchangeRatesHistory = async (currency, startDate, toast) => {
  let history = null;
  try {
    //TODO remove this after purchasing Nomics API because there is a limit of 1 req per sec
    await new Promise(resolve => setTimeout(resolve, API_WAIT_DURATION_IN_MS));
    history = await axios.get(`${HISTORY_API_BASE}&currency=${currency}&start=${startDate}T00%3A00%3A00Z`);
  } catch (error) {
    const errorContent = getErrorContent(error);
    toast && errorContent && toast.show(errorContent);
  }
  return history && history.data;
}


