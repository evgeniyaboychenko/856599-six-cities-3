import {extend} from '../../utils/utils.js';
import {adaptUser} from '../../utils/adapter.js';

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
  UNKNOWN: `UNKNOWN`
};

const initialState = {
  error: ``,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  user: {
    id: -1,
    name: ``,
    avatar: ``,
    email: ``,
    isPro: false,
  }
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_LOADING_ERROR: `SET_LOADING_ERROR`
};

const ActionCreator = {
  requireAuthorization: (status, user) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: {status, user}
    };
  },
  setLoadingError: (error) => {
    return {
      type: ActionType.SET_LOADING_ERROR,
      payload: error
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload.status,
        user: action.payload.user
      });
    case ActionType.SET_LOADING_ERROR:
      return extend(state, {
        error: action.payload
      });
  }

  return state;
};

const Operation = {
  checkAuth: (apiDefault) => (dispatch) => {
    return apiDefault.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH, adaptUser(response.data)));
      }
      , () => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH, {id: -1,
        name: ``,
        avatar: ``,
        email: ``,
        isPro: false})));
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH, adaptUser(response.data)));
      })
      .catch((err) => {
        const {response} = err;
        dispatch(ActionCreator.setLoadingError(response.data.error));
      });
  },
};

export {reducer, ActionCreator, ActionType, AuthorizationStatus, Operation};
