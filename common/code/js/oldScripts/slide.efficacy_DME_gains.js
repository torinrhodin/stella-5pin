document.addEventListener('presentationInit', function() {
	var slide = app.slide.efficacy_DME_gains = {
		elements: {
      tabFirst: "li.first",
      tabLast: "li.last",
      studyDesignLink: ".reveal-study-design",
      popupText: "#popup-text"
		},
		onEnter: function(ele) {
			console.log('enter ' + app.slideshow.current);

			var tabFirst = slide.element.tabFirst;
      app.addEvent('click', slide._tabFirstClick, tabFirst);

			var tabLast = slide.element.tabLast;
      app.addEvent('click', slide._tabLastClick, tabLast);

			var studyDesignLink = slide.element.studyDesignLink;
      app.addEvent('click', slide._studyDesignClick, studyDesignLink);

		},
		onExit: function(ele) {
			console.log('exit');
		},
    _tabFirstClick: function(event) {
      if (this.id != "dme-gains-active") {
        document.getElementById('dme-gains-active').id = "";
        this.id = "dme-gains-active";
  		  document.getElementById('dme-gains-first').style.display = "block";
  		  document.getElementById('dme-gains-last').style.display = "none";
		  }
    },
    _tabLastClick: function(event) {
      if (this.id != "dme-gains-active") {
        document.getElementById('dme-gains-active').id = "";
        this.id = "dme-gains-active";
  		  document.getElementById('dme-gains-first').style.display = "none";
  		  document.getElementById('dme-gains-last').style.display = "block";
  		}
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