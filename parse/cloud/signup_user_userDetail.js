
//var sData = request.body();
//request.keys();
//console.log(typeof(sData));

var query_string = {};
var query = request.body();
var vars = query.split("&");
for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    	// If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
    	// If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
    	// If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
} 

//console.log(query_string.name);
var name=query_string.name;
    //request.get('name');
var fullName=query_string.fullName;
    //request.get('fullName');
var email=query_string.email;
    //request.get('email');
var password=query_string.password;
    //request.get('password');
var gender=query_string.gender;
    //request.get('gender');
var birth=query_string.birth;
    //request.get('birth');
var zipcode=query_string.zipcode;
    //request.get('zipcode');
var photo=query_string.photo;
    //request.get('photo');
var imageData=query_string.imagedata;
    //request.get('imagedata');
//console.log(imageData);
var responseBody = {};

var userJson={
  'username':name,
  'password':password,
  'email':email
};
var userDetailJson={
  'username':name,
  'fullName':fullName,
  'gender':gender,
  'zipcode':zipcode,
  'birthyear':birth,
  'photo':photo,
  'profilePhoto':imageData
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
  
  var url = "https://api.appery.io/rest/1/db/files/"+photo+".JPG";
  console.log('fileurl'+url);
  var XHRUserResponse = XHR.send("POST", url, {
    "headers": {
      "X-Appery-Database-Id": "535854f7e4b0021e4555c5a5",
      "X-Appery-Master-Key": "8d48e89a-69df-4491-bfd0-36152b83946b",
      "Content-Type":"image/jpeg"
    },
    "body": imageData
  });
  console.log('files result '+JSON.stringify(XHRUserResponse));
  
  
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