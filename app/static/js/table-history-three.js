// Now we've configured RequireJS, we can load our dependencies and start
define([ 'ractive', 'rv!../ractive/table-history-three'], function ( Ractive, html) {

    var tableHistoryThree = new Ractive({
      el: 'tableHistoryThree',
      data: {
      	aggregate: 
	      	{
	      		columns: 
			      	[
			      		{
			      			label:""
			      		},
			      		{
			      			label:"07/25/2015",
			      		},
			      		{
			      			label:"07/10/2015",
			      		},
			      		{
			      			label:"06/26/2015",
			      		}
			      	],
			   	rows: 
			   		[
			   			{label:"Dead", 			data: 	[2, 3, 8]		},
			   			{label:"Dying in ICU",	data: 	[5, 2, 12]		},
			   			{label:"OK",			data: 	[0, 15, 20]		},
			   			{label:"Healthy",		data: 	[33, 12, 13]	},
			   		]
			},
		current: 
			{
				currentDate: "07/25/2015",
				columns:
					[
						{
							label:"City"
						},
						{
							label:"No Stores"
						},
						{
							label:"Dead"
						},
						{
							label:"Dying in ICU"
						},
						{
							label:"OK"
						},
						{
							label:"Healthy"
						},
					],
				rows:
					[
							{label: "New Stores",	data: [69, 3, 24, 12, 3]	},
							{label: "Bangalore",	data: [19, 2, 4, 4, 1]	},
							{label: "Chennai",		data: [50, 15, 3, 1, 2]	},
							{label: "Delhi",		data: [54, 20, 2, 4, 4]	},
							{label: "Hyderabad",	data: [32, 13, 3, 41, 5]	},
							{label: "Mumbai",		data: [92, 12, 8, 33, 3]	},
							{label: "Pune",			data: [92, 16, 9, 49, 0]	},
							{label: "Telangana",	data: [5, 2, 0, 38, 1]	},
					]
			}
      },
    template: html
    });

    return tableHistoryThree;

});
