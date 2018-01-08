document.addEventListener('presentationInit', function() {
	var slide = app.slide.MOA_affinity = {
		elements: {
			affinityLink: ".affinity-link",
  		vegfLink: ".vegf-a-link"
		},
		onEnter: function(ele) {
			console.log('enter ' + app.slideshow.current);

			// Attach Swipe Events
			document.addEventListener('swiperight', this._swipePrev);
			document.addEventListener('swipeleft', this._swipeNext);

			// Show Affinity
      app.addEvent('click', slide._showAffinity, slide.element.affinityLink);

			// Show VEGF
      app.addEvent('click', slide._showVEGF, slide.element.vegfLink);

      console.log(slide.element.affinityLink);
      console.log(slide.element.vegfLink);

			// Hide Bayer Logo
			app.elements.menu.classList.add('hide');
		},
		onExit: function(ele) {
			console.log('exit');

			// Show Bayer Logo
			app.elements.menu.classList.remove('hide');
			
			// Remove Swipe Event
			document.removeEventListener('swiperight', this._swipePrev);
			document.removeEventListener('swipeleft', this._swipeNext);
		},
		_swipePrev: function() {
			app.collection.previous()
		},
		_swipeNext: function() {
			app.collection.next();
		},
		_showAffinity: function(event) {
			console.log('show affinity');
			slide.ele.classList.remove('VEGF');
			slide.ele.classList.add('affinity');
		},
		_showVEGF: function(event) {
			console.log('show VEGF');
			slide.ele.classList.remove('affinity');
			slide.ele.classList.add('VEGF');
		}
	};
});