import {reducer, ActionCreator, ActionType, Operation} from './user.js';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';

const api = createAPI(() => {});

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
  UNKNOWN: `UNKNOWN`
};

const error = `error`;

const user =
  {
    id: 1,
    name: `Nike`,
    avatar: `Nike.jpg`,
    email: `nike@n.com`,
    isPro: false,
  };

const serverUser =
  {
    'id': 1,
    'name': `Nike`,
    'avatar_url': `Nike.jpg`,
    'email': `nike@n.com`,
    'is_pro': false,
  };

const state = {
  error: ``,
  authorizationStatus: AuthorizationStatus.AUTH,
  user: {
    id: 1,
    name: `Nike`,
    avatar: `Nike.jpg`,
    email: `nike@n.com`,
    isPro: false,
  }
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    error: ``,
    authorizationStatus: AuthorizationStatus.UNKNOWN,
    user: {
      id: -1,
      name: ``,
      avatar: ``,
      email: ``,
      isPro: false,
    }
  });
});


it(`Reducer should require authorization`, () => {
  expect(reducer(state, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: {status: AuthorizationStatus.AUTH, user},
  })).toEqual({
    error: ``,
    authorizationStatus: AuthorizationStatus.AUTH,
    user: {
      id: 1,
      name: `Nike`,
      avatar: `Nike.jpg`,
      email: `nike@n.com`,
      isPro: false,
    }
  });
});

it(`Reducer should set loading error`, () => {
  expect(reducer(state, {
    type: ActionType.SET_LOADING_ERROR,
    payload: error,
  })).toEqual({
    error,
    authorizationStatus: AuthorizationStatus.AUTH,
    user: {
      id: 1,
      name: `Nike`,
      avatar: `Nike.jpg`,
      email: `nike@n.com`,
      isPro: false,
    }
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH, user)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: {status: AuthorizationStatus.AUTH, user}
    });
  });
  it(`Action creator for set loading error returns correct action`, () => {
    expect(ActionCreator.setLoadingError(error)).toEqual({
      type: ActionType.SET_LOADING_ERROR,
      payload: error
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthorization = Operation.checkAuth(api);

    apiMock
    .onGet(`/login`)
    .reply(200, serverUser);

    return checkAuthorization(dispatch)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: {status: AuthorizationStatus.AUTH, user}
        }
        );
      });
  });

  it(`Should make a correct API call to /login with an error`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthorization = Operation.checkAuth(api);

    apiMock
    .onGet(`/login`)
    .reply(401, serverUser);

    return checkAuthorization(dispatch)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: {status: AuthorizationStatus.NO_AUTH, user: {
            id: -1,
            name: ``,
            avatar: ``,
            email: ``,
            isPro: false,
          }}
        }
        );
      });
  });

  it(`Should make a correct API call to /login for post `, function () {
    const authData = {
      login: `nike@n.ru`,
      password: `123`,
    };

    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loginUser = Operation.login(authData);

    apiMock
      .onPost(`/login`, {
        email: authData.login,
        password: authData.password,
      })
      .reply(200, serverUser);

    return loginUser(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: {status: AuthorizationStatus.AUTH, user}
        }
        );
      });
  });
});
