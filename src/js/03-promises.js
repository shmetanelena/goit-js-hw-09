import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = {
        position: position,
        delay: delay,
      };
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(result); // Fulfill
      } else {
        reject(result); // Reject
      }
    }, delay);
  });
}

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const elements = e.currentTarget.elements;
  let delay = Number(elements.delay.value);
  const step = Number(elements.step.value);
  const amount = Number(elements.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    const promise = createPromise(position, delay);
    delay += step;

    promise
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
