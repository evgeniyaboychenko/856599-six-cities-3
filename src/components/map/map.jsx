import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {connect} from 'react-redux';
import {CardType} from '../../const.js';
import {getIdActiveCard} from '../../reducer/state/selector.js';
import {getActiveCity, getOffersByCityName} from '../../reducer/data/selectors.js';

const icon = leaflet.icon({
  iconUrl: `/img/pin.svg`,
  iconSize: [27, 39]
});

const iconActive = leaflet.icon({
  iconUrl: `/img/pin-active.svg`,
  iconSize: [27, 39]
});

class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.map = createRef();
    this.mapCity = null;
    this.markers = [];
  }

  componentDidMount() {
    const {offerCards, idCurrentCard, cardType, activeCity, offersNear} = this.props;
    let offersOnMap = [];
    if (cardType === CardType.CITY) {
      offersOnMap = offerCards;
    } else {
      offersOnMap = offersNear.concat(offerCards.find((offer) => offer.id === idCurrentCard));
    }

    const coordinatesCity = activeCity.coordinatesCity;
    this.mapCity = leaflet.map(this.map.current, {
      center: coordinatesCity,
      zoom: activeCity.zoom,
      zoomControl: false,
      markers: true
    });

    this.mapCity.setView(coordinatesCity, activeCity.zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this.mapCity);

    offersOnMap.map((item) => {
      const {coordinates} = item;
      if (item.id !== idCurrentCard) {
        this.markers.push(leaflet.marker(coordinates, {icon}).addTo(this.mapCity));
      } else {
        this.markers.push(leaflet.marker(coordinates, {icon: iconActive}).addTo(this.mapCity));
      }
    });
  }

  componentWillUnmount() {
    this.map.current = null;
  }

  componentDidUpdate(prevProps) {
    const {offerCards, idCurrentCard, cardType, activeCity, offersNear} = this.props;
    let offersOnMap = [];
    if (cardType === CardType.CITY) {
      offersOnMap = offerCards;
    } else {
      offersOnMap = offersNear.concat(offerCards.find((offer) => offer.id === idCurrentCard));
    }

    if (activeCity.name !== prevProps.activeCity.name || idCurrentCard !== prevProps.idCurrentCard) {
      const coordinatesCity = activeCity.coordinatesCity;
      this.mapCity.setView(coordinatesCity, activeCity.zoom);

      this.markers.map((markers) => this.mapCity.removeLayer(markers));
      this.markers = [];

      if (activeCity.name !== prevProps.activeCity.name) {
        offersOnMap.map((item) => {
          const {coordinates} = item;
          this.markers.push(leaflet.marker(coordinates, {icon}).addTo(this.mapCity));
        });
      } else {
        offersOnMap.map((item) => {
          const {coordinates} = item;
          if (item.id !== idCurrentCard) {
            this.markers.push(leaflet.marker(coordinates, {icon}).addTo(this.mapCity));
          } else {
            this.markers.push(leaflet.marker(coordinates, {icon: iconActive}).addTo(this.mapCity));
          }
        });
      }
    }
  }

  render() {
    return (
      <div id="map" style={{height: `100%`}} ref = {this.map}></div>
    );
  }
}

Map.propTypes = {
  offerCards: PropTypes.arrayOf(
      PropTypes.shape({
        coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
      })
  ).isRequired,
  offersNear: PropTypes.arrayOf(
      PropTypes.shape({
        coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
      })
  ),
  idCurrentCard: PropTypes.number.isRequired,
  activeCity: PropTypes.shape({
    // id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    coordinatesCity: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    zoom: PropTypes.number.isRequired,
  }).isRequired,
  cardType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => (
  {
    activeCity: getActiveCity(state),
    offerCards: getOffersByCityName(state),
    // offersNear: getOffersNear(state),
    idCurrentCard: getIdActiveCard(state)
  }
);

export {Map};
export default connect(mapStateToProps)(Map);
