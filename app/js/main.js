// Carousel
/*var carousel = $('.myCarousel').carousel({
   "pagination" : true,
   "limitPerPage" : 3
});*/
function qS(selector) { return document.querySelector(selector); };
var carousel = new ch.Carousel(qS('.myCarousel'), 
	{
		"limitPerPage" : 3,
		"pagination" : true
});