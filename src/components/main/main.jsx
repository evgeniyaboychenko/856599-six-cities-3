import React from 'react';
import PropTypes from 'prop-types';
import OfferList from '../offer-list/offer-list.jsx';
import CityList from '../city-list/city-list.jsx';
import {CardType} from '../../const.js';
import Map from '../map/map.jsx';
//  import MessageError from '../message-error/message-error.jsx';
import MainEmpty from '../main-empty/main-empty.jsx';
import SortList from '../sort-list/sort-list.jsx';
import withActiveSortList from '../../hocs/withAtiveSortList.jsx';
const SortListWrapperd = withActiveSortList(SortList);
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {Link} from 'react-router-dom';

const Main = (props) => {
  const {isData, authorizationStatus, user, offersCount, cities, activeCity} = props;
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
                  </Link>}
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
      {isData ||
      <div style = {{position: `absolute`, content: ``, marginLeft: `50%`, marginTop: `200px`}}>
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.0" width="64px" height="64px" viewBox="0 0 128 128" xmlSpace="preserve">
          <g><circle cx="16" cy="64" r="16" fill="#000000" fillOpacity="1"/><circle cx="16" cy="64" r="14.344" fill="#000000" fillOpacity="1" transform="rotate(45 64 64)"/>
            <circle cx="16" cy="64" r="12.531" fill="#000000" fillOpacity="1" transform="rotate(90 64 64)"/>
            <circle cx="16" cy="64" r="10.75" fill="#000000" fillOpacity="1" transform="rotate(135 64 64)"/>
            <circle cx="16" cy="64" r="10.063" fill="#000000" fillOpacity="1" transform="rotate(180 64 64)"/>
            <circle cx="16" cy="64" r="8.063" fill="#000000" fillOpacity="1" transform="rotate(225 64 64)"/>
            <circle cx="16" cy="64" r="6.438" fill="#000000" fillOpacity="1" transform="rotate(270 64 64)"/>
            <circle cx="16" cy="64" r="5.375" fill="#000000" fillOpacity="1" transform="rotate(315 64 64)"/>
            <animateTransform attributeName="transform" type="rotate" values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64" calcMode="discrete" dur="720ms" repeatCount="indefinite">
            </animateTransform></g>
        </svg>
      </div>}
      {isData &&
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
                  cardType = {CardType.CITY}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  cardType = {CardType.CITY}
                />
              </section>
            </div>
          </div>
        </div>
        }
        {offersCount || <MainEmpty activeCity = {activeCity}/>}
      </main>}
      {/* <MessageError
        error = {error}
      /> */}
    </div>
  );
};

Main.propTypes = {
  // error: PropTypes.string.isRequired,
  isData: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired,
  }).isRequired,
  offersCount: PropTypes.number.isRequired,
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


export default Main;
