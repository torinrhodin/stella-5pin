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
		this.ele = app.elements.menu = document.getElementById(this.containerId);
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
						//self._insert();
					}
					else {
						self.content = (app.loaded.type === 'slideshow' ? app.slideshows[app.loaded.id] : app.collections[app.loaded.id]);
						self._build();
						self._insert();
						self._connect();
						self.initialized = true;
					}

					if (app.loaded.type === 'slideshow') {
						document.addEventListener('slideEnter', self._setCurrent);
					}
					else {
						document.addEventListener('sectionEnter', self._setCurrent);
					}
				}
			});

			// If slideshow/collection specific menu, remove when content unloads
			document.addEventListener('contentUnload', function () {
				if (self.attachTo.indexOf(app.loaded.id) > -1) {
					self._remove();
					if (app.loaded.type === 'slideshow') {
						document.removeEventListener('slideEnter', self._setCurrent);
					}
					else {
						document.removeEventListener('sectionEnter', self._setCurrent);
					}
				}
			});
		},

		// Create the HTML of the menu
		_build:function () {
			var self = this,
			markup = '<div class="spacer"></div>';
			// markup = '<ul id="' + app.loaded.id + 'Menu" class="menu">';

			this.menuItems.forEach(function (item) {
				item.idName = item.idName || "";
				item.className = item.className || "";
				item.goTo = item.goTo || "";
				var attrs = "";

				if (typeof(item.attr) != 'undefined') {
					attrs += ' ' + item.attr.id + '="' + item.attr.value + '"';
				}

				var input = '<input type="radio" name="flyoutmain" data-goto="' + item.goTo + '" id="' + item.idName + '"' + '" class="flyout"' + attrs + '>';
				var label = '<label id="' + item.labelName + '"' + '" class="' + item.className + '"' + '" for="' + item.idName + '"' + '">';
				    label += '<span>' + item.title + '</span>';
				    label += '<div class="icon ' + item.idName + '"></div>';

				if( item.idName === 'link3' ) {
						label += '<div class="sub">';
						label += '<div class="chevron"></div>';
						label += '<div class="sub-slide-wrap">';
						label += '<div class="sub-slide-thumb" data-goto="stellant_app.smartpack_navigation.smartpack_pillars"><img src="content/img/contrast.jpg"></div>';
						label += '<div class="sub-slide-cap">Contrast media</div>';
						label += '</div>';
						label += '<div class="sub-slide-wrap">';
						label += '<div class="sub-slide-thumb"><img src="content/img/consumables.jpg"></div>';
						label += '<div class="sub-slide-cap">Consumables</div>';
						label += '</div>';
						label += '</div>';
				}

				if( item.idName === 'link4' ) {
						label += '<div class="sub">';
						label += '<div class="chevron"></div>';
						label += '<div class="sub-slide-wrap">';
						label += '<div class="sub-slide-thumb"><img src="content/img/reliability.jpg"></div>';
						label += '<div class="sub-slide-cap">Reliability</div>';
						label += '</div>';
						label += '<div class="sub-slide-wrap">';
						label += '<div class="sub-slide-thumb"><img src="content/img/technology.jpg"></div>';
						label += '<div class="sub-slide-cap">Technology</div>';
						label += '</div>';
						label += '<div class="sub-slide-wrap">';
						label += '<div class="sub-slide-thumb"><img src="content/img/access.jpg"></div>';
						label += '<div class="sub-slide-cap">Access</div>';
						label += '</div>';
						label += '</div>';
						label += '<div class="sub2">';
						label += '<div class="chevron"></div>';
						label += '<div class="sub-slide-wrap">';
						label += '<div class="sub-slide-thumb"><img src="content/img/scanner.jpg"></div>';
						label += '<div class="sub-slide-cap">Scanner connectivity</div>';
						label += '</div>';
						label += '<div class="sub-slide-wrap">';
						label += '<div class="sub-slide-thumb"><img src="content/img/automated.jpg"></div>';
						label += '<div class="sub-slide-cap">Automated<br>Documentation</div>';
						label += '</div>';
						label += '<div class="sub-slide-wrap">';
						label += '<div class="sub-slide-thumb"><img src="content/img/personalized.jpg"></div>';
						label += '<div class="sub-slide-cap">Personalized<br>Protocols</div>';
						label += '</div>';
						label += '<div class="sub-slide-wrap">';
						label += '<div class="sub-slide-thumb"><img src="content/img/data.jpg"></div>';
						label += '<div class="sub-slide-cap">Data-driven insights</div>';
						label += '</div>';
						label += '</div>';
				}

				label += '</label>';
				markup += input+label;
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

		// _getWidth: function() {
  //     var link, links, width, _i, _len, _results;
  //     links = currentMenu.ele.querySelectorAll('li');
  //     this.menuWidth = 0;
  //     this.linkWidths = [];
  //     _results = [];
  //     for (_i = 0, _len = links.length; _i < _len; _i++) {
  //       link = links[_i];
  //       width = link.getBoundingClientRect().width;
  //       this.menuWidth += width;
  //       _results.push(this.linkWidths.push(width));
  //     }
  //     return _results;
  //   },

		// Clean up if unloading
		_remove:function () {
			this.ele.removeEventListener('click', this._navigate);
			this.ele.removeChild(this.list);
		},

		// Update menu item classes (remove and add .selected)
		// Break up data-goto attribute and use it to call app.goTo
		_navigate:function (event) {
			touchy.stop(event);
			var ele = event.target;
			var prev, attr, linkArr, name, content, subcontent;
			if (ele.nodeType === 3) {
				ele = ele.parentNode;
			}
			prev = this.querySelector('.selected');
			attr = ele.getAttribute('data-goto');

			if (attr === false) {
				console.log(attr);
				event.preventDefault();

			} else if (attr) {

				if (prev) {
					util.removeClass(prev, 'selected');
				}

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

			}
		},

		// Add internal event listeners
		_connect:function () {
			var self = this;
			console.log(this.ele);
			console.log(this.ele.children);
			this.ele.addEventListener('click', this._navigate);
		},

		// Called on 'slideEnter' or 'sectionEnter'
		// TODO: replace hardcoded width
		_setCurrent:function () {
			var prev = currentMenu.list.querySelector('.selected'),
			query = '[data-goto="' + app.loaded.id + '.' + app.loaded.current + '"]';
			link = currentMenu.list.querySelector(query);
			if (prev) {
				util.removeClass(prev, 'selected');
			}
			if (link) {
				util.addClass(link, 'selected');
				// if (currentMenu.scroller) {
				// 	var realPos = util.getPosition(link)[0];
				// 	var pos = realPos + currentMenu.offset;
				// 	var wd = link.getBoundingClientRect().width;
				// 	var rightPos = pos + wd;
				// 	var toMove = 0;
				// 	var defaultOffset = currentMenu.config.offset || 0;
				// 	var absOffset = defaultOffset;//Math.abs(defaultOffset);

				// 	if (rightPos >= 1024) {
				// 		toMove = (rightPos - 1024) - currentMenu.offset;
				// 		currentMenu.list.style.webkitTransitionDuration = '0.5s';
				// 		currentMenu.list.style.webkitTransform = 'translate3d(-' + toMove + 'px, 0, 0)';
				// 		return currentMenu.offset = -toMove;
				// 	}
				// 	else if (link.offsetLeft < -defaultOffset) {
				// 		toMove = pos - currentMenu.offset;
				// 		currentMenu.list.style.webkitTransitionDuration = '0.5s';
				// 		currentMenu.list.style.webkitTransform = 'translate3d(-' + toMove + 'px, 0, 0)';
				// 		currentMenu.offset = -toMove;
				// 	}
				// 	else if (rightPos > absOffset && (realPos + wd) < 1024) {
				// 		toMove = defaultOffset;
				// 		currentMenu.list.style.webkitTransitionDuration = '0.5s';
				// 		currentMenu.list.style.webkitTransform = 'translate3d(' + toMove + 'px, 0, 0)';
				// 		currentMenu.offset = toMove;
				// 	}
				// 	else if (pos < 0) {
				// 		toMove = currentMenu.offset - pos;
				// 		currentMenu.list.style.webkitTransitionDuration = '0.5s';
				// 		currentMenu.list.style.webkitTransform = 'translate3d(' + toMove + 'px, 0, 0)';
				// 		currentMenu.offset = toMove;
				// 	}
				// 	setTimeout(function() {
	   //      	currentMenu.scroller.moveTo(currentMenu.offset, 0);
	   //    	},500);
				// }
			}
		}
	};
})();
