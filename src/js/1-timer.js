import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const inputDate = document.getElementById('datetime-picker');
const buttonStart = document.querySelector('[type="button"]');
const spanList = document.querySelectorAll('.value');

let timeInput = 0;

flatpickr(inputDate, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timeInput = selectedDates[0];
    if (timeInput.getTime() - new Date().getTime() > 1) {
      buttonStart.classList.add('timer-btn-active');
    } else {
      buttonStart.classList.remove('timer-btn-active');

      iziToast.error({
        title: 'Error',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: 1.5,
        message: 'Please choose a date in the future',
        messageSize: '16px',
        messageLineHeight: 1.5,
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        closeOnEscape: true,
        iconUrl: 'bi_x-octagon.svg',
        timeout: 3000,
        theme: 'dark',
      });
    }
  },
});

buttonStart.addEventListener('click', () => {
  inputDate.classList.add('timer-input-unactive');
  buttonStart.classList.remove('timer-btn-active');
  startTimer();
});

function startTimer() {
  const timer = setInterval(() => {
    const timeLeft = timeInput - new Date().getTime();

    if (timeLeft <= 0) {
      clearInterval(timer);
      inputDate.classList.remove('timer-input-unactive');
      return;
    }

    const timeObj = Object.values(convertMs(timeLeft));

    spanList.forEach((span, index) => {
      span.textContent = addLeadingZero(timeObj[index]);
    });
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
