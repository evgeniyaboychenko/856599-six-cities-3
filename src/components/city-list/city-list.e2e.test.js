import React from 'react';
import {CityList} from './city-list.jsx';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new Adapter(),
});

const CITIES = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
const COORDINATES_CITY = [[48.856663, 2.351556], [50.930779, 6.938399], [50.854283, 4.352131], [52.373057, 4.892557], [53.552645, 9.966287], [51.230569, 6.787428]];

const activeCity = {
  id: `1`,
  name: CITIES[0],
  coordinatesCity: COORDINATES_CITY[0],
  zoom: 8
};

const cities = [{
  id: `1`,
  name: CITIES[0],
  coordinatesCity: COORDINATES_CITY[0],
  zoom: 8
},
{
  id: `2`,
  name: CITIES[1],
  coordinatesCity: COORDINATES_CITY[1],
  zoom: 8
},
{
  id: `3`,
  name: CITIES[2],
  coordinatesCity: COORDINATES_CITY[2],
  zoom: 8
}
];

it(`click on city`, () => {
  const onCityClick = jest.fn();
  const container = Enzyme.mount(
      <CityList
        activeCity = {activeCity}
        cities = {cities}
        onCityClick = {onCityClick}
      />
  );
  const cityList = container.find(`.locations__item`);
  cityList.forEach((city, i) => {
    city.simulate(`click`);
    expect(onCityClick).toBeCalledWith(cities[i]);
  });
  expect(onCityClick).toBeCalledTimes(cities.length);
});
