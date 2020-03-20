import {extend} from '../../utils/utils.js';
// import {generateOfferCards, cities, offers} from '../../mocks/offers.js';
import {adaptOffers, adaptCity} from '../../utils/adapter.js';
// const getOffers = (cityId) => {
//   return offers.filter((offer) => offer.cityId === cityId);
// };

// const offersNearby = generateOfferCards(3);

// const initialState = {
//   city: cities[0],
//   offers, // getOffers(cities[0].id),
//   offersNear: offersNearby
// };


const initialState = {
  cities: [],
  city: {
    name: ``,
    coordinatesCity: [],
    zoom: 0
  },
  offers: [],
  offersNear: []
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  // GET_OFFER_LIST: `GET_OFFER_LIST`,
  LOAD_OFFER_LIST: `LOAD_OFFER_LIST`,
};

const ActionCreator = {
  changeCity: (activeCity) => ({
    type: ActionType.CHANGE_CITY,
    payload: activeCity,
  }),
  loadOfferList: (offers) => ({
    type: ActionType.LOAD_OFFER_LIST,
    payload: offers
  }),
  // getOfferList: (activeCity) => ({
  //   type: ActionType.GET_OFFER_LIST,
  //   payload: activeCity
  // }),
};

const Operation = {
  loadOfferList: () => (dispatch, setState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOfferList(response.data));
      });
  },
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        city: action.payload
      });

    case ActionType.LOAD_OFFER_LIST:
      return extend(state, {
        offers: adaptOffers(action.payload), // getOffers(action.payload.id),
        cities: adaptCity(adaptOffers(action.payload)),
        city: adaptCity(adaptOffers(action.payload))[0],
      });
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
