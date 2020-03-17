import React from 'react';
import {connect} from 'react-redux';
//import {ActionCreator} from '../../reducer/reducer.js';
import {ActionCreator} from '../../reducer/state/state.js';
import {ActionCreator as DataActionCreator} from '../../reducer/data/data.js';
// ''../../reducer.js';
import PropTypes from 'prop-types';
import {SortType} from '../../const.js';


const CityList = ({cities, activeCity, onCityClick}) => {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) =>
            (<li className="locations__item" key = {city.id} onClick = {() => {
              onCityClick(city);
            }
            }>
              <a className={city.id !== activeCity.id ? `locations__item-link tabs__item` : `locations__item-link tabs__item tabs__item--active`} href="#">
                <span>{city.name}</span>
              </a>
            </li>))}
        </ul>
      </section>
    </div>);
};

CityList.propTypes = {
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
  onCityClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => (
  {
    activeCity: state.DATA.city
  }
);

const mapDispatchToProps = (dispatch) => ({
  onCityClick(activeCity) {
    dispatch(ActionCreator.changeSort(SortType.DEFAULT));
    dispatch(DataActionCreator.changeCity(activeCity));
    dispatch(DataActionCreator.getOfferList(activeCity));
  }
});

export {CityList};
export default connect(mapStateToProps, mapDispatchToProps)(CityList);
