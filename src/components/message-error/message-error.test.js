import React from 'react';
import renderer from 'react-test-renderer';
import MessageError from './message-error.jsx';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";


const mockStore = configureStore([]);
it(`should MessageError render correctly`, () => {
  const store = mockStore({
  });
  const tree = renderer.create(
      <Provider store={store}>
        <MessageError
          error = {`error`}
          onCloseClick = {() => {}}
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
