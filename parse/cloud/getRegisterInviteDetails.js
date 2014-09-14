try {
  var sport_id = request.get('find_sport_id');
  var position_name = request.get('find_position_name');
  var venue_id = request.get('find_venue_id');
  var outputArr = [];
  var XHRSportResponse = XHR.send("GET", "https://api.appery.io/rest/1/db/collections/sports", {
    "headers": {
      "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
      "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b"
    },
    "parameters": {
      "where": '{"_id": "' + sport_id + '"}'
    }
  });
  
  var XHRVenuesResponse = XHR.send("GET", "https://api.appery.io/rest/1/db/collections/venues", {
    "headers": {
      "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
      "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b"
    },
    "parameters": {
      "where": '{"_id": "' + venue_id + '"}'
    }
  });
  
  var sport_name = XHRSportResponse.body[0].name;
  var positions = XHRSportResponse.body[0].positions;
  var commitmenttypes = XHRSportResponse.body[0].commitmenttypes;
  var gametypes = XHRSportResponse.body[0].gametypes;
  var venue_name = XHRVenuesResponse.body[0].name;
  
  var inviteText = 'I need a ' + position_name.toLowerCase() + ' to play ' + sport_name.toLowerCase() + ' at ' + venue_name + '.  Additional details: ';
  console.log(inviteText);
  
  
  outputArr.push({
    sports_id: sport_id,
    sport_name: sport_name,
    //positions: positions,
    //venues: venueNames,
    commitmenttypes: commitmenttypes,
    gametypes: gametypes,
    invitetext: inviteText
  })
  response.success(outputArr, "application/json");
} catch (e) {
  var errorMsg = e + '';
  errorMsg = errorMsg.split(':')[1]
  console.log('errorMsg ' + errorMsg);
  response.error = errorMsg;
}