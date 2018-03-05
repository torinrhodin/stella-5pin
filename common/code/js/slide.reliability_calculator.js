document.addEventListener('presentationInit', function() {
	var slide = app.slide.reliability_calculator = {
		elements: {
			calcInputs: ["form input", "all"],
			popupLink: "#calculation-guide",
			popupText: "#popup-text",
			hourDisplay: ".one-hour",
			dayDisplay: ".one-day",
			weekDisplay: ".one-week"
		},
		onEnter: function(ele) {
			console.log('enter ' + app.slideshow.current);

			app.elements.footerMenu.classList.add('hide-easipak');

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

			app.elements.footerMenu.classList.remove('hide-easipak');

			// Reset values to zero
			slide._setValues(0, 0, 0);
			for(i = 0; i < slide.element.calcInputs.length; i++) {
				slide.element.calcInputs[i].value = '';
			}
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
		_setValues: function(hour, day, week) {
			var hourDisplay = slide.element.hourDisplay;
			var dayDisplay = slide.element.dayDisplay;
			var weekDisplay = slide.element.weekDisplay;
			
			hourDisplay.textContent = hour;
			dayDisplay.textContent = day;
			weekDisplay.textContent = week;
		},
		_calculate: function(event) {
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

			slide._setValues(hourRounded, dayRounded, weekRounded);
		},
		_launchPopup: function(event) {
      var popupClass = this.closest('article').getAttribute('id');
			var popupText = slide.element.popupText.innerHTML;
  		
  		app.popup._init(popupText);
		}
	};
});