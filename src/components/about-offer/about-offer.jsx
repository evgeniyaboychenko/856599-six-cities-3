import React from 'react';
import PropTypes from 'prop-types';
import CommentList from '../comment-list/comment-list.jsx';
import Map from '../map/map.jsx';
import {generateComments} from '../../mocks/comments.js';
import OfferList from '../offer-list/offer-list.jsx';
import {CardType} from '../../const.js';
import {generateId} from '../../utils/utils.js';

const getGallery = (photos) => {
  return photos.map((photo) => (<div className="property__image-wrapper" key = {generateId()}>
    <img className="property__image" src={`/img/` + photo} alt="Photo studio"/>
  </div>));
};

const getPercent = (rating) => {
  return rating * 100 / 5;
};

const getInsideList = (appliances) => {
  return appliances.map((appliance) => (
    <li className="property__inside-item" key = {generateId()}>
      {appliance}
    </li>)
  );
};

const getDescription = (descriptions) => {
  return descriptions.map((description) => (
    <p className="property__text" key = {generateId()}>
      {description}
    </p>)
  );
};

const AboutOffer = (props) => {
  const {offerCard} = props;
  const comments = generateComments();
  comments.forEach((comment) => {
    offerCard.commentsId = comment.id;
  });
  const {name, rating, price, type, isPremium, descriptions, photos, countRooms, maxGuests, appliances, owner} = offerCard;
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {getGallery(photos)}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium ?
                <div className="property__mark">
                  <span>Premium</span>
                </div> : ``}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {name}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"/>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: getPercent(rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">4.8</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {countRooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxGuests} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {getInsideList(appliances)}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={owner.isSuper ? `property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper` : `property__avatar-wrapper user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={`/img/` + owner.avatar} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {owner.name}
                  </span>
                </div>
                <div className="property__description">
                  {getDescription(descriptions)}
                </div>
              </div>
              <CommentList
                comments = {comments}
              />
            </div>
          </div>
          <section className="property__map map">
            <Map
              cardType = {CardType.NEAR}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <OfferList
                cardType = {CardType.NEAR}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

AboutOffer.propTypes = {
  offerCard: PropTypes.shape({
    id: PropTypes.string.isRequired,
    commentsId: PropTypes.arrayOf(PropTypes.string),
    photos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    countRooms: PropTypes.number.isRequired,
    maxGuests: PropTypes.number.isRequired,
    appliances: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    descriptions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    owner: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isSuper: PropTypes.bool.isRequired,
    }),
  }).isRequired,
};

export default AboutOffer;

