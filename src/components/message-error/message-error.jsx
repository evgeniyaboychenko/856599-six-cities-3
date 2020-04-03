import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/user/user.js';

const MessageError = ({error, onCloseClick}) => {
  return (
    <section style = {(!error) ? {display: `none`} :
      {display: `block`, position: `fixed`, zIndex: 30,
        width: `500px`, marginLeft: `-250px`, left: `50%`, top: `50%`, backgroundColor: `#f5f5f5`}}>
      <h2 style = {{display: `flex`, textAlign: `center`}}>Ошибка {error}</h2>
      <button type="button" aria-label="Закрыть модальное окно" style = {{display: `flex`, margin: `auto`}}
        onClick = {(evt) => {
          evt.preventDefault();
          onCloseClick();
        }}>
        Закрыть
      </button>
    </section>
  );
};

MessageError.propTypes = {
  error: PropTypes.string.isRequired,
  onCloseClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onCloseClick() {
    dispatch(ActionCreator.setLoadingError(``));
  }
});

export {MessageError};
export default connect(null, mapDispatchToProps)(React.memo(MessageError));
