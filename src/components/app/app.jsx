import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import AboutOffer from '../about-offer/about-offer.jsx';
import {AppRoute} from '../../const.js';
import {connect} from 'react-redux';
import {getCity, getOffersByCityName} from '../../reducer/data/selectors.js';

const App = (props) => {
  const {offerCards, cities, activeCity} = props;

  const renderMain = () => {
    return <Main
      activeCity = {activeCity}
      cities = {cities}
      offersCount = {offerCards.length}
    />;
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {renderMain()}
        </Route>
        <Route exact path={AppRoute.ROOM}
          render = {(propsLink) => {
            const offerCard = offerCards.find((item) => item.id === propsLink.match.params.id);
            return <AboutOffer
              activeCity = {activeCity}
              offerCard = {offerCard}
            />;
          }}/>
      </Switch>
    </BrowserRouter>);
};

App.propTypes = {
  offerCards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        photos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        name: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        isPremium: PropTypes.bool.isRequired
      })
  ).isRequired,
  cities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    coordinatesCity: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  })).isRequired,
  activeCity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    coordinatesCity: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => (
  {
    activeCity: getCity(state),
    offerCards: getOffersByCityName(state) // getOffers(state)
  }
);

export {App};
export default connect(mapStateToProps)(App);
