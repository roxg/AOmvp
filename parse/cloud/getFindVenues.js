try {
  var sport_id = request.get('find_sport_id');
  var outputArr = [];
  //console.log("sport_id: " + sport_id );
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
    }
  });
  var venuesArr = [];
  var venues = [];
  
  venuesArr = XHRSportResponse.body[0].venues;
  console.log(venuesArr);
  for (var a = 0; a < venuesArr.length; a++) {
  	var venue_id = venuesArr[a];
    venues.push({venue: getVenues(XHRVenuesResponse, venue_id)});
    
  }
    
  response.success(venues, "application/json");
} catch (e) {
  var errorMsg = e + '';
  errorMsg = errorMsg.split(':')[1];
  console.log('errorMsg ' + errorMsg);
  response.error = errorMsg;
}