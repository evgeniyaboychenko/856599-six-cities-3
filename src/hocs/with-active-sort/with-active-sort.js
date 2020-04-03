import React, {PureComponent} from 'react';

const withActiveSortList = (Component) => {
  class WithActiveSortList extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {isActiveSort: false};
      this._handleActiveChange = this._handleActiveChange.bind(this);
    }

    _handleActiveChange() {
      this.setState((prevState) => ({isActiveSort: !prevState.isActiveSort}));
    }

    render() {
      return <Component
        {...this.props}
        isActive={this.state.isActiveSort}
        onSortListClick={this._handleActiveChange}
      />;
    }
  }

  WithActiveSortList.propTypes = {};
  return WithActiveSortList;
};

export default withActiveSortList;
