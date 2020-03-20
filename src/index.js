import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
// import {cities} from './mocks/offers.js';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer/reducer.js';
import {Operation as OffersOperation} from './reducer/data/data.js';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createAPI} from "./api.js";

const api = createAPI(() => {});

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
    // compose(
    // applyMiddleware(thunk.withExtraArgument(api))
    //  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    // )
);

store.dispatch(OffersOperation.loadOfferList());

ReactDOM.render(
    <Provider store={store}>
      <App
        // cities = {cities}
      />
    </Provider>,
    document.querySelector(`#root`)
);
