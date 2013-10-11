(function($) {
  if (window.localStorage) {

    var getKey = function(e) {
      var key = e.data("autosave");
      if (!key) {
        throw "No autosave id is defined!";
      }
      return key;
    };

    var saveOneElement = function(e) {
      localStorage[getKey(e)] = e.val();
    };

    var clearOneElement = function(e) {
      var key = getKey(e);
      if (localStorage[key]) {
        delete localStorage[key];
      }
    };

    var loadOneElement = function(e) {
      if (e.val().length === 0) {
        var content = localStorage[getKey(e)];
        if (content)
          e.val(content);
      }
    };

    var setupOneElement = function(e, options) {
      var key = getKey(e);
      var callback = options.callback || function(e) { console.log("Written", e.data("autosave")); };
      var timeout = options.timeout || 500;

      var timeoutId = null;

      e.keyup(function() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
          saveOneElement(e);
          callback(e);
        }, timeout);
      });
      loadOneElement(e);
    };

    $.fn.autosave = function(action, options) {
      options = options || {};
      if (action === "setup") {
        if (this.data("autosave")) {
          setupOneElement(this, options);
        }

        $("[data-autosave]", this).each(function(i) {
          setupOneElement($(this), options);
        });
      } else if (action === "clear") {
        if (this.data("autosave")) {
          clearOneElement(this);
        }

        $("[data-autosave]", this).each(function(i) {
          clearOneElement($(this));
        })
      } else if (action === "save") {
        if (this.data("autosave")) {
          saveOneElement(this);
        }

        $("[data-autosave]", this).each(function(i) {
          saveOneElement($(this));
        })
      } else if (action === "load") {
        if (this.data("autosave")) {
          loadOneElement(this);
        }

        $("[data-autosave]", this).each(function(i) {
          loadOneElement($(this));
        })
      }
    };
  } else {
    console.log("localStorage not available. Autosaving is disabled.");
  }
}) (jQuery);
