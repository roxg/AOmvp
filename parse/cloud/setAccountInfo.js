var DB_id = '535854f7e4b0021e4555c5a5';
var collectionName = 'users';

var user_id = request.get("selectedId");
var fb_id = request.get("access_token");

if (user_id.length > 0)
{
  //set access_token to the facebook id.
}

if (fb_id.length > 0)
{
  //set facebook id to the value from the user_id
}

var resultItem = {};
resultItem = Collection.retrieveObject(DB_id, collectionName, id, null);
response.success(resultItem);