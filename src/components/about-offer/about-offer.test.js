import React from 'react';
import renderer from 'react-test-renderer';
import AboutOffer from './about-offer.jsx';

const OFFER_IMAGES = [`room.jpg`, `apartment-01.jpg`];
const OFFER_NAMES = [`Canal View Prinsengracht`, `Nice, cozy, warm big bed apartment`];
const OFFER_TYPES = [`apartment`, `privet room`];

const offerCard =
{
  id: `1`,
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
      />).toJSON();

  expect(tree).toMatchSnapshot();
});
