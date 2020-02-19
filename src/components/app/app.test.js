import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const OFFER_IMAGES = [`room.jpg`, `apartment-01.jpg`];
const OFFER_NAMES = [`Canal View Prinsengracht`, `Nice, cozy, warm big bed apartment`];
const OFFER_TYPES = [`apartment`, `privet room`];

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
  const tree = renderer.create(
      <App
        offersCount = {6}
        offerCards = {offerCards}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
