import {getRandomNumber, generateBolleanValue, getObjectsArray} from '../utils/utils.js';

const OFFER_IMAGES = [`room.jpg`, `apartment-01.jpg`, `apartment-02.jpg`, `apartment-03.jpg`];
const OFFER_NAMES = [`Canal View Prinsengracht`, `Nice, cozy, warm big bed apartment`, `Beautiful & luxurious apartment at great location`, `Wood and stone place`];
const OFFER_TYPES = [`apartment`, `privet room`, `house`, `hotel`];
const COUNT_CARD = 4;
const MAX_RATING = 5;
const MAX_PRICE = 200;

const generateId = () => {
  return String(new Date().valueOf() + Math.random());
};

const generateOfferCard = () => {
  return {
    id: generateId(),
    img: OFFER_IMAGES[getRandomNumber(OFFER_IMAGES.length)],
    name: OFFER_NAMES[getRandomNumber(OFFER_NAMES.length)],
    rating: getRandomNumber(MAX_RATING + 1),
    price: getRandomNumber(MAX_PRICE),
    type: OFFER_TYPES[getRandomNumber(OFFER_TYPES.length)],
    isPremium: generateBolleanValue(),
  };
};

export const generateOfferCards = () => {
  return getObjectsArray(generateOfferCard, COUNT_CARD);
};
