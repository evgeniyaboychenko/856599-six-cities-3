// фун-ия возвращающая случайное число [0..number)
export const getRandomNumber = (number) => {
  return Math.floor(Math.random() * number);
};
// фун-ия возвращающая true или false
export const generateBolleanValue = () => {
  return Boolean(getRandomNumber(2));
};

// фун-ия возвращающая случайное число в промежутке [min, max)
export const getRandomRange = function (min, max) {
  return min + getRandomNumber(max - min);
};

// функция возвращающая случайный массив до заданной длины
export const generateRandomArray = (array, number) => {
  array = array.slice();
  const deleteCount = array.length - number;
  for (let i = 0; i < deleteCount; i++) {
    array.splice(getRandomNumber(array.length), 1);
  }
  return array;
};

// функция возвращающая массив объектов заданной длинны
export const getObjectsArray = (obj, count) => {
  return new Array(count)
    .fill(``).map(obj);
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

// функция генерирующая случайное число
export const generateId = () => {
  return String(new Date().valueOf() + Math.random());
};
