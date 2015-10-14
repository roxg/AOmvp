Parse.Cloud.afterSave("Text", function(request) {

Parse.Cloud.useMasterKey();
var text = request.object;
var user = text.get("user")
var acl = new Parse.ACL(user);

text.setACL(acl);
text.save();  
});`