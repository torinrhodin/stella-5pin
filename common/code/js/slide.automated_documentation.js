document.addEventListener('presentationInit', function() {
	var slide = app.slide.automated_documentation = {
		elements: {
			popupLink: "#automated-documention-pop-link",
			popupText: "#popup-text"
		},
		onEnter: function(ele) {
			console.log('enter ' + app.slideshow.current);

			// Attach Swipe Events
			document.addEventListener('swiperight', this._swipePrev);
			document.addEventListener('swipeleft', this._swipeNext);

			// Add popup click
			app.addEvent('click', slide._launchPopup, slide.element.popupLink);
		},
		onExit: function(ele) {
			console.log('exit');

			// Remove Swipe Event
			document.removeEventListener('swiperight', this._swipePrev);
			document.removeEventListener('swipeleft', this._swipeNext);
		},
		_swipePrev: function() {
			if( app.popup.initialized === false ) {
				app.slideshow.previous();	
			}
		},
		_swipeNext: function() {
			if( app.popup.initialized === false ) {
				app.slideshow.next();
			}			
		},
		_launchPopup: function(event) {
			var popupText = slide.element.popupText.innerHTML;
      app.popup._init(popupText, true);
		}
	};
});