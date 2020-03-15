import React from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../offer-card/offer-card.jsx';
import {connect} from 'react-redux';
import {CardType} from '../../const.js';

const sortOffers = (offers, sortType) => {
  switch (sortType) {
    case (SortType.DEFAULT):
      return offers;
    case (SortType.LOW_TO_HIGH):
      return offers.sort((a, b) => (a.price - b.price));
    case (SortType.HIGH_TO_LOW):
      return offers.sort((a, b) => (b.price - a.price));
    case (SortType.TOP_RATED_FIRST):
      return offers.sort((a, b) => (b.rating - a.rating));
  }
  return offers;
};

const OfferList = (props) => {
  // const {offerCards, onHeaderCardClick, cardType, activeSortItem, offersNear} = props;
  const {offerCards, cardType, activeSortItem, offersNear} = props;
  let offers = [];
  if (cardType === CardType.CITY) {
    offers = offerCards;
  } else {
    offers = offersNear;
  }

  return sortOffers(offers.slice(), activeSortItem).map((offerCard) => {
    const {id} = offerCard;
    return <OfferCard
      offerCard = {offerCard}
      key = {id}
      // onHeaderCardClick = {onHeaderCardClick}
      cardType = {cardType}
    />;
  });
};

OfferList.propTypes = {
  offerCards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        photos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        name: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        isPremium: PropTypes.bool.isRequired
      })
  ).isRequired,
  offersNear: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        photos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        name: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        isPremium: PropTypes.bool.isRequired
      })
  ).isRequired,
  // onHeaderCardClick: PropTypes.func.isRequired,
  cardType: PropTypes.string.isRequired,
  activeSortItem: PropTypes.string.isRequired
};

const SortType = {
  DEFAULT: `Popular`,
  LOW_TO_HIGH: `Price: low to high`,
  HIGH_TO_LOW: `Price: high to low`,
  TOP_RATED_FIRST: `Top rated first`
};

const mapStateToProps = (state) => (
  {
    offerCards: state.offers,
    offersNear: state.offersNear,
    activeSortItem: state.activeSortItem
  }
);

export {OfferList};
export default connect(mapStateToProps)(OfferList);
