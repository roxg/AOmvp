var currentUserId = request.get('currentUserId');
var currentUserDetailId = request.get('currentUserDetailId');
var selectedUserDetailId = request.get('selectedUserDetailId');
var user_id;
if (selectedUserDetailId == currentUserDetailId) {
  user_id = currentUserDetailId;
} else {
  user_id = selectedUserDetailId;
}

try {
  //console.log("user_id: " + user_id + " | CurrentUser_id: " + currentUserId + " | CurrentUserDetail_id: " + currentUserDetailId + " | selected_id: " + selectedUserDetailId);
  
  //var _id=XHRUserResponse.body[0].userDetail_id._id;
  //console.log("UserDetail_id: " + user_id);
  var XHRUserDetailResponse = XHR.send("GET", "https://api.appery.io/rest/1/db/collections/userDetail", {
    "headers": {
      "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
      "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b"
    },
    "parameters": {
      "where": '{"_id":"' + user_id + '"}'
    }
  });
  var userDetailJson = XHRUserDetailResponse.body;

} catch (e) {}
response.success(userDetailJson, "application/json");
//response.success(responseBody, "application/json");