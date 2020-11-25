import { filterPairs } from './randomArray';
import { quantityCards } from '../index';

'use strict';
const checkArray = [];
let score = 0;
// функция проверяет были ли выбраны две одинаковые карты

export function checkPair() {
  document.querySelector('.main').addEventListener('click', function(e) {
    const target = e.target;
    const parent = target.parentNode;

    if(target.classList.contains('front')) {
      parent.querySelector('.back').classList.add('rotate-back', 'try');
      parent.querySelector('.front').classList.add('rotate-front', 'try');
      const value = parent.querySelector('.back').dataset.value;
      checkArray.push(value);
    }

    if(checkArray.length === 2 && filterPairs(checkArray, checkArray[0])) {
      score++;
      document.querySelectorAll('.try').forEach(el => el.dataset.win = true);

    } else {
      document.querySelectorAll
    }

// не забыть очистить массив checkArray

  })
}

// сравниваем значения в массива

// const numberCompare = () => {
//   checkArray.length === 2 &&
// }
