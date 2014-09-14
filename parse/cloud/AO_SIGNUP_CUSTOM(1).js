var name=request.get('name');
//name='name';
var email=request.get('email');
//email='email';
var password=request.get('password');
//password='password';
var gender=request.get('gender');
//gender='gender';
var birth=request.get('birth');
//birth='hhk';
var zipcode=request.get('zipcode');
//zipcode='222';
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
var responseBody={};

var jsonData={
  'username':'username',
  'password':'password',
  'email':'email'
}

var url="https://api.appery.io/rest/1/db/collections/userDetail";
//console.log('url '+url);
var XHRUserResponse = XHR.send("POST", url, {
  "headers": {
    "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
    "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b",
    "Content-Type":"application/json"
  },
  "body": userDetailJson
});
//console.log('users result '+JSON.stringify(XHRUserResponse));

if(XHRUserResponse.status==200)
{
  var _id=XHRUserResponse.body._id;
  userJson.userDetail_id={
  "collName":"userDetail",
  "_id":_id
  };
    
  var url="https://api.appery.io/rest/1/db/users";
  var XHRUserResponse = XHR.send("POST", url, {
    "headers": {
      "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
      "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b",
      "Content-Type":"application/json"
    },
    "body": userJson
  });
  if(XHRUserResponse.status!=200)
  {
    responseBody.error=XHRUserResponse.body.description
  }
}
else
{
  	responseBody.error=XHRUserResponse.body.description
}
response.success(XHRUserResponse.body, "application/json");