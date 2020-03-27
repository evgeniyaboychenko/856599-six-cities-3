import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.COMMENT;

export const getUserComment = (state) => {
  return state[NAME_SPACE].userComment;
};

export const getComments = (state) => {
  return state[NAME_SPACE].comments;
};

// export const getComment = (state) => {
//   return state[NAME_SPACE].comment;
// };

// export const getIsError = (state) => {
//   return state[NAME_SPACE].isErrorSubmitForm;
// };

export const getIsSubmitForm = (state) => {
  return state[NAME_SPACE].isSubmitForm;
};
export const getErrorForm = (state) => {
  return state[NAME_SPACE].errorForm;
};
