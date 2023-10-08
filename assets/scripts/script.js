
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
    fetch("https://app.ticketmaster.com/discovery/v2/events.json?locale=en-us&apikey=ej5KUdOFhWAlarKWiXJvCsEA8v2JU98K&classificationName=Football&subGenreId=KZazBEonSMnZfZ7vFE1&keyword=" + selectedTeam)
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
        var date = new Date(event.dates.start.dateTime).toLocaleDateString();
        var time = event.dates.start.dateTime.split("T")[1].remove("Z","");
        console.log(time)
        ticket.innerHTML = ` ${event.name} <br> Time: ${date} <br> ${time}`
        ticketsUl.append(ticket);
    }
    ticketsContainer.append(ticketsUl)
    ticketbox.append(ticketsContainer);

    // var ticket1 = document.createElement("li");
    // var ticket2 = document.createElement("li");
    // var ticket3 = document.createElement("li");
    // var ticket4 = document.createElement("li");
    // var ticket5 = document.createElement("li");

    // ticket1.textContent = ticketData._embedded.events[0].name;
    // ticket2.textContent = ticketData._embedded.events[1].name;
    // ticket3.textContent = ticketData._embedded.events[2].name;
    // ticket4.textContent = ticketData._embedded.events[3].name;


    // ticketsUl.append(ticket1, ticket2, ticket3, ticket4, ticket5);
    // ticketsContainer.append(ticketsUl);
    // ticketbox.append(ticketsContainer);
}

var tickets = {
    "_embedded": {
        "events": [
            {
                "name": "Seattle Seahawks vs. Arizona Cardinals",
                "type": "event",
                "id": "vvG1HZ9txxVp2w",
                "test": false,
                "url": "https://www.ticketmaster.com/seattle-seahawks-vs-arizona-cardinals-seattle-washington-10-22-2023/event/0F005E98A2D163F2",
                "locale": "en-us",
                "images": [
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/c75/edea12b6-7239-4bdf-a0bb-afa002d9ec75_1325461_RETINA_PORTRAIT_16_9.jpg",
                        "width": 640,
                        "height": 360,
                        "fallback": false
                    },
                    {
                        "ratio": "4_3",
                        "url": "https://s1.ticketm.net/dam/a/c75/edea12b6-7239-4bdf-a0bb-afa002d9ec75_1325461_CUSTOM.jpg",
                        "width": 305,
                        "height": 225,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/c75/edea12b6-7239-4bdf-a0bb-afa002d9ec75_1325461_RECOMENDATION_16_9.jpg",
                        "width": 100,
                        "height": 56,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/c75/edea12b6-7239-4bdf-a0bb-afa002d9ec75_1325461_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                        "width": 2048,
                        "height": 1152,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/c75/edea12b6-7239-4bdf-a0bb-afa002d9ec75_1325461_TABLET_LANDSCAPE_3_2.jpg",
                        "width": 1024,
                        "height": 683,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/c75/edea12b6-7239-4bdf-a0bb-afa002d9ec75_1325461_RETINA_LANDSCAPE_16_9.jpg",
                        "width": 1136,
                        "height": 639,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/c75/edea12b6-7239-4bdf-a0bb-afa002d9ec75_1325461_TABLET_LANDSCAPE_16_9.jpg",
                        "width": 1024,
                        "height": 576,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/c75/edea12b6-7239-4bdf-a0bb-afa002d9ec75_1325461_ARTIST_PAGE_3_2.jpg",
                        "width": 305,
                        "height": 203,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/c75/edea12b6-7239-4bdf-a0bb-afa002d9ec75_1325461_RETINA_PORTRAIT_3_2.jpg",
                        "width": 640,
                        "height": 427,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/c75/edea12b6-7239-4bdf-a0bb-afa002d9ec75_1325461_EVENT_DETAIL_PAGE_16_9.jpg",
                        "width": 205,
                        "height": 115,
                        "fallback": false
                    }
                ],
                "sales": {
                    "public": {
                        "startDateTime": "2023-05-12T00:00:00Z",
                        "startTBD": false,
                        "startTBA": false,
                        "endDateTime": "2023-10-22T20:05:00Z"
                    }
                },
                "dates": {
                    "start": {
                        "localDate": "2023-10-22",
                        "localTime": "13:05:00",
                        "dateTime": "2023-10-22T20:05:00Z",
                        "dateTBD": false,
                        "dateTBA": false,
                        "timeTBA": false,
                        "noSpecificTime": false
                    },
                    "timezone": "America/Los_Angeles",
                    "status": {
                        "code": "onsale"
                    },
                    "spanMultipleDays": false
                },
                "classifications": [
                    {
                        "primary": true,
                        "segment": {
                            "id": "KZFzniwnSyZfZ7v7nE",
                            "name": "Sports"
                        },
                        "genre": {
                            "id": "KnvZfZ7vAdE",
                            "name": "Football"
                        },
                        "subGenre": {
                            "id": "KZazBEonSMnZfZ7vFE1",
                            "name": "NFL"
                        },
                        "type": {
                            "id": "KZAyXgnZfZ7v7l1",
                            "name": "Group"
                        },
                        "subType": {
                            "id": "KZFzBErXgnZfZ7vA7d",
                            "name": "Team"
                        },
                        "family": false
                    }
                ],
                "promoter": {
                    "id": "705",
                    "name": "NFL REGULAR SEASON",
                    "description": "NFL REGULAR SEASON / NTL / USA"
                },
                "promoters": [
                    {
                        "id": "705",
                        "name": "NFL REGULAR SEASON",
                        "description": "NFL REGULAR SEASON / NTL / USA"
                    },
                    {
                        "id": "4635",
                        "name": "SEATGEEK",
                        "description": "SEATGEEK / NTL / USA"
                    }
                ],
                "info": "Please be aware that this event is subject to NFL flexible scheduling procedures. The date and time for some games may change from what is currently reflected on the schedule and from what may appear on the ticket. For more detailed information regarding scheduling for the 2023 NFL Season.",
                "pleaseNote": "Please be aware that this event is subject to NFL flexible scheduling procedures. The date and time for some games may change from what is currently reflected on the schedule and from what may appear on the ticket. For more detailed information regarding scheduling for the 2023 NFL Season. https://www.nfl.com/schedules/flexible-scheduling-procedures Please Note: Ticket management will be delayed until 45 days prior to the event. At that time you can view barcodes and manage tickets in your Ticketmaster account. Value tickets are not eligible for resale. Resale activity may result in ticket cancellation. Value Tickets have a 4 ticket limit. If you exceed the ticket limit you may have any or all of your orders cancelled.",
                "priceRanges": [
                    {
                        "type": "standard",
                        "currency": "USD",
                        "min": 85,
                        "max": 725
                    }
                ],
                "seatmap": {
                    "staticUrl": "https://maps.ticketmaster.com/maps/geometry/3/event/0F005E98A2D163F2/staticImage?type=png&systemId=HOST"
                },
                "accessibility": {
                    "ticketLimit": 4
                },
                "ticketLimit": {
                    "info": "There is an overall 8 ticket limit for this event."
                },
                "ageRestrictions": {
                    "legalAgeEnforced": false
                },
                "ticketing": {
                    "safeTix": {
                        "enabled": true
                    },
                    "allInclusivePricing": {
                        "enabled": false
                    }
                },
                "_links": {
                    "self": {
                        "href": "/discovery/v2/events/vvG1HZ9txxVp2w?locale=en-us"
                    },
                    "attractions": [
                        {
                            "href": "/discovery/v2/attractions/K8vZ9171oU7?locale=en-us"
                        },
                        {
                            "href": "/discovery/v2/attractions/K8vZ917198f?locale=en-us"
                        }
                    ],
                    "venues": [
                        {
                            "href": "/discovery/v2/venues/KovZpZAEknnA?locale=en-us"
                        }
                    ]
                },
                "_embedded": {
                    "venues": [
                        {
                            "name": "Lumen Field",
                            "type": "venue",
                            "id": "KovZpZAEknnA",
                            "test": false,
                            "url": "https://www.ticketmaster.com/lumen-field-tickets-seattle/venue/123449",
                            "locale": "en-us",
                            "aliases": [
                                "seahawk stadium",
                                "seahawks stadium",
                                "qwest field"
                            ],
                            "postalCode": "98134",
                            "timezone": "America/Los_Angeles",
                            "city": {
                                "name": "Seattle"
                            },
                            "state": {
                                "name": "Washington",
                                "stateCode": "WA"
                            },
                            "country": {
                                "name": "United States Of America",
                                "countryCode": "US"
                            },
                            "address": {
                                "line1": "800 Occidental Ave S"
                            },
                            "location": {
                                "longitude": "-122.331607",
                                "latitude": "47.595083"
                            },
                            "markets": [
                                {
                                    "name": "Seattle Area",
                                    "id": "42"
                                }
                            ],
                            "dmas": [
                                {
                                    "id": 385
                                },
                                {
                                    "id": 391
                                },
                                {
                                    "id": 418
                                }
                            ],
                            "boxOfficeInfo": {
                                "phoneNumberDetail": "Gameday: (206) 381-7848. SFC Customer Service: 877-657-4625",
                                "openHoursDetail": "Open 3 hours prior to kickoff on gameday. Weekday hours will vary. Located in the Northwest corner of the Stadium. Seattle Sounders FC: 2 hours prior to match",
                                "acceptedPaymentDetail": "Visa, MasterCard, American Express, Discover and Cash.",
                                "willCallDetail": "Located at Northwest corner of Lumen Field. Opens 3 Hours prior to kickoff on gameday."
                            },
                            "parkingDetail": "Lumen Field manages three parking lots: the North Lot, Lumen Field Event Center Garage, and Union Station Garage. Gameday parking costs may vary. For further information please call the Seahawks ticket office at 1-888-NFL-HAWK (1-888-635-4295) or visit www.ipmseattle.com",
                            "accessibleSeatingDetail": "There are disabled seats (wheelchair convertible) dispersed through all areas and price levels of Lumen Field. Disabled seating and access for all is fully compliant with the Americans with Disabilities Act, (ADA).",
                            "generalInfo": {
                                "generalRule": "Due to NFL policy, no soft-sided containers, coolers, or large bags (bigger than 12\" X 12\" X 12\") are permitted into Lumen Field for any event. Guests may bring in items in small, clear plastic bags. Event security is required to open all bags at the gates for a visual inspection before allowing guests' entry. Fans may bring food into the stadium on game days in clear plastic bags only, but no beverages will be allowed per NFL policy. Flash photography, video cameras and support tools (such as tripods, large lens, etc.) are not allowed. Smoking and tobacco use are prohibited in all areas of Lumen Field and Event Center. All fans must abide by the Fan Code of Conduct. For full rules and policies please visit www.seahawks.com.",
                                "childRule": "Children under the age of 3 are free but must sit on adult's lap."
                            },
                            "upcomingEvents": {
                                "ticketmaster": 11,
                                "_total": 11,
                                "_filtered": 0
                            },
                            "ada": {
                                "adaPhones": "206-381-7848\n\nSounders FC Customer Service: 877-657-4625",
                                "adaCustomCopy": "ADA seats are available",
                                "adaHours": "Varies by event.    \n\nSeattle Sounders FC:\n2 hours prior to match\n    \nSeahawks:    \n3 hours prior to game.    \n    \nFor Concerts and other events:    \nGenerally 90 minutes prior to event.    \n    \nLumen Field & Lumen Field Field Event Center is located in the Northwest corner of the Stadium. Box Office hours vary by season. \n    \n    \n"
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/venues/KovZpZAEknnA?locale=en-us"
                                }
                            }
                        }
                    ],
                    "attractions": [
                        {
                            "name": "Seattle Seahawks",
                            "type": "attraction",
                            "id": "K8vZ9171oU7",
                            "test": false,
                            "url": "https://www.ticketmaster.com/seattle-seahawks-tickets/artist/806020",
                            "locale": "en-us",
                            "externalLinks": {
                                "twitter": [
                                    {
                                        "url": "https://twitter.com/Seahawks"
                                    }
                                ],
                                "facebook": [
                                    {
                                        "url": "https://www.facebook.com/Seahawks/"
                                    }
                                ],
                                "wiki": [
                                    {
                                        "url": "https://en.wikipedia.org/wiki/Seattle_Seahawks"
                                    }
                                ],
                                "instagram": [
                                    {
                                        "url": "https://www.instagram.com/seahawks/"
                                    }
                                ],
                                "homepage": [
                                    {
                                        "url": "https://www.seahawks.com/"
                                    }
                                ]
                            },
                            "images": [
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/c75/edea12b6-7239-4bdf-a0bb-afa002d9ec75_1325461_RETINA_PORTRAIT_16_9.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                },
                                {
                                    "ratio": "4_3",
                                    "url": "https://s1.ticketm.net/dam/a/c75/edea12b6-7239-4bdf-a0bb-afa002d9ec75_1325461_CUSTOM.jpg",
                                    "width": 305,
                                    "height": 225,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/c75/edea12b6-7239-4bdf-a0bb-afa002d9ec75_1325461_RECOMENDATION_16_9.jpg",
                                    "width": 100,
                                    "height": 56,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/c75/edea12b6-7239-4bdf-a0bb-afa002d9ec75_1325461_ARTIST_PAGE_3_2.jpg",
                                    "width": 305,
                                    "height": 203,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/c75/edea12b6-7239-4bdf-a0bb-afa002d9ec75_1325461_RETINA_PORTRAIT_3_2.jpg",
                                    "width": 640,
                                    "height": 427,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/c75/edea12b6-7239-4bdf-a0bb-afa002d9ec75_1325461_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                    "width": 2048,
                                    "height": 1152,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/c75/edea12b6-7239-4bdf-a0bb-afa002d9ec75_1325461_EVENT_DETAIL_PAGE_16_9.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/c75/edea12b6-7239-4bdf-a0bb-afa002d9ec75_1325461_TABLET_LANDSCAPE_3_2.jpg",
                                    "width": 1024,
                                    "height": 683,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/c75/edea12b6-7239-4bdf-a0bb-afa002d9ec75_1325461_RETINA_LANDSCAPE_16_9.jpg",
                                    "width": 1136,
                                    "height": 639,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/c75/edea12b6-7239-4bdf-a0bb-afa002d9ec75_1325461_TABLET_LANDSCAPE_16_9.jpg",
                                    "width": 1024,
                                    "height": 576,
                                    "fallback": false
                                }
                            ],
                            "classifications": [
                                {
                                    "primary": true,
                                    "segment": {
                                        "id": "KZFzniwnSyZfZ7v7nE",
                                        "name": "Sports"
                                    },
                                    "genre": {
                                        "id": "KnvZfZ7vAdE",
                                        "name": "Football"
                                    },
                                    "subGenre": {
                                        "id": "KZazBEonSMnZfZ7vFE1",
                                        "name": "NFL"
                                    },
                                    "type": {
                                        "id": "KZAyXgnZfZ7v7l1",
                                        "name": "Group"
                                    },
                                    "subType": {
                                        "id": "KZFzBErXgnZfZ7vA7d",
                                        "name": "Team"
                                    },
                                    "family": false
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 13,
                                "_total": 13,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/attractions/K8vZ9171oU7?locale=en-us"
                                }
                            }
                        },
                        {
                            "name": "Arizona Cardinals",
                            "type": "attraction",
                            "id": "K8vZ917198f",
                            "test": false,
                            "url": "https://www.ticketmaster.com/arizona-cardinals-tickets/artist/805894",
                            "locale": "en-us",
                            "externalLinks": {
                                "twitter": [
                                    {
                                        "url": "https://twitter.com/AZCardinals"
                                    }
                                ],
                                "facebook": [
                                    {
                                        "url": "https://www.facebook.com/arizonacardinals/"
                                    }
                                ],
                                "wiki": [
                                    {
                                        "url": "https://en.wikipedia.org/wiki/Arizona_Cardinals"
                                    }
                                ],
                                "instagram": [
                                    {
                                        "url": "https://www.instagram.com/azcardinals/"
                                    }
                                ],
                                "homepage": [
                                    {
                                        "url": "https://www.azcardinals.com/"
                                    }
                                ]
                            },
                            "aliases": [
                                "az cardinals",
                                "arizona cardinals",
                                "az cards"
                            ],
                            "images": [
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_3_2.jpg",
                                    "width": 1024,
                                    "height": 683,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_EVENT_DETAIL_PAGE_16_9.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_16_9.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                    "width": 2048,
                                    "height": 1152,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_ARTIST_PAGE_3_2.jpg",
                                    "width": 305,
                                    "height": 203,
                                    "fallback": false
                                },
                                {
                                    "ratio": "4_3",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_CUSTOM.jpg",
                                    "width": 305,
                                    "height": 225,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RECOMENDATION_16_9.jpg",
                                    "width": 100,
                                    "height": 56,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_LANDSCAPE_16_9.jpg",
                                    "width": 1136,
                                    "height": 639,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_3_2.jpg",
                                    "width": 640,
                                    "height": 427,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_16_9.jpg",
                                    "width": 1024,
                                    "height": 576,
                                    "fallback": false
                                }
                            ],
                            "classifications": [
                                {
                                    "primary": true,
                                    "segment": {
                                        "id": "KZFzniwnSyZfZ7v7nE",
                                        "name": "Sports"
                                    },
                                    "genre": {
                                        "id": "KnvZfZ7vAdE",
                                        "name": "Football"
                                    },
                                    "subGenre": {
                                        "id": "KZazBEonSMnZfZ7vFE1",
                                        "name": "NFL"
                                    },
                                    "type": {
                                        "id": "KZAyXgnZfZ7v7l1",
                                        "name": "Group"
                                    },
                                    "subType": {
                                        "id": "KZFzBErXgnZfZ7vA7d",
                                        "name": "Team"
                                    },
                                    "family": false
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 13,
                                "_total": 13,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/attractions/K8vZ917198f?locale=en-us"
                                }
                            }
                        }
                    ]
                }
            },
            {
                "name": "Arizona Cardinals Vs Cincinnati Bengals",
                "type": "event",
                "id": "G5v0Z9tnT6VFS",
                "test": false,
                "url": "https://www.ticketmaster.com/arizona-cardinals-vs-cincinnati-bengals-glendale-arizona-10-08-2023/event/19005E9ABF1F4233",
                "locale": "en-us",
                "images": [
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_3_2.jpg",
                        "width": 1024,
                        "height": 683,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_EVENT_DETAIL_PAGE_16_9.jpg",
                        "width": 205,
                        "height": 115,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_16_9.jpg",
                        "width": 640,
                        "height": 360,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                        "width": 2048,
                        "height": 1152,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_ARTIST_PAGE_3_2.jpg",
                        "width": 305,
                        "height": 203,
                        "fallback": false
                    },
                    {
                        "ratio": "4_3",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_CUSTOM.jpg",
                        "width": 305,
                        "height": 225,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RECOMENDATION_16_9.jpg",
                        "width": 100,
                        "height": 56,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_LANDSCAPE_16_9.jpg",
                        "width": 1136,
                        "height": 639,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_3_2.jpg",
                        "width": 640,
                        "height": 427,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_16_9.jpg",
                        "width": 1024,
                        "height": 576,
                        "fallback": false
                    }
                ],
                "sales": {
                    "public": {
                        "startDateTime": "2023-05-12T05:00:00Z",
                        "startTBD": false,
                        "startTBA": false,
                        "endDateTime": "2023-10-08T21:05:00Z"
                    },
                    "presales": [
                        {
                            "startDateTime": "2023-05-12T00:00:00Z",
                            "endDateTime": "2023-05-12T05:00:00Z",
                            "name": "Resale Onsale"
                        }
                    ]
                },
                "dates": {
                    "start": {
                        "localDate": "2023-10-08",
                        "localTime": "13:05:00",
                        "dateTime": "2023-10-08T20:05:00Z",
                        "dateTBD": false,
                        "dateTBA": false,
                        "timeTBA": false,
                        "noSpecificTime": false
                    },
                    "timezone": "America/Phoenix",
                    "status": {
                        "code": "onsale"
                    },
                    "spanMultipleDays": false
                },
                "classifications": [
                    {
                        "primary": true,
                        "segment": {
                            "id": "KZFzniwnSyZfZ7v7nE",
                            "name": "Sports"
                        },
                        "genre": {
                            "id": "KnvZfZ7vAdE",
                            "name": "Football"
                        },
                        "subGenre": {
                            "id": "KZazBEonSMnZfZ7vFE1",
                            "name": "NFL"
                        },
                        "type": {
                            "id": "KZAyXgnZfZ7v7l1",
                            "name": "Group"
                        },
                        "subType": {
                            "id": "KZFzBErXgnZfZ7vA7d",
                            "name": "Team"
                        },
                        "family": false
                    }
                ],
                "promoter": {
                    "id": "4635",
                    "name": "SEATGEEK",
                    "description": "SEATGEEK / NTL / USA"
                },
                "promoters": [
                    {
                        "id": "4635",
                        "name": "SEATGEEK",
                        "description": "SEATGEEK / NTL / USA"
                    }
                ],
                "info": "Please be aware that this event is subject to NFL flexible scheduling procedures. The date and time for some games may change from what is currently reflected on the schedule and from what may appear on the ticket. For more detailed information regarding scheduling for the 2023 NFL Season, please visit",
                "pleaseNote": "Please be aware that this event is subject to NFL flexible scheduling procedures. The date and time for some games may change from what is currently reflected on the schedule and from what may appear on the ticket. For more detailed information regarding scheduling for the 2023 NFL Season, please visit https://www.nfl.com/schedules/flexible-scheduling-procedures",
                "seatmap": {
                    "staticUrl": "https://maps.ticketmaster.com/maps/geometry/3/event/19005E9ABF1F4233/staticImage?type=png&systemId=HOST"
                },
                "accessibility": {
                    "ticketLimit": 4
                },
                "ageRestrictions": {
                    "legalAgeEnforced": false
                },
                "ticketing": {
                    "safeTix": {
                        "enabled": false
                    },
                    "allInclusivePricing": {
                        "enabled": false
                    }
                },
                "_links": {
                    "self": {
                        "href": "/discovery/v2/events/G5v0Z9tnT6VFS?locale=en-us"
                    },
                    "attractions": [
                        {
                            "href": "/discovery/v2/attractions/K8vZ917198f?locale=en-us"
                        },
                        {
                            "href": "/discovery/v2/attractions/K8vZ9171ovV?locale=en-us"
                        }
                    ],
                    "venues": [
                        {
                            "href": "/discovery/v2/venues/KovZpZAFaeIA?locale=en-us"
                        }
                    ]
                },
                "_embedded": {
                    "venues": [
                        {
                            "name": "State Farm Stadium",
                            "type": "venue",
                            "id": "KovZpZAFaeIA",
                            "test": false,
                            "url": "https://www.ticketmaster.com/state-farm-stadium-tickets-glendale/venue/205074",
                            "locale": "en-us",
                            "aliases": [
                                "university of phoenix stadium"
                            ],
                            "postalCode": "85305",
                            "timezone": "America/Phoenix",
                            "city": {
                                "name": "Glendale"
                            },
                            "state": {
                                "name": "Arizona",
                                "stateCode": "AZ"
                            },
                            "country": {
                                "name": "United States Of America",
                                "countryCode": "US"
                            },
                            "address": {
                                "line1": "1 Cardinals Drive"
                            },
                            "location": {
                                "longitude": "-112.262258",
                                "latitude": "33.527308"
                            },
                            "markets": [
                                {
                                    "name": "Phoenix and Tucson",
                                    "id": "36"
                                }
                            ],
                            "dmas": [
                                {
                                    "id": 359
                                },
                                {
                                    "id": 402
                                },
                                {
                                    "id": 420
                                }
                            ],
                            "upcomingEvents": {
                                "tmr": 4,
                                "ticketmaster": 6,
                                "_total": 10,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/venues/KovZpZAFaeIA?locale=en-us"
                                }
                            }
                        }
                    ],
                    "attractions": [
                        {
                            "name": "Arizona Cardinals",
                            "type": "attraction",
                            "id": "K8vZ917198f",
                            "test": false,
                            "url": "https://www.ticketmaster.com/arizona-cardinals-tickets/artist/805894",
                            "locale": "en-us",
                            "externalLinks": {
                                "twitter": [
                                    {
                                        "url": "https://twitter.com/AZCardinals"
                                    }
                                ],
                                "facebook": [
                                    {
                                        "url": "https://www.facebook.com/arizonacardinals/"
                                    }
                                ],
                                "wiki": [
                                    {
                                        "url": "https://en.wikipedia.org/wiki/Arizona_Cardinals"
                                    }
                                ],
                                "instagram": [
                                    {
                                        "url": "https://www.instagram.com/azcardinals/"
                                    }
                                ],
                                "homepage": [
                                    {
                                        "url": "https://www.azcardinals.com/"
                                    }
                                ]
                            },
                            "aliases": [
                                "az cardinals",
                                "arizona cardinals",
                                "az cards"
                            ],
                            "images": [
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_3_2.jpg",
                                    "width": 1024,
                                    "height": 683,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_EVENT_DETAIL_PAGE_16_9.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_16_9.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                    "width": 2048,
                                    "height": 1152,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_ARTIST_PAGE_3_2.jpg",
                                    "width": 305,
                                    "height": 203,
                                    "fallback": false
                                },
                                {
                                    "ratio": "4_3",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_CUSTOM.jpg",
                                    "width": 305,
                                    "height": 225,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RECOMENDATION_16_9.jpg",
                                    "width": 100,
                                    "height": 56,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_LANDSCAPE_16_9.jpg",
                                    "width": 1136,
                                    "height": 639,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_3_2.jpg",
                                    "width": 640,
                                    "height": 427,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_16_9.jpg",
                                    "width": 1024,
                                    "height": 576,
                                    "fallback": false
                                }
                            ],
                            "classifications": [
                                {
                                    "primary": true,
                                    "segment": {
                                        "id": "KZFzniwnSyZfZ7v7nE",
                                        "name": "Sports"
                                    },
                                    "genre": {
                                        "id": "KnvZfZ7vAdE",
                                        "name": "Football"
                                    },
                                    "subGenre": {
                                        "id": "KZazBEonSMnZfZ7vFE1",
                                        "name": "NFL"
                                    },
                                    "type": {
                                        "id": "KZAyXgnZfZ7v7l1",
                                        "name": "Group"
                                    },
                                    "subType": {
                                        "id": "KZFzBErXgnZfZ7vA7d",
                                        "name": "Team"
                                    },
                                    "family": false
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 13,
                                "_total": 13,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/attractions/K8vZ917198f?locale=en-us"
                                }
                            }
                        },
                        {
                            "name": "Cincinnati Bengals",
                            "type": "attraction",
                            "id": "K8vZ9171ovV",
                            "test": false,
                            "url": "https://www.ticketmaster.com/cincinnati-bengals-tickets/artist/805918",
                            "locale": "en-us",
                            "externalLinks": {
                                "twitter": [
                                    {
                                        "url": "https://twitter.com/Bengals"
                                    }
                                ],
                                "facebook": [
                                    {
                                        "url": "https://www.facebook.com/bengals/"
                                    }
                                ],
                                "wiki": [
                                    {
                                        "url": "https://en.wikipedia.org/wiki/Cincinnati_Bengals"
                                    }
                                ],
                                "instagram": [
                                    {
                                        "url": "https://www.instagram.com/bengals/"
                                    }
                                ],
                                "homepage": [
                                    {
                                        "url": "https://www.bengals.com/"
                                    }
                                ]
                            },
                            "aliases": [
                                "cinci"
                            ],
                            "images": [
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/dcc/3a889254-eccf-4f23-a303-8b189abc2dcc_1393131_TABLET_LANDSCAPE_3_2.jpg",
                                    "width": 1024,
                                    "height": 683,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/dcc/3a889254-eccf-4f23-a303-8b189abc2dcc_1393131_RETINA_PORTRAIT_16_9.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/dcc/3a889254-eccf-4f23-a303-8b189abc2dcc_1393131_RETINA_PORTRAIT_3_2.jpg",
                                    "width": 640,
                                    "height": 427,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/dcc/3a889254-eccf-4f23-a303-8b189abc2dcc_1393131_EVENT_DETAIL_PAGE_16_9.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/dcc/3a889254-eccf-4f23-a303-8b189abc2dcc_1393131_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                    "width": 2048,
                                    "height": 1152,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/dcc/3a889254-eccf-4f23-a303-8b189abc2dcc_1393131_ARTIST_PAGE_3_2.jpg",
                                    "width": 305,
                                    "height": 203,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/dcc/3a889254-eccf-4f23-a303-8b189abc2dcc_1393131_RECOMENDATION_16_9.jpg",
                                    "width": 100,
                                    "height": 56,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/dcc/3a889254-eccf-4f23-a303-8b189abc2dcc_1393131_TABLET_LANDSCAPE_16_9.jpg",
                                    "width": 1024,
                                    "height": 576,
                                    "fallback": false
                                },
                                {
                                    "ratio": "4_3",
                                    "url": "https://s1.ticketm.net/dam/a/dcc/3a889254-eccf-4f23-a303-8b189abc2dcc_1393131_CUSTOM.jpg",
                                    "width": 305,
                                    "height": 225,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/dcc/3a889254-eccf-4f23-a303-8b189abc2dcc_1393131_RETINA_LANDSCAPE_16_9.jpg",
                                    "width": 1136,
                                    "height": 639,
                                    "fallback": false
                                }
                            ],
                            "classifications": [
                                {
                                    "primary": true,
                                    "segment": {
                                        "id": "KZFzniwnSyZfZ7v7nE",
                                        "name": "Sports"
                                    },
                                    "genre": {
                                        "id": "KnvZfZ7vAdE",
                                        "name": "Football"
                                    },
                                    "subGenre": {
                                        "id": "KZazBEonSMnZfZ7vFE1",
                                        "name": "NFL"
                                    },
                                    "type": {
                                        "id": "KZAyXgnZfZ7v7l1",
                                        "name": "Group"
                                    },
                                    "subType": {
                                        "id": "KZFzBErXgnZfZ7vA7d",
                                        "name": "Team"
                                    },
                                    "family": false
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 13,
                                "_total": 13,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/attractions/K8vZ9171ovV?locale=en-us"
                                }
                            }
                        }
                    ]
                }
            },
            {
                "name": "Philadelphia Eagles vs. Arizona Cardinals",
                "type": "event",
                "id": "vvG1FZ9tN27FX0",
                "test": false,
                "url": "https://www.ticketmaster.com/philadelphia-eagles-vs-arizona-cardinals-philadelphia-pennsylvania-12-31-2023/event/02005E98CF108FA4",
                "locale": "en-us",
                "images": [
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/602/6f9b50d7-e1ea-4a7e-a144-6b0a7577f602_1325591_TABLET_LANDSCAPE_3_2.jpg",
                        "width": 1024,
                        "height": 683,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/602/6f9b50d7-e1ea-4a7e-a144-6b0a7577f602_1325591_RETINA_PORTRAIT_3_2.jpg",
                        "width": 640,
                        "height": 427,
                        "fallback": false
                    },
                    {
                        "ratio": "4_3",
                        "url": "https://s1.ticketm.net/dam/a/602/6f9b50d7-e1ea-4a7e-a144-6b0a7577f602_1325591_CUSTOM.jpg",
                        "width": 305,
                        "height": 225,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/602/6f9b50d7-e1ea-4a7e-a144-6b0a7577f602_1325591_RECOMENDATION_16_9.jpg",
                        "width": 100,
                        "height": 56,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/602/6f9b50d7-e1ea-4a7e-a144-6b0a7577f602_1325591_RETINA_PORTRAIT_16_9.jpg",
                        "width": 640,
                        "height": 360,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/602/6f9b50d7-e1ea-4a7e-a144-6b0a7577f602_1325591_TABLET_LANDSCAPE_16_9.jpg",
                        "width": 1024,
                        "height": 576,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/602/6f9b50d7-e1ea-4a7e-a144-6b0a7577f602_1325591_EVENT_DETAIL_PAGE_16_9.jpg",
                        "width": 205,
                        "height": 115,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/602/6f9b50d7-e1ea-4a7e-a144-6b0a7577f602_1325591_RETINA_LANDSCAPE_16_9.jpg",
                        "width": 1136,
                        "height": 639,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/602/6f9b50d7-e1ea-4a7e-a144-6b0a7577f602_1325591_ARTIST_PAGE_3_2.jpg",
                        "width": 305,
                        "height": 203,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/602/6f9b50d7-e1ea-4a7e-a144-6b0a7577f602_1325591_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                        "width": 2048,
                        "height": 1152,
                        "fallback": false
                    }
                ],
                "sales": {
                    "public": {
                        "startDateTime": "2023-06-13T14:00:00Z",
                        "startTBD": false,
                        "startTBA": false,
                        "endDateTime": "2023-12-31T19:00:00Z"
                    },
                    "presales": [
                        {
                            "startDateTime": "2023-05-12T00:00:00Z",
                            "endDateTime": "2023-12-31T19:00:00Z",
                            "name": "Resale Onsale"
                        }
                    ]
                },
                "dates": {
                    "start": {
                        "localDate": "2023-12-31",
                        "localTime": "13:00:00",
                        "dateTime": "2023-12-31T18:00:00Z",
                        "dateTBD": false,
                        "dateTBA": false,
                        "timeTBA": false,
                        "noSpecificTime": false
                    },
                    "timezone": "America/New_York",
                    "status": {
                        "code": "onsale"
                    },
                    "spanMultipleDays": false
                },
                "classifications": [
                    {
                        "primary": true,
                        "segment": {
                            "id": "KZFzniwnSyZfZ7v7nE",
                            "name": "Sports"
                        },
                        "genre": {
                            "id": "KnvZfZ7vAdE",
                            "name": "Football"
                        },
                        "subGenre": {
                            "id": "KZazBEonSMnZfZ7vFE1",
                            "name": "NFL"
                        },
                        "type": {
                            "id": "KZAyXgnZfZ7v7l1",
                            "name": "Group"
                        },
                        "subType": {
                            "id": "KZFzBErXgnZfZ7vA7d",
                            "name": "Team"
                        },
                        "family": false
                    }
                ],
                "promoter": {
                    "id": "705",
                    "name": "NFL REGULAR SEASON",
                    "description": "NFL REGULAR SEASON / NTL / USA"
                },
                "promoters": [
                    {
                        "id": "705",
                        "name": "NFL REGULAR SEASON",
                        "description": "NFL REGULAR SEASON / NTL / USA"
                    }
                ],
                "info": "Please be aware that this event is subject to NFL flexible scheduling procedures. The date and time for some games may change from what is currently reflected on the schedule and from what may appear on the ticket. For more detailed information regarding scheduling for the 2023 NFL Season, please visit:",
                "pleaseNote": "Please be aware that this event is subject to NFL flexible scheduling procedures. The date and time for some games may change from what is currently reflected on the schedule and from what may appear on the ticket. For more detailed information regarding scheduling for the 2023 NFL Season, please visit https://www.nfl.com/schedules/flexible-scheduling-procedures",
                "priceRanges": [
                    {
                        "type": "standard",
                        "currency": "USD",
                        "min": 93,
                        "max": 589
                    }
                ],
                "products": [
                    {
                        "name": "Parking Pass: Philadelphia Eagles vs. Arizona Cardinals",
                        "id": "vvG1FZ9tJMPdi7",
                        "url": "https://www.ticketmaster.com/parking-pass-philadelphia-eagles-vs-arizona-philadelphia-pennsylvania-12-31-2023/event/02005E99B7943B04",
                        "type": "Parking",
                        "classifications": [
                            {
                                "primary": true,
                                "segment": {
                                    "id": "KZFzniwnSyZfZ7v7n1",
                                    "name": "Miscellaneous"
                                },
                                "genre": {
                                    "id": "KnvZfZ7v7ll",
                                    "name": "Undefined"
                                },
                                "subGenre": {
                                    "id": "KZazBEonSMnZfZ7vAv1",
                                    "name": "Undefined"
                                },
                                "type": {
                                    "id": "KZAyXgnZfZ7vAva",
                                    "name": "Parking"
                                },
                                "subType": {
                                    "id": "KZFzBErXgnZfZ7vAFe",
                                    "name": "Regular"
                                },
                                "family": false
                            }
                        ]
                    },
                    {
                        "name": "FanDuel Lounge Access Pass: Eagles vs. Cardinals",
                        "id": "vvG1FZ9tJX_7AG",
                        "url": "https://www.ticketmaster.com/fanduel-lounge-access-pass-eagles-vs-philadelphia-pennsylvania-12-31-2023/event/02005E99BE64414C",
                        "type": "Club Access",
                        "classifications": [
                            {
                                "primary": true,
                                "segment": {
                                    "id": "KZFzniwnSyZfZ7v7nE",
                                    "name": "Sports"
                                },
                                "genre": {
                                    "id": "KnvZfZ7vAdE",
                                    "name": "Football"
                                },
                                "subGenre": {
                                    "id": "KZazBEonSMnZfZ7vFE1",
                                    "name": "NFL"
                                },
                                "type": {
                                    "id": "KZAyXgnZfZ7v7l1",
                                    "name": "Group"
                                },
                                "subType": {
                                    "id": "KZFzBErXgnZfZ7vA7d",
                                    "name": "Team"
                                },
                                "family": false
                            }
                        ]
                    }
                ],
                "seatmap": {
                    "staticUrl": "https://maps.ticketmaster.com/maps/geometry/3/event/02005E98CF108FA4/staticImage?type=png&systemId=HOST"
                },
                "accessibility": {
                    "ticketLimit": 4
                },
                "ageRestrictions": {
                    "legalAgeEnforced": false
                },
                "ticketing": {
                    "safeTix": {
                        "enabled": true
                    },
                    "allInclusivePricing": {
                        "enabled": false
                    }
                },
                "_links": {
                    "self": {
                        "href": "/discovery/v2/events/vvG1FZ9tN27FX0?locale=en-us"
                    },
                    "attractions": [
                        {
                            "href": "/discovery/v2/attractions/K8vZ9171oU0?locale=en-us"
                        },
                        {
                            "href": "/discovery/v2/attractions/K8vZ917198f?locale=en-us"
                        }
                    ],
                    "venues": [
                        {
                            "href": "/discovery/v2/venues/KovZpa2yme?locale=en-us"
                        }
                    ]
                },
                "_embedded": {
                    "venues": [
                        {
                            "name": "Lincoln Financial Field",
                            "type": "venue",
                            "id": "KovZpa2yme",
                            "test": false,
                            "url": "https://www.ticketmaster.com/lincoln-financial-field-tickets-philadelphia/venue/16752",
                            "locale": "en-us",
                            "images": [
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dbimages/22350v.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                }
                            ],
                            "postalCode": "19148",
                            "timezone": "America/New_York",
                            "city": {
                                "name": "Philadelphia"
                            },
                            "state": {
                                "name": "Pennsylvania",
                                "stateCode": "PA"
                            },
                            "country": {
                                "name": "United States Of America",
                                "countryCode": "US"
                            },
                            "address": {
                                "line1": "One Lincoln Financial Way"
                            },
                            "location": {
                                "longitude": "-75.167406",
                                "latitude": "39.900706"
                            },
                            "markets": [
                                {
                                    "name": "Philadelphia",
                                    "id": "18"
                                }
                            ],
                            "dmas": [
                                {
                                    "id": 358
                                }
                            ],
                            "boxOfficeInfo": {
                                "phoneNumberDetail": "General Info - 215.463.2500 Ticket Office - 215.463.5500 Accessible Seating - 215.463.5500",
                                "openHoursDetail": "Monday - Friday 9am - 5pm Event Day - Remote ticket booth located 11th st. side of main parking lot. Non event day:Headhouse",
                                "acceptedPaymentDetail": "MasterCard, Visa, Discover, Traveler's Checks, Cash, & American Express.",
                                "willCallDetail": "Pick up tickets one hour prior to show. Customer must present actual credit card used to place the order, the confirmation number and a photo I.D. Doors and plaza gates open 3 hours prior to event - seating gates - 2 hours prior to event. For non Eagles events - Will Call is on 11th St. facing the Wachovia Ctr. Will Call for the Lacrosse Event, May 28 - May 30, 2005 will be at the Chrysler Jeep Entrance/Main Ticket office."
                            },
                            "parkingDetail": "See map in playbook. There is a charge to park with ample surrounding lots.",
                            "accessibleSeatingDetail": "Accessible seating is available in all levels. Limited accessible seating through Ticketmaster. Please call 215.463.5500 for accessible procedures.",
                            "generalInfo": {
                                "generalRule": "Cameras allowed, smoking in designated areas only, no recording devices. see page 17 of guest playbook.",
                                "childRule": "No discounts for Eagles - varies with other events."
                            },
                            "upcomingEvents": {
                                "ticketmaster": 17,
                                "_total": 17,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/venues/KovZpa2yme?locale=en-us"
                                }
                            }
                        }
                    ],
                    "attractions": [
                        {
                            "name": "Philadelphia Eagles",
                            "type": "attraction",
                            "id": "K8vZ9171oU0",
                            "test": false,
                            "url": "https://www.ticketmaster.com/philadelphia-eagles-tickets/artist/805999",
                            "locale": "en-us",
                            "externalLinks": {
                                "twitter": [
                                    {
                                        "url": "https://twitter.com/Eagles"
                                    }
                                ],
                                "facebook": [
                                    {
                                        "url": "https://www.facebook.com/PhiladelphiaEagles"
                                    }
                                ],
                                "wiki": [
                                    {
                                        "url": "https://en.wikipedia.org/wiki/Philadelphia_Eagles"
                                    }
                                ],
                                "instagram": [
                                    {
                                        "url": "https://www.instagram.com/PhiladelphiaEagles"
                                    }
                                ],
                                "homepage": [
                                    {
                                        "url": "https://www.philadelphiaeagles.com/"
                                    }
                                ]
                            },
                            "aliases": [
                                "philly"
                            ],
                            "images": [
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/602/6f9b50d7-e1ea-4a7e-a144-6b0a7577f602_1325591_RECOMENDATION_16_9.jpg",
                                    "width": 100,
                                    "height": 56,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/602/6f9b50d7-e1ea-4a7e-a144-6b0a7577f602_1325591_RETINA_PORTRAIT_16_9.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/602/6f9b50d7-e1ea-4a7e-a144-6b0a7577f602_1325591_TABLET_LANDSCAPE_16_9.jpg",
                                    "width": 1024,
                                    "height": 576,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/602/6f9b50d7-e1ea-4a7e-a144-6b0a7577f602_1325591_EVENT_DETAIL_PAGE_16_9.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/602/6f9b50d7-e1ea-4a7e-a144-6b0a7577f602_1325591_RETINA_LANDSCAPE_16_9.jpg",
                                    "width": 1136,
                                    "height": 639,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/602/6f9b50d7-e1ea-4a7e-a144-6b0a7577f602_1325591_TABLET_LANDSCAPE_3_2.jpg",
                                    "width": 1024,
                                    "height": 683,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/602/6f9b50d7-e1ea-4a7e-a144-6b0a7577f602_1325591_RETINA_PORTRAIT_3_2.jpg",
                                    "width": 640,
                                    "height": 427,
                                    "fallback": false
                                },
                                {
                                    "ratio": "4_3",
                                    "url": "https://s1.ticketm.net/dam/a/602/6f9b50d7-e1ea-4a7e-a144-6b0a7577f602_1325591_CUSTOM.jpg",
                                    "width": 305,
                                    "height": 225,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/602/6f9b50d7-e1ea-4a7e-a144-6b0a7577f602_1325591_ARTIST_PAGE_3_2.jpg",
                                    "width": 305,
                                    "height": 203,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/602/6f9b50d7-e1ea-4a7e-a144-6b0a7577f602_1325591_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                    "width": 2048,
                                    "height": 1152,
                                    "fallback": false
                                }
                            ],
                            "classifications": [
                                {
                                    "primary": true,
                                    "segment": {
                                        "id": "KZFzniwnSyZfZ7v7nE",
                                        "name": "Sports"
                                    },
                                    "genre": {
                                        "id": "KnvZfZ7vAdE",
                                        "name": "Football"
                                    },
                                    "subGenre": {
                                        "id": "KZazBEonSMnZfZ7vFE1",
                                        "name": "NFL"
                                    },
                                    "type": {
                                        "id": "KZAyXgnZfZ7v7l1",
                                        "name": "Group"
                                    },
                                    "subType": {
                                        "id": "KZFzBErXgnZfZ7vA7d",
                                        "name": "Team"
                                    },
                                    "family": false
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 13,
                                "_total": 13,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/attractions/K8vZ9171oU0?locale=en-us"
                                }
                            }
                        },
                        {
                            "name": "Arizona Cardinals",
                            "type": "attraction",
                            "id": "K8vZ917198f",
                            "test": false,
                            "url": "https://www.ticketmaster.com/arizona-cardinals-tickets/artist/805894",
                            "locale": "en-us",
                            "externalLinks": {
                                "twitter": [
                                    {
                                        "url": "https://twitter.com/AZCardinals"
                                    }
                                ],
                                "facebook": [
                                    {
                                        "url": "https://www.facebook.com/arizonacardinals/"
                                    }
                                ],
                                "wiki": [
                                    {
                                        "url": "https://en.wikipedia.org/wiki/Arizona_Cardinals"
                                    }
                                ],
                                "instagram": [
                                    {
                                        "url": "https://www.instagram.com/azcardinals/"
                                    }
                                ],
                                "homepage": [
                                    {
                                        "url": "https://www.azcardinals.com/"
                                    }
                                ]
                            },
                            "aliases": [
                                "az cardinals",
                                "arizona cardinals",
                                "az cards"
                            ],
                            "images": [
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_3_2.jpg",
                                    "width": 1024,
                                    "height": 683,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_EVENT_DETAIL_PAGE_16_9.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_16_9.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                    "width": 2048,
                                    "height": 1152,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_ARTIST_PAGE_3_2.jpg",
                                    "width": 305,
                                    "height": 203,
                                    "fallback": false
                                },
                                {
                                    "ratio": "4_3",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_CUSTOM.jpg",
                                    "width": 305,
                                    "height": 225,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RECOMENDATION_16_9.jpg",
                                    "width": 100,
                                    "height": 56,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_LANDSCAPE_16_9.jpg",
                                    "width": 1136,
                                    "height": 639,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_3_2.jpg",
                                    "width": 640,
                                    "height": 427,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_16_9.jpg",
                                    "width": 1024,
                                    "height": 576,
                                    "fallback": false
                                }
                            ],
                            "classifications": [
                                {
                                    "primary": true,
                                    "segment": {
                                        "id": "KZFzniwnSyZfZ7v7nE",
                                        "name": "Sports"
                                    },
                                    "genre": {
                                        "id": "KnvZfZ7vAdE",
                                        "name": "Football"
                                    },
                                    "subGenre": {
                                        "id": "KZazBEonSMnZfZ7vFE1",
                                        "name": "NFL"
                                    },
                                    "type": {
                                        "id": "KZAyXgnZfZ7v7l1",
                                        "name": "Group"
                                    },
                                    "subType": {
                                        "id": "KZFzBErXgnZfZ7vA7d",
                                        "name": "Team"
                                    },
                                    "family": false
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 13,
                                "_total": 13,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/attractions/K8vZ917198f?locale=en-us"
                                }
                            }
                        }
                    ]
                }
            },
            {
                "name": "Pittsburgh Steelers vs. Arizona Cardinals",
                "type": "event",
                "id": "G5vbZ9IKLBS9_",
                "test": false,
                "url": "https://www.ticketmaster.com/pittsburgh-steelers-vs-arizona-cardinals-pittsburgh-pennsylvania-12-03-2023/event/16005E84DFEB35D9",
                "locale": "en-us",
                "images": [
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/38e/5cf6e91a-098e-47c9-aded-e0185de0a38e_1325561_RECOMENDATION_16_9.jpg",
                        "width": 100,
                        "height": 56,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/38e/5cf6e91a-098e-47c9-aded-e0185de0a38e_1325561_RETINA_LANDSCAPE_16_9.jpg",
                        "width": 1136,
                        "height": 639,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/38e/5cf6e91a-098e-47c9-aded-e0185de0a38e_1325561_EVENT_DETAIL_PAGE_16_9.jpg",
                        "width": 205,
                        "height": 115,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/38e/5cf6e91a-098e-47c9-aded-e0185de0a38e_1325561_RETINA_PORTRAIT_16_9.jpg",
                        "width": 640,
                        "height": 360,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/38e/5cf6e91a-098e-47c9-aded-e0185de0a38e_1325561_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                        "width": 2048,
                        "height": 1152,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/38e/5cf6e91a-098e-47c9-aded-e0185de0a38e_1325561_TABLET_LANDSCAPE_16_9.jpg",
                        "width": 1024,
                        "height": 576,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/38e/5cf6e91a-098e-47c9-aded-e0185de0a38e_1325561_RETINA_PORTRAIT_3_2.jpg",
                        "width": 640,
                        "height": 427,
                        "fallback": false
                    },
                    {
                        "ratio": "4_3",
                        "url": "https://s1.ticketm.net/dam/a/38e/5cf6e91a-098e-47c9-aded-e0185de0a38e_1325561_CUSTOM.jpg",
                        "width": 305,
                        "height": 225,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/38e/5cf6e91a-098e-47c9-aded-e0185de0a38e_1325561_ARTIST_PAGE_3_2.jpg",
                        "width": 305,
                        "height": 203,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/38e/5cf6e91a-098e-47c9-aded-e0185de0a38e_1325561_TABLET_LANDSCAPE_3_2.jpg",
                        "width": 1024,
                        "height": 683,
                        "fallback": false
                    }
                ],
                "sales": {
                    "public": {
                        "startDateTime": "2023-05-12T16:00:00Z",
                        "startTBD": false,
                        "startTBA": false,
                        "endDateTime": "2023-12-03T19:00:00Z"
                    },
                    "presales": [
                        {
                            "startDateTime": "2023-05-12T14:00:00Z",
                            "endDateTime": "2023-05-12T15:59:00Z",
                            "name": "Season Ticket Holder Presale"
                        },
                        {
                            "startDateTime": "2023-05-12T15:00:00Z",
                            "endDateTime": "2023-05-12T15:59:00Z",
                            "name": "Wait List Presale"
                        },
                        {
                            "startDateTime": "2023-05-12T00:00:00Z",
                            "endDateTime": "2023-09-01T02:00:00Z",
                            "name": "Resale Onsale"
                        }
                    ]
                },
                "dates": {
                    "start": {
                        "localDate": "2023-12-03",
                        "localTime": "13:00:00",
                        "dateTime": "2023-12-03T18:00:00Z",
                        "dateTBD": false,
                        "dateTBA": false,
                        "timeTBA": false,
                        "noSpecificTime": false
                    },
                    "timezone": "America/New_York",
                    "status": {
                        "code": "onsale"
                    },
                    "spanMultipleDays": false
                },
                "classifications": [
                    {
                        "primary": true,
                        "segment": {
                            "id": "KZFzniwnSyZfZ7v7nE",
                            "name": "Sports"
                        },
                        "genre": {
                            "id": "KnvZfZ7vAdE",
                            "name": "Football"
                        },
                        "subGenre": {
                            "id": "KZazBEonSMnZfZ7vFE1",
                            "name": "NFL"
                        },
                        "type": {
                            "id": "KZAyXgnZfZ7v7l1",
                            "name": "Group"
                        },
                        "subType": {
                            "id": "KZFzBErXgnZfZ7vA7d",
                            "name": "Team"
                        },
                        "family": false
                    }
                ],
                "promoter": {
                    "id": "705",
                    "name": "NFL REGULAR SEASON",
                    "description": "NFL REGULAR SEASON / NTL / USA"
                },
                "promoters": [
                    {
                        "id": "705",
                        "name": "NFL REGULAR SEASON",
                        "description": "NFL REGULAR SEASON / NTL / USA"
                    }
                ],
                "info": "Please be aware that this event is subject to NFL flexible scheduling procedures. The date and time for some games may change from what is currently reflected on the schedule and from what may appear on the ticket. For more detailed information regarding scheduling for the 2023 NFL Season, please visit Section 120 Rows BB-HH are designated as the Family Section. No Alcohol will be permitted in this area.",
                "pleaseNote": "Please be aware that this event is subject to NFL flexible scheduling procedures. The date and time for some games may change from what is currently reflected on the schedule and from what may appear on the ticket. For more detailed information regarding scheduling for the 2023 NFL Season, please visit https://www.nfl.com/schedules/flexible-scheduling-procedures Ticket limits will be strictly enforced. Section 120 Rows BB-HH are designated as the Family Section. No Alcohol will be permitted in this area.",
                "priceRanges": [
                    {
                        "type": "standard",
                        "currency": "USD",
                        "min": 50,
                        "max": 370
                    }
                ],
                "seatmap": {
                    "staticUrl": "https://maps.ticketmaster.com/maps/geometry/3/event/16005E84DFEB35D9/staticImage?type=png&systemId=HOST"
                },
                "accessibility": {
                    "ticketLimit": 4
                },
                "ticketLimit": {
                    "info": "There is an overall event ticket limit of 12."
                },
                "ageRestrictions": {
                    "legalAgeEnforced": false
                },
                "ticketing": {
                    "safeTix": {
                        "enabled": true
                    },
                    "allInclusivePricing": {
                        "enabled": false
                    }
                },
                "_links": {
                    "self": {
                        "href": "/discovery/v2/events/G5vbZ9IKLBS9_?locale=en-us"
                    },
                    "attractions": [
                        {
                            "href": "/discovery/v2/attractions/K8vZ9171ogV?locale=en-us"
                        },
                        {
                            "href": "/discovery/v2/attractions/K8vZ917198f?locale=en-us"
                        }
                    ],
                    "venues": [
                        {
                            "href": "/discovery/v2/venues/KovZpZAFa6nA?locale=en-us"
                        }
                    ]
                },
                "_embedded": {
                    "venues": [
                        {
                            "name": "Acrisure Stadium",
                            "type": "venue",
                            "id": "KovZpZAFa6nA",
                            "test": false,
                            "url": "https://www.ticketmaster.com/acrisure-stadium-tickets-pittsburgh/venue/180306",
                            "locale": "en-us",
                            "images": [
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dbimages/22395v.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                }
                            ],
                            "postalCode": "15212",
                            "timezone": "America/New_York",
                            "city": {
                                "name": "Pittsburgh"
                            },
                            "state": {
                                "name": "Pennsylvania",
                                "stateCode": "PA"
                            },
                            "country": {
                                "name": "United States Of America",
                                "countryCode": "US"
                            },
                            "address": {
                                "line1": "100 Art Rooney Avenue"
                            },
                            "location": {
                                "longitude": "-80.015884",
                                "latitude": "40.446093"
                            },
                            "markets": [
                                {
                                    "name": "Pittsburgh",
                                    "id": "19"
                                }
                            ],
                            "dmas": [
                                {
                                    "id": 271
                                },
                                {
                                    "id": 307
                                },
                                {
                                    "id": 360
                                }
                            ],
                            "social": {
                                "twitter": {
                                    "handle": "@acrisurefield"
                                }
                            },
                            "boxOfficeInfo": {
                                "phoneNumberDetail": "(412) 323-1200",
                                "willCallDetail": "Must have photo ID and credit card that the tickets were purchased in order to pick up tickets."
                            },
                            "parkingDetail": "There are surface lots and parking garages all around the stadium.",
                            "generalInfo": {
                                "childRule": "Everyone must have a ticket."
                            },
                            "upcomingEvents": {
                                "tmr": 3,
                                "ticketmaster": 9,
                                "_total": 12,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/venues/KovZpZAFa6nA?locale=en-us"
                                }
                            }
                        }
                    ],
                    "attractions": [
                        {
                            "name": "Pittsburgh Steelers",
                            "type": "attraction",
                            "id": "K8vZ9171ogV",
                            "test": false,
                            "url": "https://www.ticketmaster.com/pittsburgh-steelers-tickets/artist/806007",
                            "locale": "en-us",
                            "externalLinks": {
                                "twitter": [
                                    {
                                        "url": "https://twitter.com/steelers/"
                                    }
                                ],
                                "facebook": [
                                    {
                                        "url": "https://www.facebook.com/steelers/"
                                    }
                                ],
                                "wiki": [
                                    {
                                        "url": "https://en.wikipedia.org/wiki/Pittsburgh_Steelers"
                                    }
                                ],
                                "instagram": [
                                    {
                                        "url": "https://www.instagram.com/steelers/"
                                    }
                                ],
                                "homepage": [
                                    {
                                        "url": "https://www.steelers.com/"
                                    }
                                ]
                            },
                            "aliases": [
                                "steeler tickets",
                                "steelers",
                                "steelers tickets"
                            ],
                            "images": [
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/38e/5cf6e91a-098e-47c9-aded-e0185de0a38e_1325561_RECOMENDATION_16_9.jpg",
                                    "width": 100,
                                    "height": 56,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/38e/5cf6e91a-098e-47c9-aded-e0185de0a38e_1325561_RETINA_LANDSCAPE_16_9.jpg",
                                    "width": 1136,
                                    "height": 639,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/38e/5cf6e91a-098e-47c9-aded-e0185de0a38e_1325561_EVENT_DETAIL_PAGE_16_9.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/38e/5cf6e91a-098e-47c9-aded-e0185de0a38e_1325561_RETINA_PORTRAIT_16_9.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/38e/5cf6e91a-098e-47c9-aded-e0185de0a38e_1325561_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                    "width": 2048,
                                    "height": 1152,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/38e/5cf6e91a-098e-47c9-aded-e0185de0a38e_1325561_TABLET_LANDSCAPE_16_9.jpg",
                                    "width": 1024,
                                    "height": 576,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/38e/5cf6e91a-098e-47c9-aded-e0185de0a38e_1325561_RETINA_PORTRAIT_3_2.jpg",
                                    "width": 640,
                                    "height": 427,
                                    "fallback": false
                                },
                                {
                                    "ratio": "4_3",
                                    "url": "https://s1.ticketm.net/dam/a/38e/5cf6e91a-098e-47c9-aded-e0185de0a38e_1325561_CUSTOM.jpg",
                                    "width": 305,
                                    "height": 225,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/38e/5cf6e91a-098e-47c9-aded-e0185de0a38e_1325561_ARTIST_PAGE_3_2.jpg",
                                    "width": 305,
                                    "height": 203,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/38e/5cf6e91a-098e-47c9-aded-e0185de0a38e_1325561_TABLET_LANDSCAPE_3_2.jpg",
                                    "width": 1024,
                                    "height": 683,
                                    "fallback": false
                                }
                            ],
                            "classifications": [
                                {
                                    "primary": true,
                                    "segment": {
                                        "id": "KZFzniwnSyZfZ7v7nE",
                                        "name": "Sports"
                                    },
                                    "genre": {
                                        "id": "KnvZfZ7vAdE",
                                        "name": "Football"
                                    },
                                    "subGenre": {
                                        "id": "KZazBEonSMnZfZ7vFE1",
                                        "name": "NFL"
                                    },
                                    "type": {
                                        "id": "KZAyXgnZfZ7v7l1",
                                        "name": "Group"
                                    },
                                    "subType": {
                                        "id": "KZFzBErXgnZfZ7vA7d",
                                        "name": "Team"
                                    },
                                    "family": false
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 15,
                                "_total": 15,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/attractions/K8vZ9171ogV?locale=en-us"
                                }
                            }
                        },
                        {
                            "name": "Arizona Cardinals",
                            "type": "attraction",
                            "id": "K8vZ917198f",
                            "test": false,
                            "url": "https://www.ticketmaster.com/arizona-cardinals-tickets/artist/805894",
                            "locale": "en-us",
                            "externalLinks": {
                                "twitter": [
                                    {
                                        "url": "https://twitter.com/AZCardinals"
                                    }
                                ],
                                "facebook": [
                                    {
                                        "url": "https://www.facebook.com/arizonacardinals/"
                                    }
                                ],
                                "wiki": [
                                    {
                                        "url": "https://en.wikipedia.org/wiki/Arizona_Cardinals"
                                    }
                                ],
                                "instagram": [
                                    {
                                        "url": "https://www.instagram.com/azcardinals/"
                                    }
                                ],
                                "homepage": [
                                    {
                                        "url": "https://www.azcardinals.com/"
                                    }
                                ]
                            },
                            "aliases": [
                                "az cardinals",
                                "arizona cardinals",
                                "az cards"
                            ],
                            "images": [
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_3_2.jpg",
                                    "width": 1024,
                                    "height": 683,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_EVENT_DETAIL_PAGE_16_9.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_16_9.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                    "width": 2048,
                                    "height": 1152,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_ARTIST_PAGE_3_2.jpg",
                                    "width": 305,
                                    "height": 203,
                                    "fallback": false
                                },
                                {
                                    "ratio": "4_3",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_CUSTOM.jpg",
                                    "width": 305,
                                    "height": 225,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RECOMENDATION_16_9.jpg",
                                    "width": 100,
                                    "height": 56,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_LANDSCAPE_16_9.jpg",
                                    "width": 1136,
                                    "height": 639,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_3_2.jpg",
                                    "width": 640,
                                    "height": 427,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_16_9.jpg",
                                    "width": 1024,
                                    "height": 576,
                                    "fallback": false
                                }
                            ],
                            "classifications": [
                                {
                                    "primary": true,
                                    "segment": {
                                        "id": "KZFzniwnSyZfZ7v7nE",
                                        "name": "Sports"
                                    },
                                    "genre": {
                                        "id": "KnvZfZ7vAdE",
                                        "name": "Football"
                                    },
                                    "subGenre": {
                                        "id": "KZazBEonSMnZfZ7vFE1",
                                        "name": "NFL"
                                    },
                                    "type": {
                                        "id": "KZAyXgnZfZ7v7l1",
                                        "name": "Group"
                                    },
                                    "subType": {
                                        "id": "KZFzBErXgnZfZ7vA7d",
                                        "name": "Team"
                                    },
                                    "family": false
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 13,
                                "_total": 13,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/attractions/K8vZ917198f?locale=en-us"
                                }
                            }
                        }
                    ]
                }
            },
            {
                "name": "Cleveland Browns vs. Arizona Cardinals",
                "type": "event",
                "id": "vvG1fZ9tnrIeQL",
                "test": false,
                "url": "https://www.ticketmaster.com/cleveland-browns-vs-arizona-cardinals-cleveland-ohio-11-05-2023/event/05005E9A9EA0269F",
                "locale": "en-us",
                "images": [
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/fd5/84291ed9-2ccc-45c8-841d-d011c04c6fd5_1685001_RETINA_PORTRAIT_3_2.jpg",
                        "width": 640,
                        "height": 427,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/fd5/84291ed9-2ccc-45c8-841d-d011c04c6fd5_1685001_ARTIST_PAGE_3_2.jpg",
                        "width": 305,
                        "height": 203,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/fd5/84291ed9-2ccc-45c8-841d-d011c04c6fd5_1685001_RETINA_PORTRAIT_16_9.jpg",
                        "width": 640,
                        "height": 360,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/fd5/84291ed9-2ccc-45c8-841d-d011c04c6fd5_1685001_EVENT_DETAIL_PAGE_16_9.jpg",
                        "width": 205,
                        "height": 115,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/fd5/84291ed9-2ccc-45c8-841d-d011c04c6fd5_1685001_RETINA_LANDSCAPE_16_9.jpg",
                        "width": 1136,
                        "height": 639,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/fd5/84291ed9-2ccc-45c8-841d-d011c04c6fd5_1685001_TABLET_LANDSCAPE_16_9.jpg",
                        "width": 1024,
                        "height": 576,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/fd5/84291ed9-2ccc-45c8-841d-d011c04c6fd5_1685001_RECOMENDATION_16_9.jpg",
                        "width": 100,
                        "height": 56,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/fd5/84291ed9-2ccc-45c8-841d-d011c04c6fd5_1685001_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                        "width": 2048,
                        "height": 1152,
                        "fallback": false
                    },
                    {
                        "ratio": "4_3",
                        "url": "https://s1.ticketm.net/dam/a/fd5/84291ed9-2ccc-45c8-841d-d011c04c6fd5_1685001_CUSTOM.jpg",
                        "width": 305,
                        "height": 225,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/fd5/84291ed9-2ccc-45c8-841d-d011c04c6fd5_1685001_TABLET_LANDSCAPE_3_2.jpg",
                        "width": 1024,
                        "height": 683,
                        "fallback": false
                    }
                ],
                "sales": {
                    "public": {
                        "startDateTime": "2023-05-12T00:00:00Z",
                        "startTBD": false,
                        "startTBA": false,
                        "endDateTime": "2023-11-05T19:00:00Z"
                    }
                },
                "dates": {
                    "start": {
                        "localDate": "2023-11-05",
                        "localTime": "13:00:00",
                        "dateTime": "2023-11-05T18:00:00Z",
                        "dateTBD": false,
                        "dateTBA": false,
                        "timeTBA": false,
                        "noSpecificTime": false
                    },
                    "timezone": "America/New_York",
                    "status": {
                        "code": "onsale"
                    },
                    "spanMultipleDays": false
                },
                "classifications": [
                    {
                        "primary": true,
                        "segment": {
                            "id": "KZFzniwnSyZfZ7v7nE",
                            "name": "Sports"
                        },
                        "genre": {
                            "id": "KnvZfZ7vAdE",
                            "name": "Football"
                        },
                        "subGenre": {
                            "id": "KZazBEonSMnZfZ7vFE1",
                            "name": "NFL"
                        },
                        "type": {
                            "id": "KZAyXgnZfZ7v7l1",
                            "name": "Group"
                        },
                        "subType": {
                            "id": "KZFzBErXgnZfZ7vA7d",
                            "name": "Team"
                        },
                        "family": false
                    }
                ],
                "promoter": {
                    "id": "705",
                    "name": "NFL REGULAR SEASON",
                    "description": "NFL REGULAR SEASON / NTL / USA"
                },
                "promoters": [
                    {
                        "id": "705",
                        "name": "NFL REGULAR SEASON",
                        "description": "NFL REGULAR SEASON / NTL / USA"
                    }
                ],
                "info": "Please be aware that this event is subject to NFL flexible scheduling procedures. The date and time for some games may change from what is currently reflected on the schedule and from what may appear on the ticket. For more detailed information regarding scheduling for the 2023 NFL Season, please visit",
                "pleaseNote": "Please be aware that this event is subject to NFL flexible scheduling procedures. The date and time for some games may change from what is currently reflected on the schedule and from what may appear on the ticket. For more detailed information regarding scheduling for the 2023 NFL Season, please visit https://www.nfl.com/schedules/flexible-scheduling-procedures",
                "priceRanges": [
                    {
                        "type": "standard",
                        "currency": "USD",
                        "min": 75,
                        "max": 1553
                    }
                ],
                "seatmap": {
                    "staticUrl": "https://maps.ticketmaster.com/maps/geometry/3/event/05005E9A9EA0269F/staticImage?type=png&systemId=HOST"
                },
                "accessibility": {
                    "ticketLimit": 8
                },
                "ticketLimit": {
                    "info": "There is a 8 ticket limit for this event."
                },
                "ageRestrictions": {
                    "legalAgeEnforced": false
                },
                "ticketing": {
                    "safeTix": {
                        "enabled": true
                    },
                    "allInclusivePricing": {
                        "enabled": false
                    }
                },
                "_links": {
                    "self": {
                        "href": "/discovery/v2/events/vvG1fZ9tnrIeQL?locale=en-us"
                    },
                    "attractions": [
                        {
                            "href": "/discovery/v2/attractions/K8vZ9171oV7?locale=en-us"
                        },
                        {
                            "href": "/discovery/v2/attractions/K8vZ917198f?locale=en-us"
                        }
                    ],
                    "venues": [
                        {
                            "href": "/discovery/v2/venues/KovZpZAFdEJA?locale=en-us"
                        }
                    ]
                },
                "_embedded": {
                    "venues": [
                        {
                            "name": "Cleveland Browns Stadium",
                            "type": "venue",
                            "id": "KovZpZAFdEJA",
                            "test": false,
                            "url": "https://www.ticketmaster.com/cleveland-browns-stadium-tickets-cleveland/venue/40971",
                            "locale": "en-us",
                            "images": [
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dbimages/22763v.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                }
                            ],
                            "postalCode": "44114",
                            "timezone": "America/New_York",
                            "city": {
                                "name": "Cleveland"
                            },
                            "state": {
                                "name": "Ohio",
                                "stateCode": "OH"
                            },
                            "country": {
                                "name": "United States Of America",
                                "countryCode": "US"
                            },
                            "address": {
                                "line1": "100 Alfred Lerner Way"
                            },
                            "location": {
                                "longitude": "-81.69956958",
                                "latitude": "41.50603554"
                            },
                            "markets": [
                                {
                                    "name": " Youngstown & More\"",
                                    "id": "12"
                                }
                            ],
                            "dmas": [
                                {
                                    "id": 253
                                },
                                {
                                    "id": 419
                                }
                            ],
                            "boxOfficeInfo": {
                                "phoneNumberDetail": "(888) 891-1999 (toll free)(440) 891-5050",
                                "openHoursDetail": "Mon-Fri: 9:00am - 5:00pm Opens 9:00am on game day",
                                "acceptedPaymentDetail": "Box Office accepts Visa, cash and money order. Visa is a proud sponsor of the NFL and the Cleveland Browns, and is the only card now accepted by the Browns.",
                                "willCallDetail": "Available for pickup after 9:00am on gameday at the ticket office will call windows located on the South side of the Stadium. Customer must present actual credit card, confirmation number, and photo ID."
                            },
                            "parkingDetail": "Suite holders and Club Seat License holders with assigned parking in their contracts will receive information and details during early summer of each year. Other PSL holders, including guests with disabilities or special needs, will be responsible to make their own parking arrangements. Several parking operators are located in the downtown area.",
                            "accessibleSeatingDetail": "WHEELCHAIR ACCESS: Available through TM HEARING IMPAIRED: Assistive listening devices are available at any Guest Services booth located on all levels of the Stadium. A valid drivers license and/or major credit card will need to be utilized as a deposit for the equipment. ELEVATOR ACCESS: Elevator service is provided for our guests who require use of an elevator to access their seating area.",
                            "generalInfo": {
                                "generalRule": "The following items will not be permitted in the stadium: * Weapons: No weapons are allowed in the stadium. Possession of a firearm or weapon that potentially disrupts the ability to maintain a safe and enjoyable environment is strictly forbidden. Possession of such a weapon will result in immediate confiscation ejection, and possible arrest. * Alcoholic beverages * Animals (except assistive animals for people with disabilities) * Banners * Cans, bottles, or other beverages containers including bottled water * Confetti or glitter * Ice chests * Fireworks, or missile-like objects * Flash photography * Illegal substances * Laser pointers * Noisemaking device: ie bells, bullhorns, whistles, etc. * Smoking * Sticks, bats, or clubs * Strollers * Umbrellas * Video or movie cameras, tripods, or audio recording equipment * Any other item deemed dangerous and/or inappropriate",
                                "childRule": "Everyone regardless of age must have a ticket to enter the Stadium."
                            },
                            "upcomingEvents": {
                                "ticketmaster": 13,
                                "_total": 13,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/venues/KovZpZAFdEJA?locale=en-us"
                                }
                            }
                        }
                    ],
                    "attractions": [
                        {
                            "name": "Cleveland Browns",
                            "type": "attraction",
                            "id": "K8vZ9171oV7",
                            "test": false,
                            "url": "https://www.ticketmaster.com/cleveland-browns-tickets/artist/805920",
                            "locale": "en-us",
                            "externalLinks": {
                                "twitter": [
                                    {
                                        "url": "https://twitter.com/Browns"
                                    }
                                ],
                                "facebook": [
                                    {
                                        "url": "https://www.facebook.com/clevelandbrowns/"
                                    }
                                ],
                                "wiki": [
                                    {
                                        "url": "https://en.wikipedia.org/wiki/Cleveland_Browns"
                                    }
                                ],
                                "instagram": [
                                    {
                                        "url": "https://www.instagram.com/clevelandbrowns/"
                                    }
                                ],
                                "homepage": [
                                    {
                                        "url": "https://www.clevelandbrowns.com/"
                                    }
                                ]
                            },
                            "aliases": [
                                "cleveland browns football",
                                "dog pound"
                            ],
                            "images": [
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/fd5/84291ed9-2ccc-45c8-841d-d011c04c6fd5_1685001_RETINA_PORTRAIT_3_2.jpg",
                                    "width": 640,
                                    "height": 427,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/fd5/84291ed9-2ccc-45c8-841d-d011c04c6fd5_1685001_ARTIST_PAGE_3_2.jpg",
                                    "width": 305,
                                    "height": 203,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/fd5/84291ed9-2ccc-45c8-841d-d011c04c6fd5_1685001_RETINA_PORTRAIT_16_9.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/fd5/84291ed9-2ccc-45c8-841d-d011c04c6fd5_1685001_EVENT_DETAIL_PAGE_16_9.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/fd5/84291ed9-2ccc-45c8-841d-d011c04c6fd5_1685001_RETINA_LANDSCAPE_16_9.jpg",
                                    "width": 1136,
                                    "height": 639,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/fd5/84291ed9-2ccc-45c8-841d-d011c04c6fd5_1685001_TABLET_LANDSCAPE_16_9.jpg",
                                    "width": 1024,
                                    "height": 576,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/fd5/84291ed9-2ccc-45c8-841d-d011c04c6fd5_1685001_RECOMENDATION_16_9.jpg",
                                    "width": 100,
                                    "height": 56,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/fd5/84291ed9-2ccc-45c8-841d-d011c04c6fd5_1685001_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                    "width": 2048,
                                    "height": 1152,
                                    "fallback": false
                                },
                                {
                                    "ratio": "4_3",
                                    "url": "https://s1.ticketm.net/dam/a/fd5/84291ed9-2ccc-45c8-841d-d011c04c6fd5_1685001_CUSTOM.jpg",
                                    "width": 305,
                                    "height": 225,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/fd5/84291ed9-2ccc-45c8-841d-d011c04c6fd5_1685001_TABLET_LANDSCAPE_3_2.jpg",
                                    "width": 1024,
                                    "height": 683,
                                    "fallback": false
                                }
                            ],
                            "classifications": [
                                {
                                    "primary": true,
                                    "segment": {
                                        "id": "KZFzniwnSyZfZ7v7nE",
                                        "name": "Sports"
                                    },
                                    "genre": {
                                        "id": "KnvZfZ7vAdE",
                                        "name": "Football"
                                    },
                                    "subGenre": {
                                        "id": "KZazBEonSMnZfZ7vFE1",
                                        "name": "NFL"
                                    },
                                    "type": {
                                        "id": "KZAyXgnZfZ7v7l1",
                                        "name": "Group"
                                    },
                                    "subType": {
                                        "id": "KZFzBErXgnZfZ7vA7d",
                                        "name": "Team"
                                    },
                                    "family": false
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 22,
                                "_total": 22,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/attractions/K8vZ9171oV7?locale=en-us"
                                }
                            }
                        },
                        {
                            "name": "Arizona Cardinals",
                            "type": "attraction",
                            "id": "K8vZ917198f",
                            "test": false,
                            "url": "https://www.ticketmaster.com/arizona-cardinals-tickets/artist/805894",
                            "locale": "en-us",
                            "externalLinks": {
                                "twitter": [
                                    {
                                        "url": "https://twitter.com/AZCardinals"
                                    }
                                ],
                                "facebook": [
                                    {
                                        "url": "https://www.facebook.com/arizonacardinals/"
                                    }
                                ],
                                "wiki": [
                                    {
                                        "url": "https://en.wikipedia.org/wiki/Arizona_Cardinals"
                                    }
                                ],
                                "instagram": [
                                    {
                                        "url": "https://www.instagram.com/azcardinals/"
                                    }
                                ],
                                "homepage": [
                                    {
                                        "url": "https://www.azcardinals.com/"
                                    }
                                ]
                            },
                            "aliases": [
                                "az cardinals",
                                "arizona cardinals",
                                "az cards"
                            ],
                            "images": [
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_3_2.jpg",
                                    "width": 1024,
                                    "height": 683,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_EVENT_DETAIL_PAGE_16_9.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_16_9.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                    "width": 2048,
                                    "height": 1152,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_ARTIST_PAGE_3_2.jpg",
                                    "width": 305,
                                    "height": 203,
                                    "fallback": false
                                },
                                {
                                    "ratio": "4_3",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_CUSTOM.jpg",
                                    "width": 305,
                                    "height": 225,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RECOMENDATION_16_9.jpg",
                                    "width": 100,
                                    "height": 56,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_LANDSCAPE_16_9.jpg",
                                    "width": 1136,
                                    "height": 639,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_3_2.jpg",
                                    "width": 640,
                                    "height": 427,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_16_9.jpg",
                                    "width": 1024,
                                    "height": 576,
                                    "fallback": false
                                }
                            ],
                            "classifications": [
                                {
                                    "primary": true,
                                    "segment": {
                                        "id": "KZFzniwnSyZfZ7v7nE",
                                        "name": "Sports"
                                    },
                                    "genre": {
                                        "id": "KnvZfZ7vAdE",
                                        "name": "Football"
                                    },
                                    "subGenre": {
                                        "id": "KZazBEonSMnZfZ7vFE1",
                                        "name": "NFL"
                                    },
                                    "type": {
                                        "id": "KZAyXgnZfZ7v7l1",
                                        "name": "Group"
                                    },
                                    "subType": {
                                        "id": "KZFzBErXgnZfZ7vA7d",
                                        "name": "Team"
                                    },
                                    "family": false
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 13,
                                "_total": 13,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/attractions/K8vZ917198f?locale=en-us"
                                }
                            }
                        }
                    ]
                }
            },
            {
                "name": "Arizona Cardinals Vs San Francisco 49ers",
                "type": "event",
                "id": "G5v0Z9tnTGVa4",
                "test": false,
                "url": "https://www.ticketmaster.com/arizona-cardinals-vs-san-francisco-49ers-glendale-arizona-12-17-2023/event/19005E9ABF334255",
                "locale": "en-us",
                "images": [
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_3_2.jpg",
                        "width": 1024,
                        "height": 683,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_EVENT_DETAIL_PAGE_16_9.jpg",
                        "width": 205,
                        "height": 115,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_16_9.jpg",
                        "width": 640,
                        "height": 360,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                        "width": 2048,
                        "height": 1152,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_ARTIST_PAGE_3_2.jpg",
                        "width": 305,
                        "height": 203,
                        "fallback": false
                    },
                    {
                        "ratio": "4_3",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_CUSTOM.jpg",
                        "width": 305,
                        "height": 225,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RECOMENDATION_16_9.jpg",
                        "width": 100,
                        "height": 56,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_LANDSCAPE_16_9.jpg",
                        "width": 1136,
                        "height": 639,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_3_2.jpg",
                        "width": 640,
                        "height": 427,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_16_9.jpg",
                        "width": 1024,
                        "height": 576,
                        "fallback": false
                    }
                ],
                "sales": {
                    "public": {
                        "startDateTime": "2023-05-12T05:00:00Z",
                        "startTBD": false,
                        "startTBA": false,
                        "endDateTime": "2023-12-17T22:05:00Z"
                    },
                    "presales": [
                        {
                            "startDateTime": "2023-05-12T00:00:00Z",
                            "endDateTime": "2023-05-12T05:00:00Z",
                            "name": "Resale Onsale"
                        }
                    ]
                },
                "dates": {
                    "start": {
                        "localDate": "2023-12-17",
                        "localTime": "14:05:00",
                        "dateTime": "2023-12-17T21:05:00Z",
                        "dateTBD": false,
                        "dateTBA": false,
                        "timeTBA": false,
                        "noSpecificTime": false
                    },
                    "timezone": "America/Phoenix",
                    "status": {
                        "code": "onsale"
                    },
                    "spanMultipleDays": false
                },
                "classifications": [
                    {
                        "primary": true,
                        "segment": {
                            "id": "KZFzniwnSyZfZ7v7nE",
                            "name": "Sports"
                        },
                        "genre": {
                            "id": "KnvZfZ7vAdE",
                            "name": "Football"
                        },
                        "subGenre": {
                            "id": "KZazBEonSMnZfZ7vFE1",
                            "name": "NFL"
                        },
                        "type": {
                            "id": "KZAyXgnZfZ7v7l1",
                            "name": "Group"
                        },
                        "subType": {
                            "id": "KZFzBErXgnZfZ7vA7d",
                            "name": "Team"
                        },
                        "family": false
                    }
                ],
                "promoter": {
                    "id": "4635",
                    "name": "SEATGEEK",
                    "description": "SEATGEEK / NTL / USA"
                },
                "promoters": [
                    {
                        "id": "4635",
                        "name": "SEATGEEK",
                        "description": "SEATGEEK / NTL / USA"
                    }
                ],
                "info": "Please be aware that this event is subject to NFL flexible scheduling procedures. The date and time for some games may change from what is currently reflected on the schedule and from what may appear on the ticket. For more detailed information regarding scheduling for the 2023 NFL Season, please visit",
                "pleaseNote": "Please be aware that this event is subject to NFL flexible scheduling procedures. The date and time for some games may change from what is currently reflected on the schedule and from what may appear on the ticket. For more detailed information regarding scheduling for the 2023 NFL Season, please visit https://www.nfl.com/schedules/flexible-scheduling-procedures",
                "seatmap": {
                    "staticUrl": "https://maps.ticketmaster.com/maps/geometry/3/event/19005E9ABF334255/staticImage?type=png&systemId=HOST"
                },
                "accessibility": {
                    "ticketLimit": 4
                },
                "ageRestrictions": {
                    "legalAgeEnforced": false
                },
                "ticketing": {
                    "safeTix": {
                        "enabled": false
                    },
                    "allInclusivePricing": {
                        "enabled": false
                    }
                },
                "_links": {
                    "self": {
                        "href": "/discovery/v2/events/G5v0Z9tnTGVa4?locale=en-us"
                    },
                    "attractions": [
                        {
                            "href": "/discovery/v2/attractions/K8vZ917198f?locale=en-us"
                        },
                        {
                            "href": "/discovery/v2/attractions/K8vZ9171oMV?locale=en-us"
                        }
                    ],
                    "venues": [
                        {
                            "href": "/discovery/v2/venues/KovZpZAFaeIA?locale=en-us"
                        }
                    ]
                },
                "_embedded": {
                    "venues": [
                        {
                            "name": "State Farm Stadium",
                            "type": "venue",
                            "id": "KovZpZAFaeIA",
                            "test": false,
                            "url": "https://www.ticketmaster.com/state-farm-stadium-tickets-glendale/venue/205074",
                            "locale": "en-us",
                            "aliases": [
                                "university of phoenix stadium"
                            ],
                            "postalCode": "85305",
                            "timezone": "America/Phoenix",
                            "city": {
                                "name": "Glendale"
                            },
                            "state": {
                                "name": "Arizona",
                                "stateCode": "AZ"
                            },
                            "country": {
                                "name": "United States Of America",
                                "countryCode": "US"
                            },
                            "address": {
                                "line1": "1 Cardinals Drive"
                            },
                            "location": {
                                "longitude": "-112.262258",
                                "latitude": "33.527308"
                            },
                            "markets": [
                                {
                                    "name": "Phoenix and Tucson",
                                    "id": "36"
                                }
                            ],
                            "dmas": [
                                {
                                    "id": 359
                                },
                                {
                                    "id": 402
                                },
                                {
                                    "id": 420
                                }
                            ],
                            "upcomingEvents": {
                                "tmr": 4,
                                "ticketmaster": 6,
                                "_total": 10,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/venues/KovZpZAFaeIA?locale=en-us"
                                }
                            }
                        }
                    ],
                    "attractions": [
                        {
                            "name": "Arizona Cardinals",
                            "type": "attraction",
                            "id": "K8vZ917198f",
                            "test": false,
                            "url": "https://www.ticketmaster.com/arizona-cardinals-tickets/artist/805894",
                            "locale": "en-us",
                            "externalLinks": {
                                "twitter": [
                                    {
                                        "url": "https://twitter.com/AZCardinals"
                                    }
                                ],
                                "facebook": [
                                    {
                                        "url": "https://www.facebook.com/arizonacardinals/"
                                    }
                                ],
                                "wiki": [
                                    {
                                        "url": "https://en.wikipedia.org/wiki/Arizona_Cardinals"
                                    }
                                ],
                                "instagram": [
                                    {
                                        "url": "https://www.instagram.com/azcardinals/"
                                    }
                                ],
                                "homepage": [
                                    {
                                        "url": "https://www.azcardinals.com/"
                                    }
                                ]
                            },
                            "aliases": [
                                "az cardinals",
                                "arizona cardinals",
                                "az cards"
                            ],
                            "images": [
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_3_2.jpg",
                                    "width": 1024,
                                    "height": 683,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_EVENT_DETAIL_PAGE_16_9.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_16_9.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                    "width": 2048,
                                    "height": 1152,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_ARTIST_PAGE_3_2.jpg",
                                    "width": 305,
                                    "height": 203,
                                    "fallback": false
                                },
                                {
                                    "ratio": "4_3",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_CUSTOM.jpg",
                                    "width": 305,
                                    "height": 225,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RECOMENDATION_16_9.jpg",
                                    "width": 100,
                                    "height": 56,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_LANDSCAPE_16_9.jpg",
                                    "width": 1136,
                                    "height": 639,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_3_2.jpg",
                                    "width": 640,
                                    "height": 427,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_16_9.jpg",
                                    "width": 1024,
                                    "height": 576,
                                    "fallback": false
                                }
                            ],
                            "classifications": [
                                {
                                    "primary": true,
                                    "segment": {
                                        "id": "KZFzniwnSyZfZ7v7nE",
                                        "name": "Sports"
                                    },
                                    "genre": {
                                        "id": "KnvZfZ7vAdE",
                                        "name": "Football"
                                    },
                                    "subGenre": {
                                        "id": "KZazBEonSMnZfZ7vFE1",
                                        "name": "NFL"
                                    },
                                    "type": {
                                        "id": "KZAyXgnZfZ7v7l1",
                                        "name": "Group"
                                    },
                                    "subType": {
                                        "id": "KZFzBErXgnZfZ7vA7d",
                                        "name": "Team"
                                    },
                                    "family": false
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 13,
                                "_total": 13,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/attractions/K8vZ917198f?locale=en-us"
                                }
                            }
                        },
                        {
                            "name": "San Francisco 49ers",
                            "type": "attraction",
                            "id": "K8vZ9171oMV",
                            "test": false,
                            "url": "https://www.ticketmaster.com/san-francisco-49ers-tickets/artist/806015",
                            "locale": "en-us",
                            "externalLinks": {
                                "twitter": [
                                    {
                                        "url": "https://twitter.com/49ers"
                                    }
                                ],
                                "facebook": [
                                    {
                                        "url": "https://www.facebook.com/SANFRANCISCO49ERS/"
                                    }
                                ],
                                "wiki": [
                                    {
                                        "url": "https://en.wikipedia.org/wiki/San_Francisco_49ers"
                                    }
                                ],
                                "instagram": [
                                    {
                                        "url": "https://www.instagram.com/49ers/"
                                    }
                                ],
                                "homepage": [
                                    {
                                        "url": "https://www.49ers.com/"
                                    }
                                ]
                            },
                            "aliases": [
                                "niners",
                                "sfo 49ers"
                            ],
                            "images": [
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/b7d/d7460515-712c-4e09-b404-69c1b86e7b7d_1325511_RETINA_LANDSCAPE_16_9.jpg",
                                    "width": 1136,
                                    "height": 639,
                                    "fallback": false
                                },
                                {
                                    "ratio": "4_3",
                                    "url": "https://s1.ticketm.net/dam/a/b7d/d7460515-712c-4e09-b404-69c1b86e7b7d_1325511_CUSTOM.jpg",
                                    "width": 305,
                                    "height": 225,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/b7d/d7460515-712c-4e09-b404-69c1b86e7b7d_1325511_EVENT_DETAIL_PAGE_16_9.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/b7d/d7460515-712c-4e09-b404-69c1b86e7b7d_1325511_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                    "width": 2048,
                                    "height": 1152,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/b7d/d7460515-712c-4e09-b404-69c1b86e7b7d_1325511_ARTIST_PAGE_3_2.jpg",
                                    "width": 305,
                                    "height": 203,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/b7d/d7460515-712c-4e09-b404-69c1b86e7b7d_1325511_RECOMENDATION_16_9.jpg",
                                    "width": 100,
                                    "height": 56,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/b7d/d7460515-712c-4e09-b404-69c1b86e7b7d_1325511_RETINA_PORTRAIT_16_9.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/b7d/d7460515-712c-4e09-b404-69c1b86e7b7d_1325511_RETINA_PORTRAIT_3_2.jpg",
                                    "width": 640,
                                    "height": 427,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/b7d/d7460515-712c-4e09-b404-69c1b86e7b7d_1325511_TABLET_LANDSCAPE_16_9.jpg",
                                    "width": 1024,
                                    "height": 576,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/b7d/d7460515-712c-4e09-b404-69c1b86e7b7d_1325511_TABLET_LANDSCAPE_3_2.jpg",
                                    "width": 1024,
                                    "height": 683,
                                    "fallback": false
                                }
                            ],
                            "classifications": [
                                {
                                    "primary": true,
                                    "segment": {
                                        "id": "KZFzniwnSyZfZ7v7nE",
                                        "name": "Sports"
                                    },
                                    "genre": {
                                        "id": "KnvZfZ7vAdE",
                                        "name": "Football"
                                    },
                                    "subGenre": {
                                        "id": "KZazBEonSMnZfZ7vFE1",
                                        "name": "NFL"
                                    },
                                    "type": {
                                        "id": "KZAyXgnZfZ7v7l1",
                                        "name": "Group"
                                    },
                                    "subType": {
                                        "id": "KZFzBErXgnZfZ7vA7d",
                                        "name": "Team"
                                    },
                                    "family": false
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 13,
                                "_total": 13,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/attractions/K8vZ9171oMV?locale=en-us"
                                }
                            }
                        }
                    ]
                }
            },
            {
                "name": "Arizona Cardinals Vs Baltimore Ravens",
                "type": "event",
                "id": "G5v0Z9tnT67FR",
                "test": false,
                "url": "https://www.ticketmaster.com/arizona-cardinals-vs-baltimore-ravens-glendale-arizona-10-29-2023/event/19005E9ABF1C422F",
                "locale": "en-us",
                "images": [
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_3_2.jpg",
                        "width": 1024,
                        "height": 683,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_EVENT_DETAIL_PAGE_16_9.jpg",
                        "width": 205,
                        "height": 115,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_16_9.jpg",
                        "width": 640,
                        "height": 360,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                        "width": 2048,
                        "height": 1152,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_ARTIST_PAGE_3_2.jpg",
                        "width": 305,
                        "height": 203,
                        "fallback": false
                    },
                    {
                        "ratio": "4_3",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_CUSTOM.jpg",
                        "width": 305,
                        "height": 225,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RECOMENDATION_16_9.jpg",
                        "width": 100,
                        "height": 56,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_LANDSCAPE_16_9.jpg",
                        "width": 1136,
                        "height": 639,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_3_2.jpg",
                        "width": 640,
                        "height": 427,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_16_9.jpg",
                        "width": 1024,
                        "height": 576,
                        "fallback": false
                    }
                ],
                "sales": {
                    "public": {
                        "startDateTime": "2023-05-12T05:00:00Z",
                        "startTBD": false,
                        "startTBA": false,
                        "endDateTime": "2023-10-29T21:25:00Z"
                    },
                    "presales": [
                        {
                            "startDateTime": "2023-05-12T00:00:00Z",
                            "endDateTime": "2023-05-12T05:00:00Z",
                            "name": "Resale Onsale"
                        }
                    ]
                },
                "dates": {
                    "start": {
                        "localDate": "2023-10-29",
                        "localTime": "13:25:00",
                        "dateTime": "2023-10-29T20:25:00Z",
                        "dateTBD": false,
                        "dateTBA": false,
                        "timeTBA": false,
                        "noSpecificTime": false
                    },
                    "timezone": "America/Phoenix",
                    "status": {
                        "code": "onsale"
                    },
                    "spanMultipleDays": false
                },
                "classifications": [
                    {
                        "primary": true,
                        "segment": {
                            "id": "KZFzniwnSyZfZ7v7nE",
                            "name": "Sports"
                        },
                        "genre": {
                            "id": "KnvZfZ7vAdE",
                            "name": "Football"
                        },
                        "subGenre": {
                            "id": "KZazBEonSMnZfZ7vFE1",
                            "name": "NFL"
                        },
                        "type": {
                            "id": "KZAyXgnZfZ7v7l1",
                            "name": "Group"
                        },
                        "subType": {
                            "id": "KZFzBErXgnZfZ7vA7d",
                            "name": "Team"
                        },
                        "family": false
                    }
                ],
                "promoter": {
                    "id": "4635",
                    "name": "SEATGEEK",
                    "description": "SEATGEEK / NTL / USA"
                },
                "promoters": [
                    {
                        "id": "4635",
                        "name": "SEATGEEK",
                        "description": "SEATGEEK / NTL / USA"
                    }
                ],
                "info": "Please be aware that this event is subject to NFL flexible scheduling procedures. The date and time for some games may change from what is currently reflected on the schedule and from what may appear on the ticket. For more detailed information regarding scheduling for the 2023 NFL Season, please visit",
                "pleaseNote": "Please be aware that this event is subject to NFL flexible scheduling procedures. The date and time for some games may change from what is currently reflected on the schedule and from what may appear on the ticket. For more detailed information regarding scheduling for the 2023 NFL Season, please visit https://www.nfl.com/schedules/flexible-scheduling-procedures",
                "seatmap": {
                    "staticUrl": "https://maps.ticketmaster.com/maps/geometry/3/event/19005E9ABF1C422F/staticImage?type=png&systemId=HOST"
                },
                "accessibility": {
                    "ticketLimit": 4
                },
                "ageRestrictions": {
                    "legalAgeEnforced": false
                },
                "ticketing": {
                    "safeTix": {
                        "enabled": false
                    },
                    "allInclusivePricing": {
                        "enabled": false
                    }
                },
                "_links": {
                    "self": {
                        "href": "/discovery/v2/events/G5v0Z9tnT67FR?locale=en-us"
                    },
                    "attractions": [
                        {
                            "href": "/discovery/v2/attractions/K8vZ917198f?locale=en-us"
                        },
                        {
                            "href": "/discovery/v2/attractions/K8vZ91719eV?locale=en-us"
                        }
                    ],
                    "venues": [
                        {
                            "href": "/discovery/v2/venues/KovZpZAFaeIA?locale=en-us"
                        }
                    ]
                },
                "_embedded": {
                    "venues": [
                        {
                            "name": "State Farm Stadium",
                            "type": "venue",
                            "id": "KovZpZAFaeIA",
                            "test": false,
                            "url": "https://www.ticketmaster.com/state-farm-stadium-tickets-glendale/venue/205074",
                            "locale": "en-us",
                            "aliases": [
                                "university of phoenix stadium"
                            ],
                            "postalCode": "85305",
                            "timezone": "America/Phoenix",
                            "city": {
                                "name": "Glendale"
                            },
                            "state": {
                                "name": "Arizona",
                                "stateCode": "AZ"
                            },
                            "country": {
                                "name": "United States Of America",
                                "countryCode": "US"
                            },
                            "address": {
                                "line1": "1 Cardinals Drive"
                            },
                            "location": {
                                "longitude": "-112.262258",
                                "latitude": "33.527308"
                            },
                            "markets": [
                                {
                                    "name": "Phoenix and Tucson",
                                    "id": "36"
                                }
                            ],
                            "dmas": [
                                {
                                    "id": 359
                                },
                                {
                                    "id": 402
                                },
                                {
                                    "id": 420
                                }
                            ],
                            "upcomingEvents": {
                                "tmr": 4,
                                "ticketmaster": 6,
                                "_total": 10,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/venues/KovZpZAFaeIA?locale=en-us"
                                }
                            }
                        }
                    ],
                    "attractions": [
                        {
                            "name": "Arizona Cardinals",
                            "type": "attraction",
                            "id": "K8vZ917198f",
                            "test": false,
                            "url": "https://www.ticketmaster.com/arizona-cardinals-tickets/artist/805894",
                            "locale": "en-us",
                            "externalLinks": {
                                "twitter": [
                                    {
                                        "url": "https://twitter.com/AZCardinals"
                                    }
                                ],
                                "facebook": [
                                    {
                                        "url": "https://www.facebook.com/arizonacardinals/"
                                    }
                                ],
                                "wiki": [
                                    {
                                        "url": "https://en.wikipedia.org/wiki/Arizona_Cardinals"
                                    }
                                ],
                                "instagram": [
                                    {
                                        "url": "https://www.instagram.com/azcardinals/"
                                    }
                                ],
                                "homepage": [
                                    {
                                        "url": "https://www.azcardinals.com/"
                                    }
                                ]
                            },
                            "aliases": [
                                "az cardinals",
                                "arizona cardinals",
                                "az cards"
                            ],
                            "images": [
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_3_2.jpg",
                                    "width": 1024,
                                    "height": 683,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_EVENT_DETAIL_PAGE_16_9.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_16_9.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                    "width": 2048,
                                    "height": 1152,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_ARTIST_PAGE_3_2.jpg",
                                    "width": 305,
                                    "height": 203,
                                    "fallback": false
                                },
                                {
                                    "ratio": "4_3",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_CUSTOM.jpg",
                                    "width": 305,
                                    "height": 225,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RECOMENDATION_16_9.jpg",
                                    "width": 100,
                                    "height": 56,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_LANDSCAPE_16_9.jpg",
                                    "width": 1136,
                                    "height": 639,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_3_2.jpg",
                                    "width": 640,
                                    "height": 427,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_16_9.jpg",
                                    "width": 1024,
                                    "height": 576,
                                    "fallback": false
                                }
                            ],
                            "classifications": [
                                {
                                    "primary": true,
                                    "segment": {
                                        "id": "KZFzniwnSyZfZ7v7nE",
                                        "name": "Sports"
                                    },
                                    "genre": {
                                        "id": "KnvZfZ7vAdE",
                                        "name": "Football"
                                    },
                                    "subGenre": {
                                        "id": "KZazBEonSMnZfZ7vFE1",
                                        "name": "NFL"
                                    },
                                    "type": {
                                        "id": "KZAyXgnZfZ7v7l1",
                                        "name": "Group"
                                    },
                                    "subType": {
                                        "id": "KZFzBErXgnZfZ7vA7d",
                                        "name": "Team"
                                    },
                                    "family": false
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 13,
                                "_total": 13,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/attractions/K8vZ917198f?locale=en-us"
                                }
                            }
                        },
                        {
                            "name": "Baltimore Ravens",
                            "type": "attraction",
                            "id": "K8vZ91719eV",
                            "test": false,
                            "url": "https://www.ticketmaster.com/baltimore-ravens-tickets/artist/805901",
                            "locale": "en-us",
                            "externalLinks": {
                                "twitter": [
                                    {
                                        "url": "https://twitter.com/Ravens"
                                    }
                                ],
                                "facebook": [
                                    {
                                        "url": "https://www.facebook.com/baltimoreravens/"
                                    }
                                ],
                                "wiki": [
                                    {
                                        "url": "https://en.wikipedia.org/wiki/Baltimore_Ravens"
                                    }
                                ],
                                "instagram": [
                                    {
                                        "url": "https://www.instagram.com/ravens/"
                                    }
                                ],
                                "homepage": [
                                    {
                                        "url": "https://www.baltimoreravens.com/"
                                    }
                                ]
                            },
                            "images": [
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/917/44decbb0-0df0-43b3-a8ee-0814e49a4917_1324971_RETINA_LANDSCAPE_16_9.jpg",
                                    "width": 1136,
                                    "height": 639,
                                    "fallback": false
                                },
                                {
                                    "ratio": "4_3",
                                    "url": "https://s1.ticketm.net/dam/a/917/44decbb0-0df0-43b3-a8ee-0814e49a4917_1324971_CUSTOM.jpg",
                                    "width": 305,
                                    "height": 225,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/917/44decbb0-0df0-43b3-a8ee-0814e49a4917_1324971_RECOMENDATION_16_9.jpg",
                                    "width": 100,
                                    "height": 56,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/917/44decbb0-0df0-43b3-a8ee-0814e49a4917_1324971_RETINA_PORTRAIT_16_9.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/917/44decbb0-0df0-43b3-a8ee-0814e49a4917_1324971_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                    "width": 2048,
                                    "height": 1152,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/917/44decbb0-0df0-43b3-a8ee-0814e49a4917_1324971_RETINA_PORTRAIT_3_2.jpg",
                                    "width": 640,
                                    "height": 427,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/917/44decbb0-0df0-43b3-a8ee-0814e49a4917_1324971_EVENT_DETAIL_PAGE_16_9.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/917/44decbb0-0df0-43b3-a8ee-0814e49a4917_1324971_ARTIST_PAGE_3_2.jpg",
                                    "width": 305,
                                    "height": 203,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/917/44decbb0-0df0-43b3-a8ee-0814e49a4917_1324971_TABLET_LANDSCAPE_16_9.jpg",
                                    "width": 1024,
                                    "height": 576,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/917/44decbb0-0df0-43b3-a8ee-0814e49a4917_1324971_TABLET_LANDSCAPE_3_2.jpg",
                                    "width": 1024,
                                    "height": 683,
                                    "fallback": false
                                }
                            ],
                            "classifications": [
                                {
                                    "primary": true,
                                    "segment": {
                                        "id": "KZFzniwnSyZfZ7v7nE",
                                        "name": "Sports"
                                    },
                                    "genre": {
                                        "id": "KnvZfZ7vAdE",
                                        "name": "Football"
                                    },
                                    "subGenre": {
                                        "id": "KZazBEonSMnZfZ7vFE1",
                                        "name": "NFL"
                                    },
                                    "type": {
                                        "id": "KZAyXgnZfZ7v7l1",
                                        "name": "Group"
                                    },
                                    "subType": {
                                        "id": "KZFzBErXgnZfZ7vA7d",
                                        "name": "Team"
                                    },
                                    "family": false
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 12,
                                "_total": 12,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/attractions/K8vZ91719eV?locale=en-us"
                                }
                            }
                        }
                    ]
                }
            },
            {
                "name": "Houston Texans vs. Arizona Cardinals",
                "type": "event",
                "id": "G5dIZ9twBPfL1",
                "test": false,
                "url": "https://www.ticketmaster.com/houston-texans-vs-arizona-cardinals-houston-texas-11-19-2023/event/3A005E9CBA9547CA",
                "locale": "en-us",
                "images": [
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/ed2/7c4f487d-54ee-44aa-847f-adb3e99cbed2_1325211_ARTIST_PAGE_3_2.jpg",
                        "width": 305,
                        "height": 203,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/ed2/7c4f487d-54ee-44aa-847f-adb3e99cbed2_1325211_TABLET_LANDSCAPE_3_2.jpg",
                        "width": 1024,
                        "height": 683,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/ed2/7c4f487d-54ee-44aa-847f-adb3e99cbed2_1325211_RETINA_PORTRAIT_16_9.jpg",
                        "width": 640,
                        "height": 360,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/ed2/7c4f487d-54ee-44aa-847f-adb3e99cbed2_1325211_RETINA_PORTRAIT_3_2.jpg",
                        "width": 640,
                        "height": 427,
                        "fallback": false
                    },
                    {
                        "ratio": "4_3",
                        "url": "https://s1.ticketm.net/dam/a/ed2/7c4f487d-54ee-44aa-847f-adb3e99cbed2_1325211_CUSTOM.jpg",
                        "width": 305,
                        "height": 225,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/ed2/7c4f487d-54ee-44aa-847f-adb3e99cbed2_1325211_EVENT_DETAIL_PAGE_16_9.jpg",
                        "width": 205,
                        "height": 115,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/ed2/7c4f487d-54ee-44aa-847f-adb3e99cbed2_1325211_RECOMENDATION_16_9.jpg",
                        "width": 100,
                        "height": 56,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/ed2/7c4f487d-54ee-44aa-847f-adb3e99cbed2_1325211_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                        "width": 2048,
                        "height": 1152,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/ed2/7c4f487d-54ee-44aa-847f-adb3e99cbed2_1325211_RETINA_LANDSCAPE_16_9.jpg",
                        "width": 1136,
                        "height": 639,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/ed2/7c4f487d-54ee-44aa-847f-adb3e99cbed2_1325211_TABLET_LANDSCAPE_16_9.jpg",
                        "width": 1024,
                        "height": 576,
                        "fallback": false
                    }
                ],
                "sales": {
                    "public": {
                        "startDateTime": "2023-05-12T00:00:00Z",
                        "startTBD": false,
                        "startTBA": false,
                        "endDateTime": "2023-11-19T20:00:00Z"
                    },
                    "presales": [
                        {
                            "startDateTime": "2023-05-12T00:00:00Z",
                            "endDateTime": "2023-05-12T01:00:00Z",
                            "name": "Season Ticket Member Offer"
                        }
                    ]
                },
                "dates": {
                    "start": {
                        "localDate": "2023-11-19",
                        "localTime": "12:00:00",
                        "dateTime": "2023-11-19T18:00:00Z",
                        "dateTBD": false,
                        "dateTBA": false,
                        "timeTBA": false,
                        "noSpecificTime": false
                    },
                    "timezone": "America/Chicago",
                    "status": {
                        "code": "onsale"
                    },
                    "spanMultipleDays": false
                },
                "classifications": [
                    {
                        "primary": true,
                        "segment": {
                            "id": "KZFzniwnSyZfZ7v7nE",
                            "name": "Sports"
                        },
                        "genre": {
                            "id": "KnvZfZ7vAdE",
                            "name": "Football"
                        },
                        "subGenre": {
                            "id": "KZazBEonSMnZfZ7vFE1",
                            "name": "NFL"
                        },
                        "type": {
                            "id": "KZAyXgnZfZ7v7l1",
                            "name": "Group"
                        },
                        "subType": {
                            "id": "KZFzBErXgnZfZ7vA7d",
                            "name": "Team"
                        },
                        "family": false
                    }
                ],
                "promoter": {
                    "id": "705",
                    "name": "NFL REGULAR SEASON",
                    "description": "NFL REGULAR SEASON / NTL / USA"
                },
                "promoters": [
                    {
                        "id": "705",
                        "name": "NFL REGULAR SEASON",
                        "description": "NFL REGULAR SEASON / NTL / USA"
                    }
                ],
                "info": "Please be aware that this event is subject to NFL flexible scheduling procedures. The date and time for some games may change from what is currently reflected on the schedule and from what may appear on the ticket. For more detailed information regarding scheduling for the 2023 NFL Season. All children over the age of 2 will need a game ticket.",
                "pleaseNote": "Please be aware that this event is subject to NFL flexible scheduling procedures. The date and time for some games may change from what is currently reflected on the schedule and from what may appear on the ticket. For more detailed information regarding scheduling for the 2023 NFL Season. https://www.nfl.com/schedules/flexible-scheduling-procedures",
                "priceRanges": [
                    {
                        "type": "standard",
                        "currency": "USD",
                        "min": 60,
                        "max": 430
                    }
                ],
                "products": [
                    {
                        "name": "PARKING: NRG Stadium - Houston Texans v Cardinals",
                        "id": "G5dIZ9nkp1wva",
                        "url": "https://www.ticketmaster.com/parking-nrg-stadium-houston-texans-v-houston-texas-11-19-2023/event/3A005EA1962B2049",
                        "type": "Parking",
                        "classifications": [
                            {
                                "primary": true,
                                "segment": {
                                    "id": "KZFzniwnSyZfZ7v7n1",
                                    "name": "Miscellaneous"
                                },
                                "genre": {
                                    "id": "KnvZfZ7v7ll",
                                    "name": "Undefined"
                                },
                                "subGenre": {
                                    "id": "KZazBEonSMnZfZ7vAv1",
                                    "name": "Undefined"
                                },
                                "type": {
                                    "id": "KZAyXgnZfZ7vAva",
                                    "name": "Parking"
                                },
                                "subType": {
                                    "id": "KZFzBErXgnZfZ7vAFe",
                                    "name": "Regular"
                                },
                                "family": false
                            }
                        ]
                    }
                ],
                "seatmap": {
                    "staticUrl": "https://maps.ticketmaster.com/maps/geometry/3/event/3A005E9CBA9547CA/staticImage?type=png&systemId=HOST"
                },
                "accessibility": {
                    "info": "Wheelchair accessible and companion seating available for ADA seating requests.  There is a 4 ticket limit for ADA seat requests.  All ADA seating is subject to availability",
                    "ticketLimit": 4
                },
                "ticketLimit": {
                    "info": "There is an eight (8) ticket limit for this event."
                },
                "ageRestrictions": {
                    "legalAgeEnforced": false
                },
                "ticketing": {
                    "safeTix": {
                        "enabled": true
                    },
                    "allInclusivePricing": {
                        "enabled": false
                    }
                },
                "_links": {
                    "self": {
                        "href": "/discovery/v2/events/G5dIZ9twBPfL1?locale=en-us"
                    },
                    "attractions": [
                        {
                            "href": "/discovery/v2/attractions/K8vZ91756Kf?locale=en-us"
                        },
                        {
                            "href": "/discovery/v2/attractions/K8vZ917198f?locale=en-us"
                        }
                    ],
                    "venues": [
                        {
                            "href": "/discovery/v2/venues/KovZpZAEdFeA?locale=en-us"
                        }
                    ]
                },
                "_embedded": {
                    "venues": [
                        {
                            "name": "NRG Stadium",
                            "type": "venue",
                            "id": "KovZpZAEdFeA",
                            "test": false,
                            "url": "https://www.ticketmaster.com/nrg-stadium-tickets-houston/venue/475596",
                            "locale": "en-us",
                            "images": [
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dbimages/18743v.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                }
                            ],
                            "postalCode": "77054",
                            "timezone": "America/Chicago",
                            "city": {
                                "name": "Houston"
                            },
                            "state": {
                                "name": "Texas",
                                "stateCode": "TX"
                            },
                            "country": {
                                "name": "United States Of America",
                                "countryCode": "US"
                            },
                            "address": {
                                "line1": "One NRG Park"
                            },
                            "location": {
                                "longitude": "-95.410875",
                                "latitude": "29.684885"
                            },
                            "markets": [
                                {
                                    "name": "Houston and More",
                                    "id": "22"
                                },
                                {
                                    "name": "All of US",
                                    "id": "51"
                                },
                                {
                                    "name": "Beaumont",
                                    "id": "123"
                                }
                            ],
                            "dmas": [
                                {
                                    "id": 200
                                },
                                {
                                    "id": 227
                                },
                                {
                                    "id": 300
                                },
                                {
                                    "id": 408
                                }
                            ],
                            "social": {
                                "twitter": {
                                    "handle": "@NRGparkfan"
                                }
                            },
                            "boxOfficeInfo": {
                                "phoneNumberDetail": "For NRG Stadium information 832-667-1400.",
                                "openHoursDetail": "Monday-Friday 10am-5pm Saturday 10am-2pm. Hours subject to change.",
                                "acceptedPaymentDetail": "cash, visa, mc, amex & discover - no checks",
                                "willCallDetail": "TO PICK UP Will Call -- you must present your confirmation number, a picture ID and the credit card used to purchase your tickets. You must wait 48 hours after ordering to pick up your tickets."
                            },
                            "parkingDetail": "Price per car varies per event. Buses and oversized vehicles are more.",
                            "generalInfo": {
                                "generalRule": "No outside items including food or beverages may be brought in. No video cameras or equipment",
                                "childRule": "Children ages 2 and older need a ticket."
                            },
                            "upcomingEvents": {
                                "tmr": 23,
                                "ticketmaster": 17,
                                "_total": 40,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/venues/KovZpZAEdFeA?locale=en-us"
                                }
                            }
                        }
                    ],
                    "attractions": [
                        {
                            "name": "Houston Texans",
                            "type": "attraction",
                            "id": "K8vZ91756Kf",
                            "test": false,
                            "url": "https://www.ticketmaster.com/houston-texans-tickets/artist/821630",
                            "locale": "en-us",
                            "externalLinks": {
                                "twitter": [
                                    {
                                        "url": "https://www.twitter.com/HoustonTexans"
                                    }
                                ],
                                "facebook": [
                                    {
                                        "url": "https://www.facebook.com/HoustonTexans"
                                    }
                                ],
                                "wiki": [
                                    {
                                        "url": "https://en.wikipedia.org/wiki/Houston_Texans"
                                    }
                                ],
                                "instagram": [
                                    {
                                        "url": "https://www.instagram.com/HoustonTexans"
                                    }
                                ],
                                "homepage": [
                                    {
                                        "url": "https://www.houstontexans.com/"
                                    }
                                ]
                            },
                            "images": [
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/ed2/7c4f487d-54ee-44aa-847f-adb3e99cbed2_1325211_ARTIST_PAGE_3_2.jpg",
                                    "width": 305,
                                    "height": 203,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/ed2/7c4f487d-54ee-44aa-847f-adb3e99cbed2_1325211_TABLET_LANDSCAPE_3_2.jpg",
                                    "width": 1024,
                                    "height": 683,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/ed2/7c4f487d-54ee-44aa-847f-adb3e99cbed2_1325211_RETINA_PORTRAIT_16_9.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/ed2/7c4f487d-54ee-44aa-847f-adb3e99cbed2_1325211_RETINA_PORTRAIT_3_2.jpg",
                                    "width": 640,
                                    "height": 427,
                                    "fallback": false
                                },
                                {
                                    "ratio": "4_3",
                                    "url": "https://s1.ticketm.net/dam/a/ed2/7c4f487d-54ee-44aa-847f-adb3e99cbed2_1325211_CUSTOM.jpg",
                                    "width": 305,
                                    "height": 225,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/ed2/7c4f487d-54ee-44aa-847f-adb3e99cbed2_1325211_EVENT_DETAIL_PAGE_16_9.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/ed2/7c4f487d-54ee-44aa-847f-adb3e99cbed2_1325211_RECOMENDATION_16_9.jpg",
                                    "width": 100,
                                    "height": 56,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/ed2/7c4f487d-54ee-44aa-847f-adb3e99cbed2_1325211_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                    "width": 2048,
                                    "height": 1152,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/ed2/7c4f487d-54ee-44aa-847f-adb3e99cbed2_1325211_RETINA_LANDSCAPE_16_9.jpg",
                                    "width": 1136,
                                    "height": 639,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/ed2/7c4f487d-54ee-44aa-847f-adb3e99cbed2_1325211_TABLET_LANDSCAPE_16_9.jpg",
                                    "width": 1024,
                                    "height": 576,
                                    "fallback": false
                                }
                            ],
                            "classifications": [
                                {
                                    "primary": true,
                                    "segment": {
                                        "id": "KZFzniwnSyZfZ7v7nE",
                                        "name": "Sports"
                                    },
                                    "genre": {
                                        "id": "KnvZfZ7vAdE",
                                        "name": "Football"
                                    },
                                    "subGenre": {
                                        "id": "KZazBEonSMnZfZ7vFE1",
                                        "name": "NFL"
                                    },
                                    "type": {
                                        "id": "KZAyXgnZfZ7v7l1",
                                        "name": "Group"
                                    },
                                    "subType": {
                                        "id": "KZFzBErXgnZfZ7vA7d",
                                        "name": "Team"
                                    },
                                    "family": false
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 14,
                                "_total": 14,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/attractions/K8vZ91756Kf?locale=en-us"
                                }
                            }
                        },
                        {
                            "name": "Arizona Cardinals",
                            "type": "attraction",
                            "id": "K8vZ917198f",
                            "test": false,
                            "url": "https://www.ticketmaster.com/arizona-cardinals-tickets/artist/805894",
                            "locale": "en-us",
                            "externalLinks": {
                                "twitter": [
                                    {
                                        "url": "https://twitter.com/AZCardinals"
                                    }
                                ],
                                "facebook": [
                                    {
                                        "url": "https://www.facebook.com/arizonacardinals/"
                                    }
                                ],
                                "wiki": [
                                    {
                                        "url": "https://en.wikipedia.org/wiki/Arizona_Cardinals"
                                    }
                                ],
                                "instagram": [
                                    {
                                        "url": "https://www.instagram.com/azcardinals/"
                                    }
                                ],
                                "homepage": [
                                    {
                                        "url": "https://www.azcardinals.com/"
                                    }
                                ]
                            },
                            "aliases": [
                                "az cardinals",
                                "arizona cardinals",
                                "az cards"
                            ],
                            "images": [
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_3_2.jpg",
                                    "width": 1024,
                                    "height": 683,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_EVENT_DETAIL_PAGE_16_9.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_16_9.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                    "width": 2048,
                                    "height": 1152,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_ARTIST_PAGE_3_2.jpg",
                                    "width": 305,
                                    "height": 203,
                                    "fallback": false
                                },
                                {
                                    "ratio": "4_3",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_CUSTOM.jpg",
                                    "width": 305,
                                    "height": 225,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RECOMENDATION_16_9.jpg",
                                    "width": 100,
                                    "height": 56,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_LANDSCAPE_16_9.jpg",
                                    "width": 1136,
                                    "height": 639,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_3_2.jpg",
                                    "width": 640,
                                    "height": 427,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_16_9.jpg",
                                    "width": 1024,
                                    "height": 576,
                                    "fallback": false
                                }
                            ],
                            "classifications": [
                                {
                                    "primary": true,
                                    "segment": {
                                        "id": "KZFzniwnSyZfZ7v7nE",
                                        "name": "Sports"
                                    },
                                    "genre": {
                                        "id": "KnvZfZ7vAdE",
                                        "name": "Football"
                                    },
                                    "subGenre": {
                                        "id": "KZazBEonSMnZfZ7vFE1",
                                        "name": "NFL"
                                    },
                                    "type": {
                                        "id": "KZAyXgnZfZ7v7l1",
                                        "name": "Group"
                                    },
                                    "subType": {
                                        "id": "KZFzBErXgnZfZ7vA7d",
                                        "name": "Team"
                                    },
                                    "family": false
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 13,
                                "_total": 13,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/attractions/K8vZ917198f?locale=en-us"
                                }
                            }
                        }
                    ]
                }
            },
            {
                "name": "Chicago Bears vs. Arizona Cardinals",
                "type": "event",
                "id": "vvG18Z9JDLs3Qu",
                "test": false,
                "url": "https://www.ticketmaster.com/chicago-bears-vs-arizona-cardinals-chicago-illinois-12-24-2023/event/04005E6EDFC5268D",
                "locale": "en-us",
                "images": [
                    {
                        "ratio": "4_3",
                        "url": "https://s1.ticketm.net/dam/a/0c4/725d27e6-8984-456e-8461-13e1b71bc0c4_1325051_CUSTOM.jpg",
                        "width": 305,
                        "height": 225,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/0c4/725d27e6-8984-456e-8461-13e1b71bc0c4_1325051_ARTIST_PAGE_3_2.jpg",
                        "width": 305,
                        "height": 203,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/0c4/725d27e6-8984-456e-8461-13e1b71bc0c4_1325051_TABLET_LANDSCAPE_16_9.jpg",
                        "width": 1024,
                        "height": 576,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/0c4/725d27e6-8984-456e-8461-13e1b71bc0c4_1325051_RETINA_PORTRAIT_3_2.jpg",
                        "width": 640,
                        "height": 427,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/0c4/725d27e6-8984-456e-8461-13e1b71bc0c4_1325051_RECOMENDATION_16_9.jpg",
                        "width": 100,
                        "height": 56,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/0c4/725d27e6-8984-456e-8461-13e1b71bc0c4_1325051_EVENT_DETAIL_PAGE_16_9.jpg",
                        "width": 205,
                        "height": 115,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/0c4/725d27e6-8984-456e-8461-13e1b71bc0c4_1325051_RETINA_PORTRAIT_16_9.jpg",
                        "width": 640,
                        "height": 360,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/0c4/725d27e6-8984-456e-8461-13e1b71bc0c4_1325051_TABLET_LANDSCAPE_3_2.jpg",
                        "width": 1024,
                        "height": 683,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/0c4/725d27e6-8984-456e-8461-13e1b71bc0c4_1325051_RETINA_LANDSCAPE_16_9.jpg",
                        "width": 1136,
                        "height": 639,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/0c4/725d27e6-8984-456e-8461-13e1b71bc0c4_1325051_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                        "width": 2048,
                        "height": 1152,
                        "fallback": false
                    }
                ],
                "sales": {
                    "public": {
                        "startDateTime": "2023-05-12T01:30:00Z",
                        "startTBD": false,
                        "startTBA": false,
                        "endDateTime": "2023-12-24T22:25:00Z"
                    },
                    "presales": [
                        {
                            "startDateTime": "2023-05-12T00:00:00Z",
                            "endDateTime": "2023-05-12T01:00:00Z",
                            "name": "Presale"
                        }
                    ]
                },
                "dates": {
                    "start": {
                        "localDate": "2023-12-24",
                        "localTime": "15:25:00",
                        "dateTime": "2023-12-24T21:25:00Z",
                        "dateTBD": false,
                        "dateTBA": false,
                        "timeTBA": false,
                        "noSpecificTime": false
                    },
                    "timezone": "America/Chicago",
                    "status": {
                        "code": "onsale"
                    },
                    "spanMultipleDays": false
                },
                "classifications": [
                    {
                        "primary": true,
                        "segment": {
                            "id": "KZFzniwnSyZfZ7v7nE",
                            "name": "Sports"
                        },
                        "genre": {
                            "id": "KnvZfZ7vAdE",
                            "name": "Football"
                        },
                        "subGenre": {
                            "id": "KZazBEonSMnZfZ7vFE1",
                            "name": "NFL"
                        },
                        "type": {
                            "id": "KZAyXgnZfZ7v7l1",
                            "name": "Group"
                        },
                        "subType": {
                            "id": "KZFzBErXgnZfZ7vA7d",
                            "name": "Team"
                        },
                        "family": false
                    }
                ],
                "promoter": {
                    "id": "705",
                    "name": "NFL REGULAR SEASON",
                    "description": "NFL REGULAR SEASON / NTL / USA"
                },
                "promoters": [
                    {
                        "id": "705",
                        "name": "NFL REGULAR SEASON",
                        "description": "NFL REGULAR SEASON / NTL / USA"
                    }
                ],
                "info": "THE DATE AND TIME OF THE GAME ARE SUBJECT TO CHANGE BY THE NFL, IN ACCORDANCE WITH ITS SCHEDULING POLICIES OR AS A RESULT OF OTHER ACTIONS OR EVENTS BEYOND THE NFL'S CONTROL. NO REFUND WILL BE PROVIDED IF TICKET HOLDER CANNOT ATTEND. Please also be aware that there are certain games scheduled during the NFLs flexible scheduling window for which the date and time of the games may be changed from what is originally reflected on the schedule and what may appear on the ticket. For more detailed information about NFL flexible scheduling procedures for the 2023 NFL Season, please visit https://www.nfl.com/schedules/flexible-scheduling-procedures.",
                "pleaseNote": "This event is Mobile Only. All sales are final, NO REFUNDS OR EXCHANGES. Please also be aware that there are certain games scheduled during the NFLs flexible scheduling window for which the date and time of the games may be changed from what is originally reflected on the schedule and what may appear on the ticket. For more detailed information about NFL flexible scheduling procedures for the 2023 NFL Season, please visit https://www.nfl.com/schedules/flexible-scheduling-procedures.",
                "priceRanges": [
                    {
                        "type": "standard",
                        "currency": "USD",
                        "min": 64,
                        "max": 614
                    }
                ],
                "seatmap": {
                    "staticUrl": "https://maps.ticketmaster.com/maps/geometry/3/event/04005E6EDFC5268D/staticImage?type=png&systemId=HOST"
                },
                "accessibility": {
                    "info": "Wheelchair seating is available for each home game through Ticketmaster. Should the wheelchair seating allocation through Ticketmaster become exhausted, fans with disabilities are encouraged to proceed with the purchase of conventional seating - if available - then call the Bears Ticket Office at 847.615.BEAR(2327) to arrange an exchange.",
                    "ticketLimit": 4
                },
                "ticketLimit": {
                    "info": "There is a fourteen (14) ticket limit."
                },
                "ageRestrictions": {
                    "legalAgeEnforced": false
                },
                "ticketing": {
                    "safeTix": {
                        "enabled": true
                    },
                    "allInclusivePricing": {
                        "enabled": false
                    }
                },
                "_links": {
                    "self": {
                        "href": "/discovery/v2/events/vvG18Z9JDLs3Qu?locale=en-us"
                    },
                    "attractions": [
                        {
                            "href": "/discovery/v2/attractions/K8vZ9171ou7?locale=en-us"
                        },
                        {
                            "href": "/discovery/v2/attractions/K8vZ917198f?locale=en-us"
                        }
                    ],
                    "venues": [
                        {
                            "href": "/discovery/v2/venues/KovZpZAF6tIA?locale=en-us"
                        }
                    ]
                },
                "_embedded": {
                    "venues": [
                        {
                            "name": "Soldier Field",
                            "type": "venue",
                            "id": "KovZpZAF6tIA",
                            "test": false,
                            "url": "https://www.ticketmaster.com/soldier-field-tickets-chicago/venue/32827",
                            "locale": "en-us",
                            "images": [
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dbimages/7047v.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                }
                            ],
                            "postalCode": "60605",
                            "timezone": "America/Chicago",
                            "city": {
                                "name": "Chicago"
                            },
                            "state": {
                                "name": "Illinois",
                                "stateCode": "IL"
                            },
                            "country": {
                                "name": "United States Of America",
                                "countryCode": "US"
                            },
                            "address": {
                                "line1": "1410 S. Museum Campus Drive"
                            },
                            "location": {
                                "longitude": "-87.61682143",
                                "latitude": "41.86205404"
                            },
                            "markets": [
                                {
                                    "name": "Chicagoland and Northern Il",
                                    "id": "3"
                                },
                                {
                                    "name": "Central Illinois",
                                    "id": "54"
                                }
                            ],
                            "dmas": [
                                {
                                    "id": 242
                                },
                                {
                                    "id": 249
                                },
                                {
                                    "id": 357
                                },
                                {
                                    "id": 373
                                }
                            ],
                            "social": {
                                "twitter": {
                                    "handle": "@SoldierField"
                                }
                            },
                            "boxOfficeInfo": {
                                "phoneNumberDetail": "For non Bears events please call (312) 235-7000",
                                "openHoursDetail": "Chicago Bears ticket office is available by phone Monday-Friday 8am-5pm CST. The Soldier Field Box Office is open only on game days, their phone number is (312) 235-7000.",
                                "acceptedPaymentDetail": "The Box Office accepts cash only for Chicago Bears games. Soldier Field games accept Visa, Mastercard, American Express, Cash.",
                                "willCallDetail": "Chicago Bears events: Tickets may be picked up at the Will Call Window outside of Gate 10, 2 hours before the event. Gate 10 is located on the southeast side of Soldier Field. Customers must have the actual credit card, picture ID and the confirmation number to receive their tickets. Soldier Field events: Will Call is available on the day of the event only. Government issued photo i.d. and the credit card used for the purchase will be required to claim tickets. Typically will call opens 90 minutes to an hour before the scheduled event."
                            },
                            "parkingDetail": "Chicago Bears Parking Information: All of the spaces in the on-site parking lots near Soldier Field are pre-sold for the entire season to Bears season ticket holders. If you do not have a pre-paid coupon, here are some options for you: If you prefer to tailgate before the Bears games, you can park in the 31st Street McCormick Place Lot. It costs $16 and there are shuttle buses to bring you to the 18th Street Shuttle Turnaround, directly across from the stadium. You can also walk to the stadium from the 31st Street Lot. If you don't want to tailgate, we recommend you park in the East Monroe Street / Millennium Park garages, located at Columbus Drive and Monroe Street. It costs $13 and you can then take the free shuttle directly to the 18th Street Shuttle Turnaround. The shuttle bus takes about 10 minutes because it travels on a specially designed bus way which keeps it out of most Soldier Field traffic. There are over 40 buses continuously shuttling fans beginning five hours prior to kickoff. Lastly, we recommend taking public transportation. The Transportation Center, located northeast of the stadium (at the corner of McFetridge and Museum Campus Drive) is where the CTA, Metra shuttle, and PACE bus services will be available for fans drop-off and pick-up. The CTA's train service for the Red, Orange or Green Lines are available at the Roosevelt Road and State Street Station. For schedule and route information, please contact: RTA (312) 836-7000 or rtachicago.com CTA (888) YOUR-CTA or transitchicago.com",
                            "accessibleSeatingDetail": "Accessible Seating Information for Chicago Bears games: For Chicago Bears accessible seating please purchase the best available seating and contact the Chicago Bears at 847-615-2327 for an exchange after purchase is complete. Accessible Seating Information for Other Soldier Field events: Accessible seating is available through Ticketmaster. Do NOT contact the Chicago Bears for accessible seating information on non-Bears events at Soldier Field",
                            "generalInfo": {
                                "generalRule": "Cameras and recording devices are N O T permitted. No umbrellas, cans, or bottles can be brought into the stadium. Chicago Bears: The Smoke Free Act prohibits smoking in all public venues. In order to be compliant with the Smoke-Free Illinois Act, smoking will be prohibited at all Chicago Bears events at Soldier Field. There will be no designated smoking areas inside or outside of the stadium, and re-entry is prohibited. The smoking policy will be strictly enforced. Violaters are subject to ejection from the stadium; repeated violations can resultin the result in the forfeiting of ticket privileges. Ushers and security officers will be enforcing the new smoke-free policy. First-time violaters of the smoking policy will be asked to exchange their ticket for a \"Smoking Card\". Any patron refusing to exchange thier ticket will be ejected from the stadium. If a patron is then smoking in the stadium for a second time, he or she will be ejected.",
                                "childRule": "Our policy is that if your child can walk under the turnstiles (approximately 32 inches) then you should go to Gate 10 on the south east side of Soldier Field on gameday to receive a complimentary lap pass for that day's game for the child. The child will have to sit on a ticketed patron’s lap for the game. The entire party will then be admitted to the stadium at Gate 10. Strollers are not permitted in the stadium."
                            },
                            "upcomingEvents": {
                                "ticketmaster": 23,
                                "_total": 23,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/venues/KovZpZAF6tIA?locale=en-us"
                                }
                            }
                        }
                    ],
                    "attractions": [
                        {
                            "name": "Chicago Bears",
                            "type": "attraction",
                            "id": "K8vZ9171ou7",
                            "test": false,
                            "url": "https://www.ticketmaster.com/chicago-bears-tickets/artist/805912",
                            "locale": "en-us",
                            "externalLinks": {
                                "twitter": [
                                    {
                                        "url": "https://twitter.com/ChicagoBears"
                                    }
                                ],
                                "facebook": [
                                    {
                                        "url": "https://www.facebook.com/ChicagoBears/"
                                    }
                                ],
                                "wiki": [
                                    {
                                        "url": "https://en.wikipedia.org/wiki/Chicago_Bears"
                                    }
                                ],
                                "instagram": [
                                    {
                                        "url": "https://www.instagram.com/chicagobears/"
                                    }
                                ],
                                "homepage": [
                                    {
                                        "url": "https://www.chicagobears.com/"
                                    }
                                ]
                            },
                            "images": [
                                {
                                    "ratio": "4_3",
                                    "url": "https://s1.ticketm.net/dam/a/0c4/725d27e6-8984-456e-8461-13e1b71bc0c4_1325051_CUSTOM.jpg",
                                    "width": 305,
                                    "height": 225,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/0c4/725d27e6-8984-456e-8461-13e1b71bc0c4_1325051_ARTIST_PAGE_3_2.jpg",
                                    "width": 305,
                                    "height": 203,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/0c4/725d27e6-8984-456e-8461-13e1b71bc0c4_1325051_TABLET_LANDSCAPE_16_9.jpg",
                                    "width": 1024,
                                    "height": 576,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/0c4/725d27e6-8984-456e-8461-13e1b71bc0c4_1325051_RETINA_PORTRAIT_3_2.jpg",
                                    "width": 640,
                                    "height": 427,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/0c4/725d27e6-8984-456e-8461-13e1b71bc0c4_1325051_RECOMENDATION_16_9.jpg",
                                    "width": 100,
                                    "height": 56,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/0c4/725d27e6-8984-456e-8461-13e1b71bc0c4_1325051_EVENT_DETAIL_PAGE_16_9.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/0c4/725d27e6-8984-456e-8461-13e1b71bc0c4_1325051_RETINA_PORTRAIT_16_9.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/0c4/725d27e6-8984-456e-8461-13e1b71bc0c4_1325051_TABLET_LANDSCAPE_3_2.jpg",
                                    "width": 1024,
                                    "height": 683,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/0c4/725d27e6-8984-456e-8461-13e1b71bc0c4_1325051_RETINA_LANDSCAPE_16_9.jpg",
                                    "width": 1136,
                                    "height": 639,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/0c4/725d27e6-8984-456e-8461-13e1b71bc0c4_1325051_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                    "width": 2048,
                                    "height": 1152,
                                    "fallback": false
                                }
                            ],
                            "classifications": [
                                {
                                    "primary": true,
                                    "segment": {
                                        "id": "KZFzniwnSyZfZ7v7nE",
                                        "name": "Sports"
                                    },
                                    "genre": {
                                        "id": "KnvZfZ7vAdE",
                                        "name": "Football"
                                    },
                                    "subGenre": {
                                        "id": "KZazBEonSMnZfZ7vFE1",
                                        "name": "NFL"
                                    },
                                    "type": {
                                        "id": "KZAyXgnZfZ7v7l1",
                                        "name": "Group"
                                    },
                                    "subType": {
                                        "id": "KZFzBErXgnZfZ7vA7d",
                                        "name": "Team"
                                    },
                                    "family": false
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 12,
                                "_total": 12,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/attractions/K8vZ9171ou7?locale=en-us"
                                }
                            }
                        },
                        {
                            "name": "Arizona Cardinals",
                            "type": "attraction",
                            "id": "K8vZ917198f",
                            "test": false,
                            "url": "https://www.ticketmaster.com/arizona-cardinals-tickets/artist/805894",
                            "locale": "en-us",
                            "externalLinks": {
                                "twitter": [
                                    {
                                        "url": "https://twitter.com/AZCardinals"
                                    }
                                ],
                                "facebook": [
                                    {
                                        "url": "https://www.facebook.com/arizonacardinals/"
                                    }
                                ],
                                "wiki": [
                                    {
                                        "url": "https://en.wikipedia.org/wiki/Arizona_Cardinals"
                                    }
                                ],
                                "instagram": [
                                    {
                                        "url": "https://www.instagram.com/azcardinals/"
                                    }
                                ],
                                "homepage": [
                                    {
                                        "url": "https://www.azcardinals.com/"
                                    }
                                ]
                            },
                            "aliases": [
                                "az cardinals",
                                "arizona cardinals",
                                "az cards"
                            ],
                            "images": [
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_3_2.jpg",
                                    "width": 1024,
                                    "height": 683,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_EVENT_DETAIL_PAGE_16_9.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_16_9.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                    "width": 2048,
                                    "height": 1152,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_ARTIST_PAGE_3_2.jpg",
                                    "width": 305,
                                    "height": 203,
                                    "fallback": false
                                },
                                {
                                    "ratio": "4_3",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_CUSTOM.jpg",
                                    "width": 305,
                                    "height": 225,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RECOMENDATION_16_9.jpg",
                                    "width": 100,
                                    "height": 56,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_LANDSCAPE_16_9.jpg",
                                    "width": 1136,
                                    "height": 639,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_3_2.jpg",
                                    "width": 640,
                                    "height": 427,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_16_9.jpg",
                                    "width": 1024,
                                    "height": 576,
                                    "fallback": false
                                }
                            ],
                            "classifications": [
                                {
                                    "primary": true,
                                    "segment": {
                                        "id": "KZFzniwnSyZfZ7v7nE",
                                        "name": "Sports"
                                    },
                                    "genre": {
                                        "id": "KnvZfZ7vAdE",
                                        "name": "Football"
                                    },
                                    "subGenre": {
                                        "id": "KZazBEonSMnZfZ7vFE1",
                                        "name": "NFL"
                                    },
                                    "type": {
                                        "id": "KZAyXgnZfZ7v7l1",
                                        "name": "Group"
                                    },
                                    "subType": {
                                        "id": "KZFzBErXgnZfZ7vA7d",
                                        "name": "Team"
                                    },
                                    "family": false
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 13,
                                "_total": 13,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/attractions/K8vZ917198f?locale=en-us"
                                }
                            }
                        }
                    ]
                }
            },
            {
                "name": "Arizona Cardinals Vs Atlanta Falcons",
                "type": "event",
                "id": "G5v0Z9tnTkfFI",
                "test": false,
                "url": "https://www.ticketmaster.com/arizona-cardinals-vs-atlanta-falcons-glendale-arizona-11-12-2023/event/19005E9ABF194228",
                "locale": "en-us",
                "images": [
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_3_2.jpg",
                        "width": 1024,
                        "height": 683,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_EVENT_DETAIL_PAGE_16_9.jpg",
                        "width": 205,
                        "height": 115,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_16_9.jpg",
                        "width": 640,
                        "height": 360,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                        "width": 2048,
                        "height": 1152,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_ARTIST_PAGE_3_2.jpg",
                        "width": 305,
                        "height": 203,
                        "fallback": false
                    },
                    {
                        "ratio": "4_3",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_CUSTOM.jpg",
                        "width": 305,
                        "height": 225,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RECOMENDATION_16_9.jpg",
                        "width": 100,
                        "height": 56,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_LANDSCAPE_16_9.jpg",
                        "width": 1136,
                        "height": 639,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_3_2.jpg",
                        "width": 640,
                        "height": 427,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_16_9.jpg",
                        "width": 1024,
                        "height": 576,
                        "fallback": false
                    }
                ],
                "sales": {
                    "public": {
                        "startDateTime": "2023-05-12T05:00:00Z",
                        "startTBD": false,
                        "startTBA": false,
                        "endDateTime": "2023-11-12T22:05:00Z"
                    },
                    "presales": [
                        {
                            "startDateTime": "2023-05-12T00:00:00Z",
                            "endDateTime": "2023-05-12T05:00:00Z",
                            "name": "Resale Onsale"
                        }
                    ]
                },
                "dates": {
                    "start": {
                        "localDate": "2023-11-12",
                        "localTime": "14:05:00",
                        "dateTime": "2023-11-12T21:05:00Z",
                        "dateTBD": false,
                        "dateTBA": false,
                        "timeTBA": false,
                        "noSpecificTime": false
                    },
                    "timezone": "America/Phoenix",
                    "status": {
                        "code": "onsale"
                    },
                    "spanMultipleDays": false
                },
                "classifications": [
                    {
                        "primary": true,
                        "segment": {
                            "id": "KZFzniwnSyZfZ7v7nE",
                            "name": "Sports"
                        },
                        "genre": {
                            "id": "KnvZfZ7vAdE",
                            "name": "Football"
                        },
                        "subGenre": {
                            "id": "KZazBEonSMnZfZ7vFE1",
                            "name": "NFL"
                        },
                        "type": {
                            "id": "KZAyXgnZfZ7v7l1",
                            "name": "Group"
                        },
                        "subType": {
                            "id": "KZFzBErXgnZfZ7vA7d",
                            "name": "Team"
                        },
                        "family": false
                    }
                ],
                "promoter": {
                    "id": "4635",
                    "name": "SEATGEEK",
                    "description": "SEATGEEK / NTL / USA"
                },
                "promoters": [
                    {
                        "id": "4635",
                        "name": "SEATGEEK",
                        "description": "SEATGEEK / NTL / USA"
                    }
                ],
                "info": "Please be aware that this event is subject to NFL flexible scheduling procedures. The date and time for some games may change from what is currently reflected on the schedule and from what may appear on the ticket. For more detailed information regarding scheduling for the 2023 NFL Season, please visit",
                "pleaseNote": "Please be aware that this event is subject to NFL flexible scheduling procedures. The date and time for some games may change from what is currently reflected on the schedule and from what may appear on the ticket. For more detailed information regarding scheduling for the 2023 NFL Season, please visit https://www.nfl.com/schedules/flexible-scheduling-procedures",
                "seatmap": {
                    "staticUrl": "https://maps.ticketmaster.com/maps/geometry/3/event/19005E9ABF194228/staticImage?type=png&systemId=HOST"
                },
                "accessibility": {
                    "ticketLimit": 4
                },
                "ageRestrictions": {
                    "legalAgeEnforced": false
                },
                "ticketing": {
                    "safeTix": {
                        "enabled": false
                    },
                    "allInclusivePricing": {
                        "enabled": false
                    }
                },
                "_links": {
                    "self": {
                        "href": "/discovery/v2/events/G5v0Z9tnTkfFI?locale=en-us"
                    },
                    "attractions": [
                        {
                            "href": "/discovery/v2/attractions/K8vZ917198f?locale=en-us"
                        },
                        {
                            "href": "/discovery/v2/attractions/K8vZ9171ou0?locale=en-us"
                        }
                    ],
                    "venues": [
                        {
                            "href": "/discovery/v2/venues/KovZpZAFaeIA?locale=en-us"
                        }
                    ]
                },
                "_embedded": {
                    "venues": [
                        {
                            "name": "State Farm Stadium",
                            "type": "venue",
                            "id": "KovZpZAFaeIA",
                            "test": false,
                            "url": "https://www.ticketmaster.com/state-farm-stadium-tickets-glendale/venue/205074",
                            "locale": "en-us",
                            "aliases": [
                                "university of phoenix stadium"
                            ],
                            "postalCode": "85305",
                            "timezone": "America/Phoenix",
                            "city": {
                                "name": "Glendale"
                            },
                            "state": {
                                "name": "Arizona",
                                "stateCode": "AZ"
                            },
                            "country": {
                                "name": "United States Of America",
                                "countryCode": "US"
                            },
                            "address": {
                                "line1": "1 Cardinals Drive"
                            },
                            "location": {
                                "longitude": "-112.262258",
                                "latitude": "33.527308"
                            },
                            "markets": [
                                {
                                    "name": "Phoenix and Tucson",
                                    "id": "36"
                                }
                            ],
                            "dmas": [
                                {
                                    "id": 359
                                },
                                {
                                    "id": 402
                                },
                                {
                                    "id": 420
                                }
                            ],
                            "upcomingEvents": {
                                "tmr": 4,
                                "ticketmaster": 6,
                                "_total": 10,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/venues/KovZpZAFaeIA?locale=en-us"
                                }
                            }
                        }
                    ],
                    "attractions": [
                        {
                            "name": "Arizona Cardinals",
                            "type": "attraction",
                            "id": "K8vZ917198f",
                            "test": false,
                            "url": "https://www.ticketmaster.com/arizona-cardinals-tickets/artist/805894",
                            "locale": "en-us",
                            "externalLinks": {
                                "twitter": [
                                    {
                                        "url": "https://twitter.com/AZCardinals"
                                    }
                                ],
                                "facebook": [
                                    {
                                        "url": "https://www.facebook.com/arizonacardinals/"
                                    }
                                ],
                                "wiki": [
                                    {
                                        "url": "https://en.wikipedia.org/wiki/Arizona_Cardinals"
                                    }
                                ],
                                "instagram": [
                                    {
                                        "url": "https://www.instagram.com/azcardinals/"
                                    }
                                ],
                                "homepage": [
                                    {
                                        "url": "https://www.azcardinals.com/"
                                    }
                                ]
                            },
                            "aliases": [
                                "az cardinals",
                                "arizona cardinals",
                                "az cards"
                            ],
                            "images": [
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_3_2.jpg",
                                    "width": 1024,
                                    "height": 683,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_EVENT_DETAIL_PAGE_16_9.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_16_9.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                    "width": 2048,
                                    "height": 1152,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_ARTIST_PAGE_3_2.jpg",
                                    "width": 305,
                                    "height": 203,
                                    "fallback": false
                                },
                                {
                                    "ratio": "4_3",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_CUSTOM.jpg",
                                    "width": 305,
                                    "height": 225,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RECOMENDATION_16_9.jpg",
                                    "width": 100,
                                    "height": 56,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_LANDSCAPE_16_9.jpg",
                                    "width": 1136,
                                    "height": 639,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_3_2.jpg",
                                    "width": 640,
                                    "height": 427,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_16_9.jpg",
                                    "width": 1024,
                                    "height": 576,
                                    "fallback": false
                                }
                            ],
                            "classifications": [
                                {
                                    "primary": true,
                                    "segment": {
                                        "id": "KZFzniwnSyZfZ7v7nE",
                                        "name": "Sports"
                                    },
                                    "genre": {
                                        "id": "KnvZfZ7vAdE",
                                        "name": "Football"
                                    },
                                    "subGenre": {
                                        "id": "KZazBEonSMnZfZ7vFE1",
                                        "name": "NFL"
                                    },
                                    "type": {
                                        "id": "KZAyXgnZfZ7v7l1",
                                        "name": "Group"
                                    },
                                    "subType": {
                                        "id": "KZFzBErXgnZfZ7vA7d",
                                        "name": "Team"
                                    },
                                    "family": false
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 13,
                                "_total": 13,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/attractions/K8vZ917198f?locale=en-us"
                                }
                            }
                        },
                        {
                            "name": "Atlanta Falcons",
                            "type": "attraction",
                            "id": "K8vZ9171ou0",
                            "test": false,
                            "url": "https://www.ticketmaster.com/atlanta-falcons-tickets/artist/805897",
                            "locale": "en-us",
                            "externalLinks": {
                                "twitter": [
                                    {
                                        "url": "https://twitter.com/AtlantaFalcons"
                                    }
                                ],
                                "facebook": [
                                    {
                                        "url": "https://www.facebook.com/atlantafalcons/"
                                    }
                                ],
                                "wiki": [
                                    {
                                        "url": "https://en.wikipedia.org/wiki/Atlanta_Falcons"
                                    }
                                ],
                                "instagram": [
                                    {
                                        "url": "https://www.instagram.com/atlantafalcons/"
                                    }
                                ],
                                "homepage": [
                                    {
                                        "url": "https://www.atlantafalcons.com/"
                                    }
                                ]
                            },
                            "images": [
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/cc3/b7603d04-66ea-478c-9f00-d21630adacc3_1324961_RETINA_PORTRAIT_16_9.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/cc3/b7603d04-66ea-478c-9f00-d21630adacc3_1324961_RETINA_PORTRAIT_3_2.jpg",
                                    "width": 640,
                                    "height": 427,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/cc3/b7603d04-66ea-478c-9f00-d21630adacc3_1324961_TABLET_LANDSCAPE_3_2.jpg",
                                    "width": 1024,
                                    "height": 683,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/cc3/b7603d04-66ea-478c-9f00-d21630adacc3_1324961_RECOMENDATION_16_9.jpg",
                                    "width": 100,
                                    "height": 56,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/cc3/b7603d04-66ea-478c-9f00-d21630adacc3_1324961_ARTIST_PAGE_3_2.jpg",
                                    "width": 305,
                                    "height": 203,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/cc3/b7603d04-66ea-478c-9f00-d21630adacc3_1324961_EVENT_DETAIL_PAGE_16_9.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                },
                                {
                                    "ratio": "4_3",
                                    "url": "https://s1.ticketm.net/dam/a/cc3/b7603d04-66ea-478c-9f00-d21630adacc3_1324961_CUSTOM.jpg",
                                    "width": 305,
                                    "height": 225,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/cc3/b7603d04-66ea-478c-9f00-d21630adacc3_1324961_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                    "width": 2048,
                                    "height": 1152,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/cc3/b7603d04-66ea-478c-9f00-d21630adacc3_1324961_TABLET_LANDSCAPE_16_9.jpg",
                                    "width": 1024,
                                    "height": 576,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/cc3/b7603d04-66ea-478c-9f00-d21630adacc3_1324961_RETINA_LANDSCAPE_16_9.jpg",
                                    "width": 1136,
                                    "height": 639,
                                    "fallback": false
                                }
                            ],
                            "classifications": [
                                {
                                    "primary": true,
                                    "segment": {
                                        "id": "KZFzniwnSyZfZ7v7nE",
                                        "name": "Sports"
                                    },
                                    "genre": {
                                        "id": "KnvZfZ7vAdE",
                                        "name": "Football"
                                    },
                                    "subGenre": {
                                        "id": "KZazBEonSMnZfZ7vFE1",
                                        "name": "NFL"
                                    },
                                    "type": {
                                        "id": "KZAyXgnZfZ7v7l1",
                                        "name": "Group"
                                    },
                                    "subType": {
                                        "id": "KZFzBErXgnZfZ7vA7d",
                                        "name": "Team"
                                    },
                                    "family": false
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 14,
                                "_total": 14,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/attractions/K8vZ9171ou0?locale=en-us"
                                }
                            }
                        }
                    ]
                }
            },
            {
                "name": "Los Angeles Rams vs. Arizona Cardinals",
                "type": "event",
                "id": "vvG1IZ9tpxyw0G",
                "test": false,
                "url": "https://www.ticketmaster.com/los-angeles-rams-vs-arizona-cardinals-inglewood-california-10-15-2023/event/0A005E95A2E7290C",
                "locale": "en-us",
                "images": [
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_RETINA_PORTRAIT_3_2.jpg",
                        "width": 640,
                        "height": 427,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                        "width": 2048,
                        "height": 1152,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_EVENT_DETAIL_PAGE_16_9.jpg",
                        "width": 205,
                        "height": 115,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_ARTIST_PAGE_3_2.jpg",
                        "width": 305,
                        "height": 203,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_TABLET_LANDSCAPE_3_2.jpg",
                        "width": 1024,
                        "height": 683,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_RECOMENDATION_16_9.jpg",
                        "width": 100,
                        "height": 56,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_RETINA_PORTRAIT_16_9.jpg",
                        "width": 640,
                        "height": 360,
                        "fallback": false
                    },
                    {
                        "ratio": "4_3",
                        "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_CUSTOM.jpg",
                        "width": 305,
                        "height": 225,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_TABLET_LANDSCAPE_16_9.jpg",
                        "width": 1024,
                        "height": 576,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_RETINA_LANDSCAPE_16_9.jpg",
                        "width": 1136,
                        "height": 639,
                        "fallback": false
                    }
                ],
                "sales": {
                    "public": {
                        "startDateTime": "2023-05-12T00:00:00Z",
                        "startTBD": false,
                        "startTBA": false,
                        "endDateTime": "2023-10-15T21:25:00Z"
                    }
                },
                "dates": {
                    "start": {
                        "localDate": "2023-10-15",
                        "localTime": "13:25:00",
                        "dateTime": "2023-10-15T20:25:00Z",
                        "dateTBD": false,
                        "dateTBA": false,
                        "timeTBA": false,
                        "noSpecificTime": false
                    },
                    "timezone": "America/Los_Angeles",
                    "status": {
                        "code": "onsale"
                    },
                    "spanMultipleDays": false
                },
                "classifications": [
                    {
                        "primary": true,
                        "segment": {
                            "id": "KZFzniwnSyZfZ7v7nE",
                            "name": "Sports"
                        },
                        "genre": {
                            "id": "KnvZfZ7vAdE",
                            "name": "Football"
                        },
                        "subGenre": {
                            "id": "KZazBEonSMnZfZ7vFE1",
                            "name": "NFL"
                        },
                        "type": {
                            "id": "KZAyXgnZfZ7v7l1",
                            "name": "Group"
                        },
                        "subType": {
                            "id": "KZFzBErXgnZfZ7vA7d",
                            "name": "Team"
                        },
                        "family": false
                    }
                ],
                "promoter": {
                    "id": "705",
                    "name": "NFL REGULAR SEASON",
                    "description": "NFL REGULAR SEASON / NTL / USA"
                },
                "promoters": [
                    {
                        "id": "705",
                        "name": "NFL REGULAR SEASON",
                        "description": "NFL REGULAR SEASON / NTL / USA"
                    }
                ],
                "info": "Please be aware that this event is subject to NFL flexible scheduling procedures. The date and time for some games may change from what is currently reflected on the schedule and from what may appear on the ticket. For more detailed information regarding scheduling for the 2023 NFL Season, please visit",
                "pleaseNote": "Please be aware that this event is subject to NFL flexible scheduling procedures. The date and time for some games may change from what is currently reflected on the schedule and from what may appear on the ticket. For more detailed information regarding scheduling for the 2023 NFL Season, please visit https://www.nfl.com/schedules/flexible-scheduling-procedures",
                "priceRanges": [
                    {
                        "type": "standard",
                        "currency": "USD",
                        "min": 45,
                        "max": 889
                    }
                ],
                "products": [
                    {
                        "name": "Parking - Los Angeles Rams vs Arizona Cardinals",
                        "id": "vvG1IZ9cKUJVZR",
                        "url": "https://www.ticketmaster.com/parking-los-angeles-rams-vs-arizona-inglewood-california-10-15-2023/event/0A005ED4F69B402F",
                        "type": "Parking",
                        "classifications": [
                            {
                                "primary": true,
                                "segment": {
                                    "id": "KZFzniwnSyZfZ7v7n1",
                                    "name": "Miscellaneous"
                                },
                                "genre": {
                                    "id": "KnvZfZ7v7ll",
                                    "name": "Undefined"
                                },
                                "subGenre": {
                                    "id": "KZazBEonSMnZfZ7vAv1",
                                    "name": "Undefined"
                                },
                                "type": {
                                    "id": "KZAyXgnZfZ7vAva",
                                    "name": "Parking"
                                },
                                "subType": {
                                    "id": "KZFzBErXgnZfZ7vAFe",
                                    "name": "Regular"
                                },
                                "family": false
                            }
                        ]
                    },
                    {
                        "name": "PARKWHIZ SOFI STADIUM",
                        "id": "vvG1IZ9tcX4vQv",
                        "url": "https://www.ticketmaster.com/parkwhiz-sofi-stadium-inglewood-california-10-15-2023/event/0A005E9B7E541681",
                        "type": "Upsell",
                        "classifications": [
                            {
                                "primary": true,
                                "segment": {
                                    "id": "KZFzniwnSyZfZ7v7n1",
                                    "name": "Miscellaneous"
                                },
                                "genre": {
                                    "id": "KnvZfZ7v7ll",
                                    "name": "Undefined"
                                },
                                "subGenre": {
                                    "id": "KZazBEonSMnZfZ7vAv1",
                                    "name": "Undefined"
                                },
                                "type": {
                                    "id": "KZAyXgnZfZ7vAva",
                                    "name": "Parking"
                                },
                                "subType": {
                                    "id": "KZFzBErXgnZfZ7vAFe",
                                    "name": "Regular"
                                },
                                "family": false
                            }
                        ]
                    }
                ],
                "seatmap": {
                    "staticUrl": "https://maps.ticketmaster.com/maps/geometry/3/event/0A005E95A2E7290C/staticImage?type=png&systemId=HOST"
                },
                "accessibility": {
                    "ticketLimit": 4
                },
                "ticketLimit": {
                    "info": "There is an overall 8 ticket limit for this event."
                },
                "ageRestrictions": {
                    "legalAgeEnforced": false
                },
                "ticketing": {
                    "safeTix": {
                        "enabled": true
                    },
                    "allInclusivePricing": {
                        "enabled": false
                    }
                },
                "_links": {
                    "self": {
                        "href": "/discovery/v2/events/vvG1IZ9tpxyw0G?locale=en-us"
                    },
                    "attractions": [
                        {
                            "href": "/discovery/v2/attractions/K8vZ91719t0?locale=en-us"
                        },
                        {
                            "href": "/discovery/v2/attractions/K8vZ917198f?locale=en-us"
                        }
                    ],
                    "venues": [
                        {
                            "href": "/discovery/v2/venues/KovZ917ACh0?locale=en-us"
                        }
                    ]
                },
                "_embedded": {
                    "venues": [
                        {
                            "name": "SoFi Stadium",
                            "type": "venue",
                            "id": "KovZ917ACh0",
                            "test": false,
                            "url": "https://www.ticketmaster.com/sofi-stadium-tickets-inglewood/venue/82789",
                            "locale": "en-us",
                            "images": [
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dbimages/21790v.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                }
                            ],
                            "postalCode": "90301",
                            "timezone": "America/Los_Angeles",
                            "city": {
                                "name": "Inglewood"
                            },
                            "state": {
                                "name": "California",
                                "stateCode": "CA"
                            },
                            "country": {
                                "name": "United States Of America",
                                "countryCode": "US"
                            },
                            "address": {
                                "line1": "1001 S. Stadium Dr"
                            },
                            "location": {
                                "longitude": "-118.343767",
                                "latitude": "33.950529"
                            },
                            "markets": [
                                {
                                    "name": "Los Angeles",
                                    "id": "27"
                                }
                            ],
                            "dmas": [
                                {
                                    "id": 223
                                },
                                {
                                    "id": 324
                                },
                                {
                                    "id": 354
                                },
                                {
                                    "id": 383
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 26,
                                "_total": 26,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/venues/KovZ917ACh0?locale=en-us"
                                }
                            }
                        }
                    ],
                    "attractions": [
                        {
                            "name": "Los Angeles Rams",
                            "type": "attraction",
                            "id": "K8vZ91719t0",
                            "test": false,
                            "url": "https://www.ticketmaster.com/los-angeles-rams-tickets/artist/806024",
                            "locale": "en-us",
                            "externalLinks": {
                                "twitter": [
                                    {
                                        "url": "https://twitter.com/ramsnfl"
                                    }
                                ],
                                "facebook": [
                                    {
                                        "url": "https://www.facebook.com/Rams/"
                                    }
                                ],
                                "wiki": [
                                    {
                                        "url": "https://en.wikipedia.org/wiki/Los_Angeles_Rams"
                                    }
                                ],
                                "instagram": [
                                    {
                                        "url": "https://www.instagram.com/rams/"
                                    }
                                ],
                                "homepage": [
                                    {
                                        "url": "https://www.therams.com/"
                                    }
                                ]
                            },
                            "aliases": [
                                "ram",
                                "Rams",
                                "la rams",
                                "l.a. rams",
                                "rams football university",
                                "stl rams football university",
                                "st louis rams football university",
                                "st louis rams university"
                            ],
                            "images": [
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_TABLET_LANDSCAPE_3_2.jpg",
                                    "width": 1024,
                                    "height": 683,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_RECOMENDATION_16_9.jpg",
                                    "width": 100,
                                    "height": 56,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_RETINA_PORTRAIT_16_9.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                },
                                {
                                    "ratio": "4_3",
                                    "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_CUSTOM.jpg",
                                    "width": 305,
                                    "height": 225,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_RETINA_PORTRAIT_3_2.jpg",
                                    "width": 640,
                                    "height": 427,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_TABLET_LANDSCAPE_16_9.jpg",
                                    "width": 1024,
                                    "height": 576,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                    "width": 2048,
                                    "height": 1152,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_RETINA_LANDSCAPE_16_9.jpg",
                                    "width": 1136,
                                    "height": 639,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_EVENT_DETAIL_PAGE_16_9.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_ARTIST_PAGE_3_2.jpg",
                                    "width": 305,
                                    "height": 203,
                                    "fallback": false
                                }
                            ],
                            "classifications": [
                                {
                                    "primary": true,
                                    "segment": {
                                        "id": "KZFzniwnSyZfZ7v7nE",
                                        "name": "Sports"
                                    },
                                    "genre": {
                                        "id": "KnvZfZ7vAdE",
                                        "name": "Football"
                                    },
                                    "subGenre": {
                                        "id": "KZazBEonSMnZfZ7vFE1",
                                        "name": "NFL"
                                    },
                                    "type": {
                                        "id": "KZAyXgnZfZ7v7l1",
                                        "name": "Group"
                                    },
                                    "subType": {
                                        "id": "KZFzBErXgnZfZ7vA7d",
                                        "name": "Team"
                                    },
                                    "family": false
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 13,
                                "_total": 13,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/attractions/K8vZ91719t0?locale=en-us"
                                }
                            }
                        },
                        {
                            "name": "Arizona Cardinals",
                            "type": "attraction",
                            "id": "K8vZ917198f",
                            "test": false,
                            "url": "https://www.ticketmaster.com/arizona-cardinals-tickets/artist/805894",
                            "locale": "en-us",
                            "externalLinks": {
                                "twitter": [
                                    {
                                        "url": "https://twitter.com/AZCardinals"
                                    }
                                ],
                                "facebook": [
                                    {
                                        "url": "https://www.facebook.com/arizonacardinals/"
                                    }
                                ],
                                "wiki": [
                                    {
                                        "url": "https://en.wikipedia.org/wiki/Arizona_Cardinals"
                                    }
                                ],
                                "instagram": [
                                    {
                                        "url": "https://www.instagram.com/azcardinals/"
                                    }
                                ],
                                "homepage": [
                                    {
                                        "url": "https://www.azcardinals.com/"
                                    }
                                ]
                            },
                            "aliases": [
                                "az cardinals",
                                "arizona cardinals",
                                "az cards"
                            ],
                            "images": [
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_3_2.jpg",
                                    "width": 1024,
                                    "height": 683,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_EVENT_DETAIL_PAGE_16_9.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_16_9.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                    "width": 2048,
                                    "height": 1152,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_ARTIST_PAGE_3_2.jpg",
                                    "width": 305,
                                    "height": 203,
                                    "fallback": false
                                },
                                {
                                    "ratio": "4_3",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_CUSTOM.jpg",
                                    "width": 305,
                                    "height": 225,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RECOMENDATION_16_9.jpg",
                                    "width": 100,
                                    "height": 56,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_LANDSCAPE_16_9.jpg",
                                    "width": 1136,
                                    "height": 639,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_3_2.jpg",
                                    "width": 640,
                                    "height": 427,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_16_9.jpg",
                                    "width": 1024,
                                    "height": 576,
                                    "fallback": false
                                }
                            ],
                            "classifications": [
                                {
                                    "primary": true,
                                    "segment": {
                                        "id": "KZFzniwnSyZfZ7v7nE",
                                        "name": "Sports"
                                    },
                                    "genre": {
                                        "id": "KnvZfZ7vAdE",
                                        "name": "Football"
                                    },
                                    "subGenre": {
                                        "id": "KZazBEonSMnZfZ7vFE1",
                                        "name": "NFL"
                                    },
                                    "type": {
                                        "id": "KZAyXgnZfZ7v7l1",
                                        "name": "Group"
                                    },
                                    "subType": {
                                        "id": "KZFzBErXgnZfZ7vA7d",
                                        "name": "Team"
                                    },
                                    "family": false
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 13,
                                "_total": 13,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/attractions/K8vZ917198f?locale=en-us"
                                }
                            }
                        }
                    ]
                }
            },
            {
                "name": "Arizona Cardinals Vs Los Angeles Rams",
                "type": "event",
                "id": "G5v0Z9tnTa7Fz",
                "test": false,
                "url": "https://www.ticketmaster.com/arizona-cardinals-vs-los-angeles-rams-glendale-arizona-11-26-2023/event/19005E9ABF244238",
                "locale": "en-us",
                "images": [
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_3_2.jpg",
                        "width": 1024,
                        "height": 683,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_EVENT_DETAIL_PAGE_16_9.jpg",
                        "width": 205,
                        "height": 115,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_16_9.jpg",
                        "width": 640,
                        "height": 360,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                        "width": 2048,
                        "height": 1152,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_ARTIST_PAGE_3_2.jpg",
                        "width": 305,
                        "height": 203,
                        "fallback": false
                    },
                    {
                        "ratio": "4_3",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_CUSTOM.jpg",
                        "width": 305,
                        "height": 225,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RECOMENDATION_16_9.jpg",
                        "width": 100,
                        "height": 56,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_LANDSCAPE_16_9.jpg",
                        "width": 1136,
                        "height": 639,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_3_2.jpg",
                        "width": 640,
                        "height": 427,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_16_9.jpg",
                        "width": 1024,
                        "height": 576,
                        "fallback": false
                    }
                ],
                "sales": {
                    "public": {
                        "startDateTime": "2023-05-12T05:00:00Z",
                        "startTBD": false,
                        "startTBA": false,
                        "endDateTime": "2023-11-26T22:05:00Z"
                    },
                    "presales": [
                        {
                            "startDateTime": "2023-05-12T00:00:00Z",
                            "endDateTime": "2023-05-12T05:00:00Z",
                            "name": "Resale Onsale"
                        }
                    ]
                },
                "dates": {
                    "start": {
                        "localDate": "2023-11-26",
                        "localTime": "14:05:00",
                        "dateTime": "2023-11-26T21:05:00Z",
                        "dateTBD": false,
                        "dateTBA": false,
                        "timeTBA": false,
                        "noSpecificTime": false
                    },
                    "timezone": "America/Phoenix",
                    "status": {
                        "code": "onsale"
                    },
                    "spanMultipleDays": false
                },
                "classifications": [
                    {
                        "primary": true,
                        "segment": {
                            "id": "KZFzniwnSyZfZ7v7nE",
                            "name": "Sports"
                        },
                        "genre": {
                            "id": "KnvZfZ7vAdE",
                            "name": "Football"
                        },
                        "subGenre": {
                            "id": "KZazBEonSMnZfZ7vFE1",
                            "name": "NFL"
                        },
                        "type": {
                            "id": "KZAyXgnZfZ7v7l1",
                            "name": "Group"
                        },
                        "subType": {
                            "id": "KZFzBErXgnZfZ7vA7d",
                            "name": "Team"
                        },
                        "family": false
                    }
                ],
                "promoter": {
                    "id": "4635",
                    "name": "SEATGEEK",
                    "description": "SEATGEEK / NTL / USA"
                },
                "promoters": [
                    {
                        "id": "4635",
                        "name": "SEATGEEK",
                        "description": "SEATGEEK / NTL / USA"
                    }
                ],
                "info": "Please be aware that this event is subject to NFL flexible scheduling procedures. The date and time for some games may change from what is currently reflected on the schedule and from what may appear on the ticket. For more detailed information regarding scheduling for the 2023 NFL Season, please visit",
                "pleaseNote": "Please be aware that this event is subject to NFL flexible scheduling procedures. The date and time for some games may change from what is currently reflected on the schedule and from what may appear on the ticket. For more detailed information regarding scheduling for the 2023 NFL Season, please visit https://www.nfl.com/schedules/flexible-scheduling-procedures",
                "seatmap": {
                    "staticUrl": "https://maps.ticketmaster.com/maps/geometry/3/event/19005E9ABF244238/staticImage?type=png&systemId=HOST"
                },
                "accessibility": {
                    "ticketLimit": 4
                },
                "ageRestrictions": {
                    "legalAgeEnforced": false
                },
                "ticketing": {
                    "safeTix": {
                        "enabled": false
                    },
                    "allInclusivePricing": {
                        "enabled": false
                    }
                },
                "_links": {
                    "self": {
                        "href": "/discovery/v2/events/G5v0Z9tnTa7Fz?locale=en-us"
                    },
                    "attractions": [
                        {
                            "href": "/discovery/v2/attractions/K8vZ917198f?locale=en-us"
                        },
                        {
                            "href": "/discovery/v2/attractions/K8vZ91719t0?locale=en-us"
                        }
                    ],
                    "venues": [
                        {
                            "href": "/discovery/v2/venues/KovZpZAFaeIA?locale=en-us"
                        }
                    ]
                },
                "_embedded": {
                    "venues": [
                        {
                            "name": "State Farm Stadium",
                            "type": "venue",
                            "id": "KovZpZAFaeIA",
                            "test": false,
                            "url": "https://www.ticketmaster.com/state-farm-stadium-tickets-glendale/venue/205074",
                            "locale": "en-us",
                            "aliases": [
                                "university of phoenix stadium"
                            ],
                            "postalCode": "85305",
                            "timezone": "America/Phoenix",
                            "city": {
                                "name": "Glendale"
                            },
                            "state": {
                                "name": "Arizona",
                                "stateCode": "AZ"
                            },
                            "country": {
                                "name": "United States Of America",
                                "countryCode": "US"
                            },
                            "address": {
                                "line1": "1 Cardinals Drive"
                            },
                            "location": {
                                "longitude": "-112.262258",
                                "latitude": "33.527308"
                            },
                            "markets": [
                                {
                                    "name": "Phoenix and Tucson",
                                    "id": "36"
                                }
                            ],
                            "dmas": [
                                {
                                    "id": 359
                                },
                                {
                                    "id": 402
                                },
                                {
                                    "id": 420
                                }
                            ],
                            "upcomingEvents": {
                                "tmr": 4,
                                "ticketmaster": 6,
                                "_total": 10,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/venues/KovZpZAFaeIA?locale=en-us"
                                }
                            }
                        }
                    ],
                    "attractions": [
                        {
                            "name": "Arizona Cardinals",
                            "type": "attraction",
                            "id": "K8vZ917198f",
                            "test": false,
                            "url": "https://www.ticketmaster.com/arizona-cardinals-tickets/artist/805894",
                            "locale": "en-us",
                            "externalLinks": {
                                "twitter": [
                                    {
                                        "url": "https://twitter.com/AZCardinals"
                                    }
                                ],
                                "facebook": [
                                    {
                                        "url": "https://www.facebook.com/arizonacardinals/"
                                    }
                                ],
                                "wiki": [
                                    {
                                        "url": "https://en.wikipedia.org/wiki/Arizona_Cardinals"
                                    }
                                ],
                                "instagram": [
                                    {
                                        "url": "https://www.instagram.com/azcardinals/"
                                    }
                                ],
                                "homepage": [
                                    {
                                        "url": "https://www.azcardinals.com/"
                                    }
                                ]
                            },
                            "aliases": [
                                "az cardinals",
                                "arizona cardinals",
                                "az cards"
                            ],
                            "images": [
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_3_2.jpg",
                                    "width": 1024,
                                    "height": 683,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_EVENT_DETAIL_PAGE_16_9.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_16_9.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                    "width": 2048,
                                    "height": 1152,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_ARTIST_PAGE_3_2.jpg",
                                    "width": 305,
                                    "height": 203,
                                    "fallback": false
                                },
                                {
                                    "ratio": "4_3",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_CUSTOM.jpg",
                                    "width": 305,
                                    "height": 225,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RECOMENDATION_16_9.jpg",
                                    "width": 100,
                                    "height": 56,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_LANDSCAPE_16_9.jpg",
                                    "width": 1136,
                                    "height": 639,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_RETINA_PORTRAIT_3_2.jpg",
                                    "width": 640,
                                    "height": 427,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/6d2/cdcd57a4-1e15-4b06-b1bc-6196b4a016d2_1324921_TABLET_LANDSCAPE_16_9.jpg",
                                    "width": 1024,
                                    "height": 576,
                                    "fallback": false
                                }
                            ],
                            "classifications": [
                                {
                                    "primary": true,
                                    "segment": {
                                        "id": "KZFzniwnSyZfZ7v7nE",
                                        "name": "Sports"
                                    },
                                    "genre": {
                                        "id": "KnvZfZ7vAdE",
                                        "name": "Football"
                                    },
                                    "subGenre": {
                                        "id": "KZazBEonSMnZfZ7vFE1",
                                        "name": "NFL"
                                    },
                                    "type": {
                                        "id": "KZAyXgnZfZ7v7l1",
                                        "name": "Group"
                                    },
                                    "subType": {
                                        "id": "KZFzBErXgnZfZ7vA7d",
                                        "name": "Team"
                                    },
                                    "family": false
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 13,
                                "_total": 13,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/attractions/K8vZ917198f?locale=en-us"
                                }
                            }
                        },
                        {
                            "name": "Los Angeles Rams",
                            "type": "attraction",
                            "id": "K8vZ91719t0",
                            "test": false,
                            "url": "https://www.ticketmaster.com/los-angeles-rams-tickets/artist/806024",
                            "locale": "en-us",
                            "externalLinks": {
                                "twitter": [
                                    {
                                        "url": "https://twitter.com/ramsnfl"
                                    }
                                ],
                                "facebook": [
                                    {
                                        "url": "https://www.facebook.com/Rams/"
                                    }
                                ],
                                "wiki": [
                                    {
                                        "url": "https://en.wikipedia.org/wiki/Los_Angeles_Rams"
                                    }
                                ],
                                "instagram": [
                                    {
                                        "url": "https://www.instagram.com/rams/"
                                    }
                                ],
                                "homepage": [
                                    {
                                        "url": "https://www.therams.com/"
                                    }
                                ]
                            },
                            "aliases": [
                                "ram",
                                "Rams",
                                "la rams",
                                "l.a. rams",
                                "rams football university",
                                "stl rams football university",
                                "st louis rams football university",
                                "st louis rams university"
                            ],
                            "images": [
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_TABLET_LANDSCAPE_3_2.jpg",
                                    "width": 1024,
                                    "height": 683,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_RECOMENDATION_16_9.jpg",
                                    "width": 100,
                                    "height": 56,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_RETINA_PORTRAIT_16_9.jpg",
                                    "width": 640,
                                    "height": 360,
                                    "fallback": false
                                },
                                {
                                    "ratio": "4_3",
                                    "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_CUSTOM.jpg",
                                    "width": 305,
                                    "height": 225,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_RETINA_PORTRAIT_3_2.jpg",
                                    "width": 640,
                                    "height": 427,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_TABLET_LANDSCAPE_16_9.jpg",
                                    "width": 1024,
                                    "height": 576,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                    "width": 2048,
                                    "height": 1152,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_RETINA_LANDSCAPE_16_9.jpg",
                                    "width": 1136,
                                    "height": 639,
                                    "fallback": false
                                },
                                {
                                    "ratio": "16_9",
                                    "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_EVENT_DETAIL_PAGE_16_9.jpg",
                                    "width": 205,
                                    "height": 115,
                                    "fallback": false
                                },
                                {
                                    "ratio": "3_2",
                                    "url": "https://s1.ticketm.net/dam/a/d08/ad826f06-02db-453d-8465-43e05cc1ad08_1325451_ARTIST_PAGE_3_2.jpg",
                                    "width": 305,
                                    "height": 203,
                                    "fallback": false
                                }
                            ],
                            "classifications": [
                                {
                                    "primary": true,
                                    "segment": {
                                        "id": "KZFzniwnSyZfZ7v7nE",
                                        "name": "Sports"
                                    },
                                    "genre": {
                                        "id": "KnvZfZ7vAdE",
                                        "name": "Football"
                                    },
                                    "subGenre": {
                                        "id": "KZazBEonSMnZfZ7vFE1",
                                        "name": "NFL"
                                    },
                                    "type": {
                                        "id": "KZAyXgnZfZ7v7l1",
                                        "name": "Group"
                                    },
                                    "subType": {
                                        "id": "KZFzBErXgnZfZ7vA7d",
                                        "name": "Team"
                                    },
                                    "family": false
                                }
                            ],
                            "upcomingEvents": {
                                "ticketmaster": 13,
                                "_total": 13,
                                "_filtered": 0
                            },
                            "_links": {
                                "self": {
                                    "href": "/discovery/v2/attractions/K8vZ91719t0?locale=en-us"
                                }
                            }
                        }
                    ]
                }
            }
        ]
    },
    "_links": {
        "self": {
            "href": "/discovery/v2/events.json?subGenreId=KZazBEonSMnZfZ7vFE1&classificationName=Football&keyword=Arizona+Cardinals&locale=en-us"
        }
    },
    "page": {
        "size": 20,
        "totalElements": 12,
        "totalPages": 1,
        "number": 0
    }
}
var x = [
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

displayPlayer(x)
displayTickets(tickets)