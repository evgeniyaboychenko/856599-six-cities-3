import React from 'react';
import {connect} from 'react-redux';
import {getActiveSortItem} from '../../reducer/state/selector.js';
import {ActionCreator} from '../../reducer/state/state.js';
// '../../reducer/reducer.js';
import PropTypes from 'prop-types';
import {generateId} from '../../utils/utils.js';

const sortItems = [`Popular`, `Price: low to high`, `Price: high to low`, `Top rated first`];

const SortList = ({activeSortItem, onSortClick, onSortListClick, isActive}) => {
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0" onClick = {() => onSortListClick()}>
        {activeSortItem}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use href="#icon-arrow-select"/>
        </svg>
      </span>
      <ul className={isActive ? `places__options places__options--custom places__options--opened` :
        `places__options places__options--custom`}>
        {sortItems.map((item) => {
          return (
            <li className={activeSortItem === item ? `places__option places__option--active` :
              `places__option`} key = {generateId()} tabIndex="0" onClick = {() => {
              onSortListClick();
              onSortClick(item);
            }
            }>{item}</li>
          );
        })
        }
      </ul>
    </form>);
};

SortList.propTypes = {
  activeSortItem: PropTypes.string.isRequired,
  onSortClick: PropTypes.func.isRequired,
  onSortListClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => (
  {
    activeSortItem: getActiveSortItem(state)
  }
);

const mapDispatchToProps = (dispatch) => ({
  onSortClick(sortType) {
    dispatch(ActionCreator.changeSort(sortType));
  }
});

export {SortList};
export default connect(mapStateToProps, mapDispatchToProps)(SortList);
