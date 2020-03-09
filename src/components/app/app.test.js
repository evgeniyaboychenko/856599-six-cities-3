import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
jest.mock(`../map/map.jsx`);

const OFFER_IMAGES = [`room.jpg`, `apartment-01.jpg`];
const OFFER_NAMES = [`Canal View Prinsengracht`, `Nice, cozy, warm big bed apartment`];
const OFFER_TYPES = [`apartment`, `privet room`];

const CITIES = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
const COORDINATES_CITY = [[48.856663, 2.351556], [50.930779, 6.938399], [50.854283, 4.352131], [52.373057, 4.892557], [53.552645, 9.966287], [51.230569, 6.787428]];

const activeCity = {
  id: `1`,
  name: CITIES[0],
  coordinatesCity: COORDINATES_CITY[0],
};

const cities = [{
  id: `1`,
  name: CITIES[0],
  coordinatesCity: COORDINATES_CITY[0],
},
{
  id: `2`,
  name: CITIES[1],
  coordinatesCity: COORDINATES_CITY[1],
},
{
  id: `3`,
  name: CITIES[2],
  coordinatesCity: COORDINATES_CITY[2],
}
];

const offerCards = [
  {
    id: `1`,
    photos: OFFER_IMAGES,
    name: OFFER_NAMES[0],
    rating: 2,
    price: 100,
    type: OFFER_TYPES[0],
    isPremium: true,
  },
  {
    id: `2`,
    photos: OFFER_IMAGES,
    name: OFFER_NAMES[1],
    rating: 3,
    price: 120,
    type: OFFER_TYPES[1],
    isPremium: false,
  }];

it(`should App render correctly`, () => {
  const store = mockStore({
    // city: {
    //   id: `1`,
    //   name: CITIES[0],
    //   coordinatesCity: COORDINATES_CITY[0]
    // },
    offers: offerCards,
    activeSortItem: `Popular`
  });

  const tree = renderer.create(
      <Provider store={store}>
        <App
          activeCity = {activeCity}
          cities = {cities}
          offersCount = {offerCards.length}
          offerCards = {offerCards}
          onHeaderCardClick = {() => {}}
          onCityClick = {() => {}}
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
