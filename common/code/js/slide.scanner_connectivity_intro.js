document.addEventListener('presentationInit', function() {
	var slide = app.slide.scanner_connectivity_intro = {
		elements: {
		},
		onEnter: function(ele) {
			console.log('enter ' + app.slideshow.current);
			document.addEventListener('swiperight', this._swipePrev);
			document.addEventListener('swipeleft', this._swipeNext);

		},
		onExit: function(ele) {
			console.log('exit');
		},
		_swipePrev: function() {
			app.slideshow.content.previous();
		},
		_swipeNext: function() {
			app.slideshow.content.next();
		},
	};
});