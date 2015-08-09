// Now we've configured RequireJS, we can load our dependencies and start
define([ 'ractive', 'rv!../ractive/table-history-three', 'rv!../ractive/loading-widget',  'jquery', 'Chart'], function ( Ractive, html, load, $, Chart) {

	Ractive.partials.loadingWidget = load;

    var tableHistoryThree = new Ractive({
      el: 'tableHistoryThree',
      data: {
      	response: {},
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
	      						{"state":"Healthy","direction":"increased","percentage":23},
	      						{"state":"OK","direction":"increased","percentage":51},
	      						{"state":"ICU","direction":"decreased","percentage":7},
	      						{"state":"Dead","direction":"increased","percentage":55}
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
			},

      	sort: function ( array, column ) {
    			array = array.slice(); // clone, so we don't modify the underlying data
				
    			return array.sort( function ( a, b ) {
    				return a[ column ] < b[ column ] ? -1 : 1;
    			});
			}
      },
    	sortColumn: 'date',
    	sortColumnTwo: 'city',
    template: html
    });
	
	function buildChart(dataObj, chartID) {
		var ctx = $(chartID).get(0).getContext("2d");
		var labelArray = [];
		var groupArray = [];
		var dataArray = [];
		var dataObjArray = dataObj.rows;

		for (dataObj in dataObjArray) {
			var foundMatch = false;
			for (group in groupArray) {
				if (groupArray[group]==dataObjArray[dataObj].group) {
					foundMatch = true;
				}
			}
			if (!foundMatch) {
				groupArray.push(dataObjArray[dataObj].group)
			}
		}

		for (dataObj in dataObjArray) {
			labelArray.push(dataObjArray[dataObj].label);
			dataArray.push(dataObjArray[dataObj].value);
		}

		var dataSetArray = [];
		for (groupVal in groupArray) {
			var tmpObj = {};
			tmpObj.data = [];
			tmpObj.label = groupArray[groupVal];
			tmpObj.fillColor = "rgba(151,187,205,0.2)";
			tmpObj.strokeColor = "rgba(151,187,205,1)";
			tmpObj.pointColor = "rgba(151,187,205,1)";
			tmpObj.pointStrokeColor = "#fff";
			tmpObj.pointHighlightFill = "#fff";
			tmpObj.pointHighlightStroke = "rgba(151,187,205,1)";
			for (dataObj in dataObjArray) {
				if (groupArray[groupVal]==dataObjArray[dataObj].group) {
					tmpObj.data.push(dataObjArray[dataObj].value);
				}
			}
			dataSetArray.push(tmpObj);
		}

		var dataChart = {
	    	labels: labelArray,
	    	datasets: dataSetArray/*[
			        {
			            label: tableHistoryThree.get(dataObj+".title"),
			            fillColor: "rgba(151,187,205,0.2)",
			            strokeColor: "rgba(151,187,205,1)",
			            pointColor: "rgba(151,187,205,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
			            data: dataArray//[65, 59, 80, 81, 56, 55, 40]
			        },
			        {
			            label: "My Second dataset",
			            fillColor: "rgba(151,187,205,0.2)",
			            strokeColor: "rgba(151,187,205,1)",
			            pointColor: "rgba(151,187,205,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
			            data: [28, 48, 40, 19, 86, 27, 90]
			        }
	    		]*/
		};
		var myLineChart = new Chart(ctx).Line(dataChart);
	}


	tableHistoryThree.on( 'sort', function ( event, column ) {
	  //alert(column);
	  //sortColumn=column;
	  this.set( 'sortColumn', column );
	});

	tableHistoryThree.on( 'sort2', function ( event, column ) {
	  //alert(column);
	  //sortColumn=column;
	  this.set( 'sortColumnTwo', column );

		this.animate( 'sortColumnTwo', column, {
		  easing: 'easeOut'
		});
	});

	//tableHistoryThree.set("current.rows", tableHistoryThree.get("response[0].summary"))
	$.ajax({
	  type: "POST",
	  url: "./api/v1.0/getData",
	  contentType : 'application/json',
	  dataType: "json",
	  data: JSON.stringify({"template": "Summary", "rows": 1}),
	  success: function(json) {
	  	tableHistoryThree.set("response", json["response"][0]);
	  	//console.log(JSON.stringify(tableHistoryThree.get("response")));
	  	//tableHistoryThree.set("current.rows", tableHistoryThree.get("response[0].summary"))
	  	for (var i =0; i<json["response"].length; i++)
	  	{
	  		//tableHistoryThree.set("aggregate.columns."+json["response"][i]["date"], json["response"][i]["aggregate"]);
	  	}
	  	hideAnimation("loading-screen");
		buildChart(tableHistoryThree.get("response[1]"),'#myChart');
		buildChart(tableHistoryThree.get("response[2]"),'#numberStoresBreakdown');
		//buildChart('response[1]','#myChart');
	  }
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


	function hideAnimation(initialID){ 

		$("#load-one").fadeOut("slow");
		$("#full-any-logo").delay( 100 ).fadeIn("fast");
		$("#full-any-logo").delay( 100 ).addClass("animated flipInX");
		$("#loading-screen").delay( 1400 ).slideUp( 500 );
	}

    return tableHistoryThree;

});
