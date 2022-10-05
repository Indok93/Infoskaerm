//apiData is the arry for the full products array.
// it is the main array
const apiData = [];

const apiEndPoint =
  "https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1";

const getApiData = () => {
  fetch(apiEndPoint)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      apiData.push(...data.MultiDepartureBoard.Departure);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderProducts();
    });
};

const renderProducts = (array) => {
  console.log(apiData);
};

getApiData();
