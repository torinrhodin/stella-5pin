document.addEventListener('presentationInit', function() {
	var slide = app.slide.scanner_connectivity_detail = {
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