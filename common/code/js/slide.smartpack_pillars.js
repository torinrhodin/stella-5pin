document.addEventListener('presentationInit', function() {
	var slide = app.slide.smartpack_pillars = {
		elements: {
			slideLinks: ["ul .link-slide", "all"],
			studyDesignLink: ".reveal-study-design",
			popupText: "#popup-text"
		},
		onEnter: function(ele) {
			console.log('enter');

			// Enable color Bayer Logo
			app.elements.menu.classList.add('color-logo');

			// Attach Swipe Events
			document.addEventListener('swiperight', this._swipePrev);
			document.addEventListener('swipeleft', this._swipeNext);

			// Define array of Slide Links
			var slideLinks = slide.element.slideLinks;
			
			// Bulk add events for Slide Links
			for (i = 0; i < slideLinks.length; i++) {
				app.addEvent('click', slide.slideClick, slideLinks[i]);
			}
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
			app.slideshow.previous();
		},
		_swipeNext: function() {
			app.slideshow.next();
		},
		slideClick: function(event) {
			console.log('clicked');
			var appID = app.loaded.id;
			var slideshowName = this.getAttribute('data-slideshow');
			var slideName = this.getAttribute('data-slide');
	  	console.log("slide: " + slideName + " slideshow: " + slideshowName);

			app.goTo(appID, slideshowName, slideName);
		},
		_studyDesignClick: function(event) {
			var popupText = slide.element.popupText.innerHTML;
			var studyDesign = app.elements['study-design'];
			var studyDesignBG = app.elements['study-design-background'];
  		
  		// Open Study Design
		  studyDesign.children[1].innerHTML = popupText;
		  studyDesign.style.display = "block";
      studyDesignBG.style.display = "block";

		  app.nav.disableSwipe();

		  // Close Study Design
		  // Event attached in setup.js
		}
	};
}); 
