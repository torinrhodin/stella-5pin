document.addEventListener('presentationInit', function() {
	var slide = app.slide.scanner_connectivity_intro = {
		elements: {
  		studyDesignLink: ".reveal-study-design",
  		popupText: "#popup-text"
		},
		onEnter: function(ele) {
			console.log('enter ' + app.slideshow.current);

			var studyDesignLink = slide.element.studyDesignLink;
      app.addEvent('click', slide._studyDesignClick, studyDesignLink);
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
		}
	};
});