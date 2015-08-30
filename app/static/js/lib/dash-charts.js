/*
	Library of charting functions used in the Anylytics Dash product
*/

function dashCharts(type) {
	this.type = type;
	if (this.type=="line") {
		this.buildChart = buildLineChart;
	}
}

/*		Charting Theme Definitions		*/
var dashChartThemes = [{"name":"blue","fillColor":"rgba(132,160,199,0.2)","strokeColor":"#97bbcd","pointColor":"#97bbcd","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#97bbcd"},{"name":"green","fillColor":"rgba(100,231,131,0.2)","strokeColor":"#97cd9b","pointColor":"#97cd9b","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#97cd9b"},{"name":"yellow","fillColor":"rgba(231,211,100,0.2)","strokeColor":"#e7d364","pointColor":"#e7d364","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#e7d364"},{"name":"orange","fillColor":"rgba(234,175,122,0.2)","strokeColor":"#eaaf7a","pointColor":"#eaaf7a","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#eaaf7a"},{"name":"purple","fillColor":"rgba(174,122,234,0.2)","strokeColor":"#c28ed6","pointColor":"#c28ed6","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#c28ed6"}];

function buildLineChart(dataObj, chartID) {
	var ctx = $(chartID).get(0).getContext("2d");
	var labelArray = [];
	var groupArray = [];
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
	}

	var uniqueNames = [];
	$.each(labelArray, function(i, el){
	    if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
	});

	labelArray=uniqueNames;

	var dataSetArray = [];
	for (groupVal in groupArray) {
		var tmpObj = {};
		tmpObj.data = [];
		tmpObj.label = groupArray[groupVal];
		//tmpObj.bezierCurve = false;
		tmpObj.fillColor 				= dashChartThemes[groupVal].fillColor;//"rgba(151,187,205,0.2)";
		tmpObj.strokeColor 				= dashChartThemes[groupVal].strokeColor;//"rgba(151,187,205,1)";
		tmpObj.pointColor 				= dashChartThemes[groupVal].pointColor;//"rgba(151,187,205,1)";
		tmpObj.pointStrokeColor 		= dashChartThemes[groupVal].pointStrokeColor;//"#fff";
		tmpObj.pointHighlightFill 		= dashChartThemes[groupVal].pointHighlightFill;//"#fff";
		tmpObj.pointHighlightStroke 	= dashChartThemes[groupVal].pointHighlightStroke;//"rgba(151,187,205,1)";
		tmpObj.legendTemplate 			= "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
		for (dataObj in dataObjArray) {
			if (groupArray[groupVal]==dataObjArray[dataObj].group) {
				tmpObj.data.push(dataObjArray[dataObj].value);
			}
		}
		dataSetArray.push(tmpObj);
	}

	var dataChart = {
    	labels: labelArray,
    	datasets: dataSetArray
	};

	var myLineChart = new Chart(ctx).Line(dataChart, {responsive:true,bezierCurve:false});
}