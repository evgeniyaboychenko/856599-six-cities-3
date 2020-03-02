import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {cities} from './mocks/offers.js';
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer.js";

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

// const COUNT_CARD = 10;

// const Settings = {
//   OFFERS_COUNT: 10
// };

// const NUMBER_CITY_ACTIVE = 0;
// const cities = generateCities();

ReactDOM.render(
    <Provider store={store}>
      <App
        // cityActive = {cities[NUMBER_CITY_ACTIVE].id}
        cities = {cities}
        // offersCount = {Settings.OFFERS_COUNT}
        // offerCards = {generateOfferCards(COUNT_CARD)}
      />
    </Provider>,
    document.querySelector(`#root`)
);
