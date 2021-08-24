import axios from 'axios';
import {API_KEY, API_WAIT_DURATION_IN_MS, getErrorContent} from "../utils";

const CONVERTER_API = `https://api.nomics.com/v1/exchange-rates?key=${API_KEY}`;

export const fetchConversionRates = async (toast) => {
  let rates = null;
  try {
    //TODO remove this after purchasing Nomics API because there is a limit of 1 req per sec
    await new Promise(resolve => setTimeout(resolve, API_WAIT_DURATION_IN_MS));
    rates = await axios.get(CONVERTER_API);
  } catch (error) {
    const errorContent = getErrorContent(error);
    toast && errorContent && toast.show(errorContent);
  }
  return rates && rates.data;
}
