import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const secondsData = document.querySelector('[data-seconds]');
const minutesData = document.querySelector('[data-minutes]');
const hoursData = document.querySelector('[data-hours]');
const daysData = document.querySelector('[data-days]');
const timer = document.querySelector('.timer');
const startBtn = document.querySelector('[data-start]');
const dateInput = document.getElementById('datetime-picker');

startBtn.disabled = true;
let countdownTime = null;
let startTime = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onCheckDate(selectedDates);
  },
};

flatpickr(dateInput, options);

function onCheckDate(selectedDates) {
  countdownTime = selectedDates[0].getTime();
  startTime = new Date().getTime();
  if (countdownTime < startTime) {
    Notiflix.Notify.failure('Please choose a date in the future 🥵');
    timer.style.color = 'red';
  } else {
    startBtn.disabled = false;
    Notiflix.Notify.success('The countdown has started 🥳');
    timer.style.color = 'black';
  }
}

const onStartBtn = () => {
  timerId = setInterval(() => {
    startTime = new Date().getTime();
    const deltaTime = countdownTime - startTime;

    if (deltaTime <= 0) {
      clearInterval(timerId);
      dateInput.disabled = false;
    } else {
      startBtn.disabled = true;
      const time = convertMs(deltaTime);
      dateInput.disabled = true;
      updateTime(time);
    }
  }, 1000);
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startBtn.addEventListener('click', onStartBtn);

function updateTime({ days, hours, minutes, seconds }) {
  daysData.textContent = days;
  hoursData.textContent = hours;
  minutesData.textContent = minutes;
  secondsData.textContent = seconds;
}

startBtn.style.padding = '25px';
startBtn.style.borderRadius = '5px';
startBtn.style.border = '0px';

dateInput.style.padding = '15px';
dateInput.style.borderRadius = '5px';
