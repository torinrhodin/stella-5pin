/**
 * AGNITIO FRAMEWORK MODULE - Menu
 * This is a slideshow/collection menu that will allow you to easily
 * link to all your slideshows, collections, and slides.
 * Has built-in scrolling and link tracking.
 * REQUIREMENTS: touchy.js, draggy.js, util.js
 * @author - Stefan Liden, sli@agnitio.com
 */

(function () {

	var currentMenu = null;

	window.Menu = function (config) {
		this.version = '1.2';
		this.requirements = 'touchy.js, draggy.js, util.js',
		this.config = config || {};
		this.containerId = this.config.container || 'mainmenu';
		this.ele = app.elements.menu = document.getElementById(this.containerId);
		this.menuItems = this.config.links;
		this.attachTo = this.config.attachTo || [];
		this.offset = this.config.offset || 0;
		this.initialized = false;
		this._init();
	};

	Menu.prototype = {
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
				markup = '';
			// markup = '<ul id="' + app.loaded.id + 'Menu" class="menu">';
			this.menuItems.forEach(function (item) {
				item.className = item.className || "";
				var attrs = "";

				if (typeof(item.attr) != 'undefined') {
					attrs += ' ' + item.attr.id + '="' + item.attr.value + '"';
				}

				var li = '<li data-goto="' + item.goTo + '" class="' + item.className + '"' + attrs + '>' + item.title + '</li>';
				markup += li;
			});
			this.markup = null;
			this.markup = markup;
		},

		// Add markup to index page
		_insert:function () {
			var scrollLimit;
			var list = document.createElement('ul');
			list.id = app.loaded.id + 'Menu';
			list.setAttribute('class', 'menu');
			list.innerHTML = this.markup;
			// this.ele.innerHTML = this.markup;
			this.ele.appendChild(list);
			this._getWidth();
			scrollLimit = app.dimensions[0] - this.menuWidth;
			// No scroller necessary if menu isn't wider than view
			if (scrollLimit < 0) {
	      this.scroller = new Draggy(list.id, {
	        restrictY: true,
	        limitsX: [scrollLimit, 0],
	        onChange: function(x,y) {
	        	this.offset = x;
	        }
	      });
				this.scroller.moveTo(this.offset, 0);
	    }
	    else {
	    	this.scroller = null;
	    }
			this.list = null;
			this.list = list;
		},

		_getWidth: function() {
      var link, links, width, _i, _len, _results;
      links = currentMenu.ele.querySelectorAll('li');
      this.menuWidth = 0;
      this.linkWidths = [];
      _results = [];
      for (_i = 0, _len = links.length; _i < _len; _i++) {
        link = links[_i];
        width = link.getBoundingClientRect().width;
        this.menuWidth += width;
        _results.push(this.linkWidths.push(width));
      }
      return _results;
    },

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
			if (attr) {
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
				if (currentMenu.scroller) {
					var realPos = util.getPosition(link)[0];
					var pos = realPos + currentMenu.offset;
					var wd = link.getBoundingClientRect().width;
					var rightPos = pos + wd;
					var toMove = 0;
					var defaultOffset = currentMenu.config.offset || 0;
					var absOffset = defaultOffset;//Math.abs(defaultOffset);

					if (rightPos >= 1024) {
						toMove = (rightPos - 1024) - currentMenu.offset;
						currentMenu.list.style.webkitTransitionDuration = '0.5s';
						currentMenu.list.style.webkitTransform = 'translate3d(-' + toMove + 'px, 0, 0)';
						return currentMenu.offset = -toMove;
					}
					else if (link.offsetLeft < -defaultOffset) {
						toMove = pos - currentMenu.offset;
						currentMenu.list.style.webkitTransitionDuration = '0.5s';
						currentMenu.list.style.webkitTransform = 'translate3d(-' + toMove + 'px, 0, 0)';
						currentMenu.offset = -toMove;
					}
					else if (rightPos > absOffset && (realPos + wd) < 1024) {
						toMove = defaultOffset;
						currentMenu.list.style.webkitTransitionDuration = '0.5s';
						currentMenu.list.style.webkitTransform = 'translate3d(' + toMove + 'px, 0, 0)';
						currentMenu.offset = toMove;
					}
					else if (pos < 0) {
						toMove = currentMenu.offset - pos;
						currentMenu.list.style.webkitTransitionDuration = '0.5s';
						currentMenu.list.style.webkitTransform = 'translate3d(' + toMove + 'px, 0, 0)';
						currentMenu.offset = toMove;
					}
					setTimeout(function() {
	        	currentMenu.scroller.moveTo(currentMenu.offset, 0);
	      	},500);
				}
			}
		}
	};
})();
