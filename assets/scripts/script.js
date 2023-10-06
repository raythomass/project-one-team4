
var submitBtn = document.getElementById("search-team-btn")
var teams = document.getElementById("Teams")
var playerListingBox = document.getElementById("player-listing-box")

// TICKET_MASTER_API_KEY = "ej5KUdOFhWAlarKWiXJvCsEA8v2JU98K"
var footballApi = "897300b6bd665bdbe7fd8b164607c7f4" //"2160c0fdbecedae60a649ec139f1f29c"

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
    var statEl = document.getElementById("player-stats")
    statEl.innerHTML = "";

    // create the ul.
    var ulEl = document.createElement("ul") 

    // define the stat list items to display
    var college = document.createElement("li");
    var number = document.createElement("li");
    var pos = document.createElement("li");
    var group = document.createElement("li");
    var weight = document.createElement("li");
    var height = document.createElement("li");
    var salary = document.createElement("li");
    var playerImg = document.createElement("img");

    // set the stat data.
    pos.textContent = "Position: " + selectedPlayerstats.position;
    group.textContent = "Group: " + selectedPlayerstats.group;
    college.textContent = "College: " + selectedPlayerstats.college;
    number.textContent = "Jersey Number: " + selectedPlayerstats.number;
    weight.textContent = "Weight: " + selectedPlayerstats.weight;
    height.textContent = "Height: " + selectedPlayerstats.height;
    salary.textContent = "Salary: " + selectedPlayerstats.salary;
    playerImg.src = selectedPlayerstats.image

    // add to ul.
    statEl.append(playerImg)
    ulEl.append(pos, group, college, number, weight, height, salary);
    statEl.append(ulEl);
    
}
