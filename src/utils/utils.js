import {COUNT_STARS} from '../const.js';

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getPercent = (rating, widthBlock) => {
  return rating * widthBlock / COUNT_STARS;
};
