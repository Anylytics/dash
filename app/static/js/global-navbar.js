// Now we've configured RequireJS, we can load our dependencies and start
define([ 'ractive', 'rv!../ractive/global-navbar'], function ( Ractive, html) {

    var globalNavbar = new Ractive({
      el: 'global-navbar',
      data: {
	  		name: name,		//This variable is written to a js var from flask,
	  		admin: isadmin
        },
      template: html
    });

    return globalNavbar;

});
