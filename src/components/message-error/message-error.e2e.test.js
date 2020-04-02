import React from 'react';
import {MessageError} from './message-error.jsx';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const mockEvent = {
  preventDefault() {}
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`should message close`, () => {
  const onCloseClick = jest.fn();
  const message = shallow(
      <MessageError
        error = {`error`}
        onCloseClick = {onCloseClick}
      />
  );

  const buttonClose = message.find(`button`);
  buttonClose.simulate(`click`, mockEvent);
  expect(onCloseClick.mock.calls.length).toBe(1);
});
