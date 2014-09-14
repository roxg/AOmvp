var XHRUserDetailResponse = XHR.send("GET", "https://api.appery.io/rest/1/db/collections/userDetail", {
  "headers": {
    "X-Appery-Database-Id": dbID,
    "X-Appery-Master-Key": masterKey
  },
});
var XHRPlayerDetailResponse = XHR.send("GET", "https://api.appery.io/rest/1/db/collections/playerDetail", {
    "headers": {
      "X-Appery-Database-Id": dbID,
      "X-Appery-Master-Key": masterKey
    }
  });

var results = {};
var users = [];
var player_id;
for (var i in XHRUserDetailResponse.body)
{
  users[i] = XHRUserDetailResponse.body[i]._id;
  if(XHRUserDetailResponse.body[i]._id === XHRPlayerDetailResponse.body.user_id)
  {
    player_id = XHRPlayerDetailResponse.body._id
   console.log( XHRPlayerDetailResponse.body);
  }
  
}
response.success(XHRUserDetailResponse.body, "text/plain");