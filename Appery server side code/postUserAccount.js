try {
  var tokenId = request.get('tokenId');
  var currentUserDetailId = request.get('currentUserDetailId');
  var currentUserId = request.get('currentUserId');
  var user_email = request.get('user_email');
  var userDetail_isActive = request.get('userDetail_isActive');
  var userDetail_userName = request.get('userDetail_userName');
  var userDetail_fullName = request.get('userDetail_fullName');
  var userDetail_gender = request.get('userDetail_gender');
  var userDetail_birthyear = request.get('userDetail_birthyear');
  var userDetail_zipcode = request.get('userDetail_zipcode');
  //update user detail collection
  if (userDetail_isActive === null)
  {
   userDetail_isActive = true; 
  }
  var jsonUserDetailData = {
    'tokenId': tokenId,
    'isActive': userDetail_isActive,
    'username': userDetail_userName,
    'fullName': userDetail_fullName,
    'gender': userDetail_gender,
    'birthyear': userDetail_birthyear,
    'zipcode': userDetail_zipcode
  }
  var responseUserDetail = {};
  var responseUserDetail = Collection.updateObject(dbID, "userDetail", currentUserDetailId, jsonUserDetailData, tokenId);
  //update user collection
  var jsonUserData = {
    'tokenId': tokenId,
    'email': user_email
  }
  /*
  var responseUser = {};
  var responseUser = Collection.updateObject(dbID, "user", currentUserId, jsonUserData, tokenId);
  
  var results = [];
  results.push(responseUserDetail);
  results.push(responseUser);
  */
  response.success(responseUserDetail, "application/json");
} catch (e) {
  response.success("message: " + e.message + "\ncode: " + e.code);
}