import React from 'react';
import renderer from 'react-test-renderer';
import Comment from './comment.jsx';

const DESCRIPTIONS = [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`, `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`];
const AVATARS = [`avatar-angelina.jpg`, `avatar-max.jpg`];
const NAMES = [`Angelina`, `Max`, `Kate`, `Pol`, `Mike`];

const comment =
{
  id: 1,
  avatar: AVATARS[1],
  name: NAMES[1],
  rating: 2,
  text: DESCRIPTIONS[1],
  date: `2020-03-29T18:07:19.382Z`,
  idUser: 1,
  isPro: false,
};

it(`should Comment render correctly`, () => {
  const tree = renderer.create(
      <Comment
        comment = {comment}
      />).toJSON();

  expect(tree).toMatchSnapshot();
});
