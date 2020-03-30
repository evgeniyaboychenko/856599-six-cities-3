import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/user/user.js';

const MessageError = ({error, onCloseClick}) => {
  return (
    <section style = {(!error || error === 200) ? {display: `none`} : {display: `block`, position: `absolute`,
      width: `500px`, marginLeft: `-150px`, left: `50%`, top: `100px`, backgroundColor: `white`}}>
      <h2 style = {{display: `flex`, textAlign: `center`}}>Ошибка {error}</h2>
      <button type="button" aria-label="Закрыть модальное окно" style = {{display: `flex`, margin: `auto`}}onClick = {(evt) => {
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
export default connect(null, mapDispatchToProps)(MessageError);
