/*
	Global functions used by the Anylytics Dash project
*/

function hideAnimation(initialID){ 
	$("#load-one").fadeOut("slow");
	$("#full-any-logo").delay( 100 ).fadeIn("fast");
	$("#full-any-logo").delay( 100 ).addClass("animated flipInX");
	$("#loading-screen").delay( 1400 ).slideUp( 500 );
}