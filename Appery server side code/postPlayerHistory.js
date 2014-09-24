function getSkillName(XHRSportsResponse, sportID, skillValue) {
  var skillName = "";
  //console.log(XHRSportsResponse.body[0].skilllevel);
  
  for (s = 0; s < XHRSportsResponse.body.length; s++) {
    //console.log(XHRSportsResponse.body[s].skilllevel);
    //console.log("resp: " + XHRSportsResponse.body[s]._id + "  --- id: " + sportID);
    if (XHRSportsResponse.body[s]._id === sportID) {
      for (n = 0; n < XHRSportsResponse.body[s].skilllevel.length; n++) {
        
        if (skillValue === XHRSportsResponse.body[s].skilllevel[n].skillValue) {
          //console.log("match!");
          //console.log(XHRSportsResponse.body[s].skilllevel[n].skillName);
          skillName = XHRSportsResponse.body[s].skilllevel[n].skillName;
          console.log("match!: " + skillName);
        }
      }
    }
  }
    return skillName;
  }
  try {
    
    var currentUserDetailId = request.get('currentUserDetailId');
    var sport_id = request.get('sport_id');
    var details = request.get('details');
    var isDeleted = request.get('isDeleted');
    var team = request.get('team');
    var awards = request.get('awards');
    var skillLevel = request.get('skillLevel');
    var startDate = request.get('startDate');
    var endDate = request.get('endDate');
    var tokenId = request.get('tokenId');
    jsonUserDetailId = {};
    jsonUserDetailId = {
      'collName': 'userDetail',
      '_id': currentUserDetailId
    }
    jsonSportId = {};
    jsonSportId = {
      'collName': 'sports',
      '_id': sport_id
    }
    
    
    var XHRSportsResponse = XHR.send("GET", 'https://api.appery.io/rest/1/db/collections/sports', {
      "headers": {
        "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
        "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b",
        "Content-Type": "application/json"
      }
    });
    //console.log(playerHistory_id);
    var skillName = getSkillName(XHRSportsResponse, sport_id, skillLevel);
    var responseBody = {};
    
    //if (playerHistory_id.length === 0) {
    
    var updatePlayerHistoryData = {
      'tokenId': tokenId,
      'isDeleted': false,
      'userDetail_id': jsonUserDetailId,
      'sport_id': jsonSportId,
      'details': details,
      'skill': skillName,
      'team': team,
      'awards': awards
      //'startDate': startDate,
      //'endDate': endDate
    };
    
    responseBody = Collection.createObject(dbID, "playerHistory", updatePlayerHistoryData, tokenId);
    response.success(responseBody, "application/json");
    /*  
}
  if (playerHistory_id.length > 0) {
    var insertPlayerHistoryData = {
      'tokenId': tokenId,
      'isDeleted': false,
      'userDetail_id': jsonUserDetailId,
      'sport_id': jsonSportId,
      'details': details,
      'skillLevel': skillLevel,
      'startDate': startDate,
      'endDate': endDate
    }
    responseBody = Collection.updateObject(dbID, "playerHistory", playerHistory_id, insertPlayerHistoryData, tokenId);
  }
  console.log(responseBody);
  response.success(responseBody, "application/json");
  */
  } catch (e) {
    response.success("message: " + e.message + "\ncode: " + e.code);
  }