import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const btnStart = document.querySelector('button[data-start]');
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');

let selectedDate = null;
let timerId;

const addLeadingZero = value => {
  return String(value).padStart(2, 0);
};

const updateRemaingTime = () => {
  if (selectedDate == null) {
    return;
  }
  const deltaMs = selectedDate.getTime() - new Date().getTime();
  if (deltaMs > 0) {
    const { days, hours, minutes, seconds } = convertMs(deltaMs);
    spanDays.textContent = addLeadingZero(days);
    spanHours.textContent = addLeadingZero(hours);
    spanMinutes.textContent = addLeadingZero(minutes);
    spanSeconds.textContent = addLeadingZero(seconds);
  } else {
    clearInterval(timerId);
  }
};

btnStart.disabled = true;

btnStart.addEventListener('click', () => {
  timerId = setInterval(updateRemaingTime, 1000);
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const now = new Date();
    if (now.getTime() > selectedDates[0].getTime()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    btnStart.disabled = false;
    selectedDate = selectedDates[0];
  },
};

flatpickr('input#datetime-picker', options);
