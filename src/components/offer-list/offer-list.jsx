import React from 'react';
import PropTypes from 'prop-types';
import {OfferCard} from '../offer-card/offer-card.jsx';
import {SortType} from '../../const.js';

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

const OfferList = ({offers, cardType, activeSortItem}) => {
  let offerList = offers.slice();
  return <>{sortOffers(offerList.slice(), activeSortItem).map((offerCard) => {
    const {id} = offerCard;
    return <OfferCard
      offerCard = {offerCard}
      key = {id}
      cardType = {cardType}
    />;
  })} </>;
};

OfferList.propTypes = {
  offers: PropTypes.array.isRequired,
  cardType: PropTypes.string.isRequired,
  activeSortItem: PropTypes.string.isRequired
};

export default React.memo(OfferList);
