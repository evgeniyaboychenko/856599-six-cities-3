import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {connect} from 'react-redux';
import {CardType} from '../../const.js';

const ZOOM = 12;

const icon = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [27, 39]
});

const iconActive = leaflet.icon({
  iconUrl: `img/pin-active.svg`,
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
    const {offerCards, idCurrentCard, cardType, activeCity, offersNearby} = this.props;
    let offersOnMap = [];
    if (cardType === CardType.CITY) {
      offersOnMap = offerCards;
    } else {
      offersOnMap = offersNearby.concat(offerCards.find((offer) => offer.id === idCurrentCard));
    }
    // const offersForMap = offersNearby.concat(offerCard);

    const coordinatesCity = activeCity.coordinatesCity;
    this.mapCity = leaflet.map(this.map.current, {
      center: coordinatesCity,
      zoom: ZOOM,
      zoomControl: false,
      markers: true
    });

    this.mapCity.setView(coordinatesCity, ZOOM);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this.mapCity);

    this.mapCity.setView(coordinatesCity, ZOOM);

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
    const {offerCards, idCurrentCard, cardType, activeCity, offersNearby} = this.props;
    let offersOnMap = [];
    if (cardType === CardType.CITY) {
      offersOnMap = offerCards;
    } else {
      offersOnMap = offersNearby.concat(offerCards.find((offer) => offer.id === idCurrentCard));
    }

    if (activeCity.id !== prevProps.activeCity.id || idCurrentCard !== prevProps.idCurrentCard) {
      const coordinatesCity = activeCity.coordinatesCity;
      this.mapCity.setView(coordinatesCity, ZOOM);

      this.markers.map((markers) => this.mapCity.removeLayer(markers));
      this.markers = [];

      if (activeCity.id !== prevProps.activeCity.id) {
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
  offersNearby: PropTypes.arrayOf(
      PropTypes.shape({
        coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
      })
  ).isRequired,
  idCurrentCard: PropTypes.string.isRequired,
  activeCity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    coordinatesCity: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  }).isRequired,
  cardType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => (
  {
    activeCity: state.city,
    offerCards: state.offers,
    offersNearby: state.offersNear,
    idCurrentCard: state.idActiveCard
  }
);

export {Map};
export default connect(mapStateToProps)(Map);
