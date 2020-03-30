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
  offersNear: [],
  isFavorite: false,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  LOAD_OFFER_LIST: `LOAD_OFFER_LIST`,
  LOAD_OFFERS_NEAR: `LOAD_OFFERS_NEAR`,
  CHANGE_DOWNLOAD_STATUS: `CHANGE_DOWNLOAD_STATUS`,
  CHANGE_STATUS_FAVORITE: `CHANGE_STATUS_FAVORITE`,
  GET_STATUS_FAVORITE: `GET_STATUS_FAVORITE`,
  RESET_OFFERS_NEAR: `RESET_OFFERS_NEAR`
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
  changeStatusFavorite: (idHotel, status) => ({
    type: ActionType.CHANGE_STATUS_FAVORITE,
    payload: {idHotel, status}
  }),
  getStatusFavorite: (offers) => ({
    type: ActionType.GET_STATUS_FAVORITE,
    payload: offers
  }),
  resertOffersNear: () => ({
    type: ActionType.LOAD_OFFERS_NEAR,
    payload: []
  }),
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
      });
  },
  getStatusFavorite: () => (dispatch, setState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadOfferList(response.data));
      });
  },
  changeStatusFavoriteHotel: (idHotel, status) => (dispatch, setState, api) => {
    return api.post(`/favorite/` + idHotel + `/` + status, {
      'hotel_id': idHotel,
      'status': status,
    })
      .then((response) => {
        dispatch(ActionCreator.changeStatusFavorite(response.data.id, response.data.is_favorite));
      })
      .catch((err) => {
        throw err;
      });
  },
};

const getUpdateOffers = (offers, idCard, isFavorite) => {
  let o = offers.slice();
  const index = offers.findIndex((offer) => offer.id === idCard);
  let offer = extend(offers[index], {isFavorite});
  o.splice(index, 1, offer);
  return o;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        city: action.payload
      });

    case ActionType.LOAD_OFFER_LIST:
      return extend(state, {
        offers: adaptOffers(action.payload),
        cities: adaptCity(adaptOffers(action.payload)),
        city: adaptCity(adaptOffers(action.payload))[0],
      });

    case ActionType.LOAD_OFFERS_NEAR:
      return extend(state, {
        offersNear: adaptOffers(action.payload),
      });

    case ActionType.CHANGE_DOWNLOAD_STATUS:
      return extend(state, {
        isData: action.payload
      });

    case ActionType.CHANGE_STATUS_FAVORITE:
      return extend(state, {
        offers: getUpdateOffers(state.offers, action.payload.idHotel, action.payload.status),
      });

    case ActionType.GET_STATUS_FAVORITE:
      return extend(state, {
        offers: adaptOffers(action.payload),
      });

    case ActionType.RESET_OFFERS_NEAR:
      return extend(state, {
        offersNear: action.payload
      });
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
