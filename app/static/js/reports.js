// Now we've configured RequireJS, we can load our dependencies and start
define([ 'ractive', 'rv!../ractive/reports-page', 'rv!../ractive/loading-widget',  'jquery', 'Chart', 'dashcharts', 'dashglobals', 'datatables'], function ( Ractive, html, load, $, Chart, dashcharts, dashglobals, datatables) {

	/*INITIALIZATIONS*/
	Ractive.partials.loadingWidget = load;
	var dashLineCharts = new dashCharts('line');
	var dashPieCharts = new dashCharts('pie');
	var dashBarCharts = new dashCharts('bar');
	var dashTables = new dashCharts('table');


    var tableHistoryThree = new Ractive({
      el: 'tableHistoryThree',
      data: {
      	"response": {},
      	"thisLoading":false,
      	"templates": {},
      	"file_id": {},
      	"filename": {},
      	"currentFilter": "",
      	"summary":
      		{
      			title: "Summary",
      			subheading: "Summary Statistics",
      			type:"summary",
      			headers: 	[
	      						{"name":"state", 		"label":"State"},
	      						{"name":"direction", 	"label":"Direction"},
	      						{"name":"percentage", 	"label":"Percentage"}
      						],
	      		rows: 		[
							{"group":"","text":"Number of healthy stores increased by 23%","direction":"increased","percentage":23},
	      						{"group":"","text":"Number of OK stores decreased by 3%","direction":"increased","percentage":51},
	      						{"group":"","text":"Number of ICU stores increased by 33%","direction":"decreased","percentage":7},
	      						{"group":"","text":"Number of dead stores increased by 2%","direction":"increased","percentage":55}
	      					]
      		},
      	"numberStores":
      		{
      			title: "Number of Stores",
      			subheading: "Trending number of stores (Three Months)",
      			type:"line-graph",
      			headers: 	[
	      						{"name":"date", 		"label":"Date"},
	      						{"name":"group", 		"label":"Group"},
	      						{"name":"count", 		"label":"Count"}
      						],
	      		rows: 		[
	      						{"group":"All Stores","label":"05/01/2015","value":255},
	      						{"group":"All Stores","label":"05/15/2015","value":278},
	      						{"group":"All Stores","label":"05/31/2015","value":290},
	      						{"group":"All Stores","label":"06/01/2015","value":302},
	      						{"group":"All Stores","label":"06/15/2015","value":344},
	      						{"group":"All Stores","label":"06/30/2015","value":378},
	      						{"group":"All Stores","label":"07/01/2015","value":401},
	      						{"group":"All Stores","label":"07/15/2015","value":422},
	      						{"group":"All Stores","label":"07/31/2015","value":450}
	      					]
      		},
      	"numberStoresBreakdown":
      		{
      			title: "Number of Stores By Health",
      			subheading: "Trending number of stores (Three Months)",
      			type:"line-graph",
      			headers: 	[
	      						{"name":"date", 		"label":"Date"},
	      						{"name":"group", 		"label":"Group"},
	      						{"name":"count", 		"label":"Count"}
      						],
	      		rows: 		[
	      						{"group":"Healthy","label":"05/01/2015","value":255},
	      						{"group":"Healthy","label":"05/15/2015","value":278},
	      						{"group":"Healthy","label":"05/31/2015","value":290},
	      						{"group":"Healthy","label":"06/01/2015","value":302},
	      						{"group":"Healthy","label":"06/15/2015","value":344},
	      						{"group":"Healthy","label":"06/30/2015","value":378},
	      						{"group":"Healthy","label":"07/01/2015","value":401},
	      						{"group":"Healthy","label":"07/15/2015","value":422},
	      						{"group":"Healthy","label":"07/31/2015","value":450},
	      						{"group":"OK","label":"05/01/2015","value":152},
	      						{"group":"OK","label":"05/15/2015","value":177},
	      						{"group":"OK","label":"05/31/2015","value":198},
	      						{"group":"OK","label":"06/01/2015","value":214},
	      						{"group":"OK","label":"06/15/2015","value":251},
	      						{"group":"OK","label":"06/30/2015","value":277},
	      						{"group":"OK","label":"07/01/2015","value":278},
	      						{"group":"OK","label":"07/15/2015","value":291},
	      						{"group":"OK","label":"07/31/2015","value":302},
	      						{"group":"ICU","label":"05/01/2015","value":55},
	      						{"group":"ICU","label":"05/15/2015","value":67},
	      						{"group":"ICU","label":"05/31/2015","value":45},
	      						{"group":"ICU","label":"06/01/2015","value":88},
	      						{"group":"ICU","label":"06/15/2015","value":93},
	      						{"group":"ICU","label":"06/30/2015","value":123},
	      						{"group":"ICU","label":"07/01/2015","value":111},
	      						{"group":"ICU","label":"07/15/2015","value":177},
	      						{"group":"ICU","label":"07/31/2015","value":189},
	      						{"group":"Dead","label":"05/01/2015","value":34},
	      						{"group":"Dead","label":"05/15/2015","value":56},
	      						{"group":"Dead","label":"05/31/2015","value":76},
	      						{"group":"Dead","label":"06/01/2015","value":87},
	      						{"group":"Dead","label":"06/15/2015","value":99},
	      						{"group":"Dead","label":"06/30/2015","value":134},
	      						{"group":"Dead","label":"07/01/2015","value":165},
	      						{"group":"Dead","label":"07/15/2015","value":178},
	      						{"group":"Dead","label":"07/31/2015","value":180}

	      					]
      		},
      	"aggregate":
	      	{
	      		title: "Historical Summary",
	      		subheading: "Aggregate Store Performance",
      			type:"table",
	      		headers: 	[
	      						{"name":"date", 	"label":"Date"},
	      						{"name":"dead", 	"label":"Dead"},
	      						{"name":"icu", 		"label":"Dying in ICU"},
	      						{"name":"ok", 		"label":"OK"},
	      						{"name":"healthy", 	"label":"Healthy"}
	      					],
	      		rows: 		[
	      						{"date":"06/28/2015","dead":4,"icu":3,"ok":12,"healthy":13},
	      						{"date":"06/21/2015","dead":2,"icu":5,"ok":17,"healthy":12}
	      					]
			},
		"current":
			{
				title: "Detailed Summary",
				subheading: "Data for 07/25/2015",
				headers: 	[
	      						{"name":"city", 	"label":"City"},
	      						{"name":"nostore", 	"label":"No Stores"},
	      						{"name":"dead", 	"label":"Dead"},
	      						{"name":"icu", 		"label":"Dying in ICU"},
	      						{"name":"ok", 		"label":"OK"},
	      						{"name":"healthy", 	"label":"Healthy"}
							],
				rows: 		[
	      						{"city":"Bangalore","nostore":3,"dead":4,"icu":32,"ok":3,"healthy":63},
	      						{"city":"Chennai","nostore":21,"dead":14,"icu":163,"ok":122,"healthy":73},
	      						{"city":"Hyderabad","nostore":4,"dead":12,"icu":33,"ok":142,"healthy":53},
	      						{"city":"Mumbai","nostore":24,"dead":17,"icu":36,"ok":122,"healthy":131},
	      						{"city":"New Stores","nostore":15,"dead":34,"icu":31,"ok":126,"healthy":133},
	      						{"city":"Pune","nostore":2,"dead":4,"icu":2,"ok":123,"healthy":13}
							]
			}
      },
    template: html
    });

	function toggleLoading() {
		tableHistoryThree.set("thisLoading",!tableHistoryThree.get("thisLoading"));
	}

	$.ajax({
	  type: "GET",
	  url: "./api/v1.0/getTemplates",
	  contentType : 'application/json',
	  dataType: "json",
	  beforeSend: function (xhr) {
			xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + apikey));
	  },
	  success: function(json) {
	  	console.log(JSON.stringify(json));
	  	tableHistoryThree.set("templates",json.response);
  		hideAnimation("loading-screen");
	  }
	});

	function getReportData(templateName) {
		if (!templateName) {
			templateName = $("#templateBox").val();
		}
		toggleLoading();
		tableHistoryThree.set("response", {});
		$.ajax({
		  type: "POST",
		  url: "./api/v1.0/getData",
		  contentType : 'application/json',
		  dataType: "json",
		  data: JSON.stringify({"template": templateName, "rows": 1}),
		  success: function(json) {
		  	var rawData = json.response[0];
		  	var file_id = json.response[1];
		  	var filename = json.response[2];
		  	for (objects in rawData) {
		  		if (rawData[objects].name==null) {
		  			rawData[objects].name="dataObj"+objects;
		  		}
		  		if (rawData[objects].width==null) {
		  			rawData[objects].width=6;
		  		}
		  		if (rawData[objects].type==null) {
		  			rawData[objects].type="table";
		  		}
		  	}

		  	tableHistoryThree.set("response", rawData);
		  	tableHistoryThree.set("file_id",file_id);
		  	tableHistoryThree.set("filename", filename);
		  	var responseObj = tableHistoryThree.get("response");
		  	for (objects in responseObj) {

		  		if (responseObj[objects].type=="line-graph") {
		  			dashLineCharts.buildChart(responseObj[objects],'#'+responseObj[objects].name);
		  		}

		  		if (responseObj[objects].type=="pie-graph") {
		  			dashPieCharts.buildChart(responseObj[objects],'#'+responseObj[objects].name);
		  		}
		  		if (responseObj[objects].type=="bar-graph") {
		  			dashBarCharts.buildChart(responseObj[objects],'#'+responseObj[objects].name);
		  		}


		  		if (responseObj[objects].type=="table") {
		  			dashTables.buildChart(responseObj[objects]);
		  		}

		  	}
		  	/*for (var i =0; i<json["response"].length; i++)
		  	{
		  		//tableHistoryThree.set("aggregate.columns."+json["response"][i]["date"], json["response"][i]["aggregate"]);
		  	}*/
			toggleLoading();
			//dashLineCharts.buildChart(tableHistoryThree.get("response[2]"),'#numberStoresBreakdown');
			tableHistoryThree.set("currentFilter",tableHistoryThree.get("response[5].city[0].name"));
			$(document).ready(function(){
			    $('#response-3').DataTable({
			    	"paging":false,
			    	"info":false
			    });
			});

		  }
		});
	}


	$("#templateBox").change(function() {
		getReportData($("#templateBox").val());
	});

	$("#templateRefresh").click(function() {
		getReportData($("#templateBox").val());
	});


	tableHistoryThree.on( 'changeFocus', function( event, object )  {
		var response = tableHistoryThree.get("response");
		for (var i =0; i<response.length; i++)
		{
			if (response[i]["date"] == object)
				{
					tableHistoryThree.set("current.rows", response[i]["summary"]);
				}
		}
	});

	/*
	$("#filterBox").change(function() {
		tableHistoryThree.set("currentFilter",$("#filterBox").val());
	});
	*/

    return tableHistoryThree;

});
