import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';
const mockStore = configureStore([]);

jest.mock(`../map/map.jsx`);
jest.mock(`../offer-list/offer-list.jsx`);

const OFFER_IMAGES = [`room.jpg`, `apartment-01.jpg`];
const OFFER_NAMES = [`Canal View Prinsengracht`, `Nice, cozy, warm big bed apartment`];
const OFFER_TYPES = [`apartment`, `privet room`];

const CITIES = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
const COORDINATES_CITY = [[48.856663, 2.351556], [50.930779, 6.938399], [50.854283, 4.352131], [52.373057, 4.892557], [53.552645, 9.966287], [51.230569, 6.787428]];

const activeCity = {
  name: CITIES[0],
  coordinatesCity: COORDINATES_CITY[0],
  zoom: 10
};

const cities = [{
  name: CITIES[0],
  coordinatesCity: COORDINATES_CITY[0],
  zoom: 10
},
{
  name: CITIES[1],
  coordinatesCity: COORDINATES_CITY[1],
  zoom: 10
},
{
  name: CITIES[2],
  coordinatesCity: COORDINATES_CITY[2],
  zoom: 10
}
];

const offerCards = [
  {
    id: 1,
    cityLocation: {
      coordinates: [48.856663, 2.351556], zoom: 10
    },
    cityName: CITIES[0],
    name: `Beautiful & luxurious studio at great location`,
    rating: 3,
    price: 100,
    type: `apartment`,
    isPremium: false,
    isFavorite: true,
    descriptions: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    photos: [`img/1.png`, `img/2.png`],
    previewImage: `img/1.png`,
    countRooms: 3,
    maxGuests: 4,
    appliances: [`Heating`, `Kitchen`],
    coordinates: [52.35514938496378, 4.673877537499948],
    zoom: 8,
    owner: {
      avatar: `img/1.png`, id: 3, name: `Angelina`, isSuper: true
    }
  },
  {
    id: 2,
    cityLocation: {
      coordinates: [48.856663, 2.351556], zoom: 10
    },
    cityName: CITIES[0],
    name: `Beautiful & luxurious studio at great location`,
    rating: 3,
    price: 100,
    type: `apartment`,
    isPremium: false,
    isFavorite: true,
    descriptions:
    `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    photos: [`img/1.png`, `img/2.png`],
    previewImage: `img/1.png`,
    countRooms: 3,
    maxGuests: 4,
    appliances: [`Heating`, `Kitchen`],
    coordinates: [52.35514938496378, 4.673877537499948],
    zoom: 8,
    owner: {
      avatar: `img/1.png`, id: 3, name: `Angelina`, isSuper: true
    }
  }
];

const offersNear = [
  {
    id: 11,
    photos: OFFER_IMAGES,
    name: OFFER_NAMES[0],
    rating: 2,
    price: 100,
    type: OFFER_TYPES[0],
    isPremium: true,
  },
  {
    id: 22,
    photos: OFFER_IMAGES,
    name: OFFER_NAMES[1],
    rating: 3,
    price: 120,
    type: OFFER_TYPES[1],
    isPremium: false,
  },
  {
    id: 23,
    photos: OFFER_IMAGES,
    name: OFFER_NAMES[1],
    rating: 3,
    price: 120,
    type: OFFER_TYPES[1],
    isPremium: false,
  }
];
const activeSortItem = `Popular`;
const user = {
  id: 1,
  name: `Nike`,
  avatar: `nike.jpg`,
  email: `nike@n.ru`,
  isPro: false,
};
const error = ``;
const authorizationStatus = AuthorizationStatus.AUTH;
const isData = true;
const offersFavorite = [
  {
    city: {
      name: CITIES[0],
      coordinatesCity: COORDINATES_CITY[0],
      zoom: 10,
    },
    offersFavoriteByCity: [{
      id: 1,
      cityLocation: {
        coordinates: [48.856663, 2.351556], zoom: 10
      },
      cityName: CITIES[0],
      name: `Beautiful & luxurious studio at great location`,
      rating: 3,
      price: 100,
      type: `apartment`,
      isPremium: false,
      isFavorite: true,
      descriptions: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      photos: [`img/1.png`, `img/2.png`],
      previewImage: `img/1.png`,
      countRooms: 3,
      maxGuests: 4,
      appliances: [`Heating`, `Kitchen`],
      coordinates: [52.35514938496378, 4.673877537499948],
      zoom: 8,
      owner: {
        avatar: `img/1.png`, id: 3, name: `Angelina`, isSuper: true
      }
    },
    {
      id: 2,
      cityLocation: {
        coordinates: [48.856663, 2.351556], zoom: 10
      },
      cityName: CITIES[0],
      name: `Beautiful & luxurious studio at great location`,
      rating: 3,
      price: 100,
      type: `apartment`,
      isPremium: false,
      isFavorite: true,
      descriptions:
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      photos: [`img/1.png`, `img/2.png`],
      previewImage: `img/1.png`,
      countRooms: 3,
      maxGuests: 4,
      appliances: [`Heating`, `Kitchen`],
      coordinates: [52.35514938496378, 4.673877537499948],
      zoom: 8,
      owner: {
        avatar: `img/1.png`, id: 3, name: `Angelina`, isSuper: true
      }
    }
    ]
  }
];

it(`should App render correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      isData: false,
      city: activeCity,
      offers: offerCards,
      cities,
      offersNear,
      offersFavorite: offerCards},
    [NameSpace.STATE]: {
      activeSortItem: `Popular`,
    },
    [NameSpace.USER]: {
      user,
      authorizationStatus: AuthorizationStatus.AUTH,
      error: {error}
    }
  });
  const tree = renderer.create(
      <Provider store={store}>
        <App
          idCurrentCard = {1}
          isData = {isData}
          activeCity = {activeCity}
          cities = {cities}
          offerCards = {offerCards}
          activeSortItem = {activeSortItem}
          authorizationStatus = {authorizationStatus}
          user = {user}
          error = {error}
          offersFavorite = {offersFavorite}
          onLoadOffersNear = {() => {}}
          onSubmitLogin = {() => {}}
          onLoadFavorites = {() => {}}
          onLoadComments = {() => {}}
          onLoadOffesList = {() => {}}
          onCheckAuth = {() => {}}
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
