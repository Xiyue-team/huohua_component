webpackJsonp([0], {
  "4h/Y": function(t, i) {
  }, "8Wcd": function(t, i) {
  }, "8wPv": function(t, i, e) {
    "use strict";
    i.a = {
      props: {
        type: String,
        size: String,
        width: Number,
        height: Number,
        value: { type: Boolean, default: !1 },
        vertical: { type: Boolean, default: !1 }
      }, components: {}, created: function() {
      }, watch: {
        value: function(t) {
          "play" === this.type ? this.playSrc = t ? "static/UI/play icon@2x.png" : "static/UI/Combined Shape@2x.png" : "zoom" === this.type && (this.zoomSrc = t ? "static/UI/Group 8.png" : "static/UI/Group 81.png");
        }
      }, computed: {
        classObj: function() {
          return {
            "btn-48": "reset1" === this.type || "reset2" === this.type,
            "btn-blue": "blue" === this.type,
            "btn-240": "big" === this.size || "240" === this.size,
            "UI-circle": "play" === this.type || "zoom" === this.type,
            "btn-radio": "radio" === this.type,
            "btn-checkbox": "checkbox" === this.type,
            "btn-switch": "switch" === this.type,
            "btn-vertical": this.vertical
          };
        }
      }, data: function() {
        return { playSrc: "static/UI/play icon@2x.png", zoomSrc: "static/UI/Group 8.png" };
      }, methods: {
        clickEvent: function() {
          this.$emit("input", !this.value), this.$emit("callback", !this.value);
        }
      }
    };
  }, I5Qu: function(t, i, e) {
    "use strict";

    function s(t) {
      e("8Wcd");
    }

    var n = e("m1oz"), a = e("iSiz"), r = e("VU/8"), o = s, l = r(n.a, a.a, !1, o, null, null);
    i.a = l.exports;
  }, LQwd: function(t, i) {
  }, M93x: function(t, i, e) {
    "use strict";

    function s(t) {
      e("LQwd");
    }

    var n = e("xJD8"), a = e("ZapU"), r = e("VU/8"), o = s, l = r(n.a, a.a, !1, o, null, null);
    i.a = l.exports;
  }, NHnr: function(t, i, e) {
    "use strict";
    Object.defineProperty(i, "__esModule", { value: !0 });
    var s = e("7+uW"), n = e("M93x"), a = e("v5o6"), r = e.n(a), o = e("7t+N"), l = e.n(o);
    window.$ = l.a, s.a.config.productionTip = !1, r.a.attach(document.body), new s.a({
      el: "#app",
      template: "<App/>",
      components: { App: n.a }
    });
  }, OYhW: function(t, i, e) {
    "use strict";
    var s = function() {
      var t = this, i = t.$createElement, e = t._self._c || i;
      return e("div", {
        staticClass: "UI-btn noselect",
        class: t.classObj,
        style: { width: t.width + "px", height: t.height + "px" },
        attrs: { value: t.value },
        on: { click: t.clickEvent }
      }, ["reset1" === t.type ? e("img", {
        attrs: {
          src: "static/UI/chongzhi@2x.png",
          alt: ""
        }
      }) : t._e(), t._v(" "), "reset2" === t.type ? e("img", {
        attrs: {
          src: "static/UI/last@2x.png",
          alt: ""
        }
      }) : t._e(), t._v(" "), "radio" != this.type && "checkbox" != this.type && "switch" != this.type ? t._t("default") : t._e(), t._v(" "), "play" === t.type ? e("img", {
        attrs: {
          src: t.playSrc,
          alt: ""
        }
      }) : t._e(), t._v(" "), "zoom" === t.type ? e("img", {
        attrs: {
          src: t.zoomSrc,
          alt: ""
        }
      }) : t._e(), t._v(" "), "radio" === this.type ? e("span", { class: { checked: t.value } }, [e("em")]) : t._e(), t._v(" "), "radio" === this.type ? e("p", [t._t("default")], 2) : t._e(), t._v(" "), "checkbox" === this.type ? e("span", { class: { checked: t.value } }, [e("img", { attrs: { src: "static/UI/nike@2x.png" } })]) : t._e(), t._v(" "), "checkbox" === this.type ? e("p", [t._t("default")], 2) : t._e(), t._v(" "), "switch" === this.type ? e("p", [t._t("default")], 2) : t._e(), t._v(" "), "switch" === this.type ? e("span", { class: { checked: t.value } }, [e("em")]) : t._e()], 2);
    }, n = [], a = { render: s, staticRenderFns: n };
    i.a = a;
  }, WCnO: function(t, i, e) {
    "use strict";
    i.a = {
      data: function() {
        return { flag: !1, noBlue: !1, size: 0, currentValue: 0, currentSlider: 0 };
      },
      props: {
        box: { type: Boolean, default: !0 },
        boxWidth: { type: [Number, String], default: 240 },
        boxHeight: { type: [Number, String], default: 108 },
        title: { type: [Boolean, String], default: "某某值" },
        subTitle: { type: [Boolean, String], default: !1 },
        processWidth: { type: [Number, String], default: "auto" },
        processHeight: { type: [Number, String], default: 6 },
        data: { type: Array, default: null },
        label: { type: Array, default: null },
        dotSize: { type: Number, default: 44 },
        dotTxt: { type: [String, Array], default: null },
        min: { type: Number, default: 0 },
        max: { type: Number, default: 100 },
        interval: { type: Number, default: 1 },
        infinity: { type: Boolean, default: !1 },
        piecewise: { type: Boolean, default: !1 },
        piecewiseLabel: { type: Boolean, default: !1 },
        noBlueProcess: { type: Boolean, default: !1 },
        tooltip: { type: [String, Boolean], default: "always" },
        direction: { type: String, default: "horizontal" },
        reverse: { type: Boolean, default: !1 },
        beyondCircle: { type: Boolean, default: !0 },
        speed: { type: Number, default: .5 },
        realTime: { type: Boolean, default: !1 },
        value: { type: [String, Number, Array], default: 0 },
        tooltipDir: [Array, String],
        formatter: [String, Function],
        piecewiseActiveStyle: Object,
        labelActiveStyle: Object
      },
      computed: {
        isBox: function() {
          return this.box ? "ui-box" : "";
        }, infinityStyle: function() {
          if (this.infinity) return { float: "left", width: "64%" };
        }, flowDirection: function() {
          return "vue-slider-" + this.direction + (this.reverse ? "-reverse" : "");
        }, tooltipDirection: function() {
          var t = this.tooltipDir || ("vertical" === this.direction ? "left" : "top");
          return Array.isArray(t) ? this.valueIsArray ? t : t[1] : this.valueIsArray ? [t, t] : t;
        }, tooltipStatus: function() {
          return "hover" === this.tooltip && this.flag ? "vue-slider-always" : this.tooltip ? "vue-slider-" + this.tooltip : "";
        }, valueIsArray: function() {
          return Array.isArray(this.value);
        }, slider: function() {
          return this.valueIsArray ? [this.$refs.dot0, this.$refs.dot1] : this.$refs.dot;
        }, minimum: function() {
          return this.data ? 0 : this.min;
        }, maximum: function() {
          return this.data ? this.data.length - 1 : this.max;
        }, val: {
          get: function() {
            return this.data ? this.valueIsArray ? [this.data[this.currentValue[0]], this.data[this.currentValue[1]]] : this.data[this.currentValue] : this.currentValue;
          }, set: function(t) {
            if (this.data) if (this.valueIsArray) {
              var i = this.data.indexOf(t[0]), e = this.data.indexOf(t[1]);
              i > -1 && e > -1 && (this.currentValue = [i, e]);
            } else {
              var s = this.data.indexOf(t);
              s > -1 && (this.currentValue = s);
            } else this.currentValue = t;
          }
        }, currentIndex: function() {
          return this.valueIsArray ? this.data ? this.currentValue : [(this.currentValue[0] - this.minimum) / this.spacing, (this.currentValue[1] - this.minimum) / this.spacing] : (this.currentValue - this.minimum) / this.spacing;
        }, indexRange: function() {
          return this.valueIsArray ? this.currentIndex : [0, this.currentIndex];
        }, multiple: function() {
          var t = ("" + this.interval).split(".")[1];
          return t ? Math.pow(10, t.length) : 1;
        }, spacing: function() {
          return this.data ? 1 : this.interval;
        }, total: function() {
          return this.data ? this.data.length - 1 : (~~((this.maximum - this.minimum) * this.multiple) % (this.interval * this.multiple) != 0 && console.error("[Vue-slider warn]: Prop[interval] is illegal, Please make sure that the interval can be divisible"), (this.maximum - this.minimum) / this.interval);
        }, gap: function() {
          return this.size / this.total;
        }, position: function() {
          return this.valueIsArray ? [(this.currentValue[0] - this.minimum) / this.spacing * this.gap, (this.currentValue[1] - this.minimum) / this.spacing * this.gap] : (this.currentValue - this.minimum) / this.spacing * this.gap;
        }, limit: function() {
          return this.valueIsArray ? [[0, this.position[1]], [this.position[0], this.size]] : [0, this.size];
        }, valueLimit: function() {
          return this.valueIsArray ? [[this.minimum, this.currentValue[1]], [this.currentValue[0], this.maximum]] : [this.minimum, this.maximum];
        }, wrapStyles: function() {
          return {
            width: "number" == typeof this.boxWidth ? this.boxWidth + "px" : this.boxWidth,
            height: "number" == typeof this.boxHeight ? this.boxHeight + "px" : this.boxHeight,
            padding: "vertical" === this.direction ? this.dotSize / 2 + "px " + (this.dotSize / 2 + 5) + "px" : this.piecewiseLabel ? "0 " + (this.dotSize / 2 + 10) + "px" : "0 " + this.dotSize / 2 + "px"
          };
        }, elemStyles: function() {
          return "vertical" === this.direction ? {
            width: this.processWidth + "px",
            height: "100%"
          } : this.title ? {
            height: this.processHeight + "px",
            marginTop: "50px"
          } : { height: this.processHeight + "px", marginTop: "70px" };
        }, dotStyles: function() {
          return "vertical" === this.direction ? {
            width: this.dotSize + "px",
            height: this.dotSize + "px",
            left: -(this.dotSize - this.processWidth) / 2 + "px"
          } : {
            width: this.dotSize + "px",
            height: this.dotSize + "px",
            top: -(this.dotSize - this.processHeight) / 2 + "px"
          };
        }, piecewiseDotStyle: function() {
          return "vertical" === this.direction ? {
            width: 2 * this.processWidth + "px",
            height: 2 * this.processWidth + "px"
          } : { width: 2 * this.processHeight + "px", height: 2 * this.processHeight + "px" };
        }, piecewiseDotWrap: function() {
          if (!this.piecewise && !this.piecewiseLabel) return !1;
          for (var t = [], i = 0; i <= this.total; i++) {
            var e = "vertical" === this.direction ? {
                bottom: this.gap * i - this.processWidth / 2 + "px",
                left: 0
              } : { left: this.gap * i - this.processHeight + "px", top: "-3px" }, s = this.reverse ? this.total - i : i,
              n = this.data ? this.data[s] : this.spacing * s + this.min;
            t.push({ style: e, label: this.formatter ? this.formatting(n) : n, inRange: this.val === n });
          }
          return t;
        }
      },
      watch: {
        value: function(t) {
          this.setValue(t, !0);
        }, max: function(t) {
          var i = this.limitValue(this.val);
          !1 !== i && this.setValue(i), this.refresh();
        }, min: function(t) {
          var i = this.limitValue(this.val);
          !1 !== i && this.setValue(i), this.refresh();
        }
      },
      methods: {
        bindEvents: function() {
          document.addEventListener("touchmove", this.moving, { passive: !1 }), document.addEventListener("touchend", this.moveEnd, { passive: !1 }), document.addEventListener("mousemove", this.moving), document.addEventListener("mouseup", this.moveEnd), document.addEventListener("mouseleave", this.moveEnd), window.addEventListener("resize", this.refresh);
        }, unbindEvents: function() {
          window.removeEventListener("resize", this.refresh), document.removeEventListener("touchmove", this.moving), document.removeEventListener("touchend", this.moveEnd), document.removeEventListener("mousemove", this.moving), document.removeEventListener("mouseup", this.moveEnd), document.removeEventListener("mouseleave", this.moveEnd);
        }, formatting: function(t) {
          return "string" == typeof this.formatter ? this.formatter.replace(/\{value\}/, t) : this.formatter(t);
        }, getPos: function(t) {
          return this.realTime && this.getStaticData(), "vertical" === this.direction ? this.reverse ? t.pageY - this.offset : this.size - (t.pageY - this.offset) : this.reverse ? this.size - (t.clientX - this.offset) : t.clientX - this.offset;
        }, wrapClick: function(t) {
          var i = this.getPos(t);
          this.valueIsArray ? this.currentSlider = i > (this.position[1] - this.position[0]) / 2 + this.position[0] ? 1 : 0 : this.setValueOnPos(i);
        }, moveStart: function(t) {
          this.valueIsArray && (this.currentSlider = t), this.flag = !0, this.$emit("drag-start", this);
        }, moving: function(t) {
          if (!this.flag) return !1;
          t.preventDefault(), t.targetTouches && t.targetTouches[0] && (t = t.targetTouches[0]), this.setValueOnPos(this.getPos(t), !0);
        }, moveEnd: function(t) {
          if (!this.flag) return !1;
          this.$emit("drag-end", this), this.flag = !1, this.setPosition();
        }, setValueOnPos: function(t, i) {
          var e = this.valueIsArray ? this.limit[this.currentSlider] : this.limit,
            s = this.valueIsArray ? this.valueLimit[this.currentSlider] : this.valueLimit;
          if (this.valueIsArray && this.beyondCircle) {
            if (t >= 0 && t <= this.$refs.elem.offsetWidth) {
              this.setTransform(t);
              var n = (Math.round(t / this.gap) * (this.spacing * this.multiple) + this.minimum * this.multiple) / this.multiple;
              this.setCurrentValue(n, i), t < e[0] ? this.noBlue = !0 : t > e[1] ? this.noBlue = !0 : this.noBlue = !1;
            }
          } else if (t >= e[0] && t <= e[1]) {
            this.setTransform(t);
            var a = (Math.round(t / this.gap) * (this.spacing * this.multiple) + this.minimum * this.multiple) / this.multiple;
            this.setCurrentValue(a, i);
          } else t < e[0] ? (this.setTransform(e[0]), this.setCurrentValue(s[0], i)) : (this.setTransform(e[1]), this.setCurrentValue(s[1], i));
        }, isDiff: function(t, i) {
          return Object.prototype.toString.call(t) !== Object.prototype.toString.call(i) || (Array.isArray(t) && t.length === i.length ? t.some(function(t, e) {
            return t !== i[e];
          }) : t !== i);
        }, setCurrentValue: function(t, i) {
          if (t < this.minimum || t > this.maximum) return !1;
          this.valueIsArray ? this.isDiff(this.currentValue[this.currentSlider], t) && (this.currentValue.splice(this.currentSlider, 1, t), this.syncValue()) : this.isDiff(this.currentValue, t) && (this.currentValue = t, this.syncValue()), i || this.setPosition();
        }, setValue: function(t, i, e) {
          var s = this;
          if (this.isDiff(this.val, t)) {
            var n = this.limitValue(t);
            this.val = !1 !== n ? this.valueIsArray ? n.concat() : n : this.valueIsArray ? t.concat() : t, this.syncValue(i);
          }
          this.$nextTick(function() {
            return s.setPosition(e);
          });
        }, setPosition: function(t) {
          this.flag || this.setTransitionTime(void 0 === t ? this.speed : t), this.valueIsArray ? (this.currentSlider = 0, this.setTransform(this.position[this.currentSlider]), this.currentSlider = 1, this.setTransform(this.position[this.currentSlider])) : this.setTransform(this.position), this.flag || this.setTransitionTime(0);
        }, setTransform: function(t) {
          var i = void 0;
          i = "vertical" === this.direction ? (this.dotSize / 2 - t) * (this.reverse ? -1 : 1) : (t - this.dotSize / 2) * (this.reverse ? -1 : 1);
          var e = "vertical" === this.direction ? "translateY(" + i + "px)" : "translateX(" + i + "px)",
            s = (0 === this.currentSlider ? this.position[1] - t : t - this.position[0]) + "px",
            n = (0 === this.currentSlider ? t : this.position[0]) + "px";
          this.valueIsArray ? (this.slider[this.currentSlider].style.transform = e, this.slider[this.currentSlider].style.WebkitTransform = e, this.slider[this.currentSlider].style.msTransform = e, "vertical" === this.direction ? (this.$refs.process.style.height = s, this.$refs.process.style[this.reverse ? "top" : "bottom"] = n) : (this.$refs.process.style.width = s, this.$refs.process.style[this.reverse ? "right" : "left"] = n)) : (this.slider.style.transform = e, this.slider.style.WebkitTransform = e, this.slider.style.msTransform = e, "vertical" === this.direction ? (this.$refs.process.style.height = t + "px", this.$refs.process.style[this.reverse ? "top" : "bottom"] = 0) : (this.$refs.process.style.width = t + "px", this.$refs.process.style[this.reverse ? "right" : "left"] = 0));
        }, setTransitionTime: function(t) {
          if (t || this.$refs.process.offsetWidth, this.valueIsArray) {
            for (var i = 0; i < this.slider.length; i++) this.slider[i].style.transitionDuration = t + "s", this.slider[i].style.WebkitTransitionDuration = t + "s";
            this.$refs.process.style.transitionDuration = t + "s", this.$refs.process.style.WebkitTransitionDuration = t + "s";
          } else this.slider.style.transitionDuration = t + "s", this.slider.style.WebkitTransitionDuration = t + "s", this.$refs.process.style.transitionDuration = t + "s", this.$refs.process.style.WebkitTransitionDuration = t + "s";
        }, limitValue: function(t) {
          var i = this;
          if (this.data) return t;
          var e = !1;
          return this.valueIsArray ? t = t.map(function(t) {
            return t < i.min ? (e = !0, i.min) : t > i.max ? (e = !0, i.max) : t;
          }) : t > this.max ? (e = !0, t = this.max) : t < this.min && (e = !0, t = this.min), e && t;
        }, syncValue: function(t) {
          t || this.$emit("callback", this.val), this.$emit("input", this.valueIsArray ? this.val.concat() : this.val);
        }, getStaticData: function() {
          this.$refs.elem && (this.size = "vertical" === this.direction ? this.$refs.elem.offsetHeight : this.$refs.elem.offsetWidth, this.offset = "vertical" === this.direction ? this.$refs.elem.getBoundingClientRect().top + window.pageYOffset || document.documentElement.scrollTop : this.$refs.elem.getBoundingClientRect().left);
        }, refresh: function() {
          this.$refs.elem && (this.getStaticData(), this.setPosition());
        }
      },
      mounted: function() {
        var t = this;
        "undefined" != typeof window && "undefined" != typeof document && this.$nextTick(function() {
          t.getStaticData(), t.setValue(t.value, !0, 0), t.bindEvents();
        });
      },
      beforeDestroy: function() {
        this.unbindEvents();
      }
    };
  }, ZapU: function(t, i, e) {
    "use strict";
    var s = function() {
      var t = this, i = t.$createElement, e = t._self._c || i;
      return e("div", {
        staticClass: "noselect",
        attrs: { id: "app" }
      }, [e("div", { staticClass: "container" }, [e("h3", {
        staticClass: "app_title",
        domProps: { textContent: t._s(t.title) }
      }), t._v(" "), e("div", { attrs: { id: "renderCanvas" } }, [e("div", {
        staticClass: "loading",
        style: "height:100%;width:100%;text-align:center;"
      }, [t._v("loading...")])])]), t._v(" "), e("div", { staticClass: "app_aside" }, [e("ui-btn", {
        staticClass: "aside_reset",
        attrs: { type: "reset1", id: "button1" },
        nativeOn: {
          click: function(i) {
            return t.resetWidget(i);
          }
        }
      }), t._v(" "), e("div", {
        staticClass: "btn_space",
        style: { display: t.BtnSpaceStyle },
        attrs: { id: "btn_space" }
      }, [e("div", { style: "height:56px;" }, [e("ui-btn", {
        attrs: {
          type: "radio",
          id: "button2",
          width: 119,
          height: 44
        }, on: {
          callback: function(i) {
            t.radioC(1);
          }
        }, model: {
          value: t.radio1, callback: function(i) {
            t.radio1 = i;
          }, expression: "radio1"
        }
      }, [t._v("\n                    顶点\n                ")]), t._v(" "), e("div", {
        staticClass: "add",
        attrs: { id: "button3" },
        on: {
          click: function(i) {
            t.addC(1);
          }
        }
      }, t._l(8, function(i) {
        return e("span", { class: { marginR: 8 != i, bBlue: t.add1 >= i } });
      }))], 1), t._v(" "), e("div", { style: "height:56px;" }, [e("ui-btn", {
        attrs: {
          type: "radio",
          id: "button4",
          width: 119,
          height: 44
        }, on: {
          callback: function(i) {
            t.radioC(2);
          }
        }, model: {
          value: t.radio2, callback: function(i) {
            t.radio2 = i;
          }, expression: "radio2"
        }
      }, [t._v("\n                    面心\n                ")]), t._v(" "), e("div", {
        staticClass: "add",
        attrs: { id: "button5" },
        on: {
          click: function(i) {
            t.addC(2);
          }
        }
      }, t._l(6, function(i) {
        return e("span", { class: { marginR: 6 != i, bBlue: t.add2 >= i } });
      }))], 1), t._v(" "), e("div", { style: "height:56px;" }, [e("ui-btn", {
        attrs: {
          type: "radio",
          id: "button6",
          width: 119,
          height: 44
        }, on: {
          callback: function(i) {
            t.radioC(3);
          }
        }, model: {
          value: t.radio3, callback: function(i) {
            t.radio3 = i;
          }, expression: "radio3"
        }
      }, [t._v("\n                    内部\n                ")]), t._v(" "), e("div", {
        staticClass: "add",
        attrs: { id: "button7" },
        on: {
          click: function(i) {
            t.addC(3);
          }
        }
      }, t._l(4, function(i) {
        return e("span", { class: { marginR: 4 != i, bBlue: t.add3 >= i } });
      }))], 1), t._v(" "), e("div", { style: "height:56px;" }, [e("ui-btn", {
        attrs: {
          type: "radio",
          id: "button8",
          width: 119,
          height: 44
        }, on: {
          callback: function(i) {
            t.radioC(4);
          }
        }, model: {
          value: t.radio4, callback: function(i) {
            t.radio4 = i;
          }, expression: "radio4"
        }
      }, [t._v("\n                    无隙并置\n                ")]), t._v(" "), e("div", {
        staticClass: "add",
        attrs: { id: "button9" },
        on: {
          click: function(i) {
            t.addC(4);
          }
        }
      }, t._l(7, function(i) {
        return e("span", { class: { marginR: 7 != i, bBlue: t.add4 >= i } });
      }))], 1), t._v(" "), e("div", { style: "margin-top:18px;margin-bottom:20px;height:72px;" }, [e("p", { style: "height:16px;margin-bottom:12px;font-size:16px;line-height:16px;color:#4D4D4D;text-align:center;" }, [t._v("\n                    视角取向")]), t._v(" "), e("div", { style: "display:flex;justify-content:space-between;" }, [e("ui-btn", {
        attrs: {
          width: 85,
          height: 44,
          type: t.blue1
        }, on: {
          callback: function(i) {
            t.sjs(1);
          }
        }
      }, [t._v("取向1")]), t._v(" "), e("div", { style: "width:50px;height:44px;" }, [e("img", {
        style: "width:50px;height:auto;",
        attrs: { src: "static/UI/jt.png", alt: "" }
      })]), t._v(" "), e("ui-btn", {
        attrs: { width: 85, height: 44, type: t.blue2 }, on: {
          callback: function(i) {
            t.sjs(2);
          }
        }
      }, [t._v("取向2")])], 1)]), t._v(" "), e("ui-btn", {
        attrs: { type: "switch" },
        model: {
          value: t.switch_checked, callback: function(i) {
            t.switch_checked = i;
          }, expression: "switch_checked"
        }
      }, [t._v("\n                坐标参数\n            ")])], 1)], 1)]);
    }, n = [], a = { render: s, staticRenderFns: n };
    i.a = a;
  }, ZgF2: function(t, i) {
  }, chG5: function(t, i, e) {
    "use strict";

    function s(t) {
      e("4h/Y");
    }

    var n = e("WCnO"), a = e("nMXj"), r = e("VU/8"), o = s, l = r(n.a, a.a, !1, o, null, null);
    i.a = l.exports;
  }, iSiz: function(t, i, e) {
    "use strict";
    var s = function() {
      var t = this, i = t.$createElement, e = t._self._c || i;
      return e("div", {
        staticClass: "Ui-head",
        class: { type2: "head_btn" === t.type }
      }, [e("h3", { domProps: { textContent: t._s(t.title) } }), t._v(" "), t._t("default")], 2);
    }, n = [], a = { render: s, staticRenderFns: n };
    i.a = a;
  }, m1oz: function(t, i, e) {
    "use strict";
    i.a = {
      props: ["title", "type"], components: {}, created: function() {
      }, data: function() {
        return {};
      }, methods: {
        resetApp: function() {
          this.$emit("resetApp");
        }
      }
    };
  }, nMXj: function(t, i, e) {
    "use strict";
    var s = function() {
      var t = this, i = t.$createElement, e = t._self._c || i;
      return e("div", {
        ref: "wrap",
        class: ["uiSlider", t.isBox, t.flowDirection, {
          "ui-has-piecewise": t.piecewiseLabel,
          noBlueProcess: t.noBlueProcess ? t.noBlueProcess : t.noBlue
        }],
        style: t.wrapStyles,
        on: { click: t.wrapClick }
      }, [t.title ? e("h3", {
        staticClass: "ui-title",
        domProps: { textContent: t._s(t.title) }
      }) : t._e(), t._v(" "), t.subTitle ? e("p", {
        staticClass: "ui-subTitle",
        domProps: { textContent: t._s(t.subTitle) }
      }) : t._e(), t._v(" "), t.label ? e("ul", {
        staticClass: "ui-label",
        style: { width: t.infinity ? "53%" : "", marginLeft: t.dotSize / 2 + "px" }
      }, t._l(t.label, function(i) {
        return e("li", { style: { width: 100 / t.label.length + "%" }, domProps: { textContent: t._s(i) } });
      })) : t._e(), t._v(" "), e("div", {
        ref: "elem",
        staticClass: "vue-slider",
        style: [t.elemStyles, t.infinityStyle],
        attrs: { "aria-hidden": "true" }
      }, [t.valueIsArray ? [e("div", {
        ref: "dot0",
        class: [t.tooltipStatus, "ui-dot"],
        style: [t.dotStyles],
        on: {
          mousedown: function(i) {
            t.moveStart(0);
          }, touchstart: function(i) {
            t.moveStart(0);
          }
        }
      }, [e("span", {
        staticClass: "dotTxt",
        domProps: { textContent: t._s(t.dotTxt && t.dotTxt[0]) }
      }), t._v(" "), e("span", { class: ["ui-toolTip-" + t.tooltipDirection[0], "ui-toolTip-wrap"] }, [t._v("\n            " + t._s(t.formatter ? t.formatting(t.val[0]) : t.val[0]) + "\n          ")])]), t._v(" "), e("div", {
        ref: "dot1",
        class: [t.tooltipStatus, "ui-dot"],
        style: [t.dotStyles],
        on: {
          mousedown: function(i) {
            t.moveStart(1);
          }, touchstart: function(i) {
            t.moveStart(1);
          }
        }
      }, [e("span", {
        staticClass: "dotTxt",
        domProps: { textContent: t._s(t.dotTxt && t.dotTxt[1]) }
      }), t._v(" "), e("span", { class: ["ui-toolTip-" + t.tooltipDirection[1], "ui-toolTip-wrap"] }, [t._v("\n            " + t._s(t.formatter ? t.formatting(t.val[1]) : t.val[1]) + "\n\t\t\t\t\t")])])] : [e("div", {
        ref: "dot",
        class: [t.tooltipStatus, "ui-dot"],
        style: [t.dotStyles],
        on: { mousedown: t.moveStart, touchstart: t.moveStart }
      }, [e("span", {
        staticClass: "dotTxt",
        domProps: { textContent: t._s(t.dotTxt) }
      }), t._v(" "), e("span", { class: ["ui-toolTip-" + t.tooltipDirection, "ui-toolTip-wrap"] }, [t._v("\n            " + t._s(t.formatter ? t.formatting(t.val) : t.val) + "\n\t\t\t\t\t")])])], t._v(" "), e("ul", { staticClass: "ui-piecewise" }, t._l(t.piecewiseDotWrap, function(i, s) {
        return e("li", {
          key: s,
          staticClass: "ui-piecewise-item",
          style: [t.piecewiseDotStyle, i.style]
        }, [t.piecewise ? e("span", {
          staticClass: "ui-piecewise-dot",
          class: { piecewiseActiveStyle: i.inRange }
        }) : t._e(), t._v(" "), t.piecewiseLabel ? e("span", {
          staticClass: "ui-piecewise-label",
          class: { labelActiveStyle: i.inRange }
        }, [t._v("\n\t\t\t\t\t\t\t" + t._s(i.label) + "\n\t\t\t\t\t\t")]) : t._e()]);
      })), t._v(" "), e("div", {
        ref: "process",
        staticClass: "vue-slider-process"
      })], 2), t._v(" "), t.infinity ? e("div", {
        staticClass: "ui-infinity",
        style: { height: t.processHeight + "px" }
      }, [e("span"), e("span"), t._v(" "), e("span"), t._v(" "), e("span"), e("span"), t._v(" "), e("small", [t._v("+∞")])]) : t._e(), t._v(" "), t.valueIsArray || t.data ? t._e() : e("input", {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: t.val,
          expression: "val"
        }],
        staticClass: "vue-slider-sr-only",
        attrs: { type: "range", min: t.min, max: t.max },
        domProps: { value: t.val },
        on: {
          __r: function(i) {
            t.val = i.target.value;
          }
        }
      })]);
    }, n = [], a = { render: s, staticRenderFns: n };
    i.a = a;
  }, oinG: function(t, i, e) {
    "use strict";

    function s(t) {
      e("ZgF2");
    }

    var n = e("8wPv"), a = e("OYhW"), r = e("VU/8"), o = s, l = r(n.a, a.a, !1, o, null, null);
    i.a = l.exports;
  }, xJD8: function(t, i, e) {
    "use strict";
    var s = e("I5Qu"), n = e("oinG"), a = e("chG5");
    i.a = {
      name: "app", components: { uiHead: s.a, uiBtn: n.a, uiSlider: a.a }, data: function() {
        return {
          title: "金刚石晶胞原子坐标参数",
          BtnSpaceStyle: "flex",
          radio1: !1,
          radio2: !1,
          radio3: !1,
          radio4: !1,
          radio: 0,
          add1: 0,
          add2: 0,
          add3: 0,
          add4: 0,
          blue1: "",
          blue2: "",
          switch_checked: !1
        };
      }, created: function() {
        document.title = this.title;
      }, watch: {
        switch_checked: function() {
          this.switch_checked ? ("" == this.blue2 && (this.sjs(1), this.blue1 = "blue"), 4 == this.radio && (this.radio4 = !1, this.add4 = 0, this.TOOUT.resetC(!0), this.TOOUT.changeCamera(!1), this.radio = 0)) : (this.blue1 = "", this.blue2 = ""), this.TOOUT.showZXY(), this.TOOUT.showArrow();
        }
      }, methods: {
        setSideStyle: function() {
          var t = document.getElementById("btn_space");
          t && t.scrollHeight > t.offsetHeight ? this.BtnSpaceStyle = "block" : this.BtnSpaceStyle = "flex";
          var i = $("canvas").width(), e = $("canvas").height(), s = ($("#renderCanvas").width() - i) / 2;
          $("canvas").css({
            left: s + "px",
            top: ($("#renderCanvas").height() - e) / 2 + "px"
          }), $(".loading").css("line-height", window.innerHeight + "px");
        }, radioC: function(t) {
          if (this.radio == t) return void(this["radio" + t] = !0);
          4 == t ? (this.TOOUT.changeCamera(!0), this.switch_checked = !1) : 4 == this.radio && this.TOOUT.changeCamera(!1), this.TOOUT.resetC(), this.add1 = 0, this.add2 = 0, this.add3 = 0, this.add4 = 0, this.radio1 = !1, this.radio2 = !1, this.radio3 = !1, this.radio4 = !1, this["radio" + t] = !0, this.radio = t, this.TOOUT.changeColor(t, "#d3ff41");
        }, addC: function(t) {
          this.radio == t && (this["add" + t] += 1, 1 == t ? this.TOOUT.addD(this.add1) : 2 == t ? this.TOOUT.addM(this.add2) : 3 == t ? this.TOOUT.addN(this.add3) : 4 == t && this.TOOUT.addB(this.add4));
        }, sjs: function(t) {
          1 == t && "" != this.blue1 || 2 == t && "" != this.blue2 || (this.blue1 = "", this.blue2 = "", this["blue" + t] = "blue", 1 == t ? (this.TOOUT.anC(!0), this.TOOUT.rotateArrow(!0)) : (this.TOOUT.anC(!1), this.TOOUT.rotateArrow(!1)), this.TOOUT.showZXY());
        }, init: function() {
          function t(t, i, e) {
            var s = new THREE.CylinderGeometry(t, i, e, 16),
              n = new THREE.MeshBasicMaterial({ color: 16711680, depthTest: !1 });
            return new THREE.Mesh(s, n);
          }

          function i(t, i, e, s, n, a) {
            var r = THREE_Text.SpriteText2D, o = THREE_Text.textAlign,
              l = { align: o.center, font: a + "px \"Cambria Math\"", fillStyle: n, antialias: !0 }, h = new r(t, l);
            return h.position.set(i, e, s), h;
          }

          var e = this;
          this.setSideStyle();
          var s, n, a, r, o = document.getElementById("renderCanvas"), l = window.innerWidth - 280,
            h = window.innerHeight;
          n = new THREE.WebGLRenderer({ antialias: !0 }), n.setPixelRatio(window.devicePixelRatio), n.setClearColor(16777215), n.setSize(l, h), o.appendChild(n.domElement), n.setFaceCulling(THREE.CullFaceBack, THREE.FrontFaceDirectionCW), a = new THREE.Scene, r = new THREE.OrthographicCamera(l / -1, l / 1, h / 1, h / -1, 1, 27e3), r.position.set(2e3, 2e3, 1e4), r.lookAt(a.position), a.add(r), s = new THREE.OrbitControls(r, n.domElement), s.enableDamping = !0, s.dampingFactor = .25, s.enableRotate = !0, s.enablePan = !1;
          var c = new THREE.DirectionalLight(16777215, .65);
          c.position.set(150, 250, 150), a.add(c);
          var d = new THREE.DirectionalLight(16777215, .65);
          d.position.set(-150, -250, -150), a.add(d);
          var u = new THREE.HemisphereLight(16777215, 16777215, .56);
          u.color.setHSL(.6, 1, .6), u.groundColor.setHSL(.095, 1, .75), u.position.set(0, 0, 0), a.add(u);
          var p = function t() {
            r.zoom <= .5 ? r.zoom = .5000001 : r.zoom >= 2 && 4 != e.radio ? r.zoom = 1.99999999 : r.zoom >= 1.05 && 4 == e.radio && (r.zoom = 1.049999999), r.updateProjectionMatrix(), s.update(), requestAnimationFrame(t), n.render(a, r);
          };
          requestAnimationFrame(p);
          var v = null, f = [];
          !function(t, i, e, s, n) {
            var a = function(t) {
              if (t.lengthComputable) {
                var i = t.loaded / t.total * 100;
                console.log(Math.round(i, 2) + "% downloaded");
              }
            }, o = function(t) {
            }, l = new THREE.MTLLoader;
            l.setPath("static/obj/"), l.load(i, function(i) {
              i.preload();
              var l = new THREE.OBJLoader;
              l.setMaterials(i), l.setPath("static/obj/"), l.load(t, function(t) {
                t.traverse(function(t) {
                  t instanceof THREE.Mesh && (t.material.shading = THREE.SmoothShading);
                }), window.innerWidth < 500 || window.innerHeight < 500 ? (t.scale.x = s, t.scale.y = s, t.scale.z = s) : (t.scale.x = s, t.scale.y = s, t.scale.z = s, r.zoom = 2), e = t, n && n(e);
              }, a, o);
            });
          }("1.obj", "1.mtl", v, 5, function(t) {
            for (var i in t.children) "contains" != i && (-1 == t.children[i].name.indexOf("pCylinder") ? t.children[i].material = new THREE.MeshPhongMaterial({ color: "#5CAEFD" }) : t.children[i].material = new THREE.MeshPhongMaterial({ color: "#eeeeee" }));
            v = t, v.rotation.y = Math.PI / 4, f[1] = v.clone(), f[2] = v.clone(), f[3] = v.clone(), f[4] = v.clone(), f[5] = v.clone(), f[6] = v.clone(), f[7] = v.clone(), f[1].visible = !1, f[2].visible = !1, f[3].visible = !1, f[4].visible = !1, f[5].visible = !1, f[6].visible = !1, f[7].visible = !1, a.add(v, f[1], f[2], f[3], f[4], f[5], f[6], f[7]), $(".loading").hide();
          });
          var m = new THREE.Group, y = new THREE.Group, b = new THREE.Group, g = [];
          g[1] = i("(0,0,0)", -115, -130, 115, "#000", 15), g[2] = i("(0,0,0)", 115, -130, 115, "#000", 15), g[3] = i("(0,0,0)", 115, -130, -115, "#000", 15), g[4] = i("(0,0,0)", -115, -130, -115, "#000", 15), g[5] = i("(0,0,0)", -115, 158, 115, "#000", 15), g[6] = i("(0,0,0)", 115, 158, 115, "#000", 15), g[7] = i("(0,0,0)", 115, 158, -115, "#000", 15), g[8] = i("(0,0,0)", -115, 158, -115, "#000", 15);
          var w = [];
          w[1] = i("(1/2,1/2,0)", 0, -130, 0, "#000", 15), w[2] = i("(1/2,1/2,0)", 0, 158, 0, "#000", 15), m.add(g[1], g[2], g[3], g[4], g[5], g[6], g[7], g[8], w[1], w[2]);
          for (var x in m.children) m.children[x].visible = !1;
          var _ = [];
          _[3] = i("(0,1/2,1/2)", -115, -15, 0, "#000", 15), _[4] = i("(0,1/2,1/2)", 115, -15, 0, "#000", 15), _[5] = i("(1/2,0,1/2)", 0, -15, 115, "#000", 15), _[6] = i("(1/2,0,1/2)", 0, -15, -115, "#000", 15);
          var T = [];
          T[1] = i("(1/4,1/4,1/4)", -67, -82, 67, "#000", 15), T[2] = i("(3/4,3/4,1/4)", 67, -82, -67, "#000", 15), T[3] = i("(1/4,3/4,3/4)", -67, 97, -67, "#000", 15), T[4] = i("(3/4,1/4,3/4)", 67, 97, 67, "#000", 15), y.add(_[3], _[4], _[5], _[6], T[1], T[2], T[3], T[4]);
          var S = [];
          S[3] = i("(1/2,0,1/2)", -115, -15, 0, "#000", 15), S[4] = i("(1/2,0,1/2)", 115, -15, 0, "#000", 15), S[5] = i("(0,1/2,1/2)", 0, -15, 115, "#000", 15), S[6] = i("(0,1/2,1/2)", 0, -15, -115, "#000", 15);
          var E = [];
          E[1] = i("(1/4,3/4,1/4)", -67, -82, 67, "#000", 15), E[2] = i("(3/4,1/4,1/4)", 67, -82, -67, "#000", 15), E[3] = i("(3/4,3/4,3/4)", -67, 97, -67, "#000", 15), E[4] = i("(1/4,1/4,3/4)", 67, 97, 67, "#000", 15), b.add(S[3], S[4], S[5], S[6], E[1], E[2], E[3], E[4]), y.visible = !1, b.visible = !1;
          var C = new THREE.Group;
          C.add(m, y, b), a.add(C);
          var k = function() {
            for (var t in m.children) m.children[t].visible = !1;
            for (var t in y.children) y.children[t].visible = !1;
            for (var t in b.children) b.children[t].visible = !1;
          };
          k();
          var O = function() {
            if (e.switch_checked) {
              if (e.radio1) for (var t in g) e.add1 >= t ? g[t].visible = !0 : g[t].visible = !1; else if (e.radio2) {
                for (var t in w) e.add2 >= t ? w[t].visible = !0 : w[t].visible = !1;
                if ("" != e.blue1) {
                  y.visible = !0, b.visible = !1;
                  for (var t in _) e.add2 >= t ? _[t].visible = !0 : _[t].visible = !1;
                } else if ("" != e.blue2) {
                  y.visible = !1, b.visible = !0;
                  for (var t in S) e.add2 >= t ? S[t].visible = !0 : S[t].visible = !1;
                }
              } else if (e.radio3) if ("" != e.blue1) {
                y.visible = !0, b.visible = !1;
                for (var t in T) e.add3 >= t ? T[t].visible = !0 : T[t].visible = !1;
              } else if ("" != e.blue2) {
                y.visible = !1, b.visible = !0;
                for (var t in E) e.add3 >= t ? E[t].visible = !0 : E[t].visible = !1;
              }
            } else k();
          }, z = function(t) {
            var i = "";
            switch (t) {
              case 6:
                i = "one";
                break;
              case 7:
                i = "eight";
                break;
              case 8:
                i = "six";
                break;
              case 5:
                i = "seven";
                break;
              case 2:
                i = "three";
                break;
              case 3:
                i = "five";
                break;
              case 4:
                i = "four";
                break;
              case 1:
                i = "two", H(1, "#5CAEFD");
            }
            for (var s in v.children) "contains" != s && -1 != v.children[s].name.indexOf("jiao" + i) && v.children[s].material.color.set("#d3ff41");
            e.switch_checked && O();
          }, A = function(t) {
            var i = "";
            switch (t) {
              case 1:
                i = "three", H(2, "#5CAEFD");
                break;
              case 2:
                i = "one";
                break;
              case 3:
                i = "six";
                break;
              case 4:
                i = "two";
                break;
              case 5:
                i = "five";
                break;
              case 6:
                i = "four";
            }
            for (var s in v.children) "contains" != s && -1 != v.children[s].name.indexOf("angle" + i) && v.children[s].material.color.set("#d3ff41");
            e.switch_checked && O();
          }, I = function(t) {
            switch (t) {
              case 1:
                t = "5", H(3, "#5CAEFD");
                break;
              case 2:
                t = "3";
                break;
              case 3:
                t = "4";
                break;
              case 4:
                t = "";
            }
            for (var i in v.children) "contains" != i && -1 != v.children[i].name.indexOf("sphere" + t) && v.children[i].material.color.set("#d3ff41");
            e.switch_checked && O();
          }, H = function(t, i) {
            var e = "";
            if (1 == t) e = "jiao"; else if (2 == t) e = "angle"; else {
              if (3 != t) return;
              e = "sphere";
            }
            for (var s in v.children) "contains" != s && -1 != v.children[s].name.indexOf(e) && v.children[s].material.color.set(i);
          }, D = function(t, i) {
            var e = t.position.x, s = (i - e) / 40, n = 0, a = setInterval(function() {
              if (n >= 40) return void clearInterval(a);
              t.position.x += s, n++;
            }, 40);
          }, R = null, V = function(t) {
            clearInterval(R);
            var i = r.position.x, e = r.position.y, s = r.position.z;
            if (t) var n = (0 - i) / 40, a = (0 - e) / 40, o = (2e3 - s) / 40; else var n = (2e3 - i) / 40,
              a = (0 - e) / 40, o = (0 - s) / 40;
            var l = 0;
            R = setInterval(function() {
              if (l >= 40) return void clearInterval(R);
              r.position.x += n, r.position.y += a, r.position.z += o, l++;
            }, 40);
          }, P = function(t) {
            if (!(t > 7)) switch (f[t].visible = !0, t) {
              case 1:
                v.position.x = -115, f[t].position.set(600, 0, 0), D(f[t], 115), K.position.x = -115, C.position.x = -115;
                break;
              case 2:
                v.position.y = -115, f[1].position.y = -115, f[t].position.set(-600, 115, 0), D(f[t], -115), K.position.y = -115, C.position.y = -115;
                break;
              case 3:
                f[t].position.set(600, 115, 0), D(f[t], 115);
                break;
              case 4:
                v.position.z = -115, f[1].position.z = -115, f[2].position.z = -115, f[3].position.z = -115, f[t].position.set(-600, -115, 115), D(f[t], -115), K.position.z = -115, C.position.z = -115;
                break;
              case 5:
                f[t].position.set(600, -115, 115), D(f[t], 115);
                break;
              case 6:
                f[t].position.set(-600, 115, 115), D(f[t], -115);
                break;
              case 7:
                f[t].position.set(600, 115, 115), D(f[t], 115);
            }
          }, B = function(t) {
            t && (window.innerWidth < 500 || window.innerHeight < 500) ? r.zoom = .65 : r.zoom = 1, r.updateProjectionMatrix();
          }, L = function(t) {
            if (v.position.set(0, 0, 0), K.position.set(0, 0, -2), C.position.set(0, 0, 0), k(), !t) for (var i in v.children) "contains" != i && -1 == v.children[i].name.indexOf("pCylinder") && (v.children[i].material = new THREE.MeshPhongMaterial({ color: "#5CAEFD" }));
            for (var i = 1; i <= 7; i++) f[i].visible = !1;
          }, U = function() {
            e.add1 = 0, e.add2 = 0, e.add3 = 0, e.add4 = 0, e.radio = 0, e.radio1 = !1, e.radio2 = !1, e.radio3 = !1, e.radio4 = !1, e.blue1 = "", e.blue2 = "", e.switch_checked = !1, clearInterval(R), r.position.set(2e3, 2e3, 1e4), window.innerWidth < 500 || window, innerHeight < 500 ? r.zoom = 1 : r.zoom = 2, r.updateProjectionMatrix(), L();
          }, W = new THREE.Group, M = t(2, 2, 320), j = t(0, 3, 10);
          j.position.y = 160;
          var F = i("x", 0, 190, 0, "#f00", 18);
          W.add(M, j, F), W.rotation.z = -Math.PI / 2, W.position.set(0, -115, 115);
          var N = new THREE.Group, G = M.clone(), Y = j.clone(), X = i("y", 0, 190, 0, "#f00", 18);
          N.add(G, Y, X), N.rotation.x = -Math.PI / 2, N.position.set(-115, -115, 0);
          var Z = new THREE.Group, J = M.clone(), Q = j.clone(), q = i("z", 0, 190, 0, "#f00", 18);
          Z.add(J, Q, q), Z.position.set(-115, 0, 115);
          var K = new THREE.Group;
          K.add(W, N, Z), K.visible = !1, K.position.set(0, 0, -2), a.add(K);
          var tt = function() {
            K.visible = e.switch_checked;
          }, it = function(t) {
            K.rotation.y = t ? 0 : Math.PI / 2;
          }, et = !1, st = function() {
            et = !0;
          }, nt = function() {
            et && clearInterval(R);
          }, at = function() {
            et = !1;
          }, rt = $("#renderCanvas canvas")[0];
          rt.addEventListener("mousedown", st), rt.addEventListener("mousemove", nt), window.addEventListener("mouseup", at), rt.addEventListener("touchstart", st), rt.addEventListener("touchmove", nt), window.addEventListener("touchend", at);
          return function() {
            return {
              reset: U,
              resetC: L,
              addD: z,
              addM: A,
              addN: I,
              addB: P,
              changeCamera: B,
              anC: V,
              showArrow: tt,
              rotateArrow: it,
              showZXY: O,
              changeColor: H
            };
          }();
        }, resetWidget: function() {
          this.TOOUT.reset();
        }
      }, mounted: function() {
        var t = this;
        this.TOOUT = this.init(), window.onresize = function() {
          t.setSideStyle();
        };
      }
    };
  }
}, ["NHnr"]);