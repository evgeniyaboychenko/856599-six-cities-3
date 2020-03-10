import React from 'react';
import {SortList} from './sort-list.jsx';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new Adapter(),
});

const SortType = {
  DEFAULT: `Popular`,
  LOW_TO_HIGH: `Price: low to high`,
  HIGH_TO_LOW: `Price: high to low`,
  TOP_RATED_FIRST: `Top rated first`
};

it(`should SortList render correctly`, () => {
  const onSortClick = jest.fn();
  const card = shallow(
      <SortList
        activeSortItem = {SortType.LOW_TO_HIGH}
        onSortClick = {onSortClick}
      />
  );

  const currentSortItem = card.find(`.places__option--active`);
  currentSortItem.simulate(`click`);
  expect(onSortClick.mock.calls[0][0]).toBe(SortType.LOW_TO_HIGH);
});

it(`should sorting be pressed`, () => {
  const onSortClick = jest.fn();
  const card = shallow(
      <SortList
        activeSortItem = {SortType.DEFAULT}
        onSortClick = {onSortClick}
      />
  );

  const currentSortItem = card.find(`.places__option--active`);
  currentSortItem.simulate(`click`);
  expect(onSortClick.mock.calls.length).toBe(1);
});
