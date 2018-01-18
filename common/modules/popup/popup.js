/**
 * Custom Module - Popup
 * @author - 5 Pin Design, steve@5pin.com
 */

(function () {

	window.Popup = function (config) {
		this.version = '1.0';
		this.config = config || {};
		this.containerId = this.config.container || 'popup';
		this.ele = app.elements.popup = document.getElementById(this.containerId);
		this.bgId = this.config.bg || 'popup-background';
		this.bg = app.elements.popupBG = document.getElementById(this.bgId);
		this.closeId = this.config.closeId || 'close-popup';
		this.closeLink = app.elements.closePopup = document.getElementById(this.closeId);
		this.activeClass = 'active-slide';
		this.inactiveClass = 'inactive-nav';
		this.attachTo = this.config.attachTo || [];
		this.initialized = false;
		this.slideshow = false;
	};

	Popup.prototype = {
		_init:function (content, slideshow) {
			var self = this;

			var popup = this.ele;
			var popupBG = this.bg;
			var lastChild = popup.children.length - 1;
			var popupContent = popup.children[lastChild];
		  popupContent.innerHTML = content;
		  popup.style.display = 'block';
      popupBG.style.display = 'block';

			if( slideshow === true ) {
				this.slides = this.ele.getElementsByClassName('popup-slide');
				this.prevLink = document.getElementById('popup-prev');
				this.nextLink = document.getElementById('popup-next');

				// Set slide index numbers
				for( i=0; i<this.slides.length; i++ ) {
					this.slides[i].setAttribute('data-index', i);

					// Activate first slide
					if( i === 0 ) {
						this.slides[i].classList.add(this.activeClass);	
					}
				}

				this._setActiveNav();
				this._connectSlideshow();
				this.slideshow = true;
			}

			// Add event listeners
			this._connect();

			// Finalize
			this.initialized = true;
		},

		_getIndex:function(slide) {
			return parseInt(slide.getAttribute('data-index'));
		},

		_getActiveSlide:function() {
			var activeSlides = app.popup.ele.getElementsByClassName(this.activeClass);
			return activeSlides[0];
		},

		_hideSlideshowNav:function() {
			this.prevLink.classList.add(this.inactiveClass);
			this.nextLink.classList.add(this.inactiveClass);
		},

		_showSlideshowNav:function() {
			this.prevLink.classList.remove(this.inactiveClass);
			this.nextLink.classList.remove(this.inactiveClass);
		},

		// Hide prev/Next Arrowa
		_setActiveNav:function() {
			var activeSlide = this._getActiveSlide();
			var activeSlideIndex = this._getIndex(activeSlide);

			// Remove all inactive classes
			this._showSlideshowNav();

			// Hide Prev arrow
			if( activeSlideIndex === 0 ) {
				this.prevLink.classList.add(this.inactiveClass);
			}
			
			// Hide Next arrow
			if( activeSlideIndex === (this.slides.length - 1) ) {
				this.nextLink.classList.add(this.inactiveClass);
			}
		},

		// Go to Prev or Next slide
		_navigate:function (event) {
			var element = document.getElementById(event.target.id);
	  	var direction = parseInt(element.getAttribute('data-direction'));
	  	var activeClass = app.popup.activeClass;
	  	var slides = app.popup.slides;

			var activeSlide = app.popup._getActiveSlide();
			var activeSlideIndex = app.popup._getIndex(activeSlide);

	  	if( direction === -1 && activeSlideIndex > 0 ) {
	  		activeSlide.classList.remove(activeClass);
	  		activeSlide.previousElementSibling.classList.add(activeClass);
	  	}

	  	if ( direction === 1 && activeSlideIndex < (slides.length - 1) ) {
	  		activeSlide.classList.remove(activeClass);
	  		activeSlide.nextElementSibling.classList.add(activeClass);
	  	}

			app.popup._setActiveNav();	  	
		},

		// Clean up if unloading
		_removeSlideshow:function () {
			this.prevLink.removeEventListener('click', this._navigate);
			this.nextLink.removeEventListener('click', this._navigate);
		},

		// Add slideshow event listeners
		_connectSlideshow:function () {
			this.prevLink.addEventListener('click', this._navigate);
			this.nextLink.addEventListener('click', this._navigate);
		},
		
		_close:function (event) {
			app.popup.ele.style.display = 'none';
			app.popup.bg.style.display = 'none';
			app.popup.ele.removeAttribute('class');

			app.popup._remove();
		},

		// Clean up if unloading
		_remove:function () {
			this.closeLink.removeEventListener('click', this._close);

			// Disconnect slideshow
			if( this.slideshow === true ) {
				this._removeSlideshow();
				this._hideSlideshowNav();
				this.slideshow = false;
			}

			// Reset
			this.initialized = false;
		},

		// Add internal event listeners
		_connect:function () {
			this.closeLink.addEventListener('click', this._close);
		}
	};
})();
