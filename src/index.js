import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const Settings = {
  OFFERS_COUNT: 10
};

const offersName = [`Beautiful & luxurious apartment at great location`, `Wood and stone place`, `Canal View Prinsengracht`];

ReactDOM.render(
    <App offersCount = {Settings.OFFERS_COUNT}
      offersName = {offersName}
    />,
    document.querySelector(`#root`)
);
