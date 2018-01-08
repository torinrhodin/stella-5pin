/**
 * AGNITIO FRAMEWORK MODULE - Analytics
 * This module will automatically log slide data to the Agnitio Analyzer.
 * It will look for the slide name in two places (not looking further when found):
 * - a provided JavaScript object mapping id to name,
 * - the actual slide id.
 * @author - Stefan Liden, sli@agnitio.com
 * @doc - http://docs.labs.agnitio.com/api/analytics_introduction
 */
 document.addEventListener('presentationInit', function() {

  // Send some default analytics
  function sendDefaults (version) {
    if (app.version) {
      ag.submit.data({
        unique: true,
        categoryId: "ag-001",
        category: "Versions",
        labelId: "ag-001-002",
        label: "Framework version",
        value: app.version
      });
    }
    if (version) {
      ag.submit.data({
        unique: true,
        categoryId: "ag-001",
        category: "Versions",
        labelId: "ag-001-003",
        label: "Presentation version",
        value: version
      });
    }
  }

  app.analytics = (function () {

    var map = null,
        version = null,
        excludedContent = [],
        excluded = [],
        offsetChapter = 0;

    /**
     * Initialize analytics
     * @public
     * @param config OBJECT Configure the analytics
     *  -map OBJECT Map to translate ids to custom strings
     *  -offsetChapters INT Number of path items to offset to get chapter
     *  -excludeContent ARRAY List of content that should not be included
     *  -excludeSlides ARRAY List of slides to exclude from analytics
     */
    function init (config) {
      if (window.ag) {
        config = config || {};
        map = config.map || {};
        version = config.version || null;
        offsetChapter = config.offsetChapters || 0;
        excludedContent = config.excludeContent || [];
        excluded = config.excludeSlides || [];
        sendDefaults(version);
        log(excludedContent);
        // Make sure we can check against app.json info
        if (!app.json) app.json = {structures: {}};
      }
      else {
        throw new Error('The Agnitio Content API is required to collect analytic data');
      }
    }

    /**
     * Assign correct id or name
     * Get correct id and name for chapter, subchapter and slide
     * Lookup order:
     * 1. map[id]
     * 2. app.json[type]['name']
     * 3. id
     * @private
     * @param id STRING Id of structure to find label for
     * @param jsonType STRING Either 'slides' or 'structures'
     * @param idOrName STRING Either 'id' or 'name'
     */
    function assignLabel (id, jsonType, idOrName) {
      var val;

      // Make sure we can have slides without chapters
      if (!id) return null;

      if (map[id] && map[id][idOrName]) {
        return map[id][idOrName];
      }
      else if (app.json[jsonType] && idOrName === 'name') {
        return app.json[jsonType][id]['name'];
      }

      return id;
    }

    /**
     * Save chapter/subchapter/slide to Agnitio Analytics
     * @private
     */
    function save () {
      var sPath = app.getPath(),
          path = sPath.split('/'),
          ln = path.length,
          sIndex = app.slideshow.currentIndex + 1,
          offset = offsetChapter,
          lnOffset = ln - offset,
          chapter = subchapter = null,
          slide = path[ln - 1];

      // If slide has been excluded, then skip.
      if (excluded.indexOf(slide) !== -1) {
        return;
      }

      // Full path: chapter/subchapter/slide
      if (lnOffset >= 3) {
        chapter = path[1 + offset];
        // Chapter only: chapter/slide
        if (lnOffset >= 4) {
          subchapter = path[2 + offset];
        }
      }
      // console.log(chapter + ' ' + subchapter + ' ' + slide);

      // Finally use Agnitio monitoring API to submit
      ag.submit.slide({
        id: assignLabel(slide, 'slides', 'id'),
        name: assignLabel(slide, 'slides', 'name'),
        chapterId: assignLabel(chapter, 'structures', 'id'),
        chapter: assignLabel(chapter, 'structures', 'name'),
        subChapterId: assignLabel(subchapter, 'structures', 'id'),
        subChapter: assignLabel(subchapter, 'structures', 'name'),
        slideIndex: sIndex,
        path: sPath
      });
    }


    /**
     * Set eventlistener for slideEnter
     * @private
     */
    function log (exclude) {
      // Only log slides for certain content if exclude is given
      if (exclude.length > 0) {
        document.addEventListener('contentLoad' ,function () {
          var loaded = app.loaded.id;
          if (exclude.indexOf(loaded) !== -1) {
            document.removeEventListener('slideEnter', save);
          }
          else {
            document.addEventListener('slideEnter', save);
          }
        });
      }
      // Always log slides
      else {
        document.addEventListener('slideEnter', save);
      }
    }

    // Public API
    return {
      init: init
    }
  }()); // End app.analytics

 });