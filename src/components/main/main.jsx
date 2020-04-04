import React from 'react';
import PropTypes from 'prop-types';
import OfferList from '../offer-list/offer-list.jsx';
import CityList from '../city-list/city-list.jsx';
import {CardType} from '../../const.js';
import Map from '../map/map.jsx';
import MainEmpty from '../main-empty/main-empty.jsx';
import Loading from '../loading/loading.jsx';
import SortList from '../sort-list/sort-list.jsx';
import withActiveSortList from '../../hocs/with-active-sort/with-active-sort.js';
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {Link} from 'react-router-dom';
const SortListWrapperd = withActiveSortList(SortList);

const Main = ({authorizationStatus, user, cities, activeCity, offerCards, activeSortItem, idCurrentCard}) => {
  const offersCount = offerCards.length;
  if (offersCount) {
    return (
      <div className="page page--gray page--main">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link header__logo-link--active">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    {authorizationStatus === AuthorizationStatus.AUTH &&
                    <Link to = {`/favorites`} className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper"
                        style = {{backgroundImage: `url(https://htmlacademy-react-3.appspot.com/six-cities${user.avatar})`}}>
                      </div>
                      <span className="header__user-name user__name">{user.email}</span>
                    </Link>
                    }
                    {authorizationStatus === AuthorizationStatus.NO_AUTH &&
                    <Link to = {`/login`} className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link>
                    }
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <main className={offersCount ? `page__main page__main--index` : `page__main page__main--index page__main--index-empty`}>
          <h1 className="visually-hidden">Cities</h1>
          <CityList
            cities = {cities}
          />
          {offersCount &&
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offersCount} places to stay in {activeCity.name}</b>
                <SortListWrapperd/>
                <div className="cities__places-list places__list tabs__content">
                  <OfferList
                    activeSortItem = {activeSortItem}
                    offers = {offerCards}
                    cardType = {CardType.CITY}
                  />
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map
                    idCurrentCard = {idCurrentCard}
                    cardType = {CardType.CITY}
                  />
                </section>
              </div>
            </div>
          </div>
          }
          {offersCount || <MainEmpty activeCity = {activeCity}/>}
        </main>
      </div>
    );
  } else {
    return <Loading/>;
  }
};

Main.propTypes = {
  idCurrentCard: PropTypes.number.isRequired,
  activeSortItem: PropTypes.string.isRequired,
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
  authorizationStatus: PropTypes.string.isRequired,
};


export default React.memo(Main);
