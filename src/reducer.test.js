import {reducer, ActionCreator, ActionType} from "./reducer.js";

const OFFER_IMAGES = [`room.jpg`, `apartment-01.jpg`];
const OFFER_NAMES = [`Canal View Prinsengracht`, `Nice, cozy, warm big bed apartment`];
const OFFER_TYPES = [`apartment`, `privet room`];

const CITIES = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
const COORDINATES_CITY = [[48.856663, 2.351556], [50.930779, 6.938399], [50.854283, 4.352131], [52.373057, 4.892557], [53.552645, 9.966287], [51.230569, 6.787428]];

const initialState = {
  city: {
    id: `1`,
    name: `Paris`,
    coordinatesCity: [48.856663, 2.351556],
  },
  offers: [
    {
      id: `1`,
      cityId: `1`,
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
      coordinates: [48.856663, 2.351556],
      owner: {
        avatar: `avatar-angelina.jpg`,
        name: `Angelina`,
        isSuper: false,
      }
    }
  ]
};

const cities = [{
  id: `1`,
  name: CITIES[0],
  coordinatesCity: COORDINATES_CITY[0],
},
{
  id: `2`,
  name: CITIES[1],
  coordinatesCity: COORDINATES_CITY[1],
},
{
  id: `3`,
  name: CITIES[2],
  coordinatesCity: COORDINATES_CITY[2],
}
];

const offers = [
  {
    id: `1`,
    cityId: `1`,
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
    coordinates: [48.856663, 2.351556],
    owner: {
      avatar: `avatar-angelina.jpg`,
      name: `Angelina`,
      isSuper: false,
    },
  },
  {
    id: `2`,
    cityId: `2`,
    photos: OFFER_IMAGES,
    name: OFFER_NAMES[1],
    rating: 3,
    price: 120,
    type: OFFER_TYPES[1],
    isPremium: false,

    descriptions: [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam`],
    countRooms: 2,
    maxGuests: 2,
    appliances: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`],
    coordinates: [48.856663, 2.351556],
    owner: {
      avatar: `avatar-angelina.jpg`,
      name: `Angelina`,
      isSuper: true,
    },
  },
  {
    id: `3`,
    cityId: `2`,
    photos: OFFER_IMAGES,
    name: OFFER_NAMES[1],
    rating: 2,
    price: 220,
    type: OFFER_TYPES[1],
    isPremium: false,

    descriptions: [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam`],
    countRooms: 6,
    maxGuests: 6,
    appliances: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`],
    coordinates: [48.856663, 2.351556],
    owner: {
      avatar: `avatar-angelina.jpg`,
      name: `Angelina`,
      isSuper: true,
    },
  }];

const getOffers = (cityId) => {
  return offers.filter((offer) => offer.cityId === cityId);
};


it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(initialState, {})).toEqual({
    city: cities[0],
    offers: getOffers(cities[0].id),
  });
});

it(`Reducer should change city`, () => {
  expect(reducer({
    city: cities[0],
    offers: getOffers(cities[0].id),
  }, {
    type: ActionType.CHANGE_CITY,
    payload: cities[1],
  })).toEqual({
    city: cities[1],
    offers: getOffers(cities[0].id),
  });
});

it(`Reducer should get offer list for current city`, () => {
  expect(reducer({
    city: cities[0],
    offers: getOffers(cities[0].id),
  }, {
    type: ActionType.GET_OFFER_LIST,
    payload: getOffers(cities[1].id),
  })).toEqual({
    city: cities[0],
    offers: getOffers(cities[1].id),
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for change city returns correct action`, () => {
    expect(ActionCreator.changeCity(cities[1])).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: cities[1],
    });
  });
  it(`Action creator for get offer list returns correct action`, () => {
    expect(ActionCreator.getOfferList(cities[2])).toEqual({
      type: ActionType.GET_OFFER_LIST,
      payload: getOffers(cities[2].id),
    });
  });
});
