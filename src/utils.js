const ERROR_GROWL_LIFE_IN_MS = 3000;
const ERROR_GROWL_SEVERITY = "error";

//TODO do not hold API key in frontend, use another alternatives like taking as an env. variable
export const API_KEY = "8ffdca2fea03f176ce8f0db983da1b73ed54a861";

//TODO remove this after purchasing Nomics API because there is a limit of 1 req per sec
export const API_WAIT_DURATION_IN_MS = 1000;

export const DAY_TO_MILLISECONDS = 86400000;

export const LOCAL_STORAGE_KEY = "conversionHistory";

export const getErrorContent = (error) => {
  if (error && error.response && error.response.status && error.response.statusText) {
    return {severity: ERROR_GROWL_SEVERITY, summary: error.response.statusText, detail: error.response.status, life: ERROR_GROWL_LIFE_IN_MS}
  }
  return null;
}
