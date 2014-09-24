var currentUserDetailId=request.get('currentUserDetailId');
var sport_id=request.get('sportId');
var position=request.get('position');
var skill=request.get('skill');
var venues=request.get('venues');

position=JSON.parse(position);
venues=JSON.parse(venues);
skill=JSON.parse(skill);

//CREATE THE JSON STRING TO INSERT INTO COLLECTION
var playerDetailJson={};
playerDetailJson.positions=position;
playerDetailJson.playerVenues=venues;
playerDetailJson.sportSkill=skill;
playerDetailJson.sport_id={
  'collName':'sports',
  '_id':sport_id
}
playerDetailJson.user_id={
  'collName':'userDetail',
  '_id':currentUserDetailId
}

//POST JSON TO THE PLAYER DETAIL COLLECTION
 var url="https://api.appery.io/rest/1/db/collections/playerDetail";
  var XHRUserResponse = XHR.send("POST", url, {
    "headers": {
      "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
      "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b",
      "Content-Type":"application/json"
    },
    "body": playerDetailJson
  });
console.log('XHRUserResponse '+JSON.stringify(XHRUserResponse));

var XHRUserDetailResponse = XHR.send("GET", "https://api.appery.io/rest/1/db/collections/userDetail", {
  "headers": {
    "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
    "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b"
  },
  "parameters": {
    "where": '{"_id":"'+currentUserDetailId+'"}'
  }
});

console.log('XHRUserDetailResponse '+JSON.stringify(XHRUserDetailResponse));
var playerDetailArr=XHRUserDetailResponse.body[0].playerDetailArray
 
 if(playerDetailArr!=null)
 {
	console.log('playerDetailArr '+JSON.stringify(playerDetailArr));
	playerDetailArr.push(XHRUserResponse.body._id)
 }
 else
 {
	playerDetailArr=[];
	playerDetailArr.push(XHRUserResponse.body._id);
 }
 
 console.log('playerDetailArr '+JSON.stringify(playerDetailArr));
var tokenId=request.get('tokenId');
var jsonData={
  'tokenId':tokenId,
  'playerDetailArray':playerDetailArr
}
var url="https://api.appery.io/rest/1/db/collections/userDetail/"+currentUserDetailId;
console.log('url '+url);
var XHRUserResponse = XHR.send("PUT", url, {
  "headers": {
    "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
    "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b",
    "Content-Type":"application/json"
  },
  "body": jsonData
});