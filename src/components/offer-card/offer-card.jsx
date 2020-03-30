import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
//  import {getIdActiveCard} from '../../reducer/state/selector.js';
import {ActionCreator} from '../../reducer/state/state.js';
import {CardType} from '../../const.js';
import FavoriteToggle from '../favorite-toggle/favorite-toggle.jsx';

const getPercent = (rating) => {
  return rating * 100 / 5;
};

const OfferCard = (props) => {
  const {offerCard, onCardMouseover, cardType} = props;
  const {id, previewImage, name, rating, price, type, isPremium, isFavorite} = offerCard;
  return (
    <article className={cardType + `__place-card place-card`} key = {id}
      onMouseOver = {(evt) => {
        evt.preventDefault();
        if (cardType === CardType.CITY) {
          onCardMouseover(id);
        }
      }
      }>
      {isPremium && <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={cardType + `__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src = {previewImage} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className={cardType === CardType.FAVORITES ? `favorites__card-info place-card__info` : `place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteToggle
            dataComponent = {{nameClass: `place-card`, width: `18`, height: `19`}}
            isFavorite = {isFavorite}
            idCard = {id}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getPercent(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          {cardType === CardType.CITY &&
            <Link to={`/offer/` + id}>
              {name}
            </Link>}
          {(cardType === CardType.NEAR || cardType === CardType.FAVORITES) &&
          <a href= "#">
            {name}
          </a>}
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>);
};

OfferCard.propTypes = {
  offerCard: PropTypes.shape({
    id: PropTypes.number.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    isFavorite: PropTypes.bool.isRequired,
    previewImage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired
  }),
  onCardMouseover: PropTypes.func.isRequired,
  cardType: PropTypes.string.isRequired,
};

// const mapStateToProps = (state) => (
//   {
//   //  idActiveCard: getIdActiveCard(state),
//   }
// );

const mapDispatchToProps = (dispatch) => ({
  onCardMouseover(idActiveCard) {
    dispatch(ActionCreator.changeCurrenCard(idActiveCard));
  }
});

export {OfferCard};
export default connect(null, mapDispatchToProps)(OfferCard);
