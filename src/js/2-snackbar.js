import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputList = document.querySelectorAll('input');
const from = document.querySelector('form');

const promiseOptions = { time: null, state: null };

const messageDefaultOptions = {
  titleSize: '0px',
  messageSize: '24px',
  messageLineHeight: 1.5,
  messageColor: '#fff',
  position: 'topRight',
  timeout: 3000,
  icon: false,
};

const makePromise = ({ delay, shouldResolve }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve();
      } else {
        reject();
      }
    }, delay);
  });
};

inputList.forEach((input, index) => {
  input.addEventListener('input', event => {
    promiseOptions[index === 0 ? 'time' : 'state'] = event.target.value;
  });
});

from.addEventListener('submit', event => {
  event.preventDefault();

  const promiseTime = promiseOptions.time;
  if (promiseTime < 0) {
    return;
  }

  makePromise({
    delay: promiseTime,
    shouldResolve: promiseOptions.state === 'fulfilled' ? true : false,
  })
    .then(() => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${promiseTime}ms`,
        ...messageDefaultOptions,
      });
    })
    .catch(() => {
      iziToast.error({
        message: `❌ Rejected promise in ${promiseTime}ms`,

        ...messageDefaultOptions,
      });
    });
});
