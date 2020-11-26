import './css/fonts.css';
import './css/style.css';
import { randomArray, chooseCards } from './js/randomArray';
export let quantityCards;
import { checkPair } from './js/rules';
import {PICSTODEAL, cards, level} from'./js/store';
import { timerGame } from './js/timer';

'use strict';

// функция формирует содержимое модельного окна
const tempModalWindow = (cards, level) => {
  return `<div class="modal">
          <h2 class="modal__title">ИГРА ПАРЫ</h2>
          <form action="/" class="modal__form">
            <div class="madal__wrap">
              <span class="modal__choosetext">Выберете количество пар</span>
              <select class="modal__select" name="select" id="select">
                ${cards}
              </select>
            </div>
            <div class="madal__wrap">
              <span class="modal__choosetext">Выберете сложность</span>
              <select class="modal__select" name="select" id="select">
                ${level}
              </select>
            </div>
            <button class="modal__btn">Начать игру</button>
          </form>
        </div>`

};
// фукция формирует необходимое количество options
const options = (obj) => {
  let listItems = Object.keys(obj).reduce((acc, item) => {
    return acc += `<option class="modal__option" value="${item}">${item}</option>`
  }, '');
  return listItems;
}

// Функция рендерит модальное окно
export function renderModal(string) {

  document.querySelector('.main').innerHTML = string;

}
// запускаем рендер модального окна
renderModal(tempModalWindow(options(cards), options(level)));

// обработчик для модального окна
document.body.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const target = ev.target;
  const selected = document.querySelector('.modal__select').options.selectedIndex;

  if (target.classList.contains('modal__form')) {
    quantityCards = document.querySelector('.modal__select').options[selected].value;
    target.parentNode.closest('.modal').remove();
    renderModal(cardBuilder(quantityCards, cards));

  }
})
// функция формирует карточки
const cardBuilder = function (quantity, object) {
  const tableArray = object[quantity] // возвращает объект с количеством строк и ячеек
  //! формируем див, или любой другой тэг, так как нужно передать строку внутри, а если не оборачивать в див, то потеряется сама таблица
  const div = document.createElement('div');

  const table = document.createElement('table');
  table.classList.add('table');

  let th = '';
  for (let i = 0; i < tableArray[1]; i++) {
    th += `<th class="th"><div class="card"><div class="front"></div><div class="back"></div></div></th>`;
  }
  let tRow = '';
  for (let i = 0; i < tableArray[0]; i++) {
    tRow += `<tr class="tr">${th}</tr>`;
  }
  table.innerHTML = tRow;
  div.appendChild(table);

  // рандомно добавили дата атрибут к каждой карточке
  const randomSetArray = randomArray(quantityCards);
  const picsArray = chooseCards(PICSTODEAL, quantityCards);
  let indexOfArray = 0;

  // добавляем картинки и дата атрибут к карточкам
  table.querySelectorAll('.back').forEach(item => {
    item.dataset.value = `${randomSetArray[indexOfArray++]}`;
    item.style.backgroundImage = `url('./pictures/cards/${picsArray[item.dataset.value - 1]}.jpg')`;
  });

  return div.innerHTML;
}

checkPair();

document.querySelector('main').addEventListener('click', function(e) {
  if (e.target.classList.contains('yes')) {
    window.location.reload()
  } else if (e.target.classList.contains('no')) console.log('bye')

});





timerGame(5)
