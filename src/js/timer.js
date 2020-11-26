'use strict';

let timer;
// функия запускает таймер обратного отсчета
export function timerGame(num) {
  timer = setInterval(tick, 1000);

  function tick () {
    num--;
    console.log(num);
    if (num === 0) {
      clearInterval(timer);
      return true;
    }
  }

}



