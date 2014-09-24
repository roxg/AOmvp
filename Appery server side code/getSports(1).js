var result = [];
var sport_id = request.get("sport_id");

var XHRSportsResponse = XHR.send("GET", "https://api.appery.io/rest/1/db/collections/sports", {
  "headers": {
    "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
    "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b"
  }
});


for (var i = 0; i < XHRSportsResponse.body.length; i++) {
    if (sport_id != null) {
    result.push({
      sport: XHRSportsResponse.body[i].name,
      _id: XHRSportsResponse.body[i]._id,
      sportskill: XHRSportsResponse.body[i].skilllevel
    });
  } else if (XHRSportsResponse.body[i]._id === sport_id) {
    result.push({
      sport: XHRSportsResponse.body[i].name,
      _id: XHRSportsResponse.body[i]._id,
      sportskill: XHRSportsResponse.body[i].skilllevel
    });
  }
}

response.success(result, "application/json");