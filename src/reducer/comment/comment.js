import {extend} from '../../utils/utils.js';
import {adaptComments} from '../../utils/adapter.js';
import {ServerCode} from '../../const.js';

const initialState = {
  // isErrorSubmitForm: false,
  isSubmitForm: false,
  errorForm: ServerCode.SUCCESS,
  comments: [],
};

const ActionType = {
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  POST_COMMENT: `POST_COMMENT`,
  SET_IS_ERROR: `SET_IS_ERROR`,
  SET_SUCCESS_FORM_SUBMISSION: `SET_SUCCESS_FORM_SUBMISSION`,
  SET_FAIL_FORM_SUBMISSION: `SET_FAIL_FORM_SUBMISSION`,
  SET_IS_FORM_SUBMIT: `SET_IS_FORM_SUBMIT`,
};

const ActionCreator = {
  loadComments: (comments) => ({
    type: ActionType.LOAD_COMMENTS,
    payload: comments
  }),
  // postComment: (comments) => ({
  //   type: ActionType.POST_COMMENT,
  //   payload: comments
  // }),
  setIsError: (error) => ({
    type: ActionType.SET_IS_ERROR,
    payload: error
  }),
  setIsFormSubmit: () => ({
    type: ActionType.SET_IS_FORM_SUBMIT,
    payload: true
  }),
  setSuccessFormSubmission: (error) => ({
    type: ActionType.SET_SUCCESS_FORM_SUBMISSION,
    payload: {isSubmitForm: false, error}
  }),
  setFailFormSubmission: (error) => ({
    type: ActionType.SET_FAIL_FORM_SUBMISSION,
    payload: {isSubmitForm: false, error}
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_COMMENTS:
      return extend(state, {
        comments: adaptComments(action.payload),
      });
    // case ActionType.POST_COMMENT:
    //   return extend(state, {
    //     comments: adaptComments(action.payload)
    //   });
    case ActionType.SET_IS_ERROR:
      return extend(state, {
        errorForm: action.payload
      });
    case ActionType.SET_SUCCESS_FORM_SUBMISSION:
      return extend(state, {
        isSubmitForm: action.payload.isSubmitForm,
        errorForm: action.payload.error
      });
    case ActionType.SET_FAIL_FORM_SUBMISSION:
      return extend(state, {
        isSubmitForm: action.payload.isSubmitForm,
        errorForm: action.payload.error
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
        dispatch(ActionCreator.setSuccessFormSubmission(response.status));
        dispatch(ActionCreator.loadComments(response.data));
        // dispatch(ActionCreator.setSuccessFormSubmission(response.status));
      })
    .catch((err) => {
      const {response} = err;
      dispatch(ActionCreator.setFailFormSubmission(response.status));
      throw err;
    });
  },
};

export {reducer, ActionCreator, ActionType, Operation};
