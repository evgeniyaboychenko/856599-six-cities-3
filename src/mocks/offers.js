import {getRandomNumber, getRandomRange, generateBolleanValue, generateRandomArray, getObjectsArray} from '../utils/utils.js';

const CITIES = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
const COORDINATES_CITY = [[48.856663, 2.351556], [50.930779, 6.938399], [50.854283, 4.352131], [52.373057, 4.892557], [53.552645, 9.966287], [51.230569, 6.787428]];

const OFFER_IMAGES = [`room.jpg`, `apartment-01.jpg`, `apartment-02.jpg`, `apartment-03.jpg`, `apartment-03.jpg`, `apartment-01.jpg`];
const OFFER_NAMES = [`Canal View Prinsengracht`, `Nice, cozy, warm big bed apartment`, `Beautiful & luxurious apartment at great location`, `Wood and stone place`];
const OFFER_TYPES = [`apartment`, `privet room`, `house`, `hotel`];
const OFFER_DESCRIPTIONS = [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`, `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`];
const AVATARS = [`avatar-angelina.jpg`, `avatar-max.jpg`];
const NAMES = [`Angelina`, `Max`, `Kate`, `Pol`, `Mike`];
const APPLIANCES = [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`];
const COORDINATES = [[52.3909553943508, 4.85309666406198], [52.369553943508, 4.85309666406198], [52.3909553943508, 4.929309666406198], [52.3809553943508, 4.939309666406198], [52.3809553943509, 4.939309666406195]];
const MAX_RATING = 5;
const MAX_PRICE = 200;

const generateId = () => {
  return String(new Date().valueOf() + Math.random());
};

const generateCities = () => {
  return CITIES.map((name, i) => {
    return {
      id: generateId(),
      name,
      coordinatesCity: COORDINATES_CITY[i],
    };
  });
};

const cities = generateCities();
const citiesId = cities.map((city) => (city.id));

const generateOfferCard = () => {
  return {
    id: generateId(),
    cityId: citiesId[getRandomNumber(citiesId.length)],
    name: OFFER_NAMES[getRandomNumber(OFFER_NAMES.length)],
    rating: getRandomNumber(MAX_RATING + 1),
    price: getRandomNumber(MAX_PRICE),
    type: OFFER_TYPES[getRandomNumber(OFFER_TYPES.length)],
    isPremium: generateBolleanValue(),

    descriptions: generateRandomArray(OFFER_DESCRIPTIONS, getRandomNumber(OFFER_DESCRIPTIONS.length)),
    photos: generateRandomArray(OFFER_IMAGES, getRandomRange(1, OFFER_IMAGES.length + 1)),
    countRooms: getRandomNumber(10),
    maxGuests: getRandomNumber(10),
    appliances: generateRandomArray(APPLIANCES, getRandomNumber(APPLIANCES.length)),
    coordinates: COORDINATES[getRandomNumber(COORDINATES.length)],

    owner: {
      avatar: AVATARS[getRandomNumber(AVATARS.length)],
      name: NAMES[getRandomNumber(NAMES.length)],
      isSuper: generateBolleanValue(),
    },
  };
};

const generateOfferCards = (countCard) => {
  return getObjectsArray(generateOfferCard, countCard);
};

const offers = generateOfferCards(20);

export {generateOfferCards, generateCities, cities, offers};
