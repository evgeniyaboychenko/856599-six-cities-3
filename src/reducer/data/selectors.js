import {createSelector} from "reselect";
import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.DATA;

export const getIsData = (state) => {
  return state[NAME_SPACE].isData;
};

export const getActiveCity = (state) => {
  return state[NAME_SPACE].city;
};

export const getCities = (state) => {
  return state[NAME_SPACE].cities;
};

export const getOffers = (state) => {
  return state[NAME_SPACE].offers;
};

export const getOffersNear = (state) => {
  return state[NAME_SPACE].offersNear;
};

export const getOffersFavorites = (state) => {
  return state[NAME_SPACE].offersFavorite;
};

export const getStatusFavorite = (state) => {
  return state[NAME_SPACE].isFavorite;
};

export const getOffersByCityName = createSelector(getOffers, getActiveCity,
    (offers, activeCity) => {
      return offers.filter((offer) => offer.cityName === activeCity.name);
    }
);
