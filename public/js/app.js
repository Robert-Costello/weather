const weatherForm = document.querySelector('form');
const message1 = document.querySelector('.message1');
const message2 = document.querySelector('.message2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const search = weatherForm.input.value;
  weatherForm.reset();
  message1.textContent = '';
  message1.innerHTML =
    '<div><image id="loading" src="img/loading.gif" alt=""></div>';
  message2.textContent = '';
  fetch(`/weather?address=${search}`).then((response) => {
    response.json().then((data) => {
      if (data.error) return (message1.innerHTML = data.error);

      message1.textContent = data.location;
      message2.textContent = data.forecast;
    });
  });
});
