document.addEventListener('presentationInit', function() {
	var slide = app.slide.real_world_acuity = {
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