const CardType = {
  NEAR: `near-places`,
  CITY: `cities`,
  FAVORITES: `favorites`
};

const SortType = {
  DEFAULT: `Popular`,
  LOW_TO_HIGH: `Price: low to high`,
  HIGH_TO_LOW: `Price: high to low`,
  TOP_RATED_FIRST: `Top rated first`
};

const AppRoute = {
  SIGN_IN: `/login`,
  FAVORITES: `/favorites`,
  ROOM: `/offer/:id`,
  MAIN: `/`,
};

const ResponseErrorCode = {
  UNAUTHORIZED: 401,
  INVALID_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_IS_NOT_AVAILABLE: 500
};

const WidthStarBlock = {
  ABOUT_OFFER: 147,
  COMMENT: 98,
  OFFER_CARD: 73,
};

const COUNT_STARS = 5;

export {CardType, SortType, AppRoute, ResponseErrorCode, WidthStarBlock, COUNT_STARS};
