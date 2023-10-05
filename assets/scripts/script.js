
var submitBtn = document.getElementById("search-team-btn")
var teams = document.getElementById("Teams")
var playerListingBox = document.getElementById("player-listing-box")

// TICKET_MASTER_API_KEY = "ej5KUdOFhWAlarKWiXJvCsEA8v2JU98K"
var footballApi = "2160c0fdbecedae60a649ec139f1f29c"

submitBtn.addEventListener("click", function () {
    var selectedTeam = teams.options[teams.selectedIndex].text;
    getTeam(selectedTeam);
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
        
        var playerList = []

        for(var i = 0; i < data.response.length; i++) {
            var playerInfo = {
                name: data.response[i].name,
                position: data.response[i].position,
                group: data.response[i].group,
                weight: data.response[i].weight,
                height: data.response[i].height,
                salary: data.response[i].salary
            }
            playerList.push(playerInfo);
        }
        displayPlayers(playerList);
    });
};

function displayPlayers(playerList) {
    
    playerListingBox.innerHTML = "";

    var playerUlEl = document.createElement("select")

    for (var i = 0; i < playerList.length; i++) {

        var playerElement = document.createElement("option");
        playerElement.textContent = playerList[i].name;
        playerUlEl.append(playerElement);
    }
    playerListingBox.append(playerUlEl)

    playerListingBox.addEventListener("change", function() {
        var selectedPlayer = playerUlEl.value;
        for(var i = 0; i < playerList.length; i++) {
            if (playerList[i].name == selectedPlayer) {
                displayPlayerStats(playerList[i]);
            }
        }
    });
}

function displayPlayerStats(selectedPlayerstats) {
    var statEl = document.getElementById("player-stats")
    statEl.innerHTML = "";

    var ulEl = document.createElement("ul");
    var pos = document.createElement("li");
    var group = document.createElement("li");
    var weight = document.createElement("li");
    var height = document.createElement("li");
    var salary = document.createElement("li");

    pos.textContent = "Position: " + selectedPlayerstats.position;
    group.textContent = "Group: " + selectedPlayerstats.group;
    weight.textContent = "Weight: " + selectedPlayerstats.weight;
    height.textContent = "Height: " + selectedPlayerstats.height;
    salary.textContent = "Salary: " + selectedPlayerstats.salary;
    
    ulEl.append(pos, group, weight, height, salary);
    statEl.append(ulEl);
    
}