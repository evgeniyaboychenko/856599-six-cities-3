import React from 'react';
import renderer from 'react-test-renderer';
import CommentList from './comment-list.jsx';
import moment from 'moment';

const DESCRIPTIONS = [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`, `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`];
const AVATARS = [`avatar-angelina.jpg`, `avatar-max.jpg`];
const NAMES = [`Angelina`, `Max`, `Kate`, `Pol`, `Mike`];

const comments =
[{
  id: `1`,
  avatar: AVATARS[0],
  name: NAMES[0],
  rating: 2,
  text: DESCRIPTIONS[0],
  date: moment(`2019-12-25`).toDate(),
},
{
  id: `2`,
  avatar: AVATARS[1],
  name: NAMES[1],
  rating: 2,
  text: DESCRIPTIONS[1],
  date: moment(`2019-12-26`).toDate(),
}];

it(`should Comment render correctly`, () => {
  const tree = renderer.create(
      <CommentList
        comments = {comments}
      />).toJSON();

  expect(tree).toMatchSnapshot();
});
