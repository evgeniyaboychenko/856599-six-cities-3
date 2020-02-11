import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';


const adsNames = [`Beautiful apartment`, `Amazing place`];

it(`should Main render correctly`, () => {
  const tree = renderer.create(
      <Main
        offersCount = {6}
        adsNames = {adsNames}
      />).toJSON();

  expect(tree).toMatchSnapshot();
});
