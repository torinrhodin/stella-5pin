document.addEventListener('presentationInit', function() {
	var slide = app.slide.smartpack = {
		elements: {
			trialLink: "#free-trial",
		},
		onEnter: function(ele) {
			console.log('enter ' + app.slideshow.current);

			// Attach Swipe Events
			document.addEventListener('swiperight', this._swipePrev);
			document.addEventListener('swipeleft', this._swipeNext);

			// Add link
			app.addEvent('click', slide._goToTrial, slide.element.trialLink);
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
		_goToTrial: function(argument) {
			app.goTo('stellant_app', 'resources_slide', 'resources');
		},
	};
});