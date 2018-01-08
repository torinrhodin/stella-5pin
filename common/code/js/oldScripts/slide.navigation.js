document.addEventListener('presentationInit', function() {
	var slide = app.slide.navigation = {
		elements: {
			slideLinks: ["ul .link-slide", "all"],
			parentLinks: ["ul .link-parent", "all"],
			childLinks: ["ul .link-child", "all"]
		},
		onEnter: function(ele) {
			console.log('enter');

			// Attach Swipe Events
			document.addEventListener('swiperight', this._swipePrev);
			document.addEventListener('swipeleft', this._swipeNext);

			// Define array of Slide Links
			var slideLinks = slide.element.slideLinks;
			
			// Bulk add events for Slide Links
			for (i = 0; i < slideLinks.length; i++) {
				app.addEvent('click', slide._slideClick, slideLinks[i]);
			}

			// Define array of Parent Links
			var parentLinks = slide.element.parentLinks;

			// Bulk add events for Parent Links
			for (i = 0; i < parentLinks.length; i++) {
				app.addEvent('click', slide._parentClick, parentLinks[i]);
			}

			// Define array of Child Links
			var childLinks = slide.element.childLinks;

			// Bulk add events for Parent Links
			for (i = 0; i < childLinks.length; i++) {
				app.addEvent('click', slide._childClick, childLinks[i]);
			}
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
		},
		_removeClass: function(className) {
			var activeEls = document.getElementsByClassName(className);

			// Bulk add events for Parent Links
			for (i = 0; i < activeEls.length; i++) {
				activeEls[i].classList.remove(className);
			}
		},
		_childClick: function(event) {
			var childSubMenuID = this.getAttribute('data-menu');
			var childSubMenu = document.getElementById(childSubMenuID);
			var childSubMenuClasses = childSubMenu.classList;
			var activeClass = 'active-child';

			if( childSubMenuClasses.contains(activeClass) === false ) {
				slide._removeClass(activeClass);
				childSubMenu.classList.add(activeClass);

				// Remove old/add new menu class from slide
				// Reset current menu variable
				slide.ele.classList.remove(slide.currentChildSubMenu);
				slide.ele.classList.add(childSubMenuID);
				slide.currentChildSubMenu = childSubMenuID;

			} else {
				// Remove class from slide container
				slide.ele.classList.remove(slide.currentChildSubMenu);
				
				// Reset menu style
				childSubMenu.classList.remove(activeClass);
				slide.ele.classList.remove(slide.currentMenu);
			}
		},
		_parentClick: function(event) {
			var childMenuID = this.getAttribute('data-menu');
			var childMenu = document.getElementById(childMenuID);
			var childMenuClasses = childMenu.classList;
			var activeClass = 'active';

			// Parent Link
			var appID = app.loaded.id;
			var slideshowName = this.getAttribute('data-slideshow');
			var slideName = this.getAttribute('data-slide');

			if( childMenuClasses.contains(activeClass) === false ) {
				slide._removeClass(activeClass);
				childMenu.classList.add(activeClass);

				// Remove old/add new menu class from slide
				// Reset current menu variable
				slide.ele.classList.remove(slide.currentChildMenu);
				slide.ele.classList.add(childMenuID);
				slide.currentChildMenu = childMenuID;

			} else {
				// Remove class from slide container
				slide.ele.classList.remove(slide.currentMenu);

				// Reset menu style
				childMenu.classList.remove(activeClass);
				slide.ele.classList.remove(slide.currentChildMenu);

		  	// Go to secondary Nav
				app.goTo(appID, slideshowName, slideName);
			}
		},
		_slideClick: function(event) {
			var appID = app.loaded.id;
			var slideshowName = this.getAttribute('data-slideshow');
			var slideName = this.getAttribute('data-slide');
	  	console.log("go to slide: " + slideName + " slideshow: " + slideshowName);

	  	console.log(slide.ele.classList);

	  	slide._removeClass('active');
	  	slide.ele.classList.remove(slide.currentChildMenu);
	  	slide._removeClass('active-child');
	  	slide.ele.classList.remove(slide.currentChildSubMenu);

			app.goTo(appID, slideshowName, slideName);
		},
	};  
}); 
