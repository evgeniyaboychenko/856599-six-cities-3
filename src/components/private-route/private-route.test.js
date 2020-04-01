import React from 'react';
import renderer from 'react-test-renderer';
import {PrivateRoute} from './private-route.jsx';
import {BrowserRouter} from 'react-router-dom';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {AppRoute} from '../../const.js';

it(`PrivateRoute component render`, () => {
  const tree = renderer
  .create(
      <BrowserRouter>
        <PrivateRoute
          render = {() => {}}
          path = {AppRoute.FAVORITES}
          exact = {true}
          authorizationStatus = {AuthorizationStatus.AUTH}
        />
      </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
