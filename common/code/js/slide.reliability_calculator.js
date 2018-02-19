document.addEventListener('presentationInit', function() {
	var slide = app.slide.reliability_calculator = {
		elements: {
			calcInputs: ["form input", "all"],
			popupLink: "#calculation-guide",
			popupText: "#popup-text"
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
		_round: function(number, precision) {
	    var factor = Math.pow(10, precision);
	    var tempNumber = number * factor;
	    var roundedTempNumber = Math.round(tempNumber);
	    return roundedTempNumber / factor;
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
			var baseValue = scanners*scansPerHour*contrastEnhanced*powerAsissted;
			
			var hourValue = baseValue === NaN ? 0 : baseValue;
			var dayValue = baseValue*hoursPerDay === NaN ? 0 : baseValue*hoursPerDay;
			var weekValue = baseValue*hoursPerWeek === NaN ? 0 : baseValue*hoursPerWeek;

			var hourRounded = slide._round(hourValue, 2);
			var dayRounded = slide._round(dayValue, 2);
			var weekRounded = slide._round(weekValue, 2);
			
			console.log('hour', hourValue, hourRounded);
			console.log('day', dayValue, dayRounded);
			console.log('week', weekValue, weekRounded);

			var hourDisplay = document.getElementById('one-hour');
			var dayDisplay = document.getElementById('one-day');
			var weekDisplay = document.getElementById('one-week');

			hourDisplay.textContent = hourRounded;
			dayDisplay.textContent = dayRounded;
			weekDisplay.textContent = weekRounded;
		},
		_launchPopup: function(event) {
      var popupClass = this.closest('article').getAttribute('id');
			var popupText = slide.element.popupText.innerHTML;
  		
  		app.popup._init(popupText);
		}
	};
});