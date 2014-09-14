//var DB_id = '535854f7e4b0021e4555c5a5';
var collectionName = 'events';
var result = {}, sport, position, commitmentType, notes;
var event_id = request.get("selectedEventID");
try
{
  if(event_id!==null){
    result = Collection.retrieveObject(dbID, collectionName, event_id);
    response.success(result);
  }
}catch(e){
  var errorMsg=e+'';
  errorMsg= errorMsg.split(':')[1]
  //console.log('errorMsg '+errorMsg);
  response.error=errorMsg;
  //console.log('Error json'+JSON.stringify(e));
  //console.log('Error '+(new String(e)));
}
