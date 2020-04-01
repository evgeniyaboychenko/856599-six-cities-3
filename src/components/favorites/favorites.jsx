import React from 'react';
import PropTypes from 'prop-types';
import FavoritesEmpty from '../favorites-empty/favorites-empty.jsx';
import OfferList from '../offer-list/offer-list.jsx';
import {CardType, SortType} from '../../const.js';

const Favorites = (props) => {
  const {offersFavorite, user} = props;
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper"
                      style = {{backgroundImage: `url(https://htmlacademy-react-3.appspot.com/six-cities${user.avatar})`}}>
                    </div>
                    <span className="header__user-name user__name">{user.email}</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      {offersFavorite.length !== 0 &&
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {offersFavorite.map((offer, i) => {
                const {city, offersFavoriteByCity} = offer;
                return (
                  <li className="favorites__locations-items" key = {i + city.name}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city.name}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      <OfferList
                        activeSortItem = {SortType.DEFAULT}
                        offers = {offersFavoriteByCity}
                        cardType = {CardType.FAVORITES}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </main>}
      {offersFavorite.length === 0 &&
        <FavoritesEmpty/>
      }
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>);
};

Favorites.propTypes = {
  offersFavorite: PropTypes.arrayOf(
      PropTypes.shape({
        city: PropTypes.shape({
          name: PropTypes.string.isRequired}).isRequired,
        offersFavoriteByCity: PropTypes.shape.isRequired,
      })
  ).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired,
  }).isRequired,
};

export default React.memo(Favorites);
