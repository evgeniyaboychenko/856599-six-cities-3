import React from 'react';
import renderer from 'react-test-renderer';
import {OfferCard} from './offer-card.jsx';
import {CardType} from '../../const.js';
import {MemoryRouter} from "react-router-dom";

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
};

describe(`OfferCard component render correctly`, () => {
  it(`should OfferCard render correctly for offer cities`, () => {
    const tree = renderer.create(
        <MemoryRouter>
          <OfferCard
            offerCard = {offerCard}
            // onHeaderCardClick = {() => {}}
            onCardMouseover = {() => {}}
            cardType = {CardType.CITY}
          />
        </MemoryRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should OfferCard render correctly for offer near`, () => {
    const tree = renderer.create(
        <MemoryRouter>
          <OfferCard
            offerCard = {offerCard}
            // onHeaderCardClick = {() => {}}
            onCardMouseover = {() => {}}
            cardType = {CardType.NEAR}
          />
        </MemoryRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
