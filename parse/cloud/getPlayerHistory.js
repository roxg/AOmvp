try {
  var currentUserDetailId = request.get('currentUserDetailId');
  var selectedPlayerDetailId = request.get('selectedPlayerDetailId');
  var outputArr = [];
  //console.log("sport_id: " + sport_id );
  var XHRPlayerHistoryResponse = XHR.send("GET", "https://api.appery.io/rest/1/db/collections/playerHistory", {
    "headers": {
      "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
      "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b"
    },
    "parameters": {
      "where": '{"userDetail_id":{"collName":"userDetail","_id":"' + currentUserDetailId + '"}}'
    }
  });
  
  for (var k = 0; k < XHRPlayerHistoryResponse.body.length; k++) {
    var sport = XHRPlayerHistoryResponse.body[k].sport_id._id;
    var XHRSportsResponse = XHR.send("GET", "https://api.appery.io/rest/1/db/collections/sports", {
      "headers": {
        "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
        "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b"
      }
    });
    var sportName = getSportName(XHRSportsResponse, sport);
    console.log(sportName);
    if ((selectedPlayerDetailId.length > 0 && XHRPlayerHistoryResponse.body[k]._id === selectedPlayerDetailId) || selectedPlayerDetailId.length === 0) {
      console.log("has selected ID!");
      outputArr.push({
        _id: XHRPlayerHistoryResponse.body[k]._id,
        sportsName: sportName,
        team: XHRPlayerHistoryResponse.body[k].team,
        details: XHRPlayerHistoryResponse.body[k].details,
        awards: XHRPlayerHistoryResponse.body[k].awards,
        skillLevel: XHRPlayerHistoryResponse.body[k].skill,
        startDate: XHRPlayerHistoryResponse.body[k].startDate,
        endDate: XHRPlayerHistoryResponse.body[k].endDate,
        isDeleted: XHRPlayerHistoryResponse.body[k].isDeleted
      });
    }
  }
  response.success(outputArr, "application/json"); 
} catch (e) {
  var errorMsg = e + '';
  errorMsg = errorMsg.split(':')[1]
  console.log('error: ' + errorMsg);
  response.error = errorMsg;
}