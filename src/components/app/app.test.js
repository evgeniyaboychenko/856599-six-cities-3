import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const offersNames = [`Beautiful apartment`, `Amazing place`];

it(`should App render correctly`, () => {
  const tree = renderer.create(
      <App
        offersCount = {6}
        offersNames = {offersNames}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
