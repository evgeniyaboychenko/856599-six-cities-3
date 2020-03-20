import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.STATE;

export const getActiveSortItem = (state) => {
  return state[NAME_SPACE].activeSortItem;
};

export const getIdActiveCard = (state) => {
  return state[NAME_SPACE].idActiveCard;
};
