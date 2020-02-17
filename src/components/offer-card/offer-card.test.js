import React from 'react';
import renderer from 'react-test-renderer';
import OfferCard from './offer-card.jsx';

const OFFER_IMAGES = [`room.jpg`, `apartment-01.jpg`];
const OFFER_NAMES = [`Canal View Prinsengracht`, `Nice, cozy, warm big bed apartment`];
const OFFER_TYPES = [`apartment`, `privet room`];

const offerCard =
{
  id: `1`,
  img: OFFER_IMAGES[0],
  name: OFFER_NAMES[0],
  rating: 2,
  price: 100,
  type: OFFER_TYPES[0],
  isPremium: true,
};


it(`should OfferCard render correctly`, () => {
  const tree = renderer.create(
      <OfferCard
        offerCard = {offerCard}
      />).toJSON();

  expect(tree).toMatchSnapshot();
});
