import {reducer, ActionCreator, ActionType} from './state.js';

const SortType = {
  DEFAULT: `Popular`,
  LOW_TO_HIGH: `Price: low to high`,
  HIGH_TO_LOW: `Price: high to low`,
  TOP_RATED_FIRST: `Top rated first`
};

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
    price: 200,
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

const state = {
  cities,
  city: cities[0],
  offers: offerCards,
  activeSortItem: `Popular`,
  idActiveCard: -1,
};
it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    activeSortItem: `Popular`,
    idActiveCard: -1,
  });
});


it(`Reducer should change current card`, () => {
  expect(reducer(state, {
    type: ActionType.CHANGE_CURRENT_CARD,
    payload: 1,
  })).toEqual({
    cities,
    city: cities[0],
    offers: offerCards,
    activeSortItem: SortType.DEFAULT,
    idActiveCard: 1
  });
});

it(`Reducer should change sort offer list`, () => {
  expect(reducer(state, {
    type: ActionType.CHANGE_SORT,
    payload: SortType.LOW_TO_HIGH,
  })).toEqual({
    cities,
    city: cities[0],
    offers: offerCards,
    activeSortItem: SortType.LOW_TO_HIGH,
    idActiveCard: -1
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for change current card returns correct action`, () => {
    expect(ActionCreator.changeCurrenCard(1)).toEqual({
      type: ActionType.CHANGE_CURRENT_CARD,
      payload: 1
    });
  });
  it(`Action creator for change sort returns correct action`, () => {
    expect(ActionCreator.changeSort(SortType.LOW_TO_HIGH)).toEqual({
      type: ActionType.CHANGE_SORT,
      payload: SortType.LOW_TO_HIGH
    });
  });
});
