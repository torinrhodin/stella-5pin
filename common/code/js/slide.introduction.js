document.addEventListener('presentationInit', function() {
	var slide = app.slide.introduction = {
		elements: {
		},
		onEnter: function(ele) {			
			console.log('enter introduction');

			// Set Footer styles
			app.elements.footerMenu.classList.add('home');

			// Enable white logos
			app.elements.menu.classList.add('white');

			// Enable white menu burger
			app.elements.flyoutMenu.classList.add('white');
			
			// Attach Swipe Event
			document.addEventListener('swipeleft', this._swipeNext);

		},
		onExit: function(ele) {
			console.log('exit');

			// Set Footer styles
			app.elements.footerMenu.classList.remove('home');

			// Enable color logos
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