// Now we've configured RequireJS, we can load our dependencies and start
define([ 'ractive', 'rv!../ractive/user-admin',  'jquery', 'dashglobals'], function ( Ractive, html, $, dashglobals) {


    var userAdmin = new Ractive({
      el: 'userAdmin',
      data: {
      	"errorMessage":"",
      	"thisLoading":true,
      	"users":{},
      	"userCreationObject": {
			"username":"",
			"email":"",
			"password":""
		},
		"groups":{},
      	"groupCreationObject": {
			"groupname":""
		},
		"templates":{},
		"templateCreationObject":{
			"templatename":""
		},
		"user2groupObject": {
			"username":"",
			"groupname":""
		},
		"group2templateObject": {
			"groupname":"",
			"templatename":""
		}
      },
    template: html
    });

	userAdmin.on({
		getUsers: function ( event ) {
			toggleLoading(true);
			_getStuff('getUsers','users');
			toggleLoading(false);
		},
		createUser: function ( event ) {
			toggleLoading(true);
			var userObj = userAdmin.get("userCreationObject");
			var blankUserObj = {
				"username":"",
				"email":"",
				"password":""
			};
			_runAPI('POST','createUser',userObj);
			userAdmin.set("userCreationObject",blankUserObj);
			_getStuff('getUsers','users');
			toggleLoading(false);
		},
		deleteUser: function ( event ) {
			toggleLoading(true);
			var userKeypath = event.keypath;
			var thisUser = userAdmin.get(userKeypath);
			_runAPI('POST','deleteUser',thisUser);
			_getStuff('getUsers','users');
			toggleLoading(false);
		},
    updatePw: function ( event ) {
      toggleLoading(true);
      var thisPassword = event.node.parentNode.parentNode.getElementsByTagName("input")[0].value;
			var userKeypath = event.keypath;
			var thisUser = userAdmin.get(userKeypath).username;
      var dataToSend = {
        'username':thisUser,
        'password':thisPassword
      };
      _runAPI('POST','changePassword',dataToSend);
			_getStuff('getUsers','users');
      toggleLoading(false);
      event.node.parentNode.parentNode.getElementsByTagName("input")[0].value = "";
    },
    leaveGroup: function ( event ) {
      toggleLoading(true);
			var groupKeypath = event.keypath;
      //event.node.parentNode.className += " deleting";
			var thisGroup = userAdmin.get(groupKeypath);
      var keypathParsed = groupKeypath.split('.');
      var userKeypath = keypathParsed[0]+'.'+keypathParsed[1];
      var thisUser = userAdmin.get(userKeypath);
      var dataToSend = {};
      dataToSend.groupname = thisGroup;
      dataToSend.username = thisUser.username;
			_runAPI('POST','leaveGroup',dataToSend);
			_getStuff('getUsers','users');
      toggleLoading(false);
    },
    disassociateTemplate: function ( event ) {
      toggleLoading(true);
			var templateKeypath = event.keypath;
			var thisTemplate = userAdmin.get(templateKeypath);
      var keypathParsed = templateKeypath.split('.');
      var groupKeypath = keypathParsed[0]+'.'+keypathParsed[1];
      var thisGroup = userAdmin.get(groupKeypath).groupname;
      var dataToSend = {};
      dataToSend.groupname = thisGroup;
      dataToSend.templatename = thisTemplate;
			_runAPI('POST','disassociateTemplate',dataToSend);
			_getStuff('getGroups','groups');
    },
		getGroups: function ( event ) {
			toggleLoading(true);
			_getStuff('getGroups','groups');
			toggleLoading(false);
		},
		createGroup: function ( event ) {
			toggleLoading(true);
			var groupObj = userAdmin.get("groupCreationObject");
			var blankGroupObj = {
				"groupname":""
			};
			_runAPI('POST','createGroup',groupObj);
			userAdmin.set("groupCreationObject",blankGroupObj);
			_getStuff('getGroups','groups');
			toggleLoading(false);
		},
		deleteGroup: function ( event ) {
			toggleLoading(true);
			var groupKeypath = event.keypath;
			var thisGroup = userAdmin.get(groupKeypath);
			_runAPI('POST','deleteGroup',thisGroup);
			_getStuff('getGroups','groups');
			_getStuff('getUsers','users');
			toggleLoading(false);
		},
		getTemplates: function ( event ) {
			toggleLoading(true);
			_getStuff('getTemplatesAdmin','templates');
			toggleLoading(false);
		},
		createTemplate: function ( event ) {
			toggleLoading(true);
			var templateObj = userAdmin.get("templateCreationObject");
			var blankTemplateObj = {
				"templatename":""
			};
			_runAPI('POST','createTemplate',templateObj);
			userAdmin.set("templateCreationObject",blankTemplateObj);
			_getStuff('getTemplatesAdmin','templates');
			toggleLoading(false);
		},
		deleteTemplate: function ( event ) {
			toggleLoading(true);
			var templateKeypath = event.keypath;
			var thisTemplate = userAdmin.get(templateKeypath);
			console.log(thisTemplate);
			_runAPI('POST','deleteTemplate',thisTemplate);
			_getStuff('getGroups','groups');
			_getStuff('getTemplatesAdmin','templates');
			toggleLoading(false);
		},
		addUserToGroup: function ( event ) {
			toggleLoading(true);
			var user2grpObj = userAdmin.get("user2groupObject");
			var blankuser2grpObj = {
				"username":"",
				"groupname":""
			}
			_runAPI('POST','joinGroup',user2grpObj);
			userAdmin.set("user2groupObject",blankuser2grpObj);
			_getStuff('getUsers','users');
			toggleLoading(false);

		},
		addGrouptoTemplate: function ( event ) {
			toggleLoading(true);
			var grp2tmplObj = userAdmin.get("group2templateObject");
			var blankgrp2tmplObj = {
				"groupname":"",
				"templatename":""
			}
			_runAPI('POST','associateTemplate',grp2tmplObj);
			userAdmin.set("group2templateObject",blankgrp2tmplObj);
			_getStuff('getGroups','groups');
			toggleLoading(false);

		}
	});

	function _getStuff(method, ractiveObj) {
		toggleLoading(true);
		$.ajax({
			type: "GET",
			url: "./api/v1.0/"+method,
			contentType : 'application/json',
			dataType: "json",
			beforeSend: function (xhr) {
				xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + apikey));
			},
			success: function(json) {
				userAdmin.set(ractiveObj,json.response);
				console.log(json.response);
			}
		});
		toggleLoading(false);
	}

	function _runAPI(fnct, method, data) {
		$.ajax({
			type: fnct,
			url: "./api/v1.0/"+method,
			contentType : 'application/json',
			dataType: "json",
			data: JSON.stringify(data),
			beforeSend: function (xhr) {
				xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + apikey));
			},
			success: function(json) {
				console.log(json);
				return json;
			},
			error: function(xhr, status, error) {
				if (status=="error") {
					userAdmin.set("errorMessage",error);
				}
			}
		});
	}

	_getStuff('getUsers','users');
	_getStuff('getGroups','groups');
	_getStuff('getTemplatesAdmin','templates');

	function toggleLoading( setTo ) {
		userAdmin.set("errorMessage","");
		if (setTo) {
			userAdmin.set("thisLoading", setTo);
		} else {
			setTimeout(function(){ userAdmin.set("thisLoading", setTo); }, 1000);
		}
	}


    return userAdmin;

});
