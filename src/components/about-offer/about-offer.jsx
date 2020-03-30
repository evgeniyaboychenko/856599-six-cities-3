import React from 'react';
import PropTypes from 'prop-types';
import CommentList from '../comment-list/comment-list.jsx';
import Map from '../map/map.jsx';
import OfferList from '../offer-list/offer-list.jsx';
import {CardType} from '../../const.js';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getAuthorizationStatus, getUserData, getError} from "../../reducer/user/selector.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {getComments, getIsSubmitForm, getErrorForm} from '../../reducer/comment/selector.js';
import {getOffersNear} from '../../reducer/data/selectors.js';
import FavoriteToggle from '../favorite-toggle/favorite-toggle.jsx';

const getGallery = (photos) => {
  return photos.map((photo, i) => (<div className="property__image-wrapper" key = {i + photo}>
    <img className="property__image" src={photo} alt="Photo studio"/>
  </div>));
};

const getPercent = (rating) => {
  return rating * 100 / 5;
};

const getInsideList = (appliances) => {
  return appliances.map((appliance, i) => (
    <li className="property__inside-item" key = {i + appliance}>
      {appliance}
    </li>)
  );
};

const AboutOffer = (props) => {
  const {comments, authorizationStatus, user, offerCard, offersNear, isSubmitForm, errorForm} = props;
  const {name, rating, price, type, id, isFavorite, isPremium, descriptions, photos, countRooms, maxGuests, appliances, owner} = offerCard;
  const {avatar, email} = user;
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
                  {authorizationStatus === AuthorizationStatus.AUTH &&
                  <Link to = {`/favorites`} className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper" style = {{backgroundImage: `url(https://htmlacademy-react-3.appspot.com/six-cities${avatar})`}}>
                    </div>
                    <span className="header__user-name user__name">{email}</span>
                  </Link>}
                  {authorizationStatus === AuthorizationStatus.NO_AUTH &&
                  <Link to = {`/login`} className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </Link>
                  }
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
                <FavoriteToggle
                  dataComponent = {{nameClass: `property`, width: `31`, height: `33`}}
                  isFavorite = {isFavorite}
                  idCard = {id}/>
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
                    <img className="property__avatar user__avatar" src={`/` + owner.avatar} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {owner.name}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {descriptions}
                  </p>
                </div>
              </div>
              <CommentList
                isSubmitForm = {isSubmitForm}
                errorForm = {errorForm}
                authorizationStatus = {authorizationStatus}
                comments = {comments}
                idCard = {offerCard.id}
              />
            </div>
          </div>
          {offersNear.length !== 0 &&
          <section className="property__map map">
            <Map
              offersNear = {offersNear}
              cardType = {CardType.NEAR}
            />
          </section>}
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
  isSubmitForm: PropTypes.bool.isRequired,
  errorForm: PropTypes.number.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired,
  }).isRequired,
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
  offerCard: PropTypes.shape({
    isFavorite: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    countRooms: PropTypes.number.isRequired,
    maxGuests: PropTypes.number.isRequired,
    appliances: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    descriptions: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isSuper: PropTypes.bool.isRequired,
    }),
  }).isRequired,
  offersNear: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        photos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        name: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        isPremium: PropTypes.bool.isRequired
      })
  ).isRequired,
};


const mapStateToProps = (state) => (
  {
    isSubmitForm: getIsSubmitForm(state),
    errorForm: getErrorForm(state),
    comments: getComments(state),
    error: getError(state),
    user: getUserData(state),
    authorizationStatus: getAuthorizationStatus(state),
    offersNear: getOffersNear(state),
  }
);

export {AboutOffer};
export default connect(mapStateToProps)(React.memo(AboutOffer));
