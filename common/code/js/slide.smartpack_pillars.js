document.addEventListener('presentationInit', function() {
	var popup = app.elements['popup'];
	var popupBG = app.elements['popup-background'];

	var slide = app.slide.smartpack_pillars = {
		elements: {
			slideLinks: ["#pillars .pillar", "all"],
			popupLink: "#info-link",
			popupText: "#popup-text"
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
				app.addEvent('click', slide._slideClick, slideLinks[i]);
			}

			// Add popup click
			app.addEvent('click', slide._popupLinkClick, slide.element.popupLink);
		},
		onExit: function(ele) {
			console.log('exit');

			// Remove Swipe Event
			document.removeEventListener('swiperight', this._swipePrev);
			document.removeEventListener('swipeleft', this._swipeNext);
		},

		_swipePrev: function() {
			if( popup.style.display != 'block' ) {
				app.slideshow.previous();	
			}
			
		},
		_swipeNext: function() {
			if( popup.style.display != 'block' ) {
				app.slideshow.next();
			}
			
		},
		_slideClick: function(event) {
			console.log('clicked');
			var appID = app.loaded.id;
			var slideshowName = this.getAttribute('data-slideshow');
			var slideName = this.getAttribute('data-slide');
	  	console.log("slide: " + slideName + " slideshow: " + slideshowName);

			app.goTo(appID, slideshowName, slideName);
		},
		_popupLinkClick: function(event) {
			console.log('a click');
      var popupClass = this.closest('article').getAttribute('id');
			var popupText = slide.element.popupText.innerHTML;
  		
  		// Open Popup
		  popup.children[1].innerHTML = popupText;
		  popup.style.display = "block";
      popupBG.style.display = "block";
      popup.classList.add(popupClass);
		  // Close Popup
		  // Event attached in setup.js
		}
	};
}); 
