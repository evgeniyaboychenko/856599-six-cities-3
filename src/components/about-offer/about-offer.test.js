import React from 'react';
import renderer from 'react-test-renderer';
import AboutOffer from './about-offer.jsx';
jest.mock(`../map/map.jsx`);
jest.mock(`../comment-list/comment-list.jsx`);
jest.mock(`../offer-list/offer-list.jsx`);

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

const offerCard =
{
  id: `1`,
  commentsId: [`1`, `2`],
  photos: OFFER_IMAGES,
  name: OFFER_NAMES[0],
  rating: 2,
  price: 100,
  type: OFFER_TYPES[0],
  isPremium: true,

  descriptions: [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam`],
  countRooms: 2,
  maxGuests: 2,
  appliances: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`],
  owner: {
    avatar: `avatar-angelina.jpg`,
    name: `Angelina`,
    isSuper: true,
  },
};

it(`should AboutOffer render correctly`, () => {
  const tree = renderer.create(
      <AboutOffer
        offerCard = {offerCard}
        activeCity = {activeCity}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
