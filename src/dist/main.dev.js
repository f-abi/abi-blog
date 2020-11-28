"use strict";

var _vue = require("vue");

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

require("@/assets/fonts/font.css");

var _AbiIcon = _interopRequireDefault(require("@/components/icon/AbiIcon.vue"));

var _cookie = require("@/utility/cookie");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//font and icon
//
if ((0, _cookie.isCookie)("u_t")) {
  _store["default"].dispatch("logined", (0, _cookie.getCookie)("u_t")).then(function () {
    (0, _vue.createApp)(_App["default"]).component("AbiIcon", _AbiIcon["default"]).use(_store["default"]).use(_router["default"]).mount("#app");
  })["catch"](function () {
    (0, _vue.createApp)(_App["default"]).component("AbiIcon", _AbiIcon["default"]).use(_store["default"]).use(_router["default"]).mount("#app");
  });
} else {
  (0, _vue.createApp)(_App["default"]).component("AbiIcon", _AbiIcon["default"]).use(_store["default"]).use(_router["default"]).mount("#app");
}