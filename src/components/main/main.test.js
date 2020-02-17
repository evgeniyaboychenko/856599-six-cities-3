import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';


const offersNames = [`Beautiful apartment`, `Amazing place`];

it(`should Main render correctly`, () => {
  const tree = renderer.create(
      <Main
        offersCount = {6}
        offersNames = {offersNames}
      />).toJSON();

  expect(tree).toMatchSnapshot();
});
