document.addEventListener('presentationInit', function() {
	var slide = app.slide.technological_deployments = {
		elements: {
		},
		onEnter: function(ele) {
			console.log('enter ' + app.slideshow.current);

			// Attach Swipe Events
			document.addEventListener('swiperight', this._swipePrev);
			document.addEventListener('swipeleft', this._swipeNext);
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
	};
});