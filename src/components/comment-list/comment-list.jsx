import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../comment/comment.jsx';
import CommentForm from '../comment-form/comment-form.jsx';
import withComment from '../../hocs/with-comment/with-comment.js';
import {AuthorizationStatus} from "../../reducer/user/user.js";
import moment from 'moment';
const CommentUserWrapperd = withComment(CommentForm);

const CommentList = ({onSubmit, onSubmitDisableButton, idCard, comments, authorizationStatus, isSubmitForm, errorForm}) => {
  const sortingComments = comments.slice().sort((a, b) => {
    return moment(b.date).valueOf() - moment(a.date).valueOf();
  });
  const sortingCommentsShort = sortingComments.slice(0, 10);
  return (<section className="property__reviews reviews">
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
    <ul className="reviews__list">
      {sortingCommentsShort.map((comment) => {
        const {id} = comment;
        return <Comment
          comment = {comment}
          key = {id}
        />;
      })}
    </ul>
    {authorizationStatus === AuthorizationStatus.AUTH &&
    <CommentUserWrapperd
      onSubmitDisableButton = {onSubmitDisableButton}
      onSubmit = {onSubmit}
      isSubmitForm = {isSubmitForm}
      errorForm = {errorForm}
      idCard = {idCard}/>
    }
  </section>);
};

CommentList.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSubmitDisableButton: PropTypes.func.isRequired,
  isSubmitForm: PropTypes.bool.isRequired,
  errorForm: PropTypes.string.isRequired,
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
