import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {OfferCard} from './offer-card.jsx';
import {CardType} from '../../const.js';

const OFFER_IMAGES = [`room.jpg`, `apartment-01.jpg`];
const OFFER_NAMES = [`Canal View Prinsengracht`, `Nice, cozy, warm big bed apartment`];
const OFFER_TYPES = [`apartment`, `privet room`];

const offerCard =
{
  id: `889`,
  photos: OFFER_IMAGES,
  name: OFFER_NAMES[0],
  rating: 2,
  price: 100,
  type: OFFER_TYPES[0],
  isPremium: true,
};

const mockEvent = {
  preventDefault() {}
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`onMouseover on heading should get key in handler`, () => {
  const onCardMouseover = jest.fn();
  const card = shallow(
      <OfferCard
        offerCard = {offerCard}
        // onHeaderCardClick = {() => {}}
        onCardMouseover = {onCardMouseover}
        cardType = {CardType.CITY}
      />
  );
  const currentCard = card.find(`.place-card`);
  currentCard.simulate(`mouseover`, mockEvent);
  expect(onCardMouseover.mock.calls[0][0]).toBe(offerCard.id);
});

// it(`click on heading should get key in handler`, ()=> {
//   const onHeaderCardClick = jest.fn();
//   const card = shallow(
//       <OfferCard
//         offerCard = {offerCard}
//         onHeaderCardClick = {onHeaderCardClick}
//         onCardMouseover = {() => {}}
//         cardType = {CardType.CITY}
//       />
//   );

//   const currentCard = card.find(`.place-card__name a`);
//   currentCard.simulate(`click`, mockEvent);

//   expect(onHeaderCardClick.mock.calls[0][0]).toBe(offerCard.id);
// });

// it(`Should ad heading be pressed`, () => {
//   const onHeaderCardClick = jest.fn();
//   const main = shallow(
//       <OfferCard
//         offerCard = {offerCard}
//         onHeaderCardClick = {onHeaderCardClick}
//         onCardMouseover = {() => {}}
//         cardType = {CardType.CITY}
//       />
//   );

//   const headerCard = main.find(`.place-card__name a`);
//   headerCard.simulate(`click`, mockEvent);
//   expect(onHeaderCardClick.mock.calls.length).toBe(1);
// });
