import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {OfferCard} from './offer-card.jsx';
import {CardType} from '../../const.js';

const CITIES = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];

const offerCard =
{
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
        onCardMouseover = {onCardMouseover}
        cardType = {CardType.CITY}
      />
  );
  const currentCard = card.find(`.place-card`);
  currentCard.simulate(`mouseover`, mockEvent);
  expect(onCardMouseover.mock.calls[0][0]).toBe(offerCard.id);
});

