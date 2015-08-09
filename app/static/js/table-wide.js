// Now we've configured RequireJS, we can load our dependencies and start
define([ 'ractive', 'rv!../ractive/table-wide-data', 'rv!../ractive/loading-widget', 'jquery'], function ( Ractive, html, load, $) {

	Ractive.partials.loadingWidget = load;

    var tableWideData = new Ractive({
      el: 'tableWideData',
      data: {
      		data1 : {
		      	title: "Template 3",
		      	subtitle: "A very wide table",
		      	headers: ['StoreID','StoreName','Started.On','Active.Days.Perc','Median.Bills','Days.Since.Last.Usage','StoreHealth','Classification','0','T-1','T-2','T-3','T-4','T-5','T-6','T-7','T-8','T-9','T-10','T-11','T-12','T-13','T-14','T-15','T-16','T-17','T-18','T-19','T-20','T-21','T-22','T-23','T-24','T-25','T-26','T-27','T-28','T-29','T-30'],
		      	rows: [
		      		{"StoreID":139,"StoreName":"murugan provision store","Started.On":"1/10/2014","Active.Days.Perc":0,"Median.Bills":0,"Days.Since.Last.Usage":146,"StoreHealth":-3.63E+11,"Classification":"DEAD","0":1,"T-1":null,"T-2":null,"T-3":null,"T-4":null,"T-5":null,"T-6":null,"T-7":null,"T-8":null,"T-9":null,"T-10":null,"T-11":null,"T-12":null,"T-13":null,"T-14":null,"T-15":null,"T-16":null,"T-17":null,"T-18":null,"T-19":null,"T-20":null,"T-21":null,"T-22":null,"T-23":null,"T-24":null,"T-25":null,"T-26":null,"T-27":null,"T-28":null,"T-29":null,"T-30":null},
					{"StoreID":133,"StoreName":"swastik dry fruit","Started.On":"1/10/2014","Active.Days.Perc":0,"Median.Bills":0,"Days.Since.Last.Usage":48,"StoreHealth":-6319.7,"Classification":"DEAD","0":null,"T-1":null,"T-2":null,"T-3":null,"T-4":null,"T-5":null,"T-6":null,"T-7":null,"T-8":null,"T-9":null,"T-10":null,"T-11":null,"T-12":null,"T-13":null,"T-14":null,"T-15":null,"T-16":null,"T-17":null,"T-18":null,"T-19":null,"T-20":null,"T-21":null,"T-22":null,"T-23":null,"T-24":null,"T-25":null,"T-26":null,"T-27":null,"T-28":null,"T-29":null,"T-30":null},
					{"StoreID":77,"StoreName":"sri kumaran store","Started.On":"1/10/2014","Active.Days.Perc":93,"Median.Bills":117,"Days.Since.Last.Usage":2,"StoreHealth":12.1,"Classification":"DEAD","0":null,"T-1":null,"T-2":null,"T-3":null,"T-4":null,"T-5":null,"T-6":null,"T-7":null,"T-8":null,"T-9":null,"T-10":null,"T-11":null,"T-12":null,"T-13":null,"T-14":null,"T-15":null,"T-16":null,"T-17":null,"T-18":null,"T-19":null,"T-20":null,"T-21":null,"T-22":null,"T-23":null,"T-24":null,"T-25":null,"T-26":null,"T-27":null,"T-28":null,"T-29":null,"T-30":null},
					{"StoreID":75,"StoreName":"saravana stores","Started.On":"1/10/2014","Active.Days.Perc":90,"Median.Bills":52,"Days.Since.Last.Usage":1,"StoreHealth":8.2,"Classification":"DEAD","0":null,"T-1":null,"T-2":null,"T-3":null,"T-4":null,"T-5":null,"T-6":null,"T-7":null,"T-8":null,"T-9":null,"T-10":null,"T-11":null,"T-12":null,"T-13":null,"T-14":null,"T-15":null,"T-16":null,"T-17":null,"T-18":null,"T-19":null,"T-20":null,"T-21":null,"T-22":null,"T-23":null,"T-24":null,"T-25":null,"T-26":null,"T-27":null,"T-28":null,"T-29":null,"T-30":null}
				]
      		}, 
      		data2 : {
		      	title: "Template 3",
		      	subtitle: "A very wide table",
		      	headers: ['StoreID','StoreName','Started.On','Active.Days.Perc','Median.Bills','Days.Since.Last.Usage','StoreHealth','Classification','0','T-1','T-2','T-3','T-4','T-5','T-6','T-7','T-8','T-9','T-10','T-11','T-12','T-13','T-14','T-15','T-16','T-17','T-18','T-19','T-20','T-21','T-22','T-23','T-24','T-25','T-26','T-27','T-28','T-29','T-30'],
		      	rows: [
		      		{"StoreID":139,"StoreName":"murugan provision store","Started.On":"1/10/2014","Active.Days.Perc":0,"Median.Bills":0,"Days.Since.Last.Usage":146,"StoreHealth":-3.63E+11,"Classification":"DEAD","0":1,"T-1":null,"T-2":null,"T-3":null,"T-4":null,"T-5":null,"T-6":null,"T-7":null,"T-8":null,"T-9":null,"T-10":null,"T-11":null,"T-12":null,"T-13":null,"T-14":null,"T-15":null,"T-16":null,"T-17":null,"T-18":null,"T-19":null,"T-20":null,"T-21":null,"T-22":null,"T-23":null,"T-24":null,"T-25":null,"T-26":null,"T-27":null,"T-28":null,"T-29":null,"T-30":null},
					{"StoreID":133,"StoreName":"swastik dry fruit","Started.On":"1/10/2014","Active.Days.Perc":0,"Median.Bills":0,"Days.Since.Last.Usage":48,"StoreHealth":-6319.7,"Classification":"DEAD","0":null,"T-1":null,"T-2":null,"T-3":null,"T-4":null,"T-5":null,"T-6":null,"T-7":null,"T-8":null,"T-9":null,"T-10":null,"T-11":null,"T-12":null,"T-13":null,"T-14":null,"T-15":null,"T-16":null,"T-17":null,"T-18":null,"T-19":null,"T-20":null,"T-21":null,"T-22":null,"T-23":null,"T-24":null,"T-25":null,"T-26":null,"T-27":null,"T-28":null,"T-29":null,"T-30":null},
					{"StoreID":77,"StoreName":"sri kumaran store","Started.On":"1/10/2014","Active.Days.Perc":93,"Median.Bills":117,"Days.Since.Last.Usage":2,"StoreHealth":12.1,"Classification":"DEAD","0":null,"T-1":null,"T-2":null,"T-3":null,"T-4":null,"T-5":null,"T-6":null,"T-7":null,"T-8":null,"T-9":null,"T-10":null,"T-11":null,"T-12":null,"T-13":null,"T-14":null,"T-15":null,"T-16":null,"T-17":null,"T-18":null,"T-19":null,"T-20":null,"T-21":null,"T-22":null,"T-23":null,"T-24":null,"T-25":null,"T-26":null,"T-27":null,"T-28":null,"T-29":null,"T-30":null},
					{"StoreID":75,"StoreName":"saravana stores","Started.On":"1/10/2014","Active.Days.Perc":90,"Median.Bills":52,"Days.Since.Last.Usage":1,"StoreHealth":8.2,"Classification":"DEAD","0":null,"T-1":null,"T-2":null,"T-3":null,"T-4":null,"T-5":null,"T-6":null,"T-7":null,"T-8":null,"T-9":null,"T-10":null,"T-11":null,"T-12":null,"T-13":null,"T-14":null,"T-15":null,"T-16":null,"T-17":null,"T-18":null,"T-19":null,"T-20":null,"T-21":null,"T-22":null,"T-23":null,"T-24":null,"T-25":null,"T-26":null,"T-27":null,"T-28":null,"T-29":null,"T-30":null}
				]
      		}
      },
    template: html
    });

	//tableHistoryThree.set("current.rows", tableHistoryThree.get("response[0].summary"))

    return tableWideData;

});

