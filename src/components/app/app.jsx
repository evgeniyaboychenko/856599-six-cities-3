import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import AboutOffer from '../about-offer/about-offer.jsx';
import {AppRoute} from '../../const.js';
import {connect} from 'react-redux';

class App extends PureComponent {
  constructor(props) {
    super(props);
    // this.state = {currentCard: null};
    // this.handleHeaderCardClick = this.handleHeaderCardClick.bind(this);
  }


  _renderMain() {
    const {offerCards, cities, activeCity} = this.props;
    //  if (!this.state.currentCard) {
    return <Main
      activeCity = {activeCity}
      cities = {cities}
      offersCount = {offerCards.length}
    //   onHeaderCardClick = {this.handleHeaderCardClick}
    />;
    //  }
    // return;
    // else {
    //   return this._renderAbout(this.state.currentCard);
    // }
  }

  _renderAbout(idCard) {
    const {offerCards, activeCity} = this.props;
    const offerCard = offerCards.find((item) => item.id === idCard);
    return <AboutOffer
      activeCity = {activeCity}
      offerCard = {offerCard}
    />;
  }

  // handleHeaderCardClick(idCurrentCard) {
  //   this.setState({currentCard: idCurrentCard});
  // }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMain()}
          </Route>
          <Route exact path={AppRoute.ROOM}
            render = {(props) => {
              const {offerCards, activeCity} = this.props;
              const offerCard = offerCards.find((item) => item.id === props.match.params.id);
              return <AboutOffer
                activeCity = {activeCity}
                offerCard = {offerCard}
              />;
            }}/>
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
};

const mapStateToProps = (state) => (
  {
    activeCity: state.city,
    offerCards: state.offers
  }
);

export {App};
export default connect(mapStateToProps)(App);
