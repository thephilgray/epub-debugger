// plugin boilerplate: https://vanillajstoolkit.com/boilerplates/revealing-module-pattern/user-options/

var epubdebugger = (function() {
  /* Variables */
  var publicAPIs = {};
  var elements = {};
  var defaults = { el: 'body' };
  var settings;
  var wrapper;

  // constants
  var debugger__logger = 'debugger__logger';
  var debugger__textarea = 'debugger__textarea';
  var debugger__evalButton = 'debugger__evalButton';
  var debugger__btn = 'debugger__btn';
  var debugger__console = 'debugger__console';
  var debugger__input = 'debugger__input';
  var debugger__main = 'debugger__main';
  var debugger__title = 'debugger__title';
  var debugger__headerLeft = 'debugger__headerLeft';
  var debugger__closeButton = 'debugger__closeButton';
  var debugger__expandButton = 'debugger__expandButton';
  var debugger__headerRight = 'debugger__headerRight';
  var debugger__header = 'debugger__header';
  var debugger__wrapper = 'debugger';

  /*!
   * Merge two or more objects together.
   * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
   * @param   {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
   * @param   {Object}   objects  The objects to merge together
   * @returns {Object}            Merged values of defaults and options
   */
  var extend = function() {
    // Variables
    var extended = {};
    var deep = false;
    var i = 0;

    // Check if a deep merge
    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
      deep = arguments[0];
      i++;
    }

    // Merge the object into the extended object
    var merge = function(obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          // If property is an object, merge properties
          if (
            deep &&
            Object.prototype.toString.call(obj[prop]) === '[object Object]'
          ) {
            extended[prop] = extend(extended[prop], obj[prop]);
          } else {
            extended[prop] = obj[prop];
          }
        }
      }
    };

    // Loop through each object and conduct a merge
    for (; i < arguments.length; i++) {
      var obj = arguments[i];
      merge(obj);
    }

    return extended;
  };
  /* createElement, inspired by React's top-level api
   *
   * @param  {String} name
   * @param  {String} type
   * @param  {Array} props array of key/value pairs
   * @param  {Array} children
   */
  var createElement = function(name, type, props, children) {
    if (!type) {
      type = 'div';
    }
    var el = document.createElement(type);
    el.id = name;

    if (props) {
      for (var i = 0; i < props.length; i++) {
        el.setAttribute(props[i][0], props[i][1]);
      }
    }

    if (children) {
      for (var i = 0; i < children.length; i++) {
        if (typeof children[i] === 'string') {
          var textNode = document.createTextNode(children[i]);
          el.appendChild(textNode);
        } else if (
          typeof children[i] === 'object' &&
          children[i] instanceof HTMLElement
        ) {
          el.appendChild(children[i]);
        }
      }
    }
    elements[name] = el;
  };

  var initDOM = function() {
    createElement(debugger__logger, 'ul', [['class', debugger__logger]]);

    createElement(debugger__textarea, 'textarea', [
      ['class', debugger__textarea]
    ]);
    createElement(
      debugger__evalButton,
      'button',
      [['class', debugger__btn]],
      ['EVAL']
    );

    createElement(
      debugger__console,
      'div',
      [['class', debugger__console]],
      [elements[debugger__logger]]
    );
    createElement(
      debugger__input,
      'div',
      [['class', debugger__input]],
      [elements[debugger__textarea], elements[debugger__evalButton]]
    );

    createElement(
      debugger__main,
      'div',
      [['class', debugger__main]],
      [elements[debugger__console], elements[debugger__input]]
    );

    createElement(
      debugger__title,
      'p',
      [['class', debugger__title]],
      'Console'
    );
    createElement(
      debugger__headerLeft,
      'div',
      [['class', debugger__headerLeft]],
      [elements[debugger__title]]
    );

    createElement(
      debugger__closeButton,
      'button',
      [['class', debugger__btn]],
      ['X']
    );
    createElement(
      debugger__expandButton,
      'button',
      [['class', debugger__btn]],
      [' ^ ']
    );
    createElement(
      debugger__headerRight,
      'div',
      [['class', debugger__headerRight]],
      [elements[debugger__closeButton], elements[debugger__expandButton]]
    );

    createElement(
      debugger__header,
      'div',
      [['class', debugger__header]],
      [elements[debugger__headerLeft], elements[debugger__headerRight]]
    );
    createElement(
      debugger__wrapper,
      'div',
      [['class', debugger__wrapper]],
      [elements[debugger__header], elements[debugger__main]]
    );

    wrapper.appendChild(elements[debugger__wrapper]);

    /* Inject CSS into document for convenience of only needing to drop in one file */
    // source: https://stackoverflow.com/questions/524696/how-to-create-a-style-tag-with-javascript
    // TODO: integrate with build process

    var css =
      '.debugger{width:100%;background:rgba(0,0,0,0.8);box-shadow:1px 1px 1px #ddd;position:absolute;bottom:0;overflow:hidden;color:white}.debugger--closed{width:25%}.debugger .debugger__main{position:relative}.debugger--closed .debugger__main{display:none}.debugger__header{height:20px;box-shadow:1px 1px 1px #ddd;position:relative;display:flex;padding:0.5em 0.25em 0.5em 0.5em;justify-content:center;align-items:center;cursor:pointer}.debugger__headerRight{margin-left:auto}.debugger__btn{padding:0.25em 0.5em;text-align:center;box-shadow:1px 1px 1px #ddd;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.debugger__btn:hover{cursor:pointer}.debugger--closed #debugger__closeButton{display:none}.debugger #debugger__expandButton{display:none}.debugger--closed #debugger__expandButton{display:block}.debugger__console{width:100%;height:200px;overflow:scroll}.debugger__console::-webkit-scrollbar{width:0.5em}.debugger__console::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px rgba(255,255,255,0.3)}.debugger__console::-webkit-scrollbar-thumb{background-color:darkgrey;outline:1px solid slategrey}.debugger__logger{margin:0;padding:0;padding:2em;font-family:monospace}.debugger__logger pre{overflow-wrap:break-word}.debugger__input{width:100%;bottom:0;display:flex}.debugger__input textarea{width:75%;padding:1em;position:relative;float:left;font-family:monospace;resize:none}.debugger__input button{width:20%;position:relative;float:left;padding:0.75em 0}';

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
      // This is required for IE8 and below.
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
  };

  var printToConsole = function(txt) {
    var li = document.createElement('li');
    var pre = document.createElement('pre');
    pre.textContent = txt;
    li.appendChild(pre);
    elements[debugger__logger].appendChild(li);
    elements[debugger__console].scrollTop =
      elements[debugger__console].scrollHeight;
  };

  var evaluateInput = function(str) {
    printToConsole('INPUT: ' + str);
    // eval is evil, but this is for debugging purposes only; looking for alternative solutions
    var result = window.eval(str);
    var type = Object.prototype.toString.call(result);

    var resultString = '';
    if (result !== null && typeof result === 'object') {
      for (var property in result) {
        resultString += ' \n  ';
        resultString += property + ': ' + result[property];
      }

      if (type.slice(8, -1) === 'Array') {
        resultString = '\n [' + resultString + '\n ]';
      }
      if (type.slice(8, -1) === 'Object') {
        resultString = '\n {' + resultString + '\n }';
      }

      resultString = type + ', properties/values: ' + resultString;
      result = resultString;
    }
    printToConsole('EVAL: ' + result);
  };

  publicAPIs.init = function(options) {
    settings = extend(defaults, options || {});
    wrapper = document.querySelector(settings.el);
    initDOM();

    // hijack console.log
    // source: https://stackoverflow.com/questions/6455631/listening-console-log
    var originallog = console.log;

    console.log = function(txt) {
      // Do really interesting stuff
      printToConsole('LOG: ' + txt);

      originallog.apply(console, arguments);
    };

    // capture window errors
    window.onerror = function(e) {
      printToConsole('ERROR: ' + e);
    };

    elements[debugger__evalButton].addEventListener('click', function(e) {
      evaluateInput(elements[debugger__textarea].value);
    });

    function toggleDebugger() {
      var open = true;
      // Array.prototype.includes() would require polyfill
      for (var i = 0; i < elements[debugger__wrapper].classList.length; i++) {
        if (
          elements[debugger__wrapper].classList[i].indexOf('debugger--closed') >
          -1
        ) {
          open = false;
        }
      }

      if (open) {
        elements[debugger__wrapper].classList.add('debugger--closed');
        open = false;
      } else {
        elements[debugger__wrapper].classList.remove('debugger--closed');
        open = true;
      }
    }

    elements[debugger__header].addEventListener('click', toggleDebugger);
  };

  return publicAPIs;
})();

// epubdebugger.init();
