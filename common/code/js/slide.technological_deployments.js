document.addEventListener('presentationInit', function() {
	var slide = app.slide.technological_deployments = {
		elements: {
			slideLinks: ["#deployments-nav .deployment-link", "all"],
		},
		onEnter: function(ele) {
			console.log('enter ' + app.slideshow.current);

			// Attach Swipe Events
			document.addEventListener('swiperight', this._swipePrev);
			document.addEventListener('swipeleft', this._swipeNext);

			// Define array of Slide Links
			var slideLinks = slide.element.slideLinks;
			
			// Bulk add events for Slide Links
			for (i = 0; i < slideLinks.length; i++) {
				app.addEvent('click', slide._slideClick, slideLinks[i]);
			}
		},
		onExit: function(ele) {
			console.log('exit');

			// Remove Swipe Event
			document.removeEventListener('swiperight', this._swipePrev);
			document.removeEventListener('swipeleft', this._swipeNext);
		},
		_swipePrev: function() {
			app.slideshow.previous();
		},
		_swipeNext: function() {
			app.slideshow.next();
		},
		_slideClick: function(event) {
			console.log('clicked');

			var appID = app.loaded.id;
			var slideshowName = this.getAttribute('data-slideshow');
			var slideName = this.getAttribute('data-slide');
	  	console.log("slide: " + slideName + " slideshow: " + slideshowName);

			app.goTo(appID, slideshowName, slideName);
		},
	};
});