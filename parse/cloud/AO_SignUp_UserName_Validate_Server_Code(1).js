var username=request.get('username');
//username='rox test 2';
var responseBody = {};
console.log('AO_SignUp_UserName_Validate_Server_Code username '+username);
var params={};
params.criteria={
  'username':username
}
var result=DatabaseUser.query(dbID,params);
//console.log('AO_SignUp_UserName_Validate_Server_Code result '+JSON.stringify(result));
if(result!=null && result.length>0)
{
  responseBody.status='available';
}
else
{
  responseBody.status='inavailable';
}
response.success(responseBody, "application/json");
