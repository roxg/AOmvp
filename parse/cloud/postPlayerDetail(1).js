try {
  
  var playerVenues = request.get('playerVenues');
  var positions = request.get('positions');
  var currentUserDetailId = request.get('currentUserDetailId');
  var sport_id = request.get('sport_id');
  var defaultSport = request.get('defaultSport');
  var sportSkill = request.get('sportSkill');
  var skillLevel = request.get('skillLevel');
  var isDeleted = request.get('isDeleted');
  var tokenId = request.get('tokenId');
  jsonUserDetailId = {};
  jsonUserDetailId = {
    'collName': 'user_id',
    '_id': currentUserDetailId
  }
  jsonSportId = {};
  jsonSportId = {
    'collName': 'sport_id',
    '_id': sport_id
  }
  
  var updatePlayerDetailData = [];
  updatePlayerDetailData.push({
    playerVenues: playerVenues,
    positions: positions,
    sport_id: jsonSportId,
    defaultSport: defaultSport,
    sportSkill: sportSkill,
    skillLevel: skillLevel,
    isDeleted: isDeleted
  });
  
  responseBody = Collection.update(dbID, "playerDetail", updatePlayerDetailData, tokenId);
  response.success(responseBody, "application/json");
  
} catch (e) {
  response.success("message: " + e.message + "\ncode: " + e.code);
}