import {getRandomNumber, generateBolleanValue, generateRandomArray, getObjectsArray} from '../utils/utils.js';

const OFFER_IMAGES = [`room.jpg`, `apartment-01.jpg`, `apartment-02.jpg`, `apartment-03.jpg`, `apartment-03.jpg`, `apartment-01.jpg`];
const OFFER_NAMES = [`Canal View Prinsengracht`, `Nice, cozy, warm big bed apartment`, `Beautiful & luxurious apartment at great location`, `Wood and stone place`];
const OFFER_TYPES = [`apartment`, `privet room`, `house`, `hotel`];
const OFFER_DESCRIPTIONS = [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`, `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`];
const AVATARS = [`avatar-angelina.jpg`, `avatar-max.jpg`];
const NAMES = [`Angelina`, `Max`, `Kate`, `Pol`, `Mike`];
const APPLIANCES = [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`];
const COUNT_CARD = 4;
const MAX_RATING = 5;
const MAX_PRICE = 200;

const generateId = () => {
  return String(new Date().valueOf() + Math.random());
};

const generateOfferCard = () => {
  return {
    id: generateId(),
    name: OFFER_NAMES[getRandomNumber(OFFER_NAMES.length)],
    rating: getRandomNumber(MAX_RATING + 1),
    price: getRandomNumber(MAX_PRICE),
    type: OFFER_TYPES[getRandomNumber(OFFER_TYPES.length)],
    isPremium: generateBolleanValue(),

    descriptions: generateRandomArray(OFFER_DESCRIPTIONS, getRandomNumber(OFFER_DESCRIPTIONS.length)),
    photos: generateRandomArray(OFFER_IMAGES, getRandomNumber(OFFER_IMAGES.length)),
    countRooms: getRandomNumber(10),
    maxGuests: getRandomNumber(10),
    appliances: generateRandomArray(APPLIANCES, getRandomNumber(APPLIANCES.length)),

    owner: {
      avatar: AVATARS[getRandomNumber(AVATARS.length)],
      name: NAMES[getRandomNumber(NAMES.length)],
      isSuper: generateBolleanValue(),
    },
  };
};

export const generateOfferCards = () => {
  return getObjectsArray(generateOfferCard, COUNT_CARD);
};
