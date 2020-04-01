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

const offerCardsWithFavorite = [
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

const serverOfferCards = [
  {
    'bedrooms': 3,
    'city': {
      'location': {
        'latitude': 48.856663,
        'longitude': 2.351556,
        'zoom': 10
      },
      'name': CITIES[0]
    },
    'description': `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    'goods': [`Heating`, `Kitchen`],
    'host': {
      'avatar_url': `img/1.png`,
      'id': 3,
      'is_pro': true,
      'name': `Angelina`
    },
    'id': 1,
    'images': [`img/1.png`, `img/2.png`],
    'is_favorite': false,
    'is_premium': false,
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8
    },
    'max_adults': 4,
    'preview_image': `img/1.png`,
    'price': 100,
    'rating': 3,
    'title': `Beautiful & luxurious studio at great location`,
    'type': `apartment`
  },
  {
    'bedrooms': 3,
    'city': {
      'location': {
        'latitude': 50.930779,
        'longitude': 6.938399,
        'zoom': 10
      },
      'name': CITIES[1]
    },
    'description': `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    'goods': [`Heating`, `Kitchen`],
    'host': {
      'avatar_url': `img/1.png`,
      'id': 3,
      'is_pro': true,
      'name': `Angelina`
    },
    'id': 2,
    'images': [`img/1.png`, `img/2.png`],
    'is_favorite': false,
    'is_premium': false,
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8
    },
    'max_adults': 4,
    'preview_image': `img/1.png`,
    'price': 100,
    'rating': 3,
    'title': `Beautiful & luxurious studio at great location`,
    'type': `apartment`
  },
];

const serverOffersFavorite = [
  {
    'bedrooms': 3,
    'city': {
      'location': {
        'latitude': 48.856663,
        'longitude': 2.351556,
        'zoom': 10
      },
      'name': CITIES[0]
    },
    'description': `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    'goods': [`Heating`, `Kitchen`],
    'host': {
      'avatar_url': `img/1.png`,
      'id': 3,
      'is_pro': true,
      'name': `Angelina`
    },
    'id': 1,
    'images': [`img/1.png`, `img/2.png`],
    'is_favorite': true,
    'is_premium': false,
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8
    },
    'max_adults': 4,
    'preview_image': `img/1.png`,
    'price': 100,
    'rating': 3,
    'title': `Beautiful & luxurious studio at great location`,
    'type': `apartment`
  },
  {
    'bedrooms': 3,
    'city': {
      'location': {
        'latitude': 48.856663,
        'longitude': 2.351556,
        'zoom': 10
      },
      'name': CITIES[0]
    },
    'description': `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    'goods': [`Heating`, `Kitchen`],
    'host': {
      'avatar_url': `img/1.png`,
      'id': 3,
      'is_pro': true,
      'name': `Angelina`
    },
    'id': 2,
    'images': [`img/1.png`, `img/2.png`],
    'is_favorite': true,
    'is_premium': false,
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8
    },
    'max_adults': 4,
    'preview_image': `img/1.png`,
    'price': 100,
    'rating': 3,
    'title': `Beautiful & luxurious studio at great location`,
    'type': `apartment`
  },
];

const offersFavorite = [
  {
    city: {
      name: CITIES[0],
      coordinatesCity: COORDINATES_CITY[0],
      zoom: 10,
    },
    offersFavoriteByCity: [{
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
    },
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
    ]
  }
];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    isData: false,
    cities: [],
    city: {
      name: ``,
      coordinatesCity: [],
      zoom: 0
    },
    offers: [],
    offersNear: [],
    isFavorite: false,
    offersFavorite: [],
  });
});

it(`Reducer should change city`, () => {
  expect(reducer({
    isData: false,
    cities,
    city: cities[0],
    offers: offerCards,
    offersNear: [],
  }, {
    type: ActionType.CHANGE_CITY,
    payload: cities[1],
  })).toEqual({
    isData: false,
    cities,
    city: cities[1],
    offers: offerCards,
    offersNear: [],
  });
});

it(`Reducer should load offer list for current city`, () => {
  expect(reducer({
    isData: false,
    cities: [],
    city: {},
    offers: [],
    offersNear: [],
    isFavorite: false,
    offersFavorite: [],
  }, {
    type: ActionType.LOAD_OFFER_LIST,
    payload: serverOfferCards,
  })).toEqual({
    isData: false,
    cities,
    city: cities[0],
    offers: offerCards,
    offersNear: [],
    isFavorite: false,
    offersFavorite: [],
  });
});

it(`Reducer should load offers near for current city`, () => {
  expect(reducer({
    isData: false,
    cities: [],
    city: {},
    offers: [],
    offersNear: [],
    isFavorite: false,
    offersFavorite: [],
  }, {
    type: ActionType.LOAD_OFFERS_NEAR,
    payload: serverOfferCards,
  })).toEqual({
    isData: false,
    cities: [],
    city: {},
    offers: [],
    offersNear: offerCards,
    isFavorite: false,
    offersFavorite: [],
  });
});

it(`Reducer should load offers favorite for current city`, () => {
  expect(reducer({
    isData: false,
    cities: [],
    city: {},
    offers: [],
    offersNear: [],
    isFavorite: false,
    offersFavorite: [],
  }, {
    type: ActionType.LOAD_OFFERS_FAVORITE,
    payload: serverOffersFavorite,
  })).toEqual({
    isData: false,
    cities: [],
    city: {},
    offers: [],
    offersNear: [],
    isFavorite: false,
    offersFavorite,
  });
});

it(`Reducer should change status favorite for current city`, () => {
  expect(reducer({
    isData: false,
    cities: [],
    city: {},
    offers: offerCards,
    offersNear: [],
    isFavorite: false,
    offersFavorite: [],
  }, {
    type: ActionType.CHANGE_STATUS_FAVORITE,
    payload: {idHotel: 1, status: true}
  })).toEqual({
    isData: false,
    cities: [],
    city: {},
    offers: offerCardsWithFavorite,
    offersNear: [],
    isFavorite: false,
    offersFavorite: [],
  });
});

it(`Reducer should change download status`, () => {
  expect(reducer({
    isData: false,
    cities: [],
    city: {},
    offers: offerCards,
    offersNear: [],
    isFavorite: false,
    offersFavorite: [],
  }, {
    type: ActionType.CHANGE_DOWNLOAD_STATUS,
    payload: true
  })).toEqual({
    isData: true,
    cities: [],
    city: {},
    offers: offerCards,
    offersNear: [],
    isFavorite: false,
    offersFavorite: [],
  });
});

it(`Reducer should reset ofers near`, () => {
  expect(reducer({
    isData: false,
    cities: [],
    city: {},
    offers: [],
    offersNear: offerCards,
    isFavorite: false,
    offersFavorite: [],
  }, {
    type: ActionType.RESET_OFFERS_NEAR,
    payload: []
  })).toEqual({
    isData: false,
    cities: [],
    city: {},
    offers: [],
    offersNear: [],
    isFavorite: false,
    offersFavorite: [],
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
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFER_LIST,
          payload: [{fake: true}],
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_DOWNLOAD_STATUS,
          payload: true,
        });
      });
  });

  it(`Should make a correct API call to /hotels nearby`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const idHotel = 1;
    const offersLoader = Operation.loadOffersNear(idHotel);

    apiMock
      .onGet(`/hotels/` + idHotel + `/nearby`)
      .reply(200, [{fake: true}]);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS_NEAR,
          payload: [{fake: true}],
        });
      });
  });
  it(`Should make a correct API call to /favorite`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.getOffersFavorite();

    apiMock
      .onGet(`/favorite`)
      .reply(200, [{fake: true}]);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS_FAVORITE,
          payload: [{fake: true}],
        });
      });
  });
  it(`Should make a correct API call to /favorite/:idHotel/:status for post`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const idHotel = 1;
    const status = 0;
    const offersLoader = Operation.changeStatusFavoriteHotel(idHotel, status);

    apiMock
      .onPost(`/favorite/` + idHotel + `/` + status, {
        'hotel_id': idHotel,
        'status': status,
      })
      .reply(200, serverOfferCards[0]);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_STATUS_FAVORITE,
          payload: {idHotel: serverOfferCards[0].id, status: serverOfferCards[0].is_favorite}
        });
      });
  });

});
