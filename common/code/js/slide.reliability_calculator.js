document.addEventListener('presentationInit', function() {
	var slide = app.slide.reliability_calculator = {
		elements: {
			calcInputs: ["form input", "all"],
		},
		onEnter: function(ele) {
			console.log('enter ' + app.slideshow.current);

			// Attach Swipe Events
			document.addEventListener('swiperight', this._swipePrev);
			document.addEventListener('swipeleft', this._swipeNext);

			// Define array of Calculator Inputs
			var calcInputs = slide.element.calcInputs;

			// Bulk add events for Parent Links
			for (i = 0; i < calcInputs.length; i++) {
				app.addEvent('propertychange change click keyup input paste', slide._calculate, calcInputs[i]);
			}
			console.log(calcInputs);

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
		_calculate: function(event) {
			console.log(event);
		},
	};
});