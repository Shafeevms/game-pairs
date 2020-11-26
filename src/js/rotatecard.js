import { filterPairs } from './randomArray';
import { quantityCards, renderModal } from '../index';
import { modalWin } from './templates';
import { timer } from './timer';
let inProccess = 0;
let checkArray = [];
let score = 0;

const rotatecard = (e) => {
  if (inProccess === 2 ) return;

  isFront(e);
  if (checkPair()) score++;
  if (!filterPairs(checkArray, checkArray[0]) && checkArray.length === 2) {
    rotateBack();
  }
  if (score === quantityCards / 2) {
    setTimeout(() => {
      renderModal(modalWin, 'main');
      clearInterval(timer);
      document.querySelector('.timer').style.display = 'none';
    }, 1000)

  }
}

const isFront = (e) => {
  const target = e.target;
  const parent = target.parentNode;

  if (target.classList.contains('front')) {
    parent.querySelector('.back').classList.add('rotate-back');
    parent.querySelector('.front').classList.add('rotate-front');
    parent.classList.add('try');
    inProccess++;
    const value = parent.querySelector('.back').dataset.value;
    checkArray.push(value);
  }

}

const checkPair = () => {
  if (filterPairs(checkArray, checkArray[0])) {
    document.querySelectorAll('.try').forEach(el => {
      el.dataset.win = true;
      el.querySelector('.back').classList.add('win');
      document.querySelectorAll('.try').forEach(el => {
        el.classList.remove('try');
      })
      checkArray = [];
      inProccess = 0
    })
    return true;
  }
  return false;
}

const rotateBack = () => {
  setTimeout (() => {
    document.querySelectorAll('.try').forEach(el => {
      el.classList.remove('try');
      el.querySelector('.back').classList.remove('rotate-back');
      el.querySelector('.front').classList.remove('rotate-front');
      checkArray = [];
      inProccess = 0;
    })
  }, 1000)
}

export default rotatecard;
