import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

const headerCardClickHandler = () => {};

const App = (props) => {
  const {offersCount, adsNames} = props;
  return (
    <Main
      offersCount = {offersCount}
      adsNames = {adsNames}
      headerCardClickHandler = {headerCardClickHandler}
    />
  );
};

App.propTypes = {
  offersCount: PropTypes.number.isRequired,
  adsNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default App;
