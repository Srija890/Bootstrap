(function() {
/**
 * @memberof Wix
 * @namespace Events
 */
var Events, custom, es5Shim, es5Sham, base64, polyFills, core, Media, utils, Utils, Styles, Theme, WindowOrigin, WindowPlacement, Base, Error, WixDataCursor, responseHandlers, Billing, Activities, Settings, WixInternalSDK, Contacts, PubSub, Worker, Dashboard, Counters, Wix;
Events = {
  /**
   * Called when a site owner toggles between preview and edit mode in the Wix Editor.
   * @memberof Wix.Events
   * @since 1.11.0
   * @example
   * {
   *   editMode: 'editor' or 'preview'
   * }
   */
  EDIT_MODE_CHANGE: 'EDIT_MODE_CHANGE',
  /**
   * Called when a user navigates (in Editor, preview or Viewer) to the page where the TPA component (Widget/Page) is.
   * @memberof Wix.Events
   * @since 1.11.0
   * @deprecated
   * @example
   * {
   *   toPage: 'mainPage',
   *   fromPage: 'cee5"'
   * }
   */
  PAGE_NAVIGATION_CHANGE: 'PAGE_NAVIGATION_CHANGE',
  /**
   * Issued when the site owner publishes the site (in editor).
   * @memberof Wix.Events
   * @since 1.13.0
   */
  SITE_PUBLISHED: 'SITE_PUBLISHED',
  /**
   * Issued when the site owner deletes (in editor) a TPA component (Widget/Page).
   * @memberof Wix.Events
   * @since 1.13.0
   */
  COMPONENT_DELETED: 'COMPONENT_DELETED',
  /**
   * Issued by the Settings endpoint when new settings are applied by the site owner.
   * @memberof Wix.Events
   * @since 1.17.0
   * @example
   * Custom JSON
   */
  SETTINGS_UPDATED: 'SETTINGS_UPDATED',
  /**
   * Signal window placement change
   * @memberof Wix.Events
   * @since 1.18.0
   */
  WINDOW_PLACEMENT_CHANGED: 'WINDOW_PLACEMENT_CHANGED',
  /**
   * @memberof Wix.Events
   * @private
   */
  ON_MESSAGE_RESPONSE: 'ON_MESSAGE_RESPONSE',
  /**
   * @memberof Wix.Events
   * @since 1.22.0
   */
  THEME_CHANGE: 'THEME_CHANGE',
  /**
   * @memberof Wix.Events
   * @since 1.22.0
   *
   */
  STYLE_PARAMS_CHANGE: 'STYLE_PARAMS_CHANGE',
  /**
   * @memberof Wix.Events
   * @since 1.25.0
   * @description
   * Issued when scroll happens inside the site (not when it happen inside the app iframe).
   * The event data contains multiple details that helps the app determine it's behaviour considering it's position in the site,
   * the browser window dimensions and a state.
   *
   *  Name          | Type      | Description
   * ---------------|-----------|------------
   * scrollTop      | `Number`  | Site's scroll position on the y axis
   * scrollLeft     | `Number`  | site's scroll position on the x axis
   * documentHeight | `Number`  | Site's document height
   * documentWidth  | `Number`  | Site's document width
   * x              | `Number`  | App offset within the site's page on the x axis (doesn't change)
   * y              | `Number`  | App offset within the site's page on the y axis (doesn't change)
   * height         | `Number`  | App height
   * width          | `Number`  | App width
   * left           | `Number`  | App top-left offset,within the viewport, from the left
   * bottom         | `Number`  | App top-left, offset within the viewport, from the bottom
   * right          | `Number`  | App top-left, offset within the viewport, from the right
   * top            | `Number`  | App top-left, offset within the viewport, from the top
   *
   * @example
   * {
   *      "scrollTop": 4,
   *      "scrollLeft": 0,
   *      "documentHeight": 724,
   *      "documentWidth": 1227,
   *      "x": 124,
   *      "y": 131,
   *      "height": 682,
   *      "width": 978,
   *      "left": 124.5,
   *      "bottom": 809,
   *      "right": 1102.5,
   *      "top": 127
   * }
   */
  SCROLL: 'SCROLL',
  /**
   * Issued on any page navigation within the Wix site.
   * @memberof Wix.Events
   * @since 1.25.0
   * @example
   * {
   *   toPage: 'mainPage',
   *   fromPage: 'cee5"'
   * }
   */
  PAGE_NAVIGATION: 'PAGE_NAVIGATION',
  /**
   * Issued on any page in navigation within the Wix site. This event is a utility event on top of the PAGE_NAVIGATION event.
   * @memberof Wix.Events
   * @since 1.25.0
   * @example
   * {
   *   toPage: 'mainPage',
   *   fromPage: 'cee5"'
   * }
   */
  PAGE_NAVIGATION_IN: 'PAGE_NAVIGATION_IN',
  /**
   * Issued on any page out navigation within the Wix site. This event is a utility event on top of the PAGE_NAVIGATION event.
   * @memberof Wix.Events
   * @since 1.25.0
   * @example
   * {
   *   toPage: 'mainPage',
   *   fromPage: 'cee5"'
   * }
   */
  PAGE_NAVIGATION_OUT: 'PAGE_NAVIGATION_OUT',
  /**
   * Issued when the site state changed.
   * @memberof Wix.Events
   * @since 1.29.0
   * @example
   * {
   *   newState: 'state'
   * }
   */
  STATE_CHANGED: 'STATE_CHANGED'
};
(function () {
  var isFunction = function (o) {
    return typeof o == 'function';
  };
  var bind, slice = [].slice, proto = Function.prototype, featureMap;
  featureMap = { 'function-bind': 'bind' };
  function has(feature) {
    var prop = featureMap[feature];
    return isFunction(proto[prop]);
  }
  // check for missing features
  if (!has('function-bind')) {
    // adapted from Mozilla Developer Network example at
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
    bind = function bind(obj) {
      var args = slice.call(arguments, 1), self = this, nop = function () {
        }, bound = function () {
          return self.apply(this instanceof nop ? this : obj || {}, args.concat(slice.call(arguments)));
        };
      nop.prototype = this.prototype || {};
      // Firefox cries sometimes if prototype is undefined
      bound.prototype = new nop();
      return bound;
    };
    proto.bind = bind;
  }
}());
custom  /*!
         * https://github.com/es-shims/es5-shim
         * @license es5-shim Copyright 2009-2014 by contributors, MIT License
         * see https://github.com/es-shims/es5-shim/blob/master/LICENSE
         */
        // vim: ts=4 sts=4 sw=4 expandtab
        //Add semicolon to prevent IIFE from being passed as argument to concatenated code.
 = undefined;
// UMD (Universal Module Definition)
// see https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
  if (true) {
    // AMD. Register as an anonymous module.
    es5Shim = function () {
      return typeof factory === 'function' ? factory() : factory;
    }();
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.returnExports = factory();
  }
}(this, function () {
  /**
   * Brings an environment as close to ECMAScript 5 compliance
   * as is possible with the facilities of erstwhile engines.
   *
   * Annotated ES5: http://es5.github.com/ (specific links below)
   * ES5 Spec: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
   * Required reading: http://javascriptweblog.wordpress.com/2011/12/05/extending-javascript-natives/
   */
  // Shortcut to an often accessed properties, in order to avoid multiple
  // dereference that costs universally.
  var ArrayPrototype = Array.prototype;
  var ObjectPrototype = Object.prototype;
  var FunctionPrototype = Function.prototype;
  var StringPrototype = String.prototype;
  var NumberPrototype = Number.prototype;
  var array_slice = ArrayPrototype.slice;
  var array_splice = ArrayPrototype.splice;
  var array_push = ArrayPrototype.push;
  var array_unshift = ArrayPrototype.unshift;
  var call = FunctionPrototype.call;
  // Having a toString local variable name breaks in Opera so use _toString.
  var _toString = ObjectPrototype.toString;
  var isFunction = function (val) {
    return ObjectPrototype.toString.call(val) === '[object Function]';
  };
  var isRegex = function (val) {
    return ObjectPrototype.toString.call(val) === '[object RegExp]';
  };
  var isArray = function isArray(obj) {
    return _toString.call(obj) === '[object Array]';
  };
  var isString = function isString(obj) {
    return _toString.call(obj) === '[object String]';
  };
  var isArguments = function isArguments(value) {
    var str = _toString.call(value);
    var isArgs = str === '[object Arguments]';
    if (!isArgs) {
      isArgs = !isArray(value) && value !== null && typeof value === 'object' && typeof value.length === 'number' && value.length >= 0 && isFunction(value.callee);
    }
    return isArgs;
  };
  var supportsDescriptors = Object.defineProperty && function () {
    try {
      Object.defineProperty({}, 'x', {});
      return true;
    } catch (e) {
      /* this is ES3 */
      return false;
    }
  }();
  // Define configurable, writable and non-enumerable props
  // if they don't exist.
  var defineProperty;
  if (supportsDescriptors) {
    defineProperty = function (object, name, method, forceAssign) {
      if (!forceAssign && name in object) {
        return;
      }
      Object.defineProperty(object, name, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: method
      });
    };
  } else {
    defineProperty = function (object, name, method, forceAssign) {
      if (!forceAssign && name in object) {
        return;
      }
      object[name] = method;
    };
  }
  var defineProperties = function (object, map, forceAssign) {
    for (var name in map) {
      if (ObjectPrototype.hasOwnProperty.call(map, name)) {
        defineProperty(object, name, map[name], forceAssign);
      }
    }
  };
  //
  // Util
  // ======
  //
  // ES5 9.4
  // http://es5.github.com/#x9.4
  // http://jsperf.com/to-integer
  function toInteger(n) {
    n = +n;
    if (n !== n) {
      // isNaN
      n = 0;
    } else if (n !== 0 && n !== 1 / 0 && n !== -(1 / 0)) {
      n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }
    return n;
  }
  function isPrimitive(input) {
    var type = typeof input;
    return input === null || type === 'undefined' || type === 'boolean' || type === 'number' || type === 'string';
  }
  function toPrimitive(input) {
    var val, valueOf, toStr;
    if (isPrimitive(input)) {
      return input;
    }
    valueOf = input.valueOf;
    if (isFunction(valueOf)) {
      val = valueOf.call(input);
      if (isPrimitive(val)) {
        return val;
      }
    }
    toStr = input.toString;
    if (isFunction(toStr)) {
      val = toStr.call(input);
      if (isPrimitive(val)) {
        return val;
      }
    }
    throw new TypeError();
  }
  // ES5 9.9
  // http://es5.github.com/#x9.9
  var toObject = function (o) {
    if (o == null) {
      // this matches both null and undefined
      throw new TypeError('can\'t convert ' + o + ' to object');
    }
    return Object(o);
  };
  var ToUint32 = function ToUint32(x) {
    return x >>> 0;
  };
  //
  // Function
  // ========
  //
  // ES-5 15.3.4.5
  // http://es5.github.com/#x15.3.4.5
  function Empty() {
  }
  defineProperties(FunctionPrototype, {
    bind: function bind(that) {
      // .length is 1
      // 1. Let Target be the this value.
      var target = this;
      // 2. If IsCallable(Target) is false, throw a TypeError exception.
      if (!isFunction(target)) {
        throw new TypeError('Function.prototype.bind called on incompatible ' + target);
      }
      // 3. Let A be a new (possibly empty) internal list of all of the
      //   argument values provided after thisArg (arg1, arg2 etc), in order.
      // XXX slicedArgs will stand in for "A" if used
      var args = array_slice.call(arguments, 1);
      // for normal call
      // 4. Let F be a new native ECMAScript object.
      // 11. Set the [[Prototype]] internal property of F to the standard
      //   built-in Function prototype object as specified in 15.3.3.1.
      // 12. Set the [[Call]] internal property of F as described in
      //   15.3.4.5.1.
      // 13. Set the [[Construct]] internal property of F as described in
      //   15.3.4.5.2.
      // 14. Set the [[HasInstance]] internal property of F as described in
      //   15.3.4.5.3.
      var binder = function () {
        if (this instanceof bound) {
          // 15.3.4.5.2 [[Construct]]
          // When the [[Construct]] internal method of a function object,
          // F that was created using the bind function is called with a
          // list of arguments ExtraArgs, the following steps are taken:
          // 1. Let target be the value of F's [[TargetFunction]]
          //   internal property.
          // 2. If target has no [[Construct]] internal method, a
          //   TypeError exception is thrown.
          // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
          //   property.
          // 4. Let args be a new list containing the same values as the
          //   list boundArgs in the same order followed by the same
          //   values as the list ExtraArgs in the same order.
          // 5. Return the result of calling the [[Construct]] internal
          //   method of target providing args as the arguments.
          var result = target.apply(this, args.concat(array_slice.call(arguments)));
          if (Object(result) === result) {
            return result;
          }
          return this;
        } else {
          // 15.3.4.5.1 [[Call]]
          // When the [[Call]] internal method of a function object, F,
          // which was created using the bind function is called with a
          // this value and a list of arguments ExtraArgs, the following
          // steps are taken:
          // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
          //   property.
          // 2. Let boundThis be the value of F's [[BoundThis]] internal
          //   property.
          // 3. Let target be the value of F's [[TargetFunction]] internal
          //   property.
          // 4. Let args be a new list containing the same values as the
          //   list boundArgs in the same order followed by the same
          //   values as the list ExtraArgs in the same order.
          // 5. Return the result of calling the [[Call]] internal method
          //   of target providing boundThis as the this value and
          //   providing args as the arguments.
          // equiv: target.call(this, ...boundArgs, ...args)
          return target.apply(that, args.concat(array_slice.call(arguments)));
        }
      };
      // 15. If the [[Class]] internal property of Target is "Function", then
      //     a. Let L be the length property of Target minus the length of A.
      //     b. Set the length own property of F to either 0 or L, whichever is
      //       larger.
      // 16. Else set the length own property of F to 0.
      var boundLength = Math.max(0, target.length - args.length);
      // 17. Set the attributes of the length own property of F to the values
      //   specified in 15.3.5.1.
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
      }
      // XXX Build a dynamic function with desired amount of arguments is the only
      // way to set the length property of a function.
      // In environments where Content Security Policies enabled (Chrome extensions,
      // for ex.) all use of eval or Function costructor throws an exception.
      // However in all of these environments Function.prototype.bind exists
      // and so this code will never be executed.
      var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){return binder.apply(this,arguments)}')(binder);
      if (target.prototype) {
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        // Clean up dangling references.
        Empty.prototype = null;
      }
      // TODO
      // 18. Set the [[Extensible]] internal property of F to true.
      // TODO
      // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
      // 20. Call the [[DefineOwnProperty]] internal method of F with
      //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
      //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
      //   false.
      // 21. Call the [[DefineOwnProperty]] internal method of F with
      //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
      //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
      //   and false.
      // TODO
      // NOTE Function objects created using Function.prototype.bind do not
      // have a prototype property or the [[Code]], [[FormalParameters]], and
      // [[Scope]] internal properties.
      // XXX can't delete prototype in pure-js.
      // 22. Return F.
      return bound;
    }
  });
  // _Please note: Shortcuts are defined after `Function.prototype.bind` as we
  // us it in defining shortcuts.
  var owns = call.bind(ObjectPrototype.hasOwnProperty);
  // If JS engine supports accessors creating shortcuts.
  var defineGetter;
  var defineSetter;
  var lookupGetter;
  var lookupSetter;
  var supportsAccessors;
  if (supportsAccessors = owns(ObjectPrototype, '__defineGetter__')) {
    defineGetter = call.bind(ObjectPrototype.__defineGetter__);
    defineSetter = call.bind(ObjectPrototype.__defineSetter__);
    lookupGetter = call.bind(ObjectPrototype.__lookupGetter__);
    lookupSetter = call.bind(ObjectPrototype.__lookupSetter__);
  }
  //
  // Array
  // =====
  //
  // ES5 15.4.4.12
  // http://es5.github.com/#x15.4.4.12
  var spliceNoopReturnsEmptyArray = function () {
    var a = [
      1,
      2
    ];
    var result = a.splice();
    return a.length === 2 && isArray(result) && result.length === 0;
  }();
  defineProperties(ArrayPrototype, {
    // Safari 5.0 bug where .splice() returns undefined
    splice: function splice(start, deleteCount) {
      if (arguments.length === 0) {
        return [];
      } else {
        return array_splice.apply(this, arguments);
      }
    }
  }, spliceNoopReturnsEmptyArray);
  var spliceWorksWithEmptyObject = function () {
    var obj = {};
    ArrayPrototype.splice.call(obj, 0, 0, 1);
    return obj.length === 1;
  }();
  defineProperties(ArrayPrototype, {
    splice: function splice(start, deleteCount) {
      if (arguments.length === 0) {
        return [];
      }
      var args = arguments;
      this.length = Math.max(toInteger(this.length), 0);
      if (arguments.length > 0 && typeof deleteCount !== 'number') {
        args = array_slice.call(arguments);
        if (args.length < 2) {
          args.push(this.length - start);
        } else {
          args[1] = toInteger(deleteCount);
        }
      }
      return array_splice.apply(this, args);
    }
  }, !spliceWorksWithEmptyObject);
  // ES5 15.4.4.12
  // http://es5.github.com/#x15.4.4.13
  // Return len+argCount.
  // [bugfix, ielt8]
  // IE < 8 bug: [].unshift(0) === undefined but should be "1"
  var hasUnshiftReturnValueBug = [].unshift(0) !== 1;
  defineProperties(ArrayPrototype, {
    unshift: function () {
      array_unshift.apply(this, arguments);
      return this.length;
    }
  }, hasUnshiftReturnValueBug);
  // ES5 15.4.3.2
  // http://es5.github.com/#x15.4.3.2
  // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
  defineProperties(Array, { isArray: isArray });
  // The IsCallable() check in the Array functions
  // has been replaced with a strict check on the
  // internal class of the object to trap cases where
  // the provided function was actually a regular
  // expression literal, which in V8 and
  // JavaScriptCore is a typeof "function".  Only in
  // V8 are regular expression literals permitted as
  // reduce parameters, so it is desirable in the
  // general case for the shim to match the more
  // strict and common behavior of rejecting regular
  // expressions.
  // ES5 15.4.4.18
  // http://es5.github.com/#x15.4.4.18
  // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/forEach
  // Check failure of by-index access of string characters (IE < 9)
  // and failure of `0 in boxedString` (Rhino)
  var boxedString = Object('a');
  var splitString = boxedString[0] !== 'a' || !(0 in boxedString);
  var properlyBoxesContext = function properlyBoxed(method) {
    // Check node 0.6.21 bug where third parameter is not boxed
    var properlyBoxesNonStrict = true;
    var properlyBoxesStrict = true;
    if (method) {
      method.call('foo', function (_, __, context) {
        if (typeof context !== 'object') {
          properlyBoxesNonStrict = false;
        }
      });
      method.call([1], function () {
        
        properlyBoxesStrict = typeof this === 'string';
      }, 'x');
    }
    return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
  };
  defineProperties(ArrayPrototype, {
    forEach: function forEach(fun) {
      var object = toObject(this), self = splitString && isString(this) ? this.split('') : object, thisp = arguments[1], i = -1, length = self.length >>> 0;
      // If no callback function or if callback is not a callable function
      if (!isFunction(fun)) {
        throw new TypeError();  // TODO message
      }
      while (++i < length) {
        if (i in self) {
          // Invoke the callback function with call, passing arguments:
          // context, property value, property key, thisArg object
          // context
          fun.call(thisp, self[i], i, object);
        }
      }
    }
  }, !properlyBoxesContext(ArrayPrototype.forEach));
  // ES5 15.4.4.19
  // http://es5.github.com/#x15.4.4.19
  // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
  defineProperties(ArrayPrototype, {
    map: function map(fun) {
      var object = toObject(this), self = splitString && isString(this) ? this.split('') : object, length = self.length >>> 0, result = Array(length), thisp = arguments[1];
      // If no callback function or if callback is not a callable function
      if (!isFunction(fun)) {
        throw new TypeError(fun + ' is not a function');
      }
      for (var i = 0; i < length; i++) {
        if (i in self) {
          result[i] = fun.call(thisp, self[i], i, object);
        }
      }
      return result;
    }
  }, !properlyBoxesContext(ArrayPrototype.map));
  // ES5 15.4.4.20
  // http://es5.github.com/#x15.4.4.20
  // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter
  defineProperties(ArrayPrototype, {
    filter: function filter(fun) {
      var object = toObject(this), self = splitString && isString(this) ? this.split('') : object, length = self.length >>> 0, result = [], value, thisp = arguments[1];
      // If no callback function or if callback is not a callable function
      if (!isFunction(fun)) {
        throw new TypeError(fun + ' is not a function');
      }
      for (var i = 0; i < length; i++) {
        if (i in self) {
          value = self[i];
          if (fun.call(thisp, value, i, object)) {
            result.push(value);
          }
        }
      }
      return result;
    }
  }, !properlyBoxesContext(ArrayPrototype.filter));
  // ES5 15.4.4.16
  // http://es5.github.com/#x15.4.4.16
  // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
  defineProperties(ArrayPrototype, {
    every: function every(fun) {
      var object = toObject(this), self = splitString && isString(this) ? this.split('') : object, length = self.length >>> 0, thisp = arguments[1];
      // If no callback function or if callback is not a callable function
      if (!isFunction(fun)) {
        throw new TypeError(fun + ' is not a function');
      }
      for (var i = 0; i < length; i++) {
        if (i in self && !fun.call(thisp, self[i], i, object)) {
          return false;
        }
      }
      return true;
    }
  }, !properlyBoxesContext(ArrayPrototype.every));
  // ES5 15.4.4.17
  // http://es5.github.com/#x15.4.4.17
  // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
  defineProperties(ArrayPrototype, {
    some: function some(fun) {
      var object = toObject(this), self = splitString && isString(this) ? this.split('') : object, length = self.length >>> 0, thisp = arguments[1];
      // If no callback function or if callback is not a callable function
      if (!isFunction(fun)) {
        throw new TypeError(fun + ' is not a function');
      }
      for (var i = 0; i < length; i++) {
        if (i in self && fun.call(thisp, self[i], i, object)) {
          return true;
        }
      }
      return false;
    }
  }, !properlyBoxesContext(ArrayPrototype.some));
  // ES5 15.4.4.21
  // http://es5.github.com/#x15.4.4.21
  // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce
  var reduceCoercesToObject = false;
  if (ArrayPrototype.reduce) {
    reduceCoercesToObject = typeof ArrayPrototype.reduce.call('es5', function (_, __, ___, list) {
      return list;
    }) === 'object';
  }
  defineProperties(ArrayPrototype, {
    reduce: function reduce(fun) {
      var object = toObject(this), self = splitString && isString(this) ? this.split('') : object, length = self.length >>> 0;
      // If no callback function or if callback is not a callable function
      if (!isFunction(fun)) {
        throw new TypeError(fun + ' is not a function');
      }
      // no value to return if no initial value and an empty array
      if (!length && arguments.length === 1) {
        throw new TypeError('reduce of empty array with no initial value');
      }
      var i = 0;
      var result;
      if (arguments.length >= 2) {
        result = arguments[1];
      } else {
        do {
          if (i in self) {
            result = self[i++];
            break;
          }
          // if array contains no values, no initial value to return
          if (++i >= length) {
            throw new TypeError('reduce of empty array with no initial value');
          }
        } while (true);
      }
      for (; i < length; i++) {
        if (i in self) {
          result = fun.call(void 0, result, self[i], i, object);
        }
      }
      return result;
    }
  }, !reduceCoercesToObject);
  // ES5 15.4.4.22
  // http://es5.github.com/#x15.4.4.22
  // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight
  var reduceRightCoercesToObject = false;
  if (ArrayPrototype.reduceRight) {
    reduceRightCoercesToObject = typeof ArrayPrototype.reduceRight.call('es5', function (_, __, ___, list) {
      return list;
    }) === 'object';
  }
  defineProperties(ArrayPrototype, {
    reduceRight: function reduceRight(fun) {
      var object = toObject(this), self = splitString && isString(this) ? this.split('') : object, length = self.length >>> 0;
      // If no callback function or if callback is not a callable function
      if (!isFunction(fun)) {
        throw new TypeError(fun + ' is not a function');
      }
      // no value to return if no initial value, empty array
      if (!length && arguments.length === 1) {
        throw new TypeError('reduceRight of empty array with no initial value');
      }
      var result, i = length - 1;
      if (arguments.length >= 2) {
        result = arguments[1];
      } else {
        do {
          if (i in self) {
            result = self[i--];
            break;
          }
          // if array contains no values, no initial value to return
          if (--i < 0) {
            throw new TypeError('reduceRight of empty array with no initial value');
          }
        } while (true);
      }
      if (i < 0) {
        return result;
      }
      do {
        if (i in self) {
          result = fun.call(void 0, result, self[i], i, object);
        }
      } while (i--);
      return result;
    }
  }, !reduceRightCoercesToObject);
  // ES5 15.4.4.14
  // http://es5.github.com/#x15.4.4.14
  // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
  var hasFirefox2IndexOfBug = Array.prototype.indexOf && [
    0,
    1
  ].indexOf(1, 2) !== -1;
  defineProperties(ArrayPrototype, {
    indexOf: function indexOf(sought) {
      var self = splitString && isString(this) ? this.split('') : toObject(this), length = self.length >>> 0;
      if (!length) {
        return -1;
      }
      var i = 0;
      if (arguments.length > 1) {
        i = toInteger(arguments[1]);
      }
      // handle negative indices
      i = i >= 0 ? i : Math.max(0, length + i);
      for (; i < length; i++) {
        if (i in self && self[i] === sought) {
          return i;
        }
      }
      return -1;
    }
  }, hasFirefox2IndexOfBug);
  // ES5 15.4.4.15
  // http://es5.github.com/#x15.4.4.15
  // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
  var hasFirefox2LastIndexOfBug = Array.prototype.lastIndexOf && [
    0,
    1
  ].lastIndexOf(0, -3) !== -1;
  defineProperties(ArrayPrototype, {
    lastIndexOf: function lastIndexOf(sought) {
      var self = splitString && isString(this) ? this.split('') : toObject(this), length = self.length >>> 0;
      if (!length) {
        return -1;
      }
      var i = length - 1;
      if (arguments.length > 1) {
        i = Math.min(i, toInteger(arguments[1]));
      }
      // handle negative indices
      i = i >= 0 ? i : length - Math.abs(i);
      for (; i >= 0; i--) {
        if (i in self && sought === self[i]) {
          return i;
        }
      }
      return -1;
    }
  }, hasFirefox2LastIndexOfBug);
  //
  // Object
  // ======
  //
  // ES5 15.2.3.14
  // http://es5.github.com/#x15.2.3.14
  // http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
  var hasDontEnumBug = !{ 'toString': null }.propertyIsEnumerable('toString'), hasProtoEnumBug = function () {
    }.propertyIsEnumerable('prototype'), dontEnums = [
      'toString',
      'toLocaleString',
      'valueOf',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'constructor'
    ], dontEnumsLength = dontEnums.length;
  defineProperties(Object, {
    keys: function keys(object) {
      var isFn = isFunction(object), isArgs = isArguments(object), isObject = object !== null && typeof object === 'object', isStr = isObject && isString(object);
      if (!isObject && !isFn && !isArgs) {
        throw new TypeError('Object.keys called on a non-object');
      }
      var theKeys = [];
      var skipProto = hasProtoEnumBug && isFn;
      if (isStr || isArgs) {
        for (var i = 0; i < object.length; ++i) {
          theKeys.push(String(i));
        }
      } else {
        for (var name in object) {
          if (!(skipProto && name === 'prototype') && owns(object, name)) {
            theKeys.push(String(name));
          }
        }
      }
      if (hasDontEnumBug) {
        var ctor = object.constructor, skipConstructor = ctor && ctor.prototype === object;
        for (var j = 0; j < dontEnumsLength; j++) {
          var dontEnum = dontEnums[j];
          if (!(skipConstructor && dontEnum === 'constructor') && owns(object, dontEnum)) {
            theKeys.push(dontEnum);
          }
        }
      }
      return theKeys;
    }
  });
  var keysWorksWithArguments = Object.keys && function () {
    // Safari 5.0 bug
    return Object.keys(arguments).length === 2;
  }(1, 2);
  var originalKeys = Object.keys;
  defineProperties(Object, {
    keys: function keys(object) {
      if (isArguments(object)) {
        return originalKeys(ArrayPrototype.slice.call(object));
      } else {
        return originalKeys(object);
      }
    }
  }, !keysWorksWithArguments);
  //
  // Date
  // ====
  //
  // ES5 15.9.5.43
  // http://es5.github.com/#x15.9.5.43
  // This function returns a String value represent the instance in time
  // represented by this Date object. The format of the String is the Date Time
  // string format defined in 15.9.1.15. All fields are present in the String.
  // The time zone is always UTC, denoted by the suffix Z. If the time value of
  // this object is not a finite Number a RangeError exception is thrown.
  var negativeDate = -62198755200000;
  var negativeYearString = '-000001';
  var hasNegativeDateBug = Date.prototype.toISOString && new Date(negativeDate).toISOString().indexOf(negativeYearString) === -1;
  defineProperties(Date.prototype, {
    toISOString: function toISOString() {
      var result, length, value, year, month;
      if (!isFinite(this)) {
        throw new RangeError('Date.prototype.toISOString called on non-finite value.');
      }
      year = this.getUTCFullYear();
      month = this.getUTCMonth();
      // see https://github.com/es-shims/es5-shim/issues/111
      year += Math.floor(month / 12);
      month = (month % 12 + 12) % 12;
      // the date time string format is specified in 15.9.1.15.
      result = [
        month + 1,
        this.getUTCDate(),
        this.getUTCHours(),
        this.getUTCMinutes(),
        this.getUTCSeconds()
      ];
      year = (year < 0 ? '-' : year > 9999 ? '+' : '') + ('00000' + Math.abs(year)).slice(0 <= year && year <= 9999 ? -4 : -6);
      length = result.length;
      while (length--) {
        value = result[length];
        // pad months, days, hours, minutes, and seconds to have two
        // digits.
        if (value < 10) {
          result[length] = '0' + value;
        }
      }
      // pad milliseconds to have three digits.
      return year + '-' + result.slice(0, 2).join('-') + 'T' + result.slice(2).join(':') + '.' + ('000' + this.getUTCMilliseconds()).slice(-3) + 'Z';
    }
  }, hasNegativeDateBug);
  // ES5 15.9.5.44
  // http://es5.github.com/#x15.9.5.44
  // This function provides a String representation of a Date object for use by
  // JSON.stringify (15.12.3).
  var dateToJSONIsSupported = false;
  try {
    dateToJSONIsSupported = Date.prototype.toJSON && new Date(NaN).toJSON() === null && new Date(negativeDate).toJSON().indexOf(negativeYearString) !== -1 && Date.prototype.toJSON.call({
      // generic
      toISOString: function () {
        return true;
      }
    });
  } catch (e) {
  }
  if (!dateToJSONIsSupported) {
    Date.prototype.toJSON = function toJSON(key) {
      // When the toJSON method is called with argument key, the following
      // steps are taken:
      // 1.  Let O be the result of calling ToObject, giving it the this
      // value as its argument.
      // 2. Let tv be toPrimitive(O, hint Number).
      var o = Object(this), tv = toPrimitive(o), toISO;
      // 3. If tv is a Number and is not finite, return null.
      if (typeof tv === 'number' && !isFinite(tv)) {
        return null;
      }
      // 4. Let toISO be the result of calling the [[Get]] internal method of
      // O with argument "toISOString".
      toISO = o.toISOString;
      // 5. If IsCallable(toISO) is false, throw a TypeError exception.
      if (typeof toISO !== 'function') {
        throw new TypeError('toISOString property is not callable');
      }
      // 6. Return the result of calling the [[Call]] internal method of
      //  toISO with O as the this value and an empty argument list.
      return toISO.call(o);  // NOTE 1 The argument is ignored.
                             // NOTE 2 The toJSON function is intentionally generic; it does not
                             // require that its this value be a Date object. Therefore, it can be
                             // transferred to other kinds of objects for use as a method. However,
                             // it does require that any such object have a toISOString method. An
                             // object is free to use the argument key to filter its
                             // stringification.
    };
  }
  // ES5 15.9.4.2
  // http://es5.github.com/#x15.9.4.2
  // based on work shared by Daniel Friesen (dantman)
  // http://gist.github.com/303249
  var supportsExtendedYears = Date.parse('+033658-09-27T01:46:40.000Z') === 1000000000000000;
  var acceptsInvalidDates = !isNaN(Date.parse('2012-04-04T24:00:00.500Z')) || !isNaN(Date.parse('2012-11-31T23:59:59.000Z'));
  var doesNotParseY2KNewYear = isNaN(Date.parse('2000-01-01T00:00:00.000Z'));
  if (!Date.parse || doesNotParseY2KNewYear || acceptsInvalidDates || !supportsExtendedYears) {
    // XXX global assignment won't work in embeddings that use
    // an alternate object for the context.
    Date = function (NativeDate) {
      // Date.length === 7
      function Date(Y, M, D, h, m, s, ms) {
        var length = arguments.length;
        if (this instanceof NativeDate) {
          var date = length === 1 && String(Y) === Y ? // isString(Y)
          // We explicitly pass it through parse:
          new NativeDate(Date.parse(Y)) : // We have to manually make calls depending on argument
          // length here
          length >= 7 ? new NativeDate(Y, M, D, h, m, s, ms) : length >= 6 ? new NativeDate(Y, M, D, h, m, s) : length >= 5 ? new NativeDate(Y, M, D, h, m) : length >= 4 ? new NativeDate(Y, M, D, h) : length >= 3 ? new NativeDate(Y, M, D) : length >= 2 ? new NativeDate(Y, M) : length >= 1 ? new NativeDate(Y) : new NativeDate();
          // Prevent mixups with unfixed Date object
          date.constructor = Date;
          return date;
        }
        return NativeDate.apply(this, arguments);
      }
      // 15.9.1.15 Date Time String Format.
      var isoDateExpression = new RegExp('^' + '(\\d{4}|[+-]\\d{6})' + // four-digit year capture or sign +
      // 6-digit extended year
      '(?:-(\\d{2})' + // optional month capture
      '(?:-(\\d{2})' + // optional day capture
      '(?:' + // capture hours:minutes:seconds.milliseconds
      'T(\\d{2})' + // hours capture
      ':(\\d{2})' + // minutes capture
      '(?:' + // optional :seconds.milliseconds
      ':(\\d{2})' + // seconds capture
      '(?:(\\.\\d{1,}))?' + // milliseconds capture
      ')?' + '(' + // capture UTC offset component
      'Z|' + // UTC capture
      '(?:' + // offset specifier +/-hours:minutes
      '([-+])' + // sign capture
      '(\\d{2})' + // hours offset capture
      ':(\\d{2})' + // minutes offset capture
      ')' + ')?)?)?)?' + '$');
      var months = [
        0,
        31,
        59,
        90,
        120,
        151,
        181,
        212,
        243,
        273,
        304,
        334,
        365
      ];
      function dayFromMonth(year, month) {
        var t = month > 1 ? 1 : 0;
        return months[month] + Math.floor((year - 1969 + t) / 4) - Math.floor((year - 1901 + t) / 100) + Math.floor((year - 1601 + t) / 400) + 365 * (year - 1970);
      }
      function toUTC(t) {
        return Number(new NativeDate(1970, 0, 1, 0, 0, 0, t));
      }
      // Copy any custom methods a 3rd party library may have added
      for (var key in NativeDate) {
        Date[key] = NativeDate[key];
      }
      // Copy "native" methods explicitly; they may be non-enumerable
      Date.now = NativeDate.now;
      Date.UTC = NativeDate.UTC;
      Date.prototype = NativeDate.prototype;
      Date.prototype.constructor = Date;
      // Upgrade Date.parse to handle simplified ISO 8601 strings
      Date.parse = function parse(string) {
        var match = isoDateExpression.exec(string);
        if (match) {
          // parse months, days, hours, minutes, seconds, and milliseconds
          // provide default values if necessary
          // parse the UTC offset component
          var year = Number(match[1]), month = Number(match[2] || 1) - 1, day = Number(match[3] || 1) - 1, hour = Number(match[4] || 0), minute = Number(match[5] || 0), second = Number(match[6] || 0), millisecond = Math.floor(Number(match[7] || 0) * 1000),
            // When time zone is missed, local offset should be used
            // (ES 5.1 bug)
            // see https://bugs.ecmascript.org/show_bug.cgi?id=112
            isLocalTime = Boolean(match[4] && !match[8]), signOffset = match[9] === '-' ? 1 : -1, hourOffset = Number(match[10] || 0), minuteOffset = Number(match[11] || 0), result;
          if (hour < (minute > 0 || second > 0 || millisecond > 0 ? 24 : 25) && minute < 60 && second < 60 && millisecond < 1000 && month > -1 && month < 12 && hourOffset < 24 && minuteOffset < 60 && // detect invalid offsets
            day > -1 && day < dayFromMonth(year, month + 1) - dayFromMonth(year, month)) {
            result = ((dayFromMonth(year, month) + day) * 24 + hour + hourOffset * signOffset) * 60;
            result = ((result + minute + minuteOffset * signOffset) * 60 + second) * 1000 + millisecond;
            if (isLocalTime) {
              result = toUTC(result);
            }
            if (-8640000000000000 <= result && result <= 8640000000000000) {
              return result;
            }
          }
          return NaN;
        }
        return NativeDate.parse.apply(this, arguments);
      };
      return Date;
    }(Date);
  }
  // ES5 15.9.4.4
  // http://es5.github.com/#x15.9.4.4
  if (!Date.now) {
    Date.now = function now() {
      return new Date().getTime();
    };
  }
  //
  // Number
  // ======
  //
  // ES5.1 15.7.4.5
  // http://es5.github.com/#x15.7.4.5
  var hasToFixedBugs = NumberPrototype.toFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000100..toFixed(0) !== '1000000000000000128');
  var toFixedHelpers = {
    base: 10000000,
    size: 6,
    data: [
      0,
      0,
      0,
      0,
      0,
      0
    ],
    multiply: function multiply(n, c) {
      var i = -1;
      while (++i < toFixedHelpers.size) {
        c += n * toFixedHelpers.data[i];
        toFixedHelpers.data[i] = c % toFixedHelpers.base;
        c = Math.floor(c / toFixedHelpers.base);
      }
    },
    divide: function divide(n) {
      var i = toFixedHelpers.size, c = 0;
      while (--i >= 0) {
        c += toFixedHelpers.data[i];
        toFixedHelpers.data[i] = Math.floor(c / n);
        c = c % n * toFixedHelpers.base;
      }
    },
    numToString: function numToString() {
      var i = toFixedHelpers.size;
      var s = '';
      while (--i >= 0) {
        if (s !== '' || i === 0 || toFixedHelpers.data[i] !== 0) {
          var t = String(toFixedHelpers.data[i]);
          if (s === '') {
            s = t;
          } else {
            s += '0000000'.slice(0, 7 - t.length) + t;
          }
        }
      }
      return s;
    },
    pow: function pow(x, n, acc) {
      return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
    },
    log: function log(x) {
      var n = 0;
      while (x >= 4096) {
        n += 12;
        x /= 4096;
      }
      while (x >= 2) {
        n += 1;
        x /= 2;
      }
      return n;
    }
  };
  defineProperties(NumberPrototype, {
    toFixed: function toFixed(fractionDigits) {
      var f, x, s, m, e, z, j, k;
      // Test for NaN and round fractionDigits down
      f = Number(fractionDigits);
      f = f !== f ? 0 : Math.floor(f);
      if (f < 0 || f > 20) {
        throw new RangeError('Number.toFixed called with invalid number of decimals');
      }
      x = Number(this);
      // Test for NaN
      if (x !== x) {
        return 'NaN';
      }
      // If it is too big or small, return the string value of the number
      if (x <= -1e+21 || x >= 1e+21) {
        return String(x);
      }
      s = '';
      if (x < 0) {
        s = '-';
        x = -x;
      }
      m = '0';
      if (x > 1e-21) {
        // 1e-21 < x < 1e21
        // -70 < log2(x) < 70
        e = toFixedHelpers.log(x * toFixedHelpers.pow(2, 69, 1)) - 69;
        z = e < 0 ? x * toFixedHelpers.pow(2, -e, 1) : x / toFixedHelpers.pow(2, e, 1);
        z *= 4503599627370496;
        // Math.pow(2, 52);
        e = 52 - e;
        // -18 < e < 122
        // x = z / 2 ^ e
        if (e > 0) {
          toFixedHelpers.multiply(0, z);
          j = f;
          while (j >= 7) {
            toFixedHelpers.multiply(10000000, 0);
            j -= 7;
          }
          toFixedHelpers.multiply(toFixedHelpers.pow(10, j, 1), 0);
          j = e - 1;
          while (j >= 23) {
            toFixedHelpers.divide(1 << 23);
            j -= 23;
          }
          toFixedHelpers.divide(1 << j);
          toFixedHelpers.multiply(1, 1);
          toFixedHelpers.divide(2);
          m = toFixedHelpers.numToString();
        } else {
          toFixedHelpers.multiply(0, z);
          toFixedHelpers.multiply(1 << -e, 0);
          m = toFixedHelpers.numToString() + '0.00000000000000000000'.slice(2, 2 + f);
        }
      }
      if (f > 0) {
        k = m.length;
        if (k <= f) {
          m = s + '0.0000000000000000000'.slice(0, f - k + 2) + m;
        } else {
          m = s + m.slice(0, k - f) + '.' + m.slice(k - f);
        }
      } else {
        m = s + m;
      }
      return m;
    }
  }, hasToFixedBugs);
  //
  // String
  // ======
  //
  // ES5 15.5.4.14
  // http://es5.github.com/#x15.5.4.14
  // [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
  // Many browsers do not split properly with regular expressions or they
  // do not perform the split correctly under obscure conditions.
  // See http://blog.stevenlevithan.com/archives/cross-browser-split
  // I've tested in many browsers and this seems to cover the deviant ones:
  //    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
  //    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
  //    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
  //       [undefined, "t", undefined, "e", ...]
  //    ''.split(/.?/) should be [], not [""]
  //    '.'.split(/()()/) should be ["."], not ["", "", "."]
  var string_split = StringPrototype.split;
  if ('ab'.split(/(?:ab)*/).length !== 2 || '.'.split(/(.?)(.?)/).length !== 4 || 'tesst'.split(/(s)*/)[1] === 't' || 'test'.split(/(?:)/, -1).length !== 4 || ''.split(/.?/).length || '.'.split(/()()/).length > 1) {
    (function () {
      var compliantExecNpcg = /()??/.exec('')[1] === void 0;
      // NPCG: nonparticipating capturing group
      StringPrototype.split = function (separator, limit) {
        var string = this;
        if (separator === void 0 && limit === 0) {
          return [];
        }
        // If `separator` is not a regex, use native split
        if (_toString.call(separator) !== '[object RegExp]') {
          return string_split.call(this, separator, limit);
        }
        var output = [], flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.extended ? 'x' : '') + (separator.sticky ? 'y' : ''),
          // Firefox 3+
          lastLastIndex = 0,
          // Make `global` and avoid `lastIndex` issues by working with a copy
          separator2, match, lastIndex, lastLength;
        separator = new RegExp(separator.source, flags + 'g');
        string += '';
        // Type-convert
        if (!compliantExecNpcg) {
          // Doesn't need flags gy, but they don't hurt
          separator2 = new RegExp('^' + separator.source + '$(?!\\s)', flags);
        }
        /* Values for `limit`, per the spec:
         * If undefined: 4294967295 // Math.pow(2, 32) - 1
         * If 0, Infinity, or NaN: 0
         * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
         * If negative number: 4294967296 - Math.floor(Math.abs(limit))
         * If other: Type-convert, then use the above rules
         */
        limit = limit === void 0 ? -1 >>> 0 : // Math.pow(2, 32) - 1
        ToUint32(limit);
        while (match = separator.exec(string)) {
          // `separator.lastIndex` is not reliable cross-browser
          lastIndex = match.index + match[0].length;
          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            // Fix browsers whose `exec` methods don't consistently return `undefined` for
            // nonparticipating capturing groups
            if (!compliantExecNpcg && match.length > 1) {
              match[0].replace(separator2, function () {
                for (var i = 1; i < arguments.length - 2; i++) {
                  if (arguments[i] === void 0) {
                    match[i] = void 0;
                  }
                }
              });
            }
            if (match.length > 1 && match.index < string.length) {
              ArrayPrototype.push.apply(output, match.slice(1));
            }
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= limit) {
              break;
            }
          }
          if (separator.lastIndex === match.index) {
            separator.lastIndex++;  // Avoid an infinite loop
          }
        }
        if (lastLastIndex === string.length) {
          if (lastLength || !separator.test('')) {
            output.push('');
          }
        } else {
          output.push(string.slice(lastLastIndex));
        }
        return output.length > limit ? output.slice(0, limit) : output;
      };
    }());  // [bugfix, chrome]
           // If separator is undefined, then the result array contains just one String,
           // which is the this value (converted to a String). If limit is not undefined,
           // then the output array is truncated so that it contains no more than limit
           // elements.
           // "0".split(undefined, 0) -> []
  } else if ('0'.split(void 0, 0).length) {
    StringPrototype.split = function split(separator, limit) {
      if (separator === void 0 && limit === 0) {
        return [];
      }
      return string_split.call(this, separator, limit);
    };
  }
  var str_replace = StringPrototype.replace;
  var replaceReportsGroupsCorrectly = function () {
    var groups = [];
    'x'.replace(/x(.)?/g, function (match, group) {
      groups.push(group);
    });
    return groups.length === 1 && typeof groups[0] === 'undefined';
  }();
  if (!replaceReportsGroupsCorrectly) {
    StringPrototype.replace = function replace(searchValue, replaceValue) {
      var isFn = isFunction(replaceValue);
      var hasCapturingGroups = isRegex(searchValue) && /\)[*?]/.test(searchValue.source);
      if (!isFn || !hasCapturingGroups) {
        return str_replace.call(this, searchValue, replaceValue);
      } else {
        var wrappedReplaceValue = function (match) {
          var length = arguments.length;
          var originalLastIndex = searchValue.lastIndex;
          searchValue.lastIndex = 0;
          var args = searchValue.exec(match) || [];
          searchValue.lastIndex = originalLastIndex;
          args.push(arguments[length - 2], arguments[length - 1]);
          return replaceValue.apply(this, args);
        };
        return str_replace.call(this, searchValue, wrappedReplaceValue);
      }
    };
  }
  // ECMA-262, 3rd B.2.3
  // Not an ECMAScript standard, although ECMAScript 3rd Edition has a
  // non-normative section suggesting uniform semantics and it should be
  // normalized across all browsers
  // [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
  var string_substr = StringPrototype.substr;
  var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
  defineProperties(StringPrototype, {
    substr: function substr(start, length) {
      return string_substr.call(this, start < 0 ? (start = this.length + start) < 0 ? 0 : start : start, length);
    }
  }, hasNegativeSubstrBug);
  // ES5 15.5.4.20
  // whitespace from: http://es5.github.io/#x15.5.4.20
  var ws = '\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' + '\u2029\uFEFF';
  var zeroWidth = '\u200B';
  var wsRegexChars = '[' + ws + ']';
  var trimBeginRegexp = new RegExp('^' + wsRegexChars + wsRegexChars + '*');
  var trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + '*$');
  var hasTrimWhitespaceBug = StringPrototype.trim && (ws.trim() || !zeroWidth.trim());
  defineProperties(StringPrototype, {
    // http://blog.stevenlevithan.com/archives/faster-trim-javascript
    // http://perfectionkills.com/whitespace-deviations/
    trim: function trim() {
      if (this === void 0 || this === null) {
        throw new TypeError('can\'t convert ' + this + ' to object');
      }
      return String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');
    }
  }, hasTrimWhitespaceBug);
  // ES-5 15.1.2.2
  if (parseInt(ws + '08') !== 8 || parseInt(ws + '0x16') !== 22) {
    parseInt = function (origParseInt) {
      var hexRegex = /^0[xX]/;
      return function parseIntES5(str, radix) {
        str = String(str).trim();
        if (!Number(radix)) {
          radix = hexRegex.test(str) ? 16 : 10;
        }
        return origParseInt(str, radix);
      };
    }(parseInt);
  }
}));  /*!
       * https://github.com/es-shims/es5-shim
       * @license es5-shim Copyright 2009-2014 by contributors, MIT License
       * see https://github.com/es-shims/es5-shim/blob/master/LICENSE
       */
      // vim: ts=4 sts=4 sw=4 expandtab
      //Add semicolon to prevent IIFE from being passed as argument to concated code.
// UMD (Universal Module Definition)
// see https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
  if (true) {
    // AMD. Register as an anonymous module.
    es5Sham = function () {
      return typeof factory === 'function' ? factory() : factory;
    }();
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.returnExports = factory();
  }
}(this, function () {
  var call = Function.prototype.call;
  var prototypeOfObject = Object.prototype;
  var owns = call.bind(prototypeOfObject.hasOwnProperty);
  // If JS engine supports accessors creating shortcuts.
  var defineGetter;
  var defineSetter;
  var lookupGetter;
  var lookupSetter;
  var supportsAccessors = owns(prototypeOfObject, '__defineGetter__');
  if (supportsAccessors) {
    defineGetter = call.bind(prototypeOfObject.__defineGetter__);
    defineSetter = call.bind(prototypeOfObject.__defineSetter__);
    lookupGetter = call.bind(prototypeOfObject.__lookupGetter__);
    lookupSetter = call.bind(prototypeOfObject.__lookupSetter__);
  }
  // ES5 15.2.3.2
  // http://es5.github.com/#x15.2.3.2
  if (!Object.getPrototypeOf) {
    // https://github.com/es-shims/es5-shim/issues#issue/2
    // http://ejohn.org/blog/objectgetprototypeof/
    // recommended by fschaefer on github
    //
    // sure, and webreflection says ^_^
    // ... this will nerever possibly return null
    // ... Opera Mini breaks here with infinite loops
    Object.getPrototypeOf = function getPrototypeOf(object) {
      var proto = object.__proto__;
      if (proto || proto === null) {
        return proto;
      } else if (object.constructor) {
        return object.constructor.prototype;
      } else {
        return prototypeOfObject;
      }
    };
  }
  //ES5 15.2.3.3
  //http://es5.github.com/#x15.2.3.3
  function doesGetOwnPropertyDescriptorWork(object) {
    try {
      object.sentinel = 0;
      return Object.getOwnPropertyDescriptor(object, 'sentinel').value === 0;
    } catch (exception) {
    }
  }
  //check whether getOwnPropertyDescriptor works if it's given. Otherwise,
  //shim partially.
  if (Object.defineProperty) {
    var getOwnPropertyDescriptorWorksOnObject = doesGetOwnPropertyDescriptorWork({});
    var getOwnPropertyDescriptorWorksOnDom = typeof document === 'undefined' || doesGetOwnPropertyDescriptorWork(document.createElement('div'));
    if (!getOwnPropertyDescriptorWorksOnDom || !getOwnPropertyDescriptorWorksOnObject) {
      var getOwnPropertyDescriptorFallback = Object.getOwnPropertyDescriptor;
    }
  }
  if (!Object.getOwnPropertyDescriptor || getOwnPropertyDescriptorFallback) {
    var ERR_NON_OBJECT = 'Object.getOwnPropertyDescriptor called on a non-object: ';
    Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(object, property) {
      if (typeof object !== 'object' && typeof object !== 'function' || object === null) {
        throw new TypeError(ERR_NON_OBJECT + object);
      }
      // make a valiant attempt to use the real getOwnPropertyDescriptor
      // for I8's DOM elements.
      if (getOwnPropertyDescriptorFallback) {
        try {
          return getOwnPropertyDescriptorFallback.call(Object, object, property);
        } catch (exception) {
        }
      }
      // If object does not owns property return undefined immediately.
      if (!owns(object, property)) {
        return;
      }
      // If object has a property then it's for sure both `enumerable` and
      // `configurable`.
      var descriptor = {
        enumerable: true,
        configurable: true
      };
      // If JS engine supports accessor properties then property may be a
      // getter or setter.
      if (supportsAccessors) {
        // Unfortunately `__lookupGetter__` will return a getter even
        // if object has own non getter property along with a same named
        // inherited getter. To avoid misbehavior we temporary remove
        // `__proto__` so that `__lookupGetter__` will return getter only
        // if it's owned by an object.
        var prototype = object.__proto__;
        var notPrototypeOfObject = object !== prototypeOfObject;
        // avoid recursion problem, breaking in Opera Mini when
        // Object.getOwnPropertyDescriptor(Object.prototype, 'toString')
        // or any other Object.prototype accessor
        if (notPrototypeOfObject) {
          object.__proto__ = prototypeOfObject;
        }
        var getter = lookupGetter(object, property);
        var setter = lookupSetter(object, property);
        if (notPrototypeOfObject) {
          // Once we have getter and setter we can put values back.
          object.__proto__ = prototype;
        }
        if (getter || setter) {
          if (getter) {
            descriptor.get = getter;
          }
          if (setter) {
            descriptor.set = setter;
          }
          // If it was accessor property we're done and return here
          // in order to avoid adding `value` to the descriptor.
          return descriptor;
        }
      }
      // If we got this far we know that object has an own property that is
      // not an accessor so we set it as a value and return descriptor.
      descriptor.value = object[property];
      descriptor.writable = true;
      return descriptor;
    };
  }
  // ES5 15.2.3.4
  // http://es5.github.com/#x15.2.3.4
  if (!Object.getOwnPropertyNames) {
    Object.getOwnPropertyNames = function getOwnPropertyNames(object) {
      return Object.keys(object);
    };
  }
  // ES5 15.2.3.5
  // http://es5.github.com/#x15.2.3.5
  if (!Object.create) {
    // Contributed by Brandon Benvie, October, 2012
    var createEmpty;
    var supportsProto = !({ __proto__: null } instanceof Object);
    // the following produces false positives
    // in Opera Mini => not a reliable check
    // Object.prototype.__proto__ === null
    if (supportsProto || typeof document === 'undefined') {
      createEmpty = function () {
        return { '__proto__': null };
      };
    } else {
      // In old IE __proto__ can't be used to manually set `null`, nor does
      // any other method exist to make an object that inherits from nothing,
      // aside from Object.prototype itself. Instead, create a new global
      // object and *steal* its Object.prototype and strip it bare. This is
      // used as the prototype to create nullary objects.
      createEmpty = function () {
        var iframe = document.createElement('iframe');
        var parent = document.body || document.documentElement;
        iframe.style.display = 'none';
        parent.appendChild(iframe);
        iframe.src = 'javascript:';
        var empty = iframe.contentWindow.Object.prototype;
        parent.removeChild(iframe);
        iframe = null;
        delete empty.constructor;
        delete empty.hasOwnProperty;
        delete empty.propertyIsEnumerable;
        delete empty.isPrototypeOf;
        delete empty.toLocaleString;
        delete empty.toString;
        delete empty.valueOf;
        empty.__proto__ = null;
        function Empty() {
        }
        Empty.prototype = empty;
        // short-circuit future calls
        createEmpty = function () {
          return new Empty();
        };
        return new Empty();
      };
    }
    Object.create = function create(prototype, properties) {
      var object;
      function Type() {
      }
      // An empty constructor.
      if (prototype === null) {
        object = createEmpty();
      } else {
        if (typeof prototype !== 'object' && typeof prototype !== 'function') {
          // In the native implementation `parent` can be `null`
          // OR *any* `instanceof Object`  (Object|Function|Array|RegExp|etc)
          // Use `typeof` tho, b/c in old IE, DOM elements are not `instanceof Object`
          // like they are in modern browsers. Using `Object.create` on DOM elements
          // is...err...probably inappropriate, but the native version allows for it.
          throw new TypeError('Object prototype may only be an Object or null');  // same msg as Chrome
        }
        Type.prototype = prototype;
        object = new Type();
        // IE has no built-in implementation of `Object.getPrototypeOf`
        // neither `__proto__`, but this manually setting `__proto__` will
        // guarantee that `Object.getPrototypeOf` will work as expected with
        // objects created using `Object.create`
        object.__proto__ = prototype;
      }
      if (properties !== void 0) {
        Object.defineProperties(object, properties);
      }
      return object;
    };
  }
  // ES5 15.2.3.6
  // http://es5.github.com/#x15.2.3.6
  // Patch for WebKit and IE8 standard mode
  // Designed by hax <hax.github.com>
  // related issue: https://github.com/es-shims/es5-shim/issues#issue/5
  // IE8 Reference:
  //     http://msdn.microsoft.com/en-us/library/dd282900.aspx
  //     http://msdn.microsoft.com/en-us/library/dd229916.aspx
  // WebKit Bugs:
  //     https://bugs.webkit.org/show_bug.cgi?id=36423
  function doesDefinePropertyWork(object) {
    try {
      Object.defineProperty(object, 'sentinel', {});
      return 'sentinel' in object;
    } catch (exception) {
    }
  }
  // check whether defineProperty works if it's given. Otherwise,
  // shim partially.
  if (Object.defineProperty) {
    var definePropertyWorksOnObject = doesDefinePropertyWork({});
    var definePropertyWorksOnDom = typeof document === 'undefined' || doesDefinePropertyWork(document.createElement('div'));
    if (!definePropertyWorksOnObject || !definePropertyWorksOnDom) {
      var definePropertyFallback = Object.defineProperty, definePropertiesFallback = Object.defineProperties;
    }
  }
  if (!Object.defineProperty || definePropertyFallback) {
    var ERR_NON_OBJECT_DESCRIPTOR = 'Property description must be an object: ';
    var ERR_NON_OBJECT_TARGET = 'Object.defineProperty called on non-object: ';
    var ERR_ACCESSORS_NOT_SUPPORTED = 'getters & setters can not be defined ' + 'on this javascript engine';
    Object.defineProperty = function defineProperty(object, property, descriptor) {
      if (typeof object !== 'object' && typeof object !== 'function' || object === null) {
        throw new TypeError(ERR_NON_OBJECT_TARGET + object);
      }
      if (typeof descriptor !== 'object' && typeof descriptor !== 'function' || descriptor === null) {
        throw new TypeError(ERR_NON_OBJECT_DESCRIPTOR + descriptor);
      }
      // make a valiant attempt to use the real defineProperty
      // for I8's DOM elements.
      if (definePropertyFallback) {
        try {
          return definePropertyFallback.call(Object, object, property, descriptor);
        } catch (exception) {
        }
      }
      // If it's a data property.
      if (owns(descriptor, 'value')) {
        // fail silently if "writable", "enumerable", or "configurable"
        // are requested but not supported
        /*
         // alternate approach:
         if ( // can't implement these features; allow false but not true
         !(owns(descriptor, "writable") ? descriptor.writable : true) ||
         !(owns(descriptor, "enumerable") ? descriptor.enumerable : true) ||
         !(owns(descriptor, "configurable") ? descriptor.configurable : true)
         )
         throw new RangeError(
         "This implementation of Object.defineProperty does not " +
         "support configurable, enumerable, or writable."
         );
         */
        if (supportsAccessors && (lookupGetter(object, property) || lookupSetter(object, property))) {
          // As accessors are supported only on engines implementing
          // `__proto__` we can safely override `__proto__` while defining
          // a property to make sure that we don't hit an inherited
          // accessor.
          var prototype = object.__proto__;
          object.__proto__ = prototypeOfObject;
          // Deleting a property anyway since getter / setter may be
          // defined on object itself.
          delete object[property];
          object[property] = descriptor.value;
          // Setting original `__proto__` back now.
          object.__proto__ = prototype;
        } else {
          object[property] = descriptor.value;
        }
      } else {
        if (!supportsAccessors) {
          throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
        }
        // If we got that far then getters and setters can be defined !!
        if (owns(descriptor, 'get')) {
          defineGetter(object, property, descriptor.get);
        }
        if (owns(descriptor, 'set')) {
          defineSetter(object, property, descriptor.set);
        }
      }
      return object;
    };
  }
  // ES5 15.2.3.7
  // http://es5.github.com/#x15.2.3.7
  if (!Object.defineProperties || definePropertiesFallback) {
    Object.defineProperties = function defineProperties(object, properties) {
      // make a valiant attempt to use the real defineProperties
      if (definePropertiesFallback) {
        try {
          return definePropertiesFallback.call(Object, object, properties);
        } catch (exception) {
        }
      }
      for (var property in properties) {
        if (owns(properties, property) && property !== '__proto__') {
          Object.defineProperty(object, property, properties[property]);
        }
      }
      return object;
    };
  }
  // ES5 15.2.3.8
  // http://es5.github.com/#x15.2.3.8
  if (!Object.seal) {
    Object.seal = function seal(object) {
      // this is misleading and breaks feature-detection, but
      // allows "securable" code to "gracefully" degrade to working
      // but insecure code.
      return object;
    };
  }
  // ES5 15.2.3.9
  // http://es5.github.com/#x15.2.3.9
  if (!Object.freeze) {
    Object.freeze = function freeze(object) {
      // this is misleading and breaks feature-detection, but
      // allows "securable" code to "gracefully" degrade to working
      // but insecure code.
      return object;
    };
  }
  // detect a Rhino bug and patch it
  try {
    Object.freeze(function () {
    });
  } catch (exception) {
    Object.freeze = function freeze(freezeObject) {
      return function freeze(object) {
        if (typeof object === 'function') {
          return object;
        } else {
          return freezeObject(object);
        }
      };
    }(Object.freeze);
  }
  // ES5 15.2.3.10
  // http://es5.github.com/#x15.2.3.10
  if (!Object.preventExtensions) {
    Object.preventExtensions = function preventExtensions(object) {
      // this is misleading and breaks feature-detection, but
      // allows "securable" code to "gracefully" degrade to working
      // but insecure code.
      return object;
    };
  }
  // ES5 15.2.3.11
  // http://es5.github.com/#x15.2.3.11
  if (!Object.isSealed) {
    Object.isSealed = function isSealed(object) {
      return false;
    };
  }
  // ES5 15.2.3.12
  // http://es5.github.com/#x15.2.3.12
  if (!Object.isFrozen) {
    Object.isFrozen = function isFrozen(object) {
      return false;
    };
  }
  // ES5 15.2.3.13
  // http://es5.github.com/#x15.2.3.13
  if (!Object.isExtensible) {
    Object.isExtensible = function isExtensible(object) {
      // 1. If Type(O) is not Object throw a TypeError exception.
      if (Object(object) !== object) {
        throw new TypeError();  // TODO message
      }
      // 2. Return the Boolean value of the [[Extensible]] internal property of O.
      var name = '';
      while (owns(object, name)) {
        name += '?';
      }
      object[name] = true;
      var returnValue = owns(object, name);
      delete object[name];
      return returnValue;
    };
  }
}));
(function () {
  var object = typeof exports != 'undefined' ? exports : this,
    // #8: web workers
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=', INVALID_CHARACTER_ERR = function () {
      // fabricate a suitable error object
      try {
        document.createElement('$');
      } catch (error) {
        return error;
      }
    }();
  // encoder
  // [https://gist.github.com/999166] by [https://github.com/nignag]
  object.btoa || (object.btoa = function (input) {
    for (// initialize result and counter
      var block, charCode, idx = 0, map = chars, output = ''; // if the next input index does not exist:
      //   change the mapping table to "="
      //   check if d has no fractional digits
      input.charAt(idx | 0) || (map = '=', idx % 1); // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
      output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
      charCode = input.charCodeAt(idx += 3 / 4);
      if (charCode > 255)
        throw INVALID_CHARACTER_ERR;
      block = block << 8 | charCode;
    }
    return output;
  });
  // decoder
  // [https://gist.github.com/1020396] by [https://github.com/atk]
  object.atob || (object.atob = function (input) {
    input = input.replace(/=+$/, '');
    if (input.length % 4 == 1)
      throw INVALID_CHARACTER_ERR;
    for (// initialize result and counters
      var bc = 0, bs, buffer, idx = 0, output = ''; // get next character
      buffer = input.charAt(idx++); // character found in table? initialize bit storage and add its ascii value;
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    return output;
  });
}());
base64 = undefined;
polyFills = undefined;
core = function (Events, polyFills) {
  var compId, deviceType, queryMap, readyQ;
  var isReady = false;
  var version = '1.43.0';
  var EventsCallbacks = {};
  var callbacks = {};
  var callId = 1;
  var MessageTypes = {
    REFRESH_APP: 'refreshApp',
    APP_IS_ALIVE: 'appIsAlive',
    APP_STATE_CHANGED: 'appStateChanged',
    CLOSE_WINDOW: 'closeWindow',
    RESIZE_WINDOW: 'resizeWindow',
    SET_WINDOW_PLACEMENT: 'setWindowPlacement',
    GET_WINDOW_PLACEMENT: 'getWindowPlacement',
    OPEN_POPUP: 'openPopup',
    OPEN_MODAL: 'openModal',
    OPEN_MEDIA_DIALOG: 'openMediaDialog',
    OPEN_BILLING_PAGE: 'openBillingPage',
    GET_SITE_PAGES: 'getSitePages',
    GET_SITE_COLORS: 'getSiteColors',
    GET_USER_SESSION: 'getUserSession',
    NAVIGATE_TO_PAGE: 'navigateToPage',
    POST_MESSAGE: 'postMessage',
    HEIGHT_CHANGED: 'heightChanged',
    NAVIGATE_TO_STATE: 'navigateToState',
    SM_REQUEST_LOGIN: 'smRequestLogin',
    SM_CURRENT_MEMBER: 'smCurrentMember',
    SITE_INFO: 'siteInfo',
    BOUNDING_RECT_AND_OFFSETS: 'boundingRectAndOffsets',
    SCROLL_TO: 'scrollTo',
    SCROLL_BY: 'scrollBy',
    SET_STYLE_PARAM: 'setStyleParam',
    GET_STYLE_PARAMS: 'getStyleParams',
    REGISTER_EVENT_LISTENER: 'registerEventListener',
    REMOVE_EVENT_LISTENER: 'removeEventListener',
    PUBLISH: 'publish',
    GET_CONTACT_BY_ID: 'getContactById',
    GET_CONTACTS: 'getContacts',
    CREATE_CONTACT: 'createContact',
    GET_ACTIVITY_BY_ID: 'getActivityById',
    GET_ACTIVITIES: 'getActivities',
    POST_ACTIVITY: 'postActivity',
    NAVIGATE_TO_SECTION_PAGE: 'navigateToSectionPage',
    GET_CURRENT_PAGE_ID: 'getCurrentPageId',
    GET_CONTACT_LABELS: 'getContactLabels',
    GET_DASHBOARD_APP_URL: 'getDashboardAppUrl',
    GET_EDITOR_URL: 'getEditorUrl',
    SETTINGS_OPEN_MODAL: 'settingsOpenModal',
    GET_SECTION_URL: 'getSectionUrl',
    OPEN_BILLING_PAGE_FOR_PRODUCT: 'openBillingPageForProduct',
    GET_BILLING_PAGE_FOR_PRODUCT: 'getBillingPageForProduct',
    GET_ACTIVE_BILLING_PACKAGE: 'getActiveBillingPackage',
    GET_BILLING_PACKAGES: 'getBillingPackages',
    POST_COUNTERS_REPORT: 'postCountersReport'
  };
  var styles = {
    mappedColors: null,
    siteColors: null,
    style: null,
    siteTextPresets: null,
    fontsMeta: null,
    fontsSpriteUrl: null,
    mappedFonts: null
  };
  var currentEditMode = 'site';
  var init = function (opts) {
    // get our comp id
    compId = getQueryParameter('compId') || '[UNKNOWN]';
    deviceType = getQueryParameter('deviceType') || 'desktop';
    // register post message hub function
    addPostMessageCallback(receiver);
    // initialize edit mode state tracking
    currentEditMode = getQueryParameter('viewMode') || currentEditMode;
    addEventListenerInternal('EDIT_MODE_CHANGE', function (params) {
      currentEditMode = params.editMode;
    });
    if (opts && opts.endpointType !== 'worker') {
      // report ready to Wix
      sendMessage(MessageTypes.APP_IS_ALIVE, { version: getVersion() }, initStyle);
    }
  };
  var receiver = function (event) {
    if (!event || !event.data) {
      return;
    }
    var data = {};
    try {
      data = JSON.parse(event.data);
    } catch (e) {
      return;
    }
    switch (data.intent) {
    case 'TPA_RESPONSE':
      if (data.callId && callbacks[data.callId]) {
        callbacks[data.callId](data.res);
        delete callbacks[data.callId];
      }
      break;
    case 'addEventListener':
      callEventListeners(data);
      break;
    }
  };
  var getDecodedInstance = function () {
    var instanceStr = getQueryParameter('instance');
    var encodedInstance = instanceStr.substring(instanceStr.indexOf('.') + 1);
    return JSON.parse(decodeBase64(encodedInstance));
  };
  var getInstanceValue = function (key) {
    var decodedInstance = getDecodedInstance();
    if (decodedInstance) {
      return decodedInstance[key] || null;
    }
    return null;
  };
  var decodeBase64 = function (str) {
    return atob(str);
  };
  var initStyle = function (params) {
    var primeColorsReferences = [
      'white/black',
      'black/white',
      'primery-1',
      'primery-2',
      'primery-3'
    ];
    function mapColors(colors, styleColors) {
      var colorMap = {};
      var y = 1;
      var index;
      for (var i = 0; i < colors.length; i++) {
        index = +colors[i].name.split('_').pop();
        if (index <= 5) {
          colors[i].reference = primeColorsReferences[i];
          colorMap[primeColorsReferences[i]] = colors[i];
        } else if (index > 10) {
          colors[i].reference = 'color-' + y;
          colorMap['color-' + y] = colors[i];
          y++;
        }
      }
      for (var color in styleColors) {
        if (styleColors.hasOwnProperty(color)) {
          colorMap['style.' + color] = styleColors[color];
        }
      }
      return colorMap;
    }
    function mapFonts(fonts) {
      if (!fonts) {
        return;
      }
      var mappedFonts = {};
      for (var font in fonts) {
        if (fonts.hasOwnProperty(font)) {
          mappedFonts['style.' + font] = fonts[font];
        }
      }
      return mappedFonts;
    }
    function evalTemplate(str, data, getter) {
      getter = getter || function (data, key) {
        return data[key];
      };
      return str.replace(/\{\{([^}]+)\}\}/gim, function (fullmatch, key) {
        var val = fullmatch;
        var keysInFallbackOrder = key.split(/\s+/);
        for (var i = 0; i < keysInFallbackOrder.length; i++) {
          if (keysInFallbackOrder.length === 0) {
            continue;
          }
          try {
            val = getter(data, keysInFallbackOrder[i]);
            if (val !== undefined) {
              return val;
            } else if (i === keysInFallbackOrder.length - 1) {
              return keysInFallbackOrder[i];
            }
          } catch (e) {
            try {
              console.log('Warning: could not find key "' + keysInFallbackOrder[i] + '" for match "' + fullmatch + '"');
            } catch (err) {
            }
          }
        }
        return fullmatch;
      });
    }
    function findEndOfMediaQueryIndex(startIndex, styleTpl) {
      var memIndex = 0;
      var index = startIndex;
      var currentChar;
      for (; index < styleTpl.length; index++) {
        currentChar = styleTpl.charAt(index);
        if (currentChar === '{') {
          memIndex += 1;
        }
        if (currentChar === '}') {
          memIndex -= 1;
        }
        if (memIndex < 0) {
          index++;
          break;
        }
      }
      return index;
    }
    function applyWixMediaQuery(cssText, currentMediaType) {
      var endIndex, id, start, end, mediaQuery, match, panic = 100000, rndId = Math.random(), mediaRegExp = /@media\s*\(\s*wix-device-type\s*:\s*(\w+)\s*\)\s*\{/m, mediaQueries = [];
      while (true) {
        if (panic-- < 0) {
          return mediaQueries;
        }
        match = cssText.match(mediaRegExp);
        if (match) {
          endIndex = findEndOfMediaQueryIndex(match.index + match[0].length, cssText);
          id = '/*** wix-media ' + rndId + '$' + mediaQueries.length + ' ***/';
          mediaQuery = cssText.slice(match.index, endIndex);
          cssText = cssText.replace(mediaQuery, id);
          start = mediaQuery.indexOf('{');
          end = mediaQuery.lastIndexOf('}');
          mediaQueries.push({
            id: id,
            mediaQuery: mediaQuery.slice(start + 1, end - 1),
            mediaType: match[1]
          });
        } else {
          break;
        }
      }
      mediaQueries.forEach(function (media) {
        if (media.mediaType === currentMediaType) {
          cssText = cssText.replace(media.id, media.id + media.mediaQuery);
        } else {
          cssText = cssText.replace(media.id, '');
        }
      });
      return cssText;
    }
    function getValueForTemplate(styles, keyName) {
      return (styles.mappedColors ? styles.mappedColors[keyName] ? styles.mappedColors[keyName].value : undefined : undefined) || (styles.mappedFonts ? styles.mappedFonts[keyName] ? styles.mappedFonts[keyName].value : undefined : undefined) || (styles.siteTextPresets ? styles.siteTextPresets[keyName] ? styles.siteTextPresets[keyName].value : undefined : undefined);
    }
    function updateStyleElement(ownerNode) {
      if (ownerNode && ownerNode.hasAttribute('wix-style')) {
        if (!ownerNode._wixTemplate) {
          if (ownerNode.nodeName.toLowerCase() === 'link') {
            throw new TypeError('"wix-style" is not supported on link elements, use inline style inside the document head');
          } else {
            ownerNode._wixTemplate = ownerNode.textContent;
          }
        }
        ownerNode.textContent = evalTemplate(applyWixMediaQuery(ownerNode._wixTemplate, getQueryParameter('deviceType') || 'desktop'), styles, getValueForTemplate);
      }
    }
    function updateCSSStyleSheets() {
      var styles = document.getElementsByTagName('style');
      //document.styleSheets
      for (var i = 0; i < styles.length; i++) {
        updateStyleElement(styles[i]);
      }
    }
    function createInjectedStyleElement() {
      var head = document.getElementsByTagName('head')[0];
      var text = '.Title{ {{Title}} } .Menu{ {{Menu}} } .Page-title{ {{Page-title}} } .Heading-XL{ {{Heading-XL}} } .Heading-L{ {{Heading-L}} } .Heading-M{ {{Heading-M}} } .Heading-S{ {{Heading-S}} } .Body-L{ {{Body-L}} } .Body-M{ {{Body-M}} } .Body-S{ {{Body-S}} } .Body-XS{ {{Body-XS}} } }';
      head.insertAdjacentHTML('afterbegin', '<' + 'sty' + 'le wix-style type="text/css">' + text + '</' + 'sty' + 'le>');
    }
    function setReferencesForSavedStyles(style) {
      for (var prop in style.colors) {
        if (style.colors.hasOwnProperty(prop)) {
          var color = style.colors[prop];
          if (!color.themeName) {
            continue;
          }
          var editorIndex = +color.themeName.split('_').pop();
          if (editorIndex <= 5) {
            color.themeName = primeColorsReferences[editorIndex - 1];
          } else if (editorIndex > 10) {
            color.themeName = 'color-' + (editorIndex - 10);
          }
        }
      }
      return style;
    }
    function updateStylesCache(params) {
      cacheGoogleFontsCssUrl(params.style);
      handleFonts(params.fonts);
      styles.siteColors = params.siteColors || styles.siteColors;
      styles.siteTextPresets = params.siteTextPresets || styles.siteTextPresets;
      styles.fontsMeta = extractFontsMeta(params.fonts) || styles.fontsMeta;
      styles.style = params.style ? setReferencesForSavedStyles(params.style) : styles.style;
      styles.mappedColors = mapColors(styles.siteColors, styles.style.colors);
      styles.mappedFonts = mapFonts(styles.style.fonts);
    }
    function extractFontsMeta(fonts) {
      if (!fonts) {
        return null;
      }
      return fonts.fontsMeta;
    }
    function appendLinkToHead(url, id) {
      var head = document.getElementsByTagName('head')[0];
      var link = document.createElement('link');
      link.setAttribute('type', 'text/css');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('href', url);
      if (typeof id === 'string') {
        link.id = id;
      }
      head.appendChild(link);
      return link;
    }
    function updateGoogleFontsLink(url) {
      var elToRemove;
      if (!url) {
        return;
      }
      if (updateGoogleFontsLink.$linkElement && updateGoogleFontsLink.$linkElement.getAttribute('href') === url) {
        return;
      } else if (updateGoogleFontsLink.$linkElement) {
        elToRemove = updateGoogleFontsLink.$linkElement;
        setTimeout(function () {
          if (elToRemove.parentNode) {
            elToRemove.parentNode.removeChild(elToRemove);
          }
          elToRemove = null;
        }, 5000);
      }
      updateGoogleFontsLink.$linkElement = appendLinkToHead(url, 'wix-google-fonts');
    }
    function cacheGoogleFontsCssUrl(fonts) {
      styles.googleFontsCssUrl = fonts && fonts.googleFontsCssUrl || styles.googleFontsCssUrl;
    }
    addEventListenerInternal(Events.THEME_CHANGE, function (params) {
      updateStylesCache(params);
      callEventListeners({
        params: styles.style,
        eventType: Events.STYLE_PARAMS_CHANGE
      }, 'internal');
    });
    addEventListenerInternal(Events.STYLE_PARAMS_CHANGE, function (params, typeOfCall) {
      if (typeOfCall !== 'internal') {
        updateStylesCache({ style: params });
      }
      updateGoogleFontsLink(styles.googleFontsCssUrl);
      updateCSSStyleSheets();
    });
    function handleFonts(fonts) {
      if (!fonts) {
        return;
      }
      var links = document.getElementsByTagName('link');
      fonts.cssUrls.forEach(function (url) {
        for (var i = 0; i < links.length; i++) {
          if (links[i].getAttribute('href') === url) {
            return;
          }
        }
        appendLinkToHead(url);
      });
      styles.fontsSpriteUrl = fonts.imageSpriteUrl;
    }
    createInjectedStyleElement();
    updateStylesCache(params);
    updateGoogleFontsLink(styles.googleFontsCssUrl);
    updateCSSStyleSheets();
    setReady();
  };
  var callEventListeners = function (data, typeOfCall) {
    if (EventsCallbacks[data.eventType]) {
      EventsCallbacks[data.eventType].forEach(function (callbackHandler) {
        callbackHandler.callback.call(this, data.params, typeOfCall);
      });
    }
  };
  var setReady = function () {
    isReady = true;
    callReadyQ();
  };
  var callReadyQ = function () {
    if (isReady && readyQ) {
      for (var i = 0; i < readyQ.length; i++) {
        readyQ[i].call(null);
      }
    }
  };
  var addToReadyQ = function (action) {
    readyQ = readyQ || [];
    readyQ.push(action);
  };
  var getVersion = function () {
    var version = !!version ? version : window.location.pathname.split('/')[3] || 'unknown';
    return version;
  };
  var getCallId = function () {
    return callId++;
  };
  var addEventListenerInternal = function (eventKey, callBack, skipValidation, params) {
    if (!skipValidation && (!eventKey || !Events.hasOwnProperty(eventKey))) {
      reportSdkError('Unsupported event name, ' + eventKey);
      return;
    }
    var id = getCallId();
    EventsCallbacks[eventKey] = EventsCallbacks[eventKey] || [];
    EventsCallbacks[eventKey].push({
      callback: callBack,
      id: id
    });
    //params can be used as override params for the event to add more functionality
    params = params || {};
    params.eventKey = eventKey;
    sendMessage(MessageTypes.REGISTER_EVENT_LISTENER, params, handleAddEventListenerResponse.bind(null, callBack));
    return id;
  };
  var handleAddEventListenerResponse = function (callback, event) {
    if (event.drain) {
      event.data.forEach(function (data) {
        callback(data);
      }, null);
    }
  };
  var removeEventListenerInternal = function (eventName, callBackOrId, skipValidation) {
    if (!skipValidation && (!eventName || !Events.hasOwnProperty(eventName))) {
      reportSdkError('Unsupported event name, ' + eventName);
      return;
    }
    var i = -1;
    var eventCallbacks = EventsCallbacks[eventName];
    if (eventCallbacks) {
      for (var y = 0; y < eventCallbacks.length; y++) {
        if (eventCallbacks[y].callback === callBackOrId || eventCallbacks[y].id === callBackOrId) {
          i = y;
          break;
        }
      }
      if (i !== -1) {
        eventCallbacks.splice(i, 1);
      }
    }
    if (i >= 0 && eventCallbacks.length === 0) {
      sendMessage(MessageTypes.REMOVE_EVENT_LISTENER, eventName);
    }
  };
  var addPostMessageCallback = function (callback) {
    window.addEventListener('message', callback, false);
  };
  var getQueryParameter = function (parameterName) {
    if (!queryMap) {
      queryMap = {};
      var queryString = location.search.substring(1) || '';
      var queryArray = queryString.split('&');
      queryArray.forEach(function (element) {
        var parts = element.split('=');
        queryMap[parts[0]] = decodeURIComponent(parts[1]);
      });
    }
    return queryMap[parameterName] || null;
  };
  var reportSdkError = function (errorMessage) {
    var error = new TypeError('Wix SDK: ' + errorMessage);
    throw error.stack;
  };
  var reportSdkMsg = function (message) {
    log(new TypeError('Wix SDK: ' + message));
  };
  var log = function (text) {
    if (window.console) {
      window.console.log(text);
    }
  };
  var sendMessage = function (msgType, params, callback) {
    if (!msgType) {
      return;
    }
    var blob = getBlob(msgType, params, callback);
    var target = parent.postMessage ? parent : parent.document.postMessage ? parent.document : undefined;
    if (target && typeof target !== 'undefined') {
      var dataStr = '';
      try {
        dataStr = JSON.stringify(params);
      } catch (err) {
      }
      target.postMessage(JSON.stringify(blob), '*');
    }
  };
  var getBlob = function (msgType, params, onResponseCallback) {
    var blob = {
      intent: 'TPA2',
      callId: getCallId(),
      type: msgType,
      compId: compId,
      deviceType: deviceType,
      data: params
    };
    if (onResponseCallback) {
      callbacks[blob.callId] = onResponseCallback;
    }
    return blob;
  };
  var getCompId = function () {
    return compId;
  };
  var getCurrentEditMode = function () {
    return currentEditMode;
  };
  return {
    init: init,
    sendMessage: sendMessage,
    reportSdkError: reportSdkError,
    reportSdkMsg: reportSdkMsg,
    MessageTypes: MessageTypes,
    getCurrentEditMode: getCurrentEditMode,
    Styles: styles,
    getQueryParameter: getQueryParameter,
    addToReadyQ: addToReadyQ,
    getCompId: getCompId,
    getInstanceValue: getInstanceValue,
    addEventListenerInternal: addEventListenerInternal,
    removeEventListenerInternal: removeEventListenerInternal
  };
}(Events, polyFills);
/**
 * This is the description for the Media namespace.
 * @memberof Wix.Utils
 * @namespace Wix.Utils.Media
 */
Media = function () {
  var getImageUrl = function (relativeUrl) {
    return 'http://static.wixstatic.com/media/' + relativeUrl;
  };
  var getResizedImageUrl = function (relativeUrl, width, height, sharpParams) {
    // assign sharp default parameters
    sharpParams = sharpParams || {};
    sharpParams.quality = sharpParams.quality || 75;
    sharpParams.resizaFilter = sharpParams.resizaFilter || 22;
    sharpParams.usm_r = sharpParams.usm_r || 0.5;
    sharpParams.usm_a = sharpParams.usm_a || 1.2;
    sharpParams.usm_t = sharpParams.usm_t || 0;
    var urlArr = [];
    var splitUrl = /[.]([^.]+)$/.exec(relativeUrl);
    var ext = splitUrl && /[.]([^.]+)$/.exec(relativeUrl)[1] || '';
    // build the image url
    relativeUrl = 'http://static.wixstatic.com/media/' + relativeUrl;
    urlArr.push(relativeUrl);
    urlArr.push('srz');
    urlArr.push(width);
    urlArr.push(height);
    // sharpening parameters
    urlArr.push(sharpParams.quality);
    urlArr.push(sharpParams.resizaFilter);
    urlArr.push(sharpParams.usm_r);
    urlArr.push(sharpParams.usm_a);
    urlArr.push(sharpParams.quality);
    urlArr.push(ext);
    // get file extension
    urlArr.push('srz');
    return urlArr.join('_');
  };
  var getAudioUrl = function (relativeUrl) {
    return 'http://media.wix.com/mp3/' + relativeUrl;
  };
  var getDocumentUrl = function (relativeUrl) {
    return 'http://media.wix.com/ugd/' + relativeUrl;
  };
  var getSwfUrl = function (relativeUrl) {
    return 'http://static.wixstatic.com/media/' + relativeUrl;
  };
  var getPreviewSecureMusicUrl = function (previewFileName) {
    return 'http://static.wixstatic.com/preview/' + previewFileName;
  };
  return {
    /**
     * This method constructs a URL for a media item of type image.
     * @function
     * @memberof Wix.Utils.Media
     * @since 1.17.0
     * @param {String} Image item uri (relative to Wix media gallery).
     * @returns {String} A full URL pointing to the Wix static servers of an image with the default dimensions - width and height.
     * @example
     *
     * var imageUrl = Wix.Utils.Media.getImageUrl('relative_url.jpg')
     */
    getImageUrl: getImageUrl,
    /**
     * This method constructs a URL for a media item of type image and let the developer change the image dimensions as well as it's sharpening properties (optional),
     * see sharpening explained here - http://en.wikipedia.org/wiki/Unsharp_masking.
     * @function
     * @memberof Wix.Utils.Media
     * @since 1.17.0
     * @param {String} relativeUrl Static image url provided by the media dialog.
     * @param {Number} width Desired image width.
     * @param {Number} height Desired image height.
     * @param {Object} [sharpParams]
     * @param {Number} sharpParams.quality JPEG quality, leave as is (75) unless image size is important for your app.
     * @param {Number} sharpParams.resizaFilter Resize filter.
     * @param {Number} sharpParams.usm_r Unsharp mask radius.
     * @param {Number} sharpParams.usm_a Unsharp mask amount (percentage).
     * @param {Number} sharpParams.usm_t Unsharp mask threshold.
     * @returns {String} A full URL pointing to the Wix static servers of an image with the custom dimension parameters.
     * @example
     *
     * var resizedImageUrl = Wix.Utils.Media.getResizedImageUrl('relative_url.jpg', 500, 500)
     */
    getResizedImageUrl: getResizedImageUrl,
    /**
     * This method constructs a URL for a media item of type audio.
     * @function
     * @memberof Wix.Utils.Media
     * @since 1.17.0
     * @param {String} relativeUri audio item uri (relative to Wix media gallery)
     * @returns {String} A full URL pointing to the Wix static servers of an audio file with the default dimensions.
     * @example
     *
     * var audioUrl = Wix.Utils.Media.getAudioUrl('relative_url.mp3')
     */
    getAudioUrl: getAudioUrl,
    /**
     * This method constructs a URL for a media item of type document.
     * @function
     * @memberof Wix.Utils.Media
     * @since 1.17.0
     * @param {String} relativeUri Document item uri (relative to Wix media gallery).
     * @returns {String} A full URL pointing to the Wix static servers of a document media file with the default dimensions.
     * @example
     *
     * var documentUrl = Wix.Utils.Media.getDocumentUrl('relative_url.pdf')
     */
    getDocumentUrl: getDocumentUrl,
    /**
     * This method constructs a URL for a media item of type swf.
     * @function
     * @memberof Wix.Utils.Media
     * @since 1.17.0
     * @param {String} relativeUri Swf item uri (relative to Wix media gallery).
     * @returns {String} A full URL pointing to the Wix static servers of a swf media file  with the default dimensions.
     * @example
     *
     * var swfUrl = Wix.Utils.Media.getSwfUrl('relative_url.swf')
     */
    getSwfUrl: getSwfUrl,
    /**
     * This method constructs a URL for a media item of type secure music.
     * @function
     * @memberof Wix.Utils.Media
     * @since 1.41.0
     * @param {String} relativeUri secure music item uri (relative to Wix media gallery).
     * @returns {String} A full URL pointing to the Wix static servers of a secure media file.
     * @example
     *
     * var preview = Wix.Utils.Media.getSwfUrl('relative_url.swf')
     */
    getPreviewSecureMusicUrl: getPreviewSecureMusicUrl
  };
}();
utils = function () {
  var isString = function (arg) {
    return typeof arg === 'string';
  };
  var isFunction = function (arg) {
    return typeof arg === 'function';
  };
  var isObject = function (arg) {
    return typeof arg === 'object';
  };
  var isNumber = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Number]';
  };
  var isPercentValue = function (value) {
    return Object.prototype.toString.call(value) === '[object String]' && /^[0-9]+%$/.test(value);
  };
  var isArray = Array.isArray || function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };
  var has = function (obj, key) {
    return obj !== null && hasOwnProperty.call(obj, key);
  };
  var isBoolean = function (obj) {
    return obj === true || obj === false || Object.prototype.toString.call(obj) === '[object Boolean]';
  };
  return {
    isString: isString,
    isFunction: isFunction,
    isObject: isObject,
    isNumber: isNumber,
    isPercentValue: isPercentValue,
    isArray: isArray,
    has: has,
    isBoolean: isBoolean
  };
}();
/**
 * This is the description for the Utils namespace.
 * @memberof Wix
 * @namespace Wix.Utils
 */
Utils = function (core, Media, utils) {
  var getViewMode = function () {
    return window.top === window ? 'standalone' : core.getCurrentEditMode();
  };
  var toWixDate = function (date) {
    return date.toISOString();
  };
  var getCompId = function () {
    return core.getCompId();
  };
  var getOrigCompId = function () {
    return core.getQueryParameter('origCompId');
  };
  var getWidth = function () {
    return core.getQueryParameter('width');
  };
  var getLocale = function () {
    return core.getQueryParameter('locale');
  };
  var getCacheKiller = function () {
    return core.getQueryParameter('cacheKiller');
  };
  var getTarget = function () {
    return core.getQueryParameter('target');
  };
  var getSectionUrl = function (sectionIdentifier, callback) {
    if (utils.isObject(sectionIdentifier)) {
      if (utils.isFunction(callback)) {
        if (sectionIdentifier.sectionId) {
          var args = { sectionIdentifier: sectionIdentifier.sectionId };
          core.sendMessage(core.MessageTypes.GET_SECTION_URL, args, callback);
        } else {
          core.reportSdkError('Wrong arguments - an Object with sectionId must be provided');
        }
      } else {
        core.reportSdkError('Mandatory arguments - callback must be specified');
      }
    } else {
      var sectionUrl = core.getQueryParameter('section-url');
      return sectionUrl && sectionUrl.replace(/\?$/, '');
    }
  };
  var getInstanceId = function () {
    return core.getInstanceValue('instanceId');
  };
  var getSignDate = function () {
    return core.getInstanceValue('signDate');
  };
  var getUid = function () {
    return core.getInstanceValue('uid');
  };
  var getPermissions = function () {
    return core.getInstanceValue('permissions');
  };
  var getIpAndPort = function () {
    return core.getInstanceValue('ipAndPort');
  };
  var getDemoMode = function () {
    var mode = core.getInstanceValue('demoMode');
    mode = mode === null ? false : mode;
    return mode;
  };
  var getDeviceType = function () {
    return core.getQueryParameter('deviceType') || 'desktop';
  };
  var navigateToSection = function (sectionIdentifier, state, onFailure) {
    var args;
    if (utils.isFunction(sectionIdentifier)) {
      onFailure = sectionIdentifier;
    } else if (utils.isString(sectionIdentifier)) {
      args = { state: sectionIdentifier };
      onFailure = state;
    } else if (utils.isObject(sectionIdentifier) && utils.isFunction(state)) {
      args = { sectionIdentifier: sectionIdentifier };
      onFailure = state;
    } else {
      args = {
        sectionIdentifier: sectionIdentifier,
        state: state
      };
    }
    core.sendMessage(core.MessageTypes.NAVIGATE_TO_SECTION_PAGE, args, onFailure);
  };
  return {
    /**
     * This method returns a String which represents the current view mode.
     * @function
     * @memberof Wix.Utils
     * @since 1.12.0
     * @returns {String} The current view mode (editor/preview/site/standalone).
     * @example
     *
     * //viewMode will get a value like 'editor/preview/site'
     * var viewMode = Wix.Utils.getViewMode();
     */
    getViewMode: getViewMode,
    /**
     * Converts a JavaScript Date object into the correct format, ISO 8601, used by Wix APIs when dealing with dates.
     * It follows the same example provided by Mozilla as a polyfill for non-ECMA 262, 5th edition browsers.
     * @function
     * @memberof Wix.Utils
     * @since 1.28.0
     * @param {Date}
     * @return {String} Represents the given date formatted in ISO 8601.
     */
    toWixDate: toWixDate,
    /**
     * This method returns a String which represents the Widget/Page/Settings iframe's component id.
     * @function
     * @memberof Wix.Utils
     * @since 1.12.0
     * @returns {String} The Widget/Page/Settings iframe's component id.
     * @example
     *
     * //compId will get a value like 'TPWdgt-d88e26c-217b-505f-196d-2f6d87f1c2db'
     * var compId = Wix.Utils.getCompId();
     */
    getCompId: getCompId,
    /**
     * This method returns for valid endpoints a String which represents the Widget/Page iframe's component id which opened the App Settings panel.
     * @function
     * @memberof Wix.Utils
     * @since 1.12.0
     * @returns {String} The Widget/Page iframe's component id which opened the App Settings panel, popup or modal. If not exist returns null.
     * @example
     *
     * //origCompId will get a value like 'TPWdgt-d88e26c-217b-505f-196d-2f6d87f1c2db'
     * var origCompId = Wix.Utils.getOrigCompId();
     */
    getOrigCompId: getOrigCompId,
    /**
     * This method returns a Number which represents the Widget/Page/Settings iframe's width.
     * @function
     * @memberof Wix.Utils
     * @since 1.12.0
     * @returns {Number} The Widget/Page/Settings iframe's width.
     * @example
     *
     * // width will get a value like 300
     * var width = Wix.Utils.getWidth();
     */
    getWidth: getWidth,
    /**
     * This method for valid endpoints (Widget/Page/Settings) returns a String which represents the current locale of the site/editor. A locale is an abbreviated language tag that defines the user's language, country and any special variant preference of the user interface (e.g. Number format, Date format, etc.).
     * @function
     * @memberof Wix.Utils
     * @since 1.14.0
     * @return {String} A standard IETF language tag - en (English), es (Spanish), fr (Franch), it (Italian), etc.
     * @example
     *
     * //locale will get a value like 'en', 'es', etc.
     * var locale = Wix.Utils.getLocale()
     */
    getLocale: getLocale,
    /**
     * This method for valid endpoints (Widget/Page) returns a String which is the cacheKiller query parameter.
     * @function
     * @memberof Wix.Utils
     * @since 1.12.0
     * @returns {String} The cacheKiller query parameter, if not exist returns null.
     * @example
     *
     * //cacheKiller will get a value of a random string - 1359996970511
     *var cacheKiller = Wix.Utils.getCacheKiller();
     */
    getCacheKiller: getCacheKiller,
    /**
     * This method for valid endpoints (Widget/Page) returns a String which is the target query parameter (for the section-url).
     * @function
     * @memberof Wix.Utils
     * @since 1.12.0
     * @returns {String} The target query parameter, if not exist returns null.
     * @example
     *
     * //target will get a value like '_top' or '_self'
     * var target = Wix.Utils.getTarget();
     */
    getTarget: getTarget,
    /**
     * This method when no sectionId is given is valid for Page endpoint only.
     *
     * When a sectionId is not provided this method returns a string which is the section-url query parameter.
     *
     * When a sectionId and a callback function are provided this method returns the page app Url for the given sectionId.
     *
     * Please note: The parameter "section-url" here refers to the Page app URL.
     * @function
     * @memberof Wix.Utils
     * @since 1.37.0
     * @private
     * @param {Object} [sectionId] App pageId defined in dev.wix.com
     * @param {Function} [callback] A callback function that returns the section's URL - this is mandatory if sectionId was provided.
     *
     * @returns {String} The section-url query parameter, if not exist returns null.
     * @returns {Object} The section url for the given sectionId
     *
     * @example
     *
     * //url will get a value of a valid url like 'http://user.wix.com/site#!page/ch6q'
     * var url = Wix.Utils.getSectionUrl()
     *
     * var url = Wix.Utils.getSectionUrl({sectionId: 'mySectionId'}, function(data) {
     *      //do something with data.url
     * })
     */
    getSectionUrl: getSectionUrl,
    /**
     * This method returns a String which represents the app instance Id.
     * @function
     * @memberof Wix.Utils
     * @since 1.12.0
     * @returns {String} An app instance id - a GUID like value (decoded property of the instance query parameter)
     * @example
     *
     * //instanceId will get a GUID like value - e.g. '12de5bae-01e7-eaab-325f-436462858228'
     * var instanceId = Wix.Utils.getInstanceId();
     */
    getInstanceId: getInstanceId,
    /**
     * This method returns a String which represents the app instance signDate.
     * @function
     * @memberof Wix.Utils
     * @deprecated 1.13.0
     * @returns {String} An app instance signDate (property of the decoded instance query parameter).
     * @example
     *
     * //date will get a value like '2013-01-04T02:45:35.302-06:00'
     * var date = Wix.Utils.getSignDate();
     */
    getSignDate: getSignDate,
    /**
     * This method returns a String which represents the user identifier.
     * @function
     * @memberof Wix.Utils
     * @since 1.12.0
     * @returns {String} A user identifier (decoded property of the instance query parameter).
     * @example
     *
     * var uid = Wix.Utils.getUid();
     */
    getUid: getUid,
    /**
     * This method returns a String which represents the user's permissions (decoded property of the instance query parameter).
     * @function
     * @memberof Wix.Utils
     * @since 1.12.0
     * @returns {String} User's permissions (decoded property of the instance query parameter) - permissions can get the value of 'OWNER' for the site owner otherwise it will be null.
     * @example
     *
     * var permissions = Wix.Utils.getPermissions();
     */
    getPermissions: getPermissions,
    /**
     * This method returns a String which represents the app IP and port.
     * @function
     * @memberof Wix.Utils
     * @since 1.13.0
     * @returns {String} An app IP and port (decoded property of the instance query parameter).
     * @example
     *
     * //ipAndPort will get a value like '91.199.119.254/61308'
     * var ipAndPort = Wix.Utils.getIpAndPort();
     */
    getIpAndPort: getIpAndPort,
    /**
     * This method returns a Boolean which represents the app instance demo mode state.
     * @function
     * @memberof Wix.Utils
     * @since 1.12.0
     * @returns {Boolean} An app instance demo mode state (decoded property of the instance query parameter).
     * @example
     *
     * // demoMode will get a value like true/false
     * var demoMode = Wix.Utils.getDemoMode();
     */
    getDemoMode: getDemoMode,
    /**
     * This method returns a String which represents the current device type.
     * @function
     * @memberof Wix.Utils
     * @since 1.20.0
     * @returns {String} The current device type. One of the following: * desktop *mobile
     * @example
     *
     * // deviceType will get a value of 'desktop' or 'mobile'
     * var deviceType = Wix.Worker.Utils.getDeviceType();
     */
    getDeviceType: getDeviceType,
    /**
     * Navigates to the callers section page in the hosted site.
     * @function
     * @memberof Wix.Utils
     * @since 1.33.0
     * @param {Object} [sectionIdenfitier] App page id defined in dev.wix.com {sectionId : 'sectionId'}.
     * @param {String} [state] New app's state to push into the editor history stack.
     * @param {Function} onFailure This will be called if the hosting site does not include the section app, or if the caller's application does not include a section.
     * @example
     *
     *
     * Wix.Utils.navigateToSection({ sectionId : 'sectionId' }, 'myState', function(error){
     *    //Handle error use-case
     * });
     */
    navigateToSection: navigateToSection,
    Media: Media
  };
}(core, Media, utils);
/**
 * This is the description for the Utils namespace.
 * @memberof Wix
 * @namespace Wix.Styles
 */
Styles = function (core) {
  var EDITOR_PARAM_TYPES = [
    'color',
    'number',
    'boolean',
    'font'
  ];
  var getStyle = function (callback, key) {
    if (core.Styles[key] && callback) {
      callback(core.Styles[key]);
    } else {
      core.addToReadyQ(function () {
        if (callback) {
          callback(core.Styles[key]);
        }
      });
    }
    return core.Styles[key];
  };
  var setEditorParam = function (type, key, value) {
    if (EDITOR_PARAM_TYPES.indexOf(type) === -1) {
      core.reportSdkError('Invalid editor param type: "' + type + '"');
    }
    if (!key) {
      core.reportSdkError('Invalid key name');
    }
    core.sendMessage(core.MessageTypes.SET_STYLE_PARAM, {
      type: type,
      key: key,
      param: value
    });
  };
  var shallowCloneObject = function (obj, ignoreKeys) {
    var newObj = {};
    for (var p in obj) {
      if (obj.hasOwnProperty(p) && ignoreKeys.indexOf(p) === -1) {
        newObj[p] = obj[p];
      }
    }
    return newObj;
  };
  var getStyleParams = function (callback) {
    return getStyle(callback, 'style');
  };
  var setFontParam = function (key, value) {
    setEditorParam('font', key, value);
  };
  var getEditorFonts = function (callback) {
    return getStyle(callback, 'fontsMeta');
  };
  var getSiteTextPresets = function (callback) {
    return getStyle(callback, 'siteTextPresets');
  };
  var getFontsSpriteUrl = function (callback) {
    return getStyle(callback, 'fontsSpriteUrl');
  };
  var getStyleFontByKey = function (fontKey) {
    var font = core.Styles.mappedFonts && core.Styles.mappedFonts['style.' + fontKey];
    return font;
  };
  var getStyleFontByReference = function (fontReference) {
    return core.Styles.siteTextPresets && core.Styles.siteTextPresets[fontReference];
  };
  var getSiteColors = function (callback) {
    return getStyle(callback, 'siteColors');
  };
  var getStyleColorByKey = function (colorKey) {
    var color = core.Styles.mappedColors && core.Styles.mappedColors['style.' + colorKey];
    return color ? color.value : '';
  };
  var getColorByreference = function (colorReference) {
    var color = core.Styles.mappedColors && core.Styles.mappedColors[colorReference];
    color = shallowCloneObject(color, ['name']);
    return color;
  };
  var setColorParam = function (key, value) {
    if (value.hasOwnProperty('reference') && value.reference) {
      value.color = getColorByreference(value.reference);
    }
    setEditorParam('color', key, value);
  };
  var setNumberParam = function (key, value) {
    setEditorParam('number', key, value);
  };
  var setBooleanParam = function (key, value) {
    setEditorParam('boolean', key, value);
  };
  return {
    /**
     *
     * The getStyleParams method is used to retrieve the style parameters from the hosting Wix Platform.
     * The parameters includes colors numbers, booleans.
     * @function
     * @memberof Wix.Styles
     * @since 1.26.0
     * @param {Function} callback Callback function to retrieve the style values.
     * @example
     *
     * Wix.Styles.getStyleParams( function(styleParams) {
     *    //do something with the style params
     * });
     */
    getStyleParams: getStyleParams,
    /**
     * Sets a style font parameter in the Wix site
     *
     * @function
     * @memberof Wix.Styles
     * @private
     * @since 1.26.0
     * @param {String} key a unique key describing a boolean style parameter that was chosen by the developer in the ui-lib component.
     * @param {Boolean} value to store.
     */
    setFontParam: setFontParam,
    /**
     * Returns the list of Wix fonts meta data from the editor
     *
     * @function
     * @memberof Wix.Styles
     * @private
     * @since 1.26.0
     * @param {Function} callback A callback function to pass the Editor's font.
     */
    getEditorFonts: getEditorFonts,
    /**
     *
     * Returns the list of the text presets from the editor
     * @function
     * @memberof Wix.Styles
     * @private
     * @since 1.26.0
     * @param {Function} callback A callback function to pass the text presets.
     */
    getSiteTextPresets: getSiteTextPresets,
    /**
     *
     * Returns the url of the Wix fonts sprite, used to render the font picker.
     *
     * @function
     * @memberof Wix.Styles
     * @private
     * @since 1.26.0
     * @param {Function} callback A callback function to pass the sprite url.
     */
    getFontsSpriteUrl: getFontsSpriteUrl,
    /**
     *
     * Returns style font by a unique key
     *
     * @function
     * @memberof Wix.Styles
     * @private
     * @since 1.26.0
     * @param {String} fontKey The font key that was chosen by the developer in the ui-lib component.
     * @return {Object}
     */
    getStyleFontByKey: getStyleFontByKey,
    /**
     *
     * Returns a style font by it's reference name
     *
     * @private
     * @function
     * @memberof Wix.Styles
     * @since 1.26.0
     * @param {String} fontReference Font reference, e.g., 'Title'.
     * @return {Object}
     */
    getStyleFontByReference: getStyleFontByReference,
    /**
     * Function getSiteColors
     *
     * Returns the currently active site colors
     * @private
     * @function
     * @memberof Wix.Styles
     * @since 1.26.0
     * @param {Function} callback
     */
    getSiteColors: getSiteColors,
    /**
     *
     * Returns the css color value of saved style parameter
     *
     * @private
     * @function
     * @memberof Wix.Styles
     * @since 1.26.0
     * @param {String} colorKey A unique key describing a color style parameter that was chosen by the developer in the ui-lib component.
     * @return {String} css Color string. e.g., "#FFFFFF" or "rgba(0,0,0,0.5)"
     */
    getStyleColorByKey: getStyleColorByKey,
    /**
     *
     * Returns the color object of editor style
     *
     * @private
     * @function
     * @memberof Wix.Styles
     * @since 1.26.0
     * @param {String} colorReference A unique key describing a theme color parameter.
     * @return {Object} data A map describing a Wix style color.
     */
    getColorByreference: getColorByreference,
    /**
     *
     * Sets a style color parameter
     *
     * @private
     * @function
     * @memberof Wix.Styles
     * @since 1.26.0
     * @param {String} key A unique key describing a color style parameter that was chosen by the developer in the ui-lib component.
     * @param {Object} value
     */
    setColorParam: setColorParam,
    /**
     * Function setNumberParam
     *
     * Sets a style number parameter
     *
     * @private
     * @function
     * @memberof Wix.Styles
     * @since 1.22.0
     * @param {String} key A unique key describing a number style parameter that was chosen by the developer in the ui-lib component.
     * @param {Number} value
     */
    setNumberParam: setNumberParam,
    /**
     * Function setBooleanParam
     *
     * Sets a style boolean parameter
     *
     * @private
     * @function
     * @memberof Wix.Styles
     * @since 1.22.0
     * @param {String} key A unique key describing a boolean style parameter that was chosen by the developer in the ui-lib component.
     * @param {Boolean} value
     */
    setBooleanParam: setBooleanParam
  };
}(core);
/**
 * A theme for a popup window.
 * @memberof Wix
 * @namespace Theme
 */
Theme = {
  /**
   * Default theme is used for regular popup look & feel - border, shadow, close button.
   * @memberof Wix.Theme
   * @since 1.17.0
   */
  DEFAULT: 'DEFAULT',
  /**
   * Bare theme is used for no decorations at all.
   * @memberof Wix.Theme
   * @since 1.17.0
   */
  BARE: 'BARE'
};
/**
 * Represents a Wix popup window origin. A window can be positioned where it is origin is the view port (0,0) or
 * where the origin is another widget (x,y).
 * @memberof Wix
 * @namespace WindowOrigin
 */
WindowOrigin = {
  /**
   * Default position. The popup will be placed inside the browser viewport.
   * @see WindowOrigin.FIXED
   * @memberof Wix.WindowOrigin
   * @since 1.17.0
   */
  DEFAULT: 'FIXED',
  /**
   * Fixed position. The popup will be placed inside the browser viewport.
   * @memberof Wix.WindowOrigin
   * @since 1.17.0
   */
  FIXED: 'FIXED',
  /**
   * Relative position. The popup will be placed relative to the opening widget (Not supported for Page).
   * @memberof Wix.WindowOrigin
   * @since 1.17.0
   */
  RELATIVE: 'RELATIVE',
  /**
   * Absolute position. The popup will be placed relative to a given x,y coordinates that their origin is the top-left corner of the widget.
   * @memberof Wix.WindowOrigin
   * @author mayah@wix.com
   * @since 1.28.0
   */
  ABSOLUTE: 'ABSOLUTE'
};
/**
 * Represents a predefined values to position a Wix popup windows without the hassle of figuring out the position yourself.
 * Can be used to position the window relatively (to the calling widget) or absolutely (to the view port).
 *
 * @memberof Wix
 * @namespace WindowPlacement
 */
WindowPlacement = {
  /**
   * Top left placement.
   * @memberof Wix.WindowPlacement
   * @since 1.17.0
   */
  TOP_LEFT: 'TOP_LEFT',
  /**
   * Top right placement.
   * @memberof Wix.WindowPlacement
   * @since 1.17.0
   */
  TOP_RIGHT: 'TOP_RIGHT',
  /**
   * Bottom right placement.
   * @memberof Wix.WindowPlacement
   * @since 1.17.0
   */
  BOTTOM_RIGHT: 'BOTTOM_RIGHT',
  /**
   * Bottom left placement.
   * @memberof Wix.WindowPlacement
   * @since 1.17.0
   */
  BOTTOM_LEFT: 'BOTTOM_LEFT',
  /**
   * Top center placement.
   * @memberof Wix.WindowPlacement
   * @since 1.17.0
   */
  TOP_CENTER: 'TOP_CENTER',
  /**
   * Center right placement.
   * @memberof Wix.WindowPlacement
   * @since 1.17.0
   */
  CENTER_RIGHT: 'CENTER_RIGHT',
  /**
   * Bottom center placement.
   * @memberof Wix.WindowPlacement
   * @since 1.17.0
   */
  BOTTOM_CENTER: 'BOTTOM_CENTER',
  /**
   * Center left placement.
   * @memberof Wix.WindowPlacement
   * @since 1.17.0
   */
  CENTER_LEFT: 'CENTER_LEFT',
  /**
   * (FIXED origin only) center of the screen.
   * @memberof Wix.WindowPlacement
   * @since 1.17.0
   */
  CENTER: 'CENTER'
};
/**
 * This is the description for the Wix namespace.
* @namespace Wix
*/
Base = function (core, Utils, Styles, utils, Theme, WindowOrigin, WindowPlacement) {
  var openModal = function (url, width, height, onClose, theme) {
    if (Utils.getViewMode() === 'editor') {
      core.reportSdkError('Invalid View Mode, editor, only preview and site are supported');
      return;
    }
    var args = {
      url: url,
      width: width,
      height: height,
      theme: theme || Theme.DEFAULT
    };
    core.sendMessage(core.MessageTypes.OPEN_MODAL, args, onClose);
  };
  var setHeight = function (height) {
    if (!utils.isNumber(height)) {
      core.reportSdkError('Mandatory argument - height - should be of type Number');
      return;
    } else if (height < 0) {
      core.reportSdkError('height should be a positive integer');
      return;
    }
    core.sendMessage(core.MessageTypes.HEIGHT_CHANGED, { 'height': height });
  };
  var closeWindow = function (message) {
    var args = { message: message };
    core.sendMessage(core.MessageTypes.CLOSE_WINDOW, args);
  };
  var scrollTo = function (x, y) {
    var args = {
      x: x,
      y: y
    };
    core.sendMessage(core.MessageTypes.SCROLL_TO, args);
  };
  var getSiteInfo = function (onSuccess) {
    core.sendMessage(core.MessageTypes.SITE_INFO, null, onSuccess);
  };
  var getSitePages = function (callback) {
    core.sendMessage(core.MessageTypes.GET_SITE_PAGES, null, callback);
  };
  var getStyleParams = function (callback) {
    core.reportSdkMsg('Wix.getStyleParams is DEPRECATED use Wix.Styles.getStyleParams');
    return Styles.getStyleParams(callback);
  };
  var reportHeightChange = function (height) {
    core.reportSdkError('Deprecated, use Wix.setHeight instead');
  };
  var pushState = function (state) {
    if (!utils.isString(state)) {
      core.reportSdkError('Missing mandatory argument - state - should be of type String');
      return;
    }
    core.sendMessage(core.MessageTypes.APP_STATE_CHANGED, { 'state': state });
  };
  var getCurrentPageId = function (callback) {
    core.sendMessage(core.MessageTypes.GET_CURRENT_PAGE_ID, null, callback);
  };
  var navigateToPage = function (pageId) {
    if (!pageId) {
      core.reportSdkError('Missing mandatory argument - pageId');
      return;
    }
    core.sendMessage(core.MessageTypes.NAVIGATE_TO_PAGE, { pageId: pageId });
  };
  var currentMember = function (onSuccess) {
    if (Utils.getViewMode() !== 'site') {
      core.reportSdkError('Invalid View Mode, this method works only for site view mode');
      return;
    }
    core.sendMessage(core.MessageTypes.SM_CURRENT_MEMBER, null, onSuccess);
  };
  var requestLogin = function (onSuccess) {
    core.sendMessage(core.MessageTypes.SM_REQUEST_LOGIN, null, onSuccess);
  };
  var openPopup = function (url, width, height, position, onClose, theme) {
    if (Utils.getViewMode() === 'editor') {
      core.reportSdkError('Invalid View Mode, editor, only preview and site are supported');
      return;
    }
    // in case position was omitted and the last argument is the onClose callback
    if (arguments.length === 4 && utils.isFunction(arguments[3])) {
      position = {};
    }
    position = position || {};
    position.origin = position.origin || WindowOrigin.DEFAULT;
    position.placement = position.placement || WindowPlacement.CENTER;
    var args = {
      url: url,
      width: width,
      height: height,
      position: position,
      theme: theme || Theme.DEFAULT
    };
    core.sendMessage(core.MessageTypes.OPEN_POPUP, args, onClose);
  };
  var resizeWindow = function (width, height, onComplete) {
    var args = {
      width: width,
      height: height
    };
    core.sendMessage(core.MessageTypes.RESIZE_WINDOW, args, onComplete);
  };
  var addEventListener = function (eventName, callBack) {
    return core.addEventListenerInternal(eventName, callBack, false);
  };
  var removeEventListener = function (eventName, callBackOrId) {
    core.removeEventListenerInternal(eventName, callBackOrId, false);
  };
  var scrollBy = function (x, y) {
    var args = {
      x: x,
      y: y
    };
    core.sendMessage(core.MessageTypes.SCROLL_BY, args);
  };
  var getBoundingRectAndOffsets = function (callback) {
    core.sendMessage(core.MessageTypes.BOUNDING_RECT_AND_OFFSETS, null, callback);
  };
  return {
    /**
     * The openModal method allows an app to open a modal window within the site or preview.
     *
     * A modal is a runtime Widget that is not part of the site structure.
     *
     * The modal window is a singleton (every new modal closes the previous one) and contains a lightbox.
     *
     * A modal can be dismissed by the user if it touches the lightbox, presses the closing button or by the app itself
     * if it calls the Wix.closeWindow from within the modal iframe.
     *
     * The onClose argument can be used to detect modal close.
     * @function
     * @memberof Wix
     * @since 1.16.0
     * @param {String} url Model iframe url.
     * @param {Number} width The modal window width.
     * @param {Number} height The modal window height.
     * @param {Function} [onClose] Onclose callback function.
     * @param {Wix.Theme} [theme] The modal window theme, one of Wix.Theme values. Wix.Theme.DEFAULT is used for regular modal look & feel - border, shadow, close button. Wix.Theme.BARE is used for no decorations at all.
     * @example
     *
     * var onClose = function(message) { console.log("modal closed", message); }
     * Wix.openModal("http://sslstatic.wix.com/services/js-sdk/1.16.0/html/modal.html", 400, 400, onClose);
     *
     */
    openModal: openModal,
    /**
     *
     * @function
     * @memberof Wix
     *
     * @description
     *
     * The openPopup method allows an app to open a popup window within the site or preview.
     *
     * A popup is a runtime Widget that is not part of the site structure.
     *
     * Unlike the modal, a popup is not a singleton and doesn't present a lightbox.
     *
     * A popup can also be positioned by the caller. We currently support a predefined set of
     * positions that can be used when opening a popup.
     *
     * A popup is dismissed by the user if he presses the close button or by the app itself if it calls the Wix.closeWindow from within
     * the popup iframe.
     *
     * The onClose argument can be used to detect modal close.
     *
     * Popup positioning
     * A popup position is determined by two properties, it's position origin and it's position placement.
     * A position origin determines the origin point (x,y) which will be used to apply the position placement.
     * The position origin is defined under [Wix.WindowOrigin](Wix.WindowOrigin) and can have the following values:
     *
     * [Wix.WindowOrigin.DEFAULT](Wix.WindowOrigin.html#DEFAULT)
     *
     * [Wix.WindowOrigin.FIXED](Wix.WindowOrigin.html#FIXED)
     *
     * [Wix.WindowOrigin.RELATIVE]((Wix.WindowOrigin.html#RELATIVE)
     *
     * [Wix.WindowOrigin.ABSOLUTE]((Wix.WindowOrigin.html#ABSOLUTE)
     *
     * A position placement is a predefined set of locations when a popup will be placed.
     * The placement values are valid for Wix.WindowOrigin.FIXED, Wix.WindowOrigin.ABSOLUTE and Wix.WindowOrigin.RELATIVE origins but mapped to a different positions on the screen.
     * The position placement is defined under Wix.WindowPlacement and can have the following values:
     *
     * [Wix.WindowPlacement.TOP_LEFT](Wix.WindowPlacement.html#TOP_LEFT)
     *
     * [Wix.WindowPlacement.TOP_CENTER](Wix.WindowPlacement.html#TOP_CENTER)
     *
     * [Wix.WindowPlacement.TOP_RIGHT](Wix.WindowPlacement.html#TOP_RIGHT)
     *
     * [Wix.WindowPlacement.CENTER_LEFT](Wix.WindowPlacement.html#CENTER_LEFT)
     *
     * [Wix.WindowPlacement.CENTER](Wix.WindowPlacement.html#CENTER)
     *
     * [Wix.WindowPlacement.CENTER_RIGHT](Wix.WindowPlacement.html#CENTER_RIGHT)
     *
     * [Wix.WindowPlacement.BOTTOM_LEFT](Wix.WindowPlacement.html#BOTTOM_LEFT)
     *
     * [Wix.WindowPlacement.BOTTOM_CENTER](Wix.WindowPlacement.html#BOTTOM_CENTER)
     *
     * [Wix.WindowPlacement.BOTTOM_RIGHT](Wix.WindowPlacement.html#BOTTOM_RIGHT)
     *
     * @since 1.17.0
     * @param {String} url Popup iframe's url.
     * @param {Number} width Popup width in pixels.
     * @param {Number} height Popup height in pixels.
     * @param {Object} position
     * @param {Function} [onClose] Callback function.
     * @param {Wix.Theme} [theme] The popup window theme, one of Wix.Theme values. Wix.Theme.DEFAULT is used for regular popup look & feel - border, shadow, close button. Wix.Theme.BARE is used for no decorations at all.
     *
     * Note:
     * In a RELATIVE or ABSOLUTE origin, there is a chance that the requested popup can not fit in the
     * desired position since it's size exceeds the margin between the opening Widget and the screen size.
     * A Widget position is determined by site owners when they build their sites while the Widget
     * is not aware to it's position in the site. When the Wix Platform render popups,
     * it calculates if a popup in the requested size can fit the requested position.
     * If not, the Wix Platform will default the position to {origin: Wix.WindowOrigin.FIXED, placement: Wix.WindowPlacement.CENTER},
     * i.e., the center of the screen.
     *
     *
     * @example
     * // The following call will open a popup window positioned in the center of the screen
     * var position =  {origin: Wix.WindowOrigin.FIXED, placement: Wix.WindowPlacement.CENTER};
     * var onClose = function(message) { console.log("popup closed", message) };
     * Wix.openPopup("http://sslstatic.wix.com/services/js-sdk/1.16.0/html/modal.html", 400, 400, position, onClose);
     * @example
     * // The following call will open a popup window positioned bottom-right to the point (x, y), originated in the top-left corner of the widget
     * var position =  {origin: Wix.WindowOrigin.ABSOLUTE, placement: Wix.WindowPlacement.BOTTOM_RIGHT, x: 20, y: 100};
     * var onClose = function(message) { console.log("popup closed", message) };
     * Wix.openPopup("http://sslstatic.wix.com/services/js-sdk/1.16.0/html/modal.html", 400, 400, position, onClose);
     *
     */
    openPopup: openPopup,
    /**
     * This method requests the hosting Wix platform to change the iframe height inside the site/editor.
     * @function
     * @memberof Wix
     * @since 1.22.0
     * @param {Number} height An integer that represents the desired height in pixels.
     * @example
     *
     * Wix.setHeight(height);
     *
     */
    setHeight: setHeight,
    /**
     * The closeWindow method is available only under a modal endpoint (will not have any effect for other endpoints). It allows the modal to close itself programmatically.
     * @function
     * @memberof Wix
     * @since 1.16.0
     * @param {Object} [message] A custom message object to pass to the opener's onClose callback function.
     * @example
     *
     * // The following call will close the modal/popup window and send a the object message to the opener onClose callback
     * var message = {"reason": "button-clicked"};
     * Wix.closeWindow(message);
     *
     */
    closeWindow: closeWindow,
    /**
     * The scrollTo method will perform a scroll to a fixed position in the app's hosting site window exactly as the standard method do.
     * @function
     * @memberof Wix
     * @since 1.19.0
     * @param {Number} x The coordinate to scroll to, along the x-axis.
     * @param {Number} y The coordinate to scroll to, along the y-axis.
     * @example
     *
     * Wix.scrollTo(0, 0);
     *
     */
    scrollTo: scrollTo,
    /**
     * The scrollBy method will perform a scroll by the specified number of pixels in the app's hosting site window exactly as the standard method - http://www.w3schools.com/jsref/met_win_scrollto.asp do.
     * @function
     * @memberof Wix
     * @since 1.19.0
     * @param {Number} x How many pixels to scroll by, along the x-axis (horizontal)
     * @param {Number} y How many pixels to scroll by, along the y-axis (vertical)
     * @example
     *
     * // The following call will scroll to the top of the page
     * Wix.scrollBy(0, 0);
     *
     */
    scrollBy: scrollBy,
    /**
     * The getsiteInfo method is used to retrieve information about the host site in which the app is shown.
     * @function
     * @memberof Wix
     * @since 1.3.0
     * @param callback (Function) a callback function to receive the site pages.
     * @return {Object} data JSON containing the site info. It's properties are:
     *
     *  Name           | Type      | Description
     * ----------------|-----------|------------
     * siteTitle       | `String`  | The title of the site that is used for SEO.
     * pageTitle       | `String`  | The site current page title that is used for SEO.
     * siteDescription | `String`  | The description of the site that is used for SEO
     * siteKeywords    | `String`  | The keywords which were related to the site and are used for SEO.
     * referrer        | `String`  | The referrer header of the http request.
     * url             | `String`  | The full url taken from the location.href, include internal site state, for example: http://user.wix.com/site-name#!pageTitle/pageId, http://www.domain.com#!pageTitle/pageId
     * baseUrl         | `String`  | Base url of the current site, for example: http://user.wix.com/site-name, http://www.domain.com
     *
     * @example
     * Wix.getSiteInfo( function(siteInfo) {
     *      // do something with the siteInfo
     * });
     */
    getSiteInfo: getSiteInfo,
    /**
     * The getSitePages method is used to retrieve the site structure from the hosting Wix Platform. The site structure includes visible and hidden pages as well as sub pages.
     * @function
     * @memberof Wix
     * @since 1.17.0
     * @param {Function} callback A callback function to receive the site pages.
     * @return {Array} Array containing an ordered set of the site pages. A single page description contains the following properties:
     *
     *  Name             | Type      | Description
     * ------------------|-----------|------------
     * id                | `String`  | The page id.
     * title             | `String`  | The page title.
     * hide              | `Boolean` | A flag indicating if the page is hidden.
     * subPages(optional)| `Array`   | An ordered set of sub pages.
     * @example
     *
     * Wix.getSitePages(function(sitePages) {
     *    // do something with the site pages
     * });
     */
    getSitePages: getSitePages,
    /**
     * The getBoundingRectAndOffsets method returns the app's component bounding rect and site's offset.
     * @function
     * @memberof Wix
     * @since 1.26.0
     * @param {Function} callback A callback function which passes back the bounding rect and offsets.
     *
     * @example
     * Wix.getBoundingRectAndOffsets(function(data){
     *    // use the offsets and rect details
     * });
     */
    getBoundingRectAndOffsets: getBoundingRectAndOffsets,
    /**
     * The removeEventListener method allows to remove previously assigned event listeners that were specified using Wix.addEventListener.
     * @function
     * @memberof Wix
     * @since 1.25.0
     * @param {Wix.Events} eventName Unique event identifier.
     * @param {Function} callBackOrId A callback function that was used with addEventListener or an id returned by addEventListener.
     *
     * @example
     * var callback = function(){};
     * var id = Wix.addEventListener(Wix.Events.EDIT_MODE_CHANGE, function(data) {
     *     //do something
     * });
     * Wix.addEventListener(Wix.Events.PAGE_NAVIGATION, callback);
     * // remove listener as a callback function
     * Wix.removeEventListener(Wix.Events.PAGE_NAVIGATION, callback);
     * // remove listener as an id
     * Wix.removeEventListener(Wix.Events.EDIT_MODE_CHANGE, id);
     */
    removeEventListener: removeEventListener,
    /**
     * The addEventListener method lets the App listen to events that happens inside the editor/site.
     * @function
     * @memberof Wix
     * @since 1.11.0
     * @param {Wix.Events} eventName Unique event identifier.
     * @param {Function} handler A callback function that will get called by the SDK once an event occur.
     * The events that you can currently listen to are:
     * @see Wix.Events.EDIT_MODE_CHANGE
     * @see Wix.Events.PAGE_NAVIGATION_CHANGE
     * @see Wix.Events.PAGE_NAVIGATION
     * @see Wix.Events.PAGE_NAVIGATION_IN
     * @see Wix.Events.PAGE_NAVIGATION_OUT
     * @see Wix.Events.SCROLL
     * @see Wix.Events.COMPONENT_DELETED
     * @see Wix.Events.SITE_PUBLISHED
     * @see Wix.Events.SETTINGS_UPDATED
     * @see Wix.Events.STATE_CHANGED
     *
     */
    addEventListener: addEventListener,
    /**
     * The resizeWindow method is valid only for fixed position widgets. It re-sizes the widget window.
     * @function
     * @memberof Wix
     * @since 1.19.0
     * @param {Number} width Window width in pixels.
     * @param {Number} height Window height in pixels.
     * @param [Function] onComplete On resize complete callback function.
     * @example
     *
     * // The following call will resize the widget window
     * Wix.resizeWindow(300,300);
     *
     */
    resizeWindow: resizeWindow,
    /**
     *
     * <div style="margin:20px 0;background-color:blue;border-radius: 5px;border-style: solid;border-width: 1px;padding:10px;background-color: #E0EFFF;border-color: #9EB6D4;">
     * This method is part of Wix Site Members feature. To use it a manual provisioning is required by the Wix team, contact apps@wix.com to enable it for your app.
     * </div>
     *
     * This method is relevant for live sites and not from the App Settings. The method requests the current site visitor of the Wix site to log-in or register.
     *
     * After a successful log-in, the Wix site will reload including the app iframe and the new signed-instance parameter will contain the details of the logged in user.
     *
     *
     * The method has an affect only for a published site. If called in the Wix editor, the method has no affect.          *
     *
     * @function
     * @memberof Wix
     * @since 1.6.0
     * @param {Function} callback A callback function to receive the current member details.
     * @example
     *
     * Wix.requestLogin(function (data) {
     *    //do something with data
     * }
     */
    requestLogin: requestLogin,
    /**
     *
     * <div style="margin:20px 0;background-color:blue;border-radius: 5px;border-style: solid;border-width: 1px;padding:10px;background-color: #E0EFFF;border-color: #9EB6D4;">
     * This method is part of Wix Site Members feature. To use it a manual provisioning is required by the Wix team, contact apps@wix.com to enable it for your app.
     * </div>
     *
     * This method is relevant for live sites and not from the App Settings.
     *
     * @function
     * @memberof Wix
     * @since 1.6.0
     * @param {Function} callback A callback function to receive the current member details.
     * @returns {Object} JSON Containing the user's details.
     *
     * This method returns the details of the current site visitor that is logged into the Wix site, using the Wix site member options.
     *
     * Name              | Type       | Value
     * ------------------|-----------|------------
     * name  | 'String'  | The current member's name
     * email | 'String'  | The current member's email
     * id    | 'String'  | The current member's id
     * owner | 'Boolean' | Indicates if the user is the owner of the site
     *
     * @example
     *
     * Wix.currentMember(function(memberDetails) {
     *   // save memberDetails
     * }
     *
     *
     */
    currentMember: currentMember,
    /**
     * The navigateToPage method is used to navigate to a specific page inside the editor/preview/site.
     *
     * The function accepts a single argument, page id, which is retrieved by using the method Wix.getSitePages().
     *
     * @function
     * @memberof Wix
     * @since 1.17.0
     * @param {String} pageId A string representing the page id target.
     * @returns {Object} JSON Containing the user's details.
     *
     * This method returns the details of the current site visitor that is logged into the Wix site, using the Wix site member options.
     *
     * Name              | Type       | Value
     * ------------------|-----------|------------
     * name  | 'String'  | The current member's name
     * email | 'String'  | The current member's email
     * id    | 'String'  | The current member's id
     * owner | 'Boolean' | Indicates if the user is the owner of the site
     *
     * @example
     *
     * Wix.navigateToPage(PAGE_ID);
     */
    navigateToPage: navigateToPage,
    /**
     * The getCurrentPageId method returns the page id of the app hosting page.
     *
     * @function
     * @memberof Wix
     * @since 1.31.0
     * @author lior.shefer@wix.com
     * @example
     *
     * // The following call will return the page id of the app hosting page.
     * Wix.getCurrentPageId(function(pageId) {
     *     //store the site pageId
     * }
     */
    getCurrentPageId: getCurrentPageId,
    /**
     * This method enable AJAX style Page apps to inform the Wix platform about a change in the app internal state. The new state will be reflected in the site/page URL.
     * Once you call the pushState method, the browser top window URL will change the 'app-state' path part to the new state you provide with the pushState
     * method (similar to the browser history API - https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history).
     * For a full explanation of how deep-linking works with AJAX style apps, see Deep Linking for AJAX Style Apps - http://dev.wix.com/docs/display/DRAF/Developing+a+Page+App.
     * @function
     * @memberof Wix
     * @since 1.8.0
     * @param {String} state New app's state to push into the editor history stack.
     * @example
     *
     * Wix.pushState("app-state");
     *
     */
    pushState: pushState,
    /**
     * This method requests the hosting Wix platform to change the iframe height inside the site/editor.
     * @function
     * @memberof Wix
     * @since 1.8.0
     * @deprecated
     * @see Wix.setHeight
     * @param {Number} height An integer that represents the desired height in pixels.
     *
     * @example
     *
     * Wix.reportHeightChange(height);
     *
     */
    reportHeightChange: reportHeightChange,
    /**
     * The getStyleParams method is used to retrieve the style parameters from the hosting Wix Platform. The parameters includes colors numbers, booleans.
     * @function
     * @memberof Wix
     * @since 1.22.0
     * @deprecated
     * @see Wix.Styles.getStyleParams
     * @param {function} callback A callback function to receive the style parameters.
     *
     * @example
     *
     * Wix.getStyleParams( function(styleParams) {
     *  // do something with the style params
     * });
     *
     */
    getStyleParams: getStyleParams
  };
}(core, Utils, Styles, utils, Theme, WindowOrigin, WindowPlacement);
/**
 * This is the description for the Error namespace.
 * @memberof Wix
 * @namespace Wix.Error
 */
Error = {
  /**
   * Indicates an unknown error happened on Wix side which could not be recovered. When handling this error, you can try again or prompt the user with an error dialog.
   * @memberof Wix.Error
   * @since 1.27.0
   */
  WIX_ERROR: 'WIX_ERROR',
  /**
   * Indicates the activity could not be found.
   * @memberof Wix.Error
   * @since 1.27.0
   */
  NOT_FOUND: 'NOT_FOUND',
  /**
   * Indicates the dates you provided are in the wrong format or are not valid date ranges.
   * @memberof Wix.Error
   * @since 1.27.0
   */
  BAD_REQUEST: 'BAD_REQUEST',
  /**
   * @memberof Wix.Error
   * @since 1.27.0
   */
  INVALID_SCHEMA: 'INVALID_SCHEMA'
};
/**
 * @class WixDataCursor
 */
WixDataCursor = function () {
  var _callService = function (onSuccess, onFailure, cursorId) {
    var that = this;
    var onComplete = function onComplete(response) {
      if (response.error) {
        onFailure(response);
      } else {
        that._nextCursor = response.data.nextCursor;
        that._previousCursor = response.data.previousCursor;
        that._data = response.data.results;
        onSuccess(response.data.results);
      }
    };
    var args = {
      cursorId: cursorId,
      options: this._options
    };
    this.core.sendMessage(this._serviceMessageType, args, onComplete);
  };
  function WixDataCursor(core, serviceMessageType, data, total, pageSize) {
    if (typeof serviceMessageType !== 'string' || typeof core === 'undefined') {
      throw new TypeError('Mandatory parameters are missing.');
    }
    this._serviceMessageType = serviceMessageType;
    this._data = data || [];
    this._nextCursor = null;
    this._previousCursor = null;
    this._total = total;
    this._pageSize = pageSize;
    this._options = {};
    this.core = core;
  }
  /**
   * @memberof WixDataCursor
   * @returns {boolean} If WixDataCursor has more data.
   */
  WixDataCursor.prototype.hasNext = function hasNext() {
    return !!this._nextCursor;
  };
  /**
   * @memberof WixDataCursor
   * @returns {boolean} If WixDataCursor has previous data.
   */
  WixDataCursor.prototype.hasPrevious = function hasPrevious() {
    return !!this._previousCursor;
  };
  /**
   * @memberof WixDataCursor
   * @param onSuccess
   * @param onFailure
   * @returns {boolean} The next WixDataCursor object.
   */
  WixDataCursor.prototype.next = function next(onSuccess, onFailure) {
    if (this.hasNext()) {
      _callService.call(this, onSuccess, onFailure, this._nextCursor);
    } else {
      onSuccess([]);
    }
  };
  /**
   * @memberof WixDataCursor
   * @param onSuccess
   * @param onFailure
   * @returns {boolean} The previous WixDataCursor object.
   */
  WixDataCursor.prototype.previous = function previous(onSuccess, onFailure) {
    if (this.hasPrevious()) {
      _callService.call(this, onSuccess, onFailure, this._previousCursor);
    } else {
      onSuccess([]);
    }
  };
  /**
   * @memberof WixDataCursor
   * @private
   * @param {Object} data
   */
  WixDataCursor.prototype.setData = function setData(data) {
    this._data = data;
  };
  /**
   * @memberof WixDataCursor
   * @private
   * @returns {WixDataCursor[]}
   */
  WixDataCursor.prototype.getData = function getData() {
    return this._data;
  };
  /**
   * @memberof WixDataCursor
   * @private
   * @param {WixDataCursor} cursor
   */
  WixDataCursor.prototype.setNextCursor = function setNextCursor(cursor) {
    this._nextCursor = cursor;
  };
  /**
   * @memberof WixDataCursor
   * @private
   * @param {WixDataCursor} cursor
   */
  WixDataCursor.prototype.setPreviousCursor = function setPreviousCursor(cursor) {
    this._previousCursor = cursor;
  };
  /**
   * @memberof WixDataCursor
   * @returns {Number} The total number of Object in the cursor.
   */
  WixDataCursor.prototype.getTotal = function getTotal() {
    return this._total;
  };
  /**
   * @memberof WixDataCursor
   * @returns {Number} The number of the cursor page size.
   */
  WixDataCursor.prototype.getPageSize = function getPageSize() {
    return this._pageSize;
  };
  /**
   * @memberof WixDataCursor
   * @param {Object} options
   * @private
   * @returns Sets the cursor options object.
   */
  WixDataCursor.prototype.setOptions = function setOptions(options) {
    this._options = options;
  };
  return WixDataCursor;
}();
responseHandlers = function (core, Error, WixDataCursor) {
  var getWixError = function (errorCode) {
    var wixErrorMessage = Error.WIX_ERROR;
    switch (errorCode) {
    case 404:
      wixErrorMessage = Error.NOT_FOUND;
      break;
    case 400:
      wixErrorMessage = Error.BAD_REQUEST;
      break;
    case 'INVALID_SCHEMA':
      wixErrorMessage = Error.INVALID_SCHEMA;
      break;
    }
    return wixErrorMessage;
  };
  var handleDataResponse = function (response, onSuccess, onFailure) {
    if (response.error) {
      var wixErrorMessage = this.getWixError(response.error.errorCode);
      if (onFailure) {
        onFailure(wixErrorMessage);
      }
    } else {
      onSuccess(response.data);
    }
  };
  var handleCursorResponse = function (response, onSuccess, onFailure, messageType, options) {
    if (!response.error) {
      var cursor = new WixDataCursor(core, messageType, response.data.results, response.data.total, response.data.pageSize);
      cursor.setNextCursor(response.data.nextCursor);
      cursor.setPreviousCursor(response.data.previousCursor);
      cursor.setOptions(options);
      onSuccess(cursor);
    } else {
      var wixErrorMessage = this.getWixError(response.error.errorCode);
      if (onFailure) {
        onFailure(wixErrorMessage);
      }
    }
  };
  return {
    getWixError: getWixError,
    handleDataResponse: handleDataResponse,
    handleCursorResponse: handleCursorResponse
  };
}(core, Error, WixDataCursor);
/**
 * Functions and objects relating to the purchasing and billing process. To define products for purchase within your app, go to the Features section of the Wix Developer app registration <a href="http://dev.wix.com" target="_blank">dev.wix.com</a>.
 * @memberof Wix
 * @namespace Wix.Billing
 */
Billing = function (core, utils, responseHandlers) {
  var openBillingPageForProduct = function (vendorProductId, cycle, onError) {
    if (!utils.isString(vendorProductId)) {
      core.reportSdkError('Missing mandatory argument - vendorProductId must be a string');
      return;
    }
    if (!utils.has(this.Cycle, cycle)) {
      core.reportSdkError('Missing mandatory argument - cycle must be one of Wix.Billing.Cycle');
      return;
    }
    var args = {
      vendorProductId: vendorProductId,
      cycle: cycle
    };
    core.sendMessage(core.MessageTypes.OPEN_BILLING_PAGE_FOR_PRODUCT, args, onError);
  };
  var getBillingPageForProduct = function (vendorProductId, cycle, onSuccess, onError) {
    if (!utils.isString(vendorProductId)) {
      core.reportSdkError('Missing mandatory argument - vendorProductId must be a string');
      return;
    }
    if (!utils.has(this.Cycle, cycle)) {
      core.reportSdkError('Missing mandatory argument - cycle must be one of Wix.Billing.Cycle');
      return;
    }
    if (!utils.isFunction(onSuccess)) {
      core.reportSdkError('Missing mandatory argument - onSuccess must be a function');
      return;
    }
    var args = {
      vendorProductId: vendorProductId,
      cycle: cycle
    };
    var onComplete = function onComplete(result) {
      responseHandlers.handleDataResponse(result, onSuccess, onError);
    };
    core.sendMessage(core.MessageTypes.GET_BILLING_PAGE_FOR_PRODUCT, args, onComplete);
  };
  var getBillingPackages = function (vendorProductIds, onSuccess, onError) {
    if (utils.isFunction(vendorProductIds)) {
      onSuccess = vendorProductIds;
      vendorProductIds = undefined;
    }
    if (!utils.isFunction(onSuccess)) {
      core.reportSdkError('Missing mandatory argument - onSuccess must be a function');
      return;
    }
    var args = { vendorProductIds: vendorProductIds };
    var onComplete = function onComplete(result) {
      responseHandlers.handleDataResponse(result, onSuccess, onError);
    };
    core.sendMessage(core.MessageTypes.GET_BILLING_PACKAGES, args, onComplete);
  };
  var getActiveBillingPackage = function (onSuccess, onError) {
    if (!utils.isFunction(onSuccess)) {
      core.reportSdkError('Missing mandatory argument - onSuccess must be a function');
      return;
    }
    var onComplete = function onComplete(result) {
      responseHandlers.handleDataResponse(result, onSuccess, onError);
    };
    core.sendMessage(core.MessageTypes.GET_ACTIVE_BILLING_PACKAGE, undefined, onComplete);
  };
  return {
    /**
     * @enum
     * @memberof Wix.Billing
     * @since 1.37.0
     */
    Cycle: {
      MONTHLY: 'MONTHLY',
      YEARLY: 'YEARLY',
      ONE_TIME: 'ONE_TIME'
    },
    /**
     * Opens the Wix billing page in a new window with information about the product and cycle requested. This API is internal and works with the Upgrade button component found in the <a href="http://wix.github.io/wix-ui-lib/#Upgrade-entry" target="_blank">UI Lib.</a>
     *
     * @function
     * @memberof Wix.Billing
     * @author lior.shefer@wix.com
     * @since 1.37.0
     * @private
     * @param {String} vendorProductId The vendor product id associated with the initiated purchase.
     * @param {Wix.Billing.Cycle} cycle The billing cycle.
     * @param {Function} [onError] A callback error function. An error might be a result of a wrong cycle, missing cycle or bad vendor product Id.
     * missing cycle or bad productId.
     *
     * @example
     * Wix.Billing.openBillingPageForProduct('vendorProductId', Wix.Billing.Cycle.MONTHLY, function () {
     *      //handle error
     * });
     *
     */
    openBillingPageForProduct: openBillingPageForProduct,
    /**
     * Returns a link to Wix Billing page with information about the product and cycle requested.
     *
     * @function
     * @memberof Wix.Billing
     * @author lior.shefer@wix.com
     * @since 1.37.0
     * @param {String} vendorProductId Vendor product id as detailed in the Features section of the Wix Developer App Registration <a href="http://dev.wix.com" target="_blank">dev.wix.com</a>
     * @param {Wix.Billing.Cycle} cycle The billing cycle.
     * @param {Function} onSuccess A callback function, returns a link the Wix billing page with information about the product and cycle requested.
     * @param {Function} [onError] A callback error function, Error is wrong cycle,
     * missing cycle or bad productId.
     *
     * @example
     * var onError = function () {
     *  //handle the error
     * };
     * Wix.Billing.getBillingPageForProduct('vendorProductId', Wix.Billing.Cycle.MONTHLY, function () {
     *      //handle return value i.e., //https://premium.wix.com/...
     * }, onError);
     *
     */
    getBillingPageForProduct: getBillingPageForProduct,
    /**
           * Returns an Array of objects containing product and pricing info. As is defined in the Features section of the Wix Developer App Registration <a href="http://dev.wix.com" target="_blank">dev.wix.com</a>
           *
           * @function
           * @memberof Wix.Billing
           * @author lior.shefer@wix.com
           * @since 1.37.0
           * @param {Array} [vendorProductIds] A list of vendor product ids (each representing a billing package), as detailed in the Features section of the Wix Developer App Registration <a href="http://dev.wix.com" target="_blank">dev.wix.com</a>
           * @param {Function} onSuccess A callback function to receive the product info.
           * @param {Function} [onError] A callback error function.
           *
           * @return {Array} Array of Objects containing the product info:
           *
           *  Name         | Type                 | Description
           * --------------|----------------------|------------
           * prices        | `Array`              | -
           * price         | `Object`             | Name           | Type      | Description
           * -             |  -                   | value          |`String`   | The product price.
           * -             |  -                   | currencyCode   |`String`   | The product payment currency code.
           * -             |  -                   | currencySymbol |`String`   | The product payment currency symbol.
           * -             |  -                   | cycle          |[Wix.Billing.Cycle](Wix.Billing.html#Cycle)  | The product payment cycle
           *
           * @example
           * var onError = function () {
           *  //handle the error
           * };
           * var onSuccess = function (data) {
           *  //handle onSuccess
           *  //sample data schema:
           *  [{
           *     id: <vendorProductId>,
           *     prices: [
           *     {
     *       value : '3.99',
     *       currencyCode: 'USD',
           *       currencySymbol: '&#36;',
           *       cycle: 'MONTHLY'
           *     }]
           *  }]
           *
           * };
           * Wix.Billing.getBillingPackages(onSuccess, onError);
           *
           */
    getBillingPackages: getBillingPackages
  };
}(core, utils, responseHandlers);
/**
 * @memberof Wix
 * @namespace Activities
 */
Activities = function (core, responseHandlers, utils) {
  var postActivity = function (activity, onSuccess, onFailure) {
    if (utils.getViewMode() !== 'site') {
      core.reportSdkError('Invalid View Mode, Wix.postActivity is available only for site view mode');
      return;
    }
    var args = { activity: activity };
    var onComplete = null;
    if (onSuccess || onFailure) {
      onComplete = function (result) {
        if (result.status && onSuccess) {
          onSuccess(result.response);
        } else if (onFailure) {
          onFailure(result.response);
        }
      };
    }
    core.sendMessage(core.MessageTypes.POST_ACTIVITY, args, onComplete);
  };
  var getActivities = function (onSuccess, onFailure, query) {
    if (typeof onSuccess !== 'function') {
      core.reportSdkError('Missing mandatory argument - onSuccess, must be a function');
      return;
    }
    if (typeof onFailure !== 'function') {
      core.reportSdkError('Missing mandatory argument - onFailure, must be a function');
      return;
    }
    var args = { query: query };
    var onComplete = function onComplete(response) {
      responseHandlers.handleCursorResponse(response, onSuccess, onFailure, core.MessageTypes.GET_ACTIVITIES);
    };
    core.sendMessage(core.MessageTypes.GET_ACTIVITIES, args, onComplete);
  };
  var getActivityById = function (id, onSuccess, onFailure) {
    if (typeof id !== 'string') {
      core.reportSdkError('Missing mandatory argument - id, must be a string');
      return;
    }
    if (typeof onSuccess !== 'function') {
      core.reportSdkError('Missing mandatory argument - onSuccess, must be a function');
      return;
    }
    if (typeof onFailure !== 'function') {
      core.reportSdkError('Missing mandatory argument - onFailure, must be a function');
      return;
    }
    var args = { id: id };
    var onComplete = function onComplete(result) {
      responseHandlers.handleDataResponse(result, onSuccess, onFailure);
    };
    core.sendMessage(core.MessageTypes.GET_ACTIVITY_BY_ID, args, onComplete);
  };
  var getUserSessionToken = function (callback) {
    core.sendMessage(core.MessageTypes.GET_USER_SESSION, null, callback);
  };
  return {
    /**
     * @enum
     * @memberof Wix.Activities
     * @since 1.25.0
     */
    Type: {
      /**
       * Indicates a contact form was filled out.
       */
      CONTACT_CONTACT_FORM: 'contact/contact-form',
      /**
       * Indicates a conversion with a contact was completed.
       */
      CONVERSION_COMPLETE: 'conversion/complete',
      /**
       * Indicates a purchase was made through ecommerce.
       */
      ECOMMERCE_PURCHASE: 'e_commerce/purchase',
      /**
       * Indicates a message was sent to a contact.
       */
      SEND_MESSAGE: 'messaging/send',
      /**
       * Indicates a hotel reservation has been cancelled.
       */
      HOTELS_CANCEL: 'hotels/cancel',
      /**
       * Indicates a hotel reservation has been confirmed.
       */
      HOTELS_CONFIRMATION: 'hotels/confirmation',
      /**
       * Indicates a hotel purchase has been made.
       */
      HOTELS_PURCHASE: 'hotels/purchase',
      /**
       * Indicates a hotel purchase has failed.
       * @constant
       */
      HOTELS_PURCHASE_FAILED: 'hotels/purchase-failed',
      /**
       * Indicates a contact liked an album of music.
       */
      ALBUM_FAN: 'music/album-fan',
      /**
       * Indicates a contact shared an album of music.
       */
      ALBUM_SHARE: 'music/album-share',
      /**
       * indicates a contact played an album to completion
       */
      ALBUM_PLAYED: 'music/album-played',
      /**
       * Indicates a contact viewed the lyrics of a song.
       */
      TRACK_LYRICS: 'music/track-lyrics',
      /**
       * Indicates a contact begun to play a track.
       */
      TRACK_PLAY: 'music/track-play',
      /**
       * Indicates a contact played a track to completion.
       */
      TRACK_PLAYED: 'music/track-played',
      /**
       *  Indicates a contact shared a track.
       */
      TRACK_SHARE: 'music/track-share',
      /**
       * Indicates a contact skipped a track.
       */
      TRACK_SKIP: 'music/track-skip',
      /**
       * Indicates an appointment has been scheduled.
       */
      SCHEDULER_APPOINTMENT: 'scheduler/appointment'
    },
    /**
     * @enum
     * @memberof Wix.Activities
     * @since 1.25.0
     */
    Error: {
      BAD_DATES: 'BAD_DATES',
      ACTIVITY_NOT_FOUND: 'ACTIVITY_NOT_FOUND',
      WRONG_PERMISSIONS: 'WRONG_PERMISSIONS'
    },
    /**
     * This method posts an Activity to the current site.  An Activity is an action performed by a site viewer on the installed site.
     * By reporting Activities, your application better integrates with the Wix ecosystem. Each Activity conforms to a specific schema predefined by Wix.
     * When the Activity is successfully created, the id of the activity will be returned. If schema validation fails, or other errors occur, an error will be returned.
     *
     *
     * @function
     * @memberof Wix.Activities
     * @since 1.25.0
     * @param {Object} activity An activity descriptor, must follow specific type/schema pattern:
     *  Name         | Type      | Description |||
     * --------------|-----------|------------
     * type          | `String`  | The Activity Type. [Wix.Activities.ActivityType](Wix.Activities.html#toc4) |||
     * info          | `Object`  | The Activity information, specified by the Activity type. |||
     * details       | `Object`  | Name               | Type      | Description
     * -             |  -        | additionalInfoUrl  |`String`   | URL for additional information about this Activity.
     * -             |  -        | summary            |`String`   | Additional information about this Activity.
     * contactUpdate | `Object`  | Additional Contact information relevant to this Activity. |||
     *
     * @param {Function} [onSuccess] Success callback function.
     * @param {Function} [onFailure] Failure callback function.
     *
     * @example
     * var activity = {
     *      type:Wix.Activities.Type.CONTACT_CONTACT_FORM,
     *      info:{"fields":[{"name":"email","value":"email@email.com"},{"name":"message","value":"messageValue"}]},
     *      details:{additionalInfoUrl:null, summary:"testing tpa contact form"},
     *      contactUpdate:{}
     * };
     *
     * Wix.Activities.postActivity(activity, onSuccess, onFailure);
     *
     */
    postActivity: postActivity,
    /**
     * Gets a list of all activities that have been performed by users on the current site, optionally bound by date ranges, activity types and scope (app/site).
     * The results are returned through a callback that delivers a WixDataCursor object, with the results being in descending order by date.
     * @function
     * @memberof Wix.Activities
     * @since 1.28.0
     * @param {Object} [query] An Object containing params to restrict our results.
     * @param {Function} onSuccess A function that receives a WixDataCursor object.
     * @param {Function} onFailure A function that receives an error object in case of invalid input.
     * @returns {WixDataCursor}
     * @example
     * var query = {
     *      from: < ISO 8601 timestamp>,
     *      until: < ISO 8601 timestamp>,
     *      scope: <'app' 'scope'>,
     *      activityTypes: [ 'type1', 'type2', ...]
     * };
     *
     * Wix.Activities.getActivities(query, onSuccess, onFailure);
     *
     */
    getActivities: getActivities,
    /**
     * Gets a specific Activity that occurred on the current site.
     * @function
     * @memberof Wix.Activities
     * @since 1.28.0
     * @param {String} id The id of the Activity to look up.
     * @param {Function} onSuccess Callback triggered when data about the Activity is returned from Wix.
     * @param {Function} onFailure Callback triggered if the data could not be returned successfully.
     * @returns {Activity}
     * @example
     *
     * Wix.Activities.getActivityById(id, onSuccess, onFailure)
     *
     */
    getActivityById: getActivityById,
    /**
     * Returns a session token which can be used to make AJAX calls to Wix RESTful API.
     * @function
     * @memberof Wix.Activities
     * @since 1.25.0
     * @param {Function} callback a callback function to receive the token.
     * @example
     *
     * Wix.Activities.getUserSessionToken(callback);
     *
     */
    getUserSessionToken: getUserSessionToken
  };
}(core, responseHandlers, Utils);
/**
 * This is the description for the Settings namespace.
 * @memberof Wix
 * @namespace Wix.Settings
 */
Settings = function (core, Styles, Base, WindowPlacement, utils) {
  var getStyleParams = function (callback) {
    core.reportSdkMsg('Wix.Settings.getStyleParams is DEPRECATED use Wix.Styles.getStyleParams');
    return Styles.getStyleParams(callback);
  };
  /** Function getStyleColorByKey
   *
   * Returns the css color value of saved style parameter
   *
   * @deprecated
   * @since SDK 1.22.0
   * @param colorKey (String) a unique key describing a color style parameter
   * @return (String) css color string. E.g "#FFFFFF" or "rgba(0,0,0,0.5)"
   */
  var getStyleColorByKey = function (colorKey) {
    core.reportSdkMsg('Wix.Settings.getStyleColorByKey is DEPRECATED use Wix.Styles.getStyleColorByKey');
    return Styles.getStyleColorByKey(colorKey);
  };
  /**
   * Function getColorByreference
   * Returns the color object of editor style
   *
   * @deprecated
   * @since 1.22.0
   * @param colorReference (String) a unique key describing a theme color parameter
   * @return (Object) a map describing a Wix style color.
   */
  var getColorByreference = function (colorReference) {
    core.reportSdkMsg('Wix.Settings.getColorByreference is DEPRECATED use Wix.Styles.getColorByreference');
    return Styles.getColorByreference(colorReference);
  };
  /**
   * Function setColorParam
   * Sets a style color parameter
   *
   * @deprecated
   * @since 1.22.0
   * @param key (String) a unique key describing a color style parameter
   * @param value (Object)
   */
  var setColorParam = function (key, value) {
    core.reportSdkMsg('Wix.Settings.setColorParam is DEPRECATED use Wix.Styles.setColorParam');
    return Styles.setColorParam(key, value);
  };
  /**
   * Function setNumberParam
   * Sets a style number parameter
   *
   * @deprecated
   * @since 1.22.0
   * @param key (String) a unique key describing a number style parameter
   * @param value (Number)
   */
  var setNumberParam = function (key, value) {
    core.reportSdkMsg('Wix.Settings.setNumberParam is DEPRECATED use Wix.Styles.setNumberParam');
    return Styles.setNumberParam(key, value);
  };
  /** Function setBooleanParam
   *
   * Sets a style boolean parameter
   *
   * @deprecated
   * @since 1.22.0
   * @param key (String) a unique key describing a boolean style parameter
   * @param value (Boolean)
   */
  var setBooleanParam = function (key, value) {
    core.reportSdkMsg('Wix.Settings.setBooleanParam is DEPRECATED use Wix.Styles.setBooleanParam');
    return Styles.setBooleanParam(key, value);
  };
  /** Function getSiteColors
   *
   * Returns the currently active site colors
   *
   * @deprecated
   * @since 1.12.0
   * @param callback (Function) callback function: function(colors)
   */
  var getSiteColors = function (callback) {
    core.reportSdkMsg('Wix.Settings.getSiteColors is DEPRECATED use Wix.Styles.getSiteColors');
    return Styles.getSiteColors(callback);
  };
  /**
   * Get window placement for a widget
   *
   * @param compId (String) component id to change placement to
   * @param callback (Function) a callback function that returns the component placement
   *   callback signature: function(data) {}
   */
  var getWindowPlacement = function (compId, callback) {
    if (!compId || !callback) {
      core.reportSdkError('Mandatory arguments - compId & callback must be specified');
    }
    core.sendMessage(core.MessageTypes.GET_WINDOW_PLACEMENT, { 'compId': compId }, callback);
  };
  var getSiteInfo = function (onSuccess) {
    Base.getSiteInfo(onSuccess);
  };
  var refreshApp = function (queryParams) {
    refreshAppByCompIds(null, queryParams);
  };
  var refreshAppByCompIds = function (compIds, queryParams) {
    core.sendMessage(core.MessageTypes.REFRESH_APP, {
      'queryParams': queryParams,
      'compIds': compIds
    });
  };
  var openBillingPage = function () {
    core.sendMessage(core.MessageTypes.OPEN_BILLING_PAGE);
  };
  var openMediaDialog = function (mediaType, multipleSelection, onSuccess, onCancel) {
    if (!utils.isString(mediaType) || !isValidMediaType.call(this, mediaType)) {
      core.reportSdkError('Missing mandatory argument - mediaType must be one of Wix.Settings.MediaType');
      return;
    }
    if (!utils.isBoolean(multipleSelection)) {
      core.reportSdkError('Missing mandatory argument - multipleSelection must be true or false');
      return;
    }
    if (!utils.isFunction(onSuccess)) {
      core.reportSdkError('Missing mandatory argument - onSuccess must be a function');
      return;
    }
    var callOnCancel = utils.isFunction(onCancel);
    var callback = function (data) {
      if (data.wasCancelled) {
        if (callOnCancel) {
          onCancel(data);
        }
      } else {
        onSuccess(data);
      }
    };
    var args = {
      mediaType: mediaType,
      multiSelection: multipleSelection,
      callOnCancel: callOnCancel
    };
    core.sendMessage(core.MessageTypes.OPEN_MEDIA_DIALOG, args, callback);
  };
  var isValidMediaType = function (value) {
    for (var key in this.MediaType) {
      if (this.MediaType[key] === value) {
        return true;
      }
    }
    return false;
  };
  var triggerSettingsUpdatedEvent = function (message, compId) {
    message = message || {};
    compId = compId || '*';
    core.sendMessage(core.MessageTypes.POST_MESSAGE, {
      'message': message,
      'compId': compId
    });
  };
  var getSitePages = function (callback) {
    core.sendMessage(core.MessageTypes.GET_SITE_PAGES, null, callback);
  };
  var setWindowPlacement = function (compId, placement, verticalMargin, horizontalMargin) {
    if (!compId || !placement) {
      core.reportSdkError('Mandatory arguments - compId & placement must be specified');
    }
    if (!WindowPlacement.hasOwnProperty(placement)) {
      core.reportSdkError('Invalid argument - placement value should be set using Wix.WindowPlacement');
    }
    core.sendMessage(core.MessageTypes.SET_WINDOW_PLACEMENT, {
      'compId': compId,
      placement: placement,
      verticalMargin: verticalMargin,
      horizontalMargin: horizontalMargin
    });
  };
  var getDashboardAppUrl = function (callback) {
    if (!callback) {
      core.reportSdkError('Mandatory arguments - a callback must be specified');
    }
    core.sendMessage(core.MessageTypes.GET_DASHBOARD_APP_URL, undefined, callback);
  };
  var openModal = function (url, width, height, title, onClose, bareUI) {
    if (!url || !width || !height) {
      core.reportSdkError('Mandatory arguments - url & width & height must be specified');
      return;
    }
    if (!utils.isString(url)) {
      core.reportSdkError('Invalid argument - a Url must be of type string');
      return;
    }
    if (!utils.isNumber(width) && !utils.isPercentValue(width)) {
      core.reportSdkError('Invalid argument - a width must be of type Number or Percentage');
      return;
    }
    if (!utils.isNumber(height) && !utils.isPercentValue(height)) {
      core.reportSdkError('Invalid argument - a height must be of type Number or Percentage');
      return;
    }
    var args = {
      url: url,
      width: width,
      height: height,
      isBareMode: bareUI
    };
    if (utils.isFunction(title)) {
      onClose = title;
    } else {
      args.title = title;
    }
    core.sendMessage(core.MessageTypes.SETTINGS_OPEN_MODAL, args, onClose);
  };
  var closeWindow = function (message) {
    Base.closeWindow(message);
  };
  return {
    /**
     * @enum
     * @memberof Wix.Settings
     * @since 1.40.0
     */
    MediaType: {
      IMAGE: 'photos',
      BACKGROUND: 'backgrounds',
      AUDIO: 'audio',
      DOCUMENT: 'documents',
      SWF: 'swf',
      SECURE_MUSIC: 'secure_music'
    },
    getColorByreference: getColorByreference,
    setBooleanParam: setBooleanParam,
    setColorParam: setColorParam,
    setNumberParam: setNumberParam,
    getSiteColors: getSiteColors,
    getStyleColorByKey: getStyleColorByKey,
    getWindowPlacement: getWindowPlacement,
    /**
     * This method returns the URL leading to your BackOffice (AKA Business) application, in the Wix Dashboard.
     * The URL is fully qualified and starts with "//" for using HTTPS if supported. If the site is not saved, save dialog will be prompted.
     * @function
     * @memberof Wix.Settings
     * @author tomergab@wix.com
     * @since 1.32.0
     * @param {Function} callback A callback function to receive the URL of the app in the dashboard (AKA BackOffice/Business).
     * @example
     *
     * Wix.Settings.getDashboardAppUrl(function(url) {
     *    // do something with the URL
     * });
     */
    getDashboardAppUrl: getDashboardAppUrl,
    /**
     * The getsiteInfo method is used to retrieve information about the host site in which the app is shown.
     * @function
     * @memberof Wix.Settings
     * @since 1.12.0
     * @see Wix.getSiteInfo
     *
     * @example
     *
     * Wix.Settings.getSiteInfo(function(siteInfo) {
     *    // do something with the siteInfo
     * });
     *
     */
    getSiteInfo: getSiteInfo,
    /**
     * The getSitePages method is used to retrieve the site structure from the hosting Wix Platform. The site structure includes visible and hidden pages as well as sub pages.
     * @function
     * @memberof Wix.Settings
     * @since 1.17.0
     * @see Wix.getSitePages
     *
     * @example
     *
     * Wix.Settings.getSitePages(function(sitePages) {
     *    // do something with the site pages
     * });
     */
    getSitePages: getSitePages,
    /**
     * The getStyleParams method is used to retrieve the style parameters from the hosting Wix Platform. The parameters includes colors numbers, booleans.
     * @function
     * @memberof Wix.Settings
     * @deprecated Use Wix.Styles.getStyleParams
     * @since 1.22.0
     * @param {Function} callback A callback function to receive the style parameters.
     * @example
     *
     * Wix.Settings.getStyleParams(function(styleParams) {
     *    // do something with the style params
     * });
     */
    getStyleParams: getStyleParams,
    /**
     * The Setting.openBillingPage method allows the app to offer a premium package from within the app settings.
     * When called it will open the Wix billing system page in a new browser window.
     * @function
     * @memberof Wix.Settings
     * @since 1.16.0
     * @example
     *
     * Wix.Settings.openBillingPage();
     */
    openBillingPage: openBillingPage,
    /**
     * This method opens the Wix media dialog inside the WIx Editor, and let's the site owner choose a an existing file from the Wix media galleries,
     * or upload a new file instead. When completed a callback function returns the meta data of the selected item/s.
     * This method returns a meta data descriptor for a selected media item. To access the media item from your code you will need to construct a
     * full URL using that descriptor. Since the media items URLs format is set by Wix and might changed in the future,
     * we are requiring that the URL construction will be done using the SDK. Use one of the Wix.Utils.Media.get* methods to get the desired media item URL.
     * @function
     * @memberof Wix.Settings
     * @author lior.shefer@wix.com
     * @since 1.40.0
     * @param {Wix.Settings.MediaType} mediaType Media gallery to choose from - image, background, audio, swf and secure music.
     * @param {Boolean} multiSelect selection mode, single (false) or multiple (true) item to choose from.
     * @param {Function} onSuccess callback function, passing the media item/s meta data.
     * @param {Function} [onCancel] callback function called when user cancels.
     * @return This is an asynchronous function, the returned value is passed in the onSuccess callback function.
     * An object (single selection) or Array of objects (multiple selection). The object describes the meta data of the selected media item.
     *
     * @example
     *
     * Wix.Settings.openMediaDialog(Wix.Settings.MediaType.IMAGE, false, function(data) {
     *    // save image data
     * });
     */
    openMediaDialog: openMediaDialog,
    /**
     * Notifying the host site that the app requires reloading.
     * The refreshApp method is normally used when a user changes the app settings in the settings iframe, and as a result requires that the Widget or Page iframes should be reloaded such that the new settings will take affect.
     * The refreshApp method accepts a single optional argument, an object. Where each of the object's properties will translate into a query parameter in the iframe URL.
     * @function
     * @memberof Wix.Settings
     * @since 1.12.0
     * @param {Object} [queryParams] A map of custom query parameters that should be added to the iframe URL.
     * @example
     *
     * //The App's components (all of them) will be refreshed without custom query parameters
     * Wix.Settings.refreshApp();
     *
     * //The App's components (all of them) will be refreshed with custom query parameters as specified in the object argument - [BASE-URL]?[WIX-QUERY-PARAMETERS]&param1=value1&param2=value2
     * Wix.Settings.refreshApp({param1: "value1", param2: "value2"})
     */
    refreshApp: refreshApp,
    /**
     * Notifying the host site that some specific components of the app requires reloading. It does the same as Settings.refreshApp but for specific components.
     * @function
     * @memberof Wix.Settings
     * @since 1.12.0
     * @param {Array} compIds An array of the app component ids that should be refreshed.
     * @param {Object} [queryParams] A map of custom query parameters that should be added to the iframe URL.
     * @example
     *
     * //For example, if the user adds 3 components of the same app with ids: "id1", "id2" and "id3", and then he changes something in
     * the settings iframe that affects only 2 components display, to refresh these 2 components:
     * //The App's components with ids "id1" and "id3" will be refreshed without custom query parameters
     * Wix.Settings.refreshAppByCompIds(["id1", "id3"]);
     * //The App's components with ids "id1" and "id3" will be refreshed with custom query parameters as specified in the object argument - [BASE-URL]?[WIX-QUERY-PARAMETERS]&param1=value1&param2=value2
     * Wix.Settings.refreshAppByCompIds(["id1", "id3"], {param1: "value1", param2: "value2"});
     */
    refreshAppByCompIds: refreshAppByCompIds,
    /**
     * The setWindowPlacement method sets the placement for fixed position widgets in an editing session.
     * @function
     * @memberof Wix.Settings
     * @since 1.19.0
     * @param {String} compId Component id to change window placement to.
     * @param {WindowPlacement} placement New placement for the widget window
     * @param {Number} [verticalMargin] Vertical offset from the window placement
     * @param {Number} [horizontalMargin] Horizontal offset from the window placement
     * @example
     *
     * var compId = Wix.Utils.getOrigCompId();
     * Wix.Settings.setWindowPlacement(compId, Wix.WindowPlacement.CENTER, 10, 20);
     */
    setWindowPlacement: setWindowPlacement,
    /**
     * The triggerSettingsUpdatedEvent method is used from the Settings iframe to trigger a Wix.Events.SETTINGS_UPDATED event in a Widget/Page iframe.
     * It should be used in an editing session when a developer wants to reflect editing changes but avoid refresh/reload on the Widget/Page iframe.
     * @function
     * @memberof Wix.Settings
     * @since 1.17.0
     * @param {Object} message A custom JSON which will be passed to the Widget/Page as the event data.
     * @param {String} [compId] A component id the developer wants to trigger the event on. The most obvious compId is Utils.getOrigCompId(). If no compId is given all components that registered to
     *  Wix.Events.SETTINGS_UPDATED will receive the event.
     * @example
     *
     * Wix.Settings.triggerSettingsUpdatedEvent(message, compId);
     */
    triggerSettingsUpdatedEvent: triggerSettingsUpdatedEvent,
    /**
     * The openModal method allows the Settings iframe to open a modal window.
     *
     * The modal window is a singleton (every new modal closes the previous one) and contains a lightbox.
     *
     * A modal can be dismissed by the user if it touches the lightbox, presses the closing button or by the app itself
     * if it calls the Wix.closeWindow from within the modal iframe.
     *
     * @function
     * @memberof Wix.Settings
     * @author lior.shefer@wix.com
     * @since 1.43.0
     * @private
     * @param {String} url Model iframe url.
     * @param {Number} width The modal window width (can be a string for percent, i.e., '90%', or an integer for pixels, i.e., 90).
     * @param {Number} height The modal window height (can be a string for percent, i.e., '90%', or an integer for pixels, i.e., 90).
     * @param {String} [title] Title of the modal.
     * @param {Function} [onClose] onClose callback function.
     * @param {Boolean} [bareUI] Opens the modal in a bare mode without the modal title, help and close buttons.
     * @example
     *
     * var onClose = function(message) { console.log("modal closed", message); }
     * //Open a modal when width and height are in pixels.
     * Wix.Settings.openModal("http://sslstatic.wix.com/services/js-sdk/1.41.0/html/modal.html", 400, 400, "My modal's title", onClose);
     *
     * //Open a modal when width and height in percentages.
     * Wix.Settings.openModal("http://sslstatic.wix.com/services/js-sdk/1.41.0/html/modal.html", '70%', '90%', "My modal's title", onClose);
     */
    openModal: openModal,
    /**
     * The closeWindow method is available only under a modal endpoint (will not have any effect for other endpoints). It allows the modal to close itself programmatically.
     * @function
     * @memberof Wix.Settings
     * @since 1.37.0
     * @see Wix.closeWindow
     * @example
     *
     * // The following call will close the modal/popup window and send a the object message to the opener onClose callback
     * var message = {"reason": "button-clicked"};
     * Wix.Settings.closeWindow(message);
     *
     */
    closeWindow: closeWindow
  };
}(core, Styles, Base, WindowPlacement, utils);
WixInternalSDK = undefined;
/**
 * @memberof Wix
 * @namespace Contacts
 */
Contacts = function (core, responseHandlers) {
  var getContacts = function (options, onSuccess, onFailure) {
    if (options === null || typeof options !== 'object') {
      core.reportSdkError('Missing mandatory argument - options, must be an object');
      return;
    }
    if (typeof onSuccess !== 'function') {
      core.reportSdkError('Missing mandatory argument - onSuccess, must be a function');
      return;
    }
    var args = { options: options };
    var onComplete = function onComplete(response) {
      responseHandlers.handleCursorResponse(response, onSuccess, onFailure, core.MessageTypes.GET_CONTACTS, options);
    };
    core.sendMessage(core.MessageTypes.GET_CONTACTS, args, onComplete);
  };
  var getContactById = function (id, onSuccess, onFailure) {
    if (typeof id !== 'string') {
      core.reportSdkError('Missing mandatory argument - id, must be a string');
      return;
    }
    if (typeof onSuccess !== 'function') {
      core.reportSdkError('Missing mandatory argument - onSuccess, must be a function');
      return;
    }
    if (typeof onFailure !== 'function') {
      core.reportSdkError('Missing mandatory argument - onFailure, must be a function');
      return;
    }
    var args = { id: id };
    var onComplete = function onComplete(response) {
      responseHandlers.handleDataResponse(response, onSuccess, onFailure);
    };
    core.sendMessage(core.MessageTypes.GET_CONTACT_BY_ID, args, onComplete);
  };
  var getContactLabels = function (onSuccess, onFailure) {
    if (typeof onSuccess !== 'function') {
      core.reportSdkError('Missing mandatory argument - onSuccess, must be a function');
      return;
    }
    if (typeof onFailure !== 'function') {
      core.reportSdkError('Missing mandatory argument - onFailure, must be a function');
      return;
    }
    var onComplete = function onComplete(response) {
      responseHandlers.handleDataResponse(response, onSuccess, onFailure);
    };
    core.sendMessage(core.MessageTypes.GET_CONTACT_LABELS, {}, onComplete);
  };
  return {
    /**
     * Gets a list of all contacts that have interacted with a given site.
     * @memberof Wix.Contacts
     * @author lior.shefer@wix.com
     * @since  1.31.0
     * @function
     * @param {Object} options object that supports two parameters: 'label' and 'pageSize'.
     * 'label' can either be a list of strings or a string. if a list, the strings are joined together with a comma
     * to be sent to the contacts endpoint. 'pageSize' accepts either 25, 50 or 100 and defaults to 25.
     * @param {Function} onSuccess An on success callback which gets WixDataCursor as parameter.
     * @param {Function} onFailure An on failure callback.
     * @return {WixDataCursor} cursor.
     * @example
     * Wix.Contacts.getContacts(function(WixDataCursor), function(errorType));
     */
    getContacts: getContacts,
    /**
     * Gets a specific Contact that has interacted with the current site by its id.
     * @memberof Wix.Contacts
     * @author lior.shefer@wix.com
     * @since 1.27.0
     * @function
     * @param {String} id The id of the Contact to look up.
     * @param {Function} onSuccess A function that receives data about the Contact.
     * @param {Function} onFailure A function called when an error occurs that receives a Wix.Error.
     * @return {Contact}
     */
    getContactById: getContactById,
    /**
     * Returns all the Contact labels for the given site that have opted in to receiving communications from applications
     * @memberof Wix.Contacts
     * @author lior.shefer@wix.com
     * @since 1.32.0
     * @function
     * @param {Function} onSuccess A function that receives an array of labels.
     * @param {Function} onFailure A function called when an error occurs that receives a Wix.Error.
     * @return {String[]} An array of labels
     */
    getContactLabels: getContactLabels
  };
}(core, responseHandlers);
/**
 * This is the description for the PubSub namespace.
 * @memberof Wix
 * @namespace Wix.PubSub
 */
PubSub = function (core, utils) {
  var TPA_PUB_SUB_PREFIX = 'TPA_PUB_SUB_';
  var unsubscribe = function (eventName, callBackOrId) {
    core.removeEventListenerInternal(TPA_PUB_SUB_PREFIX + eventName, callBackOrId, true);
  };
  var subscribe = function (eventName, callBack, receivePastEvents) {
    if (!utils.isString(eventName)) {
      core.reportSdkError('Missing mandatory argument - eventName, must be a string');
      return;
    }
    if (!utils.isFunction(callBack)) {
      core.reportSdkError('Missing mandatory argument - callBack, must be a function');
      return;
    }
    return core.addEventListenerInternal(TPA_PUB_SUB_PREFIX + eventName, callBack, true, { receivePastEvents: receivePastEvents });
  };
  var publish = function (eventName, data, isPersistent) {
    if (!utils.isString(eventName)) {
      core.reportSdkError('Missing mandatory argument - eventName, must be a string');
      return;
    }
    core.sendMessage(core.MessageTypes.PUBLISH, {
      eventKey: TPA_PUB_SUB_PREFIX + eventName,
      isPersistent: !!isPersistent || false,
      eventData: data || {}
    });
  };
  return {
    /**
     * Unsubscribes from receiving further events. The id from the initial subscribe call is used to unsubscribe from furthers notifications.
     * @memberof Wix.PubSub
     * @since 1.25.0
     * @function
     * @param {String} eventName The name of the event to unsubscribe from.
     * @param {Function} function that will respond to events sent from other extensions of the broadcasting app. it will be given the event object itself and the source of the event.
     * @example
     * //subscribe and then unsubscribe to "my_event_name" event
     * var id = Wix.PubSub.subscribe("my_event_name", function(event) { });
     * Wix.PubSub.unsubscribe("my_event_name", id);
     */
    unsubscribe: unsubscribe,
    /**
     * Subscribes to events from other app parts of a multi-widget TPA.  If the components span multiple pages, they will be notified once they are rendered.
     * It is also possible to receive all notifications prior to rendering by specifying a flag when subscribing to events.
     * If the flag is set, the widget will be notified immediately of any prior events of the type it is registered to receive.
     * @memberof Wix.PubSub
     * @since 1.25.0
     * @function
     * @param {String} eventName The name of the event to subscribe to.
     * @param {Function} callBack function that will respond to events sent from other components of the broadcasting app. it will be given the event object itself and the source of the event.
     * @param {Boolean} [receivePastEvents] a flag to indicate that all past instances of the registered event should be sent to registered listener. This will happen immediately upon registration.
     * @example
     * //subscribe and then unsubscribe to "my_event_name" event
     * Wix.PubSub.subscribe("my_event_name", function(event) {
     *  //process the event which has the following format :
     *  // {
     *  //    name:eventName,
     *  //    data: eventData,
     *  //    origin: compId
     *  // }
     * });
     * // subscribe to "my_event_name" event, events which also happened before this component was rendered will send
     * Wix.PubSub.subscribe("my_event_name", function(event) { }, true);
     */
    subscribe: subscribe,
    /**
     * Broadcasts an event to other extensions of a multi-widget TPA.
     * If the app extensions (Widget, Fixed Positioned Widget, Page) span multiple pages, they will be notified when they are rendered.
     * @memberof Wix.PubSub
     * @since 1.25.0
     * @function
     * @param {String} eventName The name of the event to publish.
     * @param {Object} data Data the object to send to subscribers for this event type.
     * @param {Boolean} isPersistent Indicates whether this event is persisted for event subscribers who have not yet subscribed.
     * @example
     * // The following call will publish an app event that can be consumed by all the app parts and persist => even of those parts are not rendered yet.
     * Wix.PubSub.publish("my_event_name", {value:"this is my message"}, true);
     */
    publish: publish
  };
}(core, utils);
/**
 * This is the description for the Worker namespace.
 * @memberof Wix
 * @namespace Wix.Worker
 */
Worker = function (Base, PubSub, Utils) {
  var getSiteInfo = function (onSuccess) {
    Base.getSiteInfo(onSuccess);
  };
  var getSitePages = function (callback) {
    Base.getSitePages(callback);
  };
  var addEventListener = function (eventName, callBack) {
    return Base.addEventListener(eventName, callBack);
  };
  var removeEventListener = function (eventName, callBackOrId) {
    return Base.removeEventListener(eventName, callBackOrId);
  };
  var currentMember = function (onSuccess) {
    return Base.currentMember(onSuccess);
  };
  var publish = function (eventKey, data, isPersistent) {
    return PubSub.publish(eventKey, data, isPersistent);
  };
  var subscribe = function (eventKey, callBack, receivePastEvents) {
    return PubSub.subscribe(eventKey, callBack, receivePastEvents);
  };
  var unsubscribe = function (eventKey, callBackOrId) {
    return PubSub.unsubscribe(eventKey, callBackOrId);
  };
  var getViewMode = function () {
    return Utils.getViewMode();
  };
  var getDeviceType = function () {
    return Utils.getDeviceType();
  };
  var getLocale = function () {
    return Utils.getLocale();
  };
  var getInstanceId = function () {
    return Utils.getInstanceId();
  };
  var getIpAndPort = function () {
    return Utils.getIpAndPort();
  };
  var navigateToSection = function (sectionIdentifier, state, onFailure) {
    Utils.navigateToSection(sectionIdentifier, state, onFailure);
  };
  return {
    /**
     * @memberof Wix.Worker
     * @since 1.30.0
     * @see Wix.getSiteInfo
     */
    getSiteInfo: getSiteInfo,
    /**
     * @memberof Wix.Worker
     * @since 1.30.0
     * @see Wix.getSitePages
     */
    getSitePages: getSitePages,
    /**
     * @memberof Worker
     * @since 1.30.0
     * @see Wix.addEventListener
     */
    addEventListener: addEventListener,
    /**
     * @memberof Wix.Worker
     * @since 1.30.0
     * @see Wix.removeEventListener
     */
    removeEventListener: removeEventListener,
    /**
     * @memberof Wix.Worker
     * @since 1.30.0
     * @see Wix.currentMember
     */
    currentMember: currentMember,
    /**
     * This is the description for the PubSub namespace.
     * @memberof Wix.Worker
     * @namespace Wix.Worker.PubSub
     */
    PubSub: {
      /**
       * @since 1.30.0
       * @memberof Wix.Worker.PubSub
       * @see Wix.PubSub.publish
       */
      publish: publish,
      /**
       * @since 1.30.0
       * @memberof Wix.Worker.PubSub
       * @see Wix.PubSub.subscribe
       */
      subscribe: subscribe,
      /**
       * @since 1.30.0
       * @memberof Wix.Worker.PubSub
       * @see Wix.PubSub.unsubscribe
       */
      unsubscribe: unsubscribe
    },
    /**
     * @memberof Wix.Worker
     * @namespace Wix.Worker.Utils
     */
    Utils: {
      /**
       * @since 1.30.0
       * @memberof Wix.Worker.Utils
       * @see Wix.Utils.getViewMode
       */
      getViewMode: getViewMode,
      /**
       * @since 1.30.0
       * @memberof Wix.Worker.Utils
       * @see Wix.Utils.getDeviceType
       */
      getDeviceType: getDeviceType,
      /**
       * @since 1.30.0
       * @memberof Worker.Utils
       * @see Wix.Utils.getLocale
       */
      getLocale: getLocale,
      /**
       * @since 1.30.0
       * @memberof Wix.Worker.Utils
       * @see Wix.Utils.getInstanceId
       */
      getInstanceId: getInstanceId,
      /**
       * @since 1.30.0
       * @memberof Wix.Worker.Utils
       * @see Wix.Utils.getDeviceType
       */
      getIpAndPort: getIpAndPort,
      /**
       * @since 1.39.0
       * @memberof Wix.Worker.Utils
       * @author lior.shefer@wix.com
       * @see Wix.Utils.navigateToSection
       */
      navigateToSection: navigateToSection
    }
  };
}(Base, PubSub, Utils);
/**
 * @memberof Wix
 * @namespace Dashboard
 */
Dashboard = function (core, Base, Settings) {
  var setHeight = function (height) {
    Base.setHeight(height);
  };
  var resizeWindow = function (width, height, onComplete) {
    Base.resizeWindow(width, height, onComplete);
  };
  var openMediaDialog = function (mediaType, multipleSelection, onSuccess, onCancel) {
    Settings.openMediaDialog(mediaType, multipleSelection, onSuccess, onCancel);
  };
  var openBillingPage = function () {
    Settings.openBillingPage();
  };
  var openModal = function (url, width, height, onClose) {
    Base.openModal(url, width, height, onClose);
  };
  var closeWindow = function (message) {
    Base.closeWindow(message);
  };
  var scrollTo = function (x, y) {
    Base.scrollTo(x, y);
  };
  var getEditorUrl = function (callback) {
    if (!callback) {
      core.reportSdkError('Mandatory arguments - a callback must be specified');
      return;
    }
    core.sendMessage(core.MessageTypes.GET_EDITOR_URL, undefined, callback);
  };
  var pushState = function (state) {
    if (typeof state !== 'string') {
      core.reportSdkError('Missing mandatory argument - state');
      return;
    }
    core.sendMessage(core.MessageTypes.APP_STATE_CHANGED, { 'state': state });
  };
  return {
    /**
     * This method requests the hosting Wix platform to change the iframe height inside the side dashboard (under the My Account tab in Wix.com). Works on the app or modal iframes.
     * @function
     * @author lior.shefer@wix.com
     * @memberof Wix.Dashboard
     * @since 1.24.0
     * @see Wix.setHeight
     * @example
     *
     * Wix.Dashboard.setHeight(height);
     *
     */
    setHeight: setHeight,
    /**
     * This method opens Wix media dialog inside WIx Dashboard, and let's the site owner choose a an existing file from the Wix media galleries,
     * or upload a new file instead. When completed a callback function returns the meta data of the selected item/s.
     * This method returns a meta data descriptor for a selected media item.
     * To access the media item from your code you will need to construct a full URL using that descriptor.
     * Since the media items URLs format is set by Wix and might changed in the future, we are requiring that the URL construction will be done using the SDK.
     * Use one of the Wix.Utils.Media.get* methods to get the desired media item URL.
     * The following media type are currently supported - Wix.Settings.MediaType
     * @function
     * @author lior.shefer@wix.com
     * @memberof Wix.Dashboard
     * @since 1.40.0
     * @see Wix.Settings.openMediaDialog
     *
     * @example
     *
     * Wix.Dashboard.openMediaDialog(Wix.Settings.MediaType.IMAGE, false, function(data) {
     *    // save image data
     * });
     */
    openMediaDialog: openMediaDialog,
    /**
     * The Dashboard.openBillingPage method allows the app to offer a premium package from within the app.
     * When called will open the Wix billing system page in a new browser window.
     * @function
     * @author lior.shefer@wix.com
     * @memberof Wix.Dashboard
     * @since 1.31.0
     * @example
     *
     * Wix.Dashboard.openBillingPage();
     *
     */
    openBillingPage: openBillingPage,
    /**
     * The openModal method allows an app to open a modal window within the dashboard. A modal is a runtime Widget that is not part of the dashboard structure.
     * The modal window is a singleton (every new modal closes the previous one) and contains a lightbox.
     * A modal can be dismissed by the user if it touches the lightbox, presses the closing button or by the app itself
     * if it calls the Wix.Dashboard.closeWindow() from within the modal iframe. The onClose argument can be used to detect modal close.
     * @function
     * @memberof Wix.Dashboard
     * @since 1.27.0
     * @see Wix.openModal
     * @example
     *
     * var onClose = function(message) { console.log("modal closed", message); }
     * Wix.Dashboard.openModal("http://sslstatic.wix.com/services/js-sdk/1.16.0/html/modal.html", 400, 400, onClose);
     *
     */
    openModal: openModal,
    /**
     * The closeWindow method is available only under a modal endpoint (will not have any effect for other endpoints). It allows the modal to close itself programmatically.
     * @function
     * @memberof Dashboard
     * @since 1.27.0
     * @see Wix.closeWindow
     * @example
     *
     * // The following call will close the modal/popup window and send a the object message to the opener onClose callback
     * var message = {"reason": "button-clicked"};
     * Wix.Dashboard.closeWindow(message);
     *
     */
    closeWindow: closeWindow,
    /**
     * The Dashboard.scrollTo method allows the app to scroll to an absolute offset - vertical & horizontal.
     * @function
     * @author lior.shefer@wix.com
     * @memberof Dashboard
     * @since 1.31.0
     * @see Wix.scrollTo
     * @example
     *
     * Wix.Dashboard.scrollTo(0, 0);
     *
     */
    scrollTo: scrollTo,
    /**
     * Returns a url for the app in the Editor. Once directed to the Editor, the app will be shown to your user. If your app has components on more than one page, the first page that contains your app will be opened.
     * @function
     * @memberof Wix.Dashboard
     * @since 1.33.0
     * @param {Function} callback A callback which gets editor url as parameter.
     * @example
     *
     * Wix.Dashboard.getEditorUrl(function(url) {
     *    //editor url as a callback parameter
     * });
     *
     */
    getEditorUrl: getEditorUrl,
    /**
     * This method enable AJAX style Page apps to inform the Wix platform about a change in the app internal state. The new state will be reflected in the site/page URL.
     * Once you call the pushState method, the browser top window URL will change the 'app-state' path part to the new state you provide with the pushState
     * method (similar to the browser history API - https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history).
     * For a full explanation of how deep-linking works with AJAX style apps, see Deep Linking for AJAX Style Apps - http://dev.wix.com/docs/display/DRAF/Developing+a+Page+App.
     * @function
     * @memberof Wix.Dashboard
     * @since 1.35.0
     * @see Wix.pushState
     * @example
     *
     * Wix.Dashboard.pushState("app-state");
     *
     */
    pushState: pushState,
    /**
     * Applicable only for modal component. Re-sizes the modal window.
     * @function
     * @memberof Wix.Dashboard
     * @author tomergab@wix.com
     * @since 1.40.0
     * @see Wix.resizeWindow
     * @param {Number} width Window width in pixels.
     * @param {Number} height Window height in pixels.
     * @param [Function] onComplete On resize complete callback function.
     * @example
     *
     * // The following call will resize the widget window
     * Wix.Dashboard.resizeWindow(300, 300);
     *
     */
    resizeWindow: resizeWindow
  };
}(core, Base, Settings);
/**
 * @memberof Wix
 * @namespace Counters
 */
Counters = function (core) {
  
  var report = function (data, onSuccess, onFailure) {
    var onComplete = null;
    if (onSuccess || onFailure) {
      onComplete = function (result) {
        if (result.status && onSuccess) {
          onSuccess(result.response);
        } else if (onFailure) {
          onFailure(result.response);
        }
      };
    }
    core.sendMessage(core.MessageTypes.POST_COUNTERS_REPORT, data, onComplete);
  };
  return {
    /**
     * @function
     * @private
     * @memberof Wix.Counters
     * @param {Object} data
     * @param {Function} onSuccess A callback function.
     * @param {Function} [onFailure] An on Failure callback function.
     */
    report: report
  };
}(core);
Wix = function (core, Base, Billing, utils, Activities, Settings, WixInternalSDK, Contacts, Utils, Styles, Events, Error, Media, WindowOrigin, WindowPlacement, Worker, PubSub, Dashboard, Theme, Counters) {
  core.init({ endpointType: core.getQueryParameter('endpointType') });
  var getNamespaceToExport = function () {
    if (core.getQueryParameter('endpointType') === 'worker') {
      return {
        Worker: Worker,
        Events: Events,
        Error: Error
      };
    }
    return getDefaultNamespaces();
  };
  var getDefaultNamespaces = function () {
    return {
      Activities: Activities,
      Billing: Billing,
      Contacts: Contacts,
      Counters: Counters,
      Dashboard: Dashboard,
      Error: Error,
      Events: Events,
      Media: Media,
      PubSub: PubSub,
      Settings: Settings,
      Styles: Styles,
      Theme: Theme,
      Utils: Utils,
      WindowOrigin: WindowOrigin,
      WindowPlacement: WindowPlacement,
      openModal: Base.openModal,
      openPopup: Base.openPopup,
      setHeight: Base.setHeight,
      closeWindow: Base.closeWindow,
      scrollTo: Base.scrollTo,
      scrollBy: Base.scrollBy,
      getSiteInfo: Base.getSiteInfo,
      getSitePages: Base.getSitePages,
      getBoundingRectAndOffsets: Base.getBoundingRectAndOffsets,
      removeEventListener: Base.removeEventListener,
      addEventListener: Base.addEventListener,
      resizeWindow: Base.resizeWindow,
      requestLogin: Base.requestLogin,
      currentMember: Base.currentMember,
      navigateToPage: Base.navigateToPage,
      getCurrentPageId: Base.getCurrentPageId,
      pushState: Base.pushState,
      reportHeightChange: Base.reportHeightChange,
      getStyleParams: Base.getStyleParams
    };
  };
  return getNamespaceToExport();
}(core, Base, Billing, utils, Activities, Settings, WixInternalSDK, Contacts, Utils, Styles, Events, Error, Media, WindowOrigin, WindowPlacement, Worker, PubSub, Dashboard, Theme, Counters);
window.Wix = Wix;
}());