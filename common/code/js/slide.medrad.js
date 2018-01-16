document.addEventListener('presentationInit', function() {
	var slide = app.slide.medrad = {
		elements: {
			popupLink1: "#injections",
			popupText1: ".popup-injections",
			popupLink2: "#consumables",
			popupText2: ".popup-consumables"
		},
		onEnter: function(ele) {
			console.log('enter');

			// Attach Swipe Events
			document.addEventListener('swiperight', this._swipePrev);
			document.addEventListener('swipeleft', this._swipeNext);

			// Add popup click
			app.addEvent('click', slide._launchPopup1, slide.element.popupLink1);
			app.addEvent('click', slide._launchPopup2, slide.element.popupLink2);
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
		_launchPopup1: function(event) {
			var popupText = slide.element.popupText1.innerHTML;
      app.popup._init(popupText, true);
		},
		_launchPopup2: function(event) {
			var popupText = slide.element.popupText2.innerHTML;
      app.popup._init(popupText, true);
		},
	};
});