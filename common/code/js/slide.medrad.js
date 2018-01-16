document.addEventListener('presentationInit', function() {
	var popup = app.elements['popup'];
	var popupBG = app.elements['popup-background'];

	var slide = app.slide.medrad = {
		elements: {
			popupLink1: "#injections",
			popupText1: ".popup-injections",
			popupLink2: "#consumables",
			popupText2: ".popup-consumables"
		},
		onEnter: function(ele) {
			console.log('enter');

			// Attach Swipe Events
			document.addEventListener('swiperight', this._swipePrev);
			document.addEventListener('swipeleft', this._swipeNext);

			// Add popup click
			app.addEvent('click', slide._popupLinkClick, slide.element.popupLink1);
		},
		onExit: function(ele) {
			console.log('exit');

			// Remove Swipe Event
			document.removeEventListener('swiperight', this._swipePrev);
			document.removeEventListener('swipeleft', this._swipeNext);
		},

		_swipePrev: function() {
			if( popup.style.display != 'block' ) {
				app.slideshow.previous();	
			}
			
		},
		_swipeNext: function() {
			if( popup.style.display != 'block' ) {
				app.slideshow.next();
			}
			
		},
		_popupNavigate: function(event) {
			// var element = document.getElementById(event.target.id);
			console.log('nav', event);
			// console.log(element.getAttribute('data-direction'));
		},
		_popupLinkClick: function(event) {
			console.log('a click');

			var popupText = slide.element.popupText1.innerHTML;
  		
  		// Open Study Design
			var lastChild = popup.children.length - 1;
			console.log(popup.children[lastChild]);
		  popup.children[lastChild].innerHTML = popupText;
		  popup.style.display = "block";
      popupBG.style.display = "block";

		  // Close Study Design
		  // Event attached in setup.js
		}
	};
});