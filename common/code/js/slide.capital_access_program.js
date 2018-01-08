document.addEventListener('presentationInit', function() {
	var slide = app.slide.capital_access_program = {
		elements: {
		},
		onEnter: function(ele) {
			console.log('enter ' + app.slideshow.current);

		},
		onExit: function(ele) {
			console.log('exit');
		},
	};
});