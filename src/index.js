import { randomArray, chooseCards } from './js/randomArray';
import './css/style.css';

'use strict';
const PICSTODEAL = 8;
let quantityCards;
const element = document.querySelector('.modal__select');
const cards = {
  4: [2, 2],
  8: [2, 4],
  12: [3, 4],
  16: [4, 4],
}
// функция формирует содержимое модельного окна
const tempModalWindow = (options) => {
  return `<div class="modal">
          <h2 class="modal__title">ИГРА ПАРЫ</h2>
          <form action="/" class="modal__form">
            <div class="madal__wrap">
              <span class="modal__choosetext">Выберете количество пар</span>
              <select class="modal__select" name="select" id="select">
                ${options}
              </select>
            </div>
            <button class="modal__btn">Начать игру</button>
          </form>
        </div>`

};
// фукция формирует необходимое количество options
const options = () => {
  let listItems = Object.keys(cards).reduce((acc, item) => {
    return acc += `<option class="modal__option" value="${item}">${item}</option>`
  }, '');
  return listItems;
}

// Функция рендерит модальное окно
function renderModal(string) {

  document.querySelector('.main').innerHTML = string;

}
// запускаем рендер модального окна
renderModal(tempModalWindow(options()));

// обработчик для модального окна
document.body.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const target = ev.target;
  const selected = document.querySelector('.modal__select').options.selectedIndex;

  if (target.classList.contains('modal__form')) {
    quantityCards = document.querySelector('.modal__select').options[selected].value;
    target.parentNode.closest('.modal').remove();
    renderModal(cardBuilder(quantityCards, cards))


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












