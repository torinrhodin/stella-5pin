document.addEventListener('presentationInit', function() {
	var slide = app.slide.medrad = {
		elements: {
			popupLink1: "#injections",
			popupText1: "#popup-text .popup-injections",
			popupLink2: "#consumables",
			popupText2: "#popup-text .popup-consumables"
		},
		onEnter: function(ele) {
			console.log('enter');
			
			// Attach Swipe Events
			document.addEventListener('swiperight', this._swipePrev);
			document.addEventListener('swipeleft', this._swipeNext);

			// Add popup click
			app.addEvent('click', slide._launchPopup1, slide.element.popupLink1);
			app.addEvent('click', slide._launchPopup2, slide.element.popupLink2);

			// Trigger click on popup
			var activePopup = app.flyoutMenu.activePopup;
			if( activePopup ) {
				var popup = document.getElementById(activePopup);
				popup.click();

				if ( slide.element.popupLink1.id === activePopup ) {
					console.log('re-connecting click event to ' + activePopup);
					app.addEvent('click', slide._launchPopup1, slide.element.popupLink1);

				} else if ( slide.element.popupLink2.id === activePopup ) {
					console.log('re-connecting click event to ' + activePopup);
					app.addEvent('click', slide._launchPopup2, slide.element.popupLink2);
				}

				// Unset active popup
				app.flyoutMenu.activePopup = null;
			}
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
		_launchPopup1: function(event) {
			console.log('show popup 1');
			var popupText = slide.element.popupText1.innerHTML;
      app.popup._init(popupText, true);
		},
		_launchPopup2: function(event) {
			console.log('show popup 2');
			var popupText = slide.element.popupText2.innerHTML;
      app.popup._init(popupText, true);
		},
	};
});