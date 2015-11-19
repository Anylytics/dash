// Now we've configured RequireJS, we can load our dependencies and start
define([ 'ractive', 'rv!../ractive/user-admin',  'jquery', 'dashglobals'], function ( Ractive, html, load, $, dashglobals) {


    var userAdmin = new Ractive({
      el: 'userAdmin',
      data: {
      	"users":{}
      },
    template: html
    });

    function getUsers() {
		$.ajax({
			type: "GET",
			url: "./api/v1.0/getUsers",
			contentType : 'application/json',
			dataType: "json",
			beforeSend: function (xhr) {
				xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + apikey));
			},
			success: function(json) {
				tableHistoryThree.set("users",json.response);
				//hideAnimation("loading-screen");
			}
		});
	}

    return userAdmin;

});
