/**
 * Custom Module - Slide Nav
 * Based on the AGNITIO FRAMEWORK MODULE - Menu
 * by @author - Stefan Liden, sli@agnitio.com
 * This is a nav menu that creates custom links
 * for applicable slide collections.
 * REQUIREMENTS: touchy.js, draggy.js, util.js
 * @author - 5 Pin Design, steve@5pin.com
 */

(function () {

	var currentNav = null;

	window.Nav = function (config) {
		this.version = '1.0';
		this.requirements = 'touchy.js, draggy.js, util.js',
		this.config = config || {};
		this.containerId = this.config.container || 'slidenav';
		this.ele = app.elements.nav = document.getElementById(this.containerId);
		this.navItems = this.config.links;
		this.attachTo = this.config.attachTo || [];
		this.activeFor = this.config.activeFor || [];
		this.initialized = false;

		this.appID;
		this.parent;
		this.prevSlide;
		this.nextSlide;
		
		this._init();
	};

	Nav.prototype = {
		_init:function () {
			var self = this;
			console.log('NAVIGATION init');

			// TODO: replace with swipeScroll once built
	    this.ele.addEventListener('swipeleft', touchy.stop);
	    this.ele.addEventListener('swiperight', touchy.stop);
	    this.ele.addEventListener('swipeup', touchy.stop);
	    this.ele.addEventListener('swipedown', touchy.stop);

			// Initialize and/or insert menu when content is loaded
			document.addEventListener('contentLoad', function () {
				console.log('CONTENT LOADED');

				if (self.attachTo.indexOf(app.loaded.id) > -1 || self.attachTo.length === 0) {
					currentNav = self;

					document.addEventListener('slideEnter', self._setup);

					// Add footer link
// 					app.elements.stellantLogo.addEventListener('click', self._goHome);
				}

			});

			// If slideshow/collection specific menu, remove when content unloads
			document.addEventListener('contentUnload', function () {
				console.log('CONTENT UNLOADED');
				
				if (self.attachTo.indexOf(app.loaded.id) > -1) {
					self._remove();

					document.removeEventListener('slideEnter', self._setup);
					
					// Remove footer link
// 					app.elements.stellantLogo.removeEventListener('click', self._goHome);
				}
			});
		},

		_goHome:function() {
			app.goTo(app.loaded.id, 'main_navigation', 'navigation');
		},	

		_swipePrev:function() {
			console.log('swipe previous!');
			
			var appID = currentNav.appID;
			var parent = currentNav.parent;
			var slide = currentNav.prevSlide;

			app.goTo(appID, parent, slide);
		},

		_swipeNext:function() {
			console.log('swipe next!');
			
			var appID = currentNav.appID;
			var parent = currentNav.parent;
			var slide = currentNav.nextSlide;

			app.goTo(appID, parent, slide);
		},

		// Create the HTML of the menu
		_build:function () {
			var self = this,
				markup = '';

			var appID = app.loaded.id;
			self.appID = app.loaded.id;
			var parent = app.loaded.current;
			self.parent = app.loaded.current;

			var parentContent = app.slideshow.content;
			var slide = app.slideshow.current;
			var slideIndex = app.slideshow.currentIndex;

			self.navItems.forEach(function (item) {
				item.className = item.className || '';
				var attrs = '';
				if (typeof(item.attr) != 'undefined') {
					attrs += ' ' + item.attr.id + '="' + item.attr.value + '"';
				}

				var build = true;
				var dataGoTo;
				switch(item.className) {
					case 'prevSlide':
						
						if( slideIndex === 0 ) {
							build = false;
							self.prevSlide = undefined;

						} else {
							var prevSlideIndex = slideIndex - 1;
							self.prevSlide = parentContent[prevSlideIndex];
							dataGoTo = appID + '.' + parent + '.' + self.prevSlide;
							console.log('defining prev: ',self.prevSlide);
						}

						break;
					case 'nextSlide':
						if( slideIndex === parentContent.length - 1 ) {
							build = false;
							self.nextSlide = undefined;

						} else {
							var nextSlideIndex = slideIndex + 1;
							self.nextSlide = parentContent[nextSlideIndex];
							dataGoTo = appID + '.' + parent + '.' + self.nextSlide;
							console.log('defining next: ',self.nextSlide);
						}
						
						break;
					case 'secondaryNav':
							var navSlideshow = parent + '_navigation';
							var navSlide = 'navigation_' + parent;
							dataGoTo = appID + '.' + navSlideshow + '.' + navSlide;
						
						break;
					default:
						dataGoTo = item.goTo;
						break;
				}

				if( build === true ) {
					var li = '<li data-goto="' + dataGoTo + '" class="' + item.className + '"' + attrs + '>' + item.symbol + '</li>';
					markup += li;
				}
			});

			this.markup = null;
			this.markup = markup;
		},

		// Add markup to index page
		_insert:function () {
			var list = document.createElement('ul');
			list.id = app.loaded.id + 'Nav';
			list.setAttribute('class', 'menu');
			list.innerHTML = this.markup;
			this.ele.appendChild(list);

			this.list = null;
			this.list = list;
		},

		// Clean up if entering new slide
		_remove:function () {
			console.log('REMOVING');

			// Remove Events
			document.removeEventListener('swiperight', this._swipePrev);
			document.removeEventListener('swipeleft', this._swipeNext);
			this.ele.removeEventListener('click', this._navigate);

			// Remove Nav Element
			this.ele.removeChild(this.list);
		},

		// Break up data-goto attribute and use it to call app.goTo
		_navigate:function (event) {
			console.log('navigate');

			touchy.stop(event);
			var ele = event.target;
			var prev, attr, linkArr, name, content, subcontent;

			attr = ele.getAttribute('data-goto');
			if (attr) {
				linkArr = attr.split('.');
				name = linkArr[0];
				content = linkArr[1] || '';
				subcontent = linkArr[2] || '';
				util.addClass(ele, 'selected');
				
				app.goTo(name, content, subcontent);
			}
		},

		// Add internal event listeners
		_connect:function () {
			var self = this;

			// Attach click events
			self.ele.addEventListener('click', self._navigate);

			// Set up enable function
			self.enableSwipe = function() {
				// Attach swipe events
				if( self.prevSlide != undefined ) {
					document.addEventListener('swiperight', self._swipePrev);
				}

				if( self.nextSlide != undefined ) {
					document.addEventListener('swipeleft', self._swipeNext);
				}
			};

			// Set up disable function
			self.disableSwipe = function() {
				// Attach swipe events
				if( self.prevSlide != undefined ) {
					document.removeEventListener('swiperight', self._swipePrev);
				}

				if( self.nextSlide != undefined ) {
					document.removeEventListener('swipeleft', self._swipeNext);
				}

			};

			// Enable Swipe
			self.enableSwipe();
		},

		// Called on 'slideEnter' or 'sectionEnter'
		_setup:function () {
			var activeCollections = currentNav.activeFor;
			var currentCollection = app.loaded.current;

			if( activeCollections.indexOf(currentCollection) > -1 ) {

				console.log('create side nav');
				
				if (currentNav.initialized) {
					currentNav._remove();
					currentNav._build();
					currentNav._insert();
					currentNav._connect();
				}
				else {
					currentNav._build();
					currentNav._insert();
					currentNav._connect();
					currentNav.initialized = true;
				}

			} else {
				
				if (currentNav.initialized) {
					currentNav._remove();
					currentNav.initialized = false;
				}
			}

		}
	};
})();
