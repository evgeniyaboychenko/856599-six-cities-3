import React from 'react';
import PropTypes from 'prop-types';


const getPercent = (rating) => {
  return rating * 100 / 5;
};

const getPremium = (isPremium) => {
  if (isPremium) {
    return (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>);
  }
  return ``;
};

const OfferCard = (props) => {
  const {offerCard, handleHeaderCardClick, handleCardMouseover} = props;
  const {id, photos, name, rating, price, type, isPremium} = offerCard;

  return (
    <article className="cities__place-card place-card" key = {id} onMouseOver = {(evt) => {
      evt.preventDefault();
      handleCardMouseover(id);
    }
    }>
      {getPremium(isPremium)}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src = {`img/` + photos[0]} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use href="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getPercent(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#" onClick = {(evt) => {
            evt.preventDefault();
            handleHeaderCardClick(id);
          }
          }>
            {name}
          </a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>);
};

OfferCard.propTypes = {
  offerCard: PropTypes.shape({
    id: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string.isRequired),
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired
  }),
  handleHeaderCardClick: PropTypes.func,
  handleCardMouseover: PropTypes.func,
};

export default OfferCard;
