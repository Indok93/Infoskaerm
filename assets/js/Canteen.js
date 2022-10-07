const apiData = [];

export const getApiData = () => {
  const apiEndpoint =
    "https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json";

  fetch(apiEndpoint)
    .then((Response) => {
      if (Response) {
        return Response.json();
      }
    })
    .then((data) => {
      //console.log(data);
      apiData.push(data);
    })

    .catch((error) => {
      console.error(error);
    })

    .finally(() => {
      renderContentt();
    });
};

const renderContentt = () => {
  const {
    DepartureOffsetTime,
    Id,
    PictureUrl,
    ShowTime,
    Time,
    Type,
    Weather,
    Week, //from her on only objects and arrays
    Days,
    Schedules,
  } = apiData[0];

  let html = `<section>`;

  html += `


${ShowDay(Days)}

`;
  html += `</section>`;

  document.getElementById("canteen").innerHTML = html;
  //${Schedules.length > 0 ? schedules(Schedules) : ""}
};

const ShowDay = (arr) => {
  console.log("Days ", arr);
  //console.log(new Date().getDay());

  return `${arr[new Date().getDay() - 1].DayName}
  ${arr[new Date().getDay() - 1].Dish}
  `;
};

// switch starter her //
const switchMenu = (daynum, newDish) => {
  switch (daynum) {
    case 1:
      return newDish;

    case 2:
      return newDish;

    case 3:
      return newDish;

    case 4:
      return newDish;

    case 5:
      return newDish;

    default:
      return;
  }

  return [day, dish];
};
//document.getElementById("day").innerHTML = day;
// DaysArray.map((Days) => {});


