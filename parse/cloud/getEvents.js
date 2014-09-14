var DB_id = '535854f7e4b0021e4555c5a5';
var collectionName = 'events';
var result = [];
var query = [];
var sport = request.get("sport");
var venue = request.get("venue");
var position = request.get("position");
query = Collection.query(DB_id, collectionName);


if (venue == "CP") {
  venue = "Chelsea Piers, NYC";
}


for (var i = 0; i < query.length; i++) {
  //if (query[i].position == position && query[i].sport == sport && query[i].venue == venue && query[i].isActive == 1)
  {
    result.push({
      eventName: query[i].eventName,
      sport: query[i].sport,
      venue: query[i].venue,
      position: query[i].position,
      skillRankAvg: query[i].commitmentType,
      gameType: query[i].gameType,
      date: query[i].date,
      dateText: query[i].dateText,
      notes: query[i].notes,
      eventID: query[i]._id
    });
  }
}

response.success(result);