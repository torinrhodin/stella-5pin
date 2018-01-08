(function() {
  window.util = {
    bind: function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    addClass: function(ele, classname) {
      if (!this.hasClass(ele, classname)) {
        ele.className += ' ' + classname;
      }
    },
    hasClass: function(ele, classname) {
      if (ele.className) {
        return ele.className.match(new RegExp('(\\s|^)' + classname + '(\\s|$)'));
      } else {
        return false;
      }
    },
    removeClass: function(ele, classname) {
      var cleaned = new RegExp(new RegExp('(\\s|^)' + classname + '(\\s|$)'));
      ele.className = ele.className.replace(cleaned, ' ');
    },
    swapClass: function(ele, classname1, classname2) {
      var cleaned = new RegExp(new RegExp('(\\s|^)' + classname1 + '(\\s|$)'));
      
      if (this.hasClass(ele, classname1)) {
        ele.className = ele.className.replace(cleaned, ' ');
        ele.className += ' ' + classname2;
      }
    },
    toggleClass: function(ele, classname) {
      if (this.hasClass(ele, classname)) {
        this.removeClass(ele, classname);
      }
      else {
        this.addClass(ele, classname);
      }
    },
    // Wrapper to the iPlanner openPDF function that will monitor clicks
    // NOTE: deprecated method. Use ag.openPDF(path, name) instead.
    // TODO: remove. It has been replaced by functionality in agnitio.js API
    openPDF: function(doc) {
      var path = 'content/pdf/' + doc;
      openPDF(path);
      submitDocumentOpen(path, doc);
    },
    // PPK script for getting position of element
    // http://www.quirksmode.org/js/findpos.html
    getPosition: function(ele) {
      var curleft = 0;
      var curtop = 0;
      if (ele.offsetParent) {
        do {
          curleft += ele.offsetLeft;
          curtop += ele.offsetTop;
        } while (ele = ele.offsetParent);
      }
      return [curleft,curtop];
    },
    // Browser compatibility
    // @param property STRING - Should be capitalized, e.g. "Transform"
    getBrowserPrefix: function(property) {
      var ele = document.createElement('div'),
          style = ele.style,
          prefix;

      if (property.toLowerCase() in style) {
        prefix = '';
      }
      else if ('Webkit' + property in style) {
        prefix = '-webkit-';
      }
      else if ('Moz' + property in style) {
        prefix = '-moz-';
      }
      else if ('ms' + property in style) {
        prefix = '-ms-';
      }
      else if ('O' + property in style) {
        prefix = '-o-';
      }

      return prefix;
    }
  };
})();

