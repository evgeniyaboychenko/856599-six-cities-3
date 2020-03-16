import React from 'react';
import renderer from 'react-test-renderer';
import MainEmpty from './main-empty.jsx';

const CITIES = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
const COORDINATES_CITY = [[48.856663, 2.351556], [50.930779, 6.938399], [50.854283, 4.352131], [52.373057, 4.892557], [53.552645, 9.966287], [51.230569, 6.787428]];

const activeCity = {
  id: `1`,
  name: CITIES[0],
  coordinatesCity: COORDINATES_CITY[0],
};

it(`should MainEmpty render correctly`, () => {
  const tree = renderer.create(
      <MainEmpty
        activeCity = {activeCity}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
