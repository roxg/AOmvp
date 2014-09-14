var position = request.get('find_position_name');
var sport_id = request.get('find_sport_id');
var venue_id = request.get('find_venue_id');
var currentUserDetailId = request.get('currentUserDetailId');
var index = 0;
var results = {
  "playerDirectory": [],
  "index": index
};

var XHRPlayerDetailResponse = XHR.send("GET", "https://api.appery.io/rest/1/db/collections/playerDetail", {
  "headers": {
    "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
    "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b"
  }
});

for (var k = 0; k < XHRPlayerDetailResponse.body.length; k++) 
{
  //console.log("k: " + k + "  --: " + XHRPlayerDetailResponse.body.length);
  if (XHRPlayerDetailResponse.body[k].sport_id._id === sport_id && XHRPlayerDetailResponse.body[k].user_id._id !== currentUserDetailId) 
  {
	//console.log("sport Id: " + XHRPlayerDetailResponse.body[k].sport_id._id );
    //console.log("has sport");
    var positionList = [];
    positionList = XHRPlayerDetailResponse.body[k].positions;
    for (var j = 0; j < positionList.length; j++) 
    {
      if (positionList[j] === position) 
      {
        var venueList = [];
        venueList = XHRPlayerDetailResponse.body[k].playerVenues;
        //console.log(venueList);
//console.log(" sport Id: " + XHRPlayerDetailResponse.body[k].sport_id._id + "  positionList: " + positionList[j] + "  venues: " + venueList);
        for (var i = 0; i < venueList.length; i++) 
        {
          //console.log(i + " of " + venueList.length);
          //console.log("positionList: " + positionList[j] );
          //console.log(venueList[i] + " and name: " + venue_id);
          if (venueList[i] === venue_id) 
          {           
	results.playerDirectory.push(XHRPlayerDetailResponse.body[k].user_id._id);
          }
          //console.log("Position found!");
        }
      }
    }
  }
}
  
  index = results.index;
  //output = directory[2];
  var selectedUserDetailId = results.playerDirectory[index];
  var output = {
    "playerDirectory": results.playerDirectory,
    "index": index,
    "selectedUserDetailId": selectedUserDetailId
  };
  
  //console.log('results ' + results);
  response.success(output, "application/json");