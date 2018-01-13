document.addEventListener('presentationInit', function() {
	var slide = app.slide.introduction = {
		elements: {
		},
		onEnter: function(ele) {			
			console.log('enter introduction');

			// Hide footer logo
			app.elements.medradLogo.className = "hide";
			app.elements.smartpackLogo.className = "hide";

			// Disable color Bayer Logo
			app.elements.menu.classList.remove('color-logo');

			// Enable white menu burger
			app.elements.flyoutMenu.classList.add('white');
			
			// Attach Swipe Event
			document.addEventListener('swipeleft', this._swipeNext);
			app.elements.menu.classList.remove('color-logo');

		},
		onExit: function(ele) {
			console.log('exit');

			// Show footer logo
			app.elements.medradLogo.className = "show";
			app.elements.smartpackLogo.className = "show";

			// Enable color Bayer Logo
			app.elements.menu.classList.add('color-logo');

			// Disable white menu burger
			app.elements.flyoutMenu.classList.remove('white');

			// Remove Swipe Event
			document.removeEventListener('swipeleft', this._swipeNext);
		},
		_swipeNext: function() {
			app.collection.next();
		},
	};  
});