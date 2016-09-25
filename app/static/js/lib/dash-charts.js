/*
	Library of charting functions used in the Anylytics Dash product
*/

function dashCharts(type) {
	this.type = type;
	this.legendTemplate = "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><div class=\"legendBox\" style=\"background-color:<%=segments[i].fillColor%>\"></div><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>";
	this.themes = [{"name":"blue","baseFill":"rgba(132,160,199,0.9)","baseHighlight":"rgba(132,160,199,0.7)","fillColor":"rgba(132,160,199,0.2)","strokeColor":"#97bbcd","pointColor":"#97bbcd","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#97bbcd"},{"name":"green","baseFill":"rgba(100,231,131,0.9)","baseHighlight":"rgba(100,231,131,0.7)","fillColor":"rgba(100,231,131,0.2)","strokeColor":"#97cd9b","pointColor":"#97cd9b","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#97cd9b"},{"name":"yellow","baseFill":"rgba(231,211,100,0.9)","baseHighlight":"rgba(231,211,100,0.7)","fillColor":"rgba(231,211,100,0.2)","strokeColor":"#e7d364","pointColor":"#e7d364","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#e7d364"},{"name":"orange","baseFill":"rgba(234,175,122,0.9)","baseHighlight":"rgba(234,175,122,0.7)","fillColor":"rgba(234,175,122,0.2)","strokeColor":"#eaaf7a","pointColor":"#eaaf7a","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#eaaf7a"},{"name":"purple","baseFill":"rgba(174,122,234,0.9)","baseHighlight":"rgba(174,122,234,0.7)","fillColor":"rgba(174,122,234,0.2)","strokeColor":"#c28ed6","pointColor":"#c28ed6","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#c28ed6"},{"name":"maroon","baseFill":"rgba(181,101,101,0.9)","baseHighlight":"rgba(181,101,101,0.7)","fillColor":"rgba(181,101,101,0.2)","strokeColor":"#b56565","pointColor":"#b56565","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#b56565"},{"name":"forestgreen","baseFill":"rgba(74,154,120,0.9)","baseHighlight":"rgba(74,154,120,0.7)","fillColor":"rgba(74,154,120,0.2)","strokeColor":"#4a9a77","pointColor":"#4a9a77","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#4a9a77"},{"name":"midnightblue","baseFill":"rgba(46,79,95,0.9)","baseHighlight":"rgba(46,79,95,0.7)","fillColor":"rgba(46,79,95,0.2)","strokeColor":"#2e4f5f","pointColor":"#2e4f5f","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#2e4f5f"}];
	switch(this.type) {
	  case 'line':
			this.buildChart = buildLineChart;
      break;
	  case 'bar':
			this.buildChart = buildBarChart;
      break;
		case 'pie':
			this.buildChart = buildPieChart;
			break;
		case 'table':
			this.buildChart = buildTable;
			break;
	  default:
	    console.error("Chart type not found");
			break;
	}
}

/*		Charting Theme Definitions		*/
//var dashChartThemes = [{"name":"blue","fillColor":"rgba(132,160,199,0.2)","strokeColor":"#97bbcd","pointColor":"#97bbcd","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#97bbcd"},{"name":"green","fillColor":"rgba(100,231,131,0.2)","strokeColor":"#97cd9b","pointColor":"#97cd9b","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#97cd9b"},{"name":"yellow","fillColor":"rgba(231,211,100,0.2)","strokeColor":"#e7d364","pointColor":"#e7d364","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#e7d364"},{"name":"orange","fillColor":"rgba(234,175,122,0.2)","strokeColor":"#eaaf7a","pointColor":"#eaaf7a","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#eaaf7a"},{"name":"purple","fillColor":"rgba(174,122,234,0.2)","strokeColor":"#c28ed6","pointColor":"#c28ed6","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#c28ed6"}];
var dashChartThemes = [{"name":"blue","baseFill":"rgba(132,160,199,0.9)","baseHighlight":"rgba(132,160,199,0.7)","fillColor":"rgba(132,160,199,0.2)","strokeColor":"#97bbcd","pointColor":"#97bbcd","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#97bbcd"},{"name":"green","baseFill":"rgba(100,231,131,0.9)","baseHighlight":"rgba(100,231,131,0.7)","fillColor":"rgba(100,231,131,0.2)","strokeColor":"#97cd9b","pointColor":"#97cd9b","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#97cd9b"},{"name":"yellow","baseFill":"rgba(231,211,100,0.9)","baseHighlight":"rgba(231,211,100,0.7)","fillColor":"rgba(231,211,100,0.2)","strokeColor":"#e7d364","pointColor":"#e7d364","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#e7d364"},{"name":"orange","baseFill":"rgba(234,175,122,0.9)","baseHighlight":"rgba(234,175,122,0.7)","fillColor":"rgba(234,175,122,0.2)","strokeColor":"#eaaf7a","pointColor":"#eaaf7a","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#eaaf7a"},{"name":"purple","baseFill":"rgba(174,122,234,0.9)","baseHighlight":"rgba(174,122,234,0.7)","fillColor":"rgba(174,122,234,0.2)","strokeColor":"#c28ed6","pointColor":"#c28ed6","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#c28ed6"},{"name":"maroon","baseFill":"rgba(181,101,101,0.9)","baseHighlight":"rgba(181,101,101,0.7)","fillColor":"rgba(181,101,101,0.2)","strokeColor":"#b56565","pointColor":"#b56565","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#b56565"},{"name":"forestgreen","baseFill":"rgba(74,154,120,0.9)","baseHighlight":"rgba(74,154,120,0.7)","fillColor":"rgba(74,154,120,0.2)","strokeColor":"#4a9a77","pointColor":"#4a9a77","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#4a9a77"},{"name":"midnightblue","baseFill":"rgba(46,79,95,0.9)","baseHighlight":"rgba(46,79,95,0.7)","fillColor":"rgba(46,79,95,0.2)","strokeColor":"#2e4f5f","pointColor":"#2e4f5f","pointStrokeColor":"#ffffff","pointHighlightFill":"#ffffff","pointHighlightStroke":"#2e4f5f"}];

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
		for (dataObj in dataObjArray) {
			if (groupArray[groupVal]==dataObjArray[dataObj].group) {
				tmpObj.data.push(dataObjArray[dataObj].value);
			}
		}
		dataSetArray.push(tmpObj);
	}

	var dataChart = {
    	labels: labelArray,
    	datasets: dataSetArray,
    	responsive:true,
    	bezierCurve:false,
    	legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><div class=\"legendBox\" style=\"background-color:<%=segments[i].fillColor%>\"></div><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
    };

	var myLineChart = new Chart(ctx).Line(dataChart, {responsive:true,bezierCurve:false});
	$(chartID+'-legend').html(myLineChart.generateLegend());
}


function buildBarChart(dataObj, chartID) {

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
			for (dataObj in dataObjArray) {
				if (groupArray[groupVal]==dataObjArray[dataObj].group) {
					tmpObj.data.push(dataObjArray[dataObj].value);
				}
			}
			dataSetArray.push(tmpObj);
		}

		var dataChart = {
	    	labels: labelArray,
	    	datasets: dataSetArray,
	    	responsive:true,
	    	bezierCurve:false,
	    	legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><div class=\"legendBox\" style=\"background-color:<%=segments[i].pointColor%>\"></div><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
	    };

		var myBarChart = new Chart(ctx).Bar(dataChart, {responsive:true,bezierCurve:false});
		$(chartID+'-legend').html(myBarChart.generateLegend());
}

function buildPieChart(dataObj, chartID) {
	var pie_data = dataObj.data;

	for (var i=0; i<pie_data.length; i++) {
		var thisData = pie_data[i];
		if (!thisData.color) {
			thisData.color = dashChartThemes[i].baseFill;
			thisData.highlight = dashChartThemes[i].baseHighlight;
		}
	}

	var ctx = $(chartID).get(0).getContext("2d");
	var options = {
		responsive:true,
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%> (<%=segments[i].value%>)<%}%></li><%}%></ul>"

	}
	var myPieChart = new Chart(ctx).Pie(dataObj.data,options);
	$(chartID+'-legend').html(myPieChart.generateLegend());
}

// TODO: Fix up bar charts
function buildBarChartOld(dataObj, chartID) {
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
		for (dataObj in dataObjArray) {
			if (groupArray[groupVal]==dataObjArray[dataObj].group) {
				tmpObj.data.push(dataObjArray[dataObj].value);
			}
		}
		dataSetArray.push(tmpObj);
	}

	var dataBarChart = {
    	labels: labelArray,
    	datasets: dataSetArray,
    	responsive:true,
    	legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><div class=\"legendBox\" style=\"background-color:<%=segments[i].fillColor%>\"></div><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
    };

	var myBarChart = new Chart(ctx).Bar(dataBarChart, {responsive:true});
	$(chartID+'-legend').html(myBarChart.generateLegend());
}

// TODO: Fix up pie charts
function buildPieChartOld(dataObj, chartID) {
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
		for (dataObj in dataObjArray) {
			if (groupArray[groupVal]==dataObjArray[dataObj].group) {
				tmpObj.data.push(dataObjArray[dataObj].value);
			}
		}
		dataSetArray.push(tmpObj);
	}

	var dataPieChart = {
    	labels: labelArray,
    	datasets: dataSetArray,
    	responsive:true,
    	legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><div class=\"legendBox\" style=\"background-color:<%=segments[i].fillColor%>\"></div><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
    };

	var myPieChart = new Chart(ctx).Bar(dataPieChart, {responsive:true});
	$(chartID+'-legend').html(myPieChart.generateLegend());
}

function buildTable(dataObj) {

		var headersVar = buildHeaderArray(dataObj.headers);
		var dataVar = buildRowArray(dataObj.rows,headersVar);
		var rawData = dataObj.rows;

		$('#'+dataObj.name).DataTable({
			"columns":headersVar,
			"data":dataVar,
			"paging":false,
			"info":false,
			"fnCreatedRow": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
				var row_styling = rawData[iDisplayIndex].row_styling;
				if (row_styling) {
					for (var i = 0; i<row_styling.length; i++) {
						var thisStyle = row_styling[i];
						$('td:eq('+i+')', nRow)[0].style = null;
						if (thisStyle) {
							for (var style in thisStyle) {
								$('td:eq('+i+')', nRow)[0].style[style] = thisStyle[style];
							}
						}
					}
				}
			},
		});
}
