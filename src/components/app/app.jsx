import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import AboutOffer from '../about-offer/about-offer.jsx';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {currentCard: null};
    this.handleHeaderCardClick = this.handleHeaderCardClick.bind(this);
  }

  _renderMain() {
    const {offersCount, offerCards} = this.props;
    if (!this.state.currentCard) {
      return <Main
        offersCount = {offersCount}
        offerCards = {offerCards}
        handleHeaderCardClick = {this.handleHeaderCardClick}
      />;
    } else {
      return this._renderAbout(this.state.currentCard);
    }
  }

  _renderAbout(idCard) {
    const {offerCards} = this.props;
    const offerCard = offerCards.find((item) => item.id === idCard);
    return <AboutOffer
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
            // тут рендер компонента
          </Route>
        </Switch>
      </BrowserRouter>);
  }
}

App.propTypes = {
  offersCount: PropTypes.number.isRequired,
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
};

export default App;
