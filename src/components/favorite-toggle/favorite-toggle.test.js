import React from 'react';
import renderer from 'react-test-renderer';
import FavoriteToggle from './favorite-toggle.jsx';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space.js';

const mockStore = configureStore([]);

const dataComponent = {
  nameClass: `favorite`,
  width: `20`,
  height: `20`
};

it(`should AboutOffer render correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      isFavorite: false,
    }});
  const tree = renderer.create(
      <Provider store={store}>
        <FavoriteToggle
          isFavorite = {true}
          idCard = {1}
          dataComponent = {dataComponent}
          onButtonClick = {()=>{}}
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

