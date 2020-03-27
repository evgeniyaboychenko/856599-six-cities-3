import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../comment/comment.jsx';
import CommentForm from '../comment-form/comment-form.jsx';
import {AuthorizationStatus} from "../../reducer/user/user.js";

const CommentList = ({idCard, comments, authorizationStatus, isSubmitForm, errorForm}) => {
  comments.reverse();
  const sortingComments = comments.slice(0, 10);
  return (<section className="property__reviews reviews">
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
    <ul className="reviews__list">
      {sortingComments.map((comment) => {
        const {id} = comment;
        return <Comment
          comment = {comment}
          key = {id}
        />;
      })}
    </ul>
    {authorizationStatus === AuthorizationStatus.AUTH &&
      <CommentForm
        isSubmitForm = {isSubmitForm}
        errorForm = {errorForm}
        // isErrorSubmitForm = {isErrorSubmitForm}
        idCard = {idCard}/>
    }
  </section>);
};

CommentList.propTypes = {
  isSubmitForm: PropTypes.bool.isRequired,
  errorForm: PropTypes.number.isRequired,
  idCard: PropTypes.number.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        idUser: PropTypes.number.isRequired,
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        isPro: PropTypes.bool.isRequired,
      }).isRequired
  ).isRequired,
};

export default React.memo(CommentList);
