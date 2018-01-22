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

		// Header
		this.containerId = this.config.container || 'mainmenu';
		this.ele = app.elements.menu = document.getElementById(this.containerId);
		this.menuItems = this.config.headerLinks;

		// Footer
		this.footerContainerId = this.config.container || 'mainfooter';
		this.footerEle = app.elements.footerMenu = document.getElementById(this.footerContainerId);
		this.footerMenuItems = this.config.footerLinks;

		this.attachTo = this.config.attachTo || [];
		this.offset = this.config.offset || 0;
		this.initialized = false;
		this._init();
	};

	Menu.prototype = {
		_init:function () {
			var self = this;

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
				}
			});
		},

		// Create the HTML of the menu
		_build:function () {
			var self = this,

			// Header
			markup = '';
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

			//Footer
			footerMarkup = '';
			this.footerMenuItems.forEach(function (item) {
				item.className = item.className || "";
				var attrs = "";

				if (typeof(item.attr) != 'undefined') {
					attrs += ' ' + item.attr.id + '="' + item.attr.value + '"';
				}

				var li = '<li data-goto="' + item.goTo + '" class="' + item.className + '"' + attrs + '>' + item.title + '</li>';
				footerMarkup += li;
			});
			this.footerMarkup = null;
			this.footerMarkup = footerMarkup;
		},

		// Add markup to index page
		_insert:function () {
			// Header
			var list = document.createElement('ul');
			list.id = app.loaded.id + 'Menu';
			list.setAttribute('class', 'menu');
			list.innerHTML = this.markup;
			this.ele.appendChild(list);
			this.list = null;
			this.list = list;

			// Footer
			var footerList = document.createElement('ul');
			footerList.id = app.loaded.id + 'Footer';
			footerList.innerHTML = this.footerMarkup;
			this.footerEle.appendChild(footerList);
			this.footerList = null;
			this.footerList = footerList;
		},

		// Clean up if unloading
		_remove:function () {
			this.ele.removeEventListener('click', this._navigate);
			this.ele.removeChild(this.list);

			this.footerEle.removeEventListener('click', this._navigate);
			this.footerEle.removeChild(this.footerList);
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
			this.footerEle.addEventListener('click', this._navigate);
		}
	};
})();
