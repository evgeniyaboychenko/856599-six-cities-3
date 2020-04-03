import React from 'react';
import renderer from 'react-test-renderer';
import CommentForm from './comment-form.jsx';

it(`should CommentForm render correctly`, () => {
  const tree = renderer.create(
      <CommentForm
        onSubmitForm = {()=>{}}
        onSubmitDisableButton = {()=>{}}
        isSubmitForm = {false}
        onRatingChange = {()=>{}}
        onReviewChange = {()=>{}}
        rating = {`4`}
        review = {`the best`}
        isFormValid = {true}
      />).toJSON();
  expect(tree).toMatchSnapshot();
});
