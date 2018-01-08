document.addEventListener('presentationInit', function() {
	var slide = app.slide.data_driven_insights = {
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