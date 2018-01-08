document.addEventListener('presentationInit', function() {
	var slide = app.slide.efficacy_wAMD_acuity = {
		elements: {
  		studyDesignLink: ".reveal-study-design",
  		popupText: "#popup-text",
      jumpRw: "#jump-to-rw"
		},
		onEnter: function(ele) {
			console.log('enter ' + app.slideshow.current);

			var studyDesignLink = slide.element.studyDesignLink;
      app.addEvent('click', slide._studyDesignClick, studyDesignLink);

			var jumpRw = slide.element.jumpRw;
      app.addEvent('click', slide._jumpRwClick, jumpRw);

		},
		onExit: function(ele) {
			console.log('exit');
		},
		_studyDesignClick: function(event) {
			var popupText = slide.element.popupText.innerHTML;
			var studyDesign = app.elements['study-design'];
			var studyDesignBG = app.elements['study-design-background'];
  		
  		// Open Study Design
		  studyDesign.children[1].innerHTML = popupText;
		  studyDesign.style.display = "block";
      studyDesignBG.style.display = "block";

		  app.nav.disableSwipe();

		  // Close Study Design
		  // Event attached in setup.js
		},
    _jumpRwClick: function(event) {
        app.goTo("eylea_app",'real_world_navigation', 'navigation_real_world');   		
    },

	};
});