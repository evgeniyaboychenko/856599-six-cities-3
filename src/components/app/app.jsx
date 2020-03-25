import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import Favorites from '../favorites/favorites.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import AboutOffer from '../about-offer/about-offer.jsx';
import {AppRoute} from '../../const.js';
import {connect} from 'react-redux';
import {getActiveCity, getCities, getOffersByCityName, getIsData, getOffersNear} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus, getUserData, getError} from "../../reducer/user/selector.js";
import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user.js";
// import {Operation as OffersOperation, ActionCreator} from '../../reducer/data/data.js';

const App = (props) => {
  const {error, isData, authorizationStatus, user, offerCards, cities, activeCity, onSubmitLogin, onOpenAboutOffer} = props;

  const renderMain = () => {
    return <Main
      error = {error}
      isData = {isData}
      authorizationStatus = {authorizationStatus}
      user = {user}
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
        <Route exact path={AppRoute.FAVORITES}
          render = {() => {
            return <Favorites
              authorizationStatus = {authorizationStatus}
              user = {user}
              offerCards = {offerCards}
              cities = {cities}
            />;
          }}/>
        <Route exact path={AppRoute.ROOM}
          render = {(propsLink) => {
            const offerCard = offerCards.find((item) => item.id === Number(propsLink.match.params.id));
            return <AboutOffer
              isData = {isData}
              authorizationStatus = {authorizationStatus}
              user = {user}
              activeCity = {activeCity}
              offerCard = {offerCard}
            />;
          }}/>
        <Route exact path={AppRoute.SIGN_IN}
          render = {(propsLink) => {
            if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
              return <SignIn
                error = {error}
                onSubmit = {onSubmitLogin}
              />;
            } else if (authorizationStatus === AuthorizationStatus.AUTH) {
              propsLink.history.goBack();
              // return <Redirect to="/"/>;
            }
            return ``;
          }}
        />
      </Switch>
    </BrowserRouter>);
};

App.propTypes = {
  error: PropTypes.string.isRequired,
  isData: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    is_pro: PropTypes.bool.isRequired,
  }).isRequired,
  offerCards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        photos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        name: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        isPremium: PropTypes.bool.isRequired
      })
  ).isRequired,
  cities: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    coordinatesCity: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    zoom: PropTypes.number.isRequired,
  })).isRequired,
  activeCity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    coordinatesCity: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    zoom: PropTypes.number.isRequired,
  }).isRequired,
  onSubmitLogin: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => (
  {
    error: getError(state),
    user: getUserData(state),
    isData: getIsData(state),
    authorizationStatus: getAuthorizationStatus(state),
    activeCity: getActiveCity(state),
    cities: getCities(state),
    offerCards: getOffersByCityName(state) // getOffers(state)
  }
);

const mapDispatchToProps = (dispatch) => ({
  onSubmitLogin(authData) {
    dispatch(UserOperation.login(authData));
  },
});
export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
