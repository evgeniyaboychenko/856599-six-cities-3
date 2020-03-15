import React from 'react';
import PropTypes from 'prop-types';
import OfferList from '../offer-list/offer-list.jsx';
import CityList from '../city-list/city-list.jsx';
import {CardType} from '../../const.js';
import Map from '../map/map.jsx';
import SortList from '../sort-list/sort-list.jsx';
import withActiveSortList from '../../hocs/withAtiveSortList.jsx';
const SortListWrapperd = withActiveSortList(SortList);

const Main = (props) => {
  // const {offersCount, onHeaderCardClick, cities, activeCity} = props;
  const {offersCount, cities, activeCity} = props;
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
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
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
                  // onHeaderCardClick = {onHeaderCardClick}
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
        {offersCount ||
          <div className="cities">
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property availbale at the moment in {activeCity.name}</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
          </div>}
      </main>
    </div>
  );
};

Main.propTypes = {
  offersCount: PropTypes.number.isRequired,
  // onHeaderCardClick: PropTypes.func.isRequired,
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

export default Main;
