import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const CommentLength = {
  MAX: 300,
  MIN: 50
};

const withComment = (Component) => {
  class WithComment extends PureComponent {
    constructor(props) {
      super(props);
      this._handleSubmit = this._handleSubmit.bind(this);
      this._handleRatingChange = this._handleRatingChange.bind(this);
      this._handleReviewChange = this._handleReviewChange.bind(this);

      this.state = {
        isFormValid: false,
        review: ``,
        rating: ``,
      };
    }

    _handleRatingChange(evt) {
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

    _handleReviewChange(evt) {
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

    _handleSubmit(evt) {
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
      return <Component
        {...this.props}
        onSubmitForm = {this._handleSubmit}
        onRatingChange = {this._handleRatingChange}
        onReviewChange = {this._handleReviewChange}
        isFormValid = {this.state.isFormValid}
        rating = {this.state.rating}
        review = {this.state.review}
      />;
    }
  }

  WithComment.propTypes = {
    idCard: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };
  return WithComment;
};

export default withComment;
