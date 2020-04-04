import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import Favorites from '../favorites/favorites.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import {Switch, Route, Router} from 'react-router-dom';
import AboutOffer from '../about-offer/about-offer.jsx';
import Loading from '../loading/loading.jsx';
import {AppRoute} from '../../const.js';
import {connect} from 'react-redux';
import {getActiveCity, getCities, getOffersByCityName, getIsData, getOffersFavorites} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus, getUserData, getError} from '../../reducer/user/selector.js';
import {getActiveSortItem, getIdActiveCard} from '../../reducer/state/selector.js';
import {Operation as UserOperation, AuthorizationStatus} from '../../reducer/user/user.js';
import {Operation as OffersOperation} from '../../reducer/data/data.js';
import history from '../../history.js';
import MessageError from '../message-error/message-error.jsx';
import PrivateRoute from '../private-route/private-route.jsx';

import {apiDefault} from '../../api.js';

class App extends PureComponent {

  componentDidMount() {
    const {onLoadOffesList, onCheckAuth} = this.props;
    onLoadOffesList();
    onCheckAuth();
  }

  renderMain() {
    const {idCurrentCard, activeSortItem, error, isData, authorizationStatus, user, offerCards, cities, activeCity} = this.props;
    if (isData) {
      return <Main
        idCurrentCard = {idCurrentCard}
        error = {error}
        isData = {isData}
        authorizationStatus = {authorizationStatus}
        user = {user}
        activeCity = {activeCity}
        cities = {cities}
        offerCards = {offerCards}
        activeSortItem = {activeSortItem}
      />;
    }
    return <Loading/>;
  }

  render() {
    const {offersFavorite, error, authorizationStatus, user, onSubmitLogin} = this.props;
    return (
      [<Router key = {1} history={history}>
        <Switch>
          <Route exact path="/">
            {this.renderMain()}
          </Route>
          <PrivateRoute
            exact path={AppRoute.FAVORITES}
            render={() => {
              return <Favorites
                offersFavorite = {offersFavorite}
                user = {user}
              />;
            }}
          />
          <Route exact path={AppRoute.ROOM}
            component={AboutOffer}
          />
          <Route exact path={AppRoute.SIGN_IN}
            render = {() => {
              if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
                return <SignIn
                  error = {error}
                  onSubmit = {onSubmitLogin}
                />;
              } else if (authorizationStatus === AuthorizationStatus.AUTH) {
                history.goBack();
              }
              return ``;
            }
            }
          />
        </Switch>
      </Router>,
      <MessageError key = {2}
        error = {error}
      />]);
  }
}

App.propTypes = {
  idCurrentCard: PropTypes.number.isRequired,
  activeSortItem: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  isData: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired,
  }).isRequired,
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
  onSubmitLogin: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onLoadOffesList: PropTypes.func.isRequired,
  onCheckAuth: PropTypes.func.isRequired,
  offersFavorite: PropTypes.arrayOf(
      PropTypes.shape({
        city: PropTypes.shape({
          name: PropTypes.string.isRequired,
          coordinatesCity: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
          zoom: PropTypes.number.isRequired,
        }).isRequired,
        offersFavoriteByCity: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.number.isRequired,
              photos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
              name: PropTypes.string.isRequired,
              rating: PropTypes.number.isRequired,
              price: PropTypes.number.isRequired,
              type: PropTypes.string.isRequired,
              isPremium: PropTypes.bool.isRequired
            })
        ).isRequired
      })
  ),
};

const mapStateToProps = (state) => (
  {
    error: getError(state),
    user: getUserData(state),
    isData: getIsData(state),
    authorizationStatus: getAuthorizationStatus(state),
    activeCity: getActiveCity(state),
    cities: getCities(state),
    offerCards: getOffersByCityName(state),
    offersFavorite: getOffersFavorites(state),
    activeSortItem: getActiveSortItem(state),
    idCurrentCard: getIdActiveCard(state)
  }
);

const mapDispatchToProps = (dispatch) => ({
  onLoadOffesList() {
    dispatch(OffersOperation.loadOfferList());
  },
  onCheckAuth() {
    dispatch(UserOperation.checkAuth(apiDefault));
  },
  onSubmitLogin(authData) {
    dispatch(UserOperation.login(authData));
  },
});
export {App};
export default connect(mapStateToProps, mapDispatchToProps)((App));
