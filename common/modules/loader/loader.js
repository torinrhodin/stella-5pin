/**
* AGNITIO FRAMEWORK MODULE - Loader
* This module will show a loading indicator when content is loading.
* There are three built-in types: default, bar, circle
* CSS is used to customize the look of the loader.
* REQUIREMENTS: util.js
* @author - Stefan Liden, sli@agnitio.com
*/
(function(doc) {
  
  /**
  * The config param accepts to settings:
  * type:  Type of loading indicator (['default'], 'bar', 'circle')
  * delay: How long the loading indicator should be visible after contentLoad as been called
  */
  window.Loader = function(config) {
    this.version = '1.0';
    this.requirements = 'util.js',
    this.config = config || {};
    this.type = this.config.type || 'default'
    this.delay = this.config.delay || 2000;
    this._init();
  };

  Loader.prototype = {
    
    _init: function() {
      this._createContainer();
      this._connect();
    },
    
    // Create the container holding the loading indicator
    _createContainer: function() {
      var presentation = app.elements.presentation;
      this.defaultContent = '<ul><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>';
      this.ele = doc.createElement('div');
      this.ele.id = 'loader';
      this.ele.className = 'loader';
      if (this.type === 'default') {
        this.ele.innerHTML = this.defaultContent;
      }
      else if (this.type === 'bar') {
        this.ele.className = 'loader bar';
      }
      else if (this.type === 'circle') {
        this.ele.className = 'loader circle';
      }
      presentation.insertBefore(this.ele, presentation.childNodes[0]);
    },
    
    // Attach the event listeners for contentLoad and contentUnload
    _connect: function() {
      var loader = this.ele,
          delay = this.delay;
      function hide () {
        setTimeout(function() {
          util.addClass(loader, 'inactive');
        },delay/3);
        setTimeout(function() {
          loader.style.display = "none";
        },delay);
      }
      doc.addEventListener('contentUnload', function(event) {
        util.removeClass(loader, 'inactive');
        loader.style.display = "block";
      });
      doc.addEventListener('contentLoad', function(event) {
        hide();
      });
      doc.addEventListener('appError', function(event) {
        hide();
      });
    }
  };
  
})(document);