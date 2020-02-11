import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';

const adsNames = [`Beautiful apartment`, `Amazing place`];

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should ad heading be pressed`, () => {
  const headerCardClickHandler = jest.fn();
  const main = shallow(
      <Main
        offersCount = {6}
        adsNames = {adsNames}
        headerCardClickHandler = {headerCardClickHandler}
      />
  );

  const headerCards = main.find(`.place-card__name a`);
  headerCards.forEach((headerCard) => {
    headerCard.props().onClick();
  });
  expect(headerCardClickHandler.mock.calls.length).toBe(adsNames.length);
});
