/*
	Global functions used by the Anylytics Dash project
*/

function hideAnimation(initialID){ 
	$("#load-one").fadeOut("slow");
	$("#full-any-logo").delay( 100 ).fadeIn("fast");
	$("#full-any-logo").delay( 100 ).addClass("animated flipInX");
	$("#loading-screen").delay( 1400 ).slideUp( 500 );
}

function renameDataProperty(data, originalTitle, newTitle){
	if (data[originalTitle]!='') {
		data[newTitle]=data[originalTitle];
		delete data[originalTitle];
	}
    return data;
}

function buildHeaderArray(headerObjArray) {
	var headerArray = [];
	var tmpObjArray = headerObjArray;
	for (headers in tmpObjArray) {
		var tmpObjTitle = renameDataProperty(tmpObjArray[headers],'label','title');
		headerArray.push(tmpObjTitle);
	}
	return headerArray;
}

function buildRowArray(rowObjArray, headerArray) {
	var dataArray = [];
	for (rows in rowObjArray) {
		var tempDataArray = [];
		for (headers in headerArray) {
			//console.log("Row: " + JSON.stringify(rowObjArray[rows]) +" // Header Array: " + JSON.stringify(headerArray[headers]));
			tempDataArray.push(rowObjArray[rows][headerArray[headers].name]);
		}
		dataArray.push(tempDataArray);
	}
	return dataArray;
}