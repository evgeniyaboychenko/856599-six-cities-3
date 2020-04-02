import React from 'react';
import {FavoriteToggle} from './favorite-toggle.jsx';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new Adapter(),
});

const dataComponent = {
  nameClass: `favorite`,
  width: `20`,
  height: `20`
};

const isFavorite = true;
const idCard = 1;


it(`click on favorite`, () => {
  const onButtonClick = jest.fn();
  const container = Enzyme.mount(
      <FavoriteToggle
        isFavorite = {isFavorite}
        idCard = {idCard}
        dataComponent = {dataComponent}
        onButtonClick = {onButtonClick}
      />
  );
  container.simulate(`click`);
  expect(onButtonClick).toBeCalledTimes(1);
  expect(onButtonClick).toBeCalledWith(idCard, Number(!isFavorite));
});
