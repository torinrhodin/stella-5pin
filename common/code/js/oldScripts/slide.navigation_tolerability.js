document.addEventListener('presentationInit', function() {
	var slide = app.slide.navigation_tolerability = {
		elements: {
			slideLinks: ["ul .link-slide", "all"],
		},
		onEnter: function(ele) {
			console.log('enter');

			// Attach Swipe Events
			document.addEventListener('swiperight', this._swipePrev);
			document.addEventListener('swipeleft', this._swipeNext);
			
			// Define array of Slide Links
			var slideLinks = slide.element.slideLinks;
			
			// Bulk add events for Slide Links
			for (i = 0; i < slideLinks.length; i++) {
				app.addEvent('click', slide.slideClick, slideLinks[i]);
			}

			// Enable color Bayer Logo
			app.elements.menu.classList.add('color-logo');
		},
		onExit: function(ele) {
			console.log('exit');

			// Disable color Bayer Logo
			app.elements.menu.classList.remove('color-logo');
			
			// Remove Swipe Event
			document.removeEventListener('swiperight', this._swipePrev);
			document.removeEventListener('swipeleft', this._swipeNext);
		},
		_swipePrev: function() {
			app.collection.previous()
		},
		_swipeNext: function() {
			app.collection.next();
		},
		slideClick: function(event) {
			console.log('clicked');
			var appID = app.loaded.id;
			var slideshowName = this.getAttribute('data-slideshow');
			var slideName = this.getAttribute('data-slide');
	  	console.log("slide: " + slideName + " slideshow: " + slideshowName);

			app.goTo(appID, slideshowName, slideName);
		},
	};  
}); 
