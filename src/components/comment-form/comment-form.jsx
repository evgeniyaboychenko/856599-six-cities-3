import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/comment/comment.js';
import {Operation as CommentOperation} from '../../reducer/comment/comment.js';

const CommentLength = {
  MAX: 300,
  MIN: 50
};

class CommentForm extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleReviewChange = this.handleReviewChange.bind(this);

    this.state = {
      isFormValid: false,
      review: ``,
      rating: ``,
    };
  }

  handleRatingChange(evt) {
    const {name, value} = evt.target;
    this.setState({[name]: value});
    const formData = {
      rating: ``,
    };
    formData[name] = value;

    if (formData.rating && this.state.review.length >= CommentLength.MIN && this.state.review.length <= CommentLength.MAX) {
      this.setState(()=>({isFormValid: true}));
    } else {
      this.setState(()=>({isFormValid: false}));
    }
  }

  handleReviewChange(evt) {
    const {name, value} = evt.target;
    this.setState({[name]: value});
    const formData = {
      review: ``,
    };
    formData[name] = value;
    if ((formData.review.length >= CommentLength.MIN && formData.review.length <= CommentLength.MAX) && this.state.rating) {
      this.setState(()=>({isFormValid: true}));
    } else {
      this.setState(()=>({isFormValid: false}));
    }
  }

  handleSubmit(evt) {
    const {idCard, onSubmit} = this.props;
    evt.preventDefault();
    onSubmit({
      comment: this.state.review,
      rating: Number(this.state.rating),
    }, idCard).then(
        () => this.setState({rating: ``, review: ``, isFormValid: false}),
        () => {});
  }

  render() {
    const {isSubmitForm, onSubmitDisableButton} = this.props;
    return (
      <form className="reviews__form form" action="#" method="post"
        onSubmit={(evt) => {
          onSubmitDisableButton();
          this.handleSubmit(evt);
        }}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"
            onChange = {this.handleRatingChange}
            checked= {this.state.rating === `5`}/>
          <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"
            onChange = {this.handleRatingChange}
            checked= {this.state.rating === `4`}/>
          <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"
            onChange = {this.handleRatingChange}
            checked= {this.state.rating === `3`}/>
          <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"
            onChange = {this.handleRatingChange}
            checked= {this.state.rating === `2`}/>
          <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"
            onChange = {this.handleRatingChange}
            checked= {this.state.rating === `1`}/>
          <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>
        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name="review"
          value = {this.state.review}
          placeholder="Tell how was your stay, what you like and what can be improved"
          minLength="5"
          onChange = {this.handleReviewChange}></textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit"
            disabled={!this.state.isFormValid || isSubmitForm}>Submit</button>
        </div>
      </form>);
  }
}

CommentForm.propTypes = {
  onSubmitDisableButton: PropTypes.func.isRequired,
  isSubmitForm: PropTypes.bool.isRequired,
  idCard: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};


const mapDispatchToProps = (dispatch) => ({
  onSubmitDisableButton() {
    dispatch(ActionCreator.setIsFormSubmit(true));
  },
  onSubmit(comment, idHotel) {
    return dispatch(CommentOperation.submitComment(comment, idHotel));
  },
});

export {CommentForm};
export default connect(null, mapDispatchToProps)(CommentForm);
