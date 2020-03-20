import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {reducer, ActionCreator, ActionType, Operation} from './data.js';

const api = createAPI(() => {});
const CITIES = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
const COORDINATES_CITY = [[48.856663, 2.351556], [50.930779, 6.938399], [50.854283, 4.352131], [52.373057, 4.892557], [53.552645, 9.966287], [51.230569, 6.787428]];

const cities = [
  {
    name: CITIES[0],
    coordinatesCity: COORDINATES_CITY[0],
    zoom: 10,
  },
  {
    name: CITIES[1],
    coordinatesCity: COORDINATES_CITY[1],
    zoom: 10,
  }
];

const offerCards = [
  {
    id: 1,
    cityLocation: {
      coordinates: [48.856663, 2.351556], zoom: 10
    },
    cityName: `Paris`,
    name: `Beautiful & luxurious studio at great location`,
    rating: 3,
    price: 100,
    type: `apartment`,
    isPremium: false,
    isFavorite: false,
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
    id: 2,
    cityLocation: {
      coordinates: [50.930779, 6.938399], zoom: 10
    },
    cityName: `Cologne`,
    name: `Beautiful & luxurious studio at great location`,
    rating: 3,
    price: 100,
    type: `apartment`,
    isPremium: false,
    isFavorite: false,
    descriptions:
     `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
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

const loadeOfferCards = [
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 48.856663,
        longitude: 2.351556,
        zoom: 10
      },
      name: CITIES[0]
    },
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    goods: [`Heating`, `Kitchen`],
    host: {
      avatar_url: `img/1.png`,
      id: 3,
      is_pro: true,
      name: `Angelina`
    },
    id: 1,
    images: [`img/1.png`, `img/2.png`],
    is_favorite: false,
    is_premium: false,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    max_adults: 4,
    preview_image: `img/1.png`,
    price: 100,
    rating: 3,
    title: `Beautiful & luxurious studio at great location`,
    type: `apartment`
  },
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 50.930779,
        longitude: 6.938399,
        zoom: 10
      },
      name: CITIES[1]
    },
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    goods: [`Heating`, `Kitchen`],
    host: {
      avatar_url: `img/1.png`,
      id: 3,
      is_pro: true,
      name: `Angelina`
    },
    id: 2,
    images: [`img/1.png`, `img/2.png`],
    is_favorite: false,
    is_premium: false,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    max_adults: 4,
    preview_image: `img/1.png`,
    price: 100,
    rating: 3,
    title: `Beautiful & luxurious studio at great location`,
    type: `apartment`
  },
];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    cities: [],
    city: {},
    offers: [],
    offersNear: []
  });
});

it(`Reducer should change city`, () => {
  expect(reducer({
    cities,
    city: cities[0],
    offers: offerCards,
    offersNear: [],
  }, {
    type: ActionType.CHANGE_CITY,
    payload: cities[1],
  })).toEqual({
    cities,
    city: cities[1],
    offers: offerCards,
    offersNear: [],
  });
});

it(`Reducer should load offer list for current city`, () => {
  expect(reducer({
    cities: [],
    city: {},
    offers: [],
    offersNear: [],
  }, {
    type: ActionType.LOAD_OFFER_LIST,
    payload: loadeOfferCards,
  })).toEqual({
    cities,
    city: cities[0],
    offers: offerCards,
    offersNear: [],
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for change city returns correct action`, () => {
    expect(ActionCreator.changeCity(cities[1])).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: cities[1],
    });
  });
  it(`Action creator for load offer list returns correct action`, () => {
    expect(ActionCreator.loadOfferList(offerCards)).toEqual({
      type: ActionType.LOAD_OFFER_LIST,
      payload: offerCards
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /hotels`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.loadOfferList();

    apiMock
      .onGet(`/hotels`)
      .reply(200, [{fake: true}]);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFER_LIST,
          payload: [{fake: true}],
        }
        );
      });
  });
});
