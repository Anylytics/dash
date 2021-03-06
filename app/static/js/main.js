// First we have to configure RequireJS
require.config({
    // This tells RequireJS where to find Ractive and rvc
    paths: {
        ractive: 'lib/ractive',
        rv: 'loaders/rv',
        mapbox: 'lib/mapbox',
        jquery: 'lib/jquery-1.11',
        jqueryui: 'lib/jquery_ui',
        bootstrap: 'bootstrap/bootstrap.min',
        datatables: 'lib/table',
        Chart: 'lib/Chart.min',
        dashcharts: 'lib/dash-charts',
        dashglobals: 'lib/dash-globals'
    }
});


require(["global-navbar"]);