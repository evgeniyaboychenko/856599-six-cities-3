import {extend} from '../../utils/utils.js';
import {adaptOffers, adaptCity} from '../../utils/adapter.js';

const initialState = {
  isData: false,
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
  LOAD_OFFERS_NEAR: `LOAD_OFFERS_NEAR`,
  CHANGE_DOWNLOAD_STATUS: `CHANGE_DOWNLOAD_STATUS`,
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
  loadOffersNear: (offers) => ({
    type: ActionType.LOAD_OFFERS_NEAR,
    payload: offers
  }),
  changeDownloadStatus: (status) => ({
    type: ActionType.CHANGE_DOWNLOAD_STATUS,
    payload: status
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
        dispatch(ActionCreator.changeDownloadStatus(true));
      });
  },
  loadOffersNear: (idHotel) => (dispatch, setState, api) => {
    return api.get(`/hotels/` + idHotel + `/nearby`)
      .then((response) => {
        dispatch(ActionCreator.loadOffersNear(response.data));
        // dispatch(ActionCreator.changeDownloadStatus(true));
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

    case ActionType.LOAD_OFFERS_NEAR:
      return extend(state, {
        offersNear: adaptOffers(action.payload), // getOffers(action.payload.id),
      });

    case ActionType.CHANGE_DOWNLOAD_STATUS:
      return extend(state, {
        isData: action.payload
      });
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
