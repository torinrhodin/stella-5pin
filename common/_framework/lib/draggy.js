/**
 * draggy.js
 *
 * A JavaScript/CSS3 microlibrary for moving elements.
 *
 * BROWSER SUPPORT: Safari, Chrome, Firefox, Opera, IE9
 *
 * @author     Stefan Liden
 * @version    0.9.9 - with Dropzones added
 * @copyright  Copyright 2012 Stefan Liden (Jofan)
 * @license    MIT
 */

(function() {
  'use strict';

  // Some simple utility functions
  var util = {
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
      ele.className = ele.className.replace(cleaned, '');
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
    }
  };

  // Browser compatibility
  var ele = document.createElement('div'),
      style = ele.style,
      prefix;


  if ('transform' in style) {
    prefix = '';
  }
  else if ('WebkitTransform' in style) {
    prefix = '-webkit-';
  }
  else if ('MozTransform' in style) {
    prefix = '-moz-';
  }
  else if ('msTransform' in style) {
    prefix = '-ms-';
  }
  else if ('OTransform' in style) {
    prefix = '-o-';
  }

  var d = document,
      isTouch = 'ontouchstart' in window,
      mouseEvents = {
        start: 'mousedown',
        move: 'mousemove',
        end: 'mouseup'        
      },
      touchEvents = {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend'
      },
      // http://jessefreeman.com/articles/from-webkit-to-windows-8-touch-events/
      msPointerEvents = {
        start: 'MSPointerDown',
        move: 'MSPointerMove',
        end: 'MSPointerUp'
      },
      events = isTouch ? touchEvents : setEvents();

  function setEvents() {
    return window.navigator.msPointerEnabled ? msPointerEvents : mouseEvents;
  }

  window.onDrag = d.createEvent('UIEvents');
  window.onDrop = d.createEvent('UIEvents');
  onDrag.initEvent('onDrag', true, true);
  onDrop.initEvent('onDrop', true, true);

  window.Draggy = function(attachTo, config) {
    this.attachTo = attachTo;
    this.config   = config || {};
    this.onChange = this.config.onChange || function() {};
    this.position = [0,0];
    this.bindTo   = this.config.bindTo || null;
    this.init();
  };

  Draggy.prototype = {
    init: function() {
      this.ele           = (typeof this.attachTo === 'string' ? d.getElementById(this.attachTo) : this.attachTo);
      this.ele.draggy    = this;
      this.ele.onChange  = this.onChange;
      this.ele.position  = this.position || [0, 0];
      this.ele.restrictX = this.config.restrictX || false;
      this.ele.restrictY = this.config.restrictY || false;
      this.ele.limitsX   = this.config.limitsX || [-9999, 9999];
      this.ele.limitsY   = this.config.limitsY || [-9999, 9999];
      this.ele.snapBack  = this.config.snapBack || false;
      if (this.bindTo) {
        this.bind(this.bindTo);
      }
      this.enable();
    },
    // Reinitialize draggy object and move to saved position
    reInit: function() {
      this.init();
      this.setTo(this.ele.position[0], this.ele.position[1]);
    },
    // Disable the draggy object so that it can't be moved
    disable: function() {
      this.ele.removeEventListener(events.start, this.dragStart);
    },
    // Enable the draggy object so that it can be moved
    enable: function() {
      this.ele.addEventListener(events.start, this.dragStart);
    },
    // Get current state and prepare for moving object
    dragStart: function(e) {
      var restrictX = this.restrictX,
          restrictY = this.restrictY,
          limitsX = this.limitsX,
          limitsY = this.limitsY,
          relativeX = this.position[0],
          relativeY = this.position[1],
          posX = isTouch ? e.touches[0].pageX : e.clientX,
          posY = isTouch ? e.touches[0].pageY : e.clientY,
          newX, newY,
          self = this; // The DOM element

      // Prevent panning and zooming (IE)
      if (e.preventManipulation) e.preventManipulation();
      
      // See blog.msdn.com/b/ie/20111/10/19/handling-multi-touch-and-mouse-input-in-all-browsers.aspx
      if (typeof e.target.style.msTouchAction !== 'undefined') e.target.style.msTouchAction = 'none';

      // Allow nested draggable elements
      // e.stopPropagation();

      util.addClass(this, 'activeDrag');

      d.addEventListener(events.move, dragMove);
      d.addEventListener(events.end, dragEnd);
      
      // Move draggy object using CSS3 translate3d
      function dragMove (e) {
        e.preventDefault();
        var movedX, movedY, relX, relY,
            clientX = isTouch ? e.touches[0].pageX : e.clientX,
            clientY = isTouch ? e.touches[0].pageY : e.clientY;
        if (!restrictX) {
          // Mouse movement (x axis) in px
          movedX = clientX - posX;
          // New pixel value (x axis) of element
          newX = relativeX + movedX;
          if (newX >= limitsX[0] && newX <= limitsX[1]) {
            posX = clientX;
            relativeX = newX;
          }
          else if (newX < limitsX[0]) {
            relativeX = limitsX[0];
          }
          else if (newX > limitsX[1]) {
            relativeX = limitsX[1];
          }
        }
        if (!restrictY) {
          movedY = clientY - posY;
          newY = relativeY + movedY;
          if (newY >= limitsY[0] && newY <= limitsY[1]) {
            posY = clientY;
            relativeY = newY;
          }
          else if (newY < limitsY[0]) {
            relativeY = limitsY[0];
          }
          else if (newY > limitsY[1]) {
            relativeY = limitsY[1];
          }
        }
        self.draggy.position = self.position = [relativeX, relativeY];
        self.style.cssText = prefix + 'transform:translate(' + relativeX + 'px,' + relativeY + 'px);';
        self.onChange(relativeX, relativeY);
        self.dispatchEvent(onDrag);
      }
      // Stop moving draggy object, save position and dispatch onDrop event
      function dragEnd (e) {
        self.draggy.position = self.position;
        util.removeClass(self.draggy.ele, 'activeDrag');
        self.dispatchEvent(onDrop);
        d.removeEventListener(events.move, dragMove);
        d.removeEventListener(events.end, dragEnd);
      }

    },
    // API method for moving the draggy object
    // Position is updated
    // Limits and restrictions are adhered to
    // Callback is NOT called
    // onDrop event is NOT dispatched
    moveTo: function(x,y) {
      x = this.ele.restrictX ? 0 : x;
      y = this.ele.restrictY ? 0 : y;
      if (x < this.ele.limitsX[0] || x > this.ele.limitsX[1]) { return; }
      if (y < this.ele.limitsY[0] || y > this.ele.limitsY[1]) { return; }
      this.ele.style.cssText = prefix + 'transform:translate(' + x + 'px,' + y + 'px);';
      this.ele.position = this.position = [x,y];
    },
    // API method for setting the draggy object at a certain point
    // Limits and restrictions are adhered to
    // Callback is called
    // onDrop event is dispatched
    setTo: function(x,y) {
      x = this.ele.restrictX ? 0 : x;
      y = this.ele.restrictY ? 0 : y;
      if (x < this.ele.limitsX[0] || x > this.ele.limitsX[1]) { return; }
      if (y < this.ele.limitsY[0] || y > this.ele.limitsY[1]) { return; }
      this.ele.style.cssText = prefix + 'transform:translate(' + x + 'px,' + y + 'px);';
      this.ele.onChange(x, y);
      this.ele.position = this.position = [x,y];
      this.ele.dispatchEvent(onDrop);
    },
    // API method for resetting position of draggy object
    reset: function() {
      this.ele.style.cssText = prefix + 'transform:translate(0, 0);';
      this.ele.position = [0,0];
    },
    // API method for restricting draggy object to boundaries of an element
    // Sets x and y limits
    // Used internally if config option "bindTo" is used
    bind: function(element) {
      var ele = (typeof element === 'string' ? d.getElementById(element) : element),
          draggyPos, elePos, draggyWidth, eleWidth, draggyHeight, eleHeight,
          xLimit1,  xLimit2, yLimit1, yLimit2;

      xLimit1 = xLimit2 = yLimit1 = yLimit2 = 0;

      if (ele) {
        draggyPos    = util.getPosition(this.ele);
        elePos       = util.getPosition(ele);
        draggyWidth  = parseInt(this.ele.offsetWidth, 10);
        eleWidth     = parseInt(ele.offsetWidth, 10);
        draggyHeight = parseInt(this.ele.offsetHeight, 10);
        eleHeight    = parseInt(ele.offsetHeight, 10);
        if (!this.ele.restrictX) {
          xLimit1      = elePos[0] - draggyPos[0];
          xLimit2      = (eleWidth - draggyWidth) - Math.abs(xLimit1);
        }
        if (!this.ele.restrictY) {
          yLimit1      = elePos[1] - draggyPos[1];
          yLimit2      = (eleHeight - draggyHeight) - Math.abs(yLimit1);
        }

        this.ele.limitsX = [xLimit1, xLimit2];
        this.ele.limitsY = [yLimit1, yLimit2];

      }
    }
  };

  window.DropZones = function(dropIds) {
    this.dropIds = dropIds;
    this.storage = [];
    this.init();
  };

  DropZones.prototype = {
    init: function() {
      var self = this; 
      this.dropObjects = [];
      this.zoneLimits = [];
      this.dropIds.forEach(function(id) {
        var zone = {};
        var ele = document.getElementById(id);
        var width = ele.offsetWidth;
        var height = ele.offsetHeight;
        zone.dragObject = null;
        zone.ele = ele;
        zone.position = util.getPosition(ele);
        console.log(zone.position);
        zone.position[1] = zone.position[1] + 50;
        zone.limit = [zone.position[0], zone.position[0] + width, zone.position[1], zone.position[1] + height];
        self.dropObjects.push(zone);
        self.zoneLimits.push(zone.limit);
      });
    },
    attach: function(dragObject, dropZone) {
      var obj = this.dropObjects[dropZone];
      var label = dragObject.ele.innerText;
      var slideshow = dragObject.ele.getAttribute('data-slideshow');
      // Check if the zone already has an object attached
      if (obj.dragObject) {
        obj.dragObject.reset();
        util.removeClass(obj.dragObject.ele, 'invisible');
      }
      // Attach the dragObject to the dropZone
      obj.dragObject = dragObject;
      this.storage[dropZone] = dragObject;
      util.addClass(dragObject.ele, 'invisible');
      obj.ele.innerHTML = label;
      obj.ele.setAttribute('data-slideshow', slideshow);
    },
    // Update from storage
    update: function() {
      var self = this;
      this.storage.forEach(function(obj, index) {
        if (obj) {
          self.attach(obj, index);
        }
      });
    },
    isInZone: function(x, y) {
      var zone = -1;
      this.zoneLimits.forEach(function(limit, index) {
        if (x > limit[0] && x < limit[1]) {
          if (y > limit[2] && y < limit[3]) {
            zone = index;
          }
        }
      });
      return zone;
    }
  };


}());