// Now we've configured RequireJS, we can load our dependencies and start
define([ 'ractive', 'rv!../ractive/status-widget'], function ( Ractive, html) {

    var globalNavbar = new Ractive({
      el: 'status-widget-home',
      data: {
	  		name: name		//This variable is written to a js var from flask
        },
      template: html
    });

    return globalNavbar;

});
