import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Operation as OffersOperation} from '../../reducer/data/data.js';

const FavoriteToggle = ({isFavorite, idCard, onButtonClick, dataComponent}) => {
  const {nameClass, width, height} = dataComponent;
  return (
    <button onClick = {(evt) => {
      evt.preventDefault();
      onButtonClick(idCard, Number(!isFavorite));
    }}
    className={!isFavorite ?
      `${nameClass}__bookmark-button button` :
      `${nameClass}__bookmark-button place-card__bookmark-button--active button`}
    type="button">
      <svg className="place-card__bookmark-icon" width={width} height={height}>
        <use href="#icon-bookmark"/>
      </svg>
      <span className="visually-hidden">In bookmarks</span>
    </button>
  );
};

FavoriteToggle.propTypes = {
  idCard: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  dataComponent: PropTypes.shape({
    nameClass: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onButtonClick(idHotel, status) {
    dispatch(OffersOperation.changeStatusFavoriteHotel(idHotel, status));
  }
});

export {FavoriteToggle};
export default connect(null, mapDispatchToProps)(React.memo(FavoriteToggle));
