var validateEmail=request.get('validateEmail');
//validateEmail='ashleybanfield@gmail.com';
var responseBody = {};
//console.log('AO_SignUp_Email_Validate_Server_Code validateEmail '+validateEmail);
var params={};
params.criteria={
  'email':validateEmail
}
var result=DatabaseUser.query(dbID,params);
//console.log('AO_SignUp_Email_Validate_Server_Code result '+JSON.stringify(result));
if(result!=null && result.length>0)
{
  responseBody.status='available';
}
else
{
  responseBody.status='inavailable';
}
response.success(responseBody, "application/json");
