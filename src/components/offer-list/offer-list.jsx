import React from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../offer-card/offer-card.jsx';

class OfferList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {currentCard: null};
    this.handleCardMouseover = this.handleCardMouseover.bind(this);
  }

  handleCardMouseover(idCurrentCard) {
    this.setState({currentCard: idCurrentCard});
  }

  render() {
    const {offerCards, handleHeaderCardClick} = this.props;
    return offerCards.map((offerCard) => {
      const {id} = offerCard;
      return <OfferCard
        offerCard = {offerCard}
        key = {id}
        handleHeaderCardClick = {handleHeaderCardClick}
        handleCardMouseover = {this.handleCardMouseover}
      />;
    });
  }
}

OfferList.propTypes = {
  offerCards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        photos: PropTypes.arrayOf(PropTypes.string.isRequired),
        name: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        isPremium: PropTypes.bool.isRequired
      })
  ).isRequired,
  handleHeaderCardClick: PropTypes.func,
};

export default OfferList;
