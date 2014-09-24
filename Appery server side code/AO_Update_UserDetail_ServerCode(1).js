var currentUserId=request.get('currentUserId');
var currentUserDetailId=request.get('currentUserDetailId');
var headline=request.get('headline');
var athleticbio=request.get('athleticbio');
var playerNumber=request.get('playerNumber');
var tokenId=request.get('tokenId');
var jsonData={
  'tokenId':tokenId,
  'headline':headline,
  'athleticbio':athleticbio,
  'playerNumber':playerNumber
}
var url="https://api.appery.io/rest/1/db/collections/userDetail/"+currentUserDetailId;
var XHRUserResponse = XHR.send("PUT", url, {
  "headers": {
    "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
    "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b",
    "Content-Type":"application/json"
  },
  "body": jsonData
});


