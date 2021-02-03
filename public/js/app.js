const weatherForm = document.querySelector('form');
const message1 = document.querySelector('.message1');
const message2 = document.querySelector('.message2');

const getWeather = async (search) => {
  try {
    const response = await axios.get(`/weather?address=${search}`);
    console.log(response.data);
    const {location, forecast} = response.data;
    message1.textContent = location;
    message2.textContent = forecast;
  } catch (error) {
    console.log(error);
  }
};

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const search = weatherForm.input.value;
  weatherForm.reset();
  message1.textContent = '';
  message1.innerHTML =
    '<div><image id="loading" src="img/loading.gif" alt=""></div>';
  message2.textContent = '';
  // fetch(`/weather?address=${search}`).then((response) => {
  //   response.json().then((data) => {
  //     if (data.error) return (message1.innerHTML = data.error);

  //     message1.textContent = data.location;
  //     message2.textContent = data.forecast;
  //   });
  // });

  getWeather(search);
});
