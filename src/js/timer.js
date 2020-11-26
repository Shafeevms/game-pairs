import { renderModal } from '../index';
import { modalLost } from '../js/templates';

'use strict';

export let timer;
// функия запускает таймер обратного отсчета
export function timerGame(num) {
  document.querySelector('.timer').style.display = 'block';

  timer = setInterval(tick, 1000);

  function tick () {
    num--;
    renderModal(num, 'timer__numbers');
    if (num === 0) {
      clearInterval(timer);
      renderModal(modalLost, 'main');
      document.querySelector('.timer').style.display = 'none';
    }
  }

}

