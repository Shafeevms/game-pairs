'use strict'
//функция готовит массив с необходимым количеством рандомных чисел по паре, располагая в разных частях массива
export function randomArray(cards) {
  const setItems = [];
  const randomSetArray = [];
  const length = cards / 2;
  for (let i = 1; i <= length; i++) {
    setItems.push(i)
  }
  while (randomSetArray.length < cards) {
    let index = setItems[random(setItems)];
    if (filterPairs(randomSetArray, index)) {
      continue;
    } else {
      randomSetArray.push(index);
    }
  }
  return randomSetArray;
 }

// функция проверяет есть ли в массиве два одинаковых элемента, возвращает true или false
export const filterPairs = (array, testElement) => array.filter(el => el === testElement).length === 2;

// функция выбирает, какие номера карточек будут рендериться, нужно знать количество карточек
// в папке cards - переменная cardsToDeal;
export const chooseCards = (picsToDeal, cards) => {
  const array = [];
  while(array.length !== cards / 2) {
    let item = (Math.floor(Math.random() * picsToDeal + 1));
    if (array.find(el => el === item) === item) {
      continue;
    }
    array.push(item)
  }
  return array;
}

// функция возвращает из массива рандомно ИНДЕКС
const random = array => Math.floor(Math.random() * array.length);
