import React from 'react';
import renderer from 'react-test-renderer';
import Favorites from './favorites.jsx';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const CITIES = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
const COORDINATES_CITY = [[48.856663, 2.351556], [50.930779, 6.938399], [50.854283, 4.352131], [52.373057, 4.892557], [53.552645, 9.966287], [51.230569, 6.787428]];

jest.mock(`../offer-list/offer-list.jsx`);

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

const offersFavoriteEmpty = [];
const user = {
  id: 1,
  name: `Nike`,
  avatar: `nike.jpg`,
  email: `nike@n.ru`,
  isPro: false,
};

it(`should Favorites render correctly`, () => {
  const store = mockStore({
  });
  const tree = renderer.create(
      <Provider store={store}>
        <Favorites
          offersFavorite = {offersFavorite}
          user = {user}
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`should FavoritesEmpty render correctly`, () => {
  const store = mockStore({
  });
  const tree = renderer.create(
      <Provider store={store}>
        <Favorites
          offersFavorite = {offersFavoriteEmpty}
          user = {user}
        />
      </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
