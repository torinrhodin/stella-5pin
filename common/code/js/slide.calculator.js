document.addEventListener('presentationInit', function() {
	var slide = app.slide.calculator = {
		elements: {
			calcLink: ["#calc-link"],
		},
		onEnter: function(ele) {
			console.log('enter ' + app.slideshow.current);

			// Attach Swipe Events
			document.addEventListener('swiperight', this._swipePrev);
			document.addEventListener('swipeleft', this._swipeNext);

			app.addEvent('click', slide._goToCalc, slide.element.calcLink);
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
		_goToCalc: function(event) {
			app.goTo('stellant_app','smartpack_collection','reliability_calculator');
		}
	};
});