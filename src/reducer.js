import {extend} from './utils/utils.js';
import {cities, offers} from './mocks/offers.js';

const getOffers = (cityId) => {
  return offers.filter((offer) => offer.cityId === cityId);
};

const initialState = {
  city: cities[0],
  offers: getOffers(cities[0].id),
  activeSortItem: `Popular`,
  idActiveCard: `-1`
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFER_LIST: `GET_OFFER_LIST`,
  CHANGE_CURRENT_CARD: `CHANGE_CURRENT_CARD`,
  CHANGE_SORT: `CHANGE_SORT`
};

const ActionCreator = {
  changeCity: (activeCity) => ({
    type: ActionType.CHANGE_CITY,
    payload: activeCity,
  }),
  getOfferList: (activeCity) => ({
    type: ActionType.GET_OFFER_LIST,
    payload: activeCity
  }),
  changeCurrenCard: (idActiveCard) => ({
    type: ActionType.CHANGE_CURRENT_CARD,
    payload: idActiveCard
  }),
  changeSort: (sortType) => ({
    type: ActionType.CHANGE_SORT,
    payload: sortType
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        city: action.payload
      });

    case ActionType.GET_OFFER_LIST:
      return extend(state, {
        offers: getOffers(action.payload.id),
      });

    case ActionType.CHANGE_CURRENT_CARD:
      return extend(state, {
        idActiveCard: action.payload
      });

    case ActionType.CHANGE_SORT:
      return extend(state, {
        activeSortItem: action.payload
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
