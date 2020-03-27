import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import MessageError from '../message-error/message-error.jsx';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/comment/comment.js';

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

    if (formData.rating && this.state.review.length >= 50 && this.state.review.length <= 300) {
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
    if ((formData.review.length >= 50 && formData.review.length <= 300) && this.state.rating) {
      this.setState(()=>({isFormValid: true}));
    } else {
      this.setState(()=>({isFormValid: false}));
    }
  }

  handleSubmit(evt) {
    const {idCard, onSubmitFormComment,} = this.props;
    evt.preventDefault();
    const result = onSubmitFormComment({
      comment: this.state.review,
      rating: Number(this.state.rating),
    }, idCard);
    result.then(() => this.setState({rating: ``, review: ``}));
  }


  render() {
    const {isSubmitForm, errorForm, disableButton, comment} = this.props;
    return (
      <form className="reviews__form form" action="#" method="post"
        onSubmit={(evt) => {
          disableButton();
          this.handleSubmit(evt);
        }
          }>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"
            onChange = {this.handleRatingChange}
             checked= {this.state.rating === "5"}
            />
          <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"
            onChange = {this.handleRatingChange}
            checked= {this.state.rating === "4"}
            />
          <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"
            onChange = {this.handleRatingChange}
            checked= {this.state.rating === "3"}
            />
          <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"
            onChange = {this.handleRatingChange}
            checked= {this.state.rating === "2"}
            />
          <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"
            onChange = {this.handleRatingChange}
            checked= {this.state.rating === "1"}
            />
          <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>
        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name="review"
          // value = {errorForm === 200 ? "": this.state.review}
          placeholder="Tell how was your stay, what you like and what can be improved"
          minLength="5"
          onChange = {this.handleReviewChange}></textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit"
            disabled={!this.state.isFormValid || isSubmitForm}>Submit</button>
          {/* <MessageError
            error = {errorForm}
          /> */}
        </div>
      </form>);
  }
}

CommentForm.propTypes = {
  isErrorSubmitForm: PropTypes.bool.isRequired,
  idCard: PropTypes.number.isRequired,
  onSubmitFormComment: PropTypes.func.isRequired,
};


const mapDispatchToProps = (dispatch) => ({
  disableButton() {
    dispatch(ActionCreator.setIsFormSubmit());
  }
});

export {CommentForm};
export default connect(null, mapDispatchToProps)(CommentForm);
// export default CommentForm;
