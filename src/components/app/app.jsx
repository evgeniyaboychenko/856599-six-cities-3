import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import AboutOffer from '../about-offer/about-offer.jsx';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';
import {SortType} from '../../const.js';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {currentCard: null};
    this.handleHeaderCardClick = this.handleHeaderCardClick.bind(this);
  }


  _renderMain() {
    const {offerCards, cities, activeCity, onCityClick} = this.props;
    if (!this.state.currentCard) {
      return <Main
        activeCity = {activeCity}
        cities = {cities}
        offersCount = {offerCards.length}
        offerCards = {offerCards}
        onHeaderCardClick = {this.handleHeaderCardClick}
        onCityClick = {onCityClick}
      />;
    } else {
      return this._renderAbout(this.state.currentCard);
    }
  }

  _renderAbout(idCard) {
    const {offerCards, activeCity} = this.props;
    const offerCard = offerCards.find((item) => item.id === idCard);
    return <AboutOffer
      activeCity = {activeCity}
      offerCard = {offerCard}
    />;
  }

  handleHeaderCardClick(idCurrentCard) {
    this.setState({currentCard: idCurrentCard});
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMain()}
          </Route>
          <Route exact path="/offer">
          </Route>
        </Switch>
      </BrowserRouter>);
  }
}

App.propTypes = {
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
    activeCity: state.city,
    offerCards: state.offers
  }
);

const mapDispatchToProps = (dispatch) => ({
  onCityClick(activeCity) {
    dispatch(ActionCreator.changeSort(SortType.DEFAULT));
    dispatch(ActionCreator.changeCity(activeCity));
    dispatch(ActionCreator.getOfferList(activeCity));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
