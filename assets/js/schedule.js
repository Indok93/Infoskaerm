import { formatDate } from "./dateFormat.js";

// sætter vores container som en variabel
const root = document.getElementById("schedule");
// en variabel vi har lavet til at sætte maximal antal af activiteter på skærmen
const max_activities = 8;
// set page update interval to 10000 milisekunds
const upDatePage = 1000000;

// Apiendpoint for inforboardets aktiviteter
const apiEndPoint = "https://iws.itcn.dk/techcollege/Schedules?departmentCode=smed";

// functionen der startes fra main.js
// og efterfølgende opdateres
export const GroupDates = () => {
  const ApiData = [];

  // Henter dags dato
  let dagsDato = new Date();

  // new Date() objektet indeholder et tal, der repræsenterer millisekunder
  // siden 1. januar 1970 UTC. Coordinated Universal Time.
  // fordi timestamp er i milisekunder, division med 1000 for at få sekunder
  // timestamp for lige nu og her i sekunder
  let cur_time_stamp = Math.round(dagsDato.getTime() / 1000);

  // Henter næste dags timestamp i sekunder
  // sætter værdien af i morgen til midnat i dag plus 24 timer , 86400 sekunder =  1 døgn
  let tomorrow_stamp = Math.round(dagsDato.setHours(0, 0, 0, 0) / 1000) + 86400;

  // funktionen der starter vores fecth()
  const fetchApiData = () => {
    fetch(apiEndPoint)
      .then((response) => response.json())
      .then((data) => {
        // push af data fra fetch til arrays apiData
        ApiData.push(...data.value);
      })
      .catch((e) => {
        console.error(e)
      })
      // kald af funktion der
      .finally(() => {
        getActivities()
      });
  };

  const getActivities = () => {
    // write array of the activities you want to include
    const inCludedEducations = [
        "h0mg100122",
        "gwe080122",
        "biw100522",
        "Grafisk Tekniker",
        "Grafisk teknik.",
    ];

    // start funktion to render activity table
    // functions are chained first .filter then .sort
    // filtreret og sorteret data
    renderActivityTable(
      ApiData.filter((activity) => inCludedEducations.includes(activity.Team)).sort((a, b) => {
        if (a.StartDate === b.StartDate) {
          return a.Education < b.Education ? -1 : 1;
        } else {
          return a.StartDate < b.StartDate ? -1 : 1;
        }
      })
    );
  };

  const renderActivityTable = (data) => {
    // set top of table to variable html
    let html = `
    <div class="activities">
      <div class="activity-headings">
        <div>
          Tid
        </div>
        <div>
          Uddannelse
        </div>
        <div>
          Fag
        </div>
        <div>
          Hold
        </div>
        <div>
          Lokale
        </div>
      </div>
    </div>
`;

    // Henter dags datos aktiviteter/Timer ind i array arr_subjects
    let arr_subjects = [];
    //henter dagens aktiviteter ind
    //det er sådan at den ved hvad der hører til dagen i dag af elementer
    //f.eks en tid der er større eller lig med tiden nu, men mindre end tiden i morgen
    // klippet til en længde af 16 elementer
    arr_subjects.push(
      ...data.filter((obj) => convertTimeToSeconds(obj.StartDate) + 3600 >= cur_time_stamp && convertTimeToSeconds(obj.StartDate) < tomorrow_stamp)
    );

    // Henter næste dags aktiviteter ind i array arr_nextday_subjects
    let arr_nextday_subjects = [];
    arr_nextday_subjects.push(...data.filter((obj) => convertTimeToSeconds(obj.StartDate) >= tomorrow_stamp));

    // Tilføj næste dags dato og aktiviteter til arr_subjects hvis der er nogle
    if (arr_nextday_subjects.length) {
      // Lokal formatering af dato med toLocalDateString
      let next_day_friendly = new Date(arr_nextday_subjects[0].StartDate).toLocaleDateString("da-DK", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
      arr_subjects.push({ day: next_day_friendly });
      arr_subjects.push(...arr_nextday_subjects);
    }

    // Begrænser antal aktiviteter - henter alle hvis 0
    arr_subjects.slice(0, max_activities).map((obj) => {
      // Hvis object item har property Team skal den ligge aktiviteterne ind i table
      if (obj.Team) {
        // Tilføj table row med aktivitet til html
        html += createRow(obj);
        //Hvis object item ikke har property Team er det fordi at der ikke er flere timer på dagen
        //og skal derfor ligge de aktivitetner for næste dag ind i table
      } else {
        // Tilføj table row med dato til html
        html += createDayRow(obj);
      }
    });
    //
    //afslut table
    root.innerHTML = html;
  };

  fetchApiData();
};

// funktion til at skabe række med data
const createRow = (obj) => {
  return `<div class="schedule-row">
      <div class="time">${formatDate(obj.StartDate, "time")}</div>
      <div class="education">${obj.Education}</div>
      <div class="subject">${obj.Subject}</div>
      <div class="team">${obj.Team}</div>
      <div class="room">${obj.Room}</div>
      </div>`;
};

//Sætter en overskrift med den næste dag (fx tirsdag d. 30 november)
//når der ikke er flere aktiviterter på pågældene dag
function createDayRow(item) {
  return `<div id="nextDay" class="schedule-row">
            <div>${item.day}</div>
          </div>`;
}

//funktion to convert from millisconds to seconds
const convertTimeToSeconds = (time) => {
  return Math.round(new Date(time).getTime() / 1000);
};

setInterval(() => {
  // run this function every x milliseconds
  GroupDates();
}, upDatePage);