var password=request.get('password');
var username=request.get('username');
//password='2222';
//username='abc';
var dbID = '535854f7e4b0021e4555c5a5';
var responseBody={};
var param={};
param.criteria ={
  'password':password,
  'username':username
}
try
{
  var result=DatabaseUser.login(dbID,username,password);
  //console.log(result);
  var _id=result._id;
  var sessionToken=result.sessionToken;
  responseBody._id=_id;
  responseBody.sessionToken=sessionToken;
  
  var XHRUserResponse = XHR.send("GET", "https://api.appery.io/rest/1/db/users", {
  "headers": {
    "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
    "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b"
  },
  "parameters": {
    "where": '{"_id":"'+_id+'"}'
  }
});
   
  var userDetail_id = XHRUserResponse.body[0].userDetail_id._id;
  //console.log(userDetail_id.userDetail_id );
  
  responseBody.currentUserDetailId = userDetail_id;
  
  
}catch(e){
  var errorMsg=e+'';
  errorMsg= errorMsg.split(':')[1]
  //console.log('errorMsg '+errorMsg);
  responseBody.error=errorMsg;
  //console.log('Error json'+JSON.stringify(e));
  //console.log('Error '+(new String(e)));
}

response.success(responseBody, "application/json");