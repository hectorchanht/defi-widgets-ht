'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));
var _ = _interopDefault(require('lodash'));
var validator = _interopDefault(require('validator'));

function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) keys.push(key);

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

var TokenList = function TokenList() {
  var _this = this;

  this.TOKENS_ELEMENT = {
    chainId: '',
    address: '',
    name: '',
    symbol: '',
    decimals: '',
    logoURI: ''
  };
  this.JSON_ELEMENT = {
    'name': '',
    'logoURI': '',
    'timestamp': '',
    'tokens': [],
    'version': {
      'major': '',
      'minor': '',
      'patch': ''
    }
  };

  this.errorMessage = function (msg) {
    var error = {
      success: false,
      msg: msg
    };
    return error;
  };

  this.successData = function (data) {
    var result = {
      success: true,
      data: data
    };
    return result;
  };

  this.getVersion = function (v) {
    try {
      var _v$major = v.major,
          major = _v$major === void 0 ? 0 : _v$major,
          _v$minor = v.minor,
          minor = _v$minor === void 0 ? 0 : _v$minor,
          _v$patch = v.patch,
          patch = _v$patch === void 0 ? 0 : _v$patch;
      return String(major) + '.' + String(minor) + '.' + String(patch);
    } catch (err) {
      console.log(err);
      return '';
    }
  };

  this.checkVersionLater = function (o, n) {
    try {
      if (Number(n.major) > Number(o.major)) {
        return true;
      }

      if (Number(n.minor) > Number(o.minor)) {
        return true;
      }

      if (Number(n.patch) > Number(o.patch)) {
        return true;
      }

      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  this.checkTokenChanged = function (o, n, maxTokens) {
    if (maxTokens === void 0) {
      maxTokens = 100;
    }

    try {
      var res = {
        success: false,
        addTokens: [],
        delTokens: [],
        updateTokens: []
      };
      var oVersion = o.version;
      var nVersion = n.version;

      var isVersionLater = _this.checkVersionLater(oVersion, nVersion);

      if (!isVersionLater) {
        return res;
      } // If the number of tokens exceeds 100, no prompt will be given


      if (n.tokens.length > maxTokens) {
        return res;
      }

      var oTokens = o.tokens.slice() || [];
      var delTokensInit = o.tokens.slice() || [];
      var nTokens = n.tokens.slice() || [];
      var addTokensInit = n.tokens.slice() || [];

      _.pullAllWith(delTokensInit, nTokens, _.isEqual);

      _.pullAllWith(addTokensInit, oTokens, _.isEqual);

      var updateTokens = _.intersectionBy(addTokensInit, delTokensInit, 'address');

      var addTokens = _.xorBy(addTokensInit, updateTokens, 'address');

      var delTokens = _.xorBy(delTokensInit, updateTokens, 'address');

      if (addTokens.length || delTokens.length || updateTokens.length) {
        return {
          success: true,
          addTokens: addTokens,
          delTokens: delTokens,
          updateTokens: updateTokens
        };
      }

      return res;
    } catch (err) {
      return {
        success: false
      };
    }
  };

  this.handleNotifiction = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(listsData, byUrlNew) {
      var updateStatus, byUrl, selectedListUrl, o, n, oVersion, nVersion, _this$checkTokenChang, _this$checkTokenChang2, success, addTokens, delTokens, updateTokens, updateInfo;

      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              updateStatus = Object.keys(byUrlNew).length > 0;

              if (updateStatus) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", _this.errorMessage("error: No listings have updated content"));

            case 4:
              byUrl = listsData.byUrl, selectedListUrl = listsData.selectedListUrl;
              o = byUrl[selectedListUrl];
              n = byUrlNew[selectedListUrl];
              oVersion = o.version;
              nVersion = n.version;
              _this$checkTokenChang = _this.checkTokenChanged(o, n), _this$checkTokenChang2 = _this$checkTokenChang.success, success = _this$checkTokenChang2 === void 0 ? false : _this$checkTokenChang2, addTokens = _this$checkTokenChang.addTokens, delTokens = _this$checkTokenChang.delTokens, updateTokens = _this$checkTokenChang.updateTokens;
              updateInfo = {};

              if (success) {
                updateInfo = {
                  addTokens: addTokens,
                  delTokens: delTokens,
                  updateTokens: updateTokens,
                  versionOld: _this.getVersion(oVersion),
                  versionNew: _this.getVersion(nVersion),
                  categoryName: o.name
                };
              }

              return _context.abrupt("return", _this.successData(updateInfo));

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              return _context.abrupt("return", _this.errorMessage("error: " + _context.t0));

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 15]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  this.isValidURL = function (url) {
    if (typeof url !== 'string') return false;
    return validator.isURL(url.toString(), {
      protocols: ['http', 'https'],
      require_tld: true,
      require_protocol: true
    });
  };

  this.isListsOver = function (lists, maxLists) {
    if (lists === void 0) {
      lists = {};
    }

    if (maxLists === void 0) {
      maxLists = 20;
    }

    return Object.keys(lists).length >= maxLists;
  };

  this.isNotEmptyString = function (str, tronweb) {
    if (tronweb === void 0) {
      tronweb = null;
    }

    var tronWeb = tronweb || window.tronWeb;
    return tronWeb.utils.isString(str) && str != '';
  };

  this.isPositiveInteger = function (num, allowZero, tronweb) {
    if (allowZero === void 0) {
      allowZero = false;
    }

    if (tronweb === void 0) {
      tronweb = null;
    }

    var tronWeb = tronweb || window.tronWeb;
    var numStatus = allowZero ? num >= 0 : num > 0;
    return typeof num === 'number' && tronWeb.utils.isInteger(num) && numStatus;
  };

  this.isTimestamp = function (timestamp) {
    return _this.isPositiveInteger(timestamp) && String(timestamp).length === 13;
  };

  this.hasSpace = function (str) {
    var reg = /(^\s+)|(\s+$)|\s+/g;
    return reg.test(str);
  };

  this.tokensElementValidate = {
    chainId: function chainId(_chainId) {
      return _this.isPositiveInteger(_chainId) && _chainId >= 1 && _chainId <= 10; // Chainid ：It needs to be a number, between 1-10;
    },
    address: function address(_address, tronweb) {
      if (tronweb === void 0) {
        tronweb = null;
      }

      var tronWeb = tronweb || window.tronWeb;
      return tronWeb.isAddress(_address);
    },
    name: function name(_name) {
      return _this.isNotEmptyString(_name);
    },
    symbol: function symbol(_symbol) {
      return _this.isNotEmptyString(_symbol) && !_this.hasSpace(_symbol);
    },
    decimals: function decimals(_decimals) {
      return _this.isPositiveInteger(_decimals) && _decimals <= 256;
    },
    logoURI: function logoURI(_logoURI) {
      return _this.isValidURL(_logoURI);
    }
  };

  this.tokensValidate = function (tokens, tronweb) {
    if (tronweb === void 0) {
      tronweb = null;
    }

    var tronWeb = tronweb || window.tronWeb;

    if (!tronWeb.utils.isArray(tokens) || tokens.length === 0) {
      return false;
    }

    var flag = true;
    var len1 = tokens.length;

    for (var j = 0; j < len1; j++) {
      var t = tokens[j];
      var element = Object.assign(_extends({}, _this.TOKENS_ELEMENT), t);
      var elementArr = Object.keys(element);
      var length = elementArr.length;

      for (var i = 0; i < length; i++) {
        var key = elementArr[i];
        var e = element[key];

        if (_this.tokensElementValidate[key] && !_this.tokensElementValidate[key](e) || !_this.tokensElementValidate[key]) {
          flag = false;
          break;
        }
      }

      if (!flag) {
        break;
      }
    }

    return flag;
  };

  this.jsonValidate = {
    name: function name(_name2) {
      return _this.isNotEmptyString(_name2);
    },
    logoURI: function logoURI(_logoURI2) {
      return _this.isValidURL(_logoURI2);
    },
    timestamp: function timestamp(_timestamp) {
      return _this.isTimestamp(_timestamp);
    },
    tokens: function tokens(_tokens) {
      return _this.tokensValidate(_tokens);
    },
    version: function version(_version, tronweb) {
      if (tronweb === void 0) {
        tronweb = null;
      }

      var tronWeb = tronweb || window.tronWeb;
      return tronWeb.utils.isObject(_version) && _this.isPositiveInteger(_version.major, true) && _this.isPositiveInteger(_version.minor, true) && _this.isPositiveInteger(_version.patch, true);
    }
  };

  this.validateFunc = function (target) {
    var json = Object.assign(_extends({}, _this.JSON_ELEMENT), target);
    var keysArr = Object.keys(json);
    var length = keysArr.length;
    var res = {
      key: '',
      valid: true
    };

    for (var i = 0; i < length; i++) {
      var key = keysArr[i];

      if (_this.jsonValidate[key] && !_this.jsonValidate[key](json[key]) || !_this.jsonValidate[key] && key !== 'uri') {
        // uri is added manually, without verification
        res.key = key;
        res.valid = false;
        break;
      }
    }

    return res;
  };

  this.setTokensDataIntoLocal = function (listsData) {
    try {
      window.localStorage.setItem('simpleListsFromTron', JSON.stringify(listsData));
      return window.localStorage.getItem('simpleListsFromTron');
    } catch (err) {
      return false;
    }
  };

  this.getDefaultListSet = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var res;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return axios.get("https://abc.ablesdxd.link/swap/v2/defaultListSet");

          case 2:
            res = _context2.sent;

            if (!(res.data.code === 0)) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.data.data.filter(function (item) {
              return item.type !== 'list';
            }));

          case 7:
            return _context2.abrupt("return", []);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })); // Get tokens data from backend

  this.getTokenListFromUri = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(uri) {
      var res, obj;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return axios.get(uri);

            case 3:
              res = _context3.sent;
              obj = res && res.data ? res.data : null;

              if (!(typeof obj !== 'object' || obj === null)) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", _this.errorMessage("error: No data"));

            case 7:
              return _context3.abrupt("return", _this.successData(_extends({}, res.data, {
                uri: uri
              })));

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);
              return _context3.abrupt("return", _this.errorMessage("error: " + _context3.t0));

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 10]]);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }(); // Add tokenlist


  this.addTokenList = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(customTokenUri, maxLists, maxTokens) {
      var simpleListsFromTronStr, simpleListsFromTron, _simpleListsFromTron$, byUrl;

      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (maxLists === void 0) {
                maxLists = 20;
              }

              if (maxTokens === void 0) {
                maxTokens = 100;
              }

              _context4.prev = 2;
              simpleListsFromTronStr = window.localStorage.getItem('simpleListsFromTron') || '';
              simpleListsFromTron = simpleListsFromTronStr ? JSON.parse(simpleListsFromTronStr) : {};
              _simpleListsFromTron$ = simpleListsFromTron.byUrl, byUrl = _simpleListsFromTron$ === void 0 ? {} : _simpleListsFromTron$; // The address is invalid

              if (_this.isValidURL(customTokenUri)) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", _this.errorMessage("error: The list cannot be added"));

            case 8:
              if (!(byUrl[customTokenUri] && !byUrl[customTokenUri].rs)) {
                _context4.next = 10;
                break;
              }

              return _context4.abrupt("return", _this.errorMessage("error: Already exists in the list"));

            case 10:
              if (!_this.isListsOver(byUrl)) {
                _context4.next = 12;
                break;
              }

              return _context4.abrupt("return", _this.errorMessage("error: You have more than " + maxLists + " lists.The list cannot be added"));

            case 12:
              return _context4.abrupt("return", _this.updateTokenList(customTokenUri, maxTokens));

            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](2);
              // The request returns an error code
              console.log(_context4.t0);
              return _context4.abrupt("return", _this.errorMessage("error: Adding failed, please try again. " + _context4.t0));

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[2, 15]]);
    }));

    return function (_x4, _x5, _x6) {
      return _ref4.apply(this, arguments);
    };
  }(); // Add default tokenlist


  this.addDefaultTokenList = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", _this.addTokenList("https://list.justswap.link/justswap.json"));

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })); // Get tokens data from local cache

  this.getTokenListFromLocal = function () {
    try {
      if (!window.localStorage.getItem('simpleListsFromTron')) return {
        byUrl: {}
      };
      var simpleListsFromTronStr = window.localStorage.getItem('simpleListsFromTron') || '';

      if (!simpleListsFromTronStr) {
        return _this.errorMessage("error: TokenList does not exist");
      }

      var simpleListsFromTron = JSON.parse(simpleListsFromTronStr);
      var _simpleListsFromTron$2 = simpleListsFromTron.byUrl,
          byUrl = _simpleListsFromTron$2 === void 0 ? {} : _simpleListsFromTron$2,
          _simpleListsFromTron$3 = simpleListsFromTron.selectedListUrl,
          selectedListUrl = _simpleListsFromTron$3 === void 0 ? '' : _simpleListsFromTron$3;
      var keyArr = Object.keys(byUrl);
      var res = {};
      keyArr.map(function (item) {
        if (byUrl[item].name !== 'JustSwap Default List') {
          res[item] = byUrl[item];
        }
      });
      var listsData = {};
      listsData.byUrl = res;

      if (!res[selectedListUrl]) {
        listsData.selectedListUrl = keyArr[0];
      } else {
        listsData.selectedListUrl = selectedListUrl;
      }

      return _this.successData(listsData);
    } catch (err) {
      console.log(err);
      return _this.errorMessage("error: " + err);
    }
  }; // Get list data update information


  this.getUpdateInfo = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(_temp) {
      var _ref7, _ref7$maxLists, maxLists, tokens, listsData, localRes, jsonPromises, res, resObj, byUrlNew;

      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _ref7 = _temp === void 0 ? {} : _temp, _ref7$maxLists = _ref7.maxLists, maxLists = _ref7$maxLists === void 0 ? 20 : _ref7$maxLists;
              _context6.prev = 1;
              _context6.next = 4;
              return _this.getDefaultListSet();

            case 4:
              tokens = _context6.sent;
              // You need to get all the latest data, and compare it with the local cached version. If there is a version update, the information will be returned
              listsData = {};
              localRes = _this.getTokenListFromLocal();
              if (localRes != null && localRes.success) listsData = localRes.data;
              jsonPromises = [];
              tokens.map(function (item) {
                item.uri = item.uri.trim();

                var res = _this.getTokenListFromUri(item.uri);

                if (res.success) jsonPromises.push(res.data);
              });
              _context6.next = 12;
              return Promise.all(jsonPromises);

            case 12:
              res = _context6.sent;
              resObj = {};
              res.map(function (r) {
                resObj[r.uri] = _extends({}, r);
              });
              byUrlNew = resObj;
              tokens.map(function (item, i) {
                var uri = item.uri;

                if (resObj[uri] && !listsData.byUrl[uri]) {
                  // If there is no local cache, it is directly added, that is, the newly added list has no update prompt.
                  if (Object.keys(listsData.byUrl).length < maxLists) {
                    listsData.byUrl[uri] = _extends({}, item, resObj[uri]);

                    if (!listsData.selectedListUrl && Number(item.defaultList) === 1) {
                      listsData.selectedListUrl = uri;
                    }
                  }
                }

                if (i === tokens.length - 1) {
                  _this.setTokensDataIntoLocal(listsData);
                }
              });
              return _context6.abrupt("return", _this.handleNotifiction(listsData, byUrlNew));

            case 20:
              _context6.prev = 20;
              _context6.t0 = _context6["catch"](1);
              console.log(_context6.t0);
              return _context6.abrupt("return", _this.errorMessage("error: " + _context6.t0));

            case 24:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[1, 20]]);
    }));

    return function (_x7) {
      return _ref6.apply(this, arguments);
    };
  }(); // Update list data


  this.updateTokenList = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(selectedListUrl, maxTokens) {
      var res, jsonData, _jsonData, _jsonData$tokens, tokens, _this$validateFunc, _this$validateFunc$ke, key, _this$validateFunc$va, valid, listsData, localRes;

      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (maxTokens === void 0) {
                maxTokens = 100;
              }

              _context7.prev = 1;
              _context7.next = 4;
              return _this.getTokenListFromUri(selectedListUrl);

            case 4:
              res = _context7.sent;
              jsonData = {};
              if (res.success) jsonData = res.data;
              _jsonData = jsonData, _jsonData$tokens = _jsonData.tokens, tokens = _jsonData$tokens === void 0 ? [] : _jsonData$tokens; // Whether the number of tokens in the list exceeds 100

              if (!(tokens.length > maxTokens)) {
                _context7.next = 10;
                break;
              }

              return _context7.abrupt("return", _this.errorMessage("error: The number of tokens in the list exceeds " + maxTokens + ".The list cannot be added"));

            case 10:
              _this$validateFunc = _this.validateFunc(jsonData), _this$validateFunc$ke = _this$validateFunc.key, key = _this$validateFunc$ke === void 0 ? '' : _this$validateFunc$ke, _this$validateFunc$va = _this$validateFunc.valid, valid = _this$validateFunc$va === void 0 ? false : _this$validateFunc$va; // JSON data field validation

              if (valid) {
                _context7.next = 13;
                break;
              }

              return _context7.abrupt("return", _this.errorMessage("error: Invalid " + key + ". The list cannot be added"));

            case 13:
              jsonData = _extends({}, jsonData, {
                uri: selectedListUrl,
                rs: 0
              });
              listsData = {
                selectedListUrl: '',
                byUrl: {}
              };
              localRes = _this.getTokenListFromLocal();
              if (localRes != null && localRes.success) listsData = localRes.data;
              listsData.selectedListUrl = selectedListUrl;
              jsonData.tm = Date.now();
              listsData.byUrl[selectedListUrl] = jsonData;

              _this.setTokensDataIntoLocal(listsData);

              return _context7.abrupt("return", _this.successData(listsData));

            case 24:
              _context7.prev = 24;
              _context7.t0 = _context7["catch"](1);
              console.log(_context7.t0);
              return _context7.abrupt("return", _this.errorMessage("error: " + _context7.t0));

            case 28:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[1, 24]]);
    }));

    return function (_x8, _x9) {
      return _ref8.apply(this, arguments);
    };
  }(); // Delete custom list


  this.deleteTokenList = function (uri) {
    var _listsData, _res$byUrl;

    var listsData = {};

    var localRes = _this.getTokenListFromLocal();

    if (localRes != null && localRes.success) listsData = localRes.data;

    if ((_listsData = listsData) != null && _listsData.byUrl[uri]) {
      delete listsData.byUrl[uri];
    } else {
      return _this.errorMessage("error: The specified tokenlist does not exist or has been deleted");
    }

    var res = _this.setTokensDataIntoLocal(listsData);

    if (res != null && (_res$byUrl = res.byUrl) != null && _res$byUrl.uri) {
      return _this.errorMessage("error: Delete specified tokenlist error");
    } else {
      return _this.successData();
    }
  };
};
var TokenListProvider = /*#__PURE__*/new TokenList();

exports.TokenList = TokenList;
exports.TokenListProvider = TokenListProvider;
//# sourceMappingURL=swap-token-list.cjs.development.js.map
