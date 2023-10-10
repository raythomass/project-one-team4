
var submitBtn = document.getElementById("search-team-btn")
var teams = document.getElementById("Teams")
var playerListingBox = document.getElementById("player-listing-box")
var ticketbox = document.getElementById("ticketbox")


var ticketMasterKey = "ej5KUdOFhWAlarKWiXJvCsEA8v2JU98K"
var footballApi = "897300b6bd665bdbe7fd8b164607c7f4" //"2160c0fdbecedae60a649ec139f1f29c"

submitBtn.addEventListener("click", function () {
    var selectedTeam = teams.options[teams.selectedIndex].text;
    getTeam(selectedTeam);
    getTickets(selectedTeam);
});

function getTeam(teamName) {
    // function that gets a team and all the players.

    fetch("https://v1.american-football.api-sports.io/teams?name=" + teamName, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v1.american-football.api-sports.io",
            "x-rapidapi-key": footballApi
        }
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var teamId = data.response[0].id
        getTeamPlayers(teamId)
    });
}

function getTeamPlayers(teamId) {

    fetch("https://v1.american-football.api-sports.io/players?team=" + teamId +"&season=2023", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v1.american-football.api-sports.io",
            "x-rapidapi-key": footballApi
	    }
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        displayPlayer(data.response)
    });
};

function displayPlayer(playerList) {
    playerListingBox.innerHTML = "";

    var playerUlEl = document.createElement("select")
    
    // create the dropbox list of players
    for (var i = 0; i < playerList.length; i++) {
        var playerElement = document.createElement("option");
        playerElement.textContent = playerList[i].name;
        playerUlEl.append(playerElement);
    }
    playerListingBox.append(playerUlEl)
    
    // add an event listener to each player to display their stats if selected.
    playerListingBox.addEventListener("change", function() {
        var selectedPlayer = playerUlEl.value;
        for(var i = 0; i < playerList.length; i++) {
            if (playerList[i].name == selectedPlayer) {
                displayPlayerStats(playerList[i]);
            }
        }
    });

    displayPlayerStats(playerList[0])
}


// displayes a players stats.
function displayPlayerStats(selectedPlayerstats) {
    
    // get the box that displays stats.
    var statsContainer = document.getElementById("player-stats")
    var playerImg = document.getElementById("player-img")
    var statsUl = document.getElementById("stats-ul")

    statsUl.innerHTML = "";
    playerImg.src = "";

    // define the stat list items to display
    var college = document.createElement("li");
    var number = document.createElement("li");
    var pos = document.createElement("li");
    var group = document.createElement("li");
    var weight = document.createElement("li");
    var height = document.createElement("li");
    var salary = document.createElement("li");

    // set the stat data.
    pos.textContent = "Position: " + selectedPlayerstats.position;
    group.textContent = "Group: " + selectedPlayerstats.group;
    college.textContent = "College: " + selectedPlayerstats.college;
    number.textContent = "Jersey Number: " + selectedPlayerstats.number;
    weight.textContent = "Weight: " + selectedPlayerstats.weight;
    height.textContent = "Height: " + selectedPlayerstats.height;
    salary.textContent = "Salary: " + selectedPlayerstats.salary;
    playerImg.src = selectedPlayerstats.image

    playerImg.classList.remove("hidden")
    // add to ul.
    statsContainer.append(playerImg)
    statsUl.append(pos, group, college, number, weight, height, salary);
    statsContainer.append(statsUl);
    

}
// function for the ticketmaster API.
function getTickets(selectedTeam) {
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?locale=en-us&apikey=${ticketMasterKey}&classificationName=Football&subGenreId=KZazBEonSMnZfZ7vFE1&keyword=${selectedTeam}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        displayTickets(data)
    });
}

function convertDateTime(timestamp) {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    const formattedDate = date.toLocaleDateString();
    console.log(formattedDate);

}
function displayTickets(ticketData) {
    
    var events = ticketData._embedded.events;

    var ticketsContainer = document.getElementById("tickets")
    var ticketsUl = document.getElementById("tickets-ul")

    ticketsUl.innerHTML = "";

    for (var i = 0; i < events.length; i++) {
        var ticket = document.createElement("li");
        var event = events[i];
        var dateObject = new Date(event.dates.start.dateTime);
        var month = dateObject.toLocaleString('default', { month: 'short' });
        var day = dateObject.getUTCDate()
        var time = event.dates.start.dateTime.split("T")[1].split("Z")[0];

        ticket.innerHTML = ` 
        <div class='flex border m-2'> 
            <div class='w-full md:w-1/2 lg:w-1/3 p-2'> ${month} <br> ${day} </div>
            <div class='w-full'> ${event.name} </div>
            <a href='${event.url}' class="button w-full md:w-1/2 lg:w-1/3 p-2 border border-gray m-3"> Click me > </a>
        </div>
        `
        ticketsUl.append(ticket);
    }
    ticketsContainer.append(ticketsUl)
    ticketbox.append(ticketsContainer);

}
