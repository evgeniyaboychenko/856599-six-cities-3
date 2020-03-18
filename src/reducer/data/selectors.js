import {createSelector} from "reselect";
import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.DATA;

export const getCity = (state) => {
  return state[NAME_SPACE].city;
};

export const getOffers = (state) => {
  return state[NAME_SPACE].offers;
};

export const getOffersNear = (state) => {
  return state[NAME_SPACE].offersNear;
};

export const getOffersByCityName = createSelector(getOffers, getCity,
    (offers, city) => {
      return offers.filter((offer) => offer.cityName === city.name);
    }
);

