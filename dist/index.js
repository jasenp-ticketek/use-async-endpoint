'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var axios = _interopDefault(require('axios'));

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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function createAsyncEndpoint(baseURL) {
  return function (config) {
    var reqConfig = React.useRef(config);
    var sourceRef = React.useRef(axios.CancelToken.source());

    var _React$useState = React.useState({
      data: undefined,
      headers: undefined,
      isComplete: false,
      isPending: false,
      statusCode: undefined,
      statusText: undefined,
      hasError: false,
      errorInfo: undefined
    }),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        res = _React$useState2[0],
        setRes = _React$useState2[1];

    var _React$useState3 = React.useState(),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        req = _React$useState4[0],
        setReq = _React$useState4[1];

    React.useEffect(function () {
      var isCleanup = false;
      var cancel = sourceRef.current.cancel;

      var reqEndpoint =
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var result, commonRes;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  setRes({
                    data: undefined,
                    headers: undefined,
                    isPending: true,
                    isComplete: false,
                    statusCode: undefined,
                    statusText: undefined,
                    hasError: false,
                    errorInfo: undefined
                  });
                  _context.prev = 1;
                  _context.next = 4;
                  return axios(_objectSpread2({
                    baseURL: baseURL
                  }, reqConfig.current, {}, req, {
                    cancelToken: sourceRef.current.token
                  }));

                case 4:
                  result = _context.sent;

                  if (!isCleanup) {
                    setRes(function () {
                      return {
                        data: result.data,
                        headers: result.headers,
                        isPending: false,
                        isComplete: true,
                        statusCode: "".concat(result.status),
                        statusText: result.statusText,
                        hasError: false,
                        errorInfo: undefined
                      };
                    });
                  }

                  _context.next = 12;
                  break;

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](1);
                  commonRes = {
                    data: undefined,
                    headers: undefined,
                    isPending: false,
                    hasError: true
                  };

                  if (!isCleanup) {
                    if (axios.isCancel(_context.t0)) {
                      setRes(function () {
                        return _objectSpread2({}, commonRes, {
                          statusCode: "499",
                          // Unoffical code: Client Closed Request before server responses -- Nginx
                          statusText: "Canceled",
                          isComplete: false,
                          errorInfo: _context.t0.message
                        });
                      });
                    } else {
                      setRes(function () {
                        return _objectSpread2({}, commonRes, {
                          headers: _context.t0.response && _context.t0.response.headers,
                          isComplete: true,
                          statusCode: _context.t0.response && _context.t0.response.status,
                          statusText: _context.t0.response && _context.t0.response.statusText,
                          errorInfo: _context.t0.response
                        });
                      });
                    }
                  }

                case 12:
                  _context.prev = 12;
                  sourceRef.current = axios.CancelToken.source();
                  return _context.finish(12);

                case 15:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[1, 8, 12, 15]]);
        }));

        return function reqEndpoint() {
          return _ref.apply(this, arguments);
        };
      }();

      if (!req) return;

      if (!isCleanup) {
        reqEndpoint();
      }

      return function () {
        if (!isCleanup) {
          cancel("Unmount period, cancelled.");
          sourceRef.current = axios.CancelToken.source();
        }

        isCleanup = true;
      };
    }, [req]);
    return [res, setReq, sourceRef.current.cancel];
  };
}

exports.createAsyncEndpoint = createAsyncEndpoint;
