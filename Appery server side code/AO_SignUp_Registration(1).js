var name=request.get('name');
var email=request.get('email');
var password=request.get('password');
var gender=request.get('gender');
var birth=request.get('birth');
var zipcode=request.get('zipcode');
var responseBody = {};

var userJson={
  'username':name,
  'password':password,
  'email':email
};
var userDetailJson={
  'gender':gender,
  'zipcode':zipcode,
  'birthyear':birth
}
//console.log('AO_SignUp_Registration userDetailJson '+JSON.stringify(userDetailJson));
try
{
	var result=Collection.createObject(dbID,'userDetail',userDetailJson);
	userJson.userDetail_id={
"collName":"userDetail",
"_id":result._id
}, 
/*userJson.userDetail_id={
  'userDetail_id':result._id
};*/
	//console.log('AO_SignUp_Registration userJson '+JSON.stringify(userJson));
	DatabaseUser.signUp(dbID,userJson);
}catch(e)
{
  var errorMsg=e+'';
  errorMsg= errorMsg.split(':')[1]
  //console.log('errorMsg '+errorMsg);
  responseBody.error=errorMsg;
  //console.log('Error json'+JSON.stringify(e));
  //console.log('Error '+(new String(e)));
}
response.success(responseBody, "application/json");