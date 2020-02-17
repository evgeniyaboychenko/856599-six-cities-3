import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OfferCard from './offer-card.jsx';

const OFFER_IMAGES = [`room.jpg`, `apartment-01.jpg`];
const OFFER_NAMES = [`Canal View Prinsengracht`, `Nice, cozy, warm big bed apartment`];
const OFFER_TYPES = [`apartment`, `privet room`];

const offerCard =
{
  id: `889`,
  img: OFFER_IMAGES[0],
  name: OFFER_NAMES[0],
  rating: 2,
  price: 100,
  type: OFFER_TYPES[0],
  isPremium: true,
};

const mockEvent = {
  preventDefault() {}
};
// const offersNames = [`Beautiful apartment`, `Amazing place`];

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should card onMouseover get information`, () => {
  const handleCardMouseover = jest.fn();
  const card = shallow(
      <OfferCard
        offerCard = {offerCard}
        handleCardMouseover = {handleCardMouseover}
        // headerCardClickHandler = {headerCardClickHandler}
      />
  );


  const currentCard = card.find(`.place-card`);
  currentCard.simulate(`mouseover`, mockEvent);
  expect(handleCardMouseover.mock.calls[0][0]).toBe(offerCard.id);
});
