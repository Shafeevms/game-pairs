import rotatecard from './rotatecard';
'use strict';


// функция проверяет были ли выбраны две одинаковые карты
export const checkPair = () => {
  document.querySelector('.main').addEventListener('click', rotatecard)
}
