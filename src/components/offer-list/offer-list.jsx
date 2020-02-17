import React from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../offer_card/offer_card.jsx';

const OfferList = ({offerCards}) => {
  console.log(offerCards);
  return offerCards.map((offerCard) => {
    const {id} = offerCard;
     return <OfferCard
        offerCard = {offerCard}
        key = {id}
      />
  });
};

OfferList.propTypes = {
  offerCards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      isPremium: PropTypes.bool.isRequired
    })
  ).isRequired,
};

export default OfferList;
