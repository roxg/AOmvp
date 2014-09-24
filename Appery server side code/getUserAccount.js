var currentUserId = request.get('currentUserId');
var currentUserDetailId = request.get('currentUserDetailId');

try {
  var userArr = [];
  var XHRUserDetailResponse = XHR.send("GET", "https://api.appery.io/rest/1/db/collections/userDetail", {
    "headers": {
      "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
      "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b"
    },
    "parameters": {
      "where": '{"_id":"' + currentUserDetailId + '"}'
    }
  });
  var XHRUserResponse = XHR.send("GET", "https://api.appery.io/rest/1/db/users", {
    "headers": {
      "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
      "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b"
    },
    "parameters": {
      "where": '{"_id":"' + currentUserId + '"}'
    }
  });
  var user_name = XHRUserResponse.body[0].username;
  var user_email = XHRUserResponse.body[0].email; 
  var userDetail_fullName = XHRUserDetailResponse.body[0].fullName; 
  var userDetail_isActive = XHRUserDetailResponse.body[0].isActive;
  var userDetail_gender = XHRUserDetailResponse.body[0].gender;
  var userDetail_birthyear = XHRUserDetailResponse.body[0].birthyear;
  var userDetail_zipcode = XHRUserDetailResponse.body[0].zipcode;
  
  
  userArr.push({
    user_name: user_name,
    user_email: user_email,
    userDetail_isActive: userDetail_isActive,
    userDetail_fullName: userDetail_fullName,
    userDetail_gender: userDetail_gender,
    userDetail_birthyear: userDetail_birthyear,
    userDetail_zipcode: userDetail_zipcode
  })
  response.success(userArr, "application/json");
} catch (e) {
  var errorMsg = e + '';
  errorMsg = errorMsg.split(':')[1]
  console.log('errorMsg ' + errorMsg);
  response.error = errorMsg;
}