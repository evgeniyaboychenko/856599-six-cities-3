import React from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../offer-card/offer-card.jsx';
// import {connect} from "react-redux";
// import {ActionCreator} from "../../reducer.js";
// import { generateOfferCards } from '../../mocks/offers.js';

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
    const {offerCards, onHeaderCardClick, cardType} = this.props;
    return offerCards.map((offerCard) => {
      const {id} = offerCard;
      return <OfferCard
        offerCard = {offerCard}
        key = {id}
        onHeaderCardClick = {onHeaderCardClick}
        onCardMouseover = {this.handleCardMouseover}
        cardType = {cardType}
      />;
    });
  }
}

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
  onHeaderCardClick: PropTypes.func.isRequired,
  cardType: PropTypes.string.isRequired,
};

// const mapStateToProps = (state) => (
//   {
//     offerCards: state.offers
//   }
// );

export default OfferList;
// export {OfferList};
// export default connect(mapStateToProps)(OfferList)
