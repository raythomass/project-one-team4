
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
    
    var statEl = document.getElementById("player-stats")
    statEl.innerHTML = "";

    var ulEl = document.createElement("ul");
    var college = document.createElement("ul");
    var number = document.createElement("ul");
    var pos = document.createElement("li");
    var group = document.createElement("li");
    var weight = document.createElement("li");
    var height = document.createElement("li");
    var salary = document.createElement("li");
    var playerImg = document.createElement("img");

    pos.textContent = "Position: " + selectedPlayerstats.position;
    group.textContent = "Group: " + selectedPlayerstats.group;
    college.textContent = "College: " + selectedPlayerstats.college;
    number.textContent = "Jersey Number: " + selectedPlayerstats.number;
    weight.textContent = "Weight: " + selectedPlayerstats.weight;
    height.textContent = "Height: " + selectedPlayerstats.height;
    salary.textContent = "Salary: " + selectedPlayerstats.salary;
    playerImg.src = selectedPlayerstats.image
    playerImg.alt = "Player picture not found."
    
    statEl.append(playerImg)
    ulEl.append(pos, group, college, number, weight, height, salary);
    statEl.append(ulEl);
    
}

var testData = [
    {
        "id": 390,
        "name": "Geoff Swaim",
        "age": 30,
        "height": "6' 4\"",
        "weight": "260 lbs",
        "college": "Texas",
        "group": "Offense",
        "position": "TE",
        "number": 87,
        "salary": "$1,700,000",
        "experience": 9,
        "image": "https://media-4.api-sports.io/american-football/players/390.png"
    },
    {
        "id": 407,
        "name": "Kevin Strong",
        "age": 27,
        "height": "6' 4\"",
        "weight": "295 lbs",
        "college": "UTSA",
        "group": "Defense",
        "position": "DE",
        "number": 92,
        "salary": "$1,016,250",
        "experience": 5,
        "image": "https://media-4.api-sports.io/american-football/players/407.png"
    },
    {
        "id": 507,
        "name": "Josh Woods",
        "age": 27,
        "height": "6' 1\"",
        "weight": "230 lbs",
        "college": "Maryland",
        "group": "Defense",
        "position": "LB",
        "number": 10,
        "salary": "$1,232,500",
        "experience": 5,
        "image": "https://media-4.api-sports.io/american-football/players/507.png"
    },
    {
        "id": 515,
        "name": "Bobby Price",
        "age": 25,
        "height": "6' 4\"",
        "weight": "205 lbs",
        "college": "Norfolk State",
        "group": "Defense",
        "position": "CB",
        "number": 26,
        "salary": "$289,800",
        "experience": 4,
        "image": "https://media-4.api-sports.io/american-football/players/515.png"
    },
    {
        "id": 519,
        "name": "JuJu Hughes",
        "age": 25,
        "height": "5' 11\"",
        "weight": "191 lbs",
        "college": "Fresno State",
        "group": "Defense",
        "position": "S",
        "number": 36,
        "salary": "0-",
        "experience": 4,
        "image": "https://media-4.api-sports.io/american-football/players/519.png"
    },
    {
        "id": 600,
        "name": "Jovante Moffatt",
        "age": 26,
        "height": "5' 11\"",
        "weight": "213 lbs",
        "college": "Middle Tennessee",
        "group": "Defense",
        "position": "S",
        "number": 38,
        "salary": "$216,000",
        "experience": 3,
        "image": "https://media-4.api-sports.io/american-football/players/600.png"
    },
    {
        "id": 606,
        "name": "Joshua Dobbs",
        "age": 28,
        "height": "6' 3\"",
        "weight": "216 lbs",
        "college": "Tennessee",
        "group": "Offense",
        "position": "QB",
        "number": 9,
        "salary": "$1,500,000",
        "experience": 7,
        "image": "https://media-4.api-sports.io/american-football/players/606.png"
    },
    {
        "id": 752,
        "name": "Colt McCoy",
        "age": 36,
        "height": "6' 1\"",
        "weight": "212 lbs",
        "college": "Texas",
        "group": "Offense",
        "position": "QB",
        "number": 12,
        "salary": "($3,500,000)",
        "experience": 14,
        "image": "https://media-4.api-sports.io/american-football/players/752.png"
    },
    {
        "id": 756,
        "name": "James Conner",
        "age": 28,
        "height": "6' 1\"",
        "weight": "233 lbs",
        "college": "Pittsburgh",
        "group": "Offense",
        "position": "RB",
        "number": 6,
        "salary": "$9,445,000",
        "experience": 7,
        "image": "https://media-4.api-sports.io/american-football/players/756.png"
    },
    {
        "id": 757,
        "name": "Keaontay Ingram",
        "age": 23,
        "height": "6' 0\"",
        "weight": "221 lbs",
        "college": "USC",
        "group": "Offense",
        "position": "RB",
        "number": 30,
        "salary": "$912,648",
        "experience": 2,
        "image": "https://media-4.api-sports.io/american-football/players/757.png"
    },
    {
        "id": 760,
        "name": "Andre Baccellia",
        "age": 26,
        "height": "5' 10\"",
        "weight": "175 lbs",
        "college": "Washington",
        "group": "Offense",
        "position": "WR",
        "number": 82,
        "salary": "$216,000",
        "experience": 2,
        "image": "https://media-4.api-sports.io/american-football/players/760.png"
    },
    {
        "id": 763,
        "name": "Marquise Brown",
        "age": 26,
        "height": "5' 9\"",
        "weight": "180 lbs",
        "college": "Oklahoma",
        "group": "Offense",
        "position": "WR",
        "number": 2,
        "salary": "$13,413,000",
        "experience": 5,
        "image": "https://media-4.api-sports.io/american-football/players/763.png"
    },
    {
        "id": 764,
        "name": "Greg Dortch",
        "age": 25,
        "height": "5' 7\"",
        "weight": "175 lbs",
        "college": "Wake Forest",
        "group": "Offense",
        "position": "WR",
        "number": 83,
        "salary": "$1,010,000",
        "experience": 3,
        "image": "https://media-4.api-sports.io/american-football/players/764.png"
    },
    {
        "id": 768,
        "name": "Rondale Moore",
        "age": 23,
        "height": "5' 7\"",
        "weight": "180 lbs",
        "college": "Purdue",
        "group": "Offense",
        "position": "WR",
        "number": 4,
        "salary": "$1,888,429",
        "experience": 3,
        "image": "https://media-4.api-sports.io/american-football/players/768.png"
    },
    {
        "id": 772,
        "name": "Zach Ertz",
        "age": 32,
        "height": "6' 5\"",
        "weight": "250 lbs",
        "college": "Stanford",
        "group": "Offense",
        "position": "TE",
        "number": 86,
        "salary": "$11,605,000",
        "experience": 11,
        "image": "https://media-4.api-sports.io/american-football/players/772.png"
    },
    {
        "id": 773,
        "name": "Trey McBride",
        "age": 23,
        "height": "6' 4\"",
        "weight": "246 lbs",
        "college": "Colorado State",
        "group": "Offense",
        "position": "TE",
        "number": 85,
        "salary": "$1,431,741",
        "experience": 2,
        "image": "https://media-4.api-sports.io/american-football/players/773.png"
    },
    {
        "id": 774,
        "name": "Bernhard Seikovits",
        "age": 26,
        "height": "6' 5\"",
        "weight": "262 lbs",
        "college": null,
        "group": "Offense",
        "position": "TE",
        "number": 80,
        "salary": "-",
        "experience": 1,
        "image": "https://media-4.api-sports.io/american-football/players/774.png"
    },
    {
        "id": 792,
        "name": "Jonathan Ledbetter",
        "age": 26,
        "height": "6' 4\"",
        "weight": "282 lbs",
        "college": "Georgia",
        "group": "Defense",
        "position": "DE",
        "number": 93,
        "salary": "$870,000",
        "experience": 3,
        "image": "https://media-4.api-sports.io/american-football/players/792.png"
    },
    {
        "id": 795,
        "name": "Leki Fotu",
        "age": 25,
        "height": "6' 5\"",
        "weight": "334 lbs",
        "college": "Utah",
        "group": "Defense",
        "position": "DT",
        "number": 95,
        "salary": "$1,203,368",
        "experience": 4,
        "image": "https://media-4.api-sports.io/american-football/players/795.png"
    },
    {
        "id": 797,
        "name": "Rashard Lawrence",
        "age": 25,
        "height": "6' 2\"",
        "weight": "308 lbs",
        "college": "LSU",
        "group": "Defense",
        "position": "DT",
        "number": 97,
        "salary": "$370,800",
        "experience": 4,
        "image": "https://media-4.api-sports.io/american-football/players/797.png"
    },
    {
        "id": 799,
        "name": "Zaven Collins",
        "age": 24,
        "height": "6' 4\"",
        "weight": "260 lbs",
        "college": "Tulsa",
        "group": "Defense",
        "position": "LB",
        "number": 25,
        "salary": "$4,006,434",
        "experience": 3,
        "image": "https://media-4.api-sports.io/american-football/players/799.png"
    },
    {
        "id": 800,
        "name": "Victor Dimukeje",
        "age": 23,
        "height": "6' 2\"",
        "weight": "262 lbs",
        "college": "Duke",
        "group": "Defense",
        "position": "LB",
        "number": 52,
        "salary": "$980,465",
        "experience": 3,
        "image": "https://media-4.api-sports.io/american-football/players/800.png"
    },
    {
        "id": 801,
        "name": "Dennis Gardeck",
        "age": 29,
        "height": "6' 0\"",
        "weight": "232 lbs",
        "college": "Sioux Falls",
        "group": "Defense",
        "position": "LB",
        "number": 45,
        "salary": "$4,216,666",
        "experience": 6,
        "image": "https://media-4.api-sports.io/american-football/players/801.png"
    },
    {
        "id": 804,
        "name": "Jesse Luketa",
        "age": 24,
        "height": "6' 3\"",
        "weight": "253 lbs",
        "college": "Penn State",
        "group": "Defense",
        "position": "LB",
        "number": 43,
        "salary": "$870,000",
        "experience": 2,
        "image": "https://media-4.api-sports.io/american-football/players/804.png"
    },
    {
        "id": 807,
        "name": "Isaiah Simmons",
        "age": 25,
        "height": "6' 4\"",
        "weight": "238 lbs",
        "college": "Clemson",
        "group": "Defense",
        "position": "S",
        "number": 19,
        "salary": "$1,010,000",
        "experience": 4,
        "image": "https://media-4.api-sports.io/american-football/players/807.png"
    },
    {
        "id": 808,
        "name": "Cameron Thomas",
        "age": 23,
        "height": "6' 4\"",
        "weight": "267 lbs",
        "college": "San Diego State",
        "group": "Defense",
        "position": "LB",
        "number": 97,
        "salary": null,
        "experience": 2,
        "image": "https://media-4.api-sports.io/american-football/players/808.png"
    },
    {
        "id": 809,
        "name": "Ezekiel Turner",
        "age": 27,
        "height": "6' 2\"",
        "weight": "214 lbs",
        "college": "Washington",
        "group": "Defense",
        "position": "LB",
        "number": 47,
        "salary": "$1,232,500",
        "experience": 6,
        "image": "https://media-4.api-sports.io/american-football/players/809.png"
    },
    {
        "id": 813,
        "name": "Nate Hairston",
        "age": 29,
        "height": "6' 0\"",
        "weight": "185 lbs",
        "college": "Temple",
        "group": "Defense",
        "position": "CB",
        "number": 27,
        "salary": "0-",
        "experience": 6,
        "image": "https://media-4.api-sports.io/american-football/players/813.png"
    },
    {
        "id": 814,
        "name": "Antonio Hamilton",
        "age": 30,
        "height": "6' 0\"",
        "weight": "195 lbs",
        "college": "South Carolina State",
        "group": "Defense",
        "position": "CB",
        "number": 33,
        "salary": null,
        "experience": 8,
        "image": "https://media-4.api-sports.io/american-football/players/814.png"
    },
    {
        "id": 815,
        "name": "Christian Matthew",
        "age": 26,
        "height": "6' 2\"",
        "weight": "195 lbs",
        "college": "Valdosta State",
        "group": "Defense",
        "position": "CB",
        "number": 25,
        "salary": "$168,000",
        "experience": 2,
        "image": "https://media-4.api-sports.io/american-football/players/815.png"
    },
    {
        "id": 819,
        "name": "Marco Wilson",
        "age": 24,
        "height": "6' 0\"",
        "weight": "191 lbs",
        "college": "Florida",
        "group": "Defense",
        "position": "CB",
        "number": 20,
        "salary": "$1,102,595",
        "experience": 3,
        "image": "https://media-4.api-sports.io/american-football/players/819.png"
    },
    {
        "id": 820,
        "name": "Budda Baker",
        "age": 27,
        "height": "5' 10\"",
        "weight": "195 lbs",
        "college": "Washington",
        "group": "Defense",
        "position": "S",
        "number": 3,
        "salary": "$17,901,471",
        "experience": 7,
        "image": "https://media-4.api-sports.io/american-football/players/820.png"
    },
    {
        "id": 824,
        "name": "Jalen Thompson",
        "age": 25,
        "height": "5' 11\"",
        "weight": "190 lbs",
        "college": "Washington State",
        "group": "Defense",
        "position": "S",
        "number": 34,
        "salary": "$5,287,750",
        "experience": 5,
        "image": "https://media-4.api-sports.io/american-football/players/824.png"
    },
    {
        "id": 826,
        "name": "Matt Prater",
        "age": 39,
        "height": "5' 10\"",
        "weight": "201 lbs",
        "college": "UCF",
        "group": "Special Teams",
        "position": "PK",
        "number": 5,
        "salary": "$2,750,000",
        "experience": 17,
        "image": "https://media-4.api-sports.io/american-football/players/826.png"
    },
    {
        "id": 841,
        "name": "Zach Pascal",
        "age": 28,
        "height": "6' 2\"",
        "weight": "215 lbs",
        "college": "Old Dominion",
        "group": "Offense",
        "position": "WR",
        "number": 0,
        "salary": "$1,830,000",
        "experience": 6,
        "image": "https://media-4.api-sports.io/american-football/players/841.png"
    },
    {
        "id": 850,
        "name": "Noah Togiai",
        "age": 26,
        "height": "6' 4\"",
        "weight": "244 lbs",
        "college": "Oregon State",
        "group": "Offense",
        "position": "TE",
        "number": 88,
        "salary": "$168,000",
        "experience": 2,
        "image": "https://media-4.api-sports.io/american-football/players/850.png"
    },
    {
        "id": 885,
        "name": "Kyzir White",
        "age": 27,
        "height": "6' 2\"",
        "weight": "234 lbs",
        "college": "West Virginia",
        "group": "Defense",
        "position": "LB",
        "number": 7,
        "salary": "$3,250,000",
        "experience": 6,
        "image": "https://media-4.api-sports.io/american-football/players/885.png"
    },
    {
        "id": 895,
        "name": "Andre Chachere",
        "age": 27,
        "height": "6' 0\"",
        "weight": "197 lbs",
        "college": "San JosÃ© State",
        "group": "Defense",
        "position": "S",
        "number": 36,
        "salary": "$887,774",
        "experience": 3,
        "image": "https://media-4.api-sports.io/american-football/players/895.png"
    },
    {
        "id": 898,
        "name": "K'Von Wallace",
        "age": 26,
        "height": "5' 11\"",
        "weight": "205 lbs",
        "college": "Clemson",
        "group": "Defense",
        "position": "S",
        "number": 22,
        "salary": "$1,010,000",
        "experience": 4,
        "image": "https://media-4.api-sports.io/american-football/players/898.png"
    },
    {
        "id": 1089,
        "name": "Krys Barnes",
        "age": 25,
        "height": "6' 2\"",
        "weight": "229 lbs",
        "college": "UCLA",
        "group": "Defense",
        "position": "LB",
        "number": 51,
        "salary": "$1,035,000",
        "experience": 4,
        "image": "https://media-4.api-sports.io/american-football/players/1089.png"
    },
    {
        "id": 1406,
        "name": "Sean Chandler",
        "age": 27,
        "height": "5' 10\"",
        "weight": "200 lbs",
        "college": "Temple",
        "group": "Defense",
        "position": "S",
        "number": 32,
        "salary": "0-",
        "experience": 5,
        "image": "https://media-4.api-sports.io/american-football/players/1406.png"
    },
    {
        "id": 1477,
        "name": "Kyler McMichael",
        "age": 23,
        "height": "6' 0\"",
        "weight": "202 lbs",
        "college": "North Carolina",
        "group": "Defense",
        "position": "CB",
        "number": 48,
        "salary": "$450,000",
        "experience": 1,
        "image": "https://media-4.api-sports.io/american-football/players/1477.png"
    },
    {
        "id": 1559,
        "name": "Matt Haack",
        "age": 29,
        "height": "6' 0\"",
        "weight": "205 lbs",
        "college": "Arizona State",
        "group": "Special Teams",
        "position": "P",
        "number": 26,
        "salary": "0-",
        "experience": 7,
        "image": "https://media-4.api-sports.io/american-football/players/1559.png"
    },
    {
        "id": 1604,
        "name": "David Anenih",
        "age": 24,
        "height": "6' 2\"",
        "weight": "245 lbs",
        "college": "Houston",
        "group": "Defense",
        "position": "LB",
        "number": 57,
        "salary": "0-",
        "experience": 2,
        "image": "https://media-4.api-sports.io/american-football/players/1604.png"
    },
    {
        "id": 1661,
        "name": "L.J. Collier",
        "age": 28,
        "height": "6' 2\"",
        "weight": "291 lbs",
        "college": "TCU",
        "group": "Defense",
        "position": "DE",
        "number": 91,
        "salary": "$676,944",
        "experience": 5,
        "image": "https://media-4.api-sports.io/american-football/players/1661.png"
    },
    {
        "id": 1895,
        "name": "Roy Lopez",
        "age": 26,
        "height": "6' 2\"",
        "weight": "318 lbs",
        "college": "Arizona",
        "group": "Defense",
        "position": "DT",
        "number": 98,
        "salary": "$783,333",
        "experience": 3,
        "image": "https://media-4.api-sports.io/american-football/players/1895.png"
    },
    {
        "id": 2089,
        "name": "Brandon Smith",
        "age": 24,
        "height": "6' 2\"",
        "weight": "220 lbs",
        "college": "Iowa",
        "group": "Offense",
        "position": "WR",
        "number": 89,
        "salary": "0-",
        "experience": 1,
        "image": "https://media-4.api-sports.io/american-football/players/2089.png"
    },
    {
        "id": 2118,
        "name": "Carlos Watkins",
        "age": 29,
        "height": "6' 3\"",
        "weight": "305 lbs",
        "college": "Clemson",
        "group": "Defense",
        "position": "DT",
        "number": 94,
        "salary": "$1,570,000",
        "experience": 7,
        "image": "https://media-4.api-sports.io/american-football/players/2118.png"
    },
    {
        "id": 2307,
        "name": "David Blough",
        "age": 28,
        "height": "6' 1\"",
        "weight": "207 lbs",
        "college": "Purdue",
        "group": "Offense",
        "position": "QB",
        "number": 10,
        "salary": "$370,800",
        "experience": 4,
        "image": "https://media-4.api-sports.io/american-football/players/2307.png"
    },
    {
        "id": 2365,
        "name": "Kris Boyd",
        "age": 27,
        "height": "5' 11\"",
        "weight": "195 lbs",
        "college": "Texas",
        "group": "Defense",
        "position": "CB",
        "number": 29,
        "salary": "$1,092,500",
        "experience": 5,
        "image": "https://media-4.api-sports.io/american-football/players/2365.png"
    },
    {
        "id": 2546,
        "name": "Corey Clement",
        "age": 28,
        "height": "5' 10\"",
        "weight": "220 lbs",
        "college": "Wisconsin",
        "group": "Offense",
        "position": "RB",
        "number": 23,
        "salary": "$289,800",
        "experience": 7,
        "image": "https://media-4.api-sports.io/american-football/players/2546.png"
    },
    {
        "id": 2658,
        "name": "Nolan Cooney",
        "age": 27,
        "height": "6' 3\"",
        "weight": "202 lbs",
        "college": "Syracuse",
        "group": "Special Teams",
        "position": "P",
        "number": 16,
        "salary": "$750,000",
        "experience": 1,
        "image": "https://media-4.api-sports.io/american-football/players/2658.png"
    },
    {
        "id": 2685,
        "name": "Ty'Son Williams",
        "age": 26,
        "height": "6' 0\"",
        "weight": "220 lbs",
        "college": "BYU",
        "group": "Offense",
        "position": "RB",
        "number": 22,
        "salary": "0-",
        "experience": 2,
        "image": "https://media-4.api-sports.io/american-football/players/2685.png"
    },
    {
        "id": 2707,
        "name": "Stevie Scott III",
        "age": 23,
        "height": "6' 1\"",
        "weight": "231 lbs",
        "college": "Indiana",
        "group": "Offense",
        "position": "RB",
        "number": 49,
        "salary": null,
        "experience": null,
        "image": "https://media-4.api-sports.io/american-football/players/2707.png"
    },
    {
        "id": 2810,
        "name": "Ben Stille",
        "age": 25,
        "height": "6' 4\"",
        "weight": "296 lbs",
        "college": "Nebraska",
        "group": "Defense",
        "position": "DE",
        "number": 64,
        "salary": "$216,000",
        "experience": 2,
        "image": "https://media-4.api-sports.io/american-football/players/2810.png"
    },
    {
        "id": 2845,
        "name": "Kaden Davis",
        "age": 25,
        "height": "6' 1\"",
        "weight": "190 lbs",
        "college": null,
        "group": "Offense",
        "position": "WR",
        "number": 39,
        "salary": "$216,000",
        "experience": 1,
        "image": "https://media-4.api-sports.io/american-football/players/2845.png"
    },
    {
        "id": 2858,
        "name": "Zach McCloud",
        "age": 25,
        "height": "6' 2\"",
        "weight": "235 lbs",
        "college": "Miami",
        "group": "Defense",
        "position": "LB",
        "number": 53,
        "salary": "0-",
        "experience": 1,
        "image": "https://media-4.api-sports.io/american-football/players/2858.png"
    },
    {
        "id": 2891,
        "name": "Eric Banks",
        "age": 25,
        "height": "6' 5\"",
        "weight": "274 lbs",
        "college": "UTSA",
        "group": "Defense",
        "position": "DE",
        "number": 96,
        "salary": "$216,000",
        "experience": 2,
        "image": "https://media-4.api-sports.io/american-football/players/2891.png"
    },
    {
        "id": 3054,
        "name": "Davion Davis",
        "age": 26,
        "height": "5' 11\"",
        "weight": "195 lbs",
        "college": "Sam Houston State",
        "group": "Offense",
        "position": "WR",
        "number": 10,
        "salary": "0-",
        "experience": 2,
        "image": "https://media-4.api-sports.io/american-football/players/3054.png"
    },
    {
        "id": 7084,
        "name": "Brian Cobbs",
        "age": 23,
        "height": "6' 1\"",
        "weight": "206 lbs",
        "college": "Utah State",
        "group": "Offense",
        "position": "WR",
        "number": 38,
        "salary": "0-",
        "experience": null,
        "image": "https://media-4.api-sports.io/american-football/players/7084.png"
    },
    {
        "id": 9356,
        "name": "Dante Stills",
        "age": 23,
        "height": "6' 4\"",
        "weight": "286 lbs",
        "college": "West Virginia",
        "group": "Defense",
        "position": "DT",
        "number": 55,
        "salary": "$783,334",
        "experience": null,
        "image": "https://media-4.api-sports.io/american-football/players/9356.png"
    },
    {
        "id": 9442,
        "name": "Blake Whiteheart",
        "age": 23,
        "height": "6' 4\"",
        "weight": "247 lbs",
        "college": "Wake Forest",
        "group": "Offense",
        "position": "TE",
        "number": 47,
        "salary": "$216,000",
        "experience": null,
        "image": "https://media-4.api-sports.io/american-football/players/9442.png"
    },
    {
        "id": 11914,
        "name": "Kyle Soelle",
        "age": 24,
        "height": "6' 3\"",
        "weight": "232 lbs",
        "college": "Arizona State",
        "group": "Defense",
        "position": "LB",
        "number": 58,
        "salary": "($60,000)",
        "experience": null,
        "image": "https://media-4.api-sports.io/american-football/players/11914.png"
    },
    {
        "id": 12560,
        "name": "Jacob Slade",
        "age": 23,
        "height": "6' 3\"",
        "weight": "293 lbs",
        "college": "Michigan State",
        "group": "Defense",
        "position": "DT",
        "number": 79,
        "salary": "$180,000",
        "experience": null,
        "image": "https://media-4.api-sports.io/american-football/players/12560.png"
    },
    {
        "id": 12575,
        "name": "Kendell Brooks",
        "age": 23,
        "height": "6' 0\"",
        "weight": "206 lbs",
        "college": "Michigan State",
        "group": "Defense",
        "position": "S",
        "number": 28,
        "salary": "($80,000)",
        "experience": null,
        "image": "https://media-4.api-sports.io/american-football/players/12575.png"
    },
    {
        "id": 13858,
        "name": "Daniel Arias",
        "age": 25,
        "height": "6' 3\"",
        "weight": "216 lbs",
        "college": "Colorado",
        "group": "Offense",
        "position": "WR",
        "number": 0,
        "salary": "$180,000",
        "experience": null,
        "image": "https://media-4.api-sports.io/american-football/players/13858.png"
    },
    {
        "id": 13966,
        "name": "Emari Demercado",
        "age": 24,
        "height": "5' 9\"",
        "weight": "215 lbs",
        "college": "TCU",
        "group": "Offense",
        "position": "RB",
        "number": 31,
        "salary": "$755,000",
        "experience": null,
        "image": "https://media-4.api-sports.io/american-football/players/13966.png"
    },
    {
        "id": 15130,
        "name": "Joel Honigford",
        "age": 25,
        "height": "6' 4\"",
        "weight": "259 lbs",
        "college": "Michigan",
        "group": "Offense",
        "position": "TE",
        "number": 42,
        "salary": "($75,000)",
        "experience": null,
        "image": "https://media-4.api-sports.io/american-football/players/15130.png"
    },
    {
        "id": 17311,
        "name": "Clayton Tune",
        "age": 24,
        "height": "6' 3\"",
        "weight": "220 lbs",
        "college": "Houston",
        "group": "Offense",
        "position": "QB",
        "number": 15,
        "salary": "$837,656",
        "experience": null,
        "image": "https://media-4.api-sports.io/american-football/players/17311.png"
    },
    {
        "id": 21641,
        "name": "Owen Pappoe",
        "age": 23,
        "height": "6' 0\"",
        "weight": "225 lbs",
        "college": "Auburn",
        "group": "Defense",
        "position": "LB",
        "number": 44,
        "salary": "$811,244",
        "experience": null,
        "image": "https://media-4.api-sports.io/american-football/players/21641.png"
    },
    {
        "id": 23966,
        "name": "Michael Wilson",
        "age": 23,
        "height": "6' 2\"",
        "weight": "213 lbs",
        "college": "Stanford",
        "group": "Offense",
        "position": "WR",
        "number": 14,
        "salary": "$970,811",
        "experience": null,
        "image": "https://media-4.api-sports.io/american-football/players/23966.png"
    },
    {
        "id": 24819,
        "name": "Kei'Trel Clark",
        "age": 22,
        "height": "5' 10\"",
        "weight": "181 lbs",
        "college": "Louisville",
        "group": "Defense",
        "position": "CB",
        "number": 13,
        "salary": "$802,153",
        "experience": null,
        "image": "https://media-4.api-sports.io/american-football/players/24819.png"
    },
    {
        "id": 25806,
        "name": "BJ Ojulari",
        "age": 21,
        "height": "6' 2\"",
        "weight": "248 lbs",
        "college": "LSU",
        "group": "Defense",
        "position": "LB",
        "number": 18,
        "salary": null,
        "experience": null,
        "image": "https://media-4.api-sports.io/american-football/players/25806.png"
    }
]

displayPlayer(testData)