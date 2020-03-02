import {extend} from './utils/utils.js';
import {cities, offers} from './mocks/offers.js';

const getOffers = (cityId) => {
  return offers.filter((offer) => offer.cityId === cityId);
};

const initialState = {
  city: cities[0],
  offers: getOffers(cities[0].id),
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFER_LIST: `GET_OFFER_LIST`,
};

const ActionCreator = {
  changeCity: (activeCity) => ({
    type: ActionType.CHANGE_CITY,
    payload: activeCity,
  }),
  getOfferList: (activeCity) => ({
    type: ActionType.GET_OFFER_LIST,
    payload: getOffers(activeCity.id)
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        city: action.payload
      });

    case ActionType.GET_OFFER_LIST:
      return extend(state, {
        offers: action.payload
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
