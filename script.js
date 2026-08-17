/* =========================================
   EV MARKEZ
   Professional V1 JavaScript
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");


menuToggle.addEventListener("click", () => {

    mainNav.classList.toggle("active");

});


document
    .querySelectorAll(".main-nav a")
    .forEach((link) => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("active");

        });

    });


/* =========================================
   CURRENT YEAR
========================================= */

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


/* =========================================
   SAMPLE CHARGING STATION DATA

   This is temporary V1 data.

   Later this can come from:
   - Supabase
   - Firebase
   - Your own API
   - Charging station API
========================================= */

const stations = [

    {
        id: 1,

        name: "EV Power Hub Gulberg",

        city: "Lahore",

        area: "Gulberg III",

        status: "working",

        statusText: "Working",

        distance: "2.4 km",

        chargers: 6,

        available: 4,

        speed: "120 kW",

        connector: "CCS2",

        updated: "8 min ago"
    },


    {
        id: 2,

        name: "ChargePoint DHA",

        city: "Lahore",

        area: "DHA Phase 5",

        status: "busy",

        statusText: "Very Busy",

        distance: "5.1 km",

        chargers: 8,

        available: 1,

        speed: "180 kW",

        connector: "CCS2",

        updated: "4 min ago"
    },


    {
        id: 3,

        name: "Islamabad EV Fast Charge",

        city: "Islamabad",

        area: "Blue Area",

        status: "working",

        statusText: "Working",

        distance: "3.8 km",

        chargers: 4,

        available: 3,

        speed: "150 kW",

        connector: "CCS2",

        updated: "12 min ago"
    },


    {
        id: 4,

        name: "Motorway EV Charging Point",

        city: "Islamabad",

        area: "M-2 Service Area",

        status: "maintenance",

        statusText: "Maintenance",

        distance: "18 km",

        chargers: 6,

        available: 0,

        speed: "120 kW",

        connector: "CCS2",

        updated: "28 min ago"
    },


    {
        id: 5,

        name: "Karachi Electric Charge Hub",

        city: "Karachi",

        area: "Clifton",

        status: "offline",

        statusText: "Not Working",

        distance: "7.2 km",

        chargers: 4,

        available: 0,

        speed: "60 kW",

        connector: "CCS2",

        updated: "16 min ago"
    },


    {
        id: 6,

        name: "Ocean Mall EV Charging",

        city: "Karachi",

        area: "Clifton",

        status: "closed",

        statusText: "Closed",

        distance: "8.5 km",

        chargers: 3,

        available: 0,

        speed: "22 kW",

        connector: "Type 2",

        updated: "1 hr ago"
    }

];


/* =========================================
   ELEMENTS
========================================= */

const stationGrid =
    document.getElementById("stationGrid");

const stationSearch =
    document.getElementById("stationSearch");

const filterButtons =
    document.querySelectorAll(".filter-button");

const emptyState =
    document.getElementById("emptyState");

const heroSearchForm =
    document.getElementById("heroSearchForm");

const heroSearchInput =
    document.getElementById("heroSearchInput");

const quickSearchButtons =
    document.querySelectorAll(".quick-search");


let selectedStatus = "all";


/* =========================================
   CREATE STATION CARD
========================================= */

function createStationCard(station) {

    const availableText =
        station.status === "working" ||
        station.status === "busy"
            ? `${station.available}/${station.chargers}`
            : `0/${station.chargers}`;


    return `
        <article class="station-card">

            <div class="station-card-top">

                <span
                    class="station-status ${station.status}"
                >
                    ${station.statusText}
                </span>

                <span class="station-distance">
                    ${station.distance}
                </span>

            </div>


            <h3>
                ${station.name}
            </h3>


            <div class="station-location">
                <span>⌖</span>

                ${station.area}, ${station.city}
            </div>


            <div class="station-info">

                <div>
                    <span>Available</span>
                    <strong>
                        ${availableText}
                    </strong>
                </div>


                <div>
                    <span>Max Speed</span>
                    <strong>
                        ${station.speed}
                    </strong>
                </div>


                <div>
                    <span>Connector</span>
                    <strong>
                        ${station.connector}
                    </strong>
                </div>

            </div>


            <div class="station-card-footer">

                <span class="station-updated">
                    Updated ${station.updated}
                </span>

                <a href="#">
                    View Station →
                </a>

            </div>

        </article>
    `;

}


/* =========================================
   DISPLAY STATIONS
========================================= */

function displayStations(stationsToDisplay) {

    stationGrid.innerHTML = "";


    if (stationsToDisplay.length === 0) {

        stationGrid.style.display = "none";

        emptyState.hidden = false;

        return;

    }


    stationGrid.style.display = "grid";

    emptyState.hidden = true;


    stationsToDisplay.forEach((station) => {

        stationGrid.insertAdjacentHTML(
            "beforeend",
            createStationCard(station)
        );

    });

}


/* =========================================
   FILTER STATIONS
========================================= */

function filterStations() {

    const searchTerm =
        stationSearch.value
            .trim()
            .toLowerCase();


    const filteredStations =
        stations.filter((station) => {

            const matchesSearch =

                station.name
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                station.city
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                station.area
                    .toLowerCase()
                    .includes(searchTerm);


            const matchesStatus =

                selectedStatus === "all"

                ||

                station.status === selectedStatus;


            return (
                matchesSearch &&
                matchesStatus
            );

        });


    displayStations(filteredStations);

}


/* =========================================
   SEARCH EVENT
========================================= */

stationSearch.addEventListener(
    "input",
    filterStations
);


/* =========================================
   STATUS FILTERS
========================================= */

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        filterButtons.forEach((btn) => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        selectedStatus =
            button.dataset.status;


        filterStations();

    });

});


/* =========================================
   HERO SEARCH
========================================= */

heroSearchForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const value =
            heroSearchInput.value.trim();


        stationSearch.value = value;


        filterStations();


        document
            .getElementById("stations")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


/* =========================================
   POPULAR CITY SEARCH
========================================= */

quickSearchButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const city =
            button.dataset.search;


        heroSearchInput.value = city;

        stationSearch.value = city;


        selectedStatus = "all";


        filterButtons.forEach((btn) => {

            btn.classList.remove("active");

        });


        const allButton =
            document.querySelector(
                '[data-status="all"]'
            );


        allButton.classList.add("active");


        filterStations();


        document
            .getElementById("stations")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});


/* =========================================
   INITIAL LOAD
========================================= */

displayStations(stations);
