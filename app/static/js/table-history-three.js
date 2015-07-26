// Now we've configured RequireJS, we can load our dependencies and start
define([ 'ractive', 'rv!../ractive/table-history-three', 'jquery'], function ( Ractive, html, jq) {

    var tableHistoryThree = new Ractive({
      el: 'tableHistoryThree',
      data: {
      	response: [ ],
      	aggregate: 
	      	{
	      		title: "Historical Summary",
	      		subheading: "Aggregate Store Performance",
	      		rows: ["Dead", "Dying in ICU", "OK", "Healthy"],
	      		columns: {}
	      		/*columns: {
	      			"07/25/2015": [2, 5, 0, 33],
	      			"07/10/2015": [1, 3, 5, 9]
	      		}*/
			},
		current: 
			{
				title: "Detailed Summary",
				subheading: "Data for 07/25/2015",
				columns:
					[ "City", "No Stores", "Dead", "Dying in ICU", "OK", "Healthy" ],
				rows: {}
				/*rows:
					{
		      			"New Stores": [69, 3, 24, 12, 3],
		      			"Bangalore":  [19, 2, 4, 4, 1],
						"Chennai": 	[50, 15, 3, 1, 2],
						"Delhi": 	[54, 20, 2, 4, 4],
						"Hyderabad": [32, 13, 3, 41, 5],
						"Mumbai": 	[92, 12, 8, 33, 3],
						"Pune": 		[92, 16, 9, 49, 0],
						"Telangana": [5, 2, 0, 38, 1]
	      			}*/
			}
      },
    template: html
    });

	//tableHistoryThree.set("current.rows", tableHistoryThree.get("response[0].summary"))
	$.ajax({
	  type: "POST",
	  url: "./api/v1.0/getData",
	  contentType : 'application/json',
	  dataType: "json",
	  data: JSON.stringify({"template": "Summary", "rows": 3}),
	  success: function(json) {
	  	tableHistoryThree.set("response", json["response"]);
	  	tableHistoryThree.set("current.rows", tableHistoryThree.get("response[0].summary"))
	  	for (var i =0; i<json["response"].length; i++)
	  	{
	  		tableHistoryThree.set("aggregate.columns."+json["response"][i]["date"], json["response"][i]["aggregate"]);
	  	}
	  }
	});

    return tableHistoryThree;

});
