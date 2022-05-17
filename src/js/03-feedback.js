var throttle = require('lodash.throttle');

const emailEl = document.querySelector('input');
const messageEl = document.querySelector('textarea');
const formEl = document.querySelector('form');
// const btnEl = document.querySelector('button');
const formData = {};
const FEED_BACK = 'feedback-form-state';

const worksWithLocalStorage = () => {
  formData.email = emailEl.value;
  formData.message = messageEl.value;
  localStorage.setItem(FEED_BACK, JSON.stringify(formData));
};

formEl.addEventListener('input', throttle(worksWithLocalStorage, 500));

if (localStorage.getItem(FEED_BACK) !== null) {
  //   console.log(localStorage.getItem('feedback-form-state'));
  const parsed = JSON.parse(localStorage.getItem(FEED_BACK));
  //   console.log(parsed);
  emailEl.value = parsed.email;
  messageEl.value = parsed.message;
}

const submittedAction = event => {
  event.preventDefault();
  localStorage.removeItem(FEED_BACK);
  emailEl.textContent = '';
  messageEl.textContent = '';
  console.log(formData);
};

formEl.addEventListener('submit', submittedAction);
