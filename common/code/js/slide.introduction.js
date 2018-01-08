document.addEventListener('presentationInit', function() {
	var slide = app.slide.introduction = {
		elements: {
		},
		onEnter: function(ele) {			
			console.log('enter');
			
			// Hide footer logo
			app.elements.medradLogo.className = "hide";
			app.elements.smartpackLogo.className = "hide";

			// Attach Swipe Event
			document.addEventListener('swipeleft', this._swipeNext);
			app.elements.menu.classList.remove('color-logo');

		},
		onExit: function(ele) {
			console.log('exit');

			// Show footer logo
			app.elements.medradLogo.className = "show";
			app.elements.smartpackLogo.className = "show";
			// Remove Swipe Event
			document.removeEventListener('swipeleft', this._swipeNext);
		},
		_swipeNext: function() {
			app.collection.next();
		},
	};  
}); 
