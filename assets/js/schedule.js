import { formatDate } from "./dateFormat.js";

const ApiData = [];

const ApiEndPoint = "https://iws.itcn.dk/techcollege/schedules?departmentcode=smed";

fetch(ApiEndPoint)
.then((response) => {

    return response.json();
})
.then((data) => {
    // console.log(data);
    
    ApiData.push(...data.value);
})
.catch((error) => {
    console.error(error);
})
.finally(() => {

    const ltd100122e = "ltd100122e";
    const h0mg010122f = "h0mg010122f";
    const h1pd081122 = "h1pd081122";
    const h1we010122 = "h1we010122";
    const h1we080122 = "h1we080122";
    const h0gr010122f = "h0gr010122f";
    const gla080522 = "gla080522";
    const h2gr090122 = "h2gr090122";
    const ggr080122 = "ggr080122";
    const ggk080122 = "ggk080122";

    const exClude = [ggk080122, ltd100122e, h0mg010122f, h1pd081122, h1we010122, h1we080122, h0gr010122f, gla080522, h2gr090122, ggr080122];

    ApiData.sort((a, b) => {
        /** sorting incoming data by date */
        if (a.StartDate < b.StartDate) return -1;
        if (b.StartDate < a.StartDate) return 1;
        return 0;
    }).filter((activity) => {
        return formatDate(new Date(), "day") === formatDate(activity.StartDate, "day") && !exClude.includes(activity.Team);
    }).map((obj) => {
        // console.log(ApiData.length)

        renderSchedule(obj);
    })
})

const renderSchedule = (obj) => {
    // console.log(ApiData);



    const {Education, Room, StartDate, Subject, Team} = obj;

    document.getElementById('schedule').innerHTML +=`
    <section>
    <h4>${Education}</h4>
    <h6>${Room}</h6>
    <h6>${formatDate(StartDate,"time")}</h6>
    <h6>${Subject}</h6>
    <h6>${Team}</h6>
    
    </section>`
}


const callSwitch = () => {
    console.log(formatDate(date,"time"));


    switch (true) {
        default:
            // 
            break;
        case "middag":
            console.log("chosen is middag");
            break;
        case "eftermiddag":
            console.log("chosen is eftermiddag");
    }

}

// Pseudo kode
// Nuværende og næste modul skal vises fra hvert hold
// 