import React from 'react';
import renderer from 'react-test-renderer';
import {SortList} from './sort-list.jsx';

const SortType = {
  DEFAULT: `Popular`,
  LOW_TO_HIGH: `Price: low to high`,
  HIGH_TO_LOW: `Price: high to low`,
  TOP_RATED_FIRST: `Top rated first`
};

it(`should SortList render correctly`, () => {
  const tree = renderer.create(
      <SortList
        activeSortItem = {SortType.DEFAULT}
        onSortClick = {() => {}}
      />).toJSON();
  expect(tree).toMatchSnapshot();
});
