import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer/reducer.js';
import {Operation as OffersOperation} from './reducer/data/data.js';
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from "./reducer/user/user.js";
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
  // store.dispatch(ActionCreator.setLoadingError(``));
};

const api = createAPI((onUnauthorized), (onServerError));

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(OffersOperation.loadOfferList());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
