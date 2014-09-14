function getSportName(sportID)
{
  var XHRSportsResponse = XHR.send("GET", 'https://api.appery.io/rest/1/db/collections/sports', {
  "headers": {
    "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
    "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b",
    "Content-Type":"application/json"
  },
  "parameters": {
    "where": '{"_id":"'+sportID+'"}'
  }
});
  //console.log('XHRSportsResponse '+JSON.stringify(XHRSportsResponse));
  var sportName=XHRSportsResponse.body[0].name 
  return sportName;
}

function getPlayerMap(playerId,map)
{
  //console.log('JSON.stringify(playerId) '+JSON.stringify(playerId));
  var XHRPlayerResponse = XHR.send("GET", 'https://api.appery.io/rest/1/db/collections/playerDetail', {
  "headers": {
    "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
    "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b",
    "Content-Type":"application/json"
  },
  "parameters": {
    "where": '{"_id":{"$in":'+JSON.stringify(playerId)+'}}'
  }
});
  //console.log(XHRPlayerResponse.body);
  var playerDetail=XHRPlayerResponse.body; 
  //console.log('playerDetail -- '+JSON.stringify(playerDetail));
  for(j=0;j<playerDetail.length;j++)
  {
    var sportName=getSportName(playerDetail[j].sport_id._id);
    //console.log('sportName '+sportName);
    var jsonObj={};
    jsonObj.sportName=sportName;
    var sportSkill=playerDetail[j].sportSkill;
    jsonObj.sportSkill=sportSkill;
    
    var positionsArr=playerDetail[j].positions;
    //console.log('positionsArr '+JSON.stringify(positionsArr));
    var positionString='';
    for(i=0;i<positionsArr.length-1;i++)
    {
      var position=positionsArr[i];
      positionString=positionString +' '+position;
    }
    var position=positionsArr[positionsArr.length-1];
    positionString=positionString+' '+position;
    
    jsonObj.position=positionString;
	if(playerDetail[j].playerVenues!=null)
	{
		jsonObj.playerVenues=playerDetail[j].playerVenues;
	}
    map.put(sportName,jsonObj);
  }
  return map;
}

//var currentUserId=request.get('currentUserId');
//currentUserId='539dbcb4e4b0a0a06ea7b6fc';
//var XHRUserResponse = XHR.send("GET", "https://api.appery.io/rest/1/db/users", {
  //"headers": {
    //"X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
    //"X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b"
  //},
  //"parameters": {
    //"where": '{"_id":"'+currentUserId+'"}'
  //}
//});

try
{

//var userDetail_id=XHRUserResponse.body[0].userDetail_id._id;
var currentUserId = request.get('currentUserId');
var currentUserDetailId = request.get('currentUserDetailId');
var selectedUserDetailId = request.get('selectedUserDetailId');
var userDetail_id;
if (selectedUserDetailId == currentUserDetailId) {
  userDetail_id = currentUserDetailId;
} else {
  userDetail_id = selectedUserDetailId;
}
  
var XHRUserDetailResponse = XHR.send("GET", 'https://api.appery.io/rest/1/db/collections/userDetail', {
  "headers": {
    "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
    "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b",
    "Content-Type":"application/json"
  },
  "parameters": {
    "where": '{"_id":"'+userDetail_id+'"}'
  }
});

var playerDetailArr=XHRUserDetailResponse.body[0].playerDetailArray;
if(playerDetailArr!=null)
{
  var map=new Map();
  //console.log('playerDetailArr '+JSON.stringify(playerDetailArr));
  var playJsonArr=[];
  var playerHash = {};
  var finalArr=[];
  for(i=0;i<playerDetailArr.length;i++)
  {
    var playerDetail=playerDetailArr[i];
   
    if(playerDetail!=null)
    {  
      playJsonArr.push(playerDetail);
      
    }
  }
  
  map=getPlayerMap(playJsonArr,map);
  //console.log('map --- '+map);
  //console.log('map lenght '+map.size())
  var playJsonHash = {};
  playJsonArr=[];
  for(i=0;i<map.keys.length;i++)
  {
    	var key=map.keys[i];
    	var value=map.get(key);
    	playJsonArr.push(value);
  }
  finalArr.push({
    _id: XHRUserDetailResponse.body[0]._id,
    gender: XHRUserDetailResponse.body[0].gender,
    zipcode: XHRUserDetailResponse.body[0].zipcode,
    athleticbio: XHRUserDetailResponse.body[0].athleticbio,
    birthyear: XHRUserDetailResponse.body[0].birthyear,
    playerNumber: XHRUserDetailResponse.body[0].playerNumber,
    headline: XHRUserDetailResponse.body[0].headline,
    sports: playJsonArr
  });
  response.success(finalArr, "application/json");
  //console.log(finalArr);
}
else
{
	var finalArr=[];
	response.success(finalArr, "application/json");
  //playJsonArr.push(XHRUserDetailResponse);
}
}
catch(e)
{
  var finalArr=[];
	response.success(finalArr, "application/json");
}