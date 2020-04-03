import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer/reducer.js';
import {ActionCreator, AuthorizationStatus} from "./reducer/user/user.js";
import {composeWithDevTools} from 'redux-devtools-extension';
import {createAPI} from "./api.js";
import history from "./history.js";
import {AppRoute} from './const.js';

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH, {id: -1,
    name: ``,
    avatar: ``,
    email: ``,
    isPro: false}));
  return history.push(AppRoute.SIGN_IN);
};

const onServerError = (error) => {
  store.dispatch(ActionCreator.setLoadingError(error));
};

const api = createAPI((onUnauthorized), (onServerError));

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);


export default store;
