document.addEventListener('presentationInit', function() {
	var slide = app.slide.scanner_connectivity_detail = {
		elements: {
			popupLink: "#reveal-scanner-detail",
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
			app.slideshow.previous();
		},
		_swipeNext: function() {
			app.slideshow.next();
		},
		_launchPopup: function(event) {
      var popupClass = this.closest('article').getAttribute('id');
			var popupText = slide.element.popupText.innerHTML;
  		
  		app.popup._init(popupText);
		}
	};
});