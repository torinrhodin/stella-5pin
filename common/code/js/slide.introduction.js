document.addEventListener('presentationInit', function() {
	var slide = app.slide.introduction = {
		elements: {
		},
		onEnter: function(ele) {			
			console.log('enter introduction');

			// Hide footer logo
			app.elements.medradLogo.className = "hide";
			app.elements.smartpackLogo.className = "hide";

			// Enable white Bayer Logo
			app.elements.menu.classList.add('white');

			// Enable white menu burger
			app.elements.flyoutMenu.classList.add('white');
			
			// Attach Swipe Event
			document.addEventListener('swipeleft', this._swipeNext);

		},
		onExit: function(ele) {
			console.log('exit');

			// Show footer logo
			app.elements.medradLogo.className = "show";
			app.elements.smartpackLogo.className = "show";

			// Enable color Bayer Logo
			app.elements.menu.classList.remove('white');

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