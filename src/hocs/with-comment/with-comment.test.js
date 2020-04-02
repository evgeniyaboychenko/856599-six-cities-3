import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withComment from './with-comment.js';


configure({
  adapter: new Adapter()
});

const mockEvent = {
  preventDefault() {}
};

const MockComponent = () => <div />;
const MockComponentWrapped = withComment(MockComponent);

it(`Should submit comment-form`, () => {
  const onSubmit = jest.fn();
  const wrapper = shallow(<MockComponentWrapped
    idCard = {1}
    onSubmit = {onSubmit}
    handleChangeRating={() => {}}
  />);

  wrapper.simulate(`submit`, mockEvent);
  expect(onSubmit).toHaveBeenCalledTimes(1);
});
