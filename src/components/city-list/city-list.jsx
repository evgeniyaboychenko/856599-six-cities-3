import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/state/state.js';
import {ActionCreator as DataActionCreator} from '../../reducer/data/data.js';
import PropTypes from 'prop-types';
import {SortType} from '../../const.js';
import {getActiveCity, getCities} from '../../reducer/data/selectors.js';
import {generateId} from '../../utils/utils.js';

const CityList = ({cities, activeCity, onCityClick}) => {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) =>
            (<li className="locations__item" key = {generateId()} onClick = {() => {
              onCityClick(city);
            }
            }>
              <a className={city.name !== activeCity.name ? `locations__item-link tabs__item` : `locations__item-link tabs__item tabs__item--active`} href="#">
                <span>{city.name}</span>
              </a>
            </li>))}
        </ul>
      </section>
    </div>);
};

CityList.propTypes = {
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
  onCityClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => (
  {
    cities: getCities(state),
    activeCity: getActiveCity(state)
  }
);

const mapDispatchToProps = (dispatch) => ({
  onCityClick(activeCity) {
    dispatch(ActionCreator.changeSort(SortType.DEFAULT));
    dispatch(DataActionCreator.changeCity(activeCity));
    // dispatch(DataActionCreator.getOfferList(activeCity));
  }
});

export {CityList};
export default connect(mapStateToProps, mapDispatchToProps)(CityList);
