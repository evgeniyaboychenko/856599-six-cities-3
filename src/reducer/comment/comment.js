import {extend} from '../../utils/utils.js';
import {adaptComments} from '../../utils/adapter.js';
import {ActionCreator as ActionCreatorError} from "../user/user.js";

const initialState = {
  isSubmitForm: false,
  comments: [],
};

const ActionType = {
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  SET_IS_FORM_SUBMIT: `SET_IS_FORM_SUBMIT`,
};

const ActionCreator = {
  loadComments: (comments) => ({
    type: ActionType.LOAD_COMMENTS,
    payload: comments
  }),
  setIsFormSubmit: (status) => ({
    type: ActionType.SET_IS_FORM_SUBMIT,
    payload: status
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_COMMENTS:
      return extend(state, {
        comments: adaptComments(action.payload),
      });
    case ActionType.SET_IS_FORM_SUBMIT:
      return extend(state, {
        isSubmitForm: action.payload
      });
  }
  return state;
};


const Operation = {
  loadComments: (idHotel) => (dispatch, setState, api) => {
    return api.get(`/comments/` + idHotel)
      .then((response) => {
        dispatch(ActionCreator.loadComments(response.data));
      });
  },

  submitComment: (comment, idHotel) => (dispatch, getState, api) => {
    return api.post(`/comments/` + idHotel, {
      comment: comment.comment,
      rating: comment.rating,
    })
      .then((response) => {
        dispatch(ActionCreator.setIsFormSubmit(false));
        dispatch(ActionCreator.loadComments(response.data));
        dispatch(ActionCreatorError.setLoadingError(``));
      })
    .catch((err) => {
      dispatch(ActionCreator.setIsFormSubmit(false));
      throw err;
    });
  },
};

export {reducer, ActionCreator, ActionType, Operation};
