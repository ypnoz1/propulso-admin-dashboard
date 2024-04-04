export const URL_BASE = 'http://localhost:4000';
export const URL_APP_NAME = 'metrics';
export const URL_MAIN = 'main';
export const URL_MONTHLY = 'monthly';

export const getMetricsStream = async (options) => {
  const url = `${URL_BASE}/${URL_APP_NAME}/${URL_MONTHLY}?m=${options.monthNumber}&c=${options.chunkSize}&e=${options.lineCount}&s=${options.filesize}&p=${options.maxPartMonth}`;
  return await fetch(url).then(response => {
    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.body.getReader();
  }).catch(error => {
      console.error(error);
      return null;
  });
}
export const getMetricsMainStream = async (pagination) => {
  return await fetch(`${URL_BASE}/${URL_APP_NAME}/${URL_MAIN}?start=${pagination[0]}&end=${pagination[1]}`).then(response => {
    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.body.getReader();
  }).catch(error => {
      console.error(error);
      return null;
  });
}