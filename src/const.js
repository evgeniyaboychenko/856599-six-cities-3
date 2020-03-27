const CardType = {
  NEAR: `near-places`,
  CITY: `cities`
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

const ServerCode = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  INVALID_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_IS_NOT_AVAILABLE: 500
};

export {CardType, SortType, AppRoute, ServerCode};
