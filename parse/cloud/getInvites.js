var collectionName = 'invites';
var result = [];
var query = [];
var currentUserDetailId = request.get("currentUserDetailId");
query = Collection.query(dbID, collectionName);

for (var i = 0; i < query.length; i++) {
  //if (query[i].invitedByUserDetailId == currentUserDetailId)// && query[i].sport == sport && query[i].venue == venue && query[i].isActive == 1)
  {
    result.push({
      sportId: query[i].sportId,
      invitedUserDetailId: query[i].invitedUserDetailId,
      inviteName: query[i].inviteName,
      playingTime: query[i].playingTime,
      positions: query[i].positions,
      commitmentLevel: query[i].commitmentLevel,
      venuesId: query[i].venuesId
    });
  }
}

response.success(result);