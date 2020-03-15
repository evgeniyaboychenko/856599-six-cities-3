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

export {CardType, SortType, AppRoute};
