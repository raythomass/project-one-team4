
var submitBtn = document.getElementById("search-team-btn")
var teams = document.getElementById("Teams")
var playerListing = document.getElementById("player-listing")

// TICKET_MASTER_API_KEY = "ej5KUdOFhWAlarKWiXJvCsEA8v2JU98K"
var footballApi = "897300b6bd665bdbe7fd8b164607c7f4"

submitBtn.addEventListener("click", function () {
    var selectedTeam = teams.options[teams.selectedIndex].text;
    var playerList = getTeam(selectedTeam);
    console.log(playerList);
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
            console.log(playerInfo)
            playerList.push(playerInfo)
        }
        
        return playerList;
    });
};
