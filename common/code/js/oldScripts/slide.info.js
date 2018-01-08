document.addEventListener('presentationInit', function() {
	var slide = app.slide.info = {
		elements: {
		},
		onEnter: function(ele) {
			console.log('enter');

			// Attach Swipe Events
			document.addEventListener('swiperight', this._swipePrev);
			document.addEventListener('swipeleft', this._swipeNext);
		},
		onExit: function(ele) {
			console.log('exit');
			
			// Remove Swipe Event
			document.removeEventListener('swiperight', this._swipePrev);
			document.removeEventListener('swipeleft', this._swipeNext);
		},
		_swipePrev: function() {
			app.collection.previous()
		},
		_swipeNext: function() {
			app.collection.next();
		}
	};  
}); 
