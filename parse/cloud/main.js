Parse.Cloud.afterSave("Text", function(request) {

    //create user role
    var userRoleACL = new Parse.ACL();
    userRoleACL.setPublicReadAccess(false);
    userRoleACL.setPublicWriteAccess(false);
    var userRole = new Parse.Role(accountName + USER, userRoleACL);
    userRole.save();

    // create dummy object for each role with access to only that role
    // we will use these dummy objects in cloud code to figure out whether
    // the user belongs to that group.

    //create dummy for admin
    var dummy = new Dummy();
    dummy.set("name", accountName + ADMINISTRATOR + DUMMY);
    var dummyACL = new Parse.ACL();
    dummyACL.setPublicReadAccess(false);
    dummyACL.setRoleReadAccess(adminRole, true);
    dummy.setACL(dummyACL);
    dummy.save();

    //create dummy for user
    dummy = new Dummy();
    dummy.set("name", accountName + USER + DUMMY);
    dummyACL = new Parse.ACL();
    dummyACL.setPublicReadAccess(false);
    dummyACL.setRoleReadAccess(userRole, true);
    dummy.setACL(dummyACL);
    dummy.save();

});

Parse.Cloud.define("addUsersToRole", function(request, response) {
    Parse.Cloud.useMasterKey();
    var currentUser = request.user;
    var accountName = request.params.accountname;

    var query = new Parse.Query(Parse.Role);
    query.contains("name", accountName);
    query.find({
        success : function(roles) {
            console.log("roles: " + roles.length);
            for (var i = 0; i < roles.length; i++) {
                roles[i].getUsers().add(currentUser);
                roles[i].save();
            }
            response.success();
        },
        error : function(error) {
            response.error("error adding to admin role " + error);
        }
    });
});

Parse.Cloud.define("inviteToSignUp", function(request, response) {
    var userEmail = request.params.email;
    var currentUser = request.user;
    var accountName = currentUser.get("accountname");

    //do it only if the user is admin
    var query = new Parse.Query(Dummy);
    query.equalTo("name", + accountName + ADMINISTRATOR + DUMMY);

    query.first({
        success : function(dummy) {
            if(dummy) {
                sendSignupEmail(userEmail, currentUser, request, response);
            } else {
                response.error("Invitation failed. You don't have the priviledges to add new user. Please contact your administrator'");
            }
        }, 
        error : function(error) {
            response.error("error while inviting users. " + error.message);
        }
    })

});