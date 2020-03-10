import React from 'react';
import renderer from 'react-test-renderer';
import {OfferList} from './offer-list.jsx';
import {CardType} from '../../const.js';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

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
  }
];

const offersNear = [
  {
    id: `11`,
    photos: OFFER_IMAGES,
    name: OFFER_NAMES[0],
    rating: 2,
    price: 100,
    type: OFFER_TYPES[0],
    isPremium: true,
  },
  {
    id: `22`,
    photos: OFFER_IMAGES,
    name: OFFER_NAMES[1],
    rating: 3,
    price: 120,
    type: OFFER_TYPES[1],
    isPremium: false,
  },
  {
    id: `23`,
    photos: OFFER_IMAGES,
    name: OFFER_NAMES[1],
    rating: 3,
    price: 120,
    type: OFFER_TYPES[1],
    isPremium: false,
  }
];


describe(`OfferList component render correctly`, () => {
  it(`should OfferList render correctly for offer cities`, () => {
    const store = mockStore({
      offers: offerCards,
      activeSortItem: `Popular`,
      offersNear: []
    });

    const tree = renderer.create(
        <Provider store={store}>
          <OfferList
            offerCards = {offerCards}
            onHeaderCardClick = {() => {}}
            cardType = {CardType.CITY}
            activeSortItem = {`Popular`}
            offersNear = {offersNear}
          />
        </Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should OfferList render correctly for offer near`, () => {
    const store = mockStore({
      offers: offerCards,
      activeSortItem: `Popular`,
      offersNear
    });
    const tree = renderer.create(
        <Provider store={store}>
          <OfferList
            offerCards = {offerCards}
            onHeaderCardClick = {() => {}}
            cardType = {CardType.NEAR}
            activeSortItem = {`Popular`}
            offersNear = {offersNear}
          />
        </Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
