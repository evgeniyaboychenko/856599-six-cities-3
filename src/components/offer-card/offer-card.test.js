import React from 'react';
import renderer from 'react-test-renderer';
import {OfferCard} from './offer-card.jsx';
import {CardType} from '../../const.js';
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space.js";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
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

describe(`OfferCard component render correctly`, () => {
  it(`should OfferCard render correctly`, () => {
    const store = mockStore({
      [NameSpace.STATE]: {
        idActiveCard: 1,
      }
    });
    const tree = renderer.create(
        <Provider store={store}>
          <MemoryRouter>
            <OfferCard
              offerCard = {offerCard}
              onCardMouseover = {() => {}}
              cardType = {CardType.CITY}
            />
          </MemoryRouter>
        </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

