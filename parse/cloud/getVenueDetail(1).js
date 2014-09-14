try {
  var result = [];
  var selected_venue_id = request.get("selected_venue_id");
  var XHRVenuesResponse = XHR.send("GET", "https://api.appery.io/rest/1/db/collections/venues", {
    "headers": {
      "X-Appery-Database-Id": dbID,
      "X-Appery-Master-Key": masterKey
    },
    "parameters": {
      "where": '{"_id":"' + selected_venue_id + '"}'
    }
  });
  
  result = XHRVenuesResponse.body;
  
  response.success(result);
} catch (e) {
  var errorMsg = e + '';
  errorMsg = errorMsg.split(':')[1]
  console.log('error: ' + errorMsg);
  response.error = errorMsg;
}