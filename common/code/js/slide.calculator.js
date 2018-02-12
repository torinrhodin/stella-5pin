document.addEventListener('presentationInit', function() {
	var slide = app.slide.calculator = {
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
				app.addEvent('keyup', slide._calculate, calcInputs[i]);
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
			var calcInputs = slide.element.calcInputs;

			var scanners = calcInputs[0].value;
			var scansPerHour = calcInputs[1].value;
			var hoursPerDay = calcInputs[2].value;
			var hoursPerWeek = calcInputs[3].value;

			var contrastEnhanced = 0.51;
			var powerAsissted = 0.97;

			var hourDisplay = document.getElementById('one-hour');
			var hourValue = scanners*scansPerHour*contrastEnhanced*powerAsissted*hoursPerDay;

			if( hourValue === NaN ) { hourValue = 0; }
			hourDisplay.setAttribute('value',hourValue);
		},
	};
});