
function getPlayerMap(XHRSportsResponse, XHRVenuesResponse, XHRPlayerDetailResponse, map) {
  var jsonObj = [];
  var playerDetail = XHRPlayerDetailResponse.body;
  //console.log('playerDetail -- '+JSON.stringify(playerDetail));
  for (j = 0; j < playerDetail.length; j++) {
    if ((selectedPlayerDetailId.length > 0 && selectedPlayerDetailId === playerDetail[j]._id) || selectedPlayerDetailId.length === 0) {
      //SPORTS
      var sportName = "";
      sportName = getSportName(XHRSportsResponse, playerDetail[j].sport_id._id);
      //console.log('****' + playerDetail[j].sport_id._id+': '+sportName);
      //console.log('sport_id '+playerDetail[j].sport_id._id);
      
      //SKILL LEVELS
      var sportSkill = playerDetail[j].sportSkill;
      //console.log(sportSkill);
      //POSITIONS
      var positionsArr = playerDetail[j].positions;
      //console.log('positionsArr '+JSON.stringify(positionsArr));
      var positionArray = [];
      for (i = 0; i < positionsArr.length; i++) {
        var position = positionsArr[i];
        //if (positionString === '') {
          positionArray.push(position);
        //} else {
          //positionString = positionString + ', ' + position;
        //}
      }
      //var position = positionsArr[positionsArr.length - 1];
      //positionString = positionString + ', ' + position;
      //VENUES    
      //console.log(_.uniq(playerDetail[j].playerVenues));
      var venuesArr = _.uniq(playerDetail[j].playerVenues);
      var venuesString = '';
      var venuesArray = [];
      for (var v = 0; v < venuesArr.length; v++) {
        //var venueName = getVenueName(XHRVenuesResponse, venuesArr[v]);
        var venueName = getVenues(XHRVenuesResponse, venuesArr[v]);
        //console.log(venueName);
        //venuesArray.push(venueName);
      }
      //OUTPUT STRING
      jsonObj.push({
        playerDetail_id: playerDetail[j]._id,
        sportName: sportName,
        sportSkill: sportSkill,
        sportName: sportName,
        position: positionArray,
        playerVenues: venueName
      });
    }
  }
  map.put(sportName, jsonObj);
  return jsonObj;
}

try {
  var selectedUserDetailId = request.get('selectedUserDetailId');
  var selectedPlayerDetailId = request.get('selectedPlayerDetailId');
  var playerDirectory = request.get("playerDirectory");
  var numberOfPlayers = 0;
  console.log(selectedUserDetailId);
  console.log(selectedPlayerDetailId);
  console.log(playerDirectory);
  if (playerDirectory.length > 0) {
    var playerDirectoryArr = [];
    playerDirectoryArr = JSON.parse(playerDirectory);
    numberOfPlayers = playerDirectoryArr.length;
  }
  
  var XHRUserDetailResponse = XHR.send("GET", 'https://api.appery.io/rest/1/db/collections/userDetail', {
    "headers": {
      "X-Appery-Database-Id": dbID,
      "X-Appery-Master-Key": masterKey,
      "Content-Type": "application/json"
    },
    "parameters": {
      "where": '{"_id":"' + selectedUserDetailId + '"}'
    }
  });
  
  var XHRPlayerDetailResponse = XHR.send("GET", "https://api.appery.io/rest/1/db/collections/playerDetail", {
    "headers": {
      "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
      "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b"
    },
    "parameters": {
      "where": '{"user_id":{"collName":"userDetail","_id":"' + selectedUserDetailId + '"}}'
    }
  });
  
  var XHRSportsResponse = XHR.send("GET", 'https://api.appery.io/rest/1/db/collections/sports', {
    "headers": {
      "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
      "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b",
      "Content-Type": "application/json"
    }
  });
  //console.log('XHRSportsResponse '+JSON.stringify(XHRSportsResponse));
  var XHRVenuesResponse = XHR.send("GET", 'https://api.appery.io/rest/1/db/collections/venues', {
    "headers": {
      "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
      "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b",
      "Content-Type": "application/json"
    }
  });
  var XHRPlayerHistoryResponse = XHR.send("GET", "https://api.appery.io/rest/1/db/collections/playerHistory", {
    "headers": {
      "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
      "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b"
    },
    "parameters": {
      "where": '{"userDetail_id":{"collName":"userDetail","_id":"' + selectedUserDetailId + '"}}'
    }
  });
  
  if (XHRPlayerDetailResponse.body.length > 0) {
    var map = new Map();
    //console.log('playerDetailArr '+JSON.stringify(playerDetailArr));
    var finalArr = [];
    //console.log(playerDetailArr.length);
    playerDetailArr = [];
    playerDetailArr = getPlayerMap(XHRSportsResponse, XHRVenuesResponse, XHRPlayerDetailResponse, map);
    for (i = 0; i < map.keys.length; i++) {
      var key = map.keys[i];
      var value = map.get(key);
      playerDetailArr.push(value);
    }
    //GET PLAYER HISTORY INFORMATION INTO A NEW ARRAY
    var playerHistoryArr = [];
    for (var k = 0; k < XHRPlayerHistoryResponse.body.length; k++) {
      var sport = getSportName(XHRSportsResponse, XHRPlayerHistoryResponse.body[k].sport_id._id);
      var playerHistorySkill = getSkillName(XHRSportsResponse, XHRPlayerHistoryResponse.body[k].sport_id._id, XHRPlayerHistoryResponse.body[k].skill);
      
      playerHistoryArr.push({
        _id: XHRPlayerHistoryResponse.body[k]._id,
        sportsName: sport,
        skillLevel: playerHistorySkill,
        team: XHRPlayerHistoryResponse.body[k].team,
        details: XHRPlayerHistoryResponse.body[k].details,
        awards: XHRPlayerHistoryResponse.body[k].awards,
        startDate: XHRPlayerHistoryResponse.body[k].startDate,
        endDate: XHRPlayerHistoryResponse.body[k].endDate,
        isDeleted: XHRPlayerHistoryResponse.body[k].isDeleted
      });
    }
    
    finalArr.push({
      _id: XHRUserDetailResponse.body[0]._id,
      numberOfPlayers: numberOfPlayers,
      gender: XHRUserDetailResponse.body[0].gender,
      zipcode: XHRUserDetailResponse.body[0].zipcode,
      athleticbio: XHRUserDetailResponse.body[0].athleticbio,
      birthyear: XHRUserDetailResponse.body[0].birthyear,
      playerNumber: XHRUserDetailResponse.body[0].playerNumber,
      username: XHRUserDetailResponse.body[0].username,
      headline: XHRUserDetailResponse.body[0].headline,
      profilePhoto: null,//XHRUserDetailResponse.body[0].profilePhoto,
      sports: playerDetailArr,
      playerHistory: playerHistoryArr
    });
    response.success(finalArr, "application/json");
    //console.log(finalArr);
    
  } else {
    //var finalArr = [];
    response.success(finalArr, "application/json");
  }
} catch (e) {
  var finalArr = [];
  response.success(finalArr, "application/json");
}