import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {generateOfferCards} from './mocks/offers.js';

const Settings = {
  OFFERS_COUNT: 10
};


// const adsNames = [`Beautiful & luxurious apartment at great location`, `Wood and stone place`, `Canal View Prinsengracht`];

ReactDOM.render(
    <App offersCount = {Settings.OFFERS_COUNT}
      offerCards = {generateOfferCards()}
    />,
    document.querySelector(`#root`)
);
