import React from 'react';
import renderer from 'react-test-renderer';
import Comment from './comment.jsx';

const DESCRIPTIONS = [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`, `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`];
const AVATARS = [`avatar-angelina.jpg`, `avatar-max.jpg`];
const NAMES = [`Angelina`, `Max`, `Kate`, `Pol`, `Mike`];

const comment =
{
  id: `1`,
  avatar: AVATARS[0],
  name: NAMES[0],
  rating: 2,
  text: DESCRIPTIONS[0],
  date: 1661954344,
};

it(`should Comment render correctly`, () => {
  const tree = renderer.create(
      <Comment
        comment = {comment}
        key = {comment.id}
      />).toJSON();

  expect(tree).toMatchSnapshot();
});
