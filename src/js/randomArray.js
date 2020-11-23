'use strict'
// функция готовит массив с необходимым количеством рандомных чисел по паре, располагая в разных частях массива
export function randomArray(cards) {
  const setItems = [];
  const randomSetArray = [];
  const length = cards / 2;
  for (let i = 1; i <= length; i++) {
    setItems.push(i)
  }
  console.log(setItems);
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

 // функция возвращает из массива рандомно ИНДЕКС
 const random = array => Math.floor(Math.random() * array.length);

// функция проверяет есть ли в массиве два одинаковых элемента, возвращает true или false
const filterPairs = (array, element) => {
  const elementsNumber = array.filter(el => el === element).length
  if (elementsNumber === 2) {
    return true;
  }
  return false;
}
