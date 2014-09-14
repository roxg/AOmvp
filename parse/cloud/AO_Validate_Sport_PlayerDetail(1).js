var currentUserId=request.get('currentUserId');
var sport_id=request.get('sportId');
//sport_id="539dba65e4b0842c3623da63";
//currentUserId='5386b21ae4b09f5c7d4ad7ee';
var XHRUserResponse = XHR.send("GET", "https://api.appery.io/rest/1/db/users", {
  "headers": {
    "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
    "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b"
  },
  "parameters": {
    "where": '{"_id":"'+currentUserId+'"}'
  }
});


var userDetail_id=XHRUserResponse.body[0].userDetail_id._id;
console.log('userDetail_id '+userDetail_id);

var XHRUserDetailResponse = XHR.send("GET", "https://api.appery.io/rest/1/db/collections/userDetail", {
  "headers": {
    "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
    "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b"
  },
  "parameters": {
    "where": '{"_id":"'+userDetail_id+'"}'
  }
});

console.log('XHRUserDetailResponse '+JSON.stringify(XHRUserDetailResponse));
var playerDetailArr=XHRUserDetailResponse.body[0].playerDetailArray


var XHRPlayerResponse = XHR.send("GET", 'https://api.appery.io/rest/1/db/collections/playerDetail', {
  "headers": {
    "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
    "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b",
    "Content-Type":"application/json"
  },
  "parameters": {
    "where": '{"_id":{"$in":'+JSON.stringify(playerDetailArr)+'}}'
  }
});

console.log('XHRPlayerResponse '+JSON.stringify(XHRPlayerResponse));
var flag=false;
for(i=0;i<XHRPlayerResponse.body.length;i++)
{
  var jsonObj=XHRPlayerResponse.body[i];
  if(sport_id==jsonObj.sport_id._id)
  {
    console.log('sport_id '+sport_id);
    console.log('jsonObj.sport_id._id '+jsonObj.sport_id._id);
    flag=true;
    break;
  }
}
var responseBody={};
responseBody.flag=flag;
response.success(responseBody, "application/json");