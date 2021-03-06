/**
 * Custom Module - Flyout Menu
 * Based on the AGNITIO FRAMEWORK MODULE - Menu
 * by @author - Stefan Liden, sli@agnitio.com
 * This is a nav menu that creates custom links
 * for applicable slide collections.
 * REQUIREMENTS: touchy.js, draggy.js, util.js
 * @author - 5 Pin Design, steve@5pin.com
 */

(function () {

	var currentMenu = null;

	window.FlyoutMenu = function (config) {
		this.version = '1.2';
		this.requirements = 'touchy.js, draggy.js, util.js',
		this.config = config || {};
		this.containerId = this.config.container || 'flyout-menu';
		this.ele = app.elements.flyoutMenu = document.getElementById(this.containerId);
		this.menuItems = this.config.links;
		this.attachTo = this.config.attachTo || [];
		this.offset = this.config.offset || 0;
		this.initialized = false;
		this._init();
	};

	FlyoutMenu.prototype = {
		_init:function () {
			var self = this;
			// TODO: replace with swipeScroll once built
	    this.ele.addEventListener('swipeleft', touchy.stop);
	    this.ele.addEventListener('swiperight', touchy.stop);
	    this.ele.addEventListener('swipeup', touchy.stop);
	    this.ele.addEventListener('swipedown', touchy.stop);

			// Initialize and/or insert menu when content is loaded
			document.addEventListener('contentLoad', function () {

				if (self.attachTo.indexOf(app.loaded.id) > -1 || self.attachTo.length === 0) {
					currentMenu = self;
					
					if (self.initialized) {
						self._connect();
					}
					else {
						self.content = (app.loaded.type === 'slideshow' ? app.slideshows[app.loaded.id] : app.collections[app.loaded.id]);
						self._build();
						self._insert();
						self._connect();
						self.initialized = true;
					}

					// Set current for every slide
					document.addEventListener('slideEnter', self._setCurrent);
				}
			});
		},

		_setCurrent:function() {
			// Clear checked input
			app.flyoutMenu._clearMenu();

			// Clear active labels
			var labels = document.getElementsByTagName('label');
			for( i=0; i<labels.length; i++ ) {
				var label = labels[i];
				label.classList.remove('active');
			}

			// Clear active captions
			var captions = document.getElementsByClassName('sub-slide-cap');
			for( i=0; i<captions.length; i++ ) {
				var caption = captions[i];
				caption.classList.remove('active');
			}

			// Set active parent label			
			var inputs = document.getElementsByClassName('flyout');
			for( i=0; i<inputs.length; i++ ) {
				var input = inputs[i];
				var el = {};
				el.goTo = input.getAttribute('data-goto');
				el.parentGoTo = input.getAttribute('data-parent-goto');

				// Get associated slideshow ID
				if( el.goTo != '' ) {
					var goToArr = el.goTo.split('.');
					el.slideshow = goToArr[1] || '';

				} else if( el.parentGoTo != '' ) {
					var parentGoToArr = el.parentGoTo.split('.');
					el.slideshow = parentGoToArr[1] || '';

				}

				// Set active parent slideshow link
				if( app.slideshow.id === el.slideshow ) {
					var currentLabel = document.querySelectorAll('[for="'+input.id+'"]');
					currentLabel[0].classList.add('active');
				}
			}

			// Set active sub link
			var currentGoTo = app.loaded.id + '.' + app.slideshow.id + '.' + app.slideshow.current;
			var subLinks = document.getElementsByClassName('flyout-sub');
			for( i=0; i<subLinks.length; i++ ) {
				var subLink = subLinks[i];
				var el = {};
				el.goTo = subLink.getAttribute('data-goto');
				el.popUp = subLink.getAttribute('data-popup-link');
				
				if( currentGoTo === el.goTo && el.popUp === '' ) {
					var caption = subLink.parentNode.parentNode.getElementsByClassName('sub-slide-cap');
					caption[0].classList.add('active');
				}
			}

		},

		// Create the HTML of the menu
		_build:function () {
			var self = this,
			markup = '<div class="spacer"></div>';

			this.menuItems.forEach(function (item) {
				item.idName = item.idName || "";
				item.className = item.className || "";
				item.parentGoTo = item.parentGoTo || "";
				item.goTo = item.goTo || "";
				item.subLinks = item.subLinks || "";
				var attrs = "";

				if (typeof(item.attr) != 'undefined') {
					attrs += ' ' + item.attr.id + '="' + item.attr.value + '"';
				}

				var input = '<input type="radio" name="flyoutmain" data-state="" data-parent-goto="' + item.parentGoTo + '" data-goto="' + item.goTo + '" id="' + item.idName + '" class="flyout"' + attrs + '>';
				var label = '<label id="' + item.labelName + '"' + '" class="' + item.className + '"' + '" for="' + item.idName + '"' + '">';
				    label += '<span>' + item.title + '</span>';
				    label += '<div class="icon ' + item.idName + '"></div>';
				    label += '</label>';
				var sub = "";

				// Add Sublinks to Parent
				if( item.parentGoTo ) {

					sub += '<div id="' + item.idName + '-sub" class="sub-container">';

					var subLinkLoop = function(subLinkArray) {
						var subMarkup = '';

						for( i=0; i<subLinkArray.length; i++ ) {
							var subLink = subLinkArray[i];
							subLink.popupLink = subLink.popupLink || "";

							subMarkup += '<div class="sub-slide-wrap">';
							subMarkup += '<div class="sub-slide-thumb">';
							subMarkup += '<img class="flyout-sub" data-goto="' + subLink.goTo + '" src="' + subLink.thumb + '" data-popup-link="' + subLink.popupLink + '">'
							subMarkup += '</div>';
							subMarkup += '<div class="sub-slide-cap">' + subLink.title + '</div>';
							subMarkup += '</div>';
						}

						return subMarkup;
					};

					var subLinksFirst = item.subLinks[0];
					if( subLinksFirst.length > 0 ) {
						sub += '<div class="sub">';
						sub += '<div class="chevron"></div>';
						sub += subLinkLoop(subLinksFirst);
						sub += '</div>';
					}

					var subLinksSecond = item.subLinks[1];
					if( subLinksSecond.length > 0 ) {
						sub += '<div class="sub2">';
						sub += '<div class="chevron"></div>';
						sub += subLinkLoop(subLinksSecond);
						sub += '</div>';
					}

					sub += '</div>';
				}

				markup += input+label+sub;
			});

			this.markup = null;
			this.markup = markup;
		},

		// Add markup to index page
		_insert:function () {
			navcheck = '<input type="checkbox" id="navcheck" role="button" title="menu">';
      navcheck += '<label for="navcheck" aria-hidden="true" title="menu">';
      navcheck += '<span class="burger"><span class="bar"></span></span>';
      navcheck += '</label>';
      this.ele.innerHTML = navcheck;

			var list = document.createElement('nav');
			list.id = 'menu';
			list.innerHTML = this.markup;
			this.ele.appendChild(list);

			this.list = null;
			this.list = list;
		},

		// Clean up if unloading
		_remove:function () {
			this.ele.removeEventListener('click', this._navigate);
			this.ele.removeChild(this.list);
		},

		// Update menu item classes (remove and add .active)
		// Break up data-goto attribute and use it to call app.goTo
		_navigate:function (event) {
			touchy.stop(event);

			var ele = event.target;
			var state = ele.getAttribute('data-state');
			var parentGoTo = ele.getAttribute('data-parent-goto');
			var popupLink = ele.getAttribute('data-popup-link');
			var attr, linkArr, name, content, subcontent;
			attr = ele.getAttribute('data-goto');

			// Clear Subs
			var clearSubs = function() {
				var subContainers = document.getElementsByClassName('sub-container');
				for( i=0; i<subContainers.length; i++ ) {
					subContainers[i].classList.remove('active');
				}
			}

			// De-activate Parents
			var deactivateParents = function() {
				var parents = document.getElementsByClassName('flyout');
				for( i=0; i<parents.length; i++ ) {
					parents[i].setAttribute('data-state', '');
				}
			};

			clearSubs();

			// Check if Parent Links
			if ( parentGoTo ) {

				if( state === 'active' ) {
					attr = parentGoTo;

				} else {
					deactivateParents();

					// Activate Parent
					ele.setAttribute('data-state', 'active');
					
					// Activate Sub
					var targetID = event.target['id'];
					var subContainerID = targetID + '-sub';
					var subContainer = document.getElementById(subContainerID);
					subContainer.classList.add('active');
				}
			}

			// Check if links to a Popup
			if ( popupLink ) {
				app.flyoutMenu.activePopup = popupLink;
			}

			// GoTo link
			if (attr === false) {
				event.preventDefault();

			} else if (attr) {

				linkArr = attr.split('.');
				name = linkArr[0];
				content = linkArr[1] || '';
				subcontent = linkArr[2] || '';
				// util.addClass(ele, 'selected');

				if (name === 'app') {
					eval(attr);
				
				} else if ( subcontent === app.currentSlide && !popupLink ) {
					event.preventDefault();
					app.flyoutMenu._closeMenu();

				} else {
					app.goTo(name, content, subcontent);
					app.flyoutMenu._closeMenu();
				}

				deactivateParents();
			}
		},

		// Add internal event listeners
		_connect:function () {
			var self = this;
			this.ele.addEventListener('click', this._navigate);
		},

		// Close menu on slide enter
		_closeMenu:function () {
			console.log('close menu');

			document.getElementById('navcheck').checked =  false;
		},

		// Clear menu
		_clearMenu:function () {
			console.log('clear menu');

      var clearRadioGroup = function(GroupName) {
        var ele = document.getElementsByName(GroupName);
        for(var i=0;i<ele.length;i++)
          ele[i].checked = false;
      }
			
			clearRadioGroup('flyoutmain');
			
			var subContainers = document.getElementsByClassName('sub-container');
			subContainers.className = 'sub-container';
		}
	};
})();
