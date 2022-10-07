const apiEndPoint =
  "https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1";
let apiData = [];

for (let i = 0; i < 7; i++) {
  fetch(apiEndPoint)
    .then((response) => {
      //parsing data
      return response.json();
    })
    .then((data) => {
      //The data you wanna use
      apiData = data.MultiDepartureBoard.Departure[i];
      console.log(apiData);
    })
    .catch((error) => {
      //If theres an error
      console.error(error);
    })
    .finally(() => {
      renderBusLine();
    });
}

let renderBusLine = () => {
  let arrayData = apiData.def == undefined;

  if (arrayData) {
    document.querySelector("#bus").innerHTML += `
     <p class="">${apiData.direction}</p>
     <p>${apiData.line}</p>
    <p>${apiData.time}</p>
 `;
  }
};
