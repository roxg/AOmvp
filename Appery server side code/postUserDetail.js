try {
  
  var currentUserDetailId = request.get('currentUserDetailId');
  var headline = request.get('headline');
  var athleticbio = request.get('athleticbio');
  var playerNumber = request.get('playerNumber');
  var gender = request.get('gender');
  var birthyear = request.get('birthyear');
  var zipcode = request.get('zipcode');
  var tokenId = request.get('tokenId');
  var profilePhoto = request.get('profilePhoto');
  var photo = request.get('imageName');
  
  var currentPlayerDetailID;
  var jsonUserDetailData = {
    'tokenId': tokenId,
    'headline': headline,
    'athleticbio': athleticbio,
    'playerNumber': playerNumber,
    'gender': gender,
    'birthyear': birthyear,
    'zipcode': zipcode,
    'playerNumber': playerNumber,
    'profilePhoto': profilePhoto,
    'photo': photo
  }
  var responseBody = {};
  var responseBody = Collection.updateObject(dbID, "userDetail", currentUserDetailId, jsonUserDetailData, tokenId);
  //currentPlayerDetailID = Collection.retrieveObject(dbID, "playerDetail", currentUserDetailId, "user_id", tokenId);
  
  //var jsonPlayerDetailData={
  //'tokenId':tokenId,
  //'playerNumber':playerNumber
  //	}
  response.success(responseBody, "application/json");
  
} catch (e) {
  response.success("message: " + e.message + "\ncode: " + e.code);
}