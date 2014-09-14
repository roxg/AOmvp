// #####Work in progress######
var _idUserDetal=request.get('_idUserDetal');
_idUserDetal="539e8010e4b0a0a06ea7b704";
var headline=request.get('headline');
headline="aaa";
var athleticbio=request.get('athleticbio');
athleticbio="www wwww";
var playerNumber=request.get('playerNumber');
playerNumber=2344
var jsonData={
  'headline':headline,
  'athleticbio':athleticbio,
  'playerNumber':23
}
var XHRUserResponse = XHR.send("PUT", "https://api.appery.io/rest/1/db/userDetail/"+_idUserDetal, {
  "headers": {
    "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
    "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b"
  },
  "body": jsonData
});



console.log("AO_Update_UserDetail_ServerCode XHRResponse "+JSON.stringify(XHRUserResponse));