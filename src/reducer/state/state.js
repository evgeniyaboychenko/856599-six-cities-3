import {extend} from '../../utils/utils.js';

const initialState = {
  activeSortItem: `Popular`,
  idActiveCard: `-1`,
};

const ActionType = {
  CHANGE_CURRENT_CARD: `CHANGE_CURRENT_CARD`,
  CHANGE_SORT: `CHANGE_SORT`
};

const ActionCreator = {
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
