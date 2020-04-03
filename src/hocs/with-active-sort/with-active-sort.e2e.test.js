import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withActiveSortList from './with-active-sort.js';

configure({
  adapter: new Adapter()
});

const MockComponent = () => <div />;

const MockComponentWrapped = withActiveSortList(MockComponent);

it(`Should component state change `, () => {
  const wrapper = shallow(<MockComponentWrapped/>);
  expect(wrapper.props().isActive).toBe(false);
  wrapper.props().onSortListClick();
  expect(wrapper.props().isActive).toBe(true);
});
