var throttle = require('lodash.throttle');

const emailEl = document.querySelector('input');
const messageEl = document.querySelector('textarea');
const formEl = document.querySelector('form');
// const btnEl = document.querySelector('button');
const formData = {};
const givenData = {};
const FEED_BACK = 'feedback-form-state';

initForm();

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
  if (emailEl.value === '' || messageEl.value === '') {
    console.log("Didn't submit, please fill another field");
    return;
  } else {
    console.log(formData);
  }

  // const data = new FormData(givenData);
  // data.forEach((value, name) => console.log(value, name));
  // emailEl.textContent = '';
  // messageEl.textContent = '';
};

formEl.addEventListener('submit', submittedAction);

formEl.addEventListener('change', event => {
  // console.log(event.target.value);
  givenData[event.target.name] = event.target.value;
  // console.log(givenData);
  localStorage.setItem('givenData', JSON.stringify(givenData));
});

function initForm() {
  let persistedFilters = localStorage.getItem('givenData');
  if (persistedFilters) {
    persistedFilters = JSON.parse(persistedFilters);
    Object.entries(persistedFilters).forEach(([name, value]) => {
      givenData[name] = value;
      formEl.elements[name].value = value;
    });
  }
}
