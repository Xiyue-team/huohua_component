parcelRequire = function(e, r, t, n) {
  var i, o = "function" == typeof parcelRequire && parcelRequire, u = "function" == typeof require && require;

  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = "function" == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && "string" == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw c.code = "MODULE_NOT_FOUND", c;
      }
      p.resolve = function(r) {
        return e[t][1][r] || r;
      }, p.cache = {};
      var l = r[t] = new f.Module(t);
      e[t][0].call(l.exports, p, l, l.exports, this);
    }
    return r[t].exports;

    function p(e) {
      return f(p.resolve(e));
    }
  }

  f.isParcelRequire = !0, f.Module = function(e) {
    this.id = e, this.bundle = f, this.exports = {};
  }, f.modules = e, f.cache = r, f.parent = o, f.register = function(r, t) {
    e[r] = [function(e, r) {
      r.exports = t;
    }, {}];
  };
  for (var c = 0; c < t.length; c++) try {
    f(t[c]);
  } catch (e) {
    i || (i = e);
  }
  if (t.length) {
    var l = f(t[t.length - 1]);
    "object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function() {
      return l;
    }) : n && (this[n] = l);
  }
  if (parcelRequire = f, i) throw i;
  return f;
}({
  "soli": [function(require, module, exports) {
    var define;
    var t;
    !function(e, n) {
      "object" == typeof exports && "object" == typeof module ? module.exports = n() : "function" == typeof t && t.amd ? t([], n) : "object" == typeof exports ? exports.devtoolsDetector = n() : e.devtoolsDetector = n();
    }("undefined" != typeof self ? self : this, function() {
      return function(t) {
        var e = {};

        function n(r) {
          if (e[r]) return e[r].exports;
          var o = e[r] = { i: r, l: !1, exports: {} };
          return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
        }

        return n.m = t, n.c = e, n.d = function(t, e, r) {
          n.o(t, e) || Object.defineProperty(t, e, { configurable: !1, enumerable: !0, get: r });
        }, n.n = function(t) {
          var e = t && t.__esModule ? function() {
            return t.default;
          } : function() {
            return t;
          };
          return n.d(e, "a", e), e;
        }, n.o = function(t, e) {
          return Object.prototype.hasOwnProperty.call(t, e);
        }, n.p = "", n(n.s = 10);
      }([function(t, e, n) {
        "use strict";
        e.a = function(t, e, n) {
          return r({}, n, {
            name: e || "unknow group", getDevtoolsDetail: function() {
              return o(this, void 0, void 0, function() {
                var n, r, o, u, c;
                return i(this, function(i) {
                  switch (i.label) {
                    case 0:
                      n = 0, r = t, i.label = 1;
                    case 1:
                      return n < r.length ? (o = r[n], (u = o.skip) ? [4, o.skip()] : [3, 3]) : [3, 6];
                    case 2:
                      u = i.sent(), i.label = 3;
                    case 3:
                      return u ? [3, 5] : [4, o.getDevtoolsDetail()];
                    case 4:
                      if ((c = i.sent()).isOpen || c.directReturn) return e && (c.checkerName = e + "." + c.checkerName), [2, c];
                      i.label = 5;
                    case 5:
                      return n++, [3, 1];
                    case 6:
                      return [2, { checkerName: this.name, isOpen: !1 }];
                  }
                });
              });
            }
          });
        };
        var r = this && this.__assign || function() {
          return (r = Object.assign || function(t) {
            for (var e, n = 1, r = arguments.length; n < r; n++) for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
            return t;
          }).apply(this, arguments);
        }, o = this && this.__awaiter || function(t, e, n, r) {
          return new (n || (n = Promise))(function(o, i) {
            function u(t) {
              try {
                a(r.next(t));
              } catch (t) {
                i(t);
              }
            }

            function c(t) {
              try {
                a(r.throw(t));
              } catch (t) {
                i(t);
              }
            }

            function a(t) {
              t.done ? o(t.value) : new n(function(e) {
                e(t.value);
              }).then(u, c);
            }

            a((r = r.apply(t, e || [])).next());
          });
        }, i = this && this.__generator || function(t, e) {
          var n, r, o, i, u = {
            label: 0, sent: function() {
              if (1 & o[0]) throw o[1];
              return o[1];
            }, trys: [], ops: []
          };
          return i = {
            next: c(0),
            throw: c(1),
            return: c(2)
          }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this;
          }), i;

          function c(i) {
            return function(c) {
              return function(i) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; u;) try {
                  if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                  switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                    case 0:
                    case 1:
                      o = i;
                      break;
                    case 4:
                      return u.label++, { value: i[1], done: !1 };
                    case 5:
                      u.label++, r = i[1], i = [0];
                      continue;
                    case 7:
                      i = u.ops.pop(), u.trys.pop();
                      continue;
                    default:
                      if (!(o = (o = u.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        u = 0;
                        continue;
                      }
                      if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                        u.label = i[1];
                        break;
                      }
                      if (6 === i[0] && u.label < o[1]) {
                        u.label = o[1], o = i;
                        break;
                      }
                      if (o && u.label < o[2]) {
                        u.label = o[2], u.ops.push(i);
                        break;
                      }
                      o[2] && u.ops.pop(), u.trys.pop();
                      continue;
                  }
                  i = e.call(t, u);
                } catch (t) {
                  i = [6, t], r = 0;
                } finally {
                  n = o = 0;
                }
                if (5 & i[0]) throw i[1];
                return { value: i[0] ? i[1] : void 0, done: !0 };
              }([i, c]);
            };
          }
        };
      }, function(t, e, n) {
        "use strict";
        n.d(e, "b", function() {
          return i;
        }), n.d(e, "c", function() {
          return u;
        }), n.d(e, "a", function() {
          return c;
        }), n.d(e, "d", function() {
          return a;
        });
        var r = n(6), o = navigator.userAgent, i = Object(r.a)(function() {
          return o.indexOf("Firefox") > -1;
        }), u = Object(r.a)(function() {
          return o.indexOf("Trident") > -1 || o.indexOf("MSIE") > -1;
        }), c = Object(r.a)(function() {
          return o.indexOf("Edge") > -1;
        }), a = Object(r.a)(function() {
          return /webkit/i.test(o) && !c();
        });
      }, function(t, e, n) {
        "use strict";
        n.d(e, "b", function() {
          return u;
        }), n.d(e, "c", function() {
          return c;
        }), n.d(e, "a", function() {
          return a;
        });
        var r = n(1), o = function(t) {
          return "function" == typeof t;
        };

        function i(t) {
          if (console) {
            var e = console[t];
            if (o(e)) return r.c || r.a ? function() {
              for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
              console[t].apply(console, e);
            } : console[t];
          }
          return function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
          };
        }

        var u = i("log"), c = i("table"), a = i("clear");
      }, function(t, e, n) {
        "use strict";
        var r = this && this.__awaiter || function(t, e, n, r) {
          return new (n || (n = Promise))(function(o, i) {
            function u(t) {
              try {
                a(r.next(t));
              } catch (t) {
                i(t);
              }
            }

            function c(t) {
              try {
                a(r.throw(t));
              } catch (t) {
                i(t);
              }
            }

            function a(t) {
              t.done ? o(t.value) : new n(function(e) {
                e(t.value);
              }).then(u, c);
            }

            a((r = r.apply(t, e || [])).next());
          });
        }, o = this && this.__generator || function(t, e) {
          var n, r, o, i, u = {
            label: 0, sent: function() {
              if (1 & o[0]) throw o[1];
              return o[1];
            }, trys: [], ops: []
          };
          return i = {
            next: c(0),
            throw: c(1),
            return: c(2)
          }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this;
          }), i;

          function c(i) {
            return function(c) {
              return function(i) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; u;) try {
                  if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                  switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                    case 0:
                    case 1:
                      o = i;
                      break;
                    case 4:
                      return u.label++, { value: i[1], done: !1 };
                    case 5:
                      u.label++, r = i[1], i = [0];
                      continue;
                    case 7:
                      i = u.ops.pop(), u.trys.pop();
                      continue;
                    default:
                      if (!(o = (o = u.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        u = 0;
                        continue;
                      }
                      if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                        u.label = i[1];
                        break;
                      }
                      if (6 === i[0] && u.label < o[1]) {
                        u.label = o[1], o = i;
                        break;
                      }
                      if (o && u.label < o[2]) {
                        u.label = o[2], u.ops.push(i);
                        break;
                      }
                      o[2] && u.ops.pop(), u.trys.pop();
                      continue;
                  }
                  i = e.call(t, u);
                } catch (t) {
                  i = [6, t], r = 0;
                } finally {
                  n = o = 0;
                }
                if (5 & i[0]) throw i[1];
                return { value: i[0] ? i[1] : void 0, done: !0 };
              }([i, c]);
            };
          }
        };

        function i() {
          return performance ? performance.now() : Date.now();
        }

        var u = {
          name: "debugger-checker", getDevtoolsDetail: function() {
            return r(this, void 0, void 0, function() {
              var t;
              return o(this, function(e) {
                return t = i(), function() {
                }.constructor("debugger")(), [2, { isOpen: i() - t > 100, checkerName: this.name }];
              });
            });
          }
        };
        e.a = u;
      }, function(t, e, n) {
        "use strict";
        n.d(e, "a", function() {
          return u;
        });
        var r = n(0), o = this && this.__awaiter || function(t, e, n, r) {
          return new (n || (n = Promise))(function(o, i) {
            function u(t) {
              try {
                a(r.next(t));
              } catch (t) {
                i(t);
              }
            }

            function c(t) {
              try {
                a(r.throw(t));
              } catch (t) {
                i(t);
              }
            }

            function a(t) {
              t.done ? o(t.value) : new n(function(e) {
                e(t.value);
              }).then(u, c);
            }

            a((r = r.apply(t, e || [])).next());
          });
        }, i = this && this.__generator || function(t, e) {
          var n, r, o, i, u = {
            label: 0, sent: function() {
              if (1 & o[0]) throw o[1];
              return o[1];
            }, trys: [], ops: []
          };
          return i = {
            next: c(0),
            throw: c(1),
            return: c(2)
          }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this;
          }), i;

          function c(i) {
            return function(c) {
              return function(i) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; u;) try {
                  if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                  switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                    case 0:
                    case 1:
                      o = i;
                      break;
                    case 4:
                      return u.label++, { value: i[1], done: !1 };
                    case 5:
                      u.label++, r = i[1], i = [0];
                      continue;
                    case 7:
                      i = u.ops.pop(), u.trys.pop();
                      continue;
                    default:
                      if (!(o = (o = u.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        u = 0;
                        continue;
                      }
                      if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                        u.label = i[1];
                        break;
                      }
                      if (6 === i[0] && u.label < o[1]) {
                        u.label = o[1], o = i;
                        break;
                      }
                      if (o && u.label < o[2]) {
                        u.label = o[2], u.ops.push(i);
                        break;
                      }
                      o[2] && u.ops.pop(), u.trys.pop();
                      continue;
                  }
                  i = e.call(t, u);
                } catch (t) {
                  i = [6, t], r = 0;
                } finally {
                  n = o = 0;
                }
                if (5 & i[0]) throw i[1];
                return { value: i[0] ? i[1] : void 0, done: !0 };
              }([i, c]);
            };
          }
        }, u = function() {
          function t(t) {
            var e = t.checkers;
            this._listeners = [], this._isOpen = !1, this._detectLoopStoped = !0, this._detectLoopDelay = 500, this._checker = Object(r.a)(e);
          }

          return t.prototype.lanuch = function() {
            this._detectLoopDelay <= 0 && this.setDetectDelay(500), this._detectLoopStoped && (this._detectLoopStoped = !1, this._detectLoop());
          }, t.prototype.stop = function() {
            this._detectLoopStoped || (this._detectLoopStoped = !0, clearTimeout(this._timer));
          }, t.prototype.isLanuch = function() {
            return !this._detectLoopStoped;
          }, t.prototype.setDetectDelay = function(t) {
            this._detectLoopDelay = t;
          }, t.prototype.addListener = function(t) {
            this._listeners.push(t);
          }, t.prototype.removeListener = function(t) {
            this._listeners = this._listeners.filter(function(e) {
              return e !== t;
            });
          }, t.prototype._broadcast = function(t) {
            for (var e = 0, n = this._listeners; e < n.length; e++) {
              var r = n[e];
              try {
                r(t.isOpen, t);
              } catch (t) {
              }
            }
          }, t.prototype._detectLoop = function() {
            return o(this, void 0, void 0, function() {
              var t, e = this;
              return i(this, function(n) {
                switch (n.label) {
                  case 0:
                    return [4, this._checker.getDevtoolsDetail()];
                  case 1:
                    return (t = n.sent()).isOpen != this._isOpen && (this._isOpen = t.isOpen, this._broadcast(t)), this._detectLoopDelay > 0 ? this._timer = setTimeout(function() {
                      return e._detectLoop();
                    }, this._detectLoopDelay) : this.stop(), [2];
                }
              });
            });
          }, t;
        }();
      }, function(t, e, n) {
        "use strict";
        var r = n(0), o = n(11), i = n(13), u = n(14), c = Object(r.a)([o.a, i.a, u.a], "console-checker");
        e.a = c;
      }, function(t, e, n) {
        "use strict";
        e.a = function(t) {
          var e, n = !1;
          return function() {
            for (var r = [], o = 0; o < arguments.length; o++) r[o] = arguments[o];
            return n ? e : (n = !0, e = t.apply(void 0, r));
          };
        };
      }, function(t, e, n) {
        "use strict";
        var r = n(2), o = this && this.__awaiter || function(t, e, n, r) {
          return new (n || (n = Promise))(function(o, i) {
            function u(t) {
              try {
                a(r.next(t));
              } catch (t) {
                i(t);
              }
            }

            function c(t) {
              try {
                a(r.throw(t));
              } catch (t) {
                i(t);
              }
            }

            function a(t) {
              t.done ? o(t.value) : new n(function(e) {
                e(t.value);
              }).then(u, c);
            }

            a((r = r.apply(t, e || [])).next());
          });
        }, i = this && this.__generator || function(t, e) {
          var n, r, o, i, u = {
            label: 0, sent: function() {
              if (1 & o[0]) throw o[1];
              return o[1];
            }, trys: [], ops: []
          };
          return i = {
            next: c(0),
            throw: c(1),
            return: c(2)
          }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this;
          }), i;

          function c(i) {
            return function(c) {
              return function(i) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; u;) try {
                  if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                  switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                    case 0:
                    case 1:
                      o = i;
                      break;
                    case 4:
                      return u.label++, { value: i[1], done: !1 };
                    case 5:
                      u.label++, r = i[1], i = [0];
                      continue;
                    case 7:
                      i = u.ops.pop(), u.trys.pop();
                      continue;
                    default:
                      if (!(o = (o = u.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        u = 0;
                        continue;
                      }
                      if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                        u.label = i[1];
                        break;
                      }
                      if (6 === i[0] && u.label < o[1]) {
                        u.label = o[1], o = i;
                        break;
                      }
                      if (o && u.label < o[2]) {
                        u.label = o[2], u.ops.push(i);
                        break;
                      }
                      o[2] && u.ops.pop(), u.trys.pop();
                      continue;
                  }
                  i = e.call(t, u);
                } catch (t) {
                  i = [6, t], r = 0;
                } finally {
                  n = o = 0;
                }
                if (5 & i[0]) throw i[1];
                return { value: i[0] ? i[1] : void 0, done: !0 };
              }([i, c]);
            };
          }
        }, u = / /, c = !1;
        u.toString = function() {
          return c = !0, a.name;
        };
        var a = {
          name: "reg-toString-checker", getDevtoolsDetail: function() {
            return o(this, void 0, void 0, function() {
              return i(this, function(t) {
                return c = !1, Object(r.b)(u), Object(r.a)(), [2, { isOpen: c, checkerName: this.name }];
              });
            });
          }
        };
        e.a = a;
      }, function(t, e, n) {
        "use strict";
        var r = n(2), o = this && this.__awaiter || function(t, e, n, r) {
          return new (n || (n = Promise))(function(o, i) {
            function u(t) {
              try {
                a(r.next(t));
              } catch (t) {
                i(t);
              }
            }

            function c(t) {
              try {
                a(r.throw(t));
              } catch (t) {
                i(t);
              }
            }

            function a(t) {
              t.done ? o(t.value) : new n(function(e) {
                e(t.value);
              }).then(u, c);
            }

            a((r = r.apply(t, e || [])).next());
          });
        }, i = this && this.__generator || function(t, e) {
          var n, r, o, i, u = {
            label: 0, sent: function() {
              if (1 & o[0]) throw o[1];
              return o[1];
            }, trys: [], ops: []
          };
          return i = {
            next: c(0),
            throw: c(1),
            return: c(2)
          }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this;
          }), i;

          function c(i) {
            return function(c) {
              return function(i) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; u;) try {
                  if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                  switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                    case 0:
                    case 1:
                      o = i;
                      break;
                    case 4:
                      return u.label++, { value: i[1], done: !1 };
                    case 5:
                      u.label++, r = i[1], i = [0];
                      continue;
                    case 7:
                      i = u.ops.pop(), u.trys.pop();
                      continue;
                    default:
                      if (!(o = (o = u.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        u = 0;
                        continue;
                      }
                      if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                        u.label = i[1];
                        break;
                      }
                      if (6 === i[0] && u.label < o[1]) {
                        u.label = o[1], o = i;
                        break;
                      }
                      if (o && u.label < o[2]) {
                        u.label = o[2], u.ops.push(i);
                        break;
                      }
                      o[2] && u.ops.pop(), u.trys.pop();
                      continue;
                  }
                  i = e.call(t, u);
                } catch (t) {
                  i = [6, t], r = 0;
                } finally {
                  n = o = 0;
                }
                if (5 & i[0]) throw i[1];
                return { value: i[0] ? i[1] : void 0, done: !0 };
              }([i, c]);
            };
          }
        }, u = document.createElement("div"), c = !1;
        Object.defineProperty(u, "id", {
          get: function() {
            return c = !0, a.name;
          }, configurable: !0
        });
        var a = {
          name: "element-id-chekcer", getDevtoolsDetail: function() {
            return o(this, void 0, void 0, function() {
              return i(this, function(t) {
                return c = !1, Object(r.b)(u), Object(r.a)(), [2, { isOpen: c, checkerName: this.name }];
              });
            });
          }
        };
        e.a = a;
      }, function(t, e, n) {
        "use strict";
        var r = n(17), o = this && this.__awaiter || function(t, e, n, r) {
          return new (n || (n = Promise))(function(o, i) {
            function u(t) {
              try {
                a(r.next(t));
              } catch (t) {
                i(t);
              }
            }

            function c(t) {
              try {
                a(r.throw(t));
              } catch (t) {
                i(t);
              }
            }

            function a(t) {
              t.done ? o(t.value) : new n(function(e) {
                e(t.value);
              }).then(u, c);
            }

            a((r = r.apply(t, e || [])).next());
          });
        }, i = this && this.__generator || function(t, e) {
          var n, r, o, i, u = {
            label: 0, sent: function() {
              if (1 & o[0]) throw o[1];
              return o[1];
            }, trys: [], ops: []
          };
          return i = {
            next: c(0),
            throw: c(1),
            return: c(2)
          }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this;
          }), i;

          function c(i) {
            return function(c) {
              return function(i) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; u;) try {
                  if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                  switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                    case 0:
                    case 1:
                      o = i;
                      break;
                    case 4:
                      return u.label++, { value: i[1], done: !1 };
                    case 5:
                      u.label++, r = i[1], i = [0];
                      continue;
                    case 7:
                      i = u.ops.pop(), u.trys.pop();
                      continue;
                    default:
                      if (!(o = (o = u.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        u = 0;
                        continue;
                      }
                      if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                        u.label = i[1];
                        break;
                      }
                      if (6 === i[0] && u.label < o[1]) {
                        u.label = o[1], o = i;
                        break;
                      }
                      if (o && u.label < o[2]) {
                        u.label = o[2], u.ops.push(i);
                        break;
                      }
                      o[2] && u.ops.pop(), u.trys.pop();
                      continue;
                  }
                  i = e.call(t, u);
                } catch (t) {
                  i = [6, t], r = 0;
                } finally {
                  n = o = 0;
                }
                if (5 & i[0]) throw i[1];
                return { value: i[0] ? i[1] : void 0, done: !0 };
              }([i, c]);
            };
          }
        }, u = {
          name: "firebug-checker", getDevtoolsDetail: function() {
            return o(this, void 0, void 0, function() {
              var t, e;
              return i(this, function(n) {
                t = window.top, e = !1;
                try {
                  e = t.Firebug && t.Firebug.chrome && t.Firebug.chrome.isInitialized;
                } catch (t) {
                }
                return [2, { isOpen: e, checkerName: this.name }];
              });
            });
          }, skip: function() {
            return o(this, void 0, void 0, function() {
              return i(this, function(t) {
                return [2, Object(r.a)()];
              });
            });
          }
        };
        e.a = u;
      }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.addListener = function(t) {
          c.addListener(t);
        }, e.removeListener = function(t) {
          c.removeListener(t);
        }, e.isLanuch = function() {
          return c.isLanuch();
        }, e.stop = function() {
          c.stop();
        }, e.lanuch = function() {
          c.lanuch();
        }, e.setDetectDelay = function(t) {
          c.setDetectDelay(t);
        };
        var r = n(4), o = n(5), i = n(3), u = n(9);
        n.d(e, "consoleChecker", function() {
          return o.a;
        }), n.d(e, "debuggerChecker", function() {
          return i.a;
        }), n.d(e, "firebugChecker", function() {
          return u.a;
        }), n.d(e, "Detector", function() {
          return r.a;
        });
        var c = new r.a({ checkers: [u.a, o.a, i.a] });
      }, function(t, e, n) {
        "use strict";
        var r = n(1), o = n(0), i = n(3), u = n(12), c = n(7), a = this && this.__assign || function() {
          return (a = Object.assign || function(t) {
            for (var e, n = 1, r = arguments.length; n < r; n++) for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
            return t;
          }).apply(this, arguments);
        }, l = this && this.__awaiter || function(t, e, n, r) {
          return new (n || (n = Promise))(function(o, i) {
            function u(t) {
              try {
                a(r.next(t));
              } catch (t) {
                i(t);
              }
            }

            function c(t) {
              try {
                a(r.throw(t));
              } catch (t) {
                i(t);
              }
            }

            function a(t) {
              t.done ? o(t.value) : new n(function(e) {
                e(t.value);
              }).then(u, c);
            }

            a((r = r.apply(t, e || [])).next());
          });
        }, s = this && this.__generator || function(t, e) {
          var n, r, o, i, u = {
            label: 0, sent: function() {
              if (1 & o[0]) throw o[1];
              return o[1];
            }, trys: [], ops: []
          };
          return i = {
            next: c(0),
            throw: c(1),
            return: c(2)
          }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this;
          }), i;

          function c(i) {
            return function(c) {
              return function(i) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; u;) try {
                  if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                  switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                    case 0:
                    case 1:
                      o = i;
                      break;
                    case 4:
                      return u.label++, { value: i[1], done: !1 };
                    case 5:
                      u.label++, r = i[1], i = [0];
                      continue;
                    case 7:
                      i = u.ops.pop(), u.trys.pop();
                      continue;
                    default:
                      if (!(o = (o = u.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        u = 0;
                        continue;
                      }
                      if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                        u.label = i[1];
                        break;
                      }
                      if (6 === i[0] && u.label < o[1]) {
                        u.label = o[1], o = i;
                        break;
                      }
                      if (o && u.label < o[2]) {
                        u.label = o[2], u.ops.push(i);
                        break;
                      }
                      o[2] && u.ops.pop(), u.trys.pop();
                      continue;
                  }
                  i = e.call(t, u);
                } catch (t) {
                  i = [6, t], r = 0;
                } finally {
                  n = o = 0;
                }
                if (5 & i[0]) throw i[1];
                return { value: i[0] ? i[1] : void 0, done: !0 };
              }([i, c]);
            };
          }
        }, f = a({}, Object(u.a)(Object(o.a)([c.a, i.a])), {
          name: "firefox-checker", skip: function() {
            return l(this, void 0, void 0, function() {
              return s(this, function(t) {
                return [2, !Object(r.b)()];
              });
            });
          }
        });
        e.a = f;
      }, function(t, e, n) {
        "use strict";
        e.a = function(t) {
          return r({}, t, {
            getDevtoolsDetail: function() {
              return o(this, void 0, void 0, function() {
                var e;
                return i(this, function(n) {
                  switch (n.label) {
                    case 0:
                      return [4, t.getDevtoolsDetail()];
                    case 1:
                      return (e = n.sent()).directReturn = !0, [2, e];
                  }
                });
              });
            }
          });
        };
        var r = this && this.__assign || function() {
          return (r = Object.assign || function(t) {
            for (var e, n = 1, r = arguments.length; n < r; n++) for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
            return t;
          }).apply(this, arguments);
        }, o = this && this.__awaiter || function(t, e, n, r) {
          return new (n || (n = Promise))(function(o, i) {
            function u(t) {
              try {
                a(r.next(t));
              } catch (t) {
                i(t);
              }
            }

            function c(t) {
              try {
                a(r.throw(t));
              } catch (t) {
                i(t);
              }
            }

            function a(t) {
              t.done ? o(t.value) : new n(function(e) {
                e(t.value);
              }).then(u, c);
            }

            a((r = r.apply(t, e || [])).next());
          });
        }, i = this && this.__generator || function(t, e) {
          var n, r, o, i, u = {
            label: 0, sent: function() {
              if (1 & o[0]) throw o[1];
              return o[1];
            }, trys: [], ops: []
          };
          return i = {
            next: c(0),
            throw: c(1),
            return: c(2)
          }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this;
          }), i;

          function c(i) {
            return function(c) {
              return function(i) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; u;) try {
                  if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                  switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                    case 0:
                    case 1:
                      o = i;
                      break;
                    case 4:
                      return u.label++, { value: i[1], done: !1 };
                    case 5:
                      u.label++, r = i[1], i = [0];
                      continue;
                    case 7:
                      i = u.ops.pop(), u.trys.pop();
                      continue;
                    default:
                      if (!(o = (o = u.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        u = 0;
                        continue;
                      }
                      if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                        u.label = i[1];
                        break;
                      }
                      if (6 === i[0] && u.label < o[1]) {
                        u.label = o[1], o = i;
                        break;
                      }
                      if (o && u.label < o[2]) {
                        u.label = o[2], u.ops.push(i);
                        break;
                      }
                      o[2] && u.ops.pop(), u.trys.pop();
                      continue;
                  }
                  i = e.call(t, u);
                } catch (t) {
                  i = [6, t], r = 0;
                } finally {
                  n = o = 0;
                }
                if (5 & i[0]) throw i[1];
                return { value: i[0] ? i[1] : void 0, done: !0 };
              }([i, c]);
            };
          }
        };
      }, function(t, e, n) {
        "use strict";
        var r = n(1), o = n(8), i = this && this.__assign || function() {
          return (i = Object.assign || function(t) {
            for (var e, n = 1, r = arguments.length; n < r; n++) for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
            return t;
          }).apply(this, arguments);
        }, u = this && this.__awaiter || function(t, e, n, r) {
          return new (n || (n = Promise))(function(o, i) {
            function u(t) {
              try {
                a(r.next(t));
              } catch (t) {
                i(t);
              }
            }

            function c(t) {
              try {
                a(r.throw(t));
              } catch (t) {
                i(t);
              }
            }

            function a(t) {
              t.done ? o(t.value) : new n(function(e) {
                e(t.value);
              }).then(u, c);
            }

            a((r = r.apply(t, e || [])).next());
          });
        }, c = this && this.__generator || function(t, e) {
          var n, r, o, i, u = {
            label: 0, sent: function() {
              if (1 & o[0]) throw o[1];
              return o[1];
            }, trys: [], ops: []
          };
          return i = {
            next: c(0),
            throw: c(1),
            return: c(2)
          }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this;
          }), i;

          function c(i) {
            return function(c) {
              return function(i) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; u;) try {
                  if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                  switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                    case 0:
                    case 1:
                      o = i;
                      break;
                    case 4:
                      return u.label++, { value: i[1], done: !1 };
                    case 5:
                      u.label++, r = i[1], i = [0];
                      continue;
                    case 7:
                      i = u.ops.pop(), u.trys.pop();
                      continue;
                    default:
                      if (!(o = (o = u.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        u = 0;
                        continue;
                      }
                      if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                        u.label = i[1];
                        break;
                      }
                      if (6 === i[0] && u.label < o[1]) {
                        u.label = o[1], o = i;
                        break;
                      }
                      if (o && u.label < o[2]) {
                        u.label = o[2], u.ops.push(i);
                        break;
                      }
                      o[2] && u.ops.pop(), u.trys.pop();
                      continue;
                  }
                  i = e.call(t, u);
                } catch (t) {
                  i = [6, t], r = 0;
                } finally {
                  n = o = 0;
                }
                if (5 & i[0]) throw i[1];
                return { value: i[0] ? i[1] : void 0, done: !0 };
              }([i, c]);
            };
          }
        }, a = i({}, o.a, {
          name: "ie-edge-checker", skip: function() {
            return u(this, void 0, void 0, function() {
              return c(this, function(t) {
                return [2, !(Object(r.c)() || Object(r.a)())];
              });
            });
          }
        });
        e.a = a;
      }, function(t, e, n) {
        "use strict";
        var r = n(1), o = n(0), i = n(15), u = n(8), c = n(16), a = this && this.__assign || function() {
          return (a = Object.assign || function(t) {
            for (var e, n = 1, r = arguments.length; n < r; n++) for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
            return t;
          }).apply(this, arguments);
        }, l = this && this.__awaiter || function(t, e, n, r) {
          return new (n || (n = Promise))(function(o, i) {
            function u(t) {
              try {
                a(r.next(t));
              } catch (t) {
                i(t);
              }
            }

            function c(t) {
              try {
                a(r.throw(t));
              } catch (t) {
                i(t);
              }
            }

            function a(t) {
              t.done ? o(t.value) : new n(function(e) {
                e(t.value);
              }).then(u, c);
            }

            a((r = r.apply(t, e || [])).next());
          });
        }, s = this && this.__generator || function(t, e) {
          var n, r, o, i, u = {
            label: 0, sent: function() {
              if (1 & o[0]) throw o[1];
              return o[1];
            }, trys: [], ops: []
          };
          return i = {
            next: c(0),
            throw: c(1),
            return: c(2)
          }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this;
          }), i;

          function c(i) {
            return function(c) {
              return function(i) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; u;) try {
                  if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                  switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                    case 0:
                    case 1:
                      o = i;
                      break;
                    case 4:
                      return u.label++, { value: i[1], done: !1 };
                    case 5:
                      u.label++, r = i[1], i = [0];
                      continue;
                    case 7:
                      i = u.ops.pop(), u.trys.pop();
                      continue;
                    default:
                      if (!(o = (o = u.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        u = 0;
                        continue;
                      }
                      if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                        u.label = i[1];
                        break;
                      }
                      if (6 === i[0] && u.label < o[1]) {
                        u.label = o[1], o = i;
                        break;
                      }
                      if (o && u.label < o[2]) {
                        u.label = o[2], u.ops.push(i);
                        break;
                      }
                      o[2] && u.ops.pop(), u.trys.pop();
                      continue;
                  }
                  i = e.call(t, u);
                } catch (t) {
                  i = [6, t], r = 0;
                } finally {
                  n = o = 0;
                }
                if (5 & i[0]) throw i[1];
                return { value: i[0] ? i[1] : void 0, done: !0 };
              }([i, c]);
            };
          }
        }, f = a({}, Object(o.a)([u.a, c.a, i.a]), {
          name: "webkit-checker", skip: function() {
            return l(this, void 0, void 0, function() {
              return s(this, function(t) {
                return [2, !Object(r.d)()];
              });
            });
          }
        });
        e.a = f;
      }, function(t, e, n) {
        "use strict";
        var r = n(2), o = this && this.__awaiter || function(t, e, n, r) {
          return new (n || (n = Promise))(function(o, i) {
            function u(t) {
              try {
                a(r.next(t));
              } catch (t) {
                i(t);
              }
            }

            function c(t) {
              try {
                a(r.throw(t));
              } catch (t) {
                i(t);
              }
            }

            function a(t) {
              t.done ? o(t.value) : new n(function(e) {
                e(t.value);
              }).then(u, c);
            }

            a((r = r.apply(t, e || [])).next());
          });
        }, i = this && this.__generator || function(t, e) {
          var n, r, o, i, u = {
            label: 0, sent: function() {
              if (1 & o[0]) throw o[1];
              return o[1];
            }, trys: [], ops: []
          };
          return i = {
            next: c(0),
            throw: c(1),
            return: c(2)
          }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this;
          }), i;

          function c(i) {
            return function(c) {
              return function(i) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; u;) try {
                  if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                  switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                    case 0:
                    case 1:
                      o = i;
                      break;
                    case 4:
                      return u.label++, { value: i[1], done: !1 };
                    case 5:
                      u.label++, r = i[1], i = [0];
                      continue;
                    case 7:
                      i = u.ops.pop(), u.trys.pop();
                      continue;
                    default:
                      if (!(o = (o = u.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        u = 0;
                        continue;
                      }
                      if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                        u.label = i[1];
                        break;
                      }
                      if (6 === i[0] && u.label < o[1]) {
                        u.label = o[1], o = i;
                        break;
                      }
                      if (o && u.label < o[2]) {
                        u.label = o[2], u.ops.push(i);
                        break;
                      }
                      o[2] && u.ops.pop(), u.trys.pop();
                      continue;
                  }
                  i = e.call(t, u);
                } catch (t) {
                  i = [6, t], r = 0;
                } finally {
                  n = o = 0;
                }
                if (5 & i[0]) throw i[1];
                return { value: i[0] ? i[1] : void 0, done: !0 };
              }([i, c]);
            };
          }
        }, u = / /, c = !1;
        u.toString = function() {
          return c = !0, a.name;
        };
        var a = {
          name: "dep-reg-toString-checker", getDevtoolsDetail: function() {
            return o(this, void 0, void 0, function() {
              return i(this, function(t) {
                return c = !1, Object(r.c)({ dep: u }), Object(r.a)(), [2, { isOpen: c, checkerName: this.name }];
              });
            });
          }
        };
        e.a = a;
      }, function(t, e, n) {
        "use strict";
        var r = n(2), o = this && this.__awaiter || function(t, e, n, r) {
          return new (n || (n = Promise))(function(o, i) {
            function u(t) {
              try {
                a(r.next(t));
              } catch (t) {
                i(t);
              }
            }

            function c(t) {
              try {
                a(r.throw(t));
              } catch (t) {
                i(t);
              }
            }

            function a(t) {
              t.done ? o(t.value) : new n(function(e) {
                e(t.value);
              }).then(u, c);
            }

            a((r = r.apply(t, e || [])).next());
          });
        }, i = this && this.__generator || function(t, e) {
          var n, r, o, i, u = {
            label: 0, sent: function() {
              if (1 & o[0]) throw o[1];
              return o[1];
            }, trys: [], ops: []
          };
          return i = {
            next: c(0),
            throw: c(1),
            return: c(2)
          }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this;
          }), i;

          function c(i) {
            return function(c) {
              return function(i) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; u;) try {
                  if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                  switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                    case 0:
                    case 1:
                      o = i;
                      break;
                    case 4:
                      return u.label++, { value: i[1], done: !1 };
                    case 5:
                      u.label++, r = i[1], i = [0];
                      continue;
                    case 7:
                      i = u.ops.pop(), u.trys.pop();
                      continue;
                    default:
                      if (!(o = (o = u.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        u = 0;
                        continue;
                      }
                      if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                        u.label = i[1];
                        break;
                      }
                      if (6 === i[0] && u.label < o[1]) {
                        u.label = o[1], o = i;
                        break;
                      }
                      if (o && u.label < o[2]) {
                        u.label = o[2], u.ops.push(i);
                        break;
                      }
                      o[2] && u.ops.pop(), u.trys.pop();
                      continue;
                  }
                  i = e.call(t, u);
                } catch (t) {
                  i = [6, t], r = 0;
                } finally {
                  n = o = 0;
                }
                if (5 & i[0]) throw i[1];
                return { value: i[0] ? i[1] : void 0, done: !0 };
              }([i, c]);
            };
          }
        };

        function u() {
        }

        var c = 0;
        u.toString = function() {
          c++;
        };
        var a = {
          name: "function-to-string-checker", getDevtoolsDetail: function() {
            return o(this, void 0, void 0, function() {
              return i(this, function(t) {
                return c = 0, Object(r.b)(u), Object(r.a)(), [2, { isOpen: 2 === c, checkerName: this.name }];
              });
            });
          }
        };
        e.a = a;
      }, function(t, e, n) {
        "use strict";
        n.d(e, "a", function() {
          return i;
        });
        var r = n(6), o = Object(r.a)(function() {
          return window.top !== window;
        }), i = Object(r.a)(function() {
          if (!o()) return !1;
          try {
            return Object.keys(window.top.innerWidth), !1;
          } catch (t) {
            return !0;
          }
        });
      }]);
    });
  }, {}],
  "6KOv": [function(require, module, exports) {
    var define;
    var t;
    !function(n, i) {
      "object" == typeof exports ? module.exports = exports = i() : "function" == typeof t && t.amd ? t([], i) : n.CryptoJS = i();
    }(this, function() {
      var t = t || function(t, n) {
        var i = Object.create || function() {
          function t() {
          }

          return function(n) {
            var i;
            return t.prototype = n, i = new t, t.prototype = null, i;
          };
        }(), r = {}, e = r.lib = {}, o = e.Base = {
          extend: function(t) {
            var n = i(this);
            return t && n.mixIn(t), n.hasOwnProperty("init") && this.init !== n.init || (n.init = function() {
              n.$super.init.apply(this, arguments);
            }), n.init.prototype = n, n.$super = this, n;
          }, create: function() {
            var t = this.extend();
            return t.init.apply(t, arguments), t;
          }, init: function() {
          }, mixIn: function(t) {
            for (var n in t) t.hasOwnProperty(n) && (this[n] = t[n]);
            t.hasOwnProperty("toString") && (this.toString = t.toString);
          }, clone: function() {
            return this.init.prototype.extend(this);
          }
        }, s = e.WordArray = o.extend({
          init: function(t, n) {
            t = this.words = t || [], this.sigBytes = null != n ? n : 4 * t.length;
          }, toString: function(t) {
            return (t || c).stringify(this);
          }, concat: function(t) {
            var n = this.words, i = t.words, r = this.sigBytes, e = t.sigBytes;
            if (this.clamp(), r % 4) for (var o = 0; o < e; o++) {
              var s = i[o >>> 2] >>> 24 - o % 4 * 8 & 255;
              n[r + o >>> 2] |= s << 24 - (r + o) % 4 * 8;
            } else for (o = 0; o < e; o += 4) n[r + o >>> 2] = i[o >>> 2];
            return this.sigBytes += e, this;
          }, clamp: function() {
            var n = this.words, i = this.sigBytes;
            n[i >>> 2] &= 4294967295 << 32 - i % 4 * 8, n.length = t.ceil(i / 4);
          }, clone: function() {
            var t = o.clone.call(this);
            return t.words = this.words.slice(0), t;
          }, random: function(n) {
            for (var i, r = [], e = function(n) {
              n = n;
              var i = 987654321, r = 4294967295;
              return function() {
                var e = ((i = 36969 * (65535 & i) + (i >> 16) & r) << 16) + (n = 18e3 * (65535 & n) + (n >> 16) & r) & r;
                return e /= 4294967296, (e += .5) * (t.random() > .5 ? 1 : -1);
              };
            }, o = 0; o < n; o += 4) {
              var a = e(4294967296 * (i || t.random()));
              i = 987654071 * a(), r.push(4294967296 * a() | 0);
            }
            return new s.init(r, n);
          }
        }), a = r.enc = {}, c = a.Hex = {
          stringify: function(t) {
            for (var n = t.words, i = t.sigBytes, r = [], e = 0; e < i; e++) {
              var o = n[e >>> 2] >>> 24 - e % 4 * 8 & 255;
              r.push((o >>> 4).toString(16)), r.push((15 & o).toString(16));
            }
            return r.join("");
          }, parse: function(t) {
            for (var n = t.length, i = [], r = 0; r < n; r += 2) i[r >>> 3] |= parseInt(t.substr(r, 2), 16) << 24 - r % 8 * 4;
            return new s.init(i, n / 2);
          }
        }, u = a.Latin1 = {
          stringify: function(t) {
            for (var n = t.words, i = t.sigBytes, r = [], e = 0; e < i; e++) {
              var o = n[e >>> 2] >>> 24 - e % 4 * 8 & 255;
              r.push(String.fromCharCode(o));
            }
            return r.join("");
          }, parse: function(t) {
            for (var n = t.length, i = [], r = 0; r < n; r++) i[r >>> 2] |= (255 & t.charCodeAt(r)) << 24 - r % 4 * 8;
            return new s.init(i, n);
          }
        }, f = a.Utf8 = {
          stringify: function(t) {
            try {
              return decodeURIComponent(escape(u.stringify(t)));
            } catch (n) {
              throw new Error("Malformed UTF-8 data");
            }
          }, parse: function(t) {
            return u.parse(unescape(encodeURIComponent(t)));
          }
        }, h = e.BufferedBlockAlgorithm = o.extend({
          reset: function() {
            this._data = new s.init, this._nDataBytes = 0;
          }, _append: function(t) {
            "string" == typeof t && (t = f.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes;
          }, _process: function(n) {
            var i = this._data, r = i.words, e = i.sigBytes, o = this.blockSize, a = e / (4 * o),
              c = (a = n ? t.ceil(a) : t.max((0 | a) - this._minBufferSize, 0)) * o, u = t.min(4 * c, e);
            if (c) {
              for (var f = 0; f < c; f += o) this._doProcessBlock(r, f);
              var h = r.splice(0, c);
              i.sigBytes -= u;
            }
            return new s.init(h, u);
          }, clone: function() {
            var t = o.clone.call(this);
            return t._data = this._data.clone(), t;
          }, _minBufferSize: 0
        }), p = (e.Hasher = h.extend({
          cfg: o.extend(), init: function(t) {
            this.cfg = this.cfg.extend(t), this.reset();
          }, reset: function() {
            h.reset.call(this), this._doReset();
          }, update: function(t) {
            return this._append(t), this._process(), this;
          }, finalize: function(t) {
            return t && this._append(t), this._doFinalize();
          }, blockSize: 16, _createHelper: function(t) {
            return function(n, i) {
              return new t.init(i).finalize(n);
            };
          }, _createHmacHelper: function(t) {
            return function(n, i) {
              return new p.HMAC.init(t, i).finalize(n);
            };
          }
        }), r.algo = {});
        return r;
      }(Math);
      return t;
    });
  }, {}],
  "aSfD": [function(require, module, exports) {
    var define;
    var t;
    !function(r, o) {
      "object" == typeof exports ? module.exports = exports = o(require("./core")) : "function" == typeof t && t.amd ? t(["./core"], o) : o(r.CryptoJS);
    }(this, function(t) {
      var r, o, e, n, i;
      return o = (r = t).lib, e = o.Base, n = o.WordArray, (i = r.x64 = {}).Word = e.extend({
        init: function(t, r) {
          this.high = t, this.low = r;
        }
      }), i.WordArray = e.extend({
        init: function(t, r) {
          t = this.words = t || [], this.sigBytes = null != r ? r : 8 * t.length;
        }, toX32: function() {
          for (var t = this.words, r = t.length, o = [], e = 0; e < r; e++) {
            var i = t[e];
            o.push(i.high), o.push(i.low);
          }
          return n.create(o, this.sigBytes);
        }, clone: function() {
          for (var t = e.clone.call(this), r = t.words = this.words.slice(0), o = r.length, n = 0; n < o; n++) r[n] = r[n].clone();
          return t;
        }
      }), t;
    });
  }, { "./core": "6KOv" }],
  "xeeP": [function(require, module, exports) {
    var define;
    var r;
    !function(n, t) {
      "object" == typeof exports ? module.exports = exports = t(require("./core")) : "function" == typeof r && r.amd ? r(["./core"], t) : t(n.CryptoJS);
    }(this, function(r) {
      return function() {
        if ("function" == typeof ArrayBuffer) {
          var n = r.lib.WordArray, t = n.init;
          (n.init = function(r) {
            if (r instanceof ArrayBuffer && (r = new Uint8Array(r)), (r instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && r instanceof Uint8ClampedArray || r instanceof Int16Array || r instanceof Uint16Array || r instanceof Int32Array || r instanceof Uint32Array || r instanceof Float32Array || r instanceof Float64Array) && (r = new Uint8Array(r.buffer, r.byteOffset, r.byteLength)), r instanceof Uint8Array) {
              for (var n = r.byteLength, e = [], a = 0; a < n; a++) e[a >>> 2] |= r[a] << 24 - a % 4 * 8;
              t.call(this, e, n);
            } else t.apply(this, arguments);
          }).prototype = n;
        }
      }(), r.lib.WordArray;
    });
  }, { "./core": "6KOv" }],
  "hJKL": [function(require, module, exports) {
    var define;
    var r;
    !function(t, n) {
      "object" == typeof exports ? module.exports = exports = n(require("./core")) : "function" == typeof r && r.amd ? r(["./core"], n) : n(t.CryptoJS);
    }(this, function(r) {
      return function() {
        var t = r, n = t.lib.WordArray, o = t.enc;
        o.Utf16 = o.Utf16BE = {
          stringify: function(r) {
            for (var t = r.words, n = r.sigBytes, o = [], e = 0; e < n; e += 2) {
              var f = t[e >>> 2] >>> 16 - e % 4 * 8 & 65535;
              o.push(String.fromCharCode(f));
            }
            return o.join("");
          }, parse: function(r) {
            for (var t = r.length, o = [], e = 0; e < t; e++) o[e >>> 1] |= r.charCodeAt(e) << 16 - e % 2 * 16;
            return n.create(o, 2 * t);
          }
        };

        function e(r) {
          return r << 8 & 4278255360 | r >>> 8 & 16711935;
        }

        o.Utf16LE = {
          stringify: function(r) {
            for (var t = r.words, n = r.sigBytes, o = [], f = 0; f < n; f += 2) {
              var i = e(t[f >>> 2] >>> 16 - f % 4 * 8 & 65535);
              o.push(String.fromCharCode(i));
            }
            return o.join("");
          }, parse: function(r) {
            for (var t = r.length, o = [], f = 0; f < t; f++) o[f >>> 1] |= e(r.charCodeAt(f) << 16 - f % 2 * 16);
            return n.create(o, 2 * t);
          }
        };
      }(), r.enc.Utf16;
    });
  }, { "./core": "6KOv" }],
  "5fV5": [function(require, module, exports) {
    var define;
    var r;
    !function(e, t) {
      "object" == typeof exports ? module.exports = exports = t(require("./core")) : "function" == typeof r && r.amd ? r(["./core"], t) : t(e.CryptoJS);
    }(this, function(r) {
      return function() {
        var e = r, t = e.lib.WordArray;
        e.enc.Base64 = {
          stringify: function(r) {
            var e = r.words, t = r.sigBytes, a = this._map;
            r.clamp();
            for (var o = [], n = 0; n < t; n += 3) for (var i = (e[n >>> 2] >>> 24 - n % 4 * 8 & 255) << 16 | (e[n + 1 >>> 2] >>> 24 - (n + 1) % 4 * 8 & 255) << 8 | e[n + 2 >>> 2] >>> 24 - (n + 2) % 4 * 8 & 255, c = 0; c < 4 && n + .75 * c < t; c++) o.push(a.charAt(i >>> 6 * (3 - c) & 63));
            var f = a.charAt(64);
            if (f) for (; o.length % 4;) o.push(f);
            return o.join("");
          }, parse: function(r) {
            var e = r.length, a = this._map, o = this._reverseMap;
            if (!o) {
              o = this._reverseMap = [];
              for (var n = 0; n < a.length; n++) o[a.charCodeAt(n)] = n;
            }
            var i = a.charAt(64);
            if (i) {
              var c = r.indexOf(i);
              -1 !== c && (e = c);
            }
            return function(r, e, a) {
              for (var o = [], n = 0, i = 0; i < e; i++) if (i % 4) {
                var c = a[r.charCodeAt(i - 1)] << i % 4 * 2, f = a[r.charCodeAt(i)] >>> 6 - i % 4 * 2;
                o[n >>> 2] |= (c | f) << 24 - n % 4 * 8, n++;
              }
              return t.create(o, n);
            }(r, e, o);
          }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
      }(), r.enc.Base64;
    });
  }, { "./core": "6KOv" }],
  "Pylf": [function(require, module, exports) {
    var define;
    var r;
    !function(t, n) {
      "object" == typeof exports ? module.exports = exports = n(require("./core")) : "function" == typeof r && r.amd ? r(["./core"], n) : n(t.CryptoJS);
    }(this, function(r) {
      return function(t) {
        var n = r, e = n.lib, o = e.WordArray, a = e.Hasher, s = n.algo, i = [];
        !function() {
          for (var r = 0; r < 64; r++) i[r] = 4294967296 * t.abs(t.sin(r + 1)) | 0;
        }();
        var c = s.MD5 = a.extend({
          _doReset: function() {
            this._hash = new o.init([1732584193, 4023233417, 2562383102, 271733878]);
          }, _doProcessBlock: function(r, t) {
            for (var n = 0; n < 16; n++) {
              var e = t + n, o = r[e];
              r[e] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8);
            }
            var a = this._hash.words, s = r[t + 0], c = r[t + 1], l = r[t + 2], _ = r[t + 3], d = r[t + 4],
              p = r[t + 5], y = r[t + 6], D = r[t + 7], H = r[t + 8], M = r[t + 9], g = r[t + 10], m = r[t + 11],
              w = r[t + 12], x = r[t + 13], B = r[t + 14], b = r[t + 15], j = a[0], k = a[1], q = a[2], z = a[3];
            j = h(j, k, q, z, s, 7, i[0]), z = h(z, j, k, q, c, 12, i[1]), q = h(q, z, j, k, l, 17, i[2]), k = h(k, q, z, j, _, 22, i[3]), j = h(j, k, q, z, d, 7, i[4]), z = h(z, j, k, q, p, 12, i[5]), q = h(q, z, j, k, y, 17, i[6]), k = h(k, q, z, j, D, 22, i[7]), j = h(j, k, q, z, H, 7, i[8]), z = h(z, j, k, q, M, 12, i[9]), q = h(q, z, j, k, g, 17, i[10]), k = h(k, q, z, j, m, 22, i[11]), j = h(j, k, q, z, w, 7, i[12]), z = h(z, j, k, q, x, 12, i[13]), q = h(q, z, j, k, B, 17, i[14]), j = u(j, k = h(k, q, z, j, b, 22, i[15]), q, z, c, 5, i[16]), z = u(z, j, k, q, y, 9, i[17]), q = u(q, z, j, k, m, 14, i[18]), k = u(k, q, z, j, s, 20, i[19]), j = u(j, k, q, z, p, 5, i[20]), z = u(z, j, k, q, g, 9, i[21]), q = u(q, z, j, k, b, 14, i[22]), k = u(k, q, z, j, d, 20, i[23]), j = u(j, k, q, z, M, 5, i[24]), z = u(z, j, k, q, B, 9, i[25]), q = u(q, z, j, k, _, 14, i[26]), k = u(k, q, z, j, H, 20, i[27]), j = u(j, k, q, z, x, 5, i[28]), z = u(z, j, k, q, l, 9, i[29]), q = u(q, z, j, k, D, 14, i[30]), j = f(j, k = u(k, q, z, j, w, 20, i[31]), q, z, p, 4, i[32]), z = f(z, j, k, q, H, 11, i[33]), q = f(q, z, j, k, m, 16, i[34]), k = f(k, q, z, j, B, 23, i[35]), j = f(j, k, q, z, c, 4, i[36]), z = f(z, j, k, q, d, 11, i[37]), q = f(q, z, j, k, D, 16, i[38]), k = f(k, q, z, j, g, 23, i[39]), j = f(j, k, q, z, x, 4, i[40]), z = f(z, j, k, q, s, 11, i[41]), q = f(q, z, j, k, _, 16, i[42]), k = f(k, q, z, j, y, 23, i[43]), j = f(j, k, q, z, M, 4, i[44]), z = f(z, j, k, q, w, 11, i[45]), q = f(q, z, j, k, b, 16, i[46]), j = v(j, k = f(k, q, z, j, l, 23, i[47]), q, z, s, 6, i[48]), z = v(z, j, k, q, D, 10, i[49]), q = v(q, z, j, k, B, 15, i[50]), k = v(k, q, z, j, p, 21, i[51]), j = v(j, k, q, z, w, 6, i[52]), z = v(z, j, k, q, _, 10, i[53]), q = v(q, z, j, k, g, 15, i[54]), k = v(k, q, z, j, c, 21, i[55]), j = v(j, k, q, z, H, 6, i[56]), z = v(z, j, k, q, b, 10, i[57]), q = v(q, z, j, k, y, 15, i[58]), k = v(k, q, z, j, x, 21, i[59]), j = v(j, k, q, z, d, 6, i[60]), z = v(z, j, k, q, m, 10, i[61]), q = v(q, z, j, k, l, 15, i[62]), k = v(k, q, z, j, M, 21, i[63]), a[0] = a[0] + j | 0, a[1] = a[1] + k | 0, a[2] = a[2] + q | 0, a[3] = a[3] + z | 0;
          }, _doFinalize: function() {
            var r = this._data, n = r.words, e = 8 * this._nDataBytes, o = 8 * r.sigBytes;
            n[o >>> 5] |= 128 << 24 - o % 32;
            var a = t.floor(e / 4294967296), s = e;
            n[15 + (o + 64 >>> 9 << 4)] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8), n[14 + (o + 64 >>> 9 << 4)] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), r.sigBytes = 4 * (n.length + 1), this._process();
            for (var i = this._hash, c = i.words, h = 0; h < 4; h++) {
              var u = c[h];
              c[h] = 16711935 & (u << 8 | u >>> 24) | 4278255360 & (u << 24 | u >>> 8);
            }
            return i;
          }, clone: function() {
            var r = a.clone.call(this);
            return r._hash = this._hash.clone(), r;
          }
        });

        function h(r, t, n, e, o, a, s) {
          var i = r + (t & n | ~t & e) + o + s;
          return (i << a | i >>> 32 - a) + t;
        }

        function u(r, t, n, e, o, a, s) {
          var i = r + (t & e | n & ~e) + o + s;
          return (i << a | i >>> 32 - a) + t;
        }

        function f(r, t, n, e, o, a, s) {
          var i = r + (t ^ n ^ e) + o + s;
          return (i << a | i >>> 32 - a) + t;
        }

        function v(r, t, n, e, o, a, s) {
          var i = r + (n ^ (t | ~e)) + o + s;
          return (i << a | i >>> 32 - a) + t;
        }

        n.MD5 = a._createHelper(c), n.HmacMD5 = a._createHmacHelper(c);
      }(Math), r.MD5;
    });
  }, { "./core": "6KOv" }],
  "NPgf": [function(require, module, exports) {
    var define;
    var e;
    !function(t, r) {
      "object" == typeof exports ? module.exports = exports = r(require("./core")) : "function" == typeof e && e.amd ? e(["./core"], r) : r(t.CryptoJS);
    }(this, function(e) {
      var t, r, o, s, a, n, i;
      return r = (t = e).lib, o = r.WordArray, s = r.Hasher, a = t.algo, n = [], i = a.SHA1 = s.extend({
        _doReset: function() {
          this._hash = new o.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
        }, _doProcessBlock: function(e, t) {
          for (var r = this._hash.words, o = r[0], s = r[1], a = r[2], i = r[3], h = r[4], c = 0; c < 80; c++) {
            if (c < 16) n[c] = 0 | e[t + c]; else {
              var l = n[c - 3] ^ n[c - 8] ^ n[c - 14] ^ n[c - 16];
              n[c] = l << 1 | l >>> 31;
            }
            var _ = (o << 5 | o >>> 27) + h + n[c];
            _ += c < 20 ? 1518500249 + (s & a | ~s & i) : c < 40 ? 1859775393 + (s ^ a ^ i) : c < 60 ? (s & a | s & i | a & i) - 1894007588 : (s ^ a ^ i) - 899497514, h = i, i = a, a = s << 30 | s >>> 2, s = o, o = _;
          }
          r[0] = r[0] + o | 0, r[1] = r[1] + s | 0, r[2] = r[2] + a | 0, r[3] = r[3] + i | 0, r[4] = r[4] + h | 0;
        }, _doFinalize: function() {
          var e = this._data, t = e.words, r = 8 * this._nDataBytes, o = 8 * e.sigBytes;
          return t[o >>> 5] |= 128 << 24 - o % 32, t[14 + (o + 64 >>> 9 << 4)] = Math.floor(r / 4294967296), t[15 + (o + 64 >>> 9 << 4)] = r, e.sigBytes = 4 * t.length, this._process(), this._hash;
        }, clone: function() {
          var e = s.clone.call(this);
          return e._hash = this._hash.clone(), e;
        }
      }), t.SHA1 = s._createHelper(i), t.HmacSHA1 = s._createHmacHelper(i), e.SHA1;
    });
  }, { "./core": "6KOv" }],
  "A0uM": [function(require, module, exports) {
    var define;
    var r;
    !function(t, e) {
      "object" == typeof exports ? module.exports = exports = e(require("./core")) : "function" == typeof r && r.amd ? r(["./core"], e) : e(t.CryptoJS);
    }(this, function(r) {
      return function(t) {
        var e = r, o = e.lib, n = o.WordArray, s = o.Hasher, i = e.algo, a = [], c = [];
        !function() {
          function r(r) {
            for (var e = t.sqrt(r), o = 2; o <= e; o++) if (!(r % o)) return !1;
            return !0;
          }

          function e(r) {
            return 4294967296 * (r - (0 | r)) | 0;
          }

          for (var o = 2, n = 0; n < 64;) r(o) && (n < 8 && (a[n] = e(t.pow(o, .5))), c[n] = e(t.pow(o, 1 / 3)), n++), o++;
        }();
        var h = [], f = i.SHA256 = s.extend({
          _doReset: function() {
            this._hash = new n.init(a.slice(0));
          }, _doProcessBlock: function(r, t) {
            for (var e = this._hash.words, o = e[0], n = e[1], s = e[2], i = e[3], a = e[4], f = e[5], u = e[6], l = e[7], _ = 0; _ < 64; _++) {
              if (_ < 16) h[_] = 0 | r[t + _]; else {
                var p = h[_ - 15], d = (p << 25 | p >>> 7) ^ (p << 14 | p >>> 18) ^ p >>> 3, v = h[_ - 2],
                  H = (v << 15 | v >>> 17) ^ (v << 13 | v >>> 19) ^ v >>> 10;
                h[_] = d + h[_ - 7] + H + h[_ - 16];
              }
              var y = o & n ^ o & s ^ n & s, w = (o << 30 | o >>> 2) ^ (o << 19 | o >>> 13) ^ (o << 10 | o >>> 22),
                A = l + ((a << 26 | a >>> 6) ^ (a << 21 | a >>> 11) ^ (a << 7 | a >>> 25)) + (a & f ^ ~a & u) + c[_] + h[_];
              l = u, u = f, f = a, a = i + A | 0, i = s, s = n, n = o, o = A + (w + y) | 0;
            }
            e[0] = e[0] + o | 0, e[1] = e[1] + n | 0, e[2] = e[2] + s | 0, e[3] = e[3] + i | 0, e[4] = e[4] + a | 0, e[5] = e[5] + f | 0, e[6] = e[6] + u | 0, e[7] = e[7] + l | 0;
          }, _doFinalize: function() {
            var r = this._data, e = r.words, o = 8 * this._nDataBytes, n = 8 * r.sigBytes;
            return e[n >>> 5] |= 128 << 24 - n % 32, e[14 + (n + 64 >>> 9 << 4)] = t.floor(o / 4294967296), e[15 + (n + 64 >>> 9 << 4)] = o, r.sigBytes = 4 * e.length, this._process(), this._hash;
          }, clone: function() {
            var r = s.clone.call(this);
            return r._hash = this._hash.clone(), r;
          }
        });
        e.SHA256 = s._createHelper(f), e.HmacSHA256 = s._createHmacHelper(f);
      }(Math), r.SHA256;
    });
  }, { "./core": "6KOv" }],
  "vneu": [function(require, module, exports) {
    var define;
    var e;
    !function(r, t, o) {
      "object" == typeof exports ? module.exports = exports = t(require("./core"), require("./sha256")) : "function" == typeof e && e.amd ? e(["./core", "./sha256"], t) : t(r.CryptoJS);
    }(this, function(e) {
      var r, t, o, i, n;
      return t = (r = e).lib.WordArray, o = r.algo, i = o.SHA256, n = o.SHA224 = i.extend({
        _doReset: function() {
          this._hash = new t.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]);
        }, _doFinalize: function() {
          var e = i._doFinalize.call(this);
          return e.sigBytes -= 4, e;
        }
      }), r.SHA224 = i._createHelper(n), r.HmacSHA224 = i._createHmacHelper(n), e.SHA224;
    });
  }, { "./core": "6KOv", "./sha256": "A0uM" }],
  "fOEq": [function(require, module, exports) {
    var define;
    var i;
    !function(h, o, e) {
      "object" == typeof exports ? module.exports = exports = o(require("./core"), require("./x64-core")) : "function" == typeof i && i.amd ? i(["./core", "./x64-core"], o) : o(h.CryptoJS);
    }(this, function(i) {
      return function() {
        var h = i, o = h.lib.Hasher, e = h.x64, t = e.Word, n = e.WordArray, r = h.algo;

        function l() {
          return t.create.apply(t, arguments);
        }

        var a = [l(1116352408, 3609767458), l(1899447441, 602891725), l(3049323471, 3964484399), l(3921009573, 2173295548), l(961987163, 4081628472), l(1508970993, 3053834265), l(2453635748, 2937671579), l(2870763221, 3664609560), l(3624381080, 2734883394), l(310598401, 1164996542), l(607225278, 1323610764), l(1426881987, 3590304994), l(1925078388, 4068182383), l(2162078206, 991336113), l(2614888103, 633803317), l(3248222580, 3479774868), l(3835390401, 2666613458), l(4022224774, 944711139), l(264347078, 2341262773), l(604807628, 2007800933), l(770255983, 1495990901), l(1249150122, 1856431235), l(1555081692, 3175218132), l(1996064986, 2198950837), l(2554220882, 3999719339), l(2821834349, 766784016), l(2952996808, 2566594879), l(3210313671, 3203337956), l(3336571891, 1034457026), l(3584528711, 2466948901), l(113926993, 3758326383), l(338241895, 168717936), l(666307205, 1188179964), l(773529912, 1546045734), l(1294757372, 1522805485), l(1396182291, 2643833823), l(1695183700, 2343527390), l(1986661051, 1014477480), l(2177026350, 1206759142), l(2456956037, 344077627), l(2730485921, 1290863460), l(2820302411, 3158454273), l(3259730800, 3505952657), l(3345764771, 106217008), l(3516065817, 3606008344), l(3600352804, 1432725776), l(4094571909, 1467031594), l(275423344, 851169720), l(430227734, 3100823752), l(506948616, 1363258195), l(659060556, 3750685593), l(883997877, 3785050280), l(958139571, 3318307427), l(1322822218, 3812723403), l(1537002063, 2003034995), l(1747873779, 3602036899), l(1955562222, 1575990012), l(2024104815, 1125592928), l(2227730452, 2716904306), l(2361852424, 442776044), l(2428436474, 593698344), l(2756734187, 3733110249), l(3204031479, 2999351573), l(3329325298, 3815920427), l(3391569614, 3928383900), l(3515267271, 566280711), l(3940187606, 3454069534), l(4118630271, 4000239992), l(116418474, 1914138554), l(174292421, 2731055270), l(289380356, 3203993006), l(460393269, 320620315), l(685471733, 587496836), l(852142971, 1086792851), l(1017036298, 365543100), l(1126000580, 2618297676), l(1288033470, 3409855158), l(1501505948, 4234509866), l(1607167915, 987167468), l(1816402316, 1246189591)],
          w = [];
        !function() {
          for (var i = 0; i < 80; i++) w[i] = l();
        }();
        var s = r.SHA512 = o.extend({
          _doReset: function() {
            this._hash = new n.init([new t.init(1779033703, 4089235720), new t.init(3144134277, 2227873595), new t.init(1013904242, 4271175723), new t.init(2773480762, 1595750129), new t.init(1359893119, 2917565137), new t.init(2600822924, 725511199), new t.init(528734635, 4215389547), new t.init(1541459225, 327033209)]);
          }, _doProcessBlock: function(i, h) {
            for (var o = this._hash.words, e = o[0], t = o[1], n = o[2], r = o[3], l = o[4], s = o[5], c = o[6], g = o[7], u = e.high, f = e.low, _ = t.high, v = t.low, d = n.high, p = n.low, H = r.high, y = r.low, x = l.high, S = l.low, A = s.high, m = s.low, B = c.high, b = c.low, k = g.high, q = g.low, z = u, W = f, j = _, C = v, D = d, F = p, J = H, M = y, P = x, R = S, X = A, E = m, G = B, I = b, K = k, L = q, N = 0; N < 80; N++) {
              var O = w[N];
              if (N < 16) var Q = O.high = 0 | i[h + 2 * N], T = O.low = 0 | i[h + 2 * N + 1]; else {
                var U = w[N - 15], V = U.high, Y = U.low, Z = (V >>> 1 | Y << 31) ^ (V >>> 8 | Y << 24) ^ V >>> 7,
                  $ = (Y >>> 1 | V << 31) ^ (Y >>> 8 | V << 24) ^ (Y >>> 7 | V << 25), ii = w[N - 2], hi = ii.high,
                  oi = ii.low, ei = (hi >>> 19 | oi << 13) ^ (hi << 3 | oi >>> 29) ^ hi >>> 6,
                  ti = (oi >>> 19 | hi << 13) ^ (oi << 3 | hi >>> 29) ^ (oi >>> 6 | hi << 26), ni = w[N - 7],
                  ri = ni.high, li = ni.low, ai = w[N - 16], wi = ai.high, si = ai.low;
                Q = (Q = (Q = Z + ri + ((T = $ + li) >>> 0 < $ >>> 0 ? 1 : 0)) + ei + ((T = T + ti) >>> 0 < ti >>> 0 ? 1 : 0)) + wi + ((T = T + si) >>> 0 < si >>> 0 ? 1 : 0);
                O.high = Q, O.low = T;
              }
              var ci, gi = P & X ^ ~P & G, ui = R & E ^ ~R & I, fi = z & j ^ z & D ^ j & D, _i = W & C ^ W & F ^ C & F,
                vi = (z >>> 28 | W << 4) ^ (z << 30 | W >>> 2) ^ (z << 25 | W >>> 7),
                di = (W >>> 28 | z << 4) ^ (W << 30 | z >>> 2) ^ (W << 25 | z >>> 7),
                pi = (P >>> 14 | R << 18) ^ (P >>> 18 | R << 14) ^ (P << 23 | R >>> 9),
                Hi = (R >>> 14 | P << 18) ^ (R >>> 18 | P << 14) ^ (R << 23 | P >>> 9), yi = a[N], xi = yi.high,
                Si = yi.low, Ai = K + pi + ((ci = L + Hi) >>> 0 < L >>> 0 ? 1 : 0), mi = di + _i;
              K = G, L = I, G = X, I = E, X = P, E = R, P = J + (Ai = (Ai = (Ai = Ai + gi + ((ci = ci + ui) >>> 0 < ui >>> 0 ? 1 : 0)) + xi + ((ci = ci + Si) >>> 0 < Si >>> 0 ? 1 : 0)) + Q + ((ci = ci + T) >>> 0 < T >>> 0 ? 1 : 0)) + ((R = M + ci | 0) >>> 0 < M >>> 0 ? 1 : 0) | 0, J = D, M = F, D = j, F = C, j = z, C = W, z = Ai + (vi + fi + (mi >>> 0 < di >>> 0 ? 1 : 0)) + ((W = ci + mi | 0) >>> 0 < ci >>> 0 ? 1 : 0) | 0;
            }
            f = e.low = f + W, e.high = u + z + (f >>> 0 < W >>> 0 ? 1 : 0), v = t.low = v + C, t.high = _ + j + (v >>> 0 < C >>> 0 ? 1 : 0), p = n.low = p + F, n.high = d + D + (p >>> 0 < F >>> 0 ? 1 : 0), y = r.low = y + M, r.high = H + J + (y >>> 0 < M >>> 0 ? 1 : 0), S = l.low = S + R, l.high = x + P + (S >>> 0 < R >>> 0 ? 1 : 0), m = s.low = m + E, s.high = A + X + (m >>> 0 < E >>> 0 ? 1 : 0), b = c.low = b + I, c.high = B + G + (b >>> 0 < I >>> 0 ? 1 : 0), q = g.low = q + L, g.high = k + K + (q >>> 0 < L >>> 0 ? 1 : 0);
          }, _doFinalize: function() {
            var i = this._data, h = i.words, o = 8 * this._nDataBytes, e = 8 * i.sigBytes;
            return h[e >>> 5] |= 128 << 24 - e % 32, h[30 + (e + 128 >>> 10 << 5)] = Math.floor(o / 4294967296), h[31 + (e + 128 >>> 10 << 5)] = o, i.sigBytes = 4 * h.length, this._process(), this._hash.toX32();
          }, clone: function() {
            var i = o.clone.call(this);
            return i._hash = this._hash.clone(), i;
          }, blockSize: 32
        });
        h.SHA512 = o._createHelper(s), h.HmacSHA512 = o._createHmacHelper(s);
      }(), i.SHA512;
    });
  }, { "./core": "6KOv", "./x64-core": "aSfD" }],
  "CcfJ": [function(require, module, exports) {
    var define;
    var e;
    !function(i, n, t) {
      "object" == typeof exports ? module.exports = exports = n(require("./core"), require("./x64-core"), require("./sha512")) : "function" == typeof e && e.amd ? e(["./core", "./x64-core", "./sha512"], n) : n(i.CryptoJS);
    }(this, function(e) {
      var i, n, t, r, o, a, c;
      return n = (i = e).x64, t = n.Word, r = n.WordArray, o = i.algo, a = o.SHA512, c = o.SHA384 = a.extend({
        _doReset: function() {
          this._hash = new r.init([new t.init(3418070365, 3238371032), new t.init(1654270250, 914150663), new t.init(2438529370, 812702999), new t.init(355462360, 4144912697), new t.init(1731405415, 4290775857), new t.init(2394180231, 1750603025), new t.init(3675008525, 1694076839), new t.init(1203062813, 3204075428)]);
        }, _doFinalize: function() {
          var e = a._doFinalize.call(this);
          return e.sigBytes -= 16, e;
        }
      }), i.SHA384 = a._createHelper(c), i.HmacSHA384 = a._createHmacHelper(c), e.SHA384;
    });
  }, { "./core": "6KOv", "./x64-core": "aSfD", "./sha512": "fOEq" }],
  "zroK": [function(require, module, exports) {
    var define;
    var r;
    !function(o, t, e) {
      "object" == typeof exports ? module.exports = exports = t(require("./core"), require("./x64-core")) : "function" == typeof r && r.amd ? r(["./core", "./x64-core"], t) : t(o.CryptoJS);
    }(this, function(r) {
      return function(o) {
        var t = r, e = t.lib, i = e.WordArray, h = e.Hasher, a = t.x64.Word, n = t.algo, s = [], c = [], f = [];
        !function() {
          for (var r = 1, o = 0, t = 0; t < 24; t++) {
            s[r + 5 * o] = (t + 1) * (t + 2) / 2 % 64;
            var e = (2 * r + 3 * o) % 5;
            r = o % 5, o = e;
          }
          for (r = 0; r < 5; r++) for (o = 0; o < 5; o++) c[r + 5 * o] = o + (2 * r + 3 * o) % 5 * 5;
          for (var i = 1, h = 0; h < 24; h++) {
            for (var n = 0, l = 0, g = 0; g < 7; g++) {
              if (1 & i) {
                var v = (1 << g) - 1;
                v < 32 ? l ^= 1 << v : n ^= 1 << v - 32;
              }
              128 & i ? i = i << 1 ^ 113 : i <<= 1;
            }
            f[h] = a.create(n, l);
          }
        }();
        var l = [];
        !function() {
          for (var r = 0; r < 25; r++) l[r] = a.create();
        }();
        var g = n.SHA3 = h.extend({
          cfg: h.cfg.extend({ outputLength: 512 }), _doReset: function() {
            for (var r = this._state = [], o = 0; o < 25; o++) r[o] = new a.init;
            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
          }, _doProcessBlock: function(r, o) {
            for (var t = this._state, e = this.blockSize / 2, i = 0; i < e; i++) {
              var h = r[o + 2 * i], a = r[o + 2 * i + 1];
              h = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8), a = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8), (B = t[i]).high ^= a, B.low ^= h;
            }
            for (var n = 0; n < 24; n++) {
              for (var g = 0; g < 5; g++) {
                for (var v = 0, u = 0, w = 0; w < 5; w++) {
                  v ^= (B = t[g + 5 * w]).high, u ^= B.low;
                }
                var p = l[g];
                p.high = v, p.low = u;
              }
              for (g = 0; g < 5; g++) {
                var _ = l[(g + 4) % 5], d = l[(g + 1) % 5], H = d.high, x = d.low;
                for (v = _.high ^ (H << 1 | x >>> 31), u = _.low ^ (x << 1 | H >>> 31), w = 0; w < 5; w++) {
                  (B = t[g + 5 * w]).high ^= v, B.low ^= u;
                }
              }
              for (var S = 1; S < 25; S++) {
                var y = (B = t[S]).high, b = B.low, A = s[S];
                if (A < 32) v = y << A | b >>> 32 - A, u = b << A | y >>> 32 - A; else v = b << A - 32 | y >>> 64 - A, u = y << A - 32 | b >>> 64 - A;
                var k = l[c[S]];
                k.high = v, k.low = u;
              }
              var m = l[0], z = t[0];
              m.high = z.high, m.low = z.low;
              for (g = 0; g < 5; g++) for (w = 0; w < 5; w++) {
                var B = t[S = g + 5 * w], L = l[S], q = l[(g + 1) % 5 + 5 * w], W = l[(g + 2) % 5 + 5 * w];
                B.high = L.high ^ ~q.high & W.high, B.low = L.low ^ ~q.low & W.low;
              }
              B = t[0];
              var j = f[n];
              B.high ^= j.high, B.low ^= j.low;
            }
          }, _doFinalize: function() {
            var r = this._data, t = r.words, e = (this._nDataBytes, 8 * r.sigBytes), h = 32 * this.blockSize;
            t[e >>> 5] |= 1 << 24 - e % 32, t[(o.ceil((e + 1) / h) * h >>> 5) - 1] |= 128, r.sigBytes = 4 * t.length, this._process();
            for (var a = this._state, n = this.cfg.outputLength / 8, s = n / 8, c = [], f = 0; f < s; f++) {
              var l = a[f], g = l.high, v = l.low;
              g = 16711935 & (g << 8 | g >>> 24) | 4278255360 & (g << 24 | g >>> 8), v = 16711935 & (v << 8 | v >>> 24) | 4278255360 & (v << 24 | v >>> 8), c.push(v), c.push(g);
            }
            return new i.init(c, n);
          }, clone: function() {
            for (var r = h.clone.call(this), o = r._state = this._state.slice(0), t = 0; t < 25; t++) o[t] = o[t].clone();
            return r;
          }
        });
        t.SHA3 = h._createHelper(g), t.HmacSHA3 = h._createHmacHelper(g);
      }(Math), r.SHA3;
    });
  }, { "./core": "6KOv", "./x64-core": "aSfD" }],
  "eQEa": [function(require, module, exports) {
    var define;
    var r;
    !function(e, t) {
      "object" == typeof exports ? module.exports = exports = t(require("./core")) : "function" == typeof r && r.amd ? r(["./core"], t) : t(e.CryptoJS);
    }(this, function(r) {
      return function(e) {
        var t = r, o = t.lib, n = o.WordArray, s = o.Hasher, a = t.algo,
          c = n.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]),
          i = n.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]),
          u = n.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]),
          h = n.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]),
          f = n.create([0, 1518500249, 1859775393, 2400959708, 2840853838]),
          d = n.create([1352829926, 1548603684, 1836072691, 2053994217, 0]), l = a.RIPEMD160 = s.extend({
            _doReset: function() {
              this._hash = n.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
            }, _doProcessBlock: function(r, e) {
              for (var t = 0; t < 16; t++) {
                var o = e + t, n = r[o];
                r[o] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8);
              }
              var s, a, l, H, M, P, R, g, m, x, B, E = this._hash.words, I = f.words, b = d.words, j = c.words,
                k = i.words, q = u.words, z = h.words;
              P = s = E[0], R = a = E[1], g = l = E[2], m = H = E[3], x = M = E[4];
              for (t = 0; t < 80; t += 1) B = s + r[e + j[t]] | 0, B += t < 16 ? _(a, l, H) + I[0] : t < 32 ? p(a, l, H) + I[1] : t < 48 ? v(a, l, H) + I[2] : t < 64 ? w(a, l, H) + I[3] : y(a, l, H) + I[4], B = (B = D(B |= 0, q[t])) + M | 0, s = M, M = H, H = D(l, 10), l = a, a = B, B = P + r[e + k[t]] | 0, B += t < 16 ? y(R, g, m) + b[0] : t < 32 ? w(R, g, m) + b[1] : t < 48 ? v(R, g, m) + b[2] : t < 64 ? p(R, g, m) + b[3] : _(R, g, m) + b[4], B = (B = D(B |= 0, z[t])) + x | 0, P = x, x = m, m = D(g, 10), g = R, R = B;
              B = E[1] + l + m | 0, E[1] = E[2] + H + x | 0, E[2] = E[3] + M + P | 0, E[3] = E[4] + s + R | 0, E[4] = E[0] + a + g | 0, E[0] = B;
            }, _doFinalize: function() {
              var r = this._data, e = r.words, t = 8 * this._nDataBytes, o = 8 * r.sigBytes;
              e[o >>> 5] |= 128 << 24 - o % 32, e[14 + (o + 64 >>> 9 << 4)] = 16711935 & (t << 8 | t >>> 24) | 4278255360 & (t << 24 | t >>> 8), r.sigBytes = 4 * (e.length + 1), this._process();
              for (var n = this._hash, s = n.words, a = 0; a < 5; a++) {
                var c = s[a];
                s[a] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8);
              }
              return n;
            }, clone: function() {
              var r = s.clone.call(this);
              return r._hash = this._hash.clone(), r;
            }
          });

        function _(r, e, t) {
          return r ^ e ^ t;
        }

        function p(r, e, t) {
          return r & e | ~r & t;
        }

        function v(r, e, t) {
          return (r | ~e) ^ t;
        }

        function w(r, e, t) {
          return r & t | e & ~t;
        }

        function y(r, e, t) {
          return r ^ (e | ~t);
        }

        function D(r, e) {
          return r << e | r >>> 32 - e;
        }

        t.RIPEMD160 = s._createHelper(l), t.HmacRIPEMD160 = s._createHmacHelper(l);
      }(Math), r.RIPEMD160;
    });
  }, { "./core": "6KOv" }],
  "v9+5": [function(require, module, exports) {
    var define;
    var e;
    !function(t, i) {
      "object" == typeof exports ? module.exports = exports = i(require("./core")) : "function" == typeof e && e.amd ? e(["./core"], i) : i(t.CryptoJS);
    }(this, function(e) {
      var t, i, s;
      i = (t = e).lib.Base, s = t.enc.Utf8, t.algo.HMAC = i.extend({
        init: function(e, t) {
          e = this._hasher = new e.init, "string" == typeof t && (t = s.parse(t));
          var i = e.blockSize, r = 4 * i;
          t.sigBytes > r && (t = e.finalize(t)), t.clamp();
          for (var n = this._oKey = t.clone(), o = this._iKey = t.clone(), a = n.words, h = o.words, c = 0; c < i; c++) a[c] ^= 1549556828, h[c] ^= 909522486;
          n.sigBytes = o.sigBytes = r, this.reset();
        }, reset: function() {
          var e = this._hasher;
          e.reset(), e.update(this._iKey);
        }, update: function(e) {
          return this._hasher.update(e), this;
        }, finalize: function(e) {
          var t = this._hasher, i = t.finalize(e);
          return t.reset(), t.finalize(this._oKey.clone().concat(i));
        }
      });
    });
  }, { "./core": "6KOv" }],
  "vbzl": [function(require, module, exports) {
    var define;
    var e;
    !function(r, t, o) {
      "object" == typeof exports ? module.exports = exports = t(require("./core"), require("./sha1"), require("./hmac")) : "function" == typeof e && e.amd ? e(["./core", "./sha1", "./hmac"], t) : t(r.CryptoJS);
    }(this, function(e) {
      var r, t, o, i, a, n, c, s;
      return t = (r = e).lib, o = t.Base, i = t.WordArray, a = r.algo, n = a.SHA1, c = a.HMAC, s = a.PBKDF2 = o.extend({
        cfg: o.extend({
          keySize: 4,
          hasher: n,
          iterations: 1
        }), init: function(e) {
          this.cfg = this.cfg.extend(e);
        }, compute: function(e, r) {
          for (var t = this.cfg, o = c.create(t.hasher, e), a = i.create(), n = i.create([1]), s = a.words, f = n.words, u = t.keySize, h = t.iterations; s.length < u;) {
            var d = o.update(r).finalize(n);
            o.reset();
            for (var p = d.words, g = p.length, l = d, y = 1; y < h; y++) {
              l = o.finalize(l), o.reset();
              for (var m = l.words, v = 0; v < g; v++) p[v] ^= m[v];
            }
            a.concat(d), f[0]++;
          }
          return a.sigBytes = 4 * u, a;
        }
      }), r.PBKDF2 = function(e, r, t) {
        return s.create(t).compute(e, r);
      }, e.PBKDF2;
    });
  }, { "./core": "6KOv", "./sha1": "NPgf", "./hmac": "v9+5" }],
  "QD+O": [function(require, module, exports) {
    var define;
    var e;
    !function(t, r, i) {
      "object" == typeof exports ? module.exports = exports = r(require("./core"), require("./sha1"), require("./hmac")) : "function" == typeof e && e.amd ? e(["./core", "./sha1", "./hmac"], r) : r(t.CryptoJS);
    }(this, function(e) {
      var t, r, i, o, a, n, c;
      return r = (t = e).lib, i = r.Base, o = r.WordArray, a = t.algo, n = a.MD5, c = a.EvpKDF = i.extend({
        cfg: i.extend({
          keySize: 4,
          hasher: n,
          iterations: 1
        }), init: function(e) {
          this.cfg = this.cfg.extend(e);
        }, compute: function(e, t) {
          for (var r = this.cfg, i = r.hasher.create(), a = o.create(), n = a.words, c = r.keySize, s = r.iterations; n.length < c;) {
            u && i.update(u);
            var u = i.update(e).finalize(t);
            i.reset();
            for (var f = 1; f < s; f++) u = i.finalize(u), i.reset();
            a.concat(u);
          }
          return a.sigBytes = 4 * c, a;
        }
      }), t.EvpKDF = function(e, t, r) {
        return c.create(r).compute(e, t);
      }, e.EvpKDF;
    });
  }, { "./core": "6KOv", "./sha1": "NPgf", "./hmac": "v9+5" }],
  "hULA": [function(require, module, exports) {
    var define;
    var e;
    !function(t, r, i) {
      "object" == typeof exports ? module.exports = exports = r(require("./core"), require("./evpkdf")) : "function" == typeof e && e.amd ? e(["./core", "./evpkdf"], r) : r(t.CryptoJS);
    }(this, function(e) {
      e.lib.Cipher || function(t) {
        var r = e, i = r.lib, n = i.Base, c = i.WordArray, o = i.BufferedBlockAlgorithm, s = r.enc,
          a = (s.Utf8, s.Base64), f = r.algo.EvpKDF, p = i.Cipher = o.extend({
            cfg: n.extend(), createEncryptor: function(e, t) {
              return this.create(this._ENC_XFORM_MODE, e, t);
            }, createDecryptor: function(e, t) {
              return this.create(this._DEC_XFORM_MODE, e, t);
            }, init: function(e, t, r) {
              this.cfg = this.cfg.extend(r), this._xformMode = e, this._key = t, this.reset();
            }, reset: function() {
              o.reset.call(this), this._doReset();
            }, process: function(e) {
              return this._append(e), this._process();
            }, finalize: function(e) {
              return e && this._append(e), this._doFinalize();
            }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function() {
              function e(e) {
                return "string" == typeof e ? x : v;
              }

              return function(t) {
                return {
                  encrypt: function(r, i, n) {
                    return e(i).encrypt(t, r, i, n);
                  }, decrypt: function(r, i, n) {
                    return e(i).decrypt(t, r, i, n);
                  }
                };
              };
            }()
          }), h = (i.StreamCipher = p.extend({
            _doFinalize: function() {
              return this._process(!0);
            }, blockSize: 1
          }), r.mode = {}), d = i.BlockCipherMode = n.extend({
            createEncryptor: function(e, t) {
              return this.Encryptor.create(e, t);
            }, createDecryptor: function(e, t) {
              return this.Decryptor.create(e, t);
            }, init: function(e, t) {
              this._cipher = e, this._iv = t;
            }
          }), u = h.CBC = function() {
            var e = d.extend();

            function r(e, r, i) {
              var n = this._iv;
              if (n) {
                var c = n;
                this._iv = t;
              } else c = this._prevBlock;
              for (var o = 0; o < i; o++) e[r + o] ^= c[o];
            }

            return e.Encryptor = e.extend({
              processBlock: function(e, t) {
                var i = this._cipher, n = i.blockSize;
                r.call(this, e, t, n), i.encryptBlock(e, t), this._prevBlock = e.slice(t, t + n);
              }
            }), e.Decryptor = e.extend({
              processBlock: function(e, t) {
                var i = this._cipher, n = i.blockSize, c = e.slice(t, t + n);
                i.decryptBlock(e, t), r.call(this, e, t, n), this._prevBlock = c;
              }
            }), e;
          }(), l = (r.pad = {}).Pkcs7 = {
            pad: function(e, t) {
              for (var r = 4 * t, i = r - e.sigBytes % r, n = i << 24 | i << 16 | i << 8 | i, o = [], s = 0; s < i; s += 4) o.push(n);
              var a = c.create(o, i);
              e.concat(a);
            }, unpad: function(e) {
              var t = 255 & e.words[e.sigBytes - 1 >>> 2];
              e.sigBytes -= t;
            }
          }, _ = (i.BlockCipher = p.extend({
            cfg: p.cfg.extend({ mode: u, padding: l }), reset: function() {
              p.reset.call(this);
              var e = this.cfg, t = e.iv, r = e.mode;
              if (this._xformMode == this._ENC_XFORM_MODE) var i = r.createEncryptor; else {
                i = r.createDecryptor;
                this._minBufferSize = 1;
              }
              this._mode && this._mode.__creator == i ? this._mode.init(this, t && t.words) : (this._mode = i.call(r, this, t && t.words), this._mode.__creator = i);
            }, _doProcessBlock: function(e, t) {
              this._mode.processBlock(e, t);
            }, _doFinalize: function() {
              var e = this.cfg.padding;
              if (this._xformMode == this._ENC_XFORM_MODE) {
                e.pad(this._data, this.blockSize);
                var t = this._process(!0);
              } else {
                t = this._process(!0);
                e.unpad(t);
              }
              return t;
            }, blockSize: 4
          }), i.CipherParams = n.extend({
            init: function(e) {
              this.mixIn(e);
            }, toString: function(e) {
              return (e || this.formatter).stringify(this);
            }
          })), y = (r.format = {}).OpenSSL = {
            stringify: function(e) {
              var t = e.ciphertext, r = e.salt;
              if (r) var i = c.create([1398893684, 1701076831]).concat(r).concat(t); else i = t;
              return i.toString(a);
            }, parse: function(e) {
              var t = a.parse(e), r = t.words;
              if (1398893684 == r[0] && 1701076831 == r[1]) {
                var i = c.create(r.slice(2, 4));
                r.splice(0, 4), t.sigBytes -= 16;
              }
              return _.create({ ciphertext: t, salt: i });
            }
          }, v = i.SerializableCipher = n.extend({
            cfg: n.extend({ format: y }), encrypt: function(e, t, r, i) {
              i = this.cfg.extend(i);
              var n = e.createEncryptor(r, i), c = n.finalize(t), o = n.cfg;
              return _.create({
                ciphertext: c,
                key: r,
                iv: o.iv,
                algorithm: e,
                mode: o.mode,
                padding: o.padding,
                blockSize: e.blockSize,
                formatter: i.format
              });
            }, decrypt: function(e, t, r, i) {
              return i = this.cfg.extend(i), t = this._parse(t, i.format), e.createDecryptor(r, i).finalize(t.ciphertext);
            }, _parse: function(e, t) {
              return "string" == typeof e ? t.parse(e, this) : e;
            }
          }), k = (r.kdf = {}).OpenSSL = {
            execute: function(e, t, r, i) {
              i || (i = c.random(8));
              var n = f.create({ keySize: t + r }).compute(e, i), o = c.create(n.words.slice(t), 4 * r);
              return n.sigBytes = 4 * t, _.create({ key: n, iv: o, salt: i });
            }
          }, x = i.PasswordBasedCipher = v.extend({
            cfg: v.cfg.extend({ kdf: k }), encrypt: function(e, t, r, i) {
              var n = (i = this.cfg.extend(i)).kdf.execute(r, e.keySize, e.ivSize);
              i.iv = n.iv;
              var c = v.encrypt.call(this, e, t, n.key, i);
              return c.mixIn(n), c;
            }, decrypt: function(e, t, r, i) {
              i = this.cfg.extend(i), t = this._parse(t, i.format);
              var n = i.kdf.execute(r, e.keySize, e.ivSize, t.salt);
              return i.iv = n.iv, v.decrypt.call(this, e, t, n.key, i);
            }
          });
      }();
    });
  }, { "./core": "6KOv", "./evpkdf": "QD+O" }],
  "xYui": [function(require, module, exports) {
    var define;
    var e;
    !function(r, o, c) {
      "object" == typeof exports ? module.exports = exports = o(require("./core"), require("./cipher-core")) : "function" == typeof e && e.amd ? e(["./core", "./cipher-core"], o) : o(r.CryptoJS);
    }(this, function(e) {
      return e.mode.CFB = function() {
        var r = e.lib.BlockCipherMode.extend();

        function o(e, r, o, c) {
          var i = this._iv;
          if (i) {
            var t = i.slice(0);
            this._iv = void 0;
          } else t = this._prevBlock;
          c.encryptBlock(t, 0);
          for (var n = 0; n < o; n++) e[r + n] ^= t[n];
        }

        return r.Encryptor = r.extend({
          processBlock: function(e, r) {
            var c = this._cipher, i = c.blockSize;
            o.call(this, e, r, i, c), this._prevBlock = e.slice(r, r + i);
          }
        }), r.Decryptor = r.extend({
          processBlock: function(e, r) {
            var c = this._cipher, i = c.blockSize, t = e.slice(r, r + i);
            o.call(this, e, r, i, c), this._prevBlock = t;
          }
        }), r;
      }(), e.mode.CFB;
    });
  }, { "./core": "6KOv", "./cipher-core": "hULA" }],
  "7paN": [function(require, module, exports) {
    var define;
    var e;
    !function(r, o, t) {
      "object" == typeof exports ? module.exports = exports = o(require("./core"), require("./cipher-core")) : "function" == typeof e && e.amd ? e(["./core", "./cipher-core"], o) : o(r.CryptoJS);
    }(this, function(e) {
      var r, o;
      return e.mode.CTR = (r = e.lib.BlockCipherMode.extend(), o = r.Encryptor = r.extend({
        processBlock: function(e, r) {
          var o = this._cipher, t = o.blockSize, c = this._iv, i = this._counter;
          c && (i = this._counter = c.slice(0), this._iv = void 0);
          var n = i.slice(0);
          o.encryptBlock(n, 0), i[t - 1] = i[t - 1] + 1 | 0;
          for (var p = 0; p < t; p++) e[r + p] ^= n[p];
        }
      }), r.Decryptor = o, r), e.mode.CTR;
    });
  }, { "./core": "6KOv", "./cipher-core": "hULA" }],
  "aNp+": [function(require, module, exports) {
    var define;
    var e;
    !function(r, o, t) {
      "object" == typeof exports ? module.exports = exports = o(require("./core"), require("./cipher-core")) : "function" == typeof e && e.amd ? e(["./core", "./cipher-core"], o) : o(r.CryptoJS);
    }(this, function(e) {
      return e.mode.CTRGladman = function() {
        var r = e.lib.BlockCipherMode.extend();

        function o(e) {
          if (255 == (e >> 24 & 255)) {
            var r = e >> 16 & 255, o = e >> 8 & 255, t = 255 & e;
            255 === r ? (r = 0, 255 === o ? (o = 0, 255 === t ? t = 0 : ++t) : ++o) : ++r, e = 0, e += r << 16, e += o << 8, e += t;
          } else e += 1 << 24;
          return e;
        }

        var t = r.Encryptor = r.extend({
          processBlock: function(e, r) {
            var t = this._cipher, c = t.blockSize, i = this._iv, n = this._counter;
            i && (n = this._counter = i.slice(0), this._iv = void 0), function(e) {
              0 === (e[0] = o(e[0])) && (e[1] = o(e[1]));
            }(n);
            var u = n.slice(0);
            t.encryptBlock(u, 0);
            for (var p = 0; p < c; p++) e[r + p] ^= u[p];
          }
        });
        return r.Decryptor = t, r;
      }(), e.mode.CTRGladman;
    });
  }, { "./core": "6KOv", "./cipher-core": "hULA" }],
  "1Sh1": [function(require, module, exports) {
    var define;
    var e;
    !function(r, o, t) {
      "object" == typeof exports ? module.exports = exports = o(require("./core"), require("./cipher-core")) : "function" == typeof e && e.amd ? e(["./core", "./cipher-core"], o) : o(r.CryptoJS);
    }(this, function(e) {
      var r, o;
      return e.mode.OFB = (r = e.lib.BlockCipherMode.extend(), o = r.Encryptor = r.extend({
        processBlock: function(e, r) {
          var o = this._cipher, t = o.blockSize, i = this._iv, c = this._keystream;
          i && (c = this._keystream = i.slice(0), this._iv = void 0), o.encryptBlock(c, 0);
          for (var p = 0; p < t; p++) e[r + p] ^= c[p];
        }
      }), r.Decryptor = o, r), e.mode.OFB;
    });
  }, { "./core": "6KOv", "./cipher-core": "hULA" }],
  "0vke": [function(require, module, exports) {
    var define;
    var e;
    !function(o, r, c) {
      "object" == typeof exports ? module.exports = exports = r(require("./core"), require("./cipher-core")) : "function" == typeof e && e.amd ? e(["./core", "./cipher-core"], r) : r(o.CryptoJS);
    }(this, function(e) {
      var o;
      return e.mode.ECB = ((o = e.lib.BlockCipherMode.extend()).Encryptor = o.extend({
        processBlock: function(e, o) {
          this._cipher.encryptBlock(e, o);
        }
      }), o.Decryptor = o.extend({
        processBlock: function(e, o) {
          this._cipher.decryptBlock(e, o);
        }
      }), o), e.mode.ECB;
    });
  }, { "./core": "6KOv", "./cipher-core": "hULA" }],
  "cvA5": [function(require, module, exports) {
    var define;
    var e;
    !function(r, o, t) {
      "object" == typeof exports ? module.exports = exports = o(require("./core"), require("./cipher-core")) : "function" == typeof e && e.amd ? e(["./core", "./cipher-core"], o) : o(r.CryptoJS);
    }(this, function(e) {
      return e.pad.AnsiX923 = {
        pad: function(e, r) {
          var o = e.sigBytes, t = 4 * r, i = t - o % t, s = o + i - 1;
          e.clamp(), e.words[s >>> 2] |= i << 24 - s % 4 * 8, e.sigBytes += i;
        }, unpad: function(e) {
          var r = 255 & e.words[e.sigBytes - 1 >>> 2];
          e.sigBytes -= r;
        }
      }, e.pad.Ansix923;
    });
  }, { "./core": "6KOv", "./cipher-core": "hULA" }],
  "LjAz": [function(require, module, exports) {
    var define;
    var r;
    !function(o, e, t) {
      "object" == typeof exports ? module.exports = exports = e(require("./core"), require("./cipher-core")) : "function" == typeof r && r.amd ? r(["./core", "./cipher-core"], e) : e(o.CryptoJS);
    }(this, function(r) {
      return r.pad.Iso10126 = {
        pad: function(o, e) {
          var t = 4 * e, c = t - o.sigBytes % t;
          o.concat(r.lib.WordArray.random(c - 1)).concat(r.lib.WordArray.create([c << 24], 1));
        }, unpad: function(r) {
          var o = 255 & r.words[r.sigBytes - 1 >>> 2];
          r.sigBytes -= o;
        }
      }, r.pad.Iso10126;
    });
  }, { "./core": "6KOv", "./cipher-core": "hULA" }],
  "tnw3": [function(require, module, exports) {
    var define;
    var e;
    !function(o, r, t) {
      "object" == typeof exports ? module.exports = exports = r(require("./core"), require("./cipher-core")) : "function" == typeof e && e.amd ? e(["./core", "./cipher-core"], r) : r(o.CryptoJS);
    }(this, function(e) {
      return e.pad.Iso97971 = {
        pad: function(o, r) {
          o.concat(e.lib.WordArray.create([2147483648], 1)), e.pad.ZeroPadding.pad(o, r);
        }, unpad: function(o) {
          e.pad.ZeroPadding.unpad(o), o.sigBytes--;
        }
      }, e.pad.Iso97971;
    });
  }, { "./core": "6KOv", "./cipher-core": "hULA" }],
  "+YNB": [function(require, module, exports) {
    var define;
    var e;
    !function(r, o, t) {
      "object" == typeof exports ? module.exports = exports = o(require("./core"), require("./cipher-core")) : "function" == typeof e && e.amd ? e(["./core", "./cipher-core"], o) : o(r.CryptoJS);
    }(this, function(e) {
      return e.pad.ZeroPadding = {
        pad: function(e, r) {
          var o = 4 * r;
          e.clamp(), e.sigBytes += o - (e.sigBytes % o || o);
        }, unpad: function(e) {
          for (var r = e.words, o = e.sigBytes - 1; !(r[o >>> 2] >>> 24 - o % 4 * 8 & 255);) o--;
          e.sigBytes = o + 1;
        }
      }, e.pad.ZeroPadding;
    });
  }, { "./core": "6KOv", "./cipher-core": "hULA" }],
  "yjzY": [function(require, module, exports) {
    var define;
    var o;
    !function(e, r, n) {
      "object" == typeof exports ? module.exports = exports = r(require("./core"), require("./cipher-core")) : "function" == typeof o && o.amd ? o(["./core", "./cipher-core"], r) : r(e.CryptoJS);
    }(this, function(o) {
      return o.pad.NoPadding = {
        pad: function() {
        }, unpad: function() {
        }
      }, o.pad.NoPadding;
    });
  }, { "./core": "6KOv", "./cipher-core": "hULA" }],
  "myyq": [function(require, module, exports) {
    var define;
    var r;
    !function(e, t, o) {
      "object" == typeof exports ? module.exports = exports = t(require("./core"), require("./cipher-core")) : "function" == typeof r && r.amd ? r(["./core", "./cipher-core"], t) : t(e.CryptoJS);
    }(this, function(r) {
      var e, t, o;
      return t = (e = r).lib.CipherParams, o = e.enc.Hex, e.format.Hex = {
        stringify: function(r) {
          return r.ciphertext.toString(o);
        }, parse: function(r) {
          var e = o.parse(r);
          return t.create({ ciphertext: e });
        }
      }, r.format.Hex;
    });
  }, { "./core": "6KOv", "./cipher-core": "hULA" }],
  "4Xa8": [function(require, module, exports) {
    var define;
    var e;
    !function(r, o, t) {
      "object" == typeof exports ? module.exports = exports = o(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")) : "function" == typeof e && e.amd ? e(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], o) : o(r.CryptoJS);
    }(this, function(e) {
      return function() {
        var r = e, o = r.lib.BlockCipher, t = r.algo, i = [], c = [], n = [], s = [], u = [], f = [], h = [], d = [],
          a = [], y = [];
        !function() {
          for (var e = [], r = 0; r < 256; r++) e[r] = r < 128 ? r << 1 : r << 1 ^ 283;
          var o = 0, t = 0;
          for (r = 0; r < 256; r++) {
            var p = t ^ t << 1 ^ t << 2 ^ t << 3 ^ t << 4;
            p = p >>> 8 ^ 255 & p ^ 99, i[o] = p, c[p] = o;
            var v = e[o], l = e[v], _ = e[l], k = 257 * e[p] ^ 16843008 * p;
            n[o] = k << 24 | k >>> 8, s[o] = k << 16 | k >>> 16, u[o] = k << 8 | k >>> 24, f[o] = k;
            k = 16843009 * _ ^ 65537 * l ^ 257 * v ^ 16843008 * o;
            h[p] = k << 24 | k >>> 8, d[p] = k << 16 | k >>> 16, a[p] = k << 8 | k >>> 24, y[p] = k, o ? (o = v ^ e[e[e[_ ^ v]]], t ^= e[e[t]]) : o = t = 1;
          }
        }();
        var p = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], v = t.AES = o.extend({
          _doReset: function() {
            if (!this._nRounds || this._keyPriorReset !== this._key) {
              for (var e = this._keyPriorReset = this._key, r = e.words, o = e.sigBytes / 4, t = 4 * ((this._nRounds = o + 6) + 1), c = this._keySchedule = [], n = 0; n < t; n++) if (n < o) c[n] = r[n]; else {
                var s = c[n - 1];
                n % o ? o > 6 && n % o == 4 && (s = i[s >>> 24] << 24 | i[s >>> 16 & 255] << 16 | i[s >>> 8 & 255] << 8 | i[255 & s]) : (s = i[(s = s << 8 | s >>> 24) >>> 24] << 24 | i[s >>> 16 & 255] << 16 | i[s >>> 8 & 255] << 8 | i[255 & s], s ^= p[n / o | 0] << 24), c[n] = c[n - o] ^ s;
              }
              for (var u = this._invKeySchedule = [], f = 0; f < t; f++) {
                n = t - f;
                if (f % 4) s = c[n]; else s = c[n - 4];
                u[f] = f < 4 || n <= 4 ? s : h[i[s >>> 24]] ^ d[i[s >>> 16 & 255]] ^ a[i[s >>> 8 & 255]] ^ y[i[255 & s]];
              }
            }
          }, encryptBlock: function(e, r) {
            this._doCryptBlock(e, r, this._keySchedule, n, s, u, f, i);
          }, decryptBlock: function(e, r) {
            var o = e[r + 1];
            e[r + 1] = e[r + 3], e[r + 3] = o, this._doCryptBlock(e, r, this._invKeySchedule, h, d, a, y, c);
            o = e[r + 1];
            e[r + 1] = e[r + 3], e[r + 3] = o;
          }, _doCryptBlock: function(e, r, o, t, i, c, n, s) {
            for (var u = this._nRounds, f = e[r] ^ o[0], h = e[r + 1] ^ o[1], d = e[r + 2] ^ o[2], a = e[r + 3] ^ o[3], y = 4, p = 1; p < u; p++) {
              var v = t[f >>> 24] ^ i[h >>> 16 & 255] ^ c[d >>> 8 & 255] ^ n[255 & a] ^ o[y++],
                l = t[h >>> 24] ^ i[d >>> 16 & 255] ^ c[a >>> 8 & 255] ^ n[255 & f] ^ o[y++],
                _ = t[d >>> 24] ^ i[a >>> 16 & 255] ^ c[f >>> 8 & 255] ^ n[255 & h] ^ o[y++],
                k = t[a >>> 24] ^ i[f >>> 16 & 255] ^ c[h >>> 8 & 255] ^ n[255 & d] ^ o[y++];
              f = v, h = l, d = _, a = k;
            }
            v = (s[f >>> 24] << 24 | s[h >>> 16 & 255] << 16 | s[d >>> 8 & 255] << 8 | s[255 & a]) ^ o[y++], l = (s[h >>> 24] << 24 | s[d >>> 16 & 255] << 16 | s[a >>> 8 & 255] << 8 | s[255 & f]) ^ o[y++], _ = (s[d >>> 24] << 24 | s[a >>> 16 & 255] << 16 | s[f >>> 8 & 255] << 8 | s[255 & h]) ^ o[y++], k = (s[a >>> 24] << 24 | s[f >>> 16 & 255] << 16 | s[h >>> 8 & 255] << 8 | s[255 & d]) ^ o[y++];
            e[r] = v, e[r + 1] = l, e[r + 2] = _, e[r + 3] = k;
          }, keySize: 8
        });
        r.AES = o._createHelper(v);
      }(), e.AES;
    });
  }, { "./core": "6KOv", "./enc-base64": "5fV5", "./md5": "Pylf", "./evpkdf": "QD+O", "./cipher-core": "hULA" }],
  "Evye": [function(require, module, exports) {
    var define;
    var e;
    !function(t, c, r) {
      "object" == typeof exports ? module.exports = exports = c(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")) : "function" == typeof e && e.amd ? e(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], c) : c(t.CryptoJS);
    }(this, function(e) {
      return function() {
        var t = e, c = t.lib, r = c.WordArray, i = c.BlockCipher, o = t.algo,
          l = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4],
          s = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32],
          h = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28], k = [{
            0: 8421888,
            268435456: 32768,
            536870912: 8421378,
            805306368: 2,
            1073741824: 512,
            1342177280: 8421890,
            1610612736: 8389122,
            1879048192: 8388608,
            2147483648: 514,
            2415919104: 8389120,
            2684354560: 33280,
            2952790016: 8421376,
            3221225472: 32770,
            3489660928: 8388610,
            3758096384: 0,
            4026531840: 33282,
            134217728: 0,
            402653184: 8421890,
            671088640: 33282,
            939524096: 32768,
            1207959552: 8421888,
            1476395008: 512,
            1744830464: 8421378,
            2013265920: 2,
            2281701376: 8389120,
            2550136832: 33280,
            2818572288: 8421376,
            3087007744: 8389122,
            3355443200: 8388610,
            3623878656: 32770,
            3892314112: 514,
            4160749568: 8388608,
            1: 32768,
            268435457: 2,
            536870913: 8421888,
            805306369: 8388608,
            1073741825: 8421378,
            1342177281: 33280,
            1610612737: 512,
            1879048193: 8389122,
            2147483649: 8421890,
            2415919105: 8421376,
            2684354561: 8388610,
            2952790017: 33282,
            3221225473: 514,
            3489660929: 8389120,
            3758096385: 32770,
            4026531841: 0,
            134217729: 8421890,
            402653185: 8421376,
            671088641: 8388608,
            939524097: 512,
            1207959553: 32768,
            1476395009: 8388610,
            1744830465: 2,
            2013265921: 33282,
            2281701377: 32770,
            2550136833: 8389122,
            2818572289: 514,
            3087007745: 8421888,
            3355443201: 8389120,
            3623878657: 0,
            3892314113: 33280,
            4160749569: 8421378
          }, {
            0: 1074282512,
            16777216: 16384,
            33554432: 524288,
            50331648: 1074266128,
            67108864: 1073741840,
            83886080: 1074282496,
            100663296: 1073758208,
            117440512: 16,
            134217728: 540672,
            150994944: 1073758224,
            167772160: 1073741824,
            184549376: 540688,
            201326592: 524304,
            218103808: 0,
            234881024: 16400,
            251658240: 1074266112,
            8388608: 1073758208,
            25165824: 540688,
            41943040: 16,
            58720256: 1073758224,
            75497472: 1074282512,
            92274688: 1073741824,
            109051904: 524288,
            125829120: 1074266128,
            142606336: 524304,
            159383552: 0,
            176160768: 16384,
            192937984: 1074266112,
            209715200: 1073741840,
            226492416: 540672,
            243269632: 1074282496,
            260046848: 16400,
            268435456: 0,
            285212672: 1074266128,
            301989888: 1073758224,
            318767104: 1074282496,
            335544320: 1074266112,
            352321536: 16,
            369098752: 540688,
            385875968: 16384,
            402653184: 16400,
            419430400: 524288,
            436207616: 524304,
            452984832: 1073741840,
            469762048: 540672,
            486539264: 1073758208,
            503316480: 1073741824,
            520093696: 1074282512,
            276824064: 540688,
            293601280: 524288,
            310378496: 1074266112,
            327155712: 16384,
            343932928: 1073758208,
            360710144: 1074282512,
            377487360: 16,
            394264576: 1073741824,
            411041792: 1074282496,
            427819008: 1073741840,
            444596224: 1073758224,
            461373440: 524304,
            478150656: 0,
            494927872: 16400,
            511705088: 1074266128,
            528482304: 540672
          }, {
            0: 260,
            1048576: 0,
            2097152: 67109120,
            3145728: 65796,
            4194304: 65540,
            5242880: 67108868,
            6291456: 67174660,
            7340032: 67174400,
            8388608: 67108864,
            9437184: 67174656,
            10485760: 65792,
            11534336: 67174404,
            12582912: 67109124,
            13631488: 65536,
            14680064: 4,
            15728640: 256,
            524288: 67174656,
            1572864: 67174404,
            2621440: 0,
            3670016: 67109120,
            4718592: 67108868,
            5767168: 65536,
            6815744: 65540,
            7864320: 260,
            8912896: 4,
            9961472: 256,
            11010048: 67174400,
            12058624: 65796,
            13107200: 65792,
            14155776: 67109124,
            15204352: 67174660,
            16252928: 67108864,
            16777216: 67174656,
            17825792: 65540,
            18874368: 65536,
            19922944: 67109120,
            20971520: 256,
            22020096: 67174660,
            23068672: 67108868,
            24117248: 0,
            25165824: 67109124,
            26214400: 67108864,
            27262976: 4,
            28311552: 65792,
            29360128: 67174400,
            30408704: 260,
            31457280: 65796,
            32505856: 67174404,
            17301504: 67108864,
            18350080: 260,
            19398656: 67174656,
            20447232: 0,
            21495808: 65540,
            22544384: 67109120,
            23592960: 256,
            24641536: 67174404,
            25690112: 65536,
            26738688: 67174660,
            27787264: 65796,
            28835840: 67108868,
            29884416: 67109124,
            30932992: 67174400,
            31981568: 4,
            33030144: 65792
          }, {
            0: 2151682048,
            65536: 2147487808,
            131072: 4198464,
            196608: 2151677952,
            262144: 0,
            327680: 4198400,
            393216: 2147483712,
            458752: 4194368,
            524288: 2147483648,
            589824: 4194304,
            655360: 64,
            720896: 2147487744,
            786432: 2151678016,
            851968: 4160,
            917504: 4096,
            983040: 2151682112,
            32768: 2147487808,
            98304: 64,
            163840: 2151678016,
            229376: 2147487744,
            294912: 4198400,
            360448: 2151682112,
            425984: 0,
            491520: 2151677952,
            557056: 4096,
            622592: 2151682048,
            688128: 4194304,
            753664: 4160,
            819200: 2147483648,
            884736: 4194368,
            950272: 4198464,
            1015808: 2147483712,
            1048576: 4194368,
            1114112: 4198400,
            1179648: 2147483712,
            1245184: 0,
            1310720: 4160,
            1376256: 2151678016,
            1441792: 2151682048,
            1507328: 2147487808,
            1572864: 2151682112,
            1638400: 2147483648,
            1703936: 2151677952,
            1769472: 4198464,
            1835008: 2147487744,
            1900544: 4194304,
            1966080: 64,
            2031616: 4096,
            1081344: 2151677952,
            1146880: 2151682112,
            1212416: 0,
            1277952: 4198400,
            1343488: 4194368,
            1409024: 2147483648,
            1474560: 2147487808,
            1540096: 64,
            1605632: 2147483712,
            1671168: 4096,
            1736704: 2147487744,
            1802240: 2151678016,
            1867776: 4160,
            1933312: 2151682048,
            1998848: 4194304,
            2064384: 4198464
          }, {
            0: 128,
            4096: 17039360,
            8192: 262144,
            12288: 536870912,
            16384: 537133184,
            20480: 16777344,
            24576: 553648256,
            28672: 262272,
            32768: 16777216,
            36864: 537133056,
            40960: 536871040,
            45056: 553910400,
            49152: 553910272,
            53248: 0,
            57344: 17039488,
            61440: 553648128,
            2048: 17039488,
            6144: 553648256,
            10240: 128,
            14336: 17039360,
            18432: 262144,
            22528: 537133184,
            26624: 553910272,
            30720: 536870912,
            34816: 537133056,
            38912: 0,
            43008: 553910400,
            47104: 16777344,
            51200: 536871040,
            55296: 553648128,
            59392: 16777216,
            63488: 262272,
            65536: 262144,
            69632: 128,
            73728: 536870912,
            77824: 553648256,
            81920: 16777344,
            86016: 553910272,
            90112: 537133184,
            94208: 16777216,
            98304: 553910400,
            102400: 553648128,
            106496: 17039360,
            110592: 537133056,
            114688: 262272,
            118784: 536871040,
            122880: 0,
            126976: 17039488,
            67584: 553648256,
            71680: 16777216,
            75776: 17039360,
            79872: 537133184,
            83968: 536870912,
            88064: 17039488,
            92160: 128,
            96256: 553910272,
            100352: 262272,
            104448: 553910400,
            108544: 0,
            112640: 553648128,
            116736: 16777344,
            120832: 262144,
            124928: 537133056,
            129024: 536871040
          }, {
            0: 268435464,
            256: 8192,
            512: 270532608,
            768: 270540808,
            1024: 268443648,
            1280: 2097152,
            1536: 2097160,
            1792: 268435456,
            2048: 0,
            2304: 268443656,
            2560: 2105344,
            2816: 8,
            3072: 270532616,
            3328: 2105352,
            3584: 8200,
            3840: 270540800,
            128: 270532608,
            384: 270540808,
            640: 8,
            896: 2097152,
            1152: 2105352,
            1408: 268435464,
            1664: 268443648,
            1920: 8200,
            2176: 2097160,
            2432: 8192,
            2688: 268443656,
            2944: 270532616,
            3200: 0,
            3456: 270540800,
            3712: 2105344,
            3968: 268435456,
            4096: 268443648,
            4352: 270532616,
            4608: 270540808,
            4864: 8200,
            5120: 2097152,
            5376: 268435456,
            5632: 268435464,
            5888: 2105344,
            6144: 2105352,
            6400: 0,
            6656: 8,
            6912: 270532608,
            7168: 8192,
            7424: 268443656,
            7680: 270540800,
            7936: 2097160,
            4224: 8,
            4480: 2105344,
            4736: 2097152,
            4992: 268435464,
            5248: 268443648,
            5504: 8200,
            5760: 270540808,
            6016: 270532608,
            6272: 270540800,
            6528: 270532616,
            6784: 8192,
            7040: 2105352,
            7296: 2097160,
            7552: 0,
            7808: 268435456,
            8064: 268443656
          }, {
            0: 1048576,
            16: 33555457,
            32: 1024,
            48: 1049601,
            64: 34604033,
            80: 0,
            96: 1,
            112: 34603009,
            128: 33555456,
            144: 1048577,
            160: 33554433,
            176: 34604032,
            192: 34603008,
            208: 1025,
            224: 1049600,
            240: 33554432,
            8: 34603009,
            24: 0,
            40: 33555457,
            56: 34604032,
            72: 1048576,
            88: 33554433,
            104: 33554432,
            120: 1025,
            136: 1049601,
            152: 33555456,
            168: 34603008,
            184: 1048577,
            200: 1024,
            216: 34604033,
            232: 1,
            248: 1049600,
            256: 33554432,
            272: 1048576,
            288: 33555457,
            304: 34603009,
            320: 1048577,
            336: 33555456,
            352: 34604032,
            368: 1049601,
            384: 1025,
            400: 34604033,
            416: 1049600,
            432: 1,
            448: 0,
            464: 34603008,
            480: 33554433,
            496: 1024,
            264: 1049600,
            280: 33555457,
            296: 34603009,
            312: 1,
            328: 33554432,
            344: 1048576,
            360: 1025,
            376: 34604032,
            392: 33554433,
            408: 34603008,
            424: 0,
            440: 34604033,
            456: 1049601,
            472: 1024,
            488: 33555456,
            504: 1048577
          }, {
            0: 134219808,
            1: 131072,
            2: 134217728,
            3: 32,
            4: 131104,
            5: 134350880,
            6: 134350848,
            7: 2048,
            8: 134348800,
            9: 134219776,
            10: 133120,
            11: 134348832,
            12: 2080,
            13: 0,
            14: 134217760,
            15: 133152,
            2147483648: 2048,
            2147483649: 134350880,
            2147483650: 134219808,
            2147483651: 134217728,
            2147483652: 134348800,
            2147483653: 133120,
            2147483654: 133152,
            2147483655: 32,
            2147483656: 134217760,
            2147483657: 2080,
            2147483658: 131104,
            2147483659: 134350848,
            2147483660: 0,
            2147483661: 134348832,
            2147483662: 134219776,
            2147483663: 131072,
            16: 133152,
            17: 134350848,
            18: 32,
            19: 2048,
            20: 134219776,
            21: 134217760,
            22: 134348832,
            23: 131072,
            24: 0,
            25: 131104,
            26: 134348800,
            27: 134219808,
            28: 134350880,
            29: 133120,
            30: 2080,
            31: 134217728,
            2147483664: 131072,
            2147483665: 2048,
            2147483666: 134348832,
            2147483667: 133152,
            2147483668: 32,
            2147483669: 134348800,
            2147483670: 134217728,
            2147483671: 134219808,
            2147483672: 134350880,
            2147483673: 134217760,
            2147483674: 134219776,
            2147483675: 0,
            2147483676: 133120,
            2147483677: 2080,
            2147483678: 131104,
            2147483679: 134350848
          }], _ = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679], n = o.DES = i.extend({
            _doReset: function() {
              for (var e = this._key.words, t = [], c = 0; c < 56; c++) {
                var r = l[c] - 1;
                t[c] = e[r >>> 5] >>> 31 - r % 32 & 1;
              }
              for (var i = this._subKeys = [], o = 0; o < 16; o++) {
                var k = i[o] = [], _ = h[o];
                for (c = 0; c < 24; c++) k[c / 6 | 0] |= t[(s[c] - 1 + _) % 28] << 31 - c % 6, k[4 + (c / 6 | 0)] |= t[28 + (s[c + 24] - 1 + _) % 28] << 31 - c % 6;
                k[0] = k[0] << 1 | k[0] >>> 31;
                for (c = 1; c < 7; c++) k[c] = k[c] >>> 4 * (c - 1) + 3;
                k[7] = k[7] << 5 | k[7] >>> 27;
              }
              var n = this._invSubKeys = [];
              for (c = 0; c < 16; c++) n[c] = i[15 - c];
            }, encryptBlock: function(e, t) {
              this._doCryptBlock(e, t, this._subKeys);
            }, decryptBlock: function(e, t) {
              this._doCryptBlock(e, t, this._invSubKeys);
            }, _doCryptBlock: function(e, t, c) {
              this._lBlock = e[t], this._rBlock = e[t + 1], a.call(this, 4, 252645135), a.call(this, 16, 65535), B.call(this, 2, 858993459), B.call(this, 8, 16711935), a.call(this, 1, 1431655765);
              for (var r = 0; r < 16; r++) {
                for (var i = c[r], o = this._lBlock, l = this._rBlock, s = 0, h = 0; h < 8; h++) s |= k[h][((l ^ i[h]) & _[h]) >>> 0];
                this._lBlock = l, this._rBlock = o ^ s;
              }
              var n = this._lBlock;
              this._lBlock = this._rBlock, this._rBlock = n, a.call(this, 1, 1431655765), B.call(this, 8, 16711935), B.call(this, 2, 858993459), a.call(this, 16, 65535), a.call(this, 4, 252645135), e[t] = this._lBlock, e[t + 1] = this._rBlock;
            }, keySize: 2, ivSize: 2, blockSize: 2
          });

        function a(e, t) {
          var c = (this._lBlock >>> e ^ this._rBlock) & t;
          this._rBlock ^= c, this._lBlock ^= c << e;
        }

        function B(e, t) {
          var c = (this._rBlock >>> e ^ this._lBlock) & t;
          this._lBlock ^= c, this._rBlock ^= c << e;
        }

        t.DES = i._createHelper(n);
        var p = o.TripleDES = i.extend({
          _doReset: function() {
            var e = this._key.words;
            this._des1 = n.createEncryptor(r.create(e.slice(0, 2))), this._des2 = n.createEncryptor(r.create(e.slice(2, 4))), this._des3 = n.createEncryptor(r.create(e.slice(4, 6)));
          }, encryptBlock: function(e, t) {
            this._des1.encryptBlock(e, t), this._des2.decryptBlock(e, t), this._des3.encryptBlock(e, t);
          }, decryptBlock: function(e, t) {
            this._des3.decryptBlock(e, t), this._des2.encryptBlock(e, t), this._des1.decryptBlock(e, t);
          }, keySize: 6, ivSize: 2, blockSize: 2
        });
        t.TripleDES = i._createHelper(p);
      }(), e.TripleDES;
    });
  }, { "./core": "6KOv", "./enc-base64": "5fV5", "./md5": "Pylf", "./evpkdf": "QD+O", "./cipher-core": "hULA" }],
  "pw6V": [function(require, module, exports) {
    var define;
    var e;
    !function(r, t, i) {
      "object" == typeof exports ? module.exports = exports = t(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")) : "function" == typeof e && e.amd ? e(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], t) : t(r.CryptoJS);
    }(this, function(e) {
      return function() {
        var r = e, t = r.lib.StreamCipher, i = r.algo, o = i.RC4 = t.extend({
          _doReset: function() {
            for (var e = this._key, r = e.words, t = e.sigBytes, i = this._S = [], o = 0; o < 256; o++) i[o] = o;
            o = 0;
            for (var c = 0; o < 256; o++) {
              var s = o % t, n = r[s >>> 2] >>> 24 - s % 4 * 8 & 255;
              c = (c + i[o] + n) % 256;
              var a = i[o];
              i[o] = i[c], i[c] = a;
            }
            this._i = this._j = 0;
          }, _doProcessBlock: function(e, r) {
            e[r] ^= c.call(this);
          }, keySize: 8, ivSize: 0
        });

        function c() {
          for (var e = this._S, r = this._i, t = this._j, i = 0, o = 0; o < 4; o++) {
            t = (t + e[r = (r + 1) % 256]) % 256;
            var c = e[r];
            e[r] = e[t], e[t] = c, i |= e[(e[r] + e[t]) % 256] << 24 - 8 * o;
          }
          return this._i = r, this._j = t, i;
        }

        r.RC4 = t._createHelper(o);
        var s = i.RC4Drop = o.extend({
          cfg: o.cfg.extend({ drop: 192 }), _doReset: function() {
            o._doReset.call(this);
            for (var e = this.cfg.drop; e > 0; e--) c.call(this);
          }
        });
        r.RC4Drop = t._createHelper(s);
      }(), e.RC4;
    });
  }, { "./core": "6KOv", "./enc-base64": "5fV5", "./md5": "Pylf", "./evpkdf": "QD+O", "./cipher-core": "hULA" }],
  "4JEs": [function(require, module, exports) {
    var define;
    var r;
    !function(e, i, t) {
      "object" == typeof exports ? module.exports = exports = i(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")) : "function" == typeof r && r.amd ? r(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], i) : i(e.CryptoJS);
    }(this, function(r) {
      return function() {
        var e = r, i = e.lib.StreamCipher, t = e.algo, o = [], c = [], s = [], a = t.Rabbit = i.extend({
          _doReset: function() {
            for (var r = this._key.words, e = this.cfg.iv, i = 0; i < 4; i++) r[i] = 16711935 & (r[i] << 8 | r[i] >>> 24) | 4278255360 & (r[i] << 24 | r[i] >>> 8);
            var t = this._X = [r[0], r[3] << 16 | r[2] >>> 16, r[1], r[0] << 16 | r[3] >>> 16, r[2], r[1] << 16 | r[0] >>> 16, r[3], r[2] << 16 | r[1] >>> 16],
              o = this._C = [r[2] << 16 | r[2] >>> 16, 4294901760 & r[0] | 65535 & r[1], r[3] << 16 | r[3] >>> 16, 4294901760 & r[1] | 65535 & r[2], r[0] << 16 | r[0] >>> 16, 4294901760 & r[2] | 65535 & r[3], r[1] << 16 | r[1] >>> 16, 4294901760 & r[3] | 65535 & r[0]];
            this._b = 0;
            for (i = 0; i < 4; i++) f.call(this);
            for (i = 0; i < 8; i++) o[i] ^= t[i + 4 & 7];
            if (e) {
              var c = e.words, s = c[0], a = c[1],
                n = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8),
                h = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8), b = n >>> 16 | 4294901760 & h,
                u = h << 16 | 65535 & n;
              o[0] ^= n, o[1] ^= b, o[2] ^= h, o[3] ^= u, o[4] ^= n, o[5] ^= b, o[6] ^= h, o[7] ^= u;
              for (i = 0; i < 4; i++) f.call(this);
            }
          }, _doProcessBlock: function(r, e) {
            var i = this._X;
            f.call(this), o[0] = i[0] ^ i[5] >>> 16 ^ i[3] << 16, o[1] = i[2] ^ i[7] >>> 16 ^ i[5] << 16, o[2] = i[4] ^ i[1] >>> 16 ^ i[7] << 16, o[3] = i[6] ^ i[3] >>> 16 ^ i[1] << 16;
            for (var t = 0; t < 4; t++) o[t] = 16711935 & (o[t] << 8 | o[t] >>> 24) | 4278255360 & (o[t] << 24 | o[t] >>> 8), r[e + t] ^= o[t];
          }, blockSize: 4, ivSize: 2
        });

        function f() {
          for (var r = this._X, e = this._C, i = 0; i < 8; i++) c[i] = e[i];
          e[0] = e[0] + 1295307597 + this._b | 0, e[1] = e[1] + 3545052371 + (e[0] >>> 0 < c[0] >>> 0 ? 1 : 0) | 0, e[2] = e[2] + 886263092 + (e[1] >>> 0 < c[1] >>> 0 ? 1 : 0) | 0, e[3] = e[3] + 1295307597 + (e[2] >>> 0 < c[2] >>> 0 ? 1 : 0) | 0, e[4] = e[4] + 3545052371 + (e[3] >>> 0 < c[3] >>> 0 ? 1 : 0) | 0, e[5] = e[5] + 886263092 + (e[4] >>> 0 < c[4] >>> 0 ? 1 : 0) | 0, e[6] = e[6] + 1295307597 + (e[5] >>> 0 < c[5] >>> 0 ? 1 : 0) | 0, e[7] = e[7] + 3545052371 + (e[6] >>> 0 < c[6] >>> 0 ? 1 : 0) | 0, this._b = e[7] >>> 0 < c[7] >>> 0 ? 1 : 0;
          for (i = 0; i < 8; i++) {
            var t = r[i] + e[i], o = 65535 & t, a = t >>> 16, f = ((o * o >>> 17) + o * a >>> 15) + a * a,
              n = ((4294901760 & t) * t | 0) + ((65535 & t) * t | 0);
            s[i] = f ^ n;
          }
          r[0] = s[0] + (s[7] << 16 | s[7] >>> 16) + (s[6] << 16 | s[6] >>> 16) | 0, r[1] = s[1] + (s[0] << 8 | s[0] >>> 24) + s[7] | 0, r[2] = s[2] + (s[1] << 16 | s[1] >>> 16) + (s[0] << 16 | s[0] >>> 16) | 0, r[3] = s[3] + (s[2] << 8 | s[2] >>> 24) + s[1] | 0, r[4] = s[4] + (s[3] << 16 | s[3] >>> 16) + (s[2] << 16 | s[2] >>> 16) | 0, r[5] = s[5] + (s[4] << 8 | s[4] >>> 24) + s[3] | 0, r[6] = s[6] + (s[5] << 16 | s[5] >>> 16) + (s[4] << 16 | s[4] >>> 16) | 0, r[7] = s[7] + (s[6] << 8 | s[6] >>> 24) + s[5] | 0;
        }

        e.Rabbit = i._createHelper(a);
      }(), r.Rabbit;
    });
  }, { "./core": "6KOv", "./enc-base64": "5fV5", "./md5": "Pylf", "./evpkdf": "QD+O", "./cipher-core": "hULA" }],
  "YcQg": [function(require, module, exports) {
    var define;
    var e;
    !function(r, i, t) {
      "object" == typeof exports ? module.exports = exports = i(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")) : "function" == typeof e && e.amd ? e(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], i) : i(r.CryptoJS);
    }(this, function(e) {
      return function() {
        var r = e, i = r.lib.StreamCipher, t = r.algo, o = [], c = [], a = [], s = t.RabbitLegacy = i.extend({
          _doReset: function() {
            var e = this._key.words, r = this.cfg.iv,
              i = this._X = [e[0], e[3] << 16 | e[2] >>> 16, e[1], e[0] << 16 | e[3] >>> 16, e[2], e[1] << 16 | e[0] >>> 16, e[3], e[2] << 16 | e[1] >>> 16],
              t = this._C = [e[2] << 16 | e[2] >>> 16, 4294901760 & e[0] | 65535 & e[1], e[3] << 16 | e[3] >>> 16, 4294901760 & e[1] | 65535 & e[2], e[0] << 16 | e[0] >>> 16, 4294901760 & e[2] | 65535 & e[3], e[1] << 16 | e[1] >>> 16, 4294901760 & e[3] | 65535 & e[0]];
            this._b = 0;
            for (var o = 0; o < 4; o++) f.call(this);
            for (o = 0; o < 8; o++) t[o] ^= i[o + 4 & 7];
            if (r) {
              var c = r.words, a = c[0], s = c[1],
                n = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8),
                h = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), b = n >>> 16 | 4294901760 & h,
                u = h << 16 | 65535 & n;
              t[0] ^= n, t[1] ^= b, t[2] ^= h, t[3] ^= u, t[4] ^= n, t[5] ^= b, t[6] ^= h, t[7] ^= u;
              for (o = 0; o < 4; o++) f.call(this);
            }
          }, _doProcessBlock: function(e, r) {
            var i = this._X;
            f.call(this), o[0] = i[0] ^ i[5] >>> 16 ^ i[3] << 16, o[1] = i[2] ^ i[7] >>> 16 ^ i[5] << 16, o[2] = i[4] ^ i[1] >>> 16 ^ i[7] << 16, o[3] = i[6] ^ i[3] >>> 16 ^ i[1] << 16;
            for (var t = 0; t < 4; t++) o[t] = 16711935 & (o[t] << 8 | o[t] >>> 24) | 4278255360 & (o[t] << 24 | o[t] >>> 8), e[r + t] ^= o[t];
          }, blockSize: 4, ivSize: 2
        });

        function f() {
          for (var e = this._X, r = this._C, i = 0; i < 8; i++) c[i] = r[i];
          r[0] = r[0] + 1295307597 + this._b | 0, r[1] = r[1] + 3545052371 + (r[0] >>> 0 < c[0] >>> 0 ? 1 : 0) | 0, r[2] = r[2] + 886263092 + (r[1] >>> 0 < c[1] >>> 0 ? 1 : 0) | 0, r[3] = r[3] + 1295307597 + (r[2] >>> 0 < c[2] >>> 0 ? 1 : 0) | 0, r[4] = r[4] + 3545052371 + (r[3] >>> 0 < c[3] >>> 0 ? 1 : 0) | 0, r[5] = r[5] + 886263092 + (r[4] >>> 0 < c[4] >>> 0 ? 1 : 0) | 0, r[6] = r[6] + 1295307597 + (r[5] >>> 0 < c[5] >>> 0 ? 1 : 0) | 0, r[7] = r[7] + 3545052371 + (r[6] >>> 0 < c[6] >>> 0 ? 1 : 0) | 0, this._b = r[7] >>> 0 < c[7] >>> 0 ? 1 : 0;
          for (i = 0; i < 8; i++) {
            var t = e[i] + r[i], o = 65535 & t, s = t >>> 16, f = ((o * o >>> 17) + o * s >>> 15) + s * s,
              n = ((4294901760 & t) * t | 0) + ((65535 & t) * t | 0);
            a[i] = f ^ n;
          }
          e[0] = a[0] + (a[7] << 16 | a[7] >>> 16) + (a[6] << 16 | a[6] >>> 16) | 0, e[1] = a[1] + (a[0] << 8 | a[0] >>> 24) + a[7] | 0, e[2] = a[2] + (a[1] << 16 | a[1] >>> 16) + (a[0] << 16 | a[0] >>> 16) | 0, e[3] = a[3] + (a[2] << 8 | a[2] >>> 24) + a[1] | 0, e[4] = a[4] + (a[3] << 16 | a[3] >>> 16) + (a[2] << 16 | a[2] >>> 16) | 0, e[5] = a[5] + (a[4] << 8 | a[4] >>> 24) + a[3] | 0, e[6] = a[6] + (a[5] << 16 | a[5] >>> 16) + (a[4] << 16 | a[4] >>> 16) | 0, e[7] = a[7] + (a[6] << 8 | a[6] >>> 24) + a[5] | 0;
        }

        r.RabbitLegacy = i._createHelper(s);
      }(), e.RabbitLegacy;
    });
  }, { "./core": "6KOv", "./enc-base64": "5fV5", "./md5": "Pylf", "./evpkdf": "QD+O", "./cipher-core": "hULA" }],
  "BXaB": [function(require, module, exports) {
    var define;
    var e;
    !function(r, i, a) {
      "object" == typeof exports ? module.exports = exports = i(require("./core"), require("./x64-core"), require("./lib-typedarrays"), require("./enc-utf16"), require("./enc-base64"), require("./md5"), require("./sha1"), require("./sha256"), require("./sha224"), require("./sha512"), require("./sha384"), require("./sha3"), require("./ripemd160"), require("./hmac"), require("./pbkdf2"), require("./evpkdf"), require("./cipher-core"), require("./mode-cfb"), require("./mode-ctr"), require("./mode-ctr-gladman"), require("./mode-ofb"), require("./mode-ecb"), require("./pad-ansix923"), require("./pad-iso10126"), require("./pad-iso97971"), require("./pad-zeropadding"), require("./pad-nopadding"), require("./format-hex"), require("./aes"), require("./tripledes"), require("./rc4"), require("./rabbit"), require("./rabbit-legacy")) : "function" == typeof e && e.amd ? e(["./core", "./x64-core", "./lib-typedarrays", "./enc-utf16", "./enc-base64", "./md5", "./sha1", "./sha256", "./sha224", "./sha512", "./sha384", "./sha3", "./ripemd160", "./hmac", "./pbkdf2", "./evpkdf", "./cipher-core", "./mode-cfb", "./mode-ctr", "./mode-ctr-gladman", "./mode-ofb", "./mode-ecb", "./pad-ansix923", "./pad-iso10126", "./pad-iso97971", "./pad-zeropadding", "./pad-nopadding", "./format-hex", "./aes", "./tripledes", "./rc4", "./rabbit", "./rabbit-legacy"], i) : r.CryptoJS = i(r.CryptoJS);
    }(this, function(e) {
      return e;
    });
  }, {
    "./core": "6KOv",
    "./x64-core": "aSfD",
    "./lib-typedarrays": "xeeP",
    "./enc-utf16": "hJKL",
    "./enc-base64": "5fV5",
    "./md5": "Pylf",
    "./sha1": "NPgf",
    "./sha256": "A0uM",
    "./sha224": "vneu",
    "./sha512": "fOEq",
    "./sha384": "CcfJ",
    "./sha3": "zroK",
    "./ripemd160": "eQEa",
    "./hmac": "v9+5",
    "./pbkdf2": "vbzl",
    "./evpkdf": "QD+O",
    "./cipher-core": "hULA",
    "./mode-cfb": "xYui",
    "./mode-ctr": "7paN",
    "./mode-ctr-gladman": "aNp+",
    "./mode-ofb": "1Sh1",
    "./mode-ecb": "0vke",
    "./pad-ansix923": "cvA5",
    "./pad-iso10126": "LjAz",
    "./pad-iso97971": "tnw3",
    "./pad-zeropadding": "+YNB",
    "./pad-nopadding": "yjzY",
    "./format-hex": "myyq",
    "./aes": "4Xa8",
    "./tripledes": "Evye",
    "./rc4": "pw6V",
    "./rabbit": "4JEs",
    "./rabbit-legacy": "YcQg"
  }],
  "AKWS": [function(require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 }), exports.SecretUtil = void 0;
    var e = require("crypto-js"), t = function() {
      function t() {
      }

      return t.Decrypt = function(t) {
        var r = e.enc.Hex.parse(t), i = e.enc.Base64.stringify(r);
        return e.AES.decrypt(i, this.key, {
          iv: this.iv,
          mode: e.mode.CBC,
          padding: e.pad.Pkcs7
        }).toString(e.enc.Utf8).toString();
      }, t.Encrypt = function(t) {
        var r = e.enc.Utf8.parse(t);
        return e.AES.encrypt(r, this.key, {
          iv: this.iv,
          mode: e.mode.CBC,
          padding: e.pad.Pkcs7
        }).ciphertext.toString().toUpperCase();
      }, t.key = e.enc.Utf8.parse("BE5391696F815E7A"), t.iv = e.enc.Utf8.parse("84524711D4D5060D"), t;
    }();
    exports.SecretUtil = t;
  }, { "crypto-js": "BXaB" }],
  "4SVC": [function(require, module, exports) {
    module.exports = function() {
      var e = {
        SAMSUNG: {
          "GT-S3370C": ["Samsung", "Corby 3G"],
          "GT-S3650": ["Samsung", "Corby"],
          "GT-S3653": ["Samsung", "Corby"],
          "GT-S3850": ["Samsung", "Corby II"],
          "GT-S5230": ["Samsung", "Star"],
          "GT-S5230W": ["Samsung", "Star"],
          "GT-S5233": ["Samsung", "Star"],
          "GT-S5260": ["Samsung", "Star II"],
          "GT-S5560": ["Samsung", "Marvel"],
          "GT-S5620": ["Samsung", "Monte"],
          "GT-S7550": ["Samsung", "Blue Earth"],
          "GT-S8000": ["Samsung", "Jet"],
          "GT-S8003": ["Samsung", "Jet"],
          "SGH-F480": ["Samsung", "Tocco"],
          "SGH-T528g": ["Samsung", "Straight Talk"],
          "GT-B3410": ["Samsung", "Star Qwerty"],
          "GT-B5310": ["Samsung", "Corby Pro"],
          "GT-B7722": ["Samsung", "Star Duos"],
          "GT-C6712": ["Samsung", "Star II Duos"]
        }
      }, a = {
        SAMSUNG: {
          "GT- S5250": ["Samsung", "Wave 525"],
          "GT-S5250": ["Samsung", "Wave 525"],
          "GT-S5253": ["Samsung", "Wave 525"],
          "GT-S5330": ["Samsung", "Wave 533"],
          "GT-S5380": ["Samsung", "Wave Y"],
          "GT-S5380D": ["Samsung", "Wave Y"],
          "GT-S5380K": ["Samsung", "Wave Y"],
          "GT-S5750E": ["Samsung", "Wave 575"],
          "GT-S5753E": ["Samsung", "Wave 575"],
          "GT-S7230B": ["Samsung", "Wave 723"],
          "GT-S7230E": ["Samsung", "Wave 723"],
          "GT-S7233E": ["Samsung", "Wave 723"],
          "GT-S7250": ["Samsung", "Wave M"],
          "GT-S7250D": ["Samsung", "Wave M"],
          "GT-S8500": ["Samsung", "Wave"],
          "GT-S8500C": ["Samsung", "Wave"],
          "GT-S8500R": ["Samsung", "Wave"],
          "GT-S8500T": ["Samsung", "Wave"],
          "GT-S8530": ["Samsung", "Wave II"],
          "GT-S8600": ["Samsung", "Wave 3"],
          "SHW-M410": ["Samsung", "Wave 3"]
        }
      }, i = { SAMSUNG: { "GT-I9500": ["Samsung", "GT-I9500"] } }, o = {
        "Coolpad D508": ["Coolpad", "D508"],
        "Coolpad E600": ["Coolpad", "E600"],
        "SCH-F839": ["Samsung", "SCH-F839"]
      }, t = {
        DX900: ["Acer", "Tempo DX900"],
        F900: ["Acer", "Tempo F900"],
        "Coolpad F800": ["Coolpad", "F800"],
        "garmin-asus-Nuvifone-M10": ["Garmin-Asus", "Nuvifone M10"],
        "HP iPAQ 510": ["HP", "iPAQ 510"],
        "HD mini T5555": ["HTC", "HD mini"],
        "HTC HD mini": ["HTC", "HD mini"],
        "HTC HD mini T5555": ["HTC", "HD mini"],
        "HTC HD2": ["HTC", "HD2"],
        "HTC HD2 T8585": ["HTC", "HD2"],
        "HD2 T8585": ["HTC", "HD2"],
        "T-Mobile LEO": ["HTC", "HD2"],
        dopodT5588: ["HTC", "Hengshan"],
        "HTC Mega-T3333": ["HTC", "Mega"],
        "HTC Snap S521": ["HTC", "Snap"],
        "HTC Touch2 T3320": ["HTC", "Touch 2"],
        "HTC Touch2 T3333": ["HTC", "Touch 2"],
        "HTC Touch2 T3335": ["HTC", "Touch 2"],
        "HTC P3700": ["HTC", "Touch Diamond"],
        "HTC Touch Diamond2 T5353": ["HTC", "Touch Diamond 2"],
        "HTC Touch HD T8282": ["HTC", "Touch HD"],
        "HTC Touch HD T8283": ["HTC", "Touch HD"],
        "HTC Touch HD2 T8585": ["HTC", "Touch HD2"],
        "HTC Touch Pro2 T7373": ["HTC", "Touch Pro 2"],
        T7380: ["HTC", "Touch Pro 2"],
        "HTC TyTN II": ["HTC", "TyTN II"],
        "GT-B7300": ["Samsung", "Omnia Lite"],
        "GT-B7610": ["Samsung", "Omnia Pro"],
        "GT-i8000": ["Samsung", "Omnia 2"],
        "GT-I8000": ["Samsung", "Omnia 2"],
        "GT-I8000U": ["Samsung", "Omnia 2"],
        M1i: ["Sony Ericsson", "M1i Aspen"]
      }, s = {
        Acer: { Allegro: ["Acer", "Allegro"], M310: ["Acer", "Allegro"] },
        Asus: { Galaxy6: ["Asus", "Galaxy 6"] },
        DELL: { "Venue Pro": ["Dell", "Venue Pro"] },
        FujitsuToshibaMobileCommun: { IS12T: ["Fujitsu Toshiba", "IS12T"] },
        HTC: {
          "7 Mozart": ["HTC", "7 Mozart"],
          "7 Mozart T8698": ["HTC", "7 Mozart"],
          T8697: ["HTC", "7 Mozart"],
          T8698: ["HTC", "7 Mozart"],
          PD67100: ["HTC", "7 Mozart"],
          "Mozart T8698": ["HTC", "7 Mozart"],
          Mozart: ["HTC", "7 Mozart"],
          "USCCHTC-PC93100": ["HTC", "Arrive"],
          Gold: ["HTC", "Gold "],
          HD2: ["HTC", "HD2"],
          HD7: ["HTC", "HD7"],
          "HD7 T9292": ["HTC", "HD7"],
          T9295: ["HTC", "HD7"],
          T9296: ["HTC", "HD7"],
          "HD7 Infinity": ["HTC", "HD7"],
          T7575: ["HTC", "7 Pro"],
          "7 Pro T7576": ["HTC", "7 Pro"],
          mwp6985: ["HTC", "Trophy"],
          "7 Trophy T8686": ["HTC", "Trophy"],
          "7 Trophy": ["HTC", "Trophy"],
          PC40100: ["HTC", "Trophy"],
          "Touch-IT Trophy": ["HTC", "Trophy"],
          Radar: ["HTC", "Radar"],
          "Radar 4G": ["HTC", "Radar"],
          "Radar C110e": ["HTC", "Radar"],
          Mazaa: ["HTC", "Mazaa"],
          Mondrian: ["HTC", "Mondrian"],
          Schubert: ["HTC", "Schubert"],
          "7 Schubert T9292": ["HTC", "Schubert"],
          Spark: ["HTC", "Spark"],
          T8788: ["HTC", "Surround"],
          "TITAN X310e": ["HTC", "Titan"],
          X310e: ["HTC", "Titan"],
          PI39100: ["HTC", "Titan"],
          PI86100: ["HTC", "Titan II"],
          Ultimate: ["HTC", "Ultimate"]
        },
        LG: {
          GW910: ["LG", "Optimus 7"],
          "LG E-900": ["LG", "Optimus 7 E900"],
          "LG-E900": ["LG", "Optimus 7 E900"],
          "LG-E900h": ["LG", "Optimus 7 E900"],
          "LG-C900": ["LG", "Optimus 7Q"],
          "LG-C900B": ["LG", "Quantum"],
          "LG-C900k": ["LG", "Quantum"]
        },
        nokia: { SeaRay: ["Nokia", "Lumia 800"], "800C": ["Nokia", "Lumia 800"] },
        NOKIA: {
          710: ["Nokia", "Lumia 710"],
          "Nokia 710": ["Nokia", "Lumia 710"],
          "Lumia 710": ["Nokia", "Lumia 710"],
          "Lumia 719": ["Nokia", "Lumia 719"],
          "Lumia 800": ["Nokia", "Lumia 800"],
          800: ["Nokia", "Lumia 800"],
          "Lumia 900": ["Nokia", "Lumia 900"],
          XXX: ["Nokia", "prototype"]
        },
        SAMSUNG: {
          "GT-I8350": ["Samsung", "Omnia W"],
          "GT-I8350T": ["Samsung", "Omnia W"],
          "SGH-i677": ["Samsung", "Focus Flash"],
          "SGH-i707": ["Samsung", "Taylor"],
          "SGH-i917": ["Samsung", "Omnia 7"],
          "SGH-I917": ["Samsung", "Omnia 7"],
          "SGH-i917.": ["Samsung", "Focus"],
          "SGH-i917R": ["Samsung", "Focus"],
          "SGH-i937": ["Samsung", "Focus S"],
          OMNIA7: ["Samsung", "Omnia 7"],
          OMINA7: ["Samsung", "Omnia 7"],
          Taylor: ["Samsung", "Taylor"]
        },
        TOSHIBA: { TSUNAGI: ["Toshiba", "Tsunagi"] }
      }, n = {
        Android: [null, null],
        "google sdk": [null, null],
        sdk: [null, null],
        generic: [null, null],
        "generic x86": [null, null],
        "amd brazos": ["AMD", "Fusionbased device"],
        "Amlogic M1 reference board": ["Amlogic", "M1 reference board"],
        AML8726M: ["Amlogic", "AML8726-Mbased device"],
        "vexpress a9": ["ARM", "Versatile Express development platform"],
        bcm7231: ["Broadcom", "BCM7231based device", "television"],
        bcm7425: ["Broadcom", "BCM7425based device", "television"],
        bcm7429: ["Broadcom", "BCM7429based device", "television"],
        "imx50 rdp": ["Freescale", "i.MX50based device"],
        "imx51 bbg": ["Freescale", "i.MX51based device"],
        "imx53 loco": ["Freescale", "i.MX53based device"],
        "imx53 mp204f3": ["Freescale", "i.MX53based device"],
        "imx53 smd": ["Freescale", "i.MX53based device"],
        "imx53 yeagle": ["Freescale", "i.MX53based device"],
        imx6q: ["Freescale", "i.MX6Qbased device"],
        "ODROID-A": ["Hardkernel", "ODROID-A developer tablet", "tablet"],
        "mfld dv10": ["Intel", "Medfieldbased device"],
        "mfld dv20": ["Intel", "Medfieldbased device"],
        "mfld lw00": ["Intel", "Medfieldbased device"],
        "mfld pr2": ["Intel", "Medfieldbased device"],
        "mfld pr3": ["Intel", "Medfieldbased device"],
        "berlin bg2": ["Marvell", "Armada 1000based device", "television"],
        "MStar Amber3": ["MStar", "Amber3based device"],
        "Konka Amber3": ["MStar", "Amber3based device"],
        mt5396: ["Mediatek", "MT5396based device", "television"],
        bird75v2: ["Mediatek", "MT6575based device"],
        "eagle75v1 2": ["Mediatek", "MT6575based device"],
        "MBX DVBT reference board (c03ref)": ["MXB", "DVBT reference board", "television"],
        NS2816: ["Nufront", "NuSmart 2816based device"],
        Ventana: ["nVidia", "Tegra Ventana development kit"],
        Cardhu: ["nVidia", "Tegra 3based device"],
        Panda: ["Pandaboard", "Development Kit"],
        pandaboard: ["Pandaboard", "Development Kit"],
        PandaBoard: ["Pandaboard", "Development Kit"],
        MSM: ["Qualcomm", "Snapdragonbased device"],
        "msm7227 ffa": ["Qualcomm", "Snapdragon S1based device"],
        "msm7627 surf": ["Qualcomm", "Snapdragon S1based device"],
        msm7627a: ["Qualcomm", "Snapdragon S1based device"],
        "msm7627a sku1": ["Qualcomm", "Snapdragon S1based device"],
        "msm7627a sku3": ["Qualcomm", "Snapdragon S1based device"],
        "msm7630 fusion": ["Qualcomm", "Snapdragon S2based device"],
        "msm7630 surf": ["Qualcomm", "Snapdragon S2based device"],
        "msm8660 cougar": ["Qualcomm", "Snapdragon S3based device"],
        "msm8660 surf": ["Qualcomm", "Snapdragon S3based device"],
        msm8960: ["Qualcomm", "Snapdragon S4based device"],
        rk2808sdk: ["Rockchip", "RK2808based device"],
        RK2818: ["Rockchip", "RK2818based device"],
        rk2818sdk: ["Rockchip", "RK2818based device"],
        "Android-for-Rockchip-2818": ["Rockchip", "RK2818based device"],
        rk29sdk: ["Rockchip", "RK29based device"],
        Rk29sdk: ["Rockchip", "RK29based device"],
        rk30sdk: ["Rockchip", "RK30based device"],
        s3c6410: ["Samsung", "S3C6410based device"],
        smdk6410: ["Samsung", "S3C6410based device"],
        SMDKC110: ["Samsung", "Exynos 3110based device"],
        SMDKV210: ["Samsung", "Exynos 4210based device"],
        S5PV210: ["Samsung", "Exynos 4210based device"],
        "sec smdkc210": ["Samsung", "Exynos 4210based device"],
        SMDK4x12: ["Samsung", "Exynos 4212 or 4412based device"],
        smp86xx: ["Sigma", "SMP86xxbased device", "television"],
        sv8860: ["Skyviia", "SV8860based device", "television"],
        "ste u8500": ["ST Ericsson", "Novathor U8500based device"],
        "Telechips M801 Evaluation Board": ["Telechips", "M801based device", "television"],
        "Telechips TCC8900 Evaluation Board": ["Telechips", "TCC8900based device", "television"],
        "TCC8920 STB EV": ["Telechips", "TCC8920based device", "television"],
        OMAP: ["Texas Instruments", "OMAPbased device"],
        "OMAP SS": ["Texas Instruments", "OMAPbased device"],
        "LogicPD Zoom2": ["Texas Instruments", "OMAPbased device"],
        omap3evm: ["Texas Instruments", "OMAP3based device"],
        Omap5sevm: ["Texas Instruments", "OMAP5based device"],
        "pnx8473 kiryung": ["Trident", "PNX8473based device", "television"],
        crespo: ["Google", "Nexus S"],
        Crespo: ["Google", "Nexus S"],
        Crespo4G: ["Google", "Nexus S"],
        Passion: ["Google", "Nexus One"],
        Bravo: ["HTC", "Desire"],
        dream: ["HTC", "Dream"],
        Vogue: ["HTC", "Touch"],
        "Vendor Optimus": ["LG", "Optimus"],
        Stingray: ["Motorola", "XOOM", "tablet"],
        Wingray: ["Motorola", "XOOM", "tablet"],
        maguro: ["Samsung", "Galaxy Nexus"],
        Maguro: ["Samsung", "Galaxy Nexus"],
        "Toro-VZW": ["Samsung", "Galaxy Nexus"],
        blaze: ["Texas Instruments", "Blaze Tablet", "tablet"],
        Blaze: ["Texas Instruments", "Blaze Tablet", "tablet"],
        "Blaze Tablet": ["Texas Instruments", "Blaze Tablet", "tablet"],
        BlueStacks: ["BlueStacks", "App Player", "desktop"],
        "youwave custom": ["Youwave", "Android on PC", "desktop"],
        A100: ["Acer", "Iconia Tab A100", "tablet"],
        A101: ["Acer", "Iconia Tab A101", "tablet"],
        A200: ["Acer", "Iconia Tab A200", "tablet"],
        A500: ["Acer", "Iconia Tab A500", "tablet"],
        A501: ["Acer", "Iconia Tab A501", "tablet"],
        A510: ["Acer", "Iconia Tab A510", "tablet"],
        A511: ["Acer", "Iconia Tab A511", "tablet"],
        A700: ["Acer", "Iconia Tab A700", "tablet"],
        "Acer A800": ["Acer", "Iconia Tab A800", "tablet"],
        E110: ["Acer", "beTouch E110"],
        E120: ["Acer", "beTouch E120"],
        E130: ["Acer", "beTouch E130"],
        E140: ["Acer", "beTouch E140"],
        E210: ["Acer", "beTouch E210"],
        E310: ["Acer", "Liquid mini"],
        E320: ["Acer", "Liquid Express"],
        E330: ["Acer", "Liquid Glow"],
        E400: ["Acer", "beTouch E400"],
        G100W: ["Acer", "G100W"],
        S100: ["Acer", "Liquid"],
        S110: ["Acer", "Stream"],
        S120: ["Acer", "Liquid mt"],
        S300: ["Acer", "Iconia Smart"],
        S500: ["Acer", "CloudMobile"],
        TD600: ["Acer", "beTouch TD600"],
        Liquid: ["Acer", "Liquid"],
        "Liquid E": ["Acer", "Liquid E"],
        "Liquid Mt": ["Acer", "Liquid mt"],
        "Liquid MT": ["Acer", "Liquid mt"],
        "Liquid Metal": ["Acer", "Liquid mt"],
        Stream: ["Acer", "Stream"],
        N700: ["aigo", "N700", "tablet"],
        M801: ["aigo", "M801", "tablet"],
        Novo7: ["Ainovo", "Novo7", "tablet"],
        "Novo7 Aurora": ["Ainovo", "Novo7 Aurora", "tablet"],
        "Novo7 Advanced": ["Ainovo", "Novo7 Advanced", "tablet"],
        "Novo7 Advanced2": ["Ainovo", "Novo7 Advanced 2", "tablet"],
        "Novo7 Basic": ["Ainovo", "Novo7 Basic", "tablet"],
        "Novo7 ELF": ["Ainovo", "Novo7 Elf", "tablet"],
        "Novo7 PALADIN": ["Ainovo", "Novo7 Paladin", "tablet"],
        "Novo8 Advanced": ["Ainovo", "Novo8 Advanced", "tablet"],
        "one touch 890": ["Alcatel", "One Touch 890"],
        "one touch 890D": ["Alcatel", "One Touch 890"],
        "one touch 891": ["Alcatel", "One Touch 891"],
        "ONE TOUCH 903": ["Alcatel", "One Touch 903SHV-E170K"],
        "one touch 906": ["Alcatel", "One Touch 906"],
        "one touch 908": ["Alcatel", "One Touch 908"],
        "one touch 908F": ["Alcatel", "One Touch 908"],
        "one touch 908S": ["Alcatel", "One Touch 908"],
        "one touch 910": ["Alcatel", "One Touch 910"],
        "one touch 918": ["Alcatel", "One Touch 918"],
        "one touch 918D": ["Alcatel", "One Touch 918"],
        "ONE TOUCH 918D": ["Alcatel", "One Touch 918"],
        "one touch 918M": ["Alcatel", "One Touch 918"],
        "one touch 918N": ["Alcatel", "One Touch 918"],
        "one touch 980": ["Alcatel", "One Touch 980"],
        "one touch 980A": ["Alcatel", "One Touch 980"],
        "one touch 981A": ["Alcatel", "One Touch 981"],
        "one touch 986": ["Alcatel", "One Touch 986"],
        "one touch 990": ["Alcatel", "One Touch 990"],
        "one touch 990A": ["Alcatel", "One Touch 990"],
        "one touch 991": ["Alcatel", "One Touch 991"],
        "one touch 991D": ["Alcatel", "One Touch 991"],
        "ONE TOUCH 993": ["Alcatel", "One Touch 993"],
        "one touch 995": ["Alcatel", "One Touch 995"],
        "Telenor OneTouch": ["Alcatel", "One Touch 990"],
        "OT 918": ["Alcatel", "One Touch 918"],
        Venture: ["Alcatel", "Venture"],
        "Allwinner A10": ["AllWinner", "A10", "tablet"],
        "97FC": ["AllWinner", "A10 97FC", "tablet"],
        "Kindle Fire": ["Amazon", "Kindle Fire", "tablet"],
        "Amazon Kindle Fire": ["Amazon", "Kindle Fire", "tablet"],
        AMD120: ["AnyDATA", "AnyTAB AMD120", "tablet"],
        MW0811: ["AOC", "Breeze MW0811", "tablet"],
        "MW0821 V2.0": ["AOC", "Breeze MW0821", "tablet"],
        MW0922: ["AOC", "Breeze MW0922", "tablet"],
        "Apanda A60": ["Apanda", "A60"],
        "apanda-A60": ["Apanda", "A60"],
        A80KSC: ["Archos", "Arnova 8", "tablet"],
        AN7CG2: ["Archos", "Arnova 7", "tablet"],
        A101B: ["Archos", "Arnova 10", "tablet"],
        AN10BG2DT: ["Archos", "Arnova 10 B", "tablet"],
        AN10G2: ["Archos", "Arnova 10 G2", "tablet"],
        A32: ["Archos", "32", "media"],
        A35DE: ["Archos", "35 Smart Home Phone"],
        A43: ["Archos", "43", "media"],
        Archos5: ["Archos", "5", "media"],
        A70H: ["Archos", "7", "tablet"],
        A70HB: ["Archos", "7", "tablet"],
        A70BHT: ["Archos", "7", "tablet"],
        A70CHT: ["Archos", "7C", "tablet"],
        A70S: ["Archos", "70", "tablet"],
        A7EB: ["Archos", "70B", "tablet"],
        "ARCHOS 70it2": ["Archos", "70 IT 2", "tablet"],
        "ARCHOS 80G9": ["Archos", "80 G9", "tablet"],
        "ARCHOS 101G9": ["Archos", "101 G9", "tablet"],
        A101IT: ["Archos", "101 IT", "tablet"],
        ASTRI: ["ASTRI", "e-reader", "ereader"],
        eeepc: ["Asus", "Eee Pc"],
        "asus laptop": ["Asus", "Eee Pc"],
        ME171: ["Asus", "Eee Pad MeMO", "tablet"],
        "Slider SL101": ["Asus", "Eee Pad Slider", "tablet"],
        EPAD: ["Asus", "Eee Pad Transformer", "tablet"],
        TF101: ["Asus", "Eee Pad Transformer", "tablet"],
        "Transformer TF101": ["Asus", "Eee Pad Transformer", "tablet"],
        "Transformer TF101G": ["Asus", "Eee Pad Transformer", "tablet"],
        TF201: ["Asus", "Eee Pad Transformer Prime", "tablet"],
        "Transformer Prime TF201": ["Asus", "Eee Pad Transformer Prime", "tablet"],
        "Transformer Prime": ["Asus", "Eee Pad Transformer Prime", "tablet"],
        "Transformer Pad TF300T": ["Asus", "Transformer Pad 300", "tablet"],
        "ASUS Transformer TF300T": ["Asus", "Transformer Pad 300", "tablet"],
        "ASUS Transformer Pad TF300T": ["Asus", "Transformer Pad 300", "tablet"],
        "ASUS Transformer Pad TF300TG": ["Asus", "Transformer Pad 300", "tablet"],
        "ASUS Transformer Pad TF700T": ["Asus", "Transformer Pad Infinity 700", "tablet"],
        "ASUS Transformer Pad TF700K": ["Asus", "Transformer Pad Infinity 700", "tablet"],
        "ASUS Transformer TF700K": ["Asus", "Transformer Pad Infinity 700", "tablet"],
        PadFone: ["Asus", "Padfone", "tablet"],
        "OMS TTD": ["Asus", "Eee Pc T10"],
        "ASUS T20": ["Asus", "Eee Pc T20"],
        ETBW11AA: ["Asus", "Tough"],
        "AUX V900": ["AUX", "V900"],
        M910A: ["AUX", "M910"],
        "PICOpad-QGN": ["Axioo", "Picopad QGN", "tablet"],
        NOOK: ["Barnes & Noble", "NOOK", "ereader"],
        NookColor: ["Barnes & Noble", "NOOK Color", "ereader"],
        "NOOK BNRV200": ["Barnes & Noble", "NOOK Color", "ereader"],
        "NOOK BNRV300": ["Barnes & Noble", "NOOK Color", "ereader"],
        NookTablet: ["Barnes & Noble", "NOOK Tablet", "ereader"],
        "Nook Tablet": ["Barnes & Noble", "NOOK Tablet", "ereader"],
        "NOOK BNTV250": ["Barnes & Noble", "NOOK Tablet", "ereader"],
        "NOOK BNTV250A": ["Barnes & Noble", "NOOK Tablet", "ereader"],
        BNTV250: ["Barnes & Noble", "NOOK Tablet", "ereader"],
        BNTV250A: ["Barnes & Noble", "NOOK Tablet", "ereader"],
        "NOOK Slate": ["Barnes & Noble", "NOOK Tablet", "ereader"],
        "BenWee 5100": ["BenWee", "5100"],
        CA907AAC0G: ["Besta", "CA907AAC0G"],
        BM999: ["Bmorn", "BM999", "tablet"],
        V11: ["Bmorn", "V11", "tablet"],
        V99: ["Bmorn", "V99", "tablet"],
        "bq DaVinci": ["bq", "DaVinci", "tablet"],
        CT704: ["Carrefour", "CT704", "tablet"],
        CT1002: ["Carrefour", "CT1002", "tablet"],
        "Camangi-Mangrove7": ["Camangi", "Mangrove 7", "tablet"],
        WS171: ["Camangi", "WebStation", "tablet"],
        IS11CA: ["Casio", "GzOne IS11CA"],
        C771: ["Casio", "GzOne Commando"],
        "CAT NOVA": ["Cat", "NOVA", "tablet"],
        ARMM3V: ["chinaleap", "ARMM3V", "tablet"],
        "CIUS-7": ["Cisco", "Cius", "tablet"],
        "CIUS-7-AT": ["Cisco", "Cius", "tablet"],
        "CSL Spice MI300": ["CSL", "Spice MI300"],
        "CSL-MI410": ["CSL", "Spice MI410"],
        MID1024: ["Coby", "Kyros MID1024", "tablet"],
        MID1125: ["Coby", "Kyros MID1125", "tablet"],
        MID1126: ["Coby", "Kyros MID1126", "tablet"],
        MID7010: ["Coby", "Kyros MID7010", "tablet"],
        MID7012: ["Coby", "Kyros MID7012", "tablet"],
        MID7015: ["Coby", "Kyros MID7015", "tablet"],
        MID7015A: ["Coby", "Kyros MID7015", "tablet"],
        MID7016: ["Coby", "Kyros MID7016", "tablet"],
        MID7020: ["Coby", "Kyros MID7020", "tablet"],
        MID7022: ["Coby", "Kyros MID7022", "tablet"],
        MID7024: ["Coby", "Kyros MID7024", "tablet"],
        MID7025: ["Coby", "Kyros MID7025", "tablet"],
        MID7127: ["Coby", "Kyros MID7127", "tablet"],
        MID8024: ["Coby", "Kyros MID8024", "tablet"],
        MID8125: ["Coby", "Kyros MID8125", "tablet"],
        MID8127: ["Coby", "Kyros MID8127", "tablet"],
        Z71: ["Commtiva", "Z71"],
        "V-T100": ["Commtiva", "V-T100"],
        "FIH-FB0": ["Commtiva", "HD700"],
        "Coolpad D510": ["Coolpad", "D510"],
        "Coolpad 8020": ["Coolpad", "8020"],
        D530: ["Coolpad", "D530"],
        "Coolpad D530": ["Coolpad", "D530"],
        D539: ["Coolpad", "D539"],
        "Coolpad D539": ["Coolpad", "D539"],
        E239: ["Coolpad", "E239"],
        "Coolpad E239": ["Coolpad", "E239"],
        "Coolpad N930": ["Coolpad", "N930"],
        N930: ["Coolpad", "N930"],
        "Coolpad W706": ["Coolpad", "W706"],
        "Coolpad W706+": ["Coolpad", "W706"],
        "Coolpad W708": ["Coolpad", "W708"],
        W711: ["Coolpad", "W711"],
        "Coolpad 5010": ["Coolpad", "5010"],
        "Coolpad 5210": ["Coolpad", "5210"],
        "Coolpad 5820": ["Coolpad", "5820"],
        5832: ["Coolpad", "5832"],
        "Coolpad 5832": ["Coolpad", "5832"],
        5855: ["Coolpad", "5855"],
        "Coolpad 5860": ["Coolpad", "5860"],
        "Coolpad 5860+": ["Coolpad", "5860"],
        "Coolpad 5860s": ["Coolpad", "5860"],
        5860: ["Coolpad", "5860"],
        "5860A": ["Coolpad", "5860"],
        "Coolpad 5870": ["Coolpad", "5870"],
        5870: ["Coolpad", "5870"],
        "Coolpad 7005": ["Coolpad", "7005"],
        7260: ["Coolpad", "7260"],
        "Coolpad 7019": ["Coolpad", "7019"],
        "Coolpad 7260": ["Coolpad", "7260"],
        "Coolpad 8013": ["Coolpad", "8013"],
        "Coolpad 8809": ["Coolpad", "8809"],
        "Coolpad 8810": ["Coolpad", "8810"],
        8810: ["Coolpad", "8810"],
        8150: ["Coolpad", "8150"],
        "Coolpad 8150D": ["Coolpad", "8150"],
        "Coolpad 8811": ["Coolpad", "8811"],
        "Coolpad 9900": ["Coolpad", "9900"],
        "Coolpad 8050": ["Coolpad", "8050"],
        ZiiO7: ["Creative", "ZiiO 7", "tablet"],
        "ZiiLABS ZiiO7": ["Creative", "ZiiO 7", "tablet"],
        "ZiiLABS ZiiO10 ": ["Creative", "ZiiO 10", "tablet"],
        "CUBE K8GT A": ["Cube", "K8GT A", "tablet"],
        "CUBE K8GT B": ["Cube", "K8GT B", "tablet"],
        "K8GT C": ["Cube", "K8GT C", "tablet"],
        "K8GT H": ["Cube", "K8GT H", "tablet"],
        "CUBE K8GT H": ["Cube", "K8GT H", "tablet"],
        "K8GT W": ["Cube", "K8GT W", "tablet"],
        "CUBE U8GT": ["Cube", "U8GT", "tablet"],
        "CUBE U9GT": ["Cube", "U9GT", "tablet"],
        "CUBE U9GT 2": ["Cube", "U9GT 2", "tablet"],
        "Cube U9GT2": ["Cube", "U9GT 2", "tablet"],
        U9GT: ["Cube", "U9GT", "tablet"],
        "U9GT2 From moage.com": ["Cube", "U9GT 2", "tablet"],
        "N90 From moage.com": ["Cube", "U9GT 2", "tablet"],
        "U9GT S": ["Cube", "U9GT S", "tablet"],
        "U9GT S A": ["Cube", "U9GT SA", "tablet"],
        "U9GTS A": ["Cube", "U9GT SA", "tablet"],
        "U10GT 2": ["Cube", "U10GT 2", "tablet"],
        "U10GT S": ["Cube", "U10GT S", "tablet"],
        "U30GT-H": ["Cube", "U30GT H", "tablet"],
        "CUBE Q7PRO": ["Cube", "Q7 Pro", "tablet"],
        "CUBE Q7PRO J": ["Cube", "Q7 Pro", "tablet"],
        "Cydle M7 (v0005.04.03.12.ko)": ["Cydle", "M7 MultiPAD", "tablet"],
        "Dell Aero": ["Dell", "Aero"],
        "Dell M01M": ["Dell", "Mini 5", "tablet"],
        "Dell Streak": ["Dell", "Streak", "tablet"],
        "001DL": ["Dell", "Streak", "tablet"],
        "101DL": ["Dell", "Streak Pro", "tablet"],
        GS01: ["Dell", "Streak Pro", "tablet"],
        "Dell Streak Pro": ["Dell", "Streak Pro", "tablet"],
        streak7: ["Dell", "Streak 7", "tablet"],
        "Dell Streak 7": ["Dell", "Streak 7", "tablet"],
        "Dell Streak 10 Pro": ["Dell", "Streak 10 Pro", "tablet"],
        "Dell V04B": ["Dell", "Streak V04B", "tablet"],
        "Dell Venue": ["Dell", "Venue"],
        "Dell XCD35": ["Dell", "XCD35"],
        XCD35: ["Dell", "XCD35"],
        iDx7: ["Digma", "iDx7", "tablet"],
        iDx10: ["Digma", "iDx10", "tablet"],
        "iDx10 3G": ["Digma", "iDx10", "tablet"],
        DM009SH: ["Disney Mobile", "DM009SH"],
        DM010SH: ["Disney Mobile", "DM010SH"],
        DM012SH: ["Disney Mobile", "DM012SH"],
        "F-08D": ["Disney Mobile", "F-08D"],
        "P-05D": ["Disney Mobile", "P-05D"],
        "Tablet-P27": ["DracoTek", "P27 Tablet", "tablet"],
        edgejr: ["EnTourage", "Pocket eDGe", "tablet"],
        l97D: ["EPad", "l97D", "tablet"],
        M4301: ["Eston", "MID M4301", "media"],
        P10AN: ["Exper", "Easypad P10AN", "tablet"],
        "FIH-F0X": ["FIH", "F0X"],
        "Fly IQ260": ["Fly", "IQ260 BlackBird"],
        ISW11F: ["Fujitsu", "Arrows Z"],
        ISW13F: ["Fujitsu", "Arrows Z"],
        IS12F: ["Fujitsu", "Arrows ES"],
        "F-01D": ["Fujitsu", "Arrows Tab LTE", "tablet"],
        "F-03D": ["Fujitsu", "Arrows Kiss"],
        "F-05D": ["Fujitsu", "Arrows X LTE"],
        "F-07D": ["Fujitsu", "Arrows Ã�Â¼"],
        "F-10D": ["Fujitsu", "Arrows X F-10D"],
        "F-12C": ["Fujitsu", "Globetrotter"],
        f12arc: ["Fujitsu", "F12arc"],
        M532: ["Fujitsu", "Stylistic M532", "tablet"],
        Garminfone: ["Garmin-Asus", "Garminfone"],
        "Garmin-Asus A10": ["Garmin-Asus", "Nuvifone A10"],
        "Garmin-Asus A50": ["Garmin-Asus", "Nuvifone A50"],
        TPA60W: ["Gateway", "TPA60W", "tablet"],
        "Geeksphone ZERO": ["Geeksphone", "ZERO"],
        "gemei G2": ["Gemei", "G2", "tablet"],
        "Gemei G2": ["Gemei", "G2", "tablet"],
        "gemei G3": ["Gemei", "G3", "tablet"],
        "Gemei G9": ["Gemei", "G9", "tablet"],
        "GSmart G1317D": ["Gigabyte", "GSmart G1317D"],
        "Gigabyte TB100": ["Gigabyte", "TB100", "tablet"],
        GN100: ["Gionee", "GN100"],
        GN105: ["Gionee", "GN105"],
        GN106: ["Gionee", "GN106"],
        GN200: ["Gionee", "GN200"],
        GN205: ["Gionee", "GN205"],
        GN700W: ["Gionee", "GN700W"],
        GN708W: ["Gionee", "GN708W"],
        "Google Ion": ["Google", "Ion"],
        "Nexus One": ["Google", "Nexus One"],
        NexusOne: ["Google", "Nexus One"],
        "HTC Nexus One": ["Google", "Nexus One"],
        "Nexus S": ["Google", "Nexus S"],
        "Google Nexus S": ["Google", "Nexus S"],
        "Nexus S 4G": ["Google", "Nexus S 4G"],
        "Dooderbutt-4.0.3-v1": ["Google", "Nexus S 4G"],
        "Nexus 7": ["Google", "Nexus 7", "tablet"],
        "Haier HW-W910": ["Haier", "HW-W910"],
        SN10T1: ["HANNspree", "HANNSpad SN10T1", "tablet"],
        SN10T2: ["HANNspree", "HANNSpad SN10T2", "tablet"],
        HannsComb: ["HANNspree", "HANNSpad", "tablet"],
        X1: ["HCL", "ME X1", "tablet"],
        "MID Serails": ["Herotab", "C8", "tablet"],
        "MID Serials": ["Herotab", "C8", "tablet"],
        "COSMO DUO": ["Hiscreen", "Cosmo DUO", "tablet"],
        "HS-U8": ["Hisense", "U8"],
        "HS-T92": ["Hisense", "T92"],
        "HS-E860": ["Hisense", "E860"],
        "HS-E910": ["Hisense", "E910"],
        "HS-E926": ["Hisense", "E926"],
        "HS-EG900": ["Hisense", "EG900"],
        "HS-ET919": ["Hisense", "ET919"],
        EG968B: ["Hisense", "EG968B"],
        "HKPHONE H8-3G": ["HKPhone", "H8 3G"],
        "HOSIN U2": ["Hosin", "U2"],
        Touchpad: ["HP", "TouchPad", "tablet"],
        "HP Touchpad": ["HP", "TouchPad", "tablet"],
        "cm tenderloin": ["HP", "TouchPad", "tablet"],
        "aokp tenderloin": ["HP", "TouchPad", "tablet"],
        "HTC Amaze 4G": ["HTC", "Amaze 4G"],
        "HTC Ruby": ["HTC", "Amaze 4G"],
        "HTC Amaze 4G(Ruby)": ["HTC", "Amaze 4G"],
        "Amaze 4G": ["HTC", "Amaze 4G"],
        "HTC Aria": ["HTC", "Aria"],
        "HTC Aria A6380": ["HTC", "Aria"],
        "HTC Liberty A6380": ["HTC", "Aria"],
        "HTC Liberty": ["HTC", "Aria"],
        "HTC A6366": ["HTC", "Aria"],
        "HTC Bee": ["HTC", "Bee"],
        "HTC ChaCha": ["HTC", "ChaCha"],
        "HTC ChaCha A810e": ["HTC", "ChaCha"],
        "HTC ChaChaCha A810e": ["HTC", "ChaCha"],
        "HTC A810e": ["HTC", "ChaCha"],
        "HTC A9188": ["HTC", "Tianxi"],
        "HTC Bravo": ["HTC", "Desire"],
        "HTC Desire": ["HTC", "Desire"],
        "HTC Desire A8181": ["HTC", "Desire"],
        "HTC Desire A8183": ["HTC", "Desire"],
        "HTC Desire Beats A8181": ["HTC", "Desire"],
        "HTC Desire CDMA": ["HTC", "Desire"],
        "HTC Desire SMS": ["HTC", "Desire"],
        "HTC Desire S.M.S": ["HTC", "Desire"],
        "HTC Desire C": ["HTC", "Desire C"],
        "HTC DesireHD": ["HTC", "Desire HD"],
        "HTC DesireHD A9191": ["HTC", "Desire HD"],
        "HTC DesireHD A9192": ["HTC", "Desire HD"],
        "HTC Desire HD A9191": ["HTC", "Desire HD"],
        "HTC A9191": ["HTC", "Desire HD"],
        "HTC A9191 for AT&T": ["HTC", "Desire HD"],
        "HTC A9192": ["HTC", "Desire HD"],
        "HTC Desire HD": ["HTC", "Desire HD"],
        "HTC Desire HD with Beats Audio": ["HTC", "Desire HD"],
        "HTC Desire S": ["HTC", "Desire S"],
        "HTC DesireS": ["HTC", "Desire S"],
        "HTC DesiresS": ["HTC", "Desire S"],
        "HTC DesireS S510e": ["HTC", "Desire S"],
        "HTC DesireS S510b": ["HTC", "Desire S"],
        "HTC Desire S S510e": ["HTC", "Desire S"],
        "HTC S510e": ["HTC", "Desire S"],
        "HTC Desire Saga": ["HTC", "Desire S"],
        "HTC Desire V": ["HTC", "Desire V"],
        "HTC T328w": ["HTC", "Desire V"],
        "HTC Desire VC": ["HTC", "Desire VC"],
        "HTC T328d": ["HTC", "Desire VC"],
        "HTC T328t": ["HTC", "Desire VT"],
        "HTC Desire Z": ["HTC", "Desire Z"],
        "HTC DesireZ": ["HTC", "Desire Z"],
        "HTC DesireZ A7272": ["HTC", "Desire Z"],
        "HTC Desire Z A7272": ["HTC", "Desire Z"],
        "HTC Vision": ["HTC", "Desire Z"],
        "HTC A7275": ["HTC", "Desire Z"],
        "HTC Dream": ["HTC", "Dream"],
        "HTC S710d": ["HTC", "Droid Incredible 2"],
        "HTC Incredible 2": ["HTC", "Droid Incredible 2"],
        "HTC X515d": ["HTC", "EVO 3D"],
        "HTC X515m": ["HTC", "EVO 3D"],
        "HTC X515C": ["HTC", "EVO 3D"],
        "HTC Evo 3D": ["HTC", "EVO 3D"],
        "HTC EVO 3D": ["HTC", "EVO 3D"],
        "HTC EVO 3D GSM": ["HTC", "EVO 3D"],
        "HTC EVO 3D X515a": ["HTC", "EVO 3D"],
        "HTC EVO 3D GSM X515m": ["HTC", "EVO 3D"],
        "HTC EVO 3D X515m": ["HTC", "EVO 3D"],
        "HTC EVO 3D X515M": ["HTC", "EVO 3D"],
        "HTC EVO3D X515a": ["HTC", "EVO 3D"],
        "HTC EVO3D X515m": ["HTC", "EVO 3D"],
        "HTC Evo 3D X515m": ["HTC", "EVO 3D"],
        "HTC Evo 3D with Beats Audio X515m": ["HTC", "EVO 3D"],
        "HTC Evo 4G": ["HTC", "EVO 4G"],
        "HTC EVO 4G": ["HTC", "EVO 4G"],
        "HTC X515E": ["HTC", "EVO 4G+"],
        "HTC EVO 4G+ For Sprint": ["HTC", "EVO 4G+"],
        "HTC EVO 4G++ For Sprint": ["HTC", "EVO 4G+"],
        "HTC C715c": ["HTC", "EVO Design 4G"],
        "HTC Design 4G": ["HTC", "EVO Design 4G"],
        "HTC EVO design 4G": ["HTC", "EVO Design 4G"],
        "HTC EVO Design 4G": ["HTC", "EVO Design 4G"],
        "HTC Evo Shift": ["HTC", "EVO Shift"],
        "HTC EVO Shift 4G": ["HTC", "EVO Shift"],
        "HTC A310e": ["HTC", "Explorer"],
        "HTC Explorer": ["HTC", "Explorer"],
        "HTC Explorer A310b": ["HTC", "Explorer"],
        "HTC Explorer A310e": ["HTC", "Explorer"],
        "HTC P510e": ["HTC", "Flyer", "tablet"],
        "HTC Flyer": ["HTC", "Flyer", "tablet"],
        "HTC Flyer P510e": ["HTC", "Flyer", "tablet"],
        "HTC Flyer P512": ["HTC", "Flyer", "tablet"],
        "HTC Flyer P512 NA": ["HTC", "Flyer", "tablet"],
        "HTC P515E": ["HTC", "Flyer 4G", "tablet"],
        "HTC Gratia A6380": ["HTC", "Gratia"],
        "HTC HD": ["HTC", "HD"],
        "HTC HD2": ["HTC", "HD2"],
        "HTC HD2 T8585": ["HTC", "HD2"],
        "HTC HD2(Leo)": ["HTC", "HD2"],
        "HTC HD7": ["HTC", "HD7"],
        "HTC T9299+": ["HTC", "HD7"],
        "HTC HD7 for Sprint": ["HTC", "HD7"],
        "HTC HD7 4G T9299 For AT&T": ["HTC", "HD7"],
        "HTC HD7 4G T9299+ For AT&T": ["HTC", "HD7"],
        "HTC T9299+ For AT&T": ["HTC", "HD7"],
        "HTC HD7S T9399+": ["HTC", "HD7s"],
        "HTC HD7S T9899+": ["HTC", "HD7s"],
        "HTC T9899+ For AT&T": ["HTC", "HD7s"],
        "VitMod ExtraLite 1.6.5.fullodex for HTC HD7 Pro": ["HTC", "HD7 Pro"],
        "HTC Hero": ["HTC", "Hero"],
        "HTC HERO": ["HTC", "Hero"],
        "HTC Hero CDMA": ["HTC", "Hero"],
        "HTC HERO CDMA": ["HTC", "Hero"],
        "HTC HERO200": ["HTC", "Hero 200"],
        "HTC Hero S": ["HTC", "Hero S"],
        "HTC IMAGIO": ["HTC", "Imagio"],
        "HTC Incredible": ["HTC", "Incredible"],
        "HTC Incredible S710E": ["HTC", "Incredible S"],
        "HTC S710e": ["HTC", "Incredible S"],
        "HTC Incredible S": ["HTC", "Incredible S"],
        "HTC Incredible S S710e": ["HTC", "Incredible S"],
        "HTC Incredible S s710e": ["HTC", "Incredible S"],
        "HTC IncredibleS S710e": ["HTC", "Incredible S"],
        "HTC Incredible S with Beats Audio": ["HTC", "Incredible S"],
        "HTC Vivo": ["HTC", "Incredible S"],
        "HTC Innovation": ["HTC", "Innovation"],
        "HTC Inspire 4G": ["HTC", "Inspire 4G"],
        "HTC HD7 Inspire 4G For Vodafone": ["HTC", "Inspire 4G"],
        "HTC P715a": ["HTC", "Jetstream", "tablet"],
        "HTC Legend": ["HTC", "Legend"],
        "HTC Magic": ["HTC", "Magic"],
        "HTC Sapphire": ["HTC", "Magic"],
        "HTC Lexikon": ["HTC", "Merge"],
        "HTC One S": ["HTC", "One S"],
        "HTC Z520e": ["HTC", "One S"],
        "HTC One V": ["HTC", "One V"],
        "HTC T320e": ["HTC", "One V"],
        "HTC One X": ["HTC", "One X"],
        "HTC S720e": ["HTC", "One X"],
        "HTC Endeavour-LS": ["HTC", "One X"],
        "HTC One XL": ["HTC", "One XL"],
        "HTC X710a": ["HTC", "Raider 4G"],
        "HTC Raider": ["HTC", "Raider 4G"],
        "HTC Raider X710e": ["HTC", "Raider 4G"],
        "HTC Raider X710s": ["HTC", "Raider 4G"],
        "HTC Raider 4G X710e": ["HTC", "Raider 4G"],
        "HTC PH39100": ["HTC", "Raider 4G"],
        "HTC Holiday": ["HTC", "Raider 4G"],
        "HTC Velocity 4G X710s": ["HTC", "Raider 4G"],
        "HTC Rezound": ["HTC", "Rezound"],
        "HTC Rhyme S510b": ["HTC", "Rhyme"],
        "HTC S510b": ["HTC", "Rhyme"],
        "HTC Bliss": ["HTC", "Rhyme"],
        "HTC Bliss S510b": ["HTC", "Rhyme"],
        "HTC Salsa C510e": ["HTC", "Salsa"],
        "HTC C510e": ["HTC", "Salsa"],
        "HTC Z710a": ["HTC", "Sensation"],
        "HTC Z710e": ["HTC", "Sensation"],
        "HTC Z710t": ["HTC", "Sensation"],
        "HTC Sensation": ["HTC", "Sensation"],
        "HTC Sensation Z710": ["HTC", "Sensation"],
        "HTC Sensation Z710a": ["HTC", "Sensation"],
        "HTC Sensation Z710e": ["HTC", "Sensation"],
        "HTC Sensation Z710E": ["HTC", "Sensation"],
        "HTC Sensation Z710e For AT&T": ["HTC", "Sensation"],
        "HTC Sensation Z710e with Beats Audio": ["HTC", "Sensation"],
        "HTC Sensation with Beats Audio Z710e": ["HTC", "Sensation"],
        "HTC Sensation with Beats Audio": ["HTC", "Sensation"],
        "HTC Sensation Taste": ["HTC", "Sensation"],
        "HTC Pyramid": ["HTC", "Sensation"],
        "HTC Pyramid Z710a": ["HTC", "Sensation"],
        "HTC Pyramid Z710e": ["HTC", "Sensation"],
        "HTC Sensation 4G": ["HTC", "Sensation"],
        "HTC Sensation 4G with Beats Audio": ["HTC", "Sensation"],
        "HTC Sensation G14": ["HTC", "Sensation"],
        "HTC Sensation G14 for AT&T": ["HTC", "Sensation"],
        "HTC G14 sensation": ["HTC", "Sensation"],
        "HTC Z715e": ["HTC", "Sensation XE"],
        "HTC Sensation Z715e": ["HTC", "Sensation XE"],
        "HTC SensationXE Beats": ["HTC", "Sensation XE"],
        "HTC SensationXE Beats Z715a": ["HTC", "Sensation XE"],
        "HTC SensationXE Beats Z715e": ["HTC", "Sensation XE"],
        "HTC Sensation XE": ["HTC", "Sensation XE"],
        "HTC Sensation XE Z715e": ["HTC", "Sensation XE"],
        "HTC SensationXE Z715e": ["HTC", "Sensation XE"],
        "HTC Sensation XE Beats": ["HTC", "Sensation XE"],
        "HTC SensationXE with Beats Audio": ["HTC", "Sensation XE"],
        "HTC Sensation XE with Beats Audio": ["HTC", "Sensation XE"],
        "HTC Sensation XE with Beats Audio Z715a": ["HTC", "Sensation XE"],
        "HTC Sensation Juredroid XE Beats Audio": ["HTC", "Sensation XE"],
        "HTC Sensation XE with Beats Audio Z715e": ["HTC", "Sensation XE"],
        "HTC Sensation XE With Beats Audio Z715e": ["HTC", "Sensation XE"],
        "HTC Sensation 4G XE with Beats Audio": ["HTC", "Sensation XE"],
        "HTC Sensation with Beats Audio Z715e": ["HTC", "Sensation XE"],
        "HTC X315E": ["HTC", "Sensation XL"],
        "HTC SensationXL Beats X315b": ["HTC", "Sensation XL"],
        "HTC SensationXL Beats X315e": ["HTC", "Sensation XL"],
        "HTC Sensation XL with Beats Audio X315b": ["HTC", "Sensation XL"],
        "HTC Sensation XL with Beats Audio X315e": ["HTC", "Sensation XL"],
        "HTC Runnymede": ["HTC", "Sensation XL"],
        "HTC G21": ["HTC", "Sensation XL"],
        "HTC PH06130": ["HTC", "Status"],
        "HTC Status": ["HTC", "Status"],
        "HTC Tattoo": ["HTC", "Tattoo"],
        "HTC TATTOO A3288": ["HTC", "Tattoo"],
        "HTC click": ["HTC", "Tattoo"],
        "HTC X310e": ["HTC", "Titan"],
        "HTC T7373": ["HTC", "Touch Pro II"],
        "HTC ThunderBolt": ["HTC", "ThunderBolt"],
        "HTC Mecha": ["HTC", "ThunderBolt"],
        "HTC Velocity 4G": ["HTC", "Velocity 4G"],
        "HTC Wildfire": ["HTC", "Wildfire"],
        "HTC Wildfire A3333": ["HTC", "Wildfire"],
        "HTC A3366": ["HTC", "Wildfire"],
        "HTC A3380": ["HTC", "Wildfire"],
        "HTC WildfireS": ["HTC", "Wildfire S"],
        "HTC Wildfire S": ["HTC", "Wildfire S"],
        "Htc Wildfire s": ["HTC", "Wildfire S"],
        "HTC Wildfire S A510e": ["HTC", "Wildfire S"],
        "HTC Wildfire S A510b": ["HTC", "Wildfire S"],
        "HTC WildfireS A510e": ["HTC", "Wildfire S"],
        "HTC WildfireS A510b": ["HTC", "Wildfire S"],
        "htc wildfire s a510e": ["HTC", "Wildfire S"],
        "HTC Wildfire S A515c": ["HTC", "Wildfire S"],
        "HTC A510a": ["HTC", "Wildfire S"],
        "HTC A510e": ["HTC", "Wildfire S"],
        "HTC A510c": ["HTC", "Wildfire S"],
        HTCX06HT: ["HTC", "Desire"],
        "HTC A6390": ["HTC", "A6390"],
        "HTC A8180": ["HTC", "A8180"],
        "HTC PG762": ["HTC", "PG762"],
        "HTC S715e": ["HTC", "S715e"],
        "HTC S720t": ["HTC", "S720t"],
        "HTC Z510d": ["HTC", "Z510d"],
        "HTC Z560e": ["HTC", "Z560e"],
        "HTC VLE U": ["HTC", "One S"],
        "HTC VLE#U": ["HTC", "One S"],
        "HTC VIE U": ["HTC", "One S"],
        "HTC EVA UL": ["HTC", "One V"],
        "HTC ENR U": ["HTC", "One X"],
        "ENR U": ["HTC", "One X"],
        EndeavorU: ["HTC", "One X"],
        Liberty: ["HTC", "Aria"],
        Desire: ["HTC", "Desire"],
        "Desire A8181": ["HTC", "Desire"],
        "desire hd": ["HTC", "Desire HD"],
        "Desire HD": ["HTC", "Desire HD"],
        "Dedire HD": ["HTC", "Desire HD"],
        "Desire Hd (ace)": ["HTC", "Desire HD"],
        "Desire S": ["HTC", "Desire S"],
        DesireS: ["HTC", "Desire S"],
        "Desire Saga": ["HTC", "Desire S"],
        "Desire Z": ["HTC", "Desire Z"],
        Dream: ["HTC", "Dream"],
        "Droid Incredible": ["HTC", "Droid Incredible"],
        EVO: ["HTC", "EVO"],
        "Evo HD2": ["HTC", "EVO HD"],
        "Evo 3D Beats X515m": ["HTC", "EVO 3D"],
        "Evo 3D GSM": ["HTC", "EVO 3D"],
        "EVO 3D X515m": ["HTC", "EVO 3D"],
        "EVO3D X515m": ["HTC", "EVO 3D"],
        "Evo 4G": ["HTC", "EVO 4G"],
        "EVO 4G": ["HTC", "EVO 4G"],
        photon: ["HTC", "HD mini"],
        "GinDream/GinMagic": ["HTC", "Dream"],
        HD2: ["HTC", "HD2"],
        "HD7  Pro": ["HTC", "HD7 Pro"],
        Hero: ["HTC", "Hero"],
        "HERO CDMA": ["HTC", "Hero"],
        HERO200: ["HTC", "Hero 200"],
        Incredible: ["HTC", "Droid Incredible"],
        "Incredible 2": ["HTC", "Droid Incredible 2"],
        "Incredible S": ["HTC", "Incredible S"],
        "IncredibleS S710e": ["HTC", "Incredible S"],
        IncredibleS: ["HTC", "Incredible S"],
        "Inspire HD": ["HTC", "Inspire 4G"],
        "Inspire 4G": ["HTC", "Inspire 4G"],
        Legend: ["HTC", "Legend"],
        NexusHD2: ["HTC", "HD2"],
        "Nexus HD2": ["HTC", "HD2"],
        "Docomo HT-03A": ["HTC", "Magic"],
        "MIUI.us Sensation 4G": ["HTC", "Sensation 4G"],
        "SiRF Dream": ["HTC", "Dream"],
        Pyramid: ["HTC", "Sensation"],
        Sensation: ["HTC", "Sensation"],
        "Sensation Z710e": ["HTC", "Sensation"],
        "Sensation 4G": ["HTC", "Sensation"],
        "Sensation 4g": ["HTC", "Sensation"],
        "TripNiCE Pyramid": ["HTC", "Sensation"],
        "SensationXE Beats Z715e": ["HTC", "Sensation XE"],
        "SensationXL Beats X315e": ["HTC", "Sensation XL"],
        Click: ["HTC", "Tattoo"],
        Wildfire: ["HTC", "Wildfire"],
        "Wildfire S": ["HTC", "Wildfire S"],
        "Wildfire S A510e": ["HTC", "Wildfire S"],
        "Sprint APX515CKT": ["HTC", "EVO 3D"],
        "Sprint APA9292KT": ["HTC", "EVO 4G"],
        "Sprint APA7373KT": ["HTC", "EVO Shift 4G"],
        "Sprint APC715CKT": ["HTC", "EVO Design 4G"],
        A3380: ["HTC", "Wildfire"],
        A6277: ["HTC", "Hero"],
        a7272: ["HTC", "Desire Z"],
        "A7272+(HTC DesireZ)": ["HTC", "Desire Z"],
        S31HT: ["HTC", "Aria"],
        S710d: ["HTC", "Droid Incredible 2"],
        S710D: ["HTC", "Droid Incredible 2"],
        X06HT: ["HTC", "Desire"],
        "001HT": ["HTC", "Desire HD"],
        X325a: ["HTC", "One X"],
        Z520m: ["HTC", "One S"],
        Z710: ["HTC", "Sensation"],
        Z710e: ["HTC", "Sensation"],
        T9199h: ["HTC", "T9199h"],
        "HTC S610d": ["HTC", "S610d"],
        ADR6200: ["HTC", "Droid Eris"],
        ADR6300: ["HTC", "Droid Incredible"],
        ADR6325VW: ["HTC", "Merge"],
        ADR6330VW: ["HTC", "Rhyme"],
        ADR6350: ["HTC", "Droid Incredible 2"],
        ADR6400L: ["HTC", "Thunderbolt 4G"],
        "ADR6400L 4G": ["HTC", "Thunderbolt 4G"],
        "ADR6410LVW 4G": ["HTC", "Fireball"],
        ADR6425LVW: ["HTC", "Rezound"],
        "ADR6425LVW 4G": ["HTC", "Rezound"],
        "Coquettish Red": ["HTC", "Rezound"],
        PB99400: ["HTC", "Droid Incredible"],
        pcdadr6350: ["HTC", "Droid Incredible 2"],
        PC36100: ["HTC", "EVO 4G"],
        PG06100: ["HTC", "EVO Shift 4G"],
        PG41200: ["HTC", "EVO View 4G", "tablet"],
        PG86100: ["HTC", "EVO 3D"],
        PG8610000: ["HTC", "EVO 3D"],
        PH44100: ["HTC", "EVO Design 4G"],
        PJ83100: ["HTC", "One X"],
        ISW11HT: ["HTC", "EVO 4G"],
        ISW12HT: ["HTC", "EVO 3D"],
        ISW13HT: ["HTC", "J"],
        "USCCADR6275US Carrier ID 45": ["HTC", "Desire"],
        USCCADR6285US: ["HTC", "Hero S"],
        "USCCADR6325US Carrier ID 45": ["HTC", "Merge"],
        MediaPad: ["Huawei", "MediaPad", "tablet"],
        "Huawei MediaPad": ["Huawei", "MediaPad", "tablet"],
        "HUAWEI MediaPad": ["Huawei", "MediaPad", "tablet"],
        "Huawei S7-312u": ["Huawei", "MediaPad", "tablet"],
        "MediaPad 10 FHD": ["Huawei", "MediaPad", "tablet"],
        "Huawei C8500": ["Huawei", "C8500"],
        "Huawei C8500S": ["Huawei", "C8500"],
        "Huawei C8600": ["Huawei", "C8600"],
        "Huawei C8650": ["Huawei", "C8650"],
        "Huawei C8650+": ["Huawei", "C8650"],
        "Huawei C8800": ["Huawei", "IDEOS X5"],
        "Huawei C8810": ["Huawei", "Ascend G300"],
        "Huawei C8812": ["Huawei", "Ascend C8812"],
        "Huawei C8812E": ["Huawei", "Ascend C8812"],
        "Huawei C8825D": ["Huawei", "Ascend C8825D"],
        "Huawei C8860E": ["Huawei", "Honor"],
        "Huawei M835": ["Huawei", "M835"],
        "Huawei M860": ["Huawei", "Ascend"],
        "Huawei M921": ["Huawei", "M921"],
        "Huawei S8520": ["Huawei", "S8520"],
        "Huawei S8600": ["Huawei", "S8600"],
        "Huawei T8300": ["Huawei", "T8300"],
        "Huawei T8600": ["Huawei", "T8600"],
        "Huawei T8830": ["Huawei", "T8830"],
        T8830: ["Huawei", "T8830"],
        T8620: ["Huawei", "T8620"],
        "Huawei T8828": ["Huawei", "T8828"],
        "Huawei U8220": ["Huawei", "U8220"],
        "Huawei u8500": ["Huawei", "IDEOS X2"],
        "Huawei U8815": ["Huawei", "Ascend G300"],
        "Huawei U8825D": ["Huawei", "Ascend G330D"],
        "Huawei U8850": ["Huawei", "Vision"],
        "Huawei U8652": ["Huawei", "Sonic"],
        "Huawei U8800-51": ["Huawei", "IDEOS X5"],
        "Huawei U8818": ["Huawei", "Ascend G300"],
        "Huawei U9000": ["Huawei", "Ascend X"],
        "Huawei IDEOS U8500": ["Huawei", "IDEOS X2"],
        "Huawei IDEOS U8650": ["Huawei", "Sonic"],
        "Huawei IDEOS X3": ["Huawei", "IDEOS X3"],
        "Huawei Ideos X5": ["Huawei", "IDEOS X5"],
        "Huawei Ideos X5 1.12.9(ret4rt)": ["Huawei", "IDEOS X5"],
        "Huawei SONIC": ["Huawei", "Sonic"],
        "Huawei 8100-9": ["Huawei", "U8100"],
        FUSIONideos: ["Huawei", "IDEOS"],
        "Gnappo Ideos": ["Huawei", "IDEOS"],
        Ideos: ["Huawei", "IDEOS"],
        "IDEOS X5": ["Huawei", "IDEOS X5"],
        "Ideos S7": ["Huawei", "IDEOS S7", "tablet"],
        "IDEOS S7": ["Huawei", "IDEOS S7", "tablet"],
        "IDEOS S7 Slim": ["Huawei", "IDEOS S7", "tablet"],
        "Huawei S7": ["Huawei", "IDEOS S7", "tablet"],
        SONIC: ["Huawei", "Sonic"],
        "Kyivstar Aqua": ["Huawei", "Sonic"],
        "Lucky Ultra Sonic U8650": ["Huawei", "Sonic"],
        "Turkcell T20": ["Huawei", "Sonic"],
        "MTC 950": ["Huawei", "U8160"],
        "MTC 955": ["Huawei", "Sonic"],
        "MTC Evo": ["Huawei", "C8500"],
        "MTC Android": ["Huawei", "U8110"],
        S31HW: ["Huawei", "Pocket WiFi S"],
        S41HW: ["Huawei", "Pocket WiFi S II"],
        "007HW": ["Huawei", "Vision"],
        UM840: ["Huawei", "Evolution"],
        M860: ["Huawei", "Ascend"],
        M865: ["Huawei", "Ascend II"],
        M886: ["Huawei", "Glory"],
        C8150: ["Huawei", "IDEOS"],
        c8500: ["Huawei", "C8500"],
        C8500: ["Huawei", "C8500"],
        C8500S: ["Huawei", "C8500"],
        C8600: ["Huawei", "C8600"],
        c8650: ["Huawei", "C8650"],
        C8650: ["Huawei", "C8650"],
        c8800: ["Huawei", "C8800"],
        C8800: ["Huawei", "C8800"],
        c8810: ["Huawei", "Ascend G300C"],
        C8812: ["Huawei", "Ascend C8812"],
        S8600: ["Huawei", "S8600"],
        U8100: ["Huawei", "U8100"],
        U8110: ["Huawei", "U8110"],
        u8120: ["Huawei", "U8120"],
        U8120: ["Huawei", "U8120"],
        U8180: ["Huawei", "IDEOS X1"],
        U8220: ["Huawei", "Pulse"],
        U8300: ["Huawei", "U8300"],
        U8350: ["Huawei", "Boulder"],
        U8150: ["Huawei", "IDEOS"],
        U8160: ["Huawei", "U8160"],
        U8500: ["Huawei", "IDEOS X2"],
        "U8500 HiQQ": ["Huawei", "U8500 HiQQ Edition"],
        U8510: ["Huawei", "IDEOS X3"],
        u8650: ["Huawei", "Sonic"],
        U8650: ["Huawei", "Sonic"],
        "U8650-1": ["Huawei", "Sonic"],
        U8660: ["Huawei", "Sonic"],
        u8800: ["Huawei", "IDEOS X5"],
        U8800: ["Huawei", "IDEOS X5"],
        "U8800+": ["Huawei", "IDEOS X5"],
        U8800X: ["Huawei", "IDEOS X5"],
        U8800pro: ["Huawei", "IDEOS X5 Pro"],
        U8800PRO: ["Huawei", "IDEOS X5 Pro"],
        U8800Pro: ["Huawei", "IDEOS X5 Pro"],
        u8800pro: ["Huawei", "IDEOS X5 Pro"],
        "U8800 Pro": ["Huawei", "IDEOS X5 Pro"],
        U8818: ["Huawei", "Ascend G300"],
        U8850: ["Huawei", "Vision"],
        u8860: ["Huawei", "Honor"],
        U8860: ["Huawei", "Honor"],
        U9000: ["Huawei", "Ascend X"],
        U9200: ["Huawei", "Ascend P1"],
        "U9200-1": ["Huawei", "Ascend P1"],
        U9500: ["Huawei", "Ascend D1"],
        U9501L: ["Huawei", "Ascend D LTE"],
        U9510: ["Huawei", "Ascend D quad"],
        U9510E: ["Huawei", "Ascend D quad"],
        Comet: ["Huawei", "Comet"],
        GS02: ["Huawei", "Honor"],
        GS03: ["Huawei", "Ascend P1"],
        "DroniX-0.5": ["Huawei", "U8180"],
        "MTS-SP101": ["Huawei", "C8511"],
        TSP21: ["Huawei", "U8110"],
        "HYUNDAI H6": ["Hyundai", "Storm H6"],
        "iBall Slide i7011": ["iBall", "Slide i7011"],
        "NetTAB RUNE": ["IconBit", "NetTab Rune", "tablet"],
        D70W: ["Icoo", "D70W", "tablet"],
        D80: ["Icoo", "D80", "tablet"],
        "INFOBAR A01": ["iida", "INFOBAR A01"],
        M009F: ["Infotmic", "M009F"],
        AZ210A: ["Intel", "AZ210A"],
        AZ210B: ["Intel", "AZ210B"],
        AZ510: ["Intel", "AZ510"],
        greenridge: ["Intel", "Green Ridge", "tablet"],
        "INQ Cloud Touch": ["INQ", "Cloud Touch"],
        "ILT-MX100": ["iRiver", "Tab", "tablet"],
        IVIO_DE38: ["Ivio", "DE38"],
        "JY-G2": ["Jiayu", "G2"],
        "JXD S601WIFI": ["JXD", "S601 WIFI", "media"],
        A2: ["KakaTech", "A2"],
        D91: ["KK", "D91", "tablet"],
        K080: ["Kobo", "K080", "ereader"],
        A106: ["koobee", "A160"],
        "KPT A9": ["KPT", "A9"],
        "EV-S100": ["Kttech", "Take EV-S100"],
        "KM-S120": ["Kttech", "Take 2 KM-S120"],
        "KM-S200": ["TAKE", "Janus KM-S200"],
        "KM-S220": ["Kttech", "Take Tachy KM-S220"],
        "Kyobo mirasol eReader": ["Kyobo", "eReader", "ereader"],
        ISW11K: ["Kyocera", "Digno"],
        "JC-KSP8000": ["Kyocera", "Echo"],
        KSP8000: ["Kyocera", "Echo"],
        Zio: ["Kyocera", "Zio"],
        C5155: ["Kyocera", "C5155"],
        C5170: ["Kyocera", "C5170"],
        M9300: ["Kyocera", "M9300"],
        E800: ["K-Touch", "E800"],
        W606: ["K-Touch", "W606"],
        "K-Touch T619": ["K-Touch", "T619"],
        "K-Touch W619": ["K-Touch", "W619"],
        "K-Touch W650": ["K-Touch", "W650"],
        W700: ["K-Touch", "W700"],
        W800: ["K-Touch", "W800"],
        W806: ["K-Touch", "W806"],
        W808: ["K-Touch", "W808"],
        W810: ["K-Touch", "W810"],
        X900: ["Lava", "XOLO X900"],
        "Lenovo A798t": ["Lenovo", "A798t"],
        "LENOVO-Lenovo-A288t": ["Lenovo", "LePhone A288"],
        "ThinkPad Tablet": ["Lenovo", "ThinkPad Tablet", "tablet"],
        K1: ["Lenovo", "IdeaPad K1", "tablet"],
        "Ideapad S10-3T": ["Lenovo", "IdeaPad S10-3T", "tablet"],
        "S2005A-H": ["Lenovo", "S2005A"],
        "IdeaTab S2007A-D": ["Lenovo", "IdeaTab S2007A", "tablet"],
        IdeaTabV2007A: ["Lenovo", "IdeaTab V2007A", "tablet"],
        "IdeaTabV2007A-D-I": ["Lenovo", "IdeaTab V2007A", "tablet"],
        IdeaTabV2010A: ["Lenovo", "IdeaTab V2010A", "tablet"],
        "IdeaTab A2107A-H": ["Lenovo", "IdeaTab V2107A", "tablet"],
        "A1 07": ["Lenovo", "LePad", "tablet"],
        "lepad 001b": ["Lenovo", "LePad", "tablet"],
        "lepad 001n": ["Lenovo", "LePad", "tablet"],
        "3GC101": ["Lenovo", "LePhone 3GC101"],
        "Lenovo 3GC101": ["Lenovo", "LePhone 3GC101"],
        "3GW100": ["Lenovo", "LePhone 3GW100"],
        "Lenovo 3GW100": ["Lenovo", "LePhone 3GW100"],
        "3GW101": ["Lenovo", "LePhone 3GW101"],
        "Lenovo 3GW101": ["Lenovo", "LePhone 3GW101"],
        "Lephone 3GW101": ["Lenovo", "LePhone 3GW101"],
        "Lenovo A1-32AB0": ["Lenovo", "LePhone A1-32AB0"],
        "Lenovo S1-37AH0": ["Lenovo", "LePhone S1-37AH0"],
        "S1 37AHO": ["Lenovo", "LePhone S1-37AH0"],
        "Lenovo S2-38AH0": ["Lenovo", "LePhone S2-38AH0"],
        "Lenovo S2-38AT0": ["Lenovo", "LePhone S2-38AT0"],
        "Lenovo A288t": ["Lenovo", "LePhone A288"],
        "Lenovo A366t": ["Lenovo", "LePhone A366"],
        "Lenovo A390e": ["Lenovo", "LePhone A390"],
        "Lenovo A500": ["Lenovo", "LePhone A500"],
        "Lenovo A520": ["Lenovo", "LePhone A520"],
        "Lenovo A560e": ["Lenovo", "A560"],
        "Lenovo A668t": ["Lenovo", "LePhone A668"],
        "Lenovo A698t": ["Lenovo", "LePhone A698"],
        "Lenovo A750": ["Lenovo", "LePhone A750"],
        "Lenovo A780": ["Lenovo", "LePhone A780"],
        "Lenovo A789": ["Lenovo", "LePhone A789"],
        "Lenovo A790e": ["Lenovo", "LePhone A790"],
        "Lenovo P70": ["Lenovo", "LePhone P70"],
        "Lenovo P700": ["Lenovo", "LePhone P700"],
        "Lenovo S850e": ["Lenovo", "S850"],
        "Lenovo S880": ["Lenovo", "S880"],
        "Lenovo K860": ["Lenovo", "K860"],
        A30t: ["Lenovo", "A30t"],
        "Lenovo A60": ["Lenovo", "A60"],
        "Lenovo A65": ["Lenovo", "A65"],
        "Lenovo A66t": ["Lenovo", "A66t"],
        "Lenovo A68e": ["Lenovo", "A68e"],
        "Lenovo K800": ["Lenovo", "K800"],
        "IDEA TV T100": ["Lenovo", "IDEA TV", "television"],
        "IDEA TV K91": ["Lenovo", "IDEA TV", "television"],
        TC970: ["Le Pan", "TC970", "tablet"],
        LePanII: ["Le Pan", "II", "tablet"],
        "LG-C555": ["LG", "Optimus Chat"],
        "LG-C555-parrot": ["LG", "Optimus Chat"],
        "LG-C660h": ["LG", "Optimus Pro"],
        "LG-C729": ["LG", "DoublePlay"],
        "LG-C800G": ["LG", "Eclypse"],
        "LG-CX670": ["LG", "Optimus 3G"],
        "LG-E400": ["LG", "Optimus L3"],
        "LG-E400f": ["LG", "Optimus L3"],
        "LG-E510": ["LG", "Optimus Hub"],
        "LG-E510f": ["LG", "Optimus Hub"],
        "LG-E510g": ["LG", "Optimus Hub"],
        "LG-E610": ["LG", "Optimus L5"],
        "LG-E612": ["LG", "Optimus L5"],
        "LG-E612g": ["LG", "Optimus L5"],
        "LG-E615F": ["LG", "E615"],
        "LG-E617G": ["LG", "E617"],
        "LG-E720": ["LG", "Optimus Chic"],
        "LG-E720b": ["LG", "Optimus Chic"],
        "LG-E730": ["LG", "Optimus Sol"],
        "LG-E970": ["LG", "Shine"],
        "LG-F100L": ["LG", "Optimus Vu"],
        "LG-F100S": ["LG", "Optimus Vu"],
        "LG-F120K": ["LG", "Optimus LTE Tag"],
        "LG-F120L": ["LG", "Optimus LTE Tag"],
        "LG-F120S": ["LG", "Optimus LTE Tag"],
        "LG-F160K": ["LG", "Optimus LTE II"],
        "LG-F160L": ["LG", "Optimus LTE II"],
        "LG-F160S": ["LG", "Optimus LTE II"],
        "LG-F180L": ["LG", "F180L"],
        "LG-GT540": ["LG", "Optimus"],
        "LG-GT540f": ["LG", "Optimus"],
        "LG-GT540 Swift": ["LG", "Optimus"],
        "LG-GW620": ["LG", "GW620"],
        "LG-KH5200": ["LG", "Andro-1"],
        "LG-KU3700": ["LG", "Optimus One"],
        "LG-KU5400": ["LG", "PRADA 3.0"],
        "LG-KU5900": ["LG", "Optimus Black"],
        "LG-L40G": ["LG", "L40G"],
        "LG-LG855": ["LG", "Marquee"],
        "LG-LS670": ["LG", "Optimus S"],
        "LG-LS696": ["LG", "Optimus Elite"],
        "LG-LS840": ["LG", "Viper 4G"],
        "LG-LS855": ["LG", "Marquee"],
        "LG-LS860": ["LG", "'Cayenne'"],
        "LG-LS970": ["LG", "'Eclipse'"],
        "LG-LU3000": ["LG", "Optimus Mach"],
        "LG-LU3100": ["LG", "Optimus Chic"],
        "LG-LU3700": ["LG", "Optimus One"],
        "LG-LU5400": ["LG", "PRADA 3.0"],
        "LG-LU6200": ["LG", "Optimus Q2"],
        "LG-lu6200": ["LG", "Optimus Q2"],
        "LG-LU6500": ["LG", "Optimus Note"],
        "LG-LU6800": ["LG", "Optimus Big"],
        "LG-LU8300": ["LG", "Optimus Pad LTE"],
        "LG-LW690": ["LG", "Optimus C"],
        "LG-LW770": ["LG", "LW770"],
        "LG-MS690": ["LG", "Optimus M"],
        "LG-MS770": ["LG", "MS770"],
        "LG-MS840": ["LG", "Connect 4G"],
        "LG-MS910": ["LG", "Esteem"],
        "LG-MS695": ["LG", "Optimus M+"],
        "LG P350": ["LG", "Optimus Me"],
        "LG-P350": ["LG", "Optimus Me"],
        "LG-P350f": ["LG", "Optimus Me"],
        "LG-P350g": ["LG", "Optimus Me"],
        "LG-P355": ["LG", "P355"],
        "LG-P500": ["LG", "Optimus One"],
        "LG-P500h": ["LG", "Optimus One"],
        "LG-P500h-parrot": ["LG", "Optimus One"],
        "LG-P503": ["LG", "Optimus One"],
        "LG-P504": ["LG", "Optimus One"],
        "LG-P505": ["LG", "Phoenix"],
        "LG-P505R": ["LG", "Phoenix"],
        "LG-P506": ["LG", "Thrive"],
        "LG-P509": ["LG", "Optimus T"],
        "LG-P690": ["LG", "Optimus Net"],
        "LG-P693": ["LG", "P693"],
        "LG-P698": ["LG", "Optimus Net"],
        "LG-P698f": ["LG", "Optimus Net"],
        "LG-P700": ["LG", "Optimus L7"],
        "LG-P705": ["LG", "Optimus L7"],
        "LG-P705f": ["LG", "Optimus L7"],
        "LG-P705g": ["LG", "Optimus L7"],
        "LG-P708g": ["LG", "P708"],
        "LG-P720": ["LG", "Optimus Chic"],
        "LG-P720h": ["LG", "Optimus Chic"],
        "LG-P725": ["LG", "Optimus 3D Max"],
        "LG-P760": ["LG", "P760"],
        "LG-P769": ["LG", "P769"],
        "LG-P860": ["LG", "P860"],
        "LG-P870": ["LG", "P870"],
        "LG-P870F": ["LG", "P870"],
        "LG-P880": ["LG", "X3"],
        "LG-P880g": ["LG", "X3"],
        "LG-P895": ["LG", "P895"],
        "LG-P920": ["LG", "Optimus 3D"],
        "LG-P920h": ["LG", "Optimus 3D"],
        "LG-P925": ["LG", "Thrill"],
        "LG-P925g": ["LG", "Thrill"],
        "LG-P930": ["LG", "Nitro HD"],
        "LG-P936": ["LG", "Optimus LTE"],
        "LG-P940": ["LG", "PRADA 3.0"],
        "LG-P970": ["LG", "Optimus Black"],
        "LG-P970h": ["LG", "Optimus Black"],
        "LG-P990": ["LG", "Optimus 2X Speed"],
        "LG-P990h": ["LG", "Optimus 2X Speed"],
        "LG-P990hN": ["LG", "Optimus 2X Speed"],
        "LG-P990H": ["LG", "Optimus 2X Speed"],
        "LG-P993": ["LG", "Optimus 2X"],
        "LG-SU540": ["LG", "PRADA 3.0"],
        "LG-SU640": ["LG", "Optimus LTE"],
        "LG-SU660": ["LG", "Optimus 2X"],
        "LG-SU760": ["LG", "Optimus 3D"],
        "LG-SU760-Kust": ["LG", "Optimus 3D"],
        "LG-SU870": ["LG", "Optimus 3D Cube"],
        "LG-SU880": ["LG", "Optimus EX"],
        "LG-US670": ["LG", "Optimus U"],
        "LG-US730": ["LG", "US730"],
        "LG-V900": ["LG", "Optimus Pad", "tablet"],
        "LG-V905R": ["LG", "Optimus G-Slate", "tablet"],
        "LG-V909": ["LG", "Optimus G-Slate", "tablet"],
        "LG-VM670": ["LG", "Optimus V"],
        "LG-VM696": ["LG", "Optimus Elite"],
        "LG-VM701": ["LG", "Optimus Slider"],
        "LG-VS660": ["LG", "Vortex"],
        "LG-VS700": ["LG", "Enlighten"],
        "LG-VS740": ["LG", "Ally"],
        "LG-VS840": ["LG", "Connect 4G"],
        "LG-VS910": ["LG", "Revolution"],
        "lgp-970": ["LG", "Optimus Black"],
        E900: ["LG", "Optimus 7"],
        GT540: ["LG", "Optimus GT540"],
        GW620: ["LG", "GW620"],
        KU9500: ["LG", "Optimus Z"],
        LGC660: ["LG", "Optimus Pro"],
        LGL45C: ["LG", "Optimus Net"],
        LGL55C: ["LG", "Optimus Q"],
        LU2300: ["LG", "Optimus Q"],
        LS670: ["LG", "Optimus S"],
        P940: ["LG", "PRADA 3.0"],
        P990: ["LG", "Optimus 2X Speed"],
        "USCC-US730": ["LG", "US730"],
        "USCC-US760": ["LG", "Genesis"],
        VM670: ["LG", "Optimus V"],
        "VS840 4G": ["LG", "Connect 4G"],
        "VS900-4G": ["LG", "VS900"],
        "VS910 4G": ["LG", "Revolution 4G"],
        "VS920 4G": ["LG", "Spectrum 4G"],
        "VS930 4G": ["LG", "VS930"],
        "VS950 4G": ["LG", "VS950"],
        "L-01D": ["LG", "Optimus LTE"],
        "L-02D": ["LG", "PRADA phone"],
        "L-04C": ["LG", "Optimus Chat"],
        "L-05D": ["LG", "Optimus it"],
        "L-06C": ["LG", "Optimus Pad", "tablet"],
        "L-06D": ["LG", "Optimus Vu"],
        "L-07C": ["LG", "Optimus Bright"],
        "LG-Eve": ["LG", "Eve"],
        "LG-Optimus One P500": ["LG", "Optimus One"],
        "LG-Optimus 2X": ["LG", "Optimus 2X"],
        "LG-GT540 Optimus": ["LG", "Optimus"],
        "LG-Optimus Black": ["LG", "Optimus Black"],
        Ally: ["LG", "Ally"],
        Optimus: ["LG", "Optimus"],
        "Optimus Me": ["LG", "Optimus Me"],
        "optimus me p350": ["LG", "Optimus Me"],
        "Optimus 2X": ["LG", "Optimus 2X"],
        "Optimus 2x": ["LG", "Optimus 2X"],
        IS11LG: ["LG", "Optimus X"],
        Vortex: ["LG", "Vortex"],
        "LDK-ICK v1.4": ["LG", "Esteem"],
        T6: ["Malata", "Zpad T6", "tablet"],
        "Malata SMBA1002": ["Malata", "Tablet SMB-A1002", "tablet"],
        STM712HCZ: ["Mediacom", "SmartPad 712c", "tablet"],
        STM803HC: ["Mediacom", "SmartPad 810c", "tablet"],
        "Mediacom 810C": ["Mediacom", "SmartPad 810c", "tablet"],
        Smartpad810c: ["Mediacom", "SmartPad 810c", "tablet"],
        SmartPad810c: ["Mediacom", "SmartPad 810c", "tablet"],
        MP810C: ["Mediacom", "SmartPad 810c", "tablet"],
        MP907C: ["Mediacom", "SmartPad 907c", "tablet"],
        MTK6516: ["Mediatek", "MTK6516"],
        "LIFETAB S9512": ["Medion", "Lifetab S9512", "tablet"],
        "LIFETAB P9514": ["Medion", "Lifetab P9514", "tablet"],
        "MD LIFETAB P9516": ["Medion", "Lifetab P9516", "tablet"],
        "MEDION LIFE P4310": ["Medion", "Life P4310"],
        M8: ["Meizu", "M8"],
        M9: ["Meizu", "M9"],
        M040: ["Meizu", "M040"],
        "M9-unlocked": ["Meizu", "M9"],
        "meizu m9": ["Meizu", "M9"],
        "MEIZU M9": ["Meizu", "M9"],
        "MEIZU MX": ["Meizu", "MX"],
        M030: ["Meizu", "MX M030"],
        M031: ["Meizu", "MX M031"],
        M032: ["Meizu", "MX M032"],
        Slidepad: ["Memup", "Slidepad", "tablet"],
        A45: ["Micromax", "A45 Punk"],
        "Micromax A50": ["Micromax", "A50 Ninja"],
        "Micromax A60": ["Micromax", "Andro A60"],
        "Micromax A70": ["Micromax", "Andro A70"],
        "P300(Funbook)": ["Micromax", "Funbook P300", "tablet"],
        AT735: ["Moinstone", "AT735", "tablet"],
        A853: ["Motorola", "Milestone"],
        A953: ["Motorola", "Milestone 2"],
        A1680: ["Motorola", "MOTO A1680"],
        ET1: ["Motorola", "ET1 Enterprise Tablet", "tablet"],
        MB200: ["Motorola", "CLIQ"],
        MB300: ["Motorola", "BACKFLIP"],
        MB501: ["Motorola", "CLIQ XT"],
        MB502: ["Motorola", "CHARM"],
        MB511: ["Motorola", "FLIPOUT"],
        MB520: ["Motorola", "BRAVO"],
        MB525: ["Motorola", "DEFY"],
        "MB525+": ["Motorola", "DEFY"],
        "MB525 for me": ["Motorola", "DEFY"],
        MB526: ["Motorola", "DEFY+"],
        MB611: ["Motorola", "CLIQ 2"],
        MB612: ["Motorola", "XPRT"],
        MB632: ["Motorola", "PRO+"],
        MB855: ["Motorola", "PHOTON 4G"],
        MB860: ["Motorola", "ATRIX"],
        MB861: ["Motorola", "ATRIX"],
        mb861: ["Motorola", "ATRIX"],
        MB865: ["Motorola", "ATRIX 2"],
        MB870: ["Motorola", "Droid X2"],
        MB886: ["Motorola", "DINARA"],
        ME501: ["Motorola", "CLIQ XT"],
        ME511: ["Motorola", "FLIPOUT"],
        me525: ["Motorola", "MOTO ME525"],
        Me525: ["Motorola", "MOTO ME525"],
        ME525: ["Motorola", "MOTO ME525"],
        "ME525+": ["Motorola", "MOTO ME525"],
        ME600: ["Motorola", "BACKFLIP"],
        ME632: ["Motorola", "PRO+"],
        ME722: ["Motorola", "Milestone 2"],
        ME811: ["Motorola", "Droid X"],
        ME860: ["Motorola", "ATRIX"],
        ME863: ["Motorola", "Milestone 3"],
        ME865: ["Motorola", "ATRIX 2"],
        MT620: ["Motorola", "MOTO MT620"],
        MT620t: ["Motorola", "MOTO MT620"],
        MT716: ["Motorola", "MOTO MT716"],
        MT810: ["Motorola", "MOTO MT810"],
        MT870: ["Motorola", "MOTO MT870"],
        MT917: ["Motorola", "MT917"],
        MZ505: ["Motorola", "XOOM Family Edition", "tablet"],
        MZ600: ["Motorola", "XOOM 4G LTE", "tablet"],
        MZ601: ["Motorola", "XOOM 3G", "tablet"],
        MZ602: ["Motorola", "XOOM 4G LTE", "tablet"],
        MZ603: ["Motorola", "XOOM 3G", "tablet"],
        MZ604: ["Motorola", "XOOM WiFi", "tablet"],
        MZ605: ["Motorola", "XOOM 3G", "tablet"],
        MZ606: ["Motorola", "XOOM WiFi", "tablet"],
        MZ607: ["Motorola", "XOOM 2 WiFi Media Edition", "tablet"],
        MZ609: ["Motorola", "Droid XYBOARD 8.2", "tablet"],
        "MZ609 4G": ["Motorola", "Droid XYBOARD 8.2", "tablet"],
        MZ615: ["Motorola", "XOOM 2 WiFi", "tablet"],
        MZ617: ["Motorola", "Droid XYBOARD 10.1", "tablet"],
        "MZ617 4G": ["Motorola", "Droid XYBOARD 10.1", "tablet"],
        WX435: ["Motorola", "TRIUMPH WX435"],
        WX445: ["Motorola", "CITRUS WX445"],
        XT300: ["Motorola", "SPICE"],
        XT301: ["Motorola", "MOTO XT301"],
        XT311: ["Motorola", "FIRE"],
        XT316: ["Motorola", "MOTO XT316"],
        XT319: ["Motorola", "MOTO XT319"],
        XT390: ["Motorola", "MOTO XT390"],
        XT320: ["Motorola", "DEFY Mini"],
        XT321: ["Motorola", "DEFY Mini"],
        XT500: ["Motorola", "MOTO XT500"],
        "xt-500": ["Motorola", "MOTO XT500"],
        XT502: ["Motorola", "QUENCH XT5"],
        XT530: ["Motorola", "FIRE XT"],
        XT531: ["Motorola", "FIRE XT"],
        XT532: ["Motorola", "XT532"],
        XT535: ["Motorola", "DEFY"],
        XT550: ["Motorola", "XT550"],
        XT556: ["Motorola", "XT556"],
        XT603: ["Motorola", "ADMIRAL"],
        XT610: ["Motorola", "Droid Pro"],
        XT615: ["Motorola", "MOTO XT615"],
        XT626: ["Motorola", "MOTO XT626"],
        XT681: ["Motorola", "MOTO XT681"],
        XT682: ["Motorola", "Droid 3"],
        XT685: ["Motorola", "MOTO XT685"],
        XT687: ["Motorola", "ATRIX TV"],
        XT701: ["Motorola", "XT701"],
        XT702: ["Motorola", "MOTO XT702"],
        XT711: ["Motorola", "MOTO XT711"],
        XT720: ["Motorola", "Milestone"],
        XT875: ["Motorola", "Droid Bionic"],
        XT800: ["Motorola", "MOTO XT800"],
        "XT800+": ["Motorola", "MOTO XT800"],
        XT800W: ["Motorola", "MOTO Glam"],
        XT806: ["Motorola", "MOTO XT806"],
        XT860: ["Motorola", "Milestone 3"],
        XT862: ["Motorola", "Droid 3"],
        XT882: ["Motorola", "MOTO XT882"],
        XT883: ["Motorola", "Milestone 3"],
        XT889: ["Motorola", "XT889"],
        XT897: ["Motorola", "Droid 4"],
        XT901: ["Motorola", "RAZR"],
        XT910: ["Motorola", "RAZR"],
        XT910K: ["Motorola", "RAZR"],
        XT910S: ["Motorola", "RAZR"],
        "XT910 4G": ["Motorola", "RAZR"],
        XT912: ["Motorola", "Droid RAZR"],
        XT923: ["Motorola", "Droid RAZR HD"],
        XT925: ["Motorola", "Droid RAZR HD"],
        XT926: ["Motorola", "Droid RAZR"],
        "XT926 4G": ["Motorola", "Droid RAZR"],
        XT928: ["Motorola", "XT928"],
        "Atrix 2": ["Motorola", "ATRIX 2"],
        "Atrix 4g": ["Motorola", "ATRIX 4G"],
        "Atrix 4G": ["Motorola", "ATRIX 4G"],
        "Atrix 4G ME860": ["Motorola", "ATRIX 4G"],
        CLIQ: ["Motorola", "CLIQ"],
        "CLIQ XT": ["Motorola", "CLIQ XT"],
        CLIQ2: ["Motorola", "CLIQ 2"],
        Corvair: ["Motorola", "Corvair", "tablet"],
        DEFY: ["Motorola", "DEFY"],
        "Defy+": ["Motorola", "DEFY+"],
        "Defy Plus": ["Motorola", "DEFY+"],
        Devour: ["Motorola", "Devour"],
        Dext: ["Motorola", "Dext"],
        Droid: ["Motorola", "Droid"],
        DROID: ["Motorola", "Droid"],
        DROID2: ["Motorola", "Droid 2"],
        "DROID2 GLOBAL": ["Motorola", "Droid 2"],
        "DROID2 Global": ["Motorola", "Droid 2"],
        Droid2Global: ["Motorola", "Droid 2"],
        "DROID 2": ["Motorola", "Droid 2"],
        DROID3: ["Motorola", "Droid 3"],
        DROID4: ["Motorola", "Droid 4"],
        "DROID4 4G": ["Motorola", "Droid 4"],
        "DROID Pro": ["Motorola", "Droid Pro"],
        "DROID BIONIC": ["Motorola", "Droid Bionic"],
        "DROID BIONIC 4G": ["Motorola", "Droid Bionic"],
        "DROID BIONIC XT875 4G": ["Motorola", "Droid Bionic"],
        DROIDRAZR: ["Motorola", "Droid RAZR"],
        "Droid Razr": ["Motorola", "Droid RAZR"],
        "DROID RAZR": ["Motorola", "Droid RAZR"],
        "DROID RAZR 4G": ["Motorola", "Droid RAZR"],
        "DROID SPYDER": ["Motorola", "Droid RAZR"],
        "DROID RAZR HD": ["Motorola", "Droid RAZR HD"],
        "DROID RAZR HD 4G": ["Motorola", "Droid RAZR HD"],
        DroidX: ["Motorola", "Droid X"],
        DROIDX: ["Motorola", "Droid X"],
        "droid x": ["Motorola", "Droid X"],
        "Droid X": ["Motorola", "Droid X"],
        "DROID X": ["Motorola", "Droid X"],
        "DROID X2": ["Motorola", "Droid X2"],
        Electrify: ["Motorola", "Electrify"],
        "Milestone XT720": ["Motorola", "Milestone"],
        "Milestone Xt720": ["Motorola", "Milestone"],
        Milestone: ["Motorola", "Milestone"],
        "A853 Milestone": ["Motorola", "Milestone"],
        "Milestone X": ["Motorola", "Milestone X"],
        "Milestone X2": ["Motorola", "Milestone X2"],
        MotoroiX: ["Motorola", "Droid X"],
        "Moto Backflip": ["Motorola", "BACKFLIP"],
        RAZR: ["Motorola", "RAZR"],
        Triumph: ["Motorola", "TRIUMPH"],
        "Opus One": ["Motorola", "i1"],
        Photon: ["Motorola", "PHOTON"],
        "Photon 4G": ["Motorola", "PHOTON 4G"],
        XOOM: ["Motorola", "XOOM", "tablet"],
        Xoom: ["Motorola", "XOOM", "tablet"],
        "XOOM 2": ["Motorola", "XOOM 2", "tablet"],
        "XOOM 2 ME": ["Motorola", "XOOM 2", "tablet"],
        "XOOM MZ606": ["Motorola", "XOOM WiFi", "tablet"],
        ISW11M: ["Motorola", "PHOTON"],
        IS12M: ["Motorola", "RAZR"],
        MOTWX435KT: ["Motorola", "TRIUMPH"],
        "X3-Ice MIUI XT720 Memorila Classics": ["Motorola", "Milestone"],
        "NABI-A": ["Nabi", "Kids tablet", "tablet"],
        Newpad: ["Newsmy", "Newpad", "tablet"],
        "Newpad-K97": ["Newsmy", "Newpad K97", "tablet"],
        "Newpad P9": ["Newsmy", "Newpad P9", "tablet"],
        "M-PAD N8": ["Newsmy", "M-pad N8", "tablet"],
        "LT-NA7": ["NEC", "LT-NA7"],
        "N-01D": ["NEC", "MEDIAS PP N-01D"],
        "N-04C": ["NEC", "MEDIAS N-04C"],
        "N-04D": ["NEC", "MEDIAS LTE N-04D"],
        "N-05D": ["NEC", "MEDIAS ES N-05D"],
        "N-06C": ["NEC", "MEDIAS WP N-06C"],
        "N-06D": ["NEC", "MEDIAS Tab N-06D", "tablet"],
        "N-07D": ["NEC", "MEDIAS X N-07D"],
        "101N": ["NEC", "MEDIAS CH Softbank 101N"],
        IS11N: ["NEC", "MEDIAS BR IS11N"],
        "Nexian NX-A890": ["Nexian", "Journey"],
        "NX-A891": ["Nexian", "Ultra Journey"],
        M726HC: ["Nextbook", "Premium 7", "ereader"],
        NXM726HN: ["Nextbook", "Premium 7", "ereader"],
        NXM803HD: ["Nextbook", "Premium 8", "ereader"],
        DATAM803HC: ["Nextbook", "Premium 8", "ereader"],
        NXM901: ["Nextbook", "Next 3", "ereader"],
        "NGM Vanity Smart": ["NGM", "Vanity Smart"],
        "Nokia N9": ["Nokia", "N9"],
        "Nokia N900": ["Nokia", "N900"],
        Lumia800: ["Nokia", "Lumia 800"],
        "Lumia 900": ["Nokia", "Lumia 900"],
        "Notion Ink ADAM": ["Notion Ink", "ADAM", "tablet"],
        "P4D SIRIUS": ["Nvsbl", "P4D SIRIUS", "tablet"],
        "P4D Sirius": ["Nvsbl", "P4D SIRIUS", "tablet"],
        EFM710A: ["Oblio", "Mint 7x", "tablet"],
        "ODYS-Xpress": ["Odys", "Xpress", "tablet"],
        "Olivetti Olipad 100": ["Olivetti", "Olipad 100", "tablet"],
        OP110: ["Olivetti", "Olipad 110", "tablet"],
        "ONDA MID": ["Onda", "MID", "tablet"],
        VX580A: ["Onda", "VX580A", "tablet"],
        VX610A: ["Onda", "VX610A", "tablet"],
        TQ150: ["Onda", "TQ150"],
        N2T: ["ONN", "N2T", "tablet"],
        Renesas: ["Opad", "Renesas", "tablet"],
        "renesas emev": ["Opad", "Renesas", "tablet"],
        X903: ["Oppo", "Find Me X903"],
        X905: ["Oppo", "Find 3 X905"],
        R805: ["Oppo", "R805"],
        R801: ["Oppo", "R801"],
        R811: ["Oppo", "R811"],
        X909: ["Oppo", "X909"],
        OPPOR801: ["Oppo", "R801"],
        OPPOX905: ["Oppo", "Find 3 X905"],
        OPPOX907: ["Oppo", "Find 3 X907"],
        X907: ["Oppo", "Find 3 X907"],
        X9015: ["Oppo", "Find X9015"],
        OPPOX9017: ["Oppo", "Finder X9017"],
        OPPOU701: ["Oppo", "OPPOU701"],
        OPPOR807: ["Oppo", "Real R807"],
        OPPOR805: ["Oppo", "Real R805"],
        R807: ["Oppo", "Real R807"],
        OPPOT703: ["Oppo", "T703"],
        "P-01D": ["Panasonic", "P-01D"],
        "P-02D": ["Panasonic", "Lumix Phone"],
        "P-04D": ["Panasonic", "Eluga"],
        "P-07C": ["Panasonic", "P-07C"],
        dL1: ["Panasonic", "Eluga dL1"],
        "101P": ["Panasonic", "Lumix Phone"],
        "JT-H580VT": ["Panasonic", "BizPad 7", "tablet"],
        "JT-H581VT": ["Panasonic", "BizPad 10", "tablet"],
        "FZ-A1A": ["Panasonic", "Toughpad", "tablet"],
        pandigital9hr: ["Pandigital", "9HR", "tablet"],
        pandigital9hr2: ["Pandigital", "9HR2", "tablet"],
        pandigitalopc1: ["Pandigital", "OPC1", "tablet"],
        pandigitalopp1: ["Pandigital", "OPP1", "tablet"],
        pandigitalp1hr: ["Pandigital", "p1hr", "tablet"],
        "IM-A600S": ["Pantech", "SIRIUS Ã�Â±"],
        "IM-A630K": ["Pantech", "SKY Izar"],
        "IM-A690L": ["Pantech", "SKY"],
        "IM-A690S": ["Pantech", "SKY"],
        "IM-A710K": ["Pantech", "SKY Vega Xpress"],
        "IM-A720L": ["Pantech", "SKY Vega Xpress"],
        "IM-A725L": ["Pantech", "SKY Vega X+"],
        "IM-A730s": ["Pantech", "SKY Vega S"],
        "IM-A730S": ["Pantech", "SKY Vega S"],
        "IM-A750K": ["Pantech", "SKY Mirach A"],
        "IM-A760S": ["Pantech", "SKY Vega Racer"],
        "IM-A770K": ["Pantech", "SKY Vega Racer"],
        "IM-A780L": ["Pantech", "SKY Vega Racer"],
        "IM-A800S": ["Pantech", "SKY Vega LTE"],
        "IM-A810K": ["Pantech", "SKY Vega LTE M"],
        "IM-A810S": ["Pantech", "SKY Vega LTE M"],
        "IM-A820L": ["Pantech", "SKY Vega LTE EX"],
        "IM-A830K": ["Pantech", "SKY Vega Racer 2"],
        "IM-A830L": ["Pantech", "SKY Vega Racer 2"],
        "IM-A830S": ["Pantech", "SKY Vega Racer 2"],
        "IM-A840S": ["Pantech", "SKY Vega S5"],
        "IM-A850K": ["Pantech", "IM-A850K"],
        "IM-T100K": ["Pantech", "SKY Vega No. 5", "tablet"],
        IS06: ["Pantech", "SIRIUS Ã�Â±"],
        ADR8995: ["Pantech", "Breakout"],
        "ADR8995 4G": ["Pantech", "Breakout"],
        "ADR910L 4G": ["Pantech", "ADR910L"],
        PantechP4100: ["Pantech", "Element", "tablet"],
        PantechP8000: ["Pantech", "Crossover"],
        PantechP8010: ["Pantech", "P8010"],
        PantechP9060: ["Pantech", "Pocket"],
        PantechP9070: ["Pantech", "Burst"],
        "SKY IM-A600S": ["Pantech", "SIRIUS Ã�Â±"],
        "SKY IM-A630K": ["Pantech", "SKY Izar"],
        "SKY IM-A650S": ["Pantech", "SKY Vega"],
        IS11PT: ["Pantech", "Mirach IS11PT"],
        PAT712W: ["Perfeo", "PAT712W", "tablet"],
        X7G: ["Pearl", "Touchlet X7G", "tablet"],
        FWS810: ["PHICOMM", "FWS810"],
        "Philips PI5000": ["Philips", "PI5000", "tablet"],
        PI7000: ["Philips", "PI7000", "tablet"],
        "Philips W626": ["Philips", "W626"],
        "Philips W632": ["Philips", "W632"],
        MOMO: ["Ployer", "MOMO", "tablet"],
        MOMO15: ["Ployer", "MOMO15", "tablet"],
        "PocketBook A7": ["PocketBook", "A7", "tablet"],
        "PocketBook A10": ["PocketBook", "A10", "tablet"],
        "Mobii 7": ["Point Of View", "Mobii 7", "tablet"],
        PMP3384BRU: ["Prestigio", "Multipad 3384", "tablet"],
        TB07FTA: ["Positivo", "TB07FTA", "tablet"],
        "QW TB-1207": ["Qware", "Pro3", "tablet"],
        "W6HD ICS": ["Ramos", "W6HD", "tablet"],
        w10: ["Ramos", "W10", "tablet"],
        W10: ["Ramos", "W10", "tablet"],
        "w10 v2.0": ["Ramos", "W10 v2.0", "tablet"],
        "W10 V2.0": ["Ramos", "W10 v2.0", "tablet"],
        T11AD: ["Ramos", "T11AD", "tablet"],
        "T11AD.FE": ["Ramos", "T11AD", "tablet"],
        PlayBook: ["RIM", "BlackBerry PlayBook", "tablet"],
        "RBK-490": ["Ritmix", "RBK-490", "tablet"],
        A8HD: ["Saayi", "Dropad A8HD", "tablet"],
        "GT-S7568": ["Samsung", "S7568"],
        "Galaxy Nexus": ["Samsung", "Galaxy Nexus"],
        "GT-B5330": ["Samsung", "GT-B5330"],
        "GT-B5510": ["Samsung", "Galaxy Y Pro"],
        "GT-B5510B": ["Samsung", "Galaxy Y Pro"],
        "GT-B5510L": ["Samsung", "Galaxy Y Pro"],
        "GT-B5512": ["Samsung", "Galaxy Y Pro Duos"],
        "GT-B7510": ["Samsung", "Galaxy Pro"],
        "GT-B7510L": ["Samsung", "Galaxy Pro"],
        "GT-I5500": ["Samsung", "Galaxy 5"],
        "GT-I5500B": ["Samsung", "Galaxy 5"],
        "GT-I5500L": ["Samsung", "Galaxy 5"],
        "GT-I5500M": ["Samsung", "Galaxy 5"],
        "GT-I5500-MR3": ["Samsung", "Galaxy 5"],
        "GT-I5503": ["Samsung", "Galaxy 5"],
        "GT-I5508": ["Samsung", "Galaxy 5"],
        "GT-I5510": ["Samsung", "Galaxy 551"],
        "GT-I5510L": ["Samsung", "Galaxy 551"],
        "GT-I5510M": ["Samsung", "Galaxy 551"],
        "GT-I5510T": ["Samsung", "Galaxy 551"],
        "GT-I5700": ["Samsung", "Galaxy Spica"],
        "GT-I5700L": ["Samsung", "Galaxy Spica"],
        "GT-I5800": ["Samsung", "Galaxy Apollo"],
        "GT-I5800D": ["Samsung", "Galaxy Apollo"],
        "GT-I5800L": ["Samsung", "Galaxy Apollo"],
        "GT-I5801": ["Samsung", "Galaxy Apollo"],
        "GT-I6500U": ["Samsung", "Saturn"],
        "GT-I8000": ["Samsung", "Omnia 2"],
        "GT-I8150": ["Samsung", "Galaxy W"],
        "GT-I8150B": ["Samsung", "Galaxy W"],
        "GT-I8160": ["Samsung", "Galaxy Ace 2"],
        "GT-I8160L": ["Samsung", "Galaxy Ace 2"],
        "GT-I8160P": ["Samsung", "Galaxy Ace 2"],
        "GT-I8320": ["Samsung", "H1"],
        "GT-I8520": ["Samsung", "Galaxy Beam"],
        "GT-I8530": ["Samsung", "Galaxy Beam"],
        "GT-I8250": ["Samsung", "Galaxy Beam"],
        "GT-i9000": ["Samsung", "Galaxy S"],
        "GT-I9000": ["Samsung", "Galaxy S"],
        "GT-I9000B": ["Samsung", "Galaxy S"],
        "GT-I9000M": ["Samsung", "Galaxy S Vibrant"],
        "GT-I9000T": ["Samsung", "Galaxy S"],
        "GT-I9001": ["Samsung", "Galaxy S Plus"],
        "GT-I9003": ["Samsung", "Galaxy SL"],
        "GT-I9003L": ["Samsung", "Galaxy SL"],
        "GT-I9008": ["Samsung", "Galaxy S"],
        "GT-I9008L": ["Samsung", "Galaxy S"],
        "GT-I9010": ["Samsung", "Galaxy S Giorgio Armani"],
        "GT-I9018": ["Samsung", "Galaxy GT-I9018"],
        "GT-I9070": ["Samsung", "Galaxy S Advance"],
        "GT-I9070P": ["Samsung", "Galaxy S Advance"],
        "GT-I9082": ["Samsung", "Galaxy Grand DUOS"],
        "GT-I9088": ["Samsung", "Galaxy S"],
        "GT-i9100": ["Samsung", "Galaxy S II"],
        "GT-I9100": ["Samsung", "Galaxy S II"],
        "GT-I9100G": ["Samsung", "Galaxy S II"],
        "GT-I9100M": ["Samsung", "Galaxy S II"],
        "GT-I9100T": ["Samsung", "Galaxy S II"],
        "GT-I9100P": ["Samsung", "Galaxy S II"],
        "GT-I9103": ["Samsung", "Galaxy R"],
        "GT-I9108": ["Samsung", "Galaxy S II"],
        "GT-I9210": ["Samsung", "Galaxy S II LTE"],
        "GT-I9210T": ["Samsung", "Galaxy S II LTE"],
        "GT-I9220": ["Samsung", "Galaxy Note"],
        "GT-I9228": ["Samsung", "Galaxy Note"],
        "GT-I9250": ["Samsung", "Galaxy Nexus"],
        "GT-I9250 EUR XX": ["Samsung", "Galaxy Nexus"],
        "GT-I9260": ["Samsung", "Galaxy Premier"],
        "GT-I9300": ["Samsung", "Galaxy S III"],
        "GT-I9300T": ["Samsung", "Galaxy S III"],
        "GT-I9303T": ["Samsung", "Galaxy S III"],
        "GT-I9308": ["Samsung", "Galaxy S III"],
        "GT-I9500": ["Samsung", "Galaxy GT-I9500"],
        "GT-I9800": ["Samsung", "Galaxy GT-I9800"],
        "GT-N7000": ["Samsung", "Galaxy Note"],
        "GT-N7000B": ["Samsung", "Galaxy Note"],
        "GT-N7100": ["Samsung", "Galaxy Note II"],
        "GT-N7102": ["Samsung", "Galaxy Note II"],
        "GT-N8000": ["Samsung", "Galaxy Note 10.1"],
        "GT-N8010": ["Samsung", "Galaxy Note 10.1"],
        "GT-P1000": ["Samsung", "Galaxy Tab", "tablet"],
        "GT-P1000L": ["Samsung", "Galaxy Tab", "tablet"],
        "GT-P1000M": ["Samsung", "Galaxy Tab", "tablet"],
        "GT-P1000N": ["Samsung", "Galaxy Tab", "tablet"],
        "GT-P1000T": ["Samsung", "Galaxy Tab", "tablet"],
        "GT-P1000 Tablet": ["Samsung", "Galaxy Tab", "tablet"],
        "GT-P1010": ["Samsung", "Galaxy Tab", "tablet"],
        "GT-P3100": ["Samsung", "Galaxy Tab 2 (7.0)", "tablet"],
        "GT-P3100B": ["Samsung", "Galaxy Tab 2 (7.0)", "tablet"],
        "GT-P3110": ["Samsung", "Galaxy Tab 2 (7.0)", "tablet"],
        "GT-P3113": ["Samsung", "Galaxy Tab 2 (7.0)", "tablet"],
        "GT-P5100": ["Samsung", "Galaxy Tab 2 (10.1)", "tablet"],
        "GT-P5110": ["Samsung", "Galaxy Tab 2 (10.1)", "tablet"],
        "GT-P5113": ["Samsung", "Galaxy Tab 2 (10.1)", "tablet"],
        "GT-P6200": ["Samsung", "Galaxy Tab 7.0 Plus", "tablet"],
        "GT-P6200L": ["Samsung", "Galaxy Tab 7.0 Plus", "tablet"],
        "GT-P6201": ["Samsung", "Galaxy Tab 7.0 Plus N", "tablet"],
        "GT-P6210": ["Samsung", "Galaxy Tab 7.0 Plus", "tablet"],
        "GT-P6211": ["Samsung", "Galaxy Tab 7.0 Plus N", "tablet"],
        "GT-P6800": ["Samsung", "Galaxy Tab 7.7", "tablet"],
        "GT-P6810": ["Samsung", "Galaxy Tab 7.7", "tablet"],
        "GT-P7100": ["Samsung", "Galaxy Tab 10.1V", "tablet"],
        "GT-P7300": ["Samsung", "Galaxy Tab 8.9", "tablet"],
        "GT-P7300B": ["Samsung", "Galaxy Tab 8.9", "tablet"],
        "GT-P7310": ["Samsung", "Galaxy Tab 8.9", "tablet"],
        "GT-P7320": ["Samsung", "Galaxy Tab 8.9", "tablet"],
        "GT-P7320T": ["Samsung", "Galaxy Tab 8.9", "tablet"],
        "GT-P7500": ["Samsung", "Galaxy Tab 10.1", "tablet"],
        "GT-P7500D": ["Samsung", "Galaxy Tab 10.1", "tablet"],
        "GT-P7500R": ["Samsung", "Galaxy Tab 10.1", "tablet"],
        "GT-P7500V": ["Samsung", "Galaxy Tab 10.1", "tablet"],
        "GT-P7501": ["Samsung", "Galaxy Tab 10.1N", "tablet"],
        "GT-P7510": ["Samsung", "Galaxy Tab 10.1", "tablet"],
        "GT-P7511": ["Samsung", "Galaxy Tab 10.1N", "tablet"],
        "GT-S5300": ["Samsung", "Galaxy Pocket"],
        "GT-S5360": ["Samsung", "Galaxy Y"],
        "GT-S5360B": ["Samsung", "Galaxy Y"],
        "GT-S5360L": ["Samsung", "Galaxy Y"],
        "GT-S5363": ["Samsung", "Galaxy Y"],
        "GT-S5367": ["Samsung", "Galaxy Y TV"],
        "GT-S5368": ["Samsung", "GT-S5368"],
        "GT-S5369": ["Samsung", "Galaxy Y"],
        "GT-S5570": ["Samsung", "Galaxy Mini"],
        "GT-S5570B": ["Samsung", "Galaxy Mini"],
        "GT-S5570I": ["Samsung", "Galaxy Mini"],
        "GT-S5570L": ["Samsung", "Galaxy Mini"],
        "GT-S5578": ["Samsung", "Galaxy Mini"],
        "GT-S5660": ["Samsung", "Galaxy Gio"],
        "GT-S5660M": ["Samsung", "Galaxy Gio"],
        "GT-S5660V": ["Samsung", "Galaxy Gio"],
        "GT-S5670": ["Samsung", "Galaxy Fit"],
        "GT-S5670B": ["Samsung", "Galaxy Fit"],
        "GT-S5670L": ["Samsung", "Galaxy Fit"],
        "GT-S5690": ["Samsung", "Galaxy Xcover"],
        "GT-S5690L": ["Samsung", "Galaxy Xcover"],
        "GT-S5820": ["Samsung", "Galaxy Ace"],
        "GT-S5830": ["Samsung", "Galaxy Ace"],
        "GT-S5830B": ["Samsung", "Galaxy Ace"],
        "GT-S5830C": ["Samsung", "Galaxy Ace"],
        "GT-S5830D": ["Samsung", "Galaxy Ace"],
        "GT-S5830D-parrot": ["Samsung", "Galaxy Ace"],
        "GT-S5830i": ["Samsung", "Galaxy Ace"],
        "GT-S5830L": ["Samsung", "Galaxy Ace"],
        "GT-S5830M": ["Samsung", "Galaxy Ace"],
        "GT-S5830T": ["Samsung", "Galaxy Ace"],
        "GT-S5838": ["Samsung", "Galaxy Ace"],
        "GT-S5839i": ["Samsung", "Galaxy Ace"],
        "GT-S6102": ["Samsung", "Galaxy Y Duos"],
        "GT-S6102B": ["Samsung", "Galaxy Y Duos"],
        "GT-S6500": ["Samsung", "Galaxy Mini 2"],
        "GT-S6500D": ["Samsung", "Galaxy Mini 2"],
        "GT-S6702": ["Samsung", "GT-S6702"],
        "GT-S6802": ["Samsung", "Galaxy Ace Duos"],
        "GT-S7500": ["Samsung", "Galaxy Ace Plus"],
        "GT-S7500L": ["Samsung", "Galaxy Ace Plus"],
        "GT-S7500W": ["Samsung", "Galaxy Ace Plus"],
        "GT-T959": ["Samsung", "Galaxy S Vibrant"],
        "SCH-i509": ["Samsung", "Galaxy Y"],
        "SCH-i559": ["Samsung", "Galaxy Pop"],
        "SCH-i569": ["Samsung", "Galaxy Gio"],
        "SCH-i579": ["Samsung", "Galaxy Ace"],
        "SCH-i589": ["Samsung", "Galaxy Ace Duos"],
        "SCH-i705 4G": ["Samsung", "Galaxy Tab 2 (7.0)", "tablet"],
        "SCH-i809": ["Samsung", "SCH-i809"],
        "SCH-i889": ["Samsung", "Galaxy Note"],
        "SCH-i909": ["Samsung", "Galaxy S"],
        "SCH-i919": ["Samsung", "SCH-i919"],
        "SCH-i929": ["Samsung", "SCH-i929"],
        "SCH-I100": ["Samsung", "Gem"],
        "SCH-I110": ["Samsung", "Illusion"],
        "SCH-I400": ["Samsung", "Continuum"],
        "SCH-I405": ["Samsung", "Stratosphere"],
        "SCH-I405 4G": ["Samsung", "Stratosphere"],
        "SCH-I500": ["Samsung", "Fascinate"],
        "SCH-I510": ["Samsung", "Stealth V"],
        "SCH-I510 4G": ["Samsung", "Droid Charge"],
        "SCH-I515": ["Samsung", "Galaxy Nexus"],
        "SCH-I535": ["Samsung", "Galaxy S III"],
        "SCH-I535 4G": ["Samsung", "Galaxy S III"],
        "SCH-I619": ["Samsung", "SCH-I619"],
        "SCH-I699": ["Samsung", "SCH-I699"],
        "SCH-I779": ["Samsung", "SCH-I779"],
        "SCH-I800": ["Samsung", "Galaxy Tab 7.0", "tablet"],
        "SCH-I815": ["Samsung", "Galaxy Tab 7.7", "tablet"],
        "SCH-I815 4G": ["Samsung", "Galaxy Tab 7.7", "tablet"],
        "SCH-I905": ["Samsung", "Galaxy Tab 10.1", "tablet"],
        "SCH-I905 4G": ["Samsung", "Galaxy Tab 10.1", "tablet"],
        "SCH-I909": ["Samsung", "Galaxy S"],
        "SCH-I915": ["Samsung", "SCH-I915"],
        "SCH-I939": ["Samsung", "Galaxy S III"],
        "SCH-M828C": ["Samsung", "Galaxy Precedent"],
        "SCH-M828Carray(9096483449)": ["Samsung", "Galaxy Precedent"],
        "SCH-R530U": ["Samsung", "Galaxy S III"],
        "SCH-R680": ["Samsung", "Repp"],
        "SCH-R720": ["Samsung", "Admire"],
        "SCH-R730": ["Samsung", "Transfix"],
        "SCH-R760": ["Samsung", "Galaxy S II"],
        "SCH-R820": ["Samsung", "SCH-R820"],
        "SCH-R880": ["Samsung", "Acclaim"],
        "SCH-R910": ["Samsung", "Galaxy Indulge 4G"],
        "SCH-R915": ["Samsung", "Galaxy Indulge"],
        "SCH-R920": ["Samsung", "Galaxy Attain 4G"],
        "SCH-R930": ["Samsung", "Galaxy S Aviator"],
        "SCH-R940": ["Samsung", "Galaxy S Lightray"],
        "SCH-S720C": ["Samsung", "Galaxy Proclaim"],
        "SCH-S735C": ["Samsung", "SCH-S735"],
        "SCH-W899": ["Samsung", "SCH-W899"],
        "SCH-W999": ["Samsung", "SCH-W999"],
        "SGH-I547": ["Samsung", "SGH-I547"],
        "SGH-I717": ["Samsung", "Galaxy Note"],
        "SGH-I717D": ["Samsung", "Galaxy Note"],
        "SGH-I717M": ["Samsung", "Galaxy Note"],
        "SGH-I717R": ["Samsung", "Galaxy Note"],
        "SGH-I727": ["Samsung", "Galaxy S II Skyrocket"],
        "SGH-i727R": ["Samsung", "Galaxy S II"],
        "SGH-I727R": ["Samsung", "Galaxy S II"],
        "SGH-I747": ["Samsung", "Galaxy S III"],
        "SGH-I747M": ["Samsung", "Galaxy S III"],
        "SGH-I748": ["Samsung", "Galaxy S III"],
        "SGH-I757": ["Samsung", "Galaxy S II Skyrocket HD"],
        "SGH-I777": ["Samsung", "Galaxy S II"],
        "SGH-I9777": ["Samsung", "Galaxy S II"],
        "SGH-I896": ["Samsung", "Captivate"],
        "SGH-I897": ["Samsung", "Captivate"],
        "SGH-I927": ["Samsung", "Captivate Glide"],
        "SGH-I927R": ["Samsung", "Captivate Glide"],
        "SGH-I957": ["Samsung", "Galaxy Tab 8.9", "tablet"],
        "SGH-I957D": ["Samsung", "Galaxy Tab 8.9", "tablet"],
        "SGH-I957M": ["Samsung", "Galaxy Tab 8.9", "tablet"],
        "SGH-I957R": ["Samsung", "Galaxy Tab 8.9", "tablet"],
        "SGH-I987": ["Samsung", "Galaxy Tab 7.0", "tablet"],
        "SGH-I997": ["Samsung", "Infuse 4G"],
        "SGH-I997R": ["Samsung", "Infuse 4G"],
        "SGH-I9000": ["Samsung", "Galaxy S"],
        "SGH-S730G": ["Samsung", "SGH-S730"],
        "SGH-T499": ["Samsung", "Dart"],
        "SGH-T499V": ["Samsung", "Galaxy Mini"],
        "SGH-T499Y": ["Samsung", "Galaxy Mini"],
        "SGH-T589": ["Samsung", "Gravity Smart"],
        "SGH-T589R": ["Samsung", "Gravity Smart"],
        "SGH-T679": ["Samsung", "Exhibit II 4G"],
        "SGH-T679M": ["Samsung", "Exhibit II 4G"],
        "SGH-T759": ["Samsung", "Exhibit 4G"],
        "SGH-T769": ["Samsung", "Galaxy S Blaze 4G"],
        "SGH-T839": ["Samsung", "T-Mobile Sidekick"],
        "SGH-T849": ["Samsung", "Galaxy Tab 7.0", "tablet"],
        "SGH-T859": ["Samsung", "Galaxy Tab 10.1", "tablet"],
        "SGH-T869": ["Samsung", "Galaxy Tab 7.0 Plus", "tablet"],
        "SGH-T879": ["Samsung", "Galaxy Note"],
        "SGH-T959": ["Samsung", "Vibrant"],
        "SGH-T959D": ["Samsung", "Galaxy S Fascinate 3G+"],
        "SGH-T959P": ["Samsung", "Galaxy S Fascinate 4G"],
        "SGH-T959V": ["Samsung", "Galaxy S 4G"],
        "SGH-T989": ["Samsung", "Galaxy S II"],
        "SGH-T989D": ["Samsung", "Galaxy S II X"],
        "SGH-T999": ["Samsung", "Galaxy S Blaze 4G"],
        "SGH-T999V": ["Samsung", "Galaxy S Blaze 4G"],
        "SHV-E120K": ["Samsung", "Galaxy S II HD LTE"],
        "SHV-E120L": ["Samsung", "Galaxy S II HD LTE"],
        "SHV-E120S": ["Samsung", "Galaxy S II HD LTE"],
        "SHV-E110S": ["Samsung", "Galaxy S II LTE"],
        "SHV-E140S": ["Samsung", "Galaxy Tab 8.9", "tablet"],
        "SHV-E150S": ["Samsung", "Galaxy Tab 7.7", "tablet"],
        "SHV-E160K": ["Samsung", "Galaxy Note"],
        "SHV-E160L": ["Samsung", "Galaxy Note LTE"],
        "SHV-E160S": ["Samsung", "Galaxy Note LTE"],
        "SHV-E170K": ["Samsung", "SHV-E170K"],
        "SHV-E170L": ["Samsung", "SHV-E170L"],
        "SHV-E210K": ["Samsung", "Galaxy S III"],
        "SHV-E210L": ["Samsung", "Galaxy S III"],
        "SHV-E210S": ["Samsung", "Galaxy S III"],
        "SHW-M100S": ["Samsung", "Galaxy A"],
        "SHW-M110S": ["Samsung", "Galaxy S"],
        "SHW-M130L": ["Samsung", "Galaxy U"],
        "SHW-M130K": ["Samsung", "Galaxy K"],
        "SHW-M180K": ["Samsung", "Galaxy Tab", "tablet"],
        "SHW-M180L": ["Samsung", "Galaxy Tab", "tablet"],
        "SHW-M180S": ["Samsung", "Galaxy Tab", "tablet"],
        "SHW-M180W": ["Samsung", "Galaxy Tab", "tablet"],
        "SHW-M185S": ["Samsung", "Galaxy Tab", "tablet"],
        "SHW-M190S": ["Samsung", "Galaxy S Hoppin"],
        "SHW-M220L": ["Samsung", "Galaxy Neo"],
        "SHW-M240S": ["Samsung", "Galaxy Ace"],
        "SHW-M250K": ["Samsung", "Galaxy S II"],
        "SHW-M250L": ["Samsung", "Galaxy S II"],
        "SHW-M250S": ["Samsung", "Galaxy S II"],
        "SHW-M300W": ["Samsung", "Galaxy Tab 10.1", "tablet"],
        "SHW-M305W": ["Samsung", "Galaxy Tab 8.9", "tablet"],
        "SHW-M340S": ["Samsung", "Galaxy M Style"],
        "SHW-M380K": ["Samsung", "Galaxy Tab 10.1", "tablet"],
        "SHW-M380S": ["Samsung", "Galaxy Tab 10.1", "tablet"],
        "SHW-M380W": ["Samsung", "Galaxy Tab 10.1", "tablet"],
        "SHW-M440S": ["Samsung", "Galaxy S III"],
        "SMT-i9100": ["Samsung", "SMT-I9100", "tablet"],
        "SPH-D600": ["Samsung", "Conquer 4G"],
        "SPH-D700": ["Samsung", "Epic 4G"],
        "SPH-D705": ["Samsung", "Epic 4G 2"],
        "SPH-D710": ["Samsung", "Epic 4G Touch"],
        "SPH-L700": ["Samsung", "Galaxy Nexus"],
        "SPH-L710": ["Samsung", "Galaxy S III"],
        "SPH-M820": ["Samsung", "Galaxy Prevail"],
        "SPH-M820-BST": ["Samsung", "Galaxy Prevail"],
        "SPH-M580": ["Samsung", "Replenish"],
        "SPH-M900": ["Samsung", "Moment"],
        "SPH-M910": ["Samsung", "Intercept"],
        "SPH-M920": ["Samsung", "Transform"],
        "SPH-M930": ["Samsung", "Transform Ultra"],
        "SPH-M930BST": ["Samsung", "Transform Ultra"],
        "SPH-P100": ["Samsung", "Galaxy Tab", "tablet"],
        "YP-GB1": ["Samsung", "Galaxy Player", "media"],
        "YP-GB70": ["Samsung", "Galaxy Player 70", "media"],
        "YP-GB70D": ["Samsung", "Galaxy Player 70 Plus", "media"],
        "YP-GS1": ["Samsung", "Galaxy S WiFi 3.6", "media"],
        "YP-G1": ["Samsung", "Galaxy S WiFi 4.0", "media"],
        "YP-GI1": ["Samsung", "Galaxy S WiFi 4.2", "media"],
        "YP-G50": ["Samsung", "Galaxy Player", "media"],
        "YP-G70": ["Samsung", "Galaxy S WiFi 5.0", "media"],
        GT9100: ["Samsung", "Galaxy S II"],
        I897: ["Samsung", "Captivate"],
        I7500: ["Samsung", "Galaxy"],
        I9000: ["Samsung", "Galaxy S"],
        T959: ["Samsung", "Galaxy S Vibrant"],
        "Captivate-I897": ["Samsung", "Captivate"],
        Galaxy: ["Samsung", "Galaxy"],
        "Galaxy Note": ["Samsung", "Galaxy Note"],
        GalaxyS: ["Samsung", "Galaxy S"],
        "Galaxy S II": ["Samsung", "Galaxy S II"],
        "Galaxy X": ["Samsung", "Galaxy X"],
        "Galaxy Spica": ["Samsung", "Galaxy Spica"],
        "GALAXY Tab": ["Samsung", "Galaxy Tab", "tablet"],
        "GALAXY NEXUS": ["Samsung", "Galaxy Nexus"],
        Vibrantmtd: ["Samsung", "Vibrant"],
        "SC-01C": ["Samsung", "Galaxy Tab", "tablet"],
        "SC-01D": ["Samsung", "Galaxy Tab 10.1 LTE", "tablet"],
        "SC-02B": ["Samsung", "Galaxy S"],
        "SC-02C": ["Samsung", "Galaxy S II"],
        "SC-02D": ["Samsung", "Galaxy Tab 7.0 Plus", "tablet"],
        "SC-03D": ["Samsung", "Galaxy S II LTE"],
        "SC-04D": ["Samsung", "Galaxy Nexus"],
        "SC-05D": ["Samsung", "Galaxy Note LTE"],
        "SC-06D": ["Samsung", "Galaxy S III"],
        ISW11SC: ["Samsung", "Galaxy S II WiMAX"],
        "GT-S7562": ["Samsung", "GT-S7562"],
        "GT-S7562i": ["Samsung", "GT-S7562i"],
        A01SH: ["Sharp", "A01SH"],
        IS01: ["Sharp", "IS01"],
        IS03: ["Sharp", "IS03"],
        IS05: ["Sharp", "IS05"],
        IS11SH: ["Sharp", "Aquos IS11SH"],
        IS12SH: ["Sharp", "Aquos IS12SH"],
        IS13SH: ["Sharp", "Aquos IS13SH"],
        IS14SH: ["Sharp", "Aquos IS14SH"],
        ISW16SH: ["Sharp", "Aquos ISW16SH"],
        "EB-W51GJ": ["Sharp", "EB-W51GJ"],
        SBM003SH: ["Sharp", "Galapagos"],
        SBM005SH: ["Sharp", "Galapagos"],
        SBM006SH: ["Sharp", "Aquos"],
        SBM007SH: ["Sharp", "Aquos 007SH"],
        SBM009SH: ["Sharp", "Aquos 009SH"],
        SBM102SH: ["Sharp", "Aquos 102SH"],
        SBM103SH: ["Sharp", "Aquos 103SH"],
        SBM104SH: ["Sharp", "Aquos 104SH"],
        SBM107SH: ["Sharp", "Aquos 107SH"],
        SBM107SHB: ["Sharp", "Aquos 107SH"],
        "SH-01D": ["Sharp", "Aquos SH-01D"],
        "SH-02D": ["Sharp", "Aquos slider SH-02D"],
        "SH-03C": ["Sharp", "Lynx 3D"],
        "SH-06D": ["Sharp", "Aquos SH-06D"],
        "SH-09D": ["Sharp", "Aquos Zeta SH-09D"],
        "SH-10B": ["Sharp", "Lynx"],
        "SH-12C": ["Sharp", "Aquos"],
        "SH-13C": ["Sharp", "Aquos f SH-13C"],
        SH80F: ["Sharp", "Aquos SH80F"],
        SH72x8U: ["Sharp", "SH72x8U"],
        SH8118U: ["Sharp", "SH8118U"],
        SH8128U: ["Sharp", "SH8128U"],
        SH8158U: ["Sharp", "SH8158U"],
        SH8188U: ["Sharp", "SH8188U"],
        SH8268U: ["Sharp", "SH8268U"],
        "INFOBAR C01": ["Sharp", "INFOBAR C01"],
        "SPX-5": ["Simvalley", "SPX-5"],
        "SPX-5 3G": ["Simvalley", "SPX-5 3G"],
        "SmartQ G7": ["SmartQ", "G7", "tablet"],
        SmartQT7: ["SmartQ", "T7", "tablet"],
        SmartQT10: ["SmartQ", "T10", "tablet"],
        SmartQT15: ["SmartQ", "T15", "tablet"],
        SmartQT19: ["SmartQ", "T19", "tablet"],
        SmartQT20: ["SmartQ", "T20", "tablet"],
        "OMS1 6": ["Sony Ericsson", "A8i"],
        E10a: ["Sony Ericsson", "Xperia X10 Mini"],
        E10i: ["Sony Ericsson", "Xperia X10 Mini"],
        E10iv: ["Sony Ericsson", "Xperia X10 Mini"],
        E15: ["Sony Ericsson", "Xperia X8"],
        E15a: ["Sony Ericsson", "Xperia X8"],
        E15i: ["Sony Ericsson", "Xperia X8"],
        E15iv: ["Sony Ericsson", "Xperia X8"],
        "E15i-o": ["Sony Ericsson", "Xperia X8"],
        E16i: ["Sony Ericsson", "W8 Walkman"],
        LT11i: ["Sony Ericsson", "Xperia Neo V"],
        LT15: ["Sony Ericsson", "Xperia Arc"],
        LT15a: ["Sony Ericsson", "Xperia Arc"],
        LT15i: ["Sony Ericsson", "Xperia Arc"],
        LT15iv: ["Sony Ericsson", "Xperia Arc"],
        "LT15i-o": ["Sony Ericsson", "Xperia Arc"],
        LT18a: ["Sony Ericsson", "Xperia Arc S"],
        LT18i: ["Sony Ericsson", "Xperia Arc S"],
        LT18iv: ["Sony Ericsson", "Xperia Arc S"],
        "LT18i-o": ["Sony Ericsson", "Xperia Arc S"],
        LT22i: ["Sony", "Xperia P"],
        LT26i: ["Sony", "Xperia S"],
        LT26ii: ["Sony", "Xperia S"],
        "LT26i-o": ["Sony", "Xperia S"],
        LT28at: ["Sony", "Xperia Ion"],
        LT28h: ["Sony", "Xperia Ion"],
        LT28i: ["Sony", "Xperia Ion"],
        LT29i: ["Sony", "Xperia GX"],
        SonyLT29i: ["Sony", "Xperia GX"],
        SonyLT30a: ["Sony", "Xperia Mint"],
        SonyLT30p: ["Sony", "Xperia Mint"],
        MK16a: ["Sony Ericsson", "Xperia Pro"],
        MK16i: ["Sony Ericsson", "Xperia Pro"],
        MT11a: ["Sony Ericsson", "Xperia Neo V"],
        MT11i: ["Sony Ericsson", "Xperia Neo V"],
        MT11iv: ["Sony Ericsson", "Xperia Neo V"],
        "MT11i-o": ["Sony Ericsson", "Xperia Neo V"],
        MT15a: ["Sony Ericsson", "Xperia Neo"],
        MT15i: ["Sony Ericsson", "Xperia Neo"],
        MT15iv: ["Sony Ericsson", "Xperia Neo"],
        "MT15i-o": ["Sony Ericsson", "Xperia Neo"],
        MT25i: ["Sony", "Xperia Neo L"],
        MT27i: ["Sony", "Xperia Sola"],
        R800a: ["Sony Ericsson", "Xperia Play"],
        R800i: ["Sony Ericsson", "Xperia Play"],
        R800iv: ["Sony Ericsson", "Xperia Play"],
        R800at: ["Sony Ericsson", "Xperia Play"],
        R800x: ["Sony Ericsson", "Xperia Play"],
        SK17a: ["Sony Ericsson", "Xperia Mini Pro"],
        SK17i: ["Sony Ericsson", "Xperia Mini Pro"],
        SK17iv: ["Sony Ericsson", "Xperia Mini Pro"],
        "SK17i-o": ["Sony Ericsson", "Xperia Mini Pro"],
        ST15a: ["Sony Ericsson", "Xperia Mini"],
        ST15i: ["Sony Ericsson", "Xperia Mini"],
        ST17a: ["Sony Ericsson", "Xperia Active"],
        ST17i: ["Sony Ericsson", "Xperia Active"],
        ST18a: ["Sony Ericsson", "Xperia Ray"],
        ST18i: ["Sony Ericsson", "Xperia Ray"],
        ST18iv: ["Sony Ericsson", "Xperia Ray"],
        ST18av: ["Sony Ericsson", "Xperia Ray"],
        SonyST21: ["Sony", "'Tapioca'"],
        SonyST21i: ["Sony", "'Tapioca'"],
        SonyST21a2: ["Sony", "'Tapioca'"],
        ST21: ["Sony", "'Tapioca'"],
        ST21i: ["Sony", "'Tapioca'"],
        SonyST23i: ["Sony", "'Tapioca DS'"],
        ST25i: ["Sony", "Xperia U"],
        ST27i: ["Sony", "Xperia Go"],
        U20a: ["Sony Ericsson", "Xperia X10 Mini Pro"],
        U20i: ["Sony Ericsson", "Xperia X10 Mini Pro"],
        U20iv: ["Sony Ericsson", "Xperia X10 Mini Pro"],
        WT13i: ["Sony Ericsson", "Mix Walkman"],
        WT18i: ["Sony Ericsson", "Walkman"],
        WT19a: ["Sony Ericsson", "Live with Walkman"],
        WT19i: ["Sony Ericsson", "Live with Walkman"],
        WT19iv: ["Sony Ericsson", "Live with Walkman"],
        X8: ["Sony Ericsson", "Xperia X8"],
        X10: ["Sony Ericsson", "Xperia X10"],
        X10a: ["Sony Ericsson", "Xperia X10"],
        X10i: ["Sony Ericsson", "Xperia X10"],
        X10iv: ["Sony Ericsson", "Xperia X10"],
        X10S: ["Sony Ericsson", "Xperia X10"],
        X10mini: ["Sony Ericsson", "Xperia X10 Mini"],
        "X10 Mini": ["Sony Ericsson", "Xperia X10 Mini"],
        "X10 Mini Pro": ["Sony Ericsson", "Xperia X10 Mini Pro"],
        Z1i: ["Sony Ericsson", "Xperia Play"],
        S51SE: ["Sony Ericsson", "Xperia Mini"],
        IS11S: ["Sony Ericsson", "Xperia Acro"],
        IS12S: ["Sony Ericsson", "Xperia Acro HD"],
        "SO-01B": ["Sony Ericsson", "Xperia X10"],
        "SO-01C": ["Sony Ericsson", "Xperia Arc"],
        "SO-01D": ["Sony Ericsson", "Xperia Play"],
        "SO-02C": ["Sony Ericsson", "Xperia Acro"],
        "SO-02D": ["Sony Ericsson", "Xperia NX"],
        "SO-03C": ["Sony Ericsson", "Xperia Ray"],
        "SO-03D": ["Sony Ericsson", "Xperia Acro HD"],
        "SO-04D": ["Sony", "Xperia GX"],
        "SO-05D": ["Sony", "Xperia SX"],
        "XPERIA X8": ["Sony Ericsson", "Xperia X8"],
        "Xperia X8": ["Sony Ericsson", "Xperia X8"],
        "Xperia X10": ["Sony Ericsson", "Xperia X10"],
        "Xperia ray": ["Sony Ericsson", "Xperia Ray"],
        "Xperia Ray": ["Sony Ericsson", "Xperia Ray"],
        "Xperia Arc": ["Sony Ericsson", "Xperia Arc"],
        "Xperia Mini": ["Sony Ericsson", "Xperia Mini"],
        "Xperia neo": ["Sony Ericsson", "Xperia Neo"],
        "Xperia Neo": ["Sony Ericsson", "Xperia Neo"],
        "XPERIA NEO": ["Sony Ericsson", "Xperia Neo"],
        "Xperia NeoV": ["Sony Ericsson", "Xperia Neo V"],
        "Xperia Neo V": ["Sony Ericsson", "Xperia Neo V"],
        "Xperia Play": ["Sony Ericsson", "Xperia Play"],
        "Sony Ericsson Xperia X1": ["Sony Ericsson", "Xperia X1"],
        SonyHayabusa: ["Sony", "Xperia Ion"],
        Hayabusa: ["Sony", "Xperia Ion"],
        nozomi: ["Sony", "Xperia S"],
        "Sony Tablet P": ["Sony", "Tablet P", "tablet"],
        "Sony Tablet S": ["Sony", "Tablet S", "tablet"],
        "NWZ-Z1000Series": ["Sony", "Walkman Z", "media"],
        "NW-Z1000Series": ["Sony", "Walkman Z", "media"],
        "Spice Mi280": ["Spice", "Mi-280"],
        "Spice Mi300": ["Spice", "Mi-300"],
        "Spice Mi-310": ["Spice", "Mi-310"],
        "Spice Mi-425": ["Spice", "Mi-425"],
        "SPICE Mi-720": ["Spice", "Mi-720"],
        "A7272+": ["Star", "A7272+"],
        "e1109 v73 gq1002 ctp": ["Star", "X18i"],
        TS1004T: ["Surf 3Q", "TS1004T", "tablet"],
        "SYTABEX7-2": ["Sylvania", "SYTABEX7", "tablet"],
        "TCL A860": ["TCL", "A860"],
        "TCL A906": ["TCL", "A906"],
        "TCL A909": ["TCL", "A909"],
        "TCL A919": ["TCL", "A919"],
        "TCL A990": ["TCL", "A990"],
        "TCL A996": ["TCL", "A996"],
        "TCL A998": ["TCL", "A998"],
        "TCL GENESEE E708": ["TCL", "Genesee E708"],
        "A10t(5DM3)": ["Teclast", "A10T", "tablet"],
        P72: ["Teclast", "P72", "tablet"],
        P76TI: ["Teclast", "P76Ti", "tablet"],
        P81HD: ["Teclast", "P81HD", "tablet"],
        "P85(R8A1)": ["Teclast", "P85", "tablet"],
        "T720 SE": ["Teclast", "T720", "tablet"],
        "T760 from moage.com": ["Teclast", "T760", "tablet"],
        tegav2: ["Tegatech", "TEGA v2", "tablet"],
        "TM-7025": ["teXet", "TM-7025", "tablet"],
        MoFing: ["Thomson", "MoFing", "tablet"],
        Ultimate10: ["Tomtec", "Ultimate10", "tablet"],
        "Thl V7": ["THL", "V7"],
        "ThL V7": ["THL", "V7"],
        "ThL V8": ["THL", "V8"],
        "ThL V9": ["THL", "V9"],
        "ThL V11": ["THL", "V11"],
        "TSB CLOUD COMPANION;TOSHIBA AC AND AZ": ["Toshiba", "Dynabook AZ", "desktop"],
        "TOSHIBA AC AND AZ": ["Toshiba", "Dynabook AZ", "desktop"],
        "TOSHIBA FOLIO AND A": ["Toshiba", "Folio 100", "tablet"],
        "T-01C": ["Toshiba", "Regza T-01C"],
        "T-01D": ["Toshiba", "Regza T-01D"],
        IS04: ["Toshiba", "Regza IS04"],
        IS11T: ["Toshiba", "Regza IS11T"],
        AT1S0: ["Toshiba", "Regza AT1S0"],
        Tostab03: ["Toshiba", "Regza AT100", "tablet"],
        AT100: ["Toshiba", "Regza AT100", "tablet"],
        AT200: ["Toshiba", "Regza AT200", "tablet"],
        AT470: ["Toshiba", "Regza AT470", "tablet"],
        AT570: ["Toshiba", "Regza AT570", "tablet"],
        AT830: ["Toshiba", "Regza AT830", "tablet"],
        "Folio 100": ["Toshiba", "Folio 100", "tablet"],
        folio100: ["Toshiba", "Folio 100", "tablet"],
        THRiVE: ["Toshiba", "THRiVE", "tablet"],
        "Fantastic T3": ["TWM", "Fantastic T3"],
        M70014: ["United Star Technology", "M70014", "tablet"],
        PS47: ["Velocity Micro", "Cruz PS47", "tablet"],
        T301: ["Velocity Micro", "Cruz T301", "tablet"],
        "Vibo-A688": ["FIH", "Vibo A688"],
        "Videocon-V7500": ["Videocon", "V7500"],
        GTablet: ["ViewSonic", "gTablet", "tablet"],
        GtabComb: ["ViewSonic", "gTablet", "tablet"],
        "TeamDRH ICS for GTablet": ["ViewSonic", "gTablet", "tablet"],
        ViewPad7: ["ViewSonic", "ViewPad 7", "tablet"],
        "ViewPad 10e": ["ViewSonic", "ViewPad 10e", "tablet"],
        VTAB1008: ["Vizio", "VTAB1008", "tablet"],
        VTAB3010: ["Vizio", "VTAB3010", "tablet"],
        "VOTO W5300": ["VOTO", "W5300"],
        "xPAD-70": ["WayteQ", "xPAD-70", "tablet"],
        "xTAB-70": ["WayteQ", "xTAB-70", "tablet"],
        "WellcoM-A99": ["WellcoM", "A99"],
        N12: ["Window", "N12", "tablet"],
        N12R: ["Window", "N12R", "tablet"],
        N50: ["Window", "N50", "tablet"],
        N50DT: ["Window", "N50DT", "tablet"],
        N50GT: ["Window", "N50GT", "tablet"],
        "N50GT A": ["Window", "N50GT-A", "tablet"],
        N70: ["Window", "N70", "tablet"],
        "N70 DUAL CORE": ["Window", "N70 Dual Core", "tablet"],
        N80: ["Window", "N80", "tablet"],
        N90: ["Window", "N90", "tablet"],
        "N90 DUAL CORE2 V12": ["Window", "N90 Dual Core", "tablet"],
        N612: ["Wishway", "N612"],
        "AT-AS43D": ["Wolfgang", "AT-AS43D"],
        M12: ["Wopad", "M12", "tablet"],
        WM8650: ["WonderMedia", "WM8650", "tablet"],
        "MI-ONE": ["Xiaomi", "MI-ONE"],
        "MI-ONE C1": ["Xiaomi", "MI-ONE C1"],
        "MI-ONE Plus": ["Xiaomi", "MI-ONE Plus"],
        "MI 1S": ["Xiaomi", "MI-ONE Plus"],
        "MI 1SC": ["Xiaomi", "MI-ONE 1SC"],
        "mione plus": ["Xiaomi", "MI-ONE Plus"],
        "MI-TWO": ["Xiaomi", "MI-TWO"],
        "MI 2": ["Xiaomi", "MI-TWO"],
        "MI 2S": ["Xiaomi", "MI-TWO Plus"],
        "MI 2SC": ["Xiaomi", "MI-TWO Plus"],
        Q07CL01: ["XVision", "Q07", "tablet"],
        N6: ["Yarvik", "210 Tablet", "tablet"],
        EMR1879: ["Yidong", "EMR1879", "tablet"],
        "yusun W702": ["Yusun", "W702"],
        "YX-YUSUN E80": ["Yusun", "E80"],
        zt180: ["Zenithink", "ZT-180", "tablet"],
        Jaguar7: ["ZiiLabs", "Jaguar 7", "tablet"],
        "Ziss Ranger HD": ["Ziss", "Ranger HD"],
        "ZTE Libra": ["ZTE", "Libra"],
        "ZTE-T T9": ["ZTE", "Light Tab T9", "tablet"],
        V9: ["ZTE", "Light Tab V9", "tablet"],
        "V9e+": ["ZTE", "Light Tab 2", "tablet"],
        V9A: ["ZTE", "Light Tab 2", "tablet"],
        "Light Tab 2W": ["ZTE", "Light Tab 2", "tablet"],
        "Light Tab 2": ["ZTE", "Light Tab 2", "tablet"],
        V9C: ["ZTE", "Light Tab 3", "tablet"],
        V55: ["ZTE", "Optik", "tablet"],
        Acqua: ["ZTE", "Acqua"],
        Blade: ["ZTE", "Blade"],
        "Blade-V880": ["ZTE", "Blade"],
        "ZTE-U V880": ["ZTE", "Blade"],
        "Blade-opda": ["ZTE", "Blade"],
        "ZTE-BLADE": ["ZTE", "Blade"],
        "ZTE Blade": ["ZTE", "Blade"],
        "ZTE V880": ["ZTE", "Blade"],
        "ZTE-U(V)880+": ["ZTE", "Blade"],
        V880: ["ZTE", "Blade"],
        a5: ["ZTE", "Blade"],
        Blade2: ["ZTE", "Blade 2"],
        "Blade S": ["ZTE", "Blade S"],
        X500: ["ZTE", "Score"],
        "ZTE-X500": ["ZTE", "Score"],
        Skate: ["ZTE", "Skate"],
        "ZTE Skate": ["ZTE", "Skate"],
        "ZTE-Skate": ["ZTE", "Skate"],
        "ZTE-SKATE": ["ZTE", "Skate"],
        "ZTE-V960": ["ZTE", "Skate"],
        "ZTE-U V960": ["ZTE", "Skate"],
        "ZTE Racer": ["ZTE", "Racer"],
        "ZTE-RACER": ["ZTE", "Racer"],
        "MTC 916": ["ZTE", "Racer"],
        Racer: ["ZTE", "Racer"],
        RacerII: ["ZTE", "Racer 2"],
        RACERII: ["ZTE", "Racer 2"],
        "ZTE Roamer": ["ZTE", "Roamer"],
        N860: ["ZTE", "Warp"],
        N880: ["ZTE", "Blade"],
        "ZTE-T U802": ["ZTE", "T-U802"],
        "ZTE-T U806": ["ZTE", "T-U806"],
        "ZTE-T U812": ["ZTE", "T-U812"],
        "ZTE-T U830": ["ZTE", "T-U830"],
        "ZTE-T U880": ["ZTE", "T-U880"],
        "ZTE T U880": ["ZTE", "T-U880"],
        "ZTE-TU880": ["ZTE", "T-U880"],
        "ZTE-TU900": ["ZTE", "T-U900"],
        "ZTE-T U960": ["ZTE", "T-U960"],
        "ZTE-TU960s": ["ZTE", "T-U960"],
        "ZTE-T U960s": ["ZTE", "T-U960"],
        "ZTE U N720": ["ZTE", "U-N720"],
        "ZTE-U V856": ["ZTE", "U-V856"],
        "ZTE-U V857": ["ZTE", "U-V857"],
        "ZTE-U V881": ["ZTE", "U-V881"],
        "ZTE-U X850": ["ZTE", "U-X850"],
        "ZTE-U X876": ["ZTE", "U-X876"],
        "ZTE-X876": ["ZTE", "U-X876"],
        "ZTE-C R750": ["ZTE", "C-R750"],
        "ZTE-C N600": ["ZTE", "C-N600"],
        "ZTE-C N600+": ["ZTE", "C-N600"],
        "ZTE-C N606": ["ZTE", "C-N606"],
        "ZTE-C N700": ["ZTE", "C-N700"],
        "ZTE-C N760": ["ZTE", "C-N760"],
        "ZTE-C N880": ["ZTE", "C-N880"],
        "ZTE-C N880S": ["ZTE", "C-N880"],
        "ZTE-C N880s": ["ZTE", "C-N880"],
        "ZTE-C X500": ["ZTE", "C-X500"],
        "ZTE-C X920": ["ZTE", "C-X920"],
        "ZXY-ZTE-C X920": ["ZTE", "C-X920"],
        "ZTE GV821": ["ZTE", "G-V821"],
        "ZTE N880E": ["ZTE", "N880E"],
        "ZTE-N880E": ["ZTE", "N880E"],
        "MIUI N880S": ["ZTE", "N880S"],
        "ZTE N882E": ["ZTE", "N882E"],
        "ZTE N855D": ["ZTE", "N855D"],
        "ZTE-N910": ["ZTE", "N910"],
        E810: ["ZTE", "E810"],
        u880: ["ZTE", "U880"],
        "ZTE U880E": ["ZTE", "U880E"],
        U880: ["ZTE", "U880"],
        "ZTE U970": ["ZTE", "U970"],
        "ZTE V768": ["ZTE", "V768"],
        "ZTE-V856": ["ZTE", "V856"],
        "ZTE V877b": ["ZTE", "V877"],
        "ZTE V889D": ["ZTE", "V889"],
        "ZTE-Z990": ["ZTE", "Z990"],
        ZTEU790: ["ZTE", "U790"],
        "003Z": ["ZTE", "Softbank 003Z"],
        "008Z": ["ZTE", "Softbank 008Z"],
        "009Z": ["ZTE", "Softbank Star7"],
        "i-mobile i691": ["i-Mobile", "i691"],
        "i-mobile i695": ["i-Mobile", "i695"],
        "i-mobile i858": ["i-Mobile", "i858"],
        "i-mobile 3G 8500": ["i-Mobile", "3G 8500"],
        "i-mobile I-Note": ["i-Mobile", "i-Note", "tablet"],
        "Optimus Boston": ["Optimus", "Boston"],
        "Optimus San Francisco": ["Optimus", "San Francisco"],
        "Optimus Monte Carlo": ["Optimus", "Monte Carlo"],
        "Orange Boston": ["Orange", "Boston"],
        "Orange Monte Carlo": ["Orange", "Monte Carlo"],
        "San Francisco": ["Orange", "San Francisco"],
        "San Francisco for Orange": ["Orange", "San Francisco"],
        "Orange San Francisco": ["Orange", "San Francisco"],
        MOVE: ["T-Mobile", "MOVE"],
        "T-Mobile G1": ["T-Mobile", "G1"],
        "T-Mobile G2": ["T-Mobile", "G2"],
        "T-Mobile G2 Touch": ["T-Mobile", "G2"],
        "LG-P999": ["T-Mobile", "G2x"],
        "LG-E739": ["T-Mobile", "myTouch"],
        "T-Mobile myTouch 3G": ["T-Mobile", "myTouch 3G"],
        "T-Mobile myTouch 3G Slide": ["T-Mobile", "myTouch 3G Slide"],
        "T-Mobile Espresso": ["T-Mobile", "myTouch 3G Slide"],
        "HTC myTouch 3G Slide": ["T-Mobile", "myTouch 3G Slide"],
        "T-Mobile myTouch 4G": ["T-Mobile", "myTouch 4G"],
        "HTC Glacier": ["T-Mobile", "myTouch 4G"],
        "HTC Panache": ["T-Mobile", "myTouch 4G"],
        myTouch4G: ["T-Mobile", "myTouch 4G"],
        "My Touch 4G": ["T-Mobile", "myTouch 4G"],
        "HTC Mytouch 4G": ["T-Mobile", "myTouch 4G"],
        "HTC My Touch 4G": ["T-Mobile", "myTouch 4G"],
        "HTC mytouch4g": ["T-Mobile", "myTouch 4G"],
        "HTC myTouch 4G Slide": ["T-Mobile", "myTouch 4G Slide"],
        "myTouch 4G Slide": ["T-Mobile", "myTouch 4G Slide"],
        "T-Mobile myTouch Q": ["T-Mobile", "myTouch Q"],
        "LG-C800": ["T-Mobile", "myTouch Q"],
        "Pulse Mini": ["T-Mobile", "Pulse Mini"],
        "Vodafone 845": ["Vodafone", "845 Nova"],
        "Vodafone 858": ["Vodafone", "858 Smart"],
        "Vodafone 945": ["Vodafone", "945"],
        "Vodafone Smart II": ["Vodafone", "Smart II"],
        SmartTab10: ["Vodafone", "SmartTab 10", "tablet"],
        "SCH-N719": ["Samsung", "Galaxy Note II"],
        "Coolpad 8190": ["Coolpad", "8190"],
        U705T: ["Oppo", "Ulike2"],
        "Coolpad 8020+": ["Coolpad", "8020"],
        "Huawei Y310-5000": ["Huawei", "Y310"],
        "GT-S7572": ["Samsung", "Galaxy Trend Duos II"],
        "Lenovo A278t": ["Lenovo", "A278t"],
        "Lenovo A690": ["Lenovo", "A690"],
        "GT-I8262D": ["Samsung", "LePhone I8262D"],
        "Lenovo A278t": ["Lenovo", "A278t"],
        "MI 2C": ["Xiaomi", "MI-TWO"],
        "Coolpad 8070": ["Coolpad", "8070"],
        R813T: ["Oppo", "R813T"],
        "ZTE U930": ["ZTE", "U930"],
        "Lenovo A360": ["Lenovo", "LePhone A360"],
        "SCH-N719": ["Samsung", "Galaxy Note II"],
        "Coolpad 8010": ["Coolpad", "8010"],
        "LENOVO-Lenovo-A288t": ["Lenovo", "A288t"],
        U701T: ["Oppo", "U701T"],
        ZTEU795: ["Coolpad", "U795"],
        "Haier-HT-I617": ["Haier", "I617"],
        ZTEU880s: ["ZTE", "T-U880"],
        "GT-S6352": ["Samsung", "GT-S6352"],
        "GT-S7568": ["Samsung", "GT-S7568"],
        "K-Touch T619+": ["K-Touch", "T619"],
        "MI 2A": ["Xiaomi", "MI-TWO A"],
        "GT-N7108": ["Samsung", "Galaxy Note II"],
        "K-Touch T621": ["K-Touch", "T621"],
        "LENOVO-Lenovo-A298t": ["Lenovo", "A298"],
        "Coolpad 8150": ["Coolpad", "8150"],
        "5860S": ["Coolpad", "5860"],
        ZTEU807: ["ZTE", "U807"],
        "SCH-I739": ["Samsung", "SCH-I739"],
        "SCH-I829": ["Samsung", "SCH-I829"],
        "HS-E830": ["Hisense", "E830"],
        "HS-E920": ["Hisense", "E920"],
        "Lenovo S720": ["Lenovo", "S720"],
        "MI 2C": ["Xiaomi", "MI-TWO"],
        "OPPO R813T": ["Oppo", "R813"],
        "SCH-I879": ["Samsung", "Galaxy Note"],
        "GT-S6102E": ["Samsung", "Galaxy Y Duos"]
      }, r = {
        9600: "Bold",
        9650: "Bold",
        9700: "Bold",
        9780: "Bold",
        9790: "Bold",
        9900: "Bold",
        9930: "Bold",
        8300: "Curve",
        8310: "Curve",
        8320: "Curve",
        8330: "Curve",
        "8350i": "Curve",
        8520: "Curve",
        8530: "Curve",
        8900: "Curve",
        9220: "Curve",
        9300: "Curve",
        9330: "Curve",
        9350: "Curve",
        9360: "Curve",
        9370: "Curve",
        9380: "Curve",
        8100: "Pearl",
        8110: "Pearl",
        8120: "Pearl",
        8130: "Pearl",
        8220: "Pearl",
        8230: "Pearl",
        9100: "Pearl",
        9105: "Pearl",
        9530: "Storm",
        9550: "Storm",
        9670: "Style",
        9800: "Torch",
        9810: "Torch",
        9850: "Torch",
        9860: "Torch",
        9630: "Tour",
        9981: "Porsche P"
      }, l = function() {
        this.initialize.apply(this, Array.prototype.slice.call(arguments));
      };
      l.prototype = {
        initialize: function(e) {
          this.original = e.value || null, this.alias = e.alias || null;
        }
      };
      var c = function() {
        this.initialize.apply(this, arguments);
      };

      function m(e) {
        return e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = void 0 === e ? "" : e).replace(/_TD$/, "")).replace(/_CMCC$/, "")).replace(/_/g, " ")).replace(/^\s+|\s+$/g, "")).replace(/\/[^\/]+$/, "")).replace(/\/[^\/]+ Android\/.*/, "")).replace(/^tita on /, "")).replace(/^Android on /, "")).replace(/^Android for /, "")).replace(/^ICS AOSP on /, "")).replace(/^Full AOSP on /, "")).replace(/^Full Android on /, "")).replace(/^Full Cappuccino on /, "")).replace(/^Full MIPS Android on /, "")).replace(/^Full Android/, "")).replace(/^Acer ?/i, "")).replace(/^Iconia /, "")).replace(/^Ainol /, "")).replace(/^Coolpad ?/i, "Coolpad ")).replace(/^ALCATEL /, "")).replace(/^Alcatel OT-(.*)/, "one touch $1")).replace(/^YL-/, "")).replace(/^Novo7 ?/i, "Novo7 ")).replace(/^GIONEE /, "")).replace(/^HW-/, "")).replace(/^Huawei[ -]/i, "Huawei ")).replace(/^SAMSUNG[ -]/i, "")).replace(/^SonyEricsson/, "")).replace(/^Lenovo Lenovo/, "Lenovo")).replace(/^LNV-Lenovo/, "Lenovo")).replace(/^Lenovo-/, "Lenovo ")).replace(/^(LG)[ _\/]/, "$1-")).replace(/^(HTC.*)\s(?:v|V)?[0-9.]+$/, "$1")).replace(/^(HTC)[-\/]/, "$1 ")).replace(/^(HTC)([A-Z][0-9][0-9][0-9])/, "$1 $2")).replace(/^(Motorola[\s|-])/, "")).replace(/^(Moto|MOT-)/, "")).replace(/-?(orange(-ls)?|vodafone|bouygues)$/i, "")).replace(/http:\/\/.+$/i, "")).replace(/^\s+|\s+$/g, "");
      }

      function T(e) {
        var a = (e = e.toString()).split("."), i = a.shift();
        return parseFloat(i + "." + a.join(""));
      }

      return c.prototype = {
        initialize: function(e, a) {
          this.options = {
            useFeatures: a && a.useFeatures || !1,
            detectCamouflage: a && a.detectCamouflage || !0
          }, this.browser = {
            stock: !0,
            hidden: !1,
            channel: ""
          }, this.engine = {}, this.os = {}, this.device = {
            type: "desktop",
            identified: !1
          }, this.camouflage = !1, this.features = [], this.detect(e);
        }, detect: function(c) {
          if (c.match("Unix") && (this.os.name = "Unix"), c.match("FreeBSD") && (this.os.name = "FreeBSD"), c.match("OpenBSD") && (this.os.name = "OpenBSD"), c.match("NetBSD") && (this.os.name = "NetBSD"), c.match("SunOS") && (this.os.name = "Solaris"), c.match("Linux") && (this.os.name = "Linux", c.match("CentOS") && (this.os.name = "CentOS", (match = /CentOS\/[0-9\.\-]+el([0-9_]+)/.exec(c)) && (this.os.version = new l({ value: match[1].replace(/_/g, ".") }))), c.match("Debian") && (this.os.name = "Debian"), c.match("Fedora") && (this.os.name = "Fedora", (match = /Fedora\/[0-9\.\-]+fc([0-9]+)/.exec(c)) && (this.os.version = new l({ value: match[1] }))), c.match("Gentoo") && (this.os.name = "Gentoo"), c.match("Kubuntu") && (this.os.name = "Kubuntu"), c.match("Mandriva Linux") && (this.os.name = "Mandriva", (match = /Mandriva Linux\/[0-9\.\-]+mdv([0-9]+)/.exec(c)) && (this.os.version = new l({ value: match[1] }))), c.match("Mageia") && (this.os.name = "Mageia", (match = /Mageia\/[0-9\.\-]+mga([0-9]+)/.exec(c)) && (this.os.version = new l({ value: match[1] }))), c.match("Red Hat") && (this.os.name = "Red Hat", (match = /Red Hat[^\/]*\/[0-9\.\-]+el([0-9_]+)/.exec(c)) && (this.os.version = new l({ value: match[1].replace(/_/g, ".") }))), c.match("Slackware") && (this.os.name = "Slackware"), c.match("SUSE") && (this.os.name = "SUSE"), c.match("Turbolinux") && (this.os.name = "Turbolinux"), c.match("Ubuntu") && (this.os.name = "Ubuntu", (match = /Ubuntu\/([0-9.]*)/.exec(c)) && (this.os.version = new l({ value: match[1] })))), c.match("iPhone( Simulator)?;") || c.match("iPad;") || c.match("iPod;") || c.match(/iPhone\s*\d*s?[cp]?;/i) ? (this.os.name = "iOS", this.os.version = new l({ value: "1.0" }), (match = /OS (.*) like Mac OS X/.exec(c)) && (this.os.version = new l({ value: match[1].replace(/_/g, ".") })), c.match("iPhone Simulator;") ? this.device.type = "emulator" : c.match("iPod;") ? (this.device.type = "media", this.device.manufacturer = "Apple", this.device.model = "iPod Touch") : c.match("iPhone;") || c.match(/iPhone\s*\d*s?[cp]?;/i) ? (this.device.type = "mobile", this.device.manufacturer = "Apple", this.device.model = "iPhone") : (this.device.type = "tablet", this.device.manufacturer = "Apple", this.device.model = "iPad"), this.device.identified = !0) : c.match("Mac OS X") && (this.os.name = "Mac OS X", (match = /Mac OS X (10[0-9\._]*)/.exec(c)) && (this.os.version = new l({ value: match[1].replace(/_/g, ".") }))), c.match("Windows")) {
            if (this.os.name = "Windows", match = /Windows NT ([0-9]\.[0-9])/.exec(c)) switch (this.os.version = T(match[1]), match[1]) {
              case"6.2":
                this.os.version = new l({ value: match[1], alias: "8" });
                break;
              case"6.1":
                this.os.version = new l({ value: match[1], alias: "7" });
                break;
              case"6.0":
                this.os.version = new l({ value: match[1], alias: "Vista" });
                break;
              case"5.2":
                this.os.version = new l({ value: match[1], alias: "Server 2003" });
                break;
              case"5.1":
                this.os.version = new l({ value: match[1], alias: "XP" });
                break;
              case"5.0":
                this.os.version = new l({ value: match[1], alias: "2000" });
                break;
              default:
                this.os.version = new l({ value: match[1], alias: "NT " + this.os.version });
            }
            if ((c.match("Windows 95") || c.match("Win95") || c.match("Win 9x 4.00")) && (this.os.version = new l({
              value: "4.0",
              alias: "95"
            })), (c.match("Windows 98") || c.match("Win98") || c.match("Win 9x 4.10")) && (this.os.version = new l({
              value: "4.1",
              alias: "98"
            })), (c.match("Windows ME") || c.match("WinME") || c.match("Win 9x 4.90")) && (this.os.version = new l({
              value: "4.9",
              alias: "ME"
            })), (c.match("Windows XP") || c.match("WinXP")) && (this.os.name = new l({
              value: "5.1",
              alias: "XP"
            })), c.match("WP7") && (this.os.name = "Windows Phone", this.os.version = new l({
              value: "7.0",
              details: 2
            }), this.device.type = "mobile", this.browser.mode = "desktop"), (c.match("Windows CE") || c.match("WinCE") || c.match("WindowsCE")) && (c.match(" IEMobile") ? (this.os.name = "Windows Mobile", c.match(" IEMobile 8") && (this.os.version = new l({
              value: "6.5",
              details: 2
            })), c.match(" IEMobile 7") && (this.os.version = new l({
              value: "6.1",
              details: 2
            })), c.match(" IEMobile 6") && (this.os.version = new l({
              value: "6.0",
              details: 2
            }))) : (this.os.name = "Windows CE", (match = /WindowsCEOS\/([0-9.]*)/.exec(c)) && (this.os.version = new l({
              value: match[1],
              details: 2
            })), (match = /Windows CE ([0-9.]*)/.exec(c)) && (this.os.version = new l({
              value: match[1],
              details: 2
            }))), this.device.type = "mobile"), c.match("Windows Mobile") && (this.os.name = "Windows Mobile", this.device.type = "mobile"), (match = /WindowsMobile\/([0-9.]*)/.exec(c)) && (this.os.name = "Windows Mobile", this.os.version = new l({
              value: match[1],
              details: 2
            }), this.device.type = "mobile"), c.match("Windows Phone [0-9]") && (this.os.name = "Windows Mobile", this.os.version = new l({
              value: c.match(/Windows Phone ([0-9.]*)/)[1],
              details: 2
            }), this.device.type = "mobile"), c.match("Windows Phone OS")) {
              this.os.name = "Windows Phone", this.os.version = new l({
                value: c.match(/Windows Phone OS ([0-9.]*)/)[1],
                details: 2
              }), this.os.version < 7 && (this.os.name = "Windows Mobile"), (match = /IEMobile\/[^;]+; ([^;]+); ([^;]+)[;|\)]/.exec(c)) && (this.device.manufacturer = match[1], this.device.model = match[2]), this.device.type = "mobile";
              var S = this.device.manufacturer, h = m(this.device.model);
              void 0 !== s[S] && void 0 !== s[S][h] && (this.device.manufacturer = s[S][h][0], this.device.model = s[S][h][1], this.device.identified = !0), "Microsoft" === S && "XDeviceEmulator" === h && (this.device.manufacturer = null, this.device.model = null, this.device.type = "emulator", this.device.identified = !0);
            }
          }
          if (c.match("Android")) {
            if (this.os.name = "Android", this.os.version = null, (match = /Android(?: )?(?:AllPhone_|CyanogenMod_)?(?:\/)?v?([0-9.]+)/.exec(c.replace("-update", "."))) && (this.os.version = new l({
              value: match[1],
              details: 3
            })), c.match("Android Eclair") && (this.os.version = new l({
              value: "2.0",
              details: 3
            })), this.device.type = "mobile", this.os.version >= 3 && (this.device.type = "tablet"), this.os.version >= 4 && c.match("Mobile") && (this.device.type = "mobile"), (match = /Eclair; (?:[a-zA-Z][a-zA-Z](?:[-_][a-zA-Z][a-zA-Z])?) Build\/([^\/]*)\//.exec(c)) ? this.device.model = match[1] : (match = /; ([^;]*[^;\s])\s+Build/.exec(c)) ? this.device.model = match[1] : (match = /[a-zA-Z][a-zA-Z](?:[-_][a-zA-Z][a-zA-Z])?; ([^;]*[^;\s]);\s+Build/.exec(c)) ? this.device.model = match[1] : (match = /\(([^;]+);U;Android\/[^;]+;[0-9]+\*[0-9]+;CTC\/2.0\)/.exec(c)) ? this.device.model = match[1] : (match = /;\s?([^;]+);\s?[0-9]+\*[0-9]+;\s?CTC\/2.0/.exec(c)) ? this.device.model = match[1] : (match = /zh-cn;\s*(.*?)(\/|build)/i.exec(c)) ? this.device.model = match[1] : (match = /Android [^;]+; (?:[a-zA-Z][a-zA-Z](?:[-_][a-zA-Z][a-zA-Z])?; )?([^)]+)\)/.exec(c)) ? c.match(/[a-zA-Z][a-zA-Z](?:[-_][a-zA-Z][a-zA-Z])?/) || (this.device.model = match[1]) : (match = /^(.+?)\/\S+/i.exec(c)) && (this.device.model = match[1]), this.device.model && "Android" === this.device.model.substring(0, 7) && (this.device.model = null), this.device.model) {
              h = m(this.device.model);
              void 0 !== n[h] && (this.device.manufacturer = n[h][0], this.device.model = n[h][1], void 0 !== n[h][2] && (this.device.type = n[h][2]), this.device.identified = !0), "Emulator" !== h && "x86 Emulator" !== h && "x86 VirtualBox" !== h && "vm" !== h || (this.device.manufacturer = null, this.device.model = null, this.device.type = "emulator", this.device.identified = !0);
            }
            c.match("HP eStation") && (this.device.manufacturer = "HP", this.device.model = "eStation", this.device.type = "tablet", this.device.identified = !0), c.match("Pre/1.0") && (this.device.manufacturer = "Palm", this.device.model = "Pre", this.device.identified = !0), c.match("Pre/1.1") && (this.device.manufacturer = "Palm", this.device.model = "Pre Plus", this.device.identified = !0), c.match("Pre/1.2") && (this.device.manufacturer = "Palm", this.device.model = "Pre 2", this.device.identified = !0), c.match("Pre/3.0") && (this.device.manufacturer = "HP", this.device.model = "Pre 3", this.device.identified = !0), c.match("Pixi/1.0") && (this.device.manufacturer = "Palm", this.device.model = "Pixi", this.device.identified = !0), c.match("Pixi/1.1") && (this.device.manufacturer = "Palm", this.device.model = "Pixi Plus", this.device.identified = !0), c.match("P160UN?A?/1.0") && (this.device.manufacturer = "HP", this.device.model = "Veer", this.device.identified = !0);
          }
          if (c.match("GoogleTV") && (this.os.name = "Google TV", c.match("Chrome/5.") && (this.os.version = new l({ value: "1" })), c.match("Chrome/11.") && (this.os.version = new l({ value: "2" })), this.device.type = "television"), c.match("WoPhone") && (this.os.name = "WoPhone", (match = /WoPhone\/([0-9\.]*)/.exec(c)) && (this.os.version = new l({ value: match[1] })), this.device.type = "mobile"), c.match("BlackBerry") && (this.os.name = "BlackBerry OS", c.match("Opera") ? this.device.model = "BlackBerry" : ((match = /BlackBerry([0-9]*)\/([0-9.]*)/.exec(c)) && (this.device.model = match[1], this.os.version = new l({
            value: match[2],
            details: 2
          })), (match = /; BlackBerry ([0-9]*);/.exec(c)) && (this.device.model = match[1]), (match = /Version\/([0-9.]*)/.exec(c)) && (this.os.version = new l({
            value: match[1],
            details: 2
          })), this.os.version >= 10 && (this.os.name = "BlackBerry"), void 0 !== this.device.model ? void 0 !== r[this.device.model] ? this.device.model = "BlackBerry " + r[this.device.model] + " " + this.device.model : this.device.model = "BlackBerry " + this.device.model : this.device.model = "BlackBerry"), this.device.manufacturer = "RIM", this.device.type = "mobile", this.device.identified = !0), c.match("RIM Tablet OS") ? (this.os.name = "BlackBerry Tablet OS", this.os.version = new l({
            value: c.match(/RIM Tablet OS ([0-9.]*)/)[1],
            details: 2
          }), this.device.manufacturer = "RIM", this.device.model = "BlackBerry PlayBook", this.device.type = "tablet", this.device.identified = !0) : c.match("PlayBook") && (match = /Version\/(10[0-9.]*)/.exec(c)) && (this.os.name = "BlackBerry", this.os.version = new l({
            value: match[1],
            details: 2
          }), this.device.manufacturer = "RIM", this.device.model = "BlackBerry PlayBook", this.device.type = "tablet", this.device.identified = !0), c.match("(?:web|hpw)OS") && (this.os.name = "webOS", this.os.version = new l({ value: c.match(/(?:web|hpw)OS\/([0-9.]*)/)[1] }), c.match("tablet") ? this.device.type = "tablet" : this.device.type = "mobile", this.device.manufacturer = c.match("hpwOS") ? "HP" : "Palm", c.match("Pre/1.0") && (this.device.model = "Pre"), c.match("Pre/1.1") && (this.device.model = "Pre Plus"), c.match("Pre/1.2") && (this.device.model = "Pre2"), c.match("Pre/3.0") && (this.device.model = "Pre3"), c.match("Pixi/1.0") && (this.device.model = "Pixi"), c.match("Pixi/1.1") && (this.device.model = "Pixi Plus"), c.match("P160UN?A?/1.0") && (this.device.model = "Veer"), c.match("TouchPad/1.0") && (this.device.model = "TouchPad"), (c.match("Emulator/") || c.match("Desktop/")) && (this.device.type = "emulator", this.device.manufacturer = null, this.device.model = null), this.device.identified = !0), (c.match("Symbian") || c.match("Series[ ]?60") || c.match("S60")) && (this.os.name = "Series60", c.match("SymbianOS/9.1") && !c.match("Series60") && (this.os.version = new l({ value: "3.0" })), (match = /Series60\/([0-9.]*)/.exec(c)) && (this.os.version = new l({ value: match[1] })), (match = /Nokia([^\/;]+)[\/|;]/.exec(c)) && "Browser" !== match[1] && (this.device.manufacturer = "Nokia", this.device.model = match[1], this.device.identified = !0), (match = /Vertu([^\/;]+)[\/|;]/.exec(c)) && (this.device.manufacturer = "Vertu", this.device.model = match[1], this.device.identified = !0), (match = /Symbian; U; ([^;]+); [a-z][a-z]\-[a-z][a-z]/i.exec(c)) && (this.device.manufacturer = "Nokia", this.device.model = match[1], this.device.identified = !0), (match = /Samsung\/([^;]*);/.exec(c)) && (this.device.manufacturer = "Samsung", this.device.model = match[1], this.device.identified = !0), this.device.type = "mobile"), c.match("Series40") && (this.os.name = "Series40", (match = /Nokia([^\/]+)\//.exec(c)) && (this.device.manufacturer = "Nokia", this.device.model = match[1], this.device.identified = !0), this.device.type = "mobile"), c.match("MeeGo") && (this.os.name = "MeeGo", this.device.type = "mobile", (match = /Nokia([^\)]+)\)/.exec(c)) && (this.device.manufacturer = "Nokia", this.device.model = match[1], this.device.identified = !0)), c.match("Maemo") && (this.os.name = "Maemo", this.device.type = "mobile", (match = /(N[0-9]+)/.exec(c)) && (this.device.manufacturer = "Nokia", this.device.model = match[1], this.device.identified = !0)), c.match("Tizen") && (this.os.name = "Tizen", (match = /Tizen[\/ ]([0-9.]*)/.exec(c)) && (this.os.version = new l({ value: match[1] })), this.device.type = "mobile", (match = /\(([^;]+); ([^\/]+)\//.exec(c)) && "Linux" !== match[1] && (this.device.manufacturer = match[1], this.device.model = match[2], void 0 !== i[this.device.manufacturer] && void 0 !== i[this.device.manufacturer][this.device.model]))) {
            S = this.device.manufacturer, h = m(this.device.model);
            this.device.manufacturer = i[S][h][0], this.device.model = i[S][h][1], this.device.identified = !0;
          }
          if (c.match("[b|B]ada") && (this.os.name = "Bada", (match = /[b|B]ada\/([0-9.]*)/.exec(c)) && (this.os.version = new l({ value: match[1] })), this.device.type = "mobile", (match = /\(([^;]+); ([^\/]+)\//.exec(c)) && (this.device.manufacturer = match[1], this.device.model = m(match[2])), void 0 !== a[this.device.manufacturer] && void 0 !== a[this.device.manufacturer][this.device.model])) {
            S = this.device.manufacturer, h = m(this.device.model);
            this.device.manufacturer = a[S][h][0], this.device.model = a[S][h][1], this.device.identified = !0;
          }
          if ((c.match(/BREW/i) || c.match("BMP; U")) && (this.os.name = "Brew", this.device.type = "mobile", (match = /BREW; U; ([0-9.]*)/i.exec(c)) ? this.os.version = new l({ value: match[1] }) : (match = /;BREW\/([0-9.]*)/i.exec(c)) && (this.os.version = new l({ value: match[1] })), (match = /\(([^;]+);U;REX\/[^;]+;BREW\/[^;]+;(?:.*;)?[0-9]+\*[0-9]+;CTC\/2.0\)/.exec(c)) && (this.device.model = match[1]), this.device.model)) {
            h = m(this.device.model);
            void 0 !== o[h] && (this.device.manufacturer = o[h][0], this.device.model = o[h][1], this.device.identified = !0);
          }
          if (c.match(/\(MTK;/) && (this.os.name = "MTK", this.device.type = "mobile"), c.match("CrOS") && (this.os.name = "Chrome OS", this.device.type = "desktop"), c.match("Joli OS") && (this.os.name = "Joli OS", this.device.type = "desktop", (match = /Joli OS\/([0-9.]*)/i.exec(c)) && (this.os.version = new l({ value: match[1] }))), c.match("Haiku") && (this.os.name = "Haiku", this.device.type = "desktop"), c.match("QNX") && (this.os.name = "QNX", this.device.type = "mobile"), c.match("OS/2; Warp") && (this.os.name = "OS/2 Warp", this.device.type = "desktop", (match = /OS\/2; Warp ([0-9.]*)/i.exec(c)) && (this.os.version = new l({ value: match[1] }))), c.match("Grid OS") && (this.os.name = "Grid OS", this.device.type = "tablet", (match = /Grid OS ([0-9.]*)/i.exec(c)) && (this.os.version = new l({ value: match[1] }))), c.match(/AmigaOS/i) && (this.os.name = "AmigaOS", this.device.type = "desktop", (match = /AmigaOS ([0-9.]*)/i.exec(c)) && (this.os.version = new l({ value: match[1] }))), c.match(/MorphOS/i) && (this.os.name = "MorphOS", this.device.type = "desktop", (match = /MorphOS ([0-9.]*)/i.exec(c)) && (this.os.version = new l({ value: match[1] }))), c.match("Kindle") && !c.match("Fire") && (this.os.name = "", this.device.manufacturer = "Amazon", this.device.model = "Kindle", this.device.type = "ereader", c.match("Kindle/2.0") && (this.device.model = "Kindle 2"), c.match("Kindle/3.0") && (this.device.model = "Kindle 3 or later"), this.device.identified = !0), c.match("nook browser") && (this.os.name = "Android", this.device.manufacturer = "Barnes & Noble", this.device.model = "NOOK", this.device.type = "ereader", this.device.identified = !0), c.match("bookeen/cybook") && (this.os.name = "", this.device.manufacturer = "Bookeen", this.device.model = "Cybook", this.device.type = "ereader", c.match("Orizon") && (this.device.model = "Cybook Orizon"), this.device.identified = !0), c.match("EBRD1101") && (this.os.name = "", this.device.manufacturer = "Sony", this.device.model = "Reader", this.device.type = "ereader", this.device.identified = !0), c.match("Iriver ;") && (this.os.name = "", this.device.manufacturer = "iRiver", this.device.model = "Story", this.device.type = "ereader", c.match("EB07") && (this.device.model = "Story HD EB07"), this.device.identified = !0), c.match("Nintendo Wii") && (this.os.name = "", this.device.manufacturer = "Nintendo", this.device.model = "Wii", this.device.type = "gaming", this.device.identified = !0), c.match("Nintendo DSi") && (this.os.name = "", this.device.manufacturer = "Nintendo", this.device.model = "DSi", this.device.type = "gaming", this.device.identified = !0), c.match("Nintendo 3DS") && (this.os.name = "", this.device.manufacturer = "Nintendo", this.device.model = "3DS", this.device.type = "gaming", (match = /Version\/([0-9.]*)/.exec(c)) && (this.os.version = new l({ value: match[1] })), this.device.identified = !0), c.match("PlayStation Portable") && (this.os.name = "", this.device.manufacturer = "Sony", this.device.model = "Playstation Portable", this.device.type = "gaming", this.device.identified = !0), c.match("PlayStation Vita") && (this.os.name = "", (match = /PlayStation Vita ([0-9.]*)/.exec(c)) && (this.os.version = new l({ value: match[1] })), this.device.manufacturer = "Sony", this.device.model = "PlayStation Vita", this.device.type = "gaming", this.device.identified = !0), c.match(/PlayStation 3/i) && (this.os.name = "", (match = /PLAYSTATION 3;? ([0-9.]*)/.exec(c)) && (this.os.version = new l({ value: match[1] })), this.device.manufacturer = "Sony", this.device.model = "Playstation 3", this.device.type = "gaming", this.device.identified = !0), c.match("Viera") && (this.os.name = "", this.device.manufacturer = "Panasonic", this.device.model = "Smart Viera", this.device.type = "television", this.device.identified = !0), (c.match("AQUOSBrowser") || c.match("AQUOS-AS")) && (this.os.name = "", this.device.manufacturer = "Sharp", this.device.model = "Aquos TV", this.device.type = "television", this.device.identified = !0), c.match("SMART-TV") && (this.os.name = "", this.device.manufacturer = "Samsung", this.device.model = "Smart TV", this.device.type = "television", this.device.identified = !0, (match = /Maple([0-9]*)/.exec(c)) && (this.device.model += " " + match[1])), c.match("SonyDTV|SonyBDP|SonyCEBrowser") && (this.os.name = "", this.device.manufacturer = "Sony", this.device.model = "Internet TV", this.device.type = "television", this.device.identified = !0), c.match("NETTV/") && (this.os.name = "", this.device.manufacturer = "Philips", this.device.model = "Net TV", this.device.type = "television", this.device.identified = !0), (match = /LG NetCast\.(?:TV|Media)-([0-9]*)/.exec(c)) && (this.os.name = "", this.device.manufacturer = "LG", this.device.model = "NetCast TV " + match[1], this.device.type = "television", this.device.identified = !0), (match = /LGSmartTV/.exec(c)) && (this.os.name = "", this.device.manufacturer = "LG", this.device.model = "Smart TV", this.device.type = "television", this.device.identified = !0), (c.match("Toshiba_?TP/") || c.match("TSBNetTV/")) && (this.os.name = "", this.device.manufacturer = "Toshiba", this.device.model = "Smart TV", this.device.type = "television", this.device.identified = !0), (match = /mbxtWebKit\/([0-9.]*)/.exec(c)) && (this.os.name = "", this.browser.name = "MachBlue XT", this.browser.version = new l({
            value: match[1],
            details: 2
          }), this.device.type = "television"), (match = /\(ADB; ([^\)]+)\)/.exec(c)) && (this.os.name = "", this.device.manufacturer = "ADB", this.device.model = ("Unknown" !== match[1] ? match[1].replace("ADB", "") + " " : "") + "IPTV receiver", this.device.type = "television", this.device.identified = !0), c.match(/Mstar;OWB/) && (this.os.name = "", this.device.manufacturer = "MStar", this.device.model = "PVR", this.device.type = "television", this.device.identified = !0, this.browser.name = "Origyn Web Browser"), (match = /\TechniSat ([^;]+);/.exec(c)) && (this.os.name = "", this.device.manufacturer = "TechniSat", this.device.model = match[1], this.device.type = "television", this.device.identified = !0), (match = /\Technicolor_([^;]+);/.exec(c)) && (this.os.name = "", this.device.manufacturer = "Technicolor", this.device.model = match[1], this.device.type = "television", this.device.identified = !0), (match = /Winbox Evo2/.exec(c)) && (this.os.name = "", this.device.manufacturer = "Winbox", this.device.model = "Evo2", this.device.type = "television", this.device.identified = !0), match = /^Roku\/DVP-([0-9]+)/.exec(c)) {
            switch (this.device.manufacturer = "Roku", this.device.type = "television", match[1]) {
              case"2000":
                this.device.model = "HD";
                break;
              case"2050":
                this.device.model = "XD";
                break;
              case"2100":
                this.device.model = "XDS";
                break;
              case"2400":
                this.device.model = "LT";
                break;
              case"3000":
                this.device.model = "2 HD";
                break;
              case"3050":
                this.device.model = "2 XD";
                break;
              case"3100":
                this.device.model = "2 XS";
            }
            this.device.identified = !0;
          }
          if (match = /HbbTV\/1.1.1 \([^;]*;\s*([^;]*)\s*;\s*([^;]*)\s*;/.exec(c)) {
            var d = match[1].trim(), u = match[2].trim();
            if (!this.device.manufacturer && "" !== d && "vendorName" !== d) {
              switch (d) {
                case"LGE":
                  this.device.manufacturer = "LG";
                  break;
                case"TOSHIBA":
                  this.device.manufacturer = "Toshiba";
                  break;
                case"smart":
                  this.device.manufacturer = "Smart";
                  break;
                case"tv2n":
                  this.device.manufacturer = "TV2N";
                  break;
                default:
                  this.device.manufacturer = d;
              }
              if (!this.device.model && "" !== u && "modelName" !== u) {
                switch (u) {
                  case"GLOBAL_PLAT3":
                    this.device.model = "NetCast TV";
                    break;
                  case"SmartTV2012":
                    this.device.model = "Smart TV 2012";
                    break;
                  case"videoweb":
                    this.device.model = "Videoweb";
                    break;
                  default:
                    this.device.model = u;
                }
                "Humax" === d && (this.device.model = this.device.model.toUpperCase()), this.device.identified = !0, this.os.name = "";
              }
            }
            this.device.type = "television";
          }
          if (c.match("InettvBrowser") && (this.device.type = "television"), c.match("MIDP") && (this.device.type = "mobile"), !this.device.model && !this.device.manufacturer) {
            var H = [];
            c.match(/^(Mozilla|Opera)/) || (match = /^(?:MQQBrowser\/[0-9\.]+\/)?([^\s]+)/.exec(c)) && (match[1] = match[1].replace(/_TD$/, ""), match[1] = match[1].replace(/_CMCC$/, ""), match[1] = match[1].replace(/[_ ]Mozilla$/, ""), match[1] = match[1].replace(/ Linux$/, ""), match[1] = match[1].replace(/ Opera$/, ""), match[1] = match[1].replace(/\/[0-9].*$/, ""), H.push(match[1])), (match = /[0-9]+x[0-9]+; ([^;]+)/.exec(c)) && H.push(match[1]), (match = /[0-9]+X[0-9]+ ([^;\/\(\)]+)/.exec(c)) && H.push(match[1]), (match = /Windows NT 5.1; ([^;]+); Windows Phone/.exec(c)) && H.push(match[1]), (match = /\) PPC; (?:[0-9]+x[0-9]+; )?([^;\/\(\)]+)/.exec(c)) && H.push(match[1]), (match = /\(([^;]+); U; Windows Mobile/.exec(c)) && H.push(match[1]), (match = /Vodafone\/1.0\/([^\/]+)/.exec(c)) && H.push(match[1]), (match = /\ ([^\s]+)$/.exec(c)) && H.push(match[1]);
            for (var G = 0; G < H.length; G++) {
              if (!this.device.model && !this.device.manufacturer) {
                h = m(H[G]);
                var C = !1;
                "Android" === this.os.name && void 0 !== n[h] && (this.device.manufacturer = n[h][0], this.device.model = n[h][1], void 0 !== n[h][2] && (this.device.type = n[h][2]), this.device.identified = !0, C = !0), this.os.name && "Windows" !== this.os.name && "Windows Mobile" !== this.os.name && "Windows CE" !== this.os.name || void 0 !== t[h] && (this.device.manufacturer = t[h][0], this.device.model = t[h][1], this.device.type = "mobile", this.device.identified = !0, "Windows Mobile" !== this.os.name && (this.os.name = "Windows Mobile", this.os.version = null), C = !0);
              }
              if (!C && ((match = /^GIONEE-([^\s]+)/.exec(H[G])) && (this.device.manufacturer = "Gionee", this.device.model = m(match[1]), this.device.type = "mobile", this.device.identified = !0), (match = /^HTC_?([^\/_]+)(?:\/|_|$)/.exec(H[G])) && (this.device.manufacturer = "HTC", this.device.model = m(match[1]), this.device.type = "mobile", this.device.identified = !0), (match = /^HUAWEI-([^\/]*)/.exec(H[G])) && (this.device.manufacturer = "Huawei", this.device.model = m(match[1]), this.device.type = "mobile", this.device.identified = !0), (match = /(?:^|\()LGE?(?:\/|-|_|\s)([^\s]*)/.exec(H[G])) && (this.device.manufacturer = "LG", this.device.model = m(match[1]), this.device.type = "mobile", this.device.identified = !0), (match = /^MOT-([^\/_]+)(?:\/|_|$)/.exec(H[G])) && (this.device.manufacturer = "Motorola", this.device.model = m(match[1]), this.device.type = "mobile", this.device.identified = !0), (match = /^Motorola_([^\/_]+)(?:\/|_|$)/.exec(H[G])) && (this.device.manufacturer = "Motorola", this.device.model = m(match[1]), this.device.type = "mobile", this.device.identified = !0), (match = /^Nokia([^\/]+)(?:\/|$)/.exec(H[G])) && (this.device.manufacturer = "Nokia", this.device.model = m(match[1]), this.device.type = "mobile", this.device.identified = !0, this.os.name || (this.os.name = "Series40")), (match = /^SonyEricsson([^\/_]+)(?:\/|_|$)/.exec(H[G])) && (this.device.manufacturer = "Sony Ericsson", this.device.model = m(match[1]), this.device.type = "mobile", this.device.identified = !0), match = /^SAMSUNG-([^\/_]+)(?:\/|_|$)/.exec(H[G]))) if (this.device.manufacturer = "Samsung", this.device.model = m(match[1]), this.device.type = "mobile", "Bada" === this.os.name) {
                S = "SAMSUNG", h = m(this.device.model);
                void 0 !== a[S] && void 0 !== a[S][h] && (this.device.manufacturer = a[S][h][0], this.device.model = a[S][h][1], this.device.identified = !0);
              } else if (match = /Jasmine\/([0-9.]*)/.exec(c)) {
                var b = match[1];
                S = "SAMSUNG", h = m(this.device.model);
                void 0 !== e[S] && void 0 !== e[S][h] && (this.device.manufacturer = e[S][h][0], this.device.model = e[S][h][1], this.device.identified = !0, this.os.name = "Touchwiz", this.os.version = new l({ value: "2.0" }));
              } else if (match = /Dolfin\/([0-9.]*)/.exec(c)) {
                b = match[1], S = "SAMSUNG", h = m(this.device.model);
                if (void 0 !== a[S] && void 0 !== a[S][h]) switch (this.device.manufacturer = a[S][h][0], this.device.model = a[S][h][1], this.device.identified = !0, this.os.name = "Bada", b) {
                  case"2.0":
                    this.os.version = new l({ value: "1.0" });
                    break;
                  case"2.2":
                    this.os.version = new l({ value: "1.2" });
                    break;
                  case"3.0":
                    this.os.version = new l({ value: "2.0" });
                }
                if (void 0 !== e[S] && void 0 !== e[S][h]) switch (this.device.manufacturer = e[S][h][0], this.device.model = e[S][h][1], this.device.identified = !0, this.os.name = "Touchwiz", b) {
                  case"1.0":
                    this.os.version = new l({ value: "1.0" });
                    break;
                  case"1.5":
                    this.os.version = new l({ value: "2.0" });
                    break;
                  case"2.0":
                    this.os.version = new l({ value: "3.0" });
                }
              }
            }
          }
          if ((match = /\((?:LG[-|\/])(.*) (?:Browser\/)?AppleWebkit/.exec(c)) && (this.device.manufacturer = "LG", this.device.model = match[1], this.device.type = "mobile", this.device.identified = !0), (match = /^Mozilla\/5.0 \((?:Nokia|NOKIA)(?:\s?)([^\)]+)\)UC AppleWebkit\(like Gecko\) Safari\/530$/.exec(c)) && (this.device.manufacturer = "Nokia", this.device.model = match[1], this.device.type = "mobile", this.device.identified = !0, this.os.name = "Series60"), c.match("Safari") && ("iOS" === this.os.name && (this.browser.stock = !0, this.browser.hidden = !0, this.browser.name = "Safari", this.browser.version = null), "Mac OS X" !== this.os.name && "Windows" !== this.os.name || (this.browser.name = "Safari", this.browser.stock = "Mac OS X" === this.os.name, (match = /Version\/([0-9\.]+)/.exec(c)) && (this.browser.version = new l({ value: match[1] })), c.match(/AppleWebKit\/[0-9\.]+\+/) && (this.browser.name = "WebKit Nightly Build", this.browser.version = null))), c.match("MSIE") && (this.browser.name = "Internet Explorer", (c.match("IEMobile") || c.match("Windows CE") || c.match("Windows Phone") || c.match("WP7")) && (this.browser.name = "Mobile Internet Explorer"), (match = /MSIE ([0-9.]*)/.exec(c)) && (this.browser.version = new l({ value: match[1] }))), c.match(/Opera/i) && (this.browser.stock = !1, this.browser.name = "Opera", (match = /Opera[\/| ]([0-9.]*)/.exec(c)) && (this.browser.version = new l({ value: match[1] })), (match = /Version\/([0-9.]*)/.exec(c)) && (parseFloat(match[1]) >= 10 ? this.browser.version = new l({ value: match[1] }) : this.browser.version = null), this.browser.version && c.match("Edition Labs") && (this.browser.version.type = "alpha", this.browser.channel = "Labs"), this.browser.version && c.match("Edition Next") && (this.browser.version.type = "alpha", this.browser.channel = "Next"), c.match("Opera Tablet") && (this.browser.name = "Opera Mobile", this.device.type = "tablet"), c.match("Opera Mobi") && (this.browser.name = "Opera Mobile", this.device.type = "mobile"), (match = /Opera Mini;/.exec(c)) && (this.browser.name = "Opera Mini", this.browser.version = null, this.browser.mode = "proxy", this.device.type = "mobile"), (match = /Opera Mini\/(?:att\/)?([0-9.]*)/.exec(c)) && (this.browser.name = "Opera Mini", this.browser.version = new l({
            value: match[1],
            details: -1
          }), this.browser.mode = "proxy", this.device.type = "mobile"), "Opera" === this.browser.name && "mobile" === this.device.type && (this.browser.name = "Opera Mobile", c.match(/BER/) && (this.browser.name = "Opera Mini", this.browser.version = null)), c.match("InettvBrowser") && (this.device.type = "television"), (c.match("Opera TV") || c.match("Opera-TV")) && (this.browser.name = "Opera", this.device.type = "television"), c.match("Linux zbov") && (this.browser.name = "Opera Mobile", this.browser.mode = "desktop", this.device.type = "mobile", this.os.name = null, this.os.version = null), c.match("Linux zvav") && (this.browser.name = "Opera Mini", this.browser.version = null, this.browser.mode = "desktop", this.device.type = "mobile", this.os.name = null, this.os.version = null)), c.match("Firefox") && (this.browser.stock = !1, this.browser.name = "Firefox", (match = /Firefox\/([0-9ab.]*)/.exec(c)) && (this.browser.version = new l({ value: match[1] })), "alpha" === this.browser.version.type && (this.browser.channel = "Aurora"), "beta" === this.browser.version.type && (this.browser.channel = "Beta"), c.match("Fennec") && (this.device.type = "mobile"), c.match("Mobile; rv") && (this.device.type = "mobile"), c.match("Tablet; rv") && (this.device.type = "tablet"), "mobile" !== this.device.type && "tablet" !== this.device.type || (this.browser.name = "Firefox Mobile")), c.match("Namoroka") && (this.browser.stock = !1, this.browser.name = "Firefox", (match = /Namoroka\/([0-9ab.]*)/.exec(c)) && (this.browser.version = new l({ value: match[1] })), this.browser.channel = "Namoroka"), c.match("Shiretoko") && (this.browser.stock = !1, this.browser.name = "Firefox", (match = /Shiretoko\/([0-9ab.]*)/.exec(c)) && (this.browser.version = new l({ value: match[1] })), this.browser.channel = "Shiretoko"), c.match("Minefield") && (this.browser.stock = !1, this.browser.name = "Firefox", (match = /Minefield\/([0-9ab.]*)/.exec(c)) && (this.browser.version = new l({ value: match[1] })), this.browser.channel = "Minefield"), c.match("Firebird") && (this.browser.stock = !1, this.browser.name = "Firebird", (match = /Firebird\/([0-9ab.]*)/.exec(c)) && (this.browser.version = new l({ value: match[1] }))), c.match("SeaMonkey") && (this.browser.stock = !1, this.browser.name = "SeaMonkey", (match = /SeaMonkey\/([0-9.]*)/.exec(c)) && (this.browser.version = new l({ value: match[1] }))), c.match("Netscape") && (this.browser.stock = !1, this.browser.name = "Netscape", (match = /Netscape[0-9]?\/([0-9.]*)/.exec(c)) && (this.browser.version = new l({ value: match[1] }))), c.match("[k|K]onqueror/") && (this.browser.name = "Konqueror", (match = /[k|K]onqueror\/([0-9.]*)/.exec(c)) && (this.browser.version = new l({ value: match[1] }))), match = /(?:Chrome|CrMo|CriOS)\/([0-9.]*)/.exec(c)) if (this.browser.stock = !1, this.browser.name = "Chrome", this.browser.version = new l({ value: match[1] }), "Android" === this.os.name) switch (match[1].split(".", 3).join(".")) {
            case"16.0.912":
              this.browser.channel = "Beta";
              break;
            case"18.0.1025":
              this.browser.version.details = 1;
              break;
            default:
              this.browser.channel = "Nightly";
          } else switch (match[1].split(".", 3).join(".")) {
            case"0.2.149":
            case"0.3.154":
            case"0.4.154":
            case"1.0.154":
            case"2.0.172":
            case"3.0.195":
            case"4.0.249":
            case"4.1.249":
            case"5.0.375":
            case"6.0.472":
            case"7.0.517":
            case"8.0.552":
            case"9.0.597":
            case"10.0.648":
            case"11.0.696":
            case"12.0.742":
            case"13.0.782":
            case"14.0.835":
            case"15.0.874":
            case"16.0.912":
            case"17.0.963":
            case"18.0.1025":
            case"19.0.1084":
            case"20.0.1132":
            case"21.0.1180":
              0 === this.browser.version.minor ? this.browser.version.details = 1 : this.browser.version.details = 2;
              break;
            default:
              this.browser.channel = "Nightly";
          }
          if (c.match("chromeframe") && (this.browser.stock = !1, this.browser.name = "Chrome Frame", (match = /chromeframe\/([0-9.]*)/.exec(c)) && (this.browser.version = new l({ value: match[1] }))), c.match("Chromium") && (this.browser.stock = !1, this.browser.channel = "", this.browser.name = "Chromium", (match = /Chromium\/([0-9.]*)/.exec(c)) && (this.browser.version = new l({ value: match[1] }))), c.match("BrowserNG") && (this.browser.name = "Nokia Browser", (match = /BrowserNG\/([0-9.]*)/.exec(c)) && (this.browser.version = new l({
            value: match[1],
            details: 3,
            builds: !1
          }))), c.match("NokiaBrowser") && (this.browser.name = "Nokia Browser", (match = /NokiaBrowser\/([0-9.]*)/.exec(c)) && (this.browser.version = new l({
            value: match[1],
            details: 3
          }))), c.match("Maemo[ |_]Browser") && (this.browser.name = "MicroB", (match = /Maemo[ |_]Browser[ |_]([0-9.]*)/.exec(c)) && (this.browser.version = new l({
            value: match[1],
            details: 3
          }))), c.match("NetFront") && (this.browser.name = "NetFront", this.device.type = "mobile", (match = /NetFront\/([0-9.]*)/.exec(c)) && (this.browser.version = new l({ value: match[1] })), c.match("InettvBrowser") && (this.device.type = "television")), c.match("Silk") && c.match("Silk-Accelerated") && (this.browser.name = "Silk", (match = /Silk\/([0-9.]*)/.exec(c)) && (this.browser.version = new l({
            value: match[1],
            details: 2
          })), this.device.manufacturer = "Amazon", this.device.model = "Kindle Fire", this.device.type = "tablet", this.device.identified = !0, "Android" !== this.os.name && (this.os.name = "Android", this.os.version = null)), c.match("Dolfin") && (this.browser.name = "Dolfin", (match = /Dolfin\/([0-9.]*)/.exec(c)) && (this.browser.version = new l({ value: match[1] }))), c.match("Iris") && (this.browser.name = "Iris", this.device.type = "mobile", this.device.model = null, this.device.manufacturer = null, this.os.name = "Windows Mobile", this.os.version = null, (match = /Iris\/([0-9.]*)/.exec(c)) && (this.browser.version = new l({ value: match[1] })), (match = / WM([0-9]) /.exec(c)) ? this.os.version = new l({ value: match[1] + ".0" }) : this.browser.mode = "desktop"), c.match("Jasmine") && (this.browser.name = "Jasmine", (match = /Jasmine\/([0-9.]*)/.exec(c)) && (this.browser.version = new l({ value: match[1] }))), c.match("Boxee") && (this.browser.name = "Boxee", this.device.type = "television", (match = /Boxee\/([0-9.]*)/.exec(c)) && (this.browser.version = new l({ value: match[1] }))), c.match("Espial") && (this.browser.name = "Espial", this.os.name = "", this.os.version = null, "television" !== this.device.type && (this.device.type = "television", this.device.model = null, this.device.manufacturer = null), (match = /Espial\/([0-9.]*)/.exec(c)) && (this.browser.version = new l({ value: match[1] }))), (match = /ANTGalio\/([0-9.]*)/.exec(c)) && (this.browser.name = "ANT Galio", this.browser.version = new l({
            value: match[1],
            details: 3
          }), this.device.type = "television"), (match = /NX\/([0-9.]*)/.exec(c)) && (this.browser.name = "NetFront NX", this.browser.version = new l({
            value: match[1],
            details: 2
          }), (match = /DTV/i.exec(c)) ? this.device.type = "television" : (match = /mobile/i.exec(c)) ? this.device.type = "mobile" : this.device.type = "desktop", this.os.name = null, this.os.version = null), c.match(/Obigo/i) && (this.browser.name = "Obigo", (match = /Obigo\/([0-9.]*)/i.exec(c)) && (this.browser.version = new l({ value: match[1] })), (match = /Obigo\/([A-Z])([0-9.]*)/i.exec(c)) && (this.browser.name = "Obigo " + match[1], this.browser.version = new l({ value: match[2] })), (match = /Obigo-([A-Z])([0-9.]*)\//i.exec(c)) && (this.browser.name = "Obigo " + match[1], this.browser.version = new l({ value: match[2] }))), c.match("UCWEB") && (this.browser.stock = !1, this.browser.name = "UC Browser", (match = /UCWEB([0-9]*[.][0-9]*)/.exec(c)) && (this.browser.version = new l({
            value: match[1],
            details: 3
          })), "Linux" === this.os.name && (this.os.name = ""), this.device.type = "mobile", (match = /^IUC \(U;\s?iOS ([0-9\.]+);/.exec(c)) && (this.os.name = "iOS", this.os.version = new l({ value: match[1] })), match = /^JUC \(Linux; U; ([0-9\.]+)[^;]*; [^;]+; ([^;]*[^\s])\s*; [0-9]+\*[0-9]+\)/.exec(c))) {
            h = m(match[2]);
            this.os.name = "Android", this.os.version = new l({ value: match[1] }), void 0 !== n[h] && (this.device.manufacturer = n[h][0], this.device.model = n[h][1], void 0 !== n[h][2] && (this.device.type = n[h][2]), this.device.identified = !0);
          }
          (c.match(/\) UC /) && (this.browser.stock = !1, this.browser.name = "UC Browser"), (match = /UCBrowser\/([0-9.]*)/.exec(c)) && (this.browser.stock = !1, this.browser.name = "UC Browser", this.browser.version = new l({
            value: match[1],
            details: 2
          })), (match = /Ninesky(?:-android-mobile(?:-cn)?)?\/([0-9.]*)/.exec(c)) && (this.browser.name = "NineSky", this.browser.version = new l({ value: match[1] }), "Android" !== this.os.name && (this.os.name = "Android", this.os.version = null, this.device.manufacturer = null, this.device.model = null)), (match = /Skyfire\/([0-9.]*)/.exec(c)) && (this.browser.name = "Skyfire", this.browser.version = new l({ value: match[1] }), this.device.type = "mobile", this.os.name = "Android", this.os.version = null), (match = /DolphinHDCN\/([0-9.]*)/.exec(c)) && (this.browser.name = "Dolphin", this.browser.version = new l({ value: match[1] }), this.device.type = "mobile", "Android" !== this.os.name && (this.os.name = "Android", this.os.version = null)), (match = /Dolphin\/INT/.exec(c)) && (this.browser.name = "Dolphin", this.device.type = "mobile"), match = /(M?QQBrowser)\/([0-9.]*)/.exec(c)) && (this.browser.name = "QQ Browser", (b = match[2]).match(/^[0-9][0-9]$/) && (b = b[0] + "." + b[1]), this.browser.version = new l({
            value: b,
            details: 2
          }), this.browser.channel = "", this.os.name || "QQBrowser" !== match[1] || (this.os.name = "Windows"));
          (match = /(iBrowser)\/([0-9.]*)/.exec(c)) && (this.browser.name = "iBrowser", (b = match[2]).match(/[0-9][0-9]/) && (b = b[0] + "." + b[1]), this.browser.version = new l({
            value: b,
            details: 2
          }), this.browser.channel = "");
          (match = /Puffin\/([0-9.]*)/.exec(c)) && (this.browser.name = "Puffin", this.browser.version = new l({
            value: match[1],
            details: 2
          }), this.device.type = "mobile", "Linux" === this.os.name && (this.os.name = null, this.os.version = null)), c.match("360EE") && (this.browser.stock = !1, this.browser.name = "360 Extreme Explorer", this.browser.version = null), (match = /Midori\/([0-9.]*)/.exec(c)) && (this.browser.name = "Midori", this.browser.version = new l({ value: match[1] }), "Linux" !== this.os.name && (this.os.name = "Linux", this.os.version = null), this.device.manufacturer = null, this.device.model = null, this.device.type = "desktop");
          for (var v = [{ name: "AdobeAIR", regexp: /AdobeAIR\/([0-9.]*)/ }, {
            name: "Awesomium",
            regexp: /Awesomium\/([0-9.]*)/
          }, { name: "Canvace", regexp: /Canvace Standalone\/([0-9.]*)/ }, {
            name: "Ekioh",
            regexp: /Ekioh\/([0-9.]*)/
          }, { name: "JavaFX", regexp: /JavaFX\/([0-9.]*)/ }, {
            name: "GFXe",
            regexp: /GFXe\/([0-9.]*)/
          }, { name: "LuaKit", regexp: /luakit/ }, {
            name: "Titanium",
            regexp: /Titanium\/([0-9.]*)/
          }, { name: "OpenWebKitSharp", regexp: /OpenWebKitSharp/ }, {
            name: "Prism",
            regexp: /Prism\/([0-9.]*)/
          }, { name: "Qt", regexp: /Qt\/([0-9.]*)/ }, {
            name: "QtEmbedded",
            regexp: /QtEmbedded/
          }, { name: "QtEmbedded", regexp: /QtEmbedded.*Qt\/([0-9.]*)/ }, {
            name: "RhoSimulator",
            regexp: /RhoSimulator/
          }, { name: "UWebKit", regexp: /UWebKit\/([0-9.]*)/ }, {
            name: "PhantomJS",
            regexp: /PhantomJS\/([0-9.]*)/
          }, { name: "Google Web Preview", regexp: /Google Web Preview/ }, {
            name: "Google Earth",
            regexp: /Google Earth\/([0-9.]*)/
          }, { name: "EA Origin", regexp: /Origin\/([0-9.]*)/ }, {
            name: "SecondLife",
            regexp: /SecondLife\/([0-9.]*)/
          }, { name: "Valve Steam", regexp: /Valve Steam/ }, {
            name: "Songbird",
            regexp: /Songbird\/([0-9.]*)/
          }, { name: "Thunderbird", regexp: /Thunderbird\/([0-9.]*)/ }, {
            name: "Abrowser",
            regexp: /Abrowser\/([0-9.]*)/
          }, { name: "arora", regexp: /[Aa]rora\/([0-9.]*)/ }, {
            name: "Baidu Browser",
            regexp: /M?BaiduBrowser\/([0-9.]*)/i
          }, { name: "Camino", regexp: /Camino\/([0-9.]*)/ }, {
            name: "Canure",
            regexp: /Canure\/([0-9.]*)/,
            details: 3
          }, { name: "CometBird", regexp: /CometBird\/([0-9.]*)/ }, {
            name: "Comodo Dragon",
            regexp: /Comodo_Dragon\/([0-9.]*)/,
            details: 2
          }, { name: "Conkeror", regexp: /[Cc]onkeror\/([0-9.]*)/ }, {
            name: "CoolNovo",
            regexp: /(?:CoolNovo|CoolNovoChromePlus)\/([0-9.]*)/,
            details: 3
          }, { name: "ChromePlus", regexp: /ChromePlus(?:\/([0-9.]*))?$/, details: 3 }, {
            name: "Daedalus",
            regexp: /Daedalus ([0-9.]*)/,
            details: 2
          }, { name: "Demobrowser", regexp: /demobrowser\/([0-9.]*)/ }, {
            name: "Dooble",
            regexp: /Dooble(?:\/([0-9.]*))?/
          }, { name: "DWB", regexp: /dwb(?:-hg)?(?:\/([0-9.]*))?/ }, {
            name: "Epiphany",
            regexp: /Epiphany\/([0-9.]*)/
          }, { name: "FireWeb", regexp: /FireWeb\/([0-9.]*)/ }, {
            name: "Flock",
            regexp: /Flock\/([0-9.]*)/,
            details: 3
          }, { name: "Galeon", regexp: /Galeon\/([0-9.]*)/, details: 3 }, {
            name: "Helium",
            regexp: /HeliumMobileBrowser\/([0-9.]*)/
          }, { name: "iCab", regexp: /iCab\/([0-9.]*)/ }, {
            name: "Iceape",
            regexp: /Iceape\/([0-9.]*)/
          }, { name: "IceCat", regexp: /IceCat ([0-9.]*)/ }, {
            name: "Iceweasel",
            regexp: /Iceweasel\/([0-9.]*)/
          }, { name: "InternetSurfboard", regexp: /InternetSurfboard\/([0-9.]*)/ }, {
            name: "Iron",
            regexp: /Iron\/([0-9.]*)/,
            details: 2
          }, { name: "Isis", regexp: /BrowserServer/ }, { name: "Jumanji", regexp: /jumanji/ }, {
            name: "Kazehakase",
            regexp: /Kazehakase\/([0-9.]*)/
          }, { name: "KChrome", regexp: /KChrome\/([0-9.]*)/, details: 3 }, {
            name: "K-Meleon",
            regexp: /K-Meleon\/([0-9.]*)/
          }, { name: "Leechcraft", regexp: /Leechcraft(?:\/([0-9.]*))?/, details: 2 }, {
            name: "Lightning",
            regexp: /Lightning\/([0-9.]*)/
          }, { name: "Lunascape", regexp: /Lunascape[\/| ]([0-9.]*)/, details: 3 }, {
            name: "iLunascape",
            regexp: /iLunascape\/([0-9.]*)/,
            details: 3
          }, { name: "Maxthon", regexp: /Maxthon[\/ ]([0-9.]*)/, details: 3 }, {
            name: "MiniBrowser",
            regexp: /MiniBr?owserM\/([0-9.]*)/
          }, { name: "MiniBrowser", regexp: /MiniBrowserMobile\/([0-9.]*)/ }, {
            name: "MixShark",
            regexp: /MixShark\/([0-9.]*)/
          }, {
            name: "Motorola WebKit",
            regexp: /MotorolaWebKit\/([0-9.]*)/,
            details: 3
          }, { name: "NetFront LifeBrowser", regexp: /NetFrontLifeBrowser\/([0-9.]*)/ }, {
            name: "Netscape Navigator",
            regexp: /Navigator\/([0-9.]*)/,
            details: 3
          }, { name: "Odyssey", regexp: /OWB\/([0-9.]*)/ }, { name: "OmniWeb", regexp: /OmniWeb/ }, {
            name: "Orca",
            regexp: /Orca\/([0-9.]*)/
          }, { name: "Origyn", regexp: /Origyn Web Browser/ }, {
            name: "Palemoon",
            regexp: /Pale[mM]oon\/([0-9.]*)/
          }, { name: "Phantom", regexp: /Phantom\/V([0-9.]*)/ }, {
            name: "Polaris",
            regexp: /Polaris\/v?([0-9.]*)/i,
            details: 2
          }, { name: "QtCreator", regexp: /QtCreator\/([0-9.]*)/ }, {
            name: "QtQmlViewer",
            regexp: /QtQmlViewer/
          }, { name: "QtTestBrowser", regexp: /QtTestBrowser\/([0-9.]*)/ }, {
            name: "QtWeb",
            regexp: /QtWeb Internet Browser\/([0-9.]*)/
          }, { name: "QupZilla", regexp: /QupZilla\/([0-9.]*)/ }, {
            name: "Roccat",
            regexp: /Roccat\/([0-9]\.[0-9.]*)/
          }, { name: "Raven for Mac", regexp: /Raven for Mac\/([0-9.]*)/ }, {
            name: "rekonq",
            regexp: /rekonq/
          }, { name: "RockMelt", regexp: /RockMelt\/([0-9.]*)/, details: 2 }, {
            name: "Sleipnir",
            regexp: /Sleipnir\/([0-9.]*)/,
            details: 3
          }, { name: "SMBrowser", regexp: /SMBrowser/ }, {
            name: "Sogou Explorer",
            regexp: /SE 2.X MetaSr/
          }, { name: "Snowshoe", regexp: /Snowshoe\/([0-9.]*)/, details: 2 }, {
            name: "Sputnik",
            regexp: /Sputnik\/([0-9.]*)/i,
            details: 3
          }, { name: "Stainless", regexp: /Stainless\/([0-9.]*)/ }, {
            name: "SunChrome",
            regexp: /SunChrome\/([0-9.]*)/
          }, { name: "Surf", regexp: /Surf\/([0-9.]*)/ }, {
            name: "TaoBrowser",
            regexp: /TaoBrowser\/([0-9.]*)/,
            details: 2
          }, { name: "TaomeeBrowser", regexp: /TaomeeBrowser\/([0-9.]*)/, details: 2 }, {
            name: "TazWeb",
            regexp: /TazWeb/
          }, { name: "Viera", regexp: /Viera\/([0-9.]*)/ }, {
            name: "Villanova",
            regexp: /Villanova\/([0-9.]*)/,
            details: 3
          }, {
            name: "Wavelink Velocity",
            regexp: /Wavelink Velocity Browser\/([0-9.]*)/,
            details: 2
          }, { name: "WebPositive", regexp: /WebPositive/ }, { name: "WebRender", regexp: /WebRender/ }, {
            name: "Wyzo",
            regexp: /Wyzo\/([0-9.]*)/,
            details: 3
          }, { name: "Zetakey", regexp: /Zetakey Webkit\/([0-9.]*)/ }, {
            name: "Zetakey",
            regexp: /Zetakey\/([0-9.]*)/
          }], p = 0; p < v.length; p++) (match = v[p].regexp.exec(c)) && (this.browser.name = v[p].name, this.browser.channel = "", this.browser.stock = !1, match[1] ? this.browser.version = new l({
            value: match[1],
            details: v[p].details || null
          }) : this.browser.version = null);
          if ((match = /WebKit\/([0-9.]*)/i.exec(c)) && (this.engine.name = "Webkit", this.engine.version = new l({ value: match[1] })), (match = /Browser\/AppleWebKit([0-9.]*)/i.exec(c)) && (this.engine.name = "Webkit", this.engine.version = new l({ value: match[1] })), (match = /KHTML\/([0-9.]*)/.exec(c)) && (this.engine.name = "KHTML", this.engine.version = new l({ value: match[1] })), /Gecko/.exec(c) && !/like Gecko/i.exec(c) && (this.engine.name = "Gecko", (match = /; rv:([^\)]+)\)/.exec(c)) && (this.engine.version = new l({ value: match[1] }))), (match = /Presto\/([0-9.]*)/.exec(c)) && (this.engine.name = "Presto", this.engine.version = new l({ value: match[1] })), (match = /Trident\/([0-9.]*)/.exec(c)) && (this.engine.name = "Trident", this.engine.version = new l({ value: match[1] }), "Internet Explorer" === this.browser.name && (6 === T(this.engine.version) && parseFloat(this.browser.version) < 10 && (this.browser.version = new l({ value: "10.0" }), this.browser.mode = "compat"), 5 === T(this.engine.version) && parseFloat(this.browser.version) < 9 && (this.browser.version = new l({ value: "9.0" }), this.browser.mode = "compat"), 4 === T(this.engine.version) && parseFloat(this.browser.version) < 8 && (this.browser.version = new l({ value: "8.0" }), this.browser.mode = "compat")), "Windows Phone" === this.os.name && 5 === T(this.engine.version) && parseFloat(this.os.version) < 7.5 && (this.os.version = new l({ value: "7.5" }))), "Android" === this.os.name && this.browser.stock && (this.browser.hidden = !0), "iOS" === this.os.name && "Opera Mini" === this.browser.name && (this.os.version = null), "Midori" === this.browser.name && "Webkit" !== this.engine.name && (this.engine.name = "Webkit", this.engine.version = null), "television" === this.device.type && "Opera" === this.browser.name) {
            switch (this.browser.name = "Opera Devices", !0) {
              case this.engine.version.is("2.10"):
                this.browser.version = new l({ value: 3.2 });
                break;
              case this.engine.version.is("2.9"):
                this.browser.version = new l({ value: 3.1 });
                break;
              case this.engine.version.is("2.8"):
                this.browser.version = new l({ value: 3 });
                break;
              case this.engine.version.is("2.7"):
                this.browser.version = new l({ value: 2.9 });
                break;
              case this.engine.version.is("2.6"):
                this.browser.version = new l({ value: 2.8 });
                break;
              case this.engine.version.is("2.4"):
                this.browser.version = new l({ value: 10.3 });
                break;
              case this.engine.version.is("2.3"):
                this.browser.version = new l({ value: 10 });
                break;
              case this.engine.version.is("2.2"):
                this.browser.version = new l({ value: 9.7 });
                break;
              case this.engine.version.is("2.1"):
                this.browser.version = new l({ value: 9.6 });
                break;
              default:
                this.browser.version = null;
            }
            this.os.name = null, this.os.version = null;
          }
          if (this.options.detectCamouflage) {
            if (match = /Mac OS X 10_6_3; ([^;]+); [a-z]{2}-(?:[a-z]{2})?\)/.exec(c)) {
              this.browser.name = "", this.browser.version = null, this.browser.mode = "desktop", this.os.name = "Android", this.os.version = null, this.engine.name = "Webkit", this.engine.version = null, this.device.model = match[1], this.device.type = "mobile";
              h = m(this.device.model);
              void 0 !== n[h] && (this.device.manufacturer = n[h][0], this.device.model = n[h][1], void 0 !== n[h][2] && (this.device.type = n[h][2]), this.device.identified = !0), this.features.push("foundDevice");
            }
            if (match = /Linux Ventana; [a-z]{2}-[a-z]{2}; (.+) Build/.exec(c)) {
              this.browser.name = "", this.browser.version = null, this.browser.mode = "desktop", this.os.name = "Android", this.os.version = null, this.engine.name = "Webkit", this.engine.version = null, this.device.model = match[1], this.device.type = "mobile";
              h = m(this.device.model);
              void 0 !== n[h] && (this.device.manufacturer = n[h][0], this.device.model = n[h][1], void 0 !== n[h][2] && (this.device.type = n[h][2]), this.device.identified = !0), this.features.push("foundDevice");
            }
            "Safari" === this.browser.name && ("iOS" !== this.os.name && /AppleWebKit\/([0-9]+.[0-9]+)/i.exec(c)[1] !== /Safari\/([0-9]+.[0-9]+)/i.exec(c)[1] && (this.features.push("safariMismatch"), this.camouflage = !0), "iOS" !== this.os.name || c.match(/^Mozilla/) || (this.features.push("noMozillaPrefix"), this.camouflage = !0), /Version\/[0-9\.]+/.exec(c) || (this.features.push("noVersion"), this.camouflage = !0)), "Chrome" === this.browser.name && (/(?:Chrome|CrMo|CriOS)\/([0-9]{1,2}\.[0-9]\.[0-9]{3,4}\.[0-9]+)/.exec(c) || (this.features.push("wrongVersion"), this.camouflage = !0)), this.options.useFeatures && (window.ActiveXObject && (this.features.push("trident"), void 0 !== this.engine.name && "Trident" !== this.engine.name && (this.camouflage = void 0 === this.browser.name || "Maxthon" !== this.browser.name)), window.opera && (this.features.push("presto"), void 0 !== this.engine.name && "Presto" !== this.engine.name && (this.camouflage = !0), "Internet Explorer" === this.browser.name && (this.camouflage = !0)), ("getBoxObjectFor" in document || "mozInnerScreenX" in window) && (this.features.push("gecko"), void 0 !== this.engine.name && "Gecko" !== this.engine.name && (this.camouflage = !0), "Internet Explorer" === this.browser.name && (this.camouflage = !0)), ("WebKitCSSMatrix" in window || "WebKitPoint" in window || "webkitStorageInfo" in window || "webkitURL" in window) && (this.features.push("webkit"), void 0 !== this.engine.name && "Webkit" !== this.engine.name && (this.camouflage = !0), "Internet Explorer" === this.browser.name && (this.camouflage = !0)), "Webkit" === this.engine.name && -1 === {}.toString.toString().indexOf("\n") && (this.features.push("v8"), null !== this.browser && "Safari" === this.browser.name && (this.camouflage = !0)), "iPad" === this.device.model && 0 !== screen.width && 0 !== screen.height && 768 !== screen.width && 1024 !== screen.height && 1024 !== screen.width && 768 !== screen.height && (this.features.push("sizeMismatch"), this.camouflage = !0), "iPhone" !== this.device.model && "iPod" !== this.device.model || 0 !== screen.width && 0 !== screen.height && 320 !== screen.width && 480 !== screen.height && 480 !== screen.width && 320 !== screen.height && (this.features.push("sizeMismatch"), this.camouflage = !0), "iOS" === this.os.name && this.os.version && (this.os.version.isOlder("4.0") && "sandbox" in document.createElement("iframe") && (this.features.push("foundSandbox"), this.camouflage = !0), this.os.version.isOlder("4.2") && "WebSocket" in window && (this.features.push("foundSockets"), this.camouflage = !0), this.os.version.isOlder("5.0") && window.Worker && (this.features.push("foundWorker"), this.camouflage = !0), this.os.version.isNewer("2.1") && !window.applicationCache && (this.features.push("noAppCache"), this.camouflage = !0)), "iOS" !== this.os.name && "Safari" === this.browser.name && this.browser.version && (this.browser.version.isOlder("4.0") && window.applicationCache && (this.features.push("foundAppCache"), this.camouflage = !0), this.browser.version.isOlder("4.1") && window.history && history.pushState && (this.features.push("foundHistory"), this.camouflage = !0), this.browser.version.isOlder("5.1") && document.documentElement.webkitRequestFullScreen && (this.features.push("foundFullscreen"), this.camouflage = !0), this.browser.version.isOlder("5.2") && "FileReader" in window && (this.features.push("foundFileReader"), this.camouflage = !0)));
          }
        }
      }, c;
    }();
  }, {}],
  "G8Un": [function(require, module, exports) {
    var e = require("./useragent-base");
    module.exports = function(i) {
      var a, d, r = new e(i);
      if ("mobile" === r.device.type || "tablet" === r.device.type) {
        if ((a = i.match(/(ZTE|Samsung|Motorola|HTC|Coolpad|Huawei|Lenovo|LG|Sony Ericsson|Oppo|TCL|Vivo|Sony|Meizu|Nokia)/i)) && (r.device.manufacturer = a[1], r.device.model && r.device.model.indexOf(a[1]) >= 0 && (r.device.model = r.device.model.replace(a[1], ""))), a = i.match(/(iPod|iPad|iPhone)/i)) r.device.manufacturer = "Apple", r.device.model = a[1]; else if (a = i.match(/[-\s](Galaxy[\s-_]nexus|Galaxy[\s-_]\w*[\s-_]\w*|Galaxy[\s-_]\w*|SM-\w*|GT-\w*|s[cgp]h-\w*|shw-\w*|ATIV|i9070|omnia|s7568|A3000|A3009|A5000|A5009|A7000|A7009|A8000|C101|C1116|C1158|E400|E500F|E7000|E7009|G3139D|G3502|G3502i|G3508|G3508J|G3508i|G3509|G3509i|G3558|G3559|G3568V|G3586V|G3589W|G3606|G3608|G3609|G3812|G388F|G5108|G5108Q|G5109|G5306W|G5308W|G5309W|G550|G600|G7106|G7108|G7108V|G7109|G7200|G720NO|G7508Q|G7509|G8508S|G8509V|G9006V|G9006W|G9008V|G9008W|G9009D|G9009W|G9198|G9200|G9208|G9209|G9250|G9280|I535|I679|I739|I8190N|I8262|I879|I879E|I889|I9000|I9060|I9082|I9082C|I9082i|I9100|I9100G|I9108|I9128|I9128E|I9128i|I9152|I9152P|I9158|I9158P|I9158V|I9168|I9168i|I9190|I9192|I9195|I9195I|I9200|I9208|I9220|I9228|I9260|I9268|I9300|I9300i|I9305|I9308|I9308i|I939|I939D|I939i|I9500|I9502|I9505|I9507V|I9508|I9508V|I959|J100|J110|J5008|J7008|N7100|N7102|N7105|N7108|N7108D|N719|N750|N7505|N7506V|N7508V|N7509V|N900|N9002|N9005|N9006|N9008|N9008S|N9008V|N9009|N9100|N9106W|N9108V|N9109W|N9150|N916|N9200|P709|P709E|P729|S6358|S7278|S7278U|S7562C|S7562i|S7898i|b9388)[\s\)]/i)) r.device.manufacturer = "Samsung", r.device.model = a[1].replace(/Galaxy S VI/i, "Galaxy S6").replace(/Galaxy S V/i, "Galaxy S5").replace(/Galaxy S IV/i, "Galaxy S4").replace(/Galaxy s III/i, "Galaxy S3").replace(/Galaxy S II/i, "Galaxy S2").replace(/Galaxy S I/i, "Galaxy S1").replace(/([a-z]+[0-9]{3})[0-9]?[a-z]*/i, "$1"); else if (r.device.manufacturer && "samsung" === r.device.manufacturer.toLowerCase() && r.device.model) r.device.model = r.device.model.replace(/Galaxy S VI/i, "Galaxy S6").replace(/Galaxy S V/i, "Galaxy S5").replace(/Galaxy S IV/i, "Galaxy S4").replace(/Galaxy s III/i, "Galaxy S3").replace(/Galaxy S II/i, "Galaxy S2").replace(/Galaxy S I/i, "Galaxy S1").replace(/([a-z]+[0-9]{3})[0-9]?[a-z]*/i, "$1"); else if (a = i.match(/(Huawei[\s-_](\w*[-_]?\w*)|\s(7D-\w*|ALE-\w*|ATH-\w*|CHE-\w*|CHM-\w*|Che1-\w*|Che2-\w*|D2-\w*|G616-\w*|G620S-\w*|G621-\w*|G660-\w*|G750-\w*|GRA-\w*|Hol-\w*|MT2-\w*|MT7-\w*|PE-\w*|PLK-\w*|SC-\w*|SCL-\w*|H60-\w*|H30-\w*)[\s\)])/i)) r.device.manufacturer = "Huawei", a[2] ? r.device.model = a[2] : a[3] && (r.device.model = a[3]), (a = r.device.model.match(/(\w*)[\s-_]+[a-z0-9]+/i)) && (r.device.model = a[1]); else if (a = i.match(/;\s(mi|m1|m2|m3|m4|hm)(\s*\w*)[\s\)]/i)) (d = i.match(/(meitu|MediaPad)/i)) ? (r.device.manufacturer = d[1], r.device.model = "") : a[2].length > 0 && !/\s/.test(a[2]) ? (d = a[2].match(/(\d)/i)) && (r.device.model = a[1] + "-" + d[1]) : (r.device.manufacturer = "Xiaomi", a[2] && a[2].length > 0 ? (a[2] = a[2].replace(/\s/, ""), r.device.model = (a[1].substr(a[1].length - 2) + "-" + a[2]).replace(/m(\d)-/i, "MI-$1")) : r.device.model = a[1].substr(a[1].length - 2).replace(/m(\d)/i, "MI-$1"), /(mi|hm)(-\d)/i.test(r.device.model) && ((a = r.device.model.match(/(mi|hm)(-\ds)/i)) ? r.device.model = a[1] + a[2] : (a = r.device.model.match(/(mi|hm)(-\d{2})/i)) ? r.device.model = a[1] : (a = r.device.model.match(/(mi|hm)(-\d)[A-Z]/i)) && (r.device.model = a[1] + a[2])), (a = r.device.model.match(/(mi|hm)(-\dg)/i)) && (r.device.model = a[1])); else if (/build\/HM\d{0,7}\)/i.test(i)) r.device.manufacturer = "Xiaomi", r.device.model = "HM"; else if (a = i.match(/redmi\s?(\d+)?/i)) r.device.manufacturer = "Xiaomi", r.device.model = "HM-" + a[1]; else if (r.device.manufacturer && "xiaomi" === r.device.manufacturer.toLowerCase() && r.device.model) (a = r.device.model.match(/mi-one/i)) ? r.device.model = "MI-1" : (a = r.device.model.match(/mi-two/i)) ? r.device.model = "MI-2" : (a = r.device.model.match(/\d{6}/i)) ? r.device.model = "" : (a = r.device.model.match(/redmi/i)) ? r.device.model = r.device.model.toUpperCase().replace(/redmi/i, "HM") : (a = r.device.model.match(/(m\d)[\s-_](s?)/i)) ? r.device.model = a[1].replace(/m/, "MI-") + a[2] : (a = r.device.model.match(/(hm|mi)[\s-_](\d?)[a-rt-z]/i)) ? (d = r.device.model.match(/(mi|hm)[\s-_](note|pad)(\d?s?)/i)) ? r.device.model = d[1] + "-" + d[2] + d[3] : r.device.model = a[2] ? a[1] + "-" + a[2] : a[1] : (a = r.device.model.match(/hm/i)) && ((a = r.device.model.match(/(hm)[\s-_](\d{2})/i)) ? r.device.model = "HM" : (a = r.device.model.match(/(hm)[\s-_](\ds)/i)) ? r.device.model = "HM-" + a[2] : (a = r.device.model.match(/(hm)[\s-_](\d)[a-z]/i)) ? r.device.model = "HM-" + a[2] : r.device.model = "HM", /hm-\dg/.test(r.device.model) && (r.device.model = "HM")); else if (a = i.match(/(vivo[\s-_](\w*)|\s(E1\w?|E3\w?|E5\w?|V1\w?|V2\w?|S11\w?|S12\w?|S1\w?|S3\w?|S6\w?|S7\w?|S9\w?|X1\w?|X3\w?|X520\w?|X5\w?|X5Max|X5Max+|X5Pro|X5SL|X710F|X710L|Xplay|Xshot|Xpaly3S|Y11\w?|Y11i\w?|Y11i\w?|Y13\w?|Y15\w?|Y17\w?|Y18\w?|Y19\w?|Y1\w?|Y20\w?|Y22\w?|Y22i\w?|Y23\w?|Y27\w?|Y28\w?|Y29\w?|Y33\w?|Y37\w?|Y3\w?|Y613\w?|Y622\w?|Y627\w?|Y913\w?|Y923\w?|Y927\w?|Y928\w?|Y929\w?|Y937\w?)[\s\)])/i)) r.device.manufacturer = "Vivo", r.device.model = a[1], r.device.model = r.device.model.replace(/(viv[\s-_]|vivo[\s-_]|bbg[\s-_])/i, ""), (a = r.device.model.match(/([a-z]+[0-9]+)i?[a-z]?[\s-_]?/i)) && (r.device.model = a[1]); else if (a = i.match(/(Oppo[\s-_](\w*)|\s(1100|1105|1107|3000|3005|3007|6607|A100|A103|A105|A105K|A109|A109K|A11|A113|A115|A115K|A121|A125|A127|A129|A201|A203|A209|A31|A31c|A31t|A31u|A51kc|A520|A613|A615|A617|E21W|Find|Mirror|N5110|N5117|N5207|N5209|R2010|R2017|R6007|R7005|R7007|R7c|R7t|R8000|R8007|R801|R805|R807|R809T|R8107|R8109|R811|R811W|R813T|R815T|R815W|R817|R819T|R8200|R8205|R8207|R821T|R823T|R827T|R830|R830S|R831S|R831T|R833T|R850|Real|T703|U2S|U521|U525|U529|U539|U701|U701T|U705T|U705W|X9000|X9007|X903|X905|X9070|X9077|X909|Z101|R829T)[\s\)])/i)) r.device.manufacturer = "Oppo", a[2] ? r.device.model = a[2] : a[3] && (r.device.model = a[3]), (a = r.device.model.match(/([a-z]+[0-9]+)-?(plus)/i)) ? r.device.model = a[1] + "-" + a[2] : (a = r.device.model.match(/(\w*-?[a-z]+[0-9]+)/i)) && (r.device.model = a[1]); else if (r.device.manufacturer && "oppo" === r.device.manufacturer.toLowerCase() && r.device.model) (a = r.device.model.match(/([a-z]+[0-9]+)-?(plus)/i)) ? r.device.model = a[1] + "-" + a[2] : (a = r.device.model.match(/(\w*-?[a-z]+[0-9]+)/i)) && (r.device.model = a[1]); else if (a = i.match(/(Lenovo[\s-_](\w*[-_]?\w*)|\s(A3580|A3860|A5500|A5600|A5860|A7600|A806|A800|A808T|A808T-I|A936|A938t|A788t|K30-E|K30-T|K30-W|K50-T3s|K50-T5|K80M|K910|K910e|K920|S90-e|S90-t|S90-u|S968T|X2-CU|X2-TO|Z90-3|Z90-7)[\s\)])/i)) r.device.manufacturer = "Lenovo", a[2] ? r.device.model = a[2] : a[3] && (r.device.model = a[3]), (a = r.device.model.match(/([a-z]+[0-9]+)/i)) && (r.device.model = a[1]); else if (a = i.match(/(Coolpad[\s-_](\w*)|\s(7295C|7298A|7620L|8908|8085|8970L|9190L|Y80D)[\s\)])/i)) r.device.manufacturer = "Coolpad", a[2] ? r.device.model = a[2] : a[3] && (r.device.model = a[3]), (a = r.device.model.match(/([a-z]?[0-9]+)/i)) && (r.device.model = a[1]); else if (r.device.manufacturer && "coolpad" === r.device.manufacturer.toLowerCase() && r.device.model) (a = r.device.model.match(/([a-z]?[0-9]+)/i)) && (r.device.model = a[1]); else if (a = i.match(/\s(mx\d*\w*|mz-(\w*))\s(\w*)\s*\w*\s*build/i)) {
          r.device.manufacturer = "Meizu";
          var o = a[2] ? a[2] : a[1];
          a[3] ? r.device.model = o + "-" + a[3] : r.device.model = o + "";
        } else (a = i.match(/M463C|M35\d/i)) ? (r.device.manufacturer = "Meizu", r.device.model = a[1]) : (a = i.match(/(Htc[-_\s](\w*)|\s(601e|606w|608t|609d|610t|6160|619d|620G|626d|626s|626t|626w|709d|801e|802d|802t|802w|809D|816d|816e|816t|816v|816w|826d|826s|826t|826w|828w|901e|919d|A310e|A50AML|A510e|A620d|A620e|A620t|A810e|A9191|Aero|C620d|C620e|C620t|D316d|D516d|D516t|D516w|D820mt|D820mu|D820t|D820ts|D820u|D820us|E9pt|E9pw|E9sw|E9t|HD7S|M8Et|M8Sd|M8St|M8Sw|M8d|M8e|M8s|M8si|M8t|M8w|M9W|M9ew|Phablet|S510b|S510e|S610d|S710d|S710e|S720e|S720t|T327t|T328d|T328t|T328w|T329d|T329t|T329w|T528d|T528t|T528w|T8698|WF5w|X315e|X710e|X715e|X720d|X920e|Z560e|Z710e|Z710t|Z715e)[\s\)])/)) ? (r.device.manufacturer = "Htc", r.device.model = a[1]) : (a = i.match(/(Gionee[\s-_](\w*)|\s(GN\d+\w*)[\s\)])/i)) ? (r.device.manufacturer = "Gionee", a[2] ? r.device.model = a[2] : a[3] && (r.device.model = a[3])) : (a = i.match(/(LG[-_](\w*)|\s(D728|D729|D802|D855|D856|D857|D858|D859|E985T|F100L|F460|H778|H818|H819|P895|VW820)[\s\)])/i)) ? (r.device.manufacturer = "Lg", a[2] ? r.device.model = a[2] : a[3] && (r.device.model = a[3])) : (a = i.match(/(Tcl[\s-_](\w*)|\s(H916T|P588L|P618L|P620M|P728M)[\s\)])/)) ? (r.device.manufacturer = "Tcl", r.device.model = a[1]) : (a = i.match(/(V9180|N918)/i)) ? (r.device.manufacturer = "Zte", r.device.model = a[1]) : r.device.manufacturer && "zte" === r.device.manufacturer.toLowerCase() && r.device.model ? (a = r.device.model.match(/([a-z]?[0-9]+)/i)) && (r.device.model = a[1]) : (a = i.match(/(UIMI\w*|umi\w*)[\s-_](\w*)\s*\w*\s*build/i)) ? (r.device.manufacturer = "Uimi", a[2] ? r.device.model = a[1] + "-" + a[2] : r.device.model = a[1] + "") : (a = i.match(/eton[\s-_](\w*)/i)) ? (r.device.manufacturer = "Eton", r.device.model = a[1]) : (a = i.match(/(SM705|SM701|YQ601|YQ603)/i)) ? (r.device.manufacturer = "Smartisan", r.device.model = {
          SM705: "T1",
          SM701: "T1",
          YQ601: "U1",
          YQ603: "U1"
        }[a[1]] || a[1]) : (a = i.match(/(Asus[\s-_](\w*)|\s(A500CG|A500KL|A501CG|A600CG|PF400CG|PF500KL|T001|X002|X003|ZC500TG|ZE550ML|ZE551ML)[\s\)])/i)) ? (r.device.manufacturer = "Asus", a[2] ? r.device.model = a[2] : a[3] && (r.device.model = a[3])) : (a = i.match(/(Nubia[-_\s](\w*)|(NX501|NX505J|NX506J|NX507J|NX503A|nx\d+\w*)[\s\)])/i)) ? (r.device.manufacturer = "Nubia", a[2] ? r.device.model = a[2] : a[3] && (r.device.model = a[3])) : (a = i.match(/(HT-\w*)|Haier[\s-_](\w*-?\w*)/i)) ? (r.device.manufacturer = "Haier", a[1] ? r.device.model = a[1] : a[2] && (r.device.model = a[2])) : (a = i.match(/K-Touch[\s-_](tou\s?ch\s?(\d)|\w*)/i)) ? (r.device.manufacturer = "K-Touch", a[2] ? r.device.model = "Ktouch" + a[2] : r.device.model = a[1]) : (a = i.match(/Doov[\s-_](\w*)/i)) ? (r.device.manufacturer = "Doov", r.device.model = a[1]) : /koobee/i.test(i) ? r.device.manufacturer = "koobee" : /C69/i.test(i) ? r.device.manufacturer = "Sony" : /N787|N818S/i.test(i) ? r.device.manufacturer = "Haojixing" : (a = i.match(/(hs-|Hisense[\s-_])(\w*)/i)) && (r.device.manufacturer = "Hisense", r.device.model = a[2]);
        r.device.manufacturer && (r.device.manufacturer = r.device.manufacturer.substr(0, 1).toUpperCase() + r.device.manufacturer.substr(1).toLowerCase()), r.device.model && (r.device.model = r.device.model.toUpperCase().replace(/-+|_+|\s+/g, " "), r.device.model = r.device.model.match(/\s*(\w*\s*\w*)/)[1].replace(/\s+/, "-"), "Samsung" === r.device.manufacturer ? r.device.model = {
          "SCH-I95": "GT-I950",
          "SCH-I93": "GT-I930",
          "SCH-I86": "GT-I855",
          "SCH-N71": "GT-N710",
          "SCH-I73": "GT-S789",
          "SCH-P70": "GT-I915"
        }[r.device.model] || r.device.model : "Huawei" === r.device.manufacturer && (r.device.model = {
          CHE1: "CHE",
          CHE2: "CHE",
          G620S: "G621",
          C8817D: "G621"
        }[r.device.model] || r.device.model)), r.device.manufacturer && "Xiaomi" === r.device.manufacturer && ((a = r.device.model.match(/(hm|mi)-(note)/i)) ? r.device.model = a[1] + "-" + a[2] : (a = r.device.model.match(/(hm|mi)-(\ds?)/i)) ? r.device.model = a[1] + "-" + a[2] : (a = r.device.model.match(/(hm|mi)-(\d)[a-rt-z]/i)) && (r.device.model = a[1] + "-" + a[2]));
      }
      if ("desktop" === r.device.type ? (a = /360se(?:[ \/]([\w.]+))?/i.exec(i)) ? (r.browser.name = "360 security Explorer", r.browser.version = { original: a[1] }) : (a = /the world(?:[ \/]([\w.]+))?/i.exec(i)) ? (r.browser.name = "the world", r.browser.version = { original: a[1] }) : (a = /tencenttraveler ([\w.]+)/i.exec(i)) ? (r.browser.name = "tencenttraveler", r.browser.version = { original: a[1] }) : (a = /LBBROWSER/i.exec(i)) && (r.browser.name = "LBBROWSER") : "mobile" !== r.device.type && "tablet" !== r.device.type || ((a = /BaiduHD\s+([\w.]+)/i.exec(i)) ? (r.browser.name = "BaiduHD", r.browser.version = { original: a[1] }) : (a = /360.s*aphone\s*browser\s*\(version\s*([\w.]+)\)/i.exec(i)) ? (r.browser.name = "360 Browser", r.browser.version = { original: a[1] }) : (a = /flyflow\/([\w.]+)/i.exec(i)) ? (r.browser.name = "Baidu Browser", r.browser.version = { original: a[1] }) : (a = /baiduhd ([\w.]+)/i.exec(i)) ? (r.browser.name = "Baidu HD", r.browser.version = { original: a[1] }) : (a = /baidubrowser\/([\d\.]+)\s/i.exec(i)) ? (r.browser.name = "baidubrowser", r.browser.version = { original: a[1] }) : (a = /LieBaoFast\/([\w.]+)/i.exec(i)) ? (r.browser.name = "LieBao Fast", r.browser.version = { original: a[1] }) : (a = /LieBao\/([\w.]+)/i.exec(i)) ? (r.browser.name = "LieBao", r.browser.version = { original: a[1] }) : (a = /Sogou\w+\/([0-9\.]+)/i.exec(i)) ? (r.browser.name = "SogouMobileBrowser", r.browser.version = { original: a[1] }) : (a = /bdbrowser\w+\/([0-9\.]+)/i.exec(i)) ? (r.browser.name = "百度国际", r.browser.version = { original: a[1] }) : "Android" === r.os.name && /safari/i.test(i) && (a = /chrome\/([0-9\.]+)/i.exec(i)) ? (d = i.match(/\s+(\w+Browser)\/?([\d\.]*)/)) ? (r.browser.name = d[1], d[2] ? r.browser.version = { original: d[2] } : r.browser.version = { original: a[1] }) : (r.browser.name = "Android Chrome", r.browser.version = { original: a[1] }) : "Android" === r.os.name && /safari/i.test(i) && (a = /version\/([0-9\.]+)/i.exec(i)) ? (d = i.match(/\s+(\w+Browser)\/?([\d\.]*)/)) ? (r.browser.name = d[1], d[2] ? r.browser.version = { original: d[2] } : r.browser.version = { original: a[1] }) : (r.browser.name = "Android Browser", r.browser.version = { original: a[1] }) : /(ipad|iphone).* applewebkit\/.* mobile/i.test(i) && (r.browser.name = "Safari")), (a = i.match(/baiduboxapp\/?([\d\.]*)/i)) ? (r.browser.name = "百度框", a[1] && (r.browser.version = { original: a[1] })) : /BaiduLightAppRuntime/i.test(i) ? r.browser.name = "轻应用runtime" : /Weibo/i.test(i) ? r.browser.name = "微博" : /MQQ/i.test(i) ? r.browser.name = "手机QQ" : /hao123/i.test(i) && (r.browser.name = "hao123"), a = /MicroMessenger\/([\w.]+)/i.exec(i)) {
        r.browser.name = "微信";
        var c = a[1].replace(/_/g, ".");
        (d = /(\d+\.\d+\.\d+\.\d+)/.exec(c)) && (c = d[1]), r.browser.version = { original: c };
      }
      return (a = /UCBrowser\/([\w.]+)/i.exec(i)) && (r.browser.name = "UC Browser", r.browser.version = { original: a[1] }), (a = /OPR\/([\w.]+)/i.exec(i)) ? (r.browser.name = "Opera", r.browser.version = { original: a[1] }) : (a = /OPiOS\/([\w.]+)/i.exec(i)) ? (r.browser.name = "Opera", r.browser.version = { original: a[1] }) : /Trident\/7/i.test(i) && /rv:11/i.test(i) ? (r.browser.name = "Internet Explorer", r.browser.version = {
        major: "11",
        original: "11"
      }) : /Edge\/12/i.test(i) && /Windows Phone|Windows NT/i.test(i) ? (r.browser.name = "Microsoft Edge", r.browser.version = {
        major: "12",
        original: "12"
      }) : (a = /miuibrowser\/([\w.]+)/i.exec(i)) && (r.browser.name = "miui browser", r.browser.version = { original: a[1] }), r.browser.name || (a = /Safari\/([\w.]+)/i.exec(i) && /Version/i.test(i)) && (r.browser.name = "Safari"), r.browser.name && !r.browser.version && (a = /Version\/([\w.]+)/i.exec(i)) && (r.browser.version = { original: a[1] }), "Windows" === r.os.name || /Windows/i.test(i) ? (r.os.name = "Windows", /NT 6.3/i.test(i) ? r.os.version = {
        alias: "8.1",
        original: "8.1"
      } : (/NT 6.4/i.test(i) || /NT 10.0/i.test(i)) && (r.os.version = {
        alias: "10",
        original: "10"
      })) : "Mac OS X" === r.os.name ? (r.os.name = "Mac OS X", (a = /Mac OS X[\s\_\-\/](\d+[\.\-\_]\d+[\.\-\_]?\d*)/i.exec(i)) ? r.os.version = {
        alias: a[1].replace(/_/g, "."),
        original: a[1].replace(/_/g, ".")
      } : r.os.version = {
        alias: "",
        original: ""
      }) : /Android/i.test(r.os.name) && (a = i.match(/Android[\s\_\-\/i686]?[\s\_\-\/](\d+[\.\-\_]\d+[\.\-\_]?\d*)/i)) && (r.os.version = {
        alias: a[1],
        original: a[1]
      }), r;
    };
  }, { "./useragent-base": "4SVC" }],
  "+TSV": [function(require, module, exports) {
    module.exports = require("./lib/ua-device.js");
  }, { "./lib/ua-device.js": "G8Un" }],
  "3ybv": [function(require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 }), exports.SecurityVerify = void 0;
    var e = require("./SecretUtil"), r = require("ua-device"), a = function() {
      function a() {
      }

      return a.ua = function(e) {
        for (var r = e ? [e] : a.partners, t = r.length, o = 0; o < t; o++) if (window.navigator.userAgent.indexOf(r[o]) >= 0) return !0;
        return !1;
      }, a.engine = function() {
        var e = new r(window.navigator.userAgent), a = Number.parseInt(e.browser.version.original),
          t = e.os.name.toLowerCase(), o = e.engine.name.toLowerCase();
        return -1 === e.browser.name.toLowerCase().indexOf("chrome") && ("iphone" === t || "mac os x" === t) || !!(e.engine && "webkit" === o && a >= 53);
      }, a.token = function(r) {
        var t = r || window.clientToken;
        if (!t) return !1;
        var o = e.SecretUtil.Decrypt(t).split("_");
        if (o.length < 3) return !1;
        if (-1 === a.partners.indexOf(o[0])) return !1;
        var n = new Date, _ = new Date(Date.parse(o[2]));
        return !(_ instanceof Date && n > _);
      }, a.partners = ["huohua", "daite", "partner"], a.clientTokens = ["partner_huohua_website", "partner_huohua_website_detail", "partner_huohua_website_courseware", "partner_huohua_website_component", "partner_huohua_editor", "partner_huohua_editor_player", "partner_huohua_editor_detail", "partner_huohua_editor_offline", "partner_huohua_editor_micro", "partner_huohua_editor_edit", "partner_huohua_editor_collection", "partner_huohua_editor_ebook", "partner_huohua_player", "partner_huohua_player_mobile_player", "partner_huohua_player_mobile_detail", "partner_huohua_player_mobile_offline", "partner_huohua_player_mobile_collection", "partner_huohua_player_mobile_ebook", "partner_huohua_player_pad_player", "partner_huohua_player_pad_detail", "partner_huohua_player_pad_offline", "partner_huohua_player_pad_collection", "partner_huohua_player_pad_ebook", "partner_daite_beike"], a;
    }();
    exports.SecurityVerify = a;
  }, { "./SecretUtil": "AKWS", "ua-device": "+TSV" }],
  "iG0A": [function(require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 }), exports.SystemTip = void 0;
    var e = function() {
      function e() {
      }

      return e.expiredTip = function(e) {
        if (!document.getElementById("illegalTip")) {
          var i = "";
          switch (e) {
            case"token":
              i = ",";
              break;
            case"ua":
              i = "。";
              break;
            case"engine":
              i = ";";
              break;
            case"devtools":
              i = ".";
              break;
            default:
              i = "  ";
          }
          var t = "<div id = \"illegalTip\" style=\"position: absolute;z-index: 9999;width: 100%;height: 100%;background: #333333;margin: 0;padding: 0;font-size: 16px;color: #E0E0E0;text-align: center;line-height: 24px;display: -webkit-box;-webkit-box-orient: horizontal;-webkit-box-pack: center;-webkit-box-align: center;\">教学资源使用授权已到期</br>请联系火花学院咨询授权事宜。</br>（tel：15256538543 " + i + " email：<a href=\"mailto:service@ustcnmi.com\">service@ustcnmi.com</a>）</div>",
            n = document.createElement("div");
          n.innerHTML = t, document.body.innerHTML = "", document.body.appendChild(n);
        }
      }, e;
    }();
    exports.SystemTip = e;
  }, {}],
  "ny7m": [function(require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 }), exports.Security = void 0;
    var e = require("devtools-detector"), t = require("./SecretUtil"), i = require("./SecurityVerify"),
      o = require("./SystemTip"), n = function() {
        function n() {
          this.interval = 1e4, console.log("init security"), this.receiveParentMessage(), this.checkIsDevModel() ? console.log("当前是开发模式") : (this.condition = new Map, this.condition.set("token", i.SecurityVerify.token), self === top && (this.condition.set("ua", i.SecurityVerify.ua), this.condition.set("engine", i.SecurityVerify.engine)), this.devtoolsDetect(), this.timerThreshold() ? console.log("验证时间未开始") : this.verifyTimer());
        }

        return n.getInstance = function() {
          return this.instance || (this.instance = new n), this.instance;
        }, n.prototype.receiveParentMessage = function() {
          window.addEventListener("message", function(e) {
            if (e.source === window.parent) {
              console.log("event");
              for (var t = 0, i = Object.keys(e.data); t < i.length; t++) {
                var o = i[t];
                window[o] = e.data[o];
              }
              console.log(e);
            }
          });
        }, n.prototype.checkIsDevModel = function() {
          var e = new Date, i = e.getUTCFullYear() + "" + (e.getUTCMonth() + 1) + e.getDate();
          try {
            var o = location.hash.split("#"), n = t.SecretUtil.Decrypt(o[2] + "");
            if ("dev" === o[1] && i === n) return !0;
          } catch (r) {
          }
          return !1;
        }, n.prototype.timerThreshold = function() {
          var e = "2019-05-01 09:00";
          return e = e.replace("-", "/"), !(new Date > new Date(Date.parse(e)));
        }, n.prototype.verifyTimer = function() {
          var e = this;
          this.timer = setTimeout(function() {
            e.verifyCondition();
          }, this.interval);
        }, n.prototype.verifyCondition = function() {
          var e = this;
          this.condition.forEach(function(t, i) {
            !1 === t() && (console.error(i + " check illegal"), e.illegalAction(i));
          });
        }, n.prototype.devtoolsDetect = function() {
          var t = this;
          (0, e.addListener)(function(e) {
            if (e) {
              for (; ;) ;
              t.illegalAction("devtools");
            }
          }), self === top ? (0, e.lanuch)() : setInterval(function() {
          }, 2e3);
        }, n.prototype.illegalAction = function(e) {
          o.SystemTip.expiredTip(e);
        }, n;
      }();
    exports.Security = n;
    window.SS = n;
  }, { "devtools-detector": "soli", "./SecretUtil": "AKWS", "./SecurityVerify": "3ybv", "./SystemTip": "iG0A" }]
}, {}, ["ny7m"], null);
//# sourceMappingURL=/Security.773d1dc9.js.map