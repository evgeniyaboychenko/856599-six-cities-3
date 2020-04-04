import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {MemoryRouter} from "react-router-dom";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus} from '../../reducer/user/user.js';

const mockStore = configureStore([]);
jest.mock(`../map/map.jsx`);
jest.mock(`../offer-list/offer-list.jsx`);

const DESCRIPTIONS = [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`, `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`];
const AVATARS = [`avatar-angelina.jpg`, `avatar-max.jpg`];
const NAMES = [`Angelina`, `Max`, `Kate`, `Pol`, `Mike`];
const CITIES = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
const COORDINATES_CITY = [[48.856663, 2.351556], [50.930779, 6.938399], [50.854283, 4.352131], [52.373057, 4.892557], [53.552645, 9.966287], [51.230569, 6.787428]];

const activeCity = {
  id: 1,
  name: CITIES[0],
  coordinatesCity: COORDINATES_CITY[0],
  zoom: 10
};

const offerCards = [
  {
    id: 2,
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
  },
  {
    id: 3,
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
  },
  {
    id: 4,
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
  }
];

const user = {
  id: 1,
  name: `Nike`,
  avatar: `nike.jpg`,
  email: `nike@n.ru`,
  isPro: false,
};
const authorizationStatus = AuthorizationStatus.AUTH;
const comments =
[{
  id: 1,
  avatar: AVATARS[0],
  name: NAMES[0],
  rating: 2,
  text: DESCRIPTIONS[0],
  date: `2020-03-29T18:07:19.382Z`,
  idUser: 1,
  isPro: false,
},
{
  id: 2,
  avatar: AVATARS[1],
  name: NAMES[1],
  rating: 2,
  text: DESCRIPTIONS[1],
  date: `2020-03-29T18:07:19.382Z`,
  idUser: 1,
  isPro: false,
}];
const activeSortItem = `Popular`;

const cities = [{
  name: CITIES[0],
  coordinatesCity: COORDINATES_CITY[0],
  zoom: 10
},
{
  name: CITIES[1],
  coordinatesCity: COORDINATES_CITY[1],
  zoom: 10
},
{
  name: CITIES[2],
  coordinatesCity: COORDINATES_CITY[2],
  zoom: 10
}
];

it(`should Main render correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      cities,
      city: activeCity,
    },
    [NameSpace.STATE]: {
      activeSortItem: `Popular`,
    },
    [NameSpace.USER]: {
      user,
      authorizationStatus: AuthorizationStatus.AUTH,
      error: `error`
    },
    [NameSpace.COMMENT]: {
      isSubmitForm: false,
      comments
    }
  });
  const tree = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Main
            idCurrentCard = {1}
            isData = {true}
            offerCards = {offerCards}
            activeCity = {activeCity}
            cities = {cities}
            authorizationStatus = {authorizationStatus}
            user = {user}
            activeSortItem = {activeSortItem}
          />
        </MemoryRouter>
      </Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`should Main render correctly if offers-count equal null`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      offers: offerCards,
      cities,
      city: activeCity,
    },
    [NameSpace.STATE]: {
      activeSortItem: `Popular`,
    }
  });
  const tree = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Main
            idCurrentCard = {1}
            isData = {true}
            offerCards = {[]}
            activeCity = {activeCity}
            cities = {cities}
            authorizationStatus = {authorizationStatus}
            user = {user}
            activeSortItem = {activeSortItem}
          />
        </MemoryRouter>
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
