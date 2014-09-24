var username=request.get('username');
var responseBody = {};
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
