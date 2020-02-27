import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

const CITY = [52.38333, 4.9];
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
  }

  componentDidMount() {
    const {offersOnMap, idCurrentCard} = this.props;
    const map = leaflet.map(this.map.current, {
      center: CITY,
      zoom: ZOOM,
      zoomControl: false,
      marker: true
    });

    map.setView(CITY, ZOOM);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    offersOnMap.map((item) => {
      const {coordinates} = item;
      leaflet
      .marker(coordinates, {icon})
      .addTo(map);
    });

    const {coordinates} = offersOnMap.find((offer) => offer.id === idCurrentCard);
    // if (offerCard) {
    // const {coordinates} = offerCard;
    leaflet
      .marker(coordinates, {icon: iconActive})
      .addTo(map);
    // }
  }

  componentWillUnmount() {
    this.map.current = null;
  }

  render() {
    return (
      // <section className="cities__map map">
      <div id="map" style={{height: `100%`}} ref = {this.map}></div>
      // </section>
    );
  }
}

Map.propTypes = {
  offersOnMap: PropTypes.arrayOf(
      PropTypes.shape({
        coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        // id: PropTypes.string.isRequired,
        // photos: PropTypes.arrayOf(PropTypes.string.isRequired),
        // name: PropTypes.string.isRequired,
        // rating: PropTypes.number.isRequired,
        // price: PropTypes.number.isRequired,
        // type: PropTypes.string.isRequired,
        // isPremium: PropTypes.bool.isRequired
      })
  ).isRequired,
  idCurrentCard: PropTypes.string.isRequired,
};
export default Map;
