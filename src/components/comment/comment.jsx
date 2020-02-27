import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


const getPercent = (rating) => {
  return rating * 100 / 5;
};

const getDate = (date) => {
  return moment(date).format(`MMMM YYYY`);
};

const Comment = ({comment}) => {
  const {id, name, avatar, rating, text, date} = comment;
  return (
    <li className="reviews__item" key = {id}>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={`img/` + avatar} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: getPercent(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {text}
        </p>
        <time className="reviews__time" dateTime={getDate(date)}>{getDate(date)}</time>
      </div>
    </li>);
};

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
  }).isRequired,
};

export default Comment;
