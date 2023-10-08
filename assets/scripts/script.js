
var submitBtn = document.getElementById("search-team-btn")
var teams = document.getElementById("Teams")
var playerListingBox = document.getElementById("player-listing-box")
var ticketbox = document.getElementById("ticketbox")


// TICKET_MASTER_API_KEY = "ej5KUdOFhWAlarKWiXJvCsEA8v2JU98K"
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
        console.log(response)
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
        console.log(playerList[i])
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
    fetch("https://app.ticketmaster.com/discovery/v2/events.json?locale=en-us&apikey=ej5KUdOFhWAlarKWiXJvCsEA8v2JU98K&classificationName=Football&subGenreId=KZazBEonSMnZfZ7vFE1&keyword=" + selectedTeam)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        displayTickets(data)
    });
}

function displayTickets(data) {
    var ticketsContainer = document.getElementById("tickets")
    var ticketsUl = document.getElementById("tickets-ul")

    ticketsUl.innerHTML = "";

    var ticket1 = document.createElement("li");
    var ticket2 = document.createElement("li");
    var ticket3 = document.createElement("li");
    var ticket4 = document.createElement("li");
    var ticket5 = document.createElement("li");

    ticket1.textContent = data._embedded.events[0].name;
    ticket2.textContent = data._embedded.events[1].name;
    ticket3.textContent = data._embedded.events[2].name;
    ticket4.textContent = data._embedded.events[3].name;
    
    

    ticketsUl.append(ticket1, ticket2, ticket3, ticket4, ticket5);
    ticketsContainer.append(ticketsUl);
    ticketbox.append(ticketsContainer);
}
