import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.COMMENT;

export const getComments = (state) => {
  return state[NAME_SPACE].comments;
};

export const getIsSubmitForm = (state) => {
  return state[NAME_SPACE].isSubmitForm;
};
