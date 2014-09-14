try {
  var sport_id = request.get('_id');
  //console.log("sport_id: " + sport_id );
  var XHRSportsResponse = XHR.send("GET", "https://api.appery.io/rest/1/db/collections/sports", {
    "headers": {
      "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
      "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b"
    },
    "parameters": {
      "where": '{"_id":"' + sport_id + '"}'
    }
  });

  
  response.success(XHRSportsResponse.body[0], "application/json");  
  
}
catch (e) {}

//response.success(responseBody, "application/json");
  