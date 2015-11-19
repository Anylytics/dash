// Now we've configured RequireJS, we can load our dependencies and start
define([ 'ractive', 'rv!../ractive/user-admin',  'jquery', 'dashglobals'], function ( Ractive, html, load, $, dashglobals) {


    var userAdmin = new Ractive({
      el: 'userAdmin',
      data: {
      },
    template: html
    });

    return userAdmin;

});
