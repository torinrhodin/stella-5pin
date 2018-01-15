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

					if (app.loaded.type === 'slideshow') {
						document.addEventListener('slideEnter', self._closeMenu);
					}
					else {
						document.addEventListener('sectionEnter', self._closeMenu);
					}
				}
			});
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

					var subLinksFirst = item.subLinks[0];
					if( subLinksFirst.length > 0 ) {
						sub += '<div class="sub">';
						sub += '<div class="chevron"></div>';

						for( i=0; i<subLinksFirst.length; i++ ) {
							var subLink = subLinksFirst[i];
							sub += '<div class="sub-slide-wrap">';
							sub += '<div class="sub-slide-thumb"><img data-goto="' + subLink.goTo + '" src="' + subLink.thumb + '"></div>';
							sub += '<div class="sub-slide-cap">' + subLink.title + '</div>';
							sub += '</div>';
						}

						sub += '</div>';
					}

					var subLinksSecond = item.subLinks[1];
					if( subLinksSecond.length > 0 ) {
						sub += '<div class="sub2">';
						sub += '<div class="chevron"></div>';

						for( i=0; i<subLinksSecond.length; i++ ) {
							var subLink = subLinksSecond[i];
							sub += '<div class="sub-slide-wrap">';
							sub += '<div class="sub-slide-thumb"><img data-goto="' + subLink.goTo + '" src="' + subLink.thumb + '"></div>';
							sub += '<div class="sub-slide-cap">' + subLink.title + '</div>';
							sub += '</div>';
						}

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
			navcheck = '<input type="checkbox" id="navcheck" role="button" title="menu" onclick="Clear();">';
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

			// Parent Links
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

			// GoTo link
			if (attr === false) {
				event.preventDefault();

			} else if (attr) {

				linkArr = attr.split('.');
				name = linkArr[0];
				content = linkArr[1] || '';
				subcontent = linkArr[2] || '';
				util.addClass(ele, 'selected');

				if (name === 'app') {
					eval(attr);
				}
				else {
					app.goTo(name, content, subcontent);
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
			document.getElementById('navcheck').checked =  false;
		}
	};
})();
