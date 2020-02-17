import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

const headerCardClickHandler = () => {};

const App = (props) => {
  const {offersCount, offerCards} = props;
  return (
    <Main
      offersCount = {offersCount}
      offerCards = {offerCards}
      headerCardClickHandler = {headerCardClickHandler}
    />
  );
};

App.propTypes = {
  offersCount: PropTypes.number.isRequired,
  offerCards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        isPremium: PropTypes.bool.isRequired
      })
  ).isRequired,
};

export default App;
