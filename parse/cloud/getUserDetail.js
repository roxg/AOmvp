var currentUserId = request.get('currentUserId');
var selectedUserDetailId = request.get('selectedUserDetailId');


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
      "where": '{"_id":"' + selectedUserDetailId + '"}'
    }
  });
  var userDetailJson = XHRUserDetailResponse.body;
response.success(userDetailJson, "application/json");
} catch (e) {
response.success("message: " + e.message + "\ncode: " + e.code);}

//response.success(responseBody, "application/json");