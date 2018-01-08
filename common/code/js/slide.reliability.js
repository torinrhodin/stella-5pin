document.addEventListener('presentationInit', function() {
	var slide = app.slide.reliability = {
		elements: {
		},
		onEnter: function(ele) {
			document.addEventListener('swiperight', this._swipePrev);
			document.addEventListener('swipeleft', this._swipeNext);

			console.log('enter ' + app.slideshow.current);
			app.elements.menu.classList.add('color-logo');

		},
		onExit: function(ele) {
			console.log('exit');
		},
	};
});