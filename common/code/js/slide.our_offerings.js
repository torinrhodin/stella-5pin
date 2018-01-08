document.addEventListener('presentationInit', function() {
	var slide = app.slide.our_offerings = {
		elements: {
			slideLinks: ["#offering-slides .link-slide", "all"],
		},
		onEnter: function(ele) {
			document.addEventListener('swiperight', this._swipePrev);
			document.addEventListener('swipeleft', this._swipeNext);

			console.log('enter ' + app.slideshow.current);

			app.elements.menu.classList.add('color-logo');

			// Define array of Slide Links
			var slideLinks = slide.element.slideLinks;
			
			// Bulk add events for Slide Links
			for (i = 0; i < slideLinks.length; i++) {
				app.addEvent('click', slide.slideClick, slideLinks[i]);
			}

		},
		onExit: function(ele) {
			console.log('exit');
		},

		_swipePrev: function() {
			app.collection.previous()
		},
		_swipeNext: function() {
			app.collection.next();
		},
		_removeClass: function(className) {
			var activeEls = document.getElementsByClassName(className);
    },
		slideClick: function(event) {
			console.log('clicked');
			var appID = app.loaded.id;
			var slideshow = this.getAttribute('data-slideshow');
			var slide = this.getAttribute('data-slide');
	  	console.log("slide: " + slide + " slideshow: " + slideshow);

			app.goTo(appID, slideshow, slide);
		},
	};
});