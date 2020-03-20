import {getRandomNumber, getRandomRange, getObjectsArray, generateId} from '../utils/utils.js';

const DESCRIPTIONS = [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`, `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`];
const AVATARS = [`avatar-angelina.jpg`, `avatar-max.jpg`];
const NAMES = [`Angelina`, `Max`, `Kate`, `Pol`, `Mike`];
const MAX_RATING = 5;

const generateComment = () => {
  return {
    id: generateId(),
    avatar: AVATARS[getRandomNumber(AVATARS.length)],
    name: NAMES[getRandomNumber(NAMES.length)],
    text: DESCRIPTIONS[getRandomNumber(DESCRIPTIONS.length)],
    rating: getRandomNumber(MAX_RATING + 1),
    date: getRandomRange(1661954344, 1579498575391)
  };
};

export const generateComments = () => {
  return getObjectsArray(generateComment, 15);
};
