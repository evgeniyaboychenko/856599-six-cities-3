import axios from 'axios';
import {ServerCode} from './const.js';

export const createAPI = (onUnauthorized) => {
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
      case ServerCode.UNAUTHORIZED: {
        onUnauthorized();
        throw err;
      }
      case ServerCode.NOT_FOUND: {
        // onServerError(response.data.error);
        throw response.data.error;
      }
    }
    if (response.status >= ServerCode.SERVER_IS_NOT_AVAILABLE) {
      //  onServerError(response.data.error);
      throw response.data.error;
    }

    // if (response.status === Error.UNAUTHORIZED) {
    //   onUnauthorized();
    //   throw err;
    // }
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);
  return api;
};
