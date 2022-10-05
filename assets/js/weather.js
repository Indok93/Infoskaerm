const ApiData = [];

const ApiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=Aalborg&appid=4d58d6f0a435bf7c5a52e2030f17682d&units=metric";

fetch(ApiEndpoint)
  .then(response => {
    return response.json();
  })
  .then(data => {
    // console.log(data);
    ApiData.push(data);
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    ApiData.map((obj) => {
        console.log(obj)
        const {weather, main} = obj
        renderWeather(weather[0], main)
    })
  });

const renderWeather = (w, m) => {
   const {main, icon} = w
   const {temp} = m

    console.log(w, m)
    console.log(Math.round(temp));
    document.getElementById("weather").innerHTML += `
   <p>${main}</p>
   <p>${temp}</p>
`
};   