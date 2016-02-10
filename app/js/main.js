function qS(selector) { return document.querySelector(selector); };
var carousel = new ch.Carousel(qS('.myCarousel'), 
	{
		"limitPerPage" : 3,
		"pagination" : true
});