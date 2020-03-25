import axios from 'axios';

const Error = {
  UNAUTHORIZED: 401,
  INVALID_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_IS_NOT_AVAILABLE: 500
};

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
      case Error.UNAUTHORIZED: {
        onUnauthorized();
        throw err;
      }
      case Error.NOT_FOUND: {
        // onServerError(response.data.error);
        throw response.data.error;
      }
    }
    if (response.status >= Error.SERVER_IS_NOT_AVAILABLE) {
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
