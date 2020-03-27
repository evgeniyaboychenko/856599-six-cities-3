import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/comment/comment.js';

const MessageErrorForm = ({error, onCloseClick}) => {
  return (
    <section style = {error === 200 ? {display: `none`} :
      {display: `block`, position: `fixed`, zIndex: 30,
        width: `600px`, marginLeft: `-150px`, left: `50%`, top: `100px`, backgroundColor: `white`}}>
      <h2 style = {{display: `flex`, textAlign: `center`}}>Ошибка. Попробуйте еще раз.</h2>
      <button type="button" aria-label="Закрыть модальное окно" style = {{display: `flex`, margin: `auto`}}onClick = {(evt) => {
        evt.preventDefault();
        onCloseClick();
      }}>
        Закрыть
      </button>
    </section>
  );
};

MessageErrorForm.propTypes = {
  error: PropTypes.number.isRequired,
  onCloseClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onCloseClick() {
    dispatch(ActionCreator.setIsError(``));
  }
});

export {MessageErrorForm};
export default connect(null, mapDispatchToProps)(MessageErrorForm);

