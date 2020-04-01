import axios from 'axios';
import {ResponseErrorCode} from './const.js';

export const createAPI = (onUnauthorized, onServerError) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-3.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;
    switch (response.status) {
      case ResponseErrorCode.UNAUTHORIZED: {
        onUnauthorized();
        break;
      }
      case ResponseErrorCode.NOT_FOUND: {
        onServerError(response.data.error);
        break;
      }

      case ResponseErrorCode.INVALID_REQUEST: {
        onServerError(response.data.error);
        break;
      }
    }

    if (response.status >= ResponseErrorCode.SERVER_IS_NOT_AVAILABLE) {
      onServerError(response.data.error);
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);
  return api;
};

export const apiDefault = axios.create({
  baseURL: `https://htmlacademy-react-3.appspot.com/six-cities`,
  timeout: 5000,
  withCredentials: true,
});
