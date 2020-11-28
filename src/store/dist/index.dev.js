"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vuex = require("vuex");

var _apiV = require("@/http/v1/apiV1");

var _cookie = require("@/utility/cookie");

var _default = (0, _vuex.createStore)({
  state: {
    isAuth: false,
    userId: null,
    userName: null,
    userEmail: null,
    userToken: null,
    userProfile: null,
    userPersonality: null,
    noticeNum: null,
    followNum: null,
    fansNum: null,
    articleNum: null,
    //
    isSubLoad: false,
    subLoadTips: null,
    tips: {
      istips: false,
      icon: null,
      title: null,
      text: null
    }
  },
  mutations: {
    logined: function logined(state, token) {
      state.isAuth = true;
      state.userToken = token;
      (0, _cookie.setCookie)("u_t", token, 7);
    },
    refreshToken: function refreshToken(state, token) {
      state.userToken = token;
      (0, _cookie.delCookie)("u_t");
      (0, _cookie.setCookie)("u_t", token, 7);
    },
    setInfo: function setInfo(state, data) {
      state.userName = data.userName;
      state.userEmail = data.userEmail;
      state.userProfile = data.userProfile;
      state.userPersonality = data.userPersonality;
      state.noticeNum = data.noticeNum;
      state.followNum = data.followNum;
      state.fansNum = data.fansNum;
      state.articleNum = data.articleNum;
      state.userId = data.userId;
    },
    logout: function logout(state) {
      state.isAuth = false;
      state.userToken = null;
      state.userName = null;
      state.userEmail = null;
      state.noticeNum = null;
      state.followNum = null;
      state.fansNum = null;
      state.articleNum = null;
      state.userPersonality = null;
      state.userId = null;
      (0, _cookie.delCookie)("u_t");
    },
    openSubmitload: function openSubmitload(state, tips) {
      state.isSubLoad = true;
      state.subLoadTips = tips;
    },
    cancelSubmitload: function cancelSubmitload(state) {
      state.isSubLoad = false;
      state.subLoadTips = null;
    },
    openTips: function openTips(state, data) {
      state.tips.istips = true;
      state.tips.icon = data.icon;
      state.tips.title = data.title;
      state.tips.text = data.text;
      setTimeout(function () {
        state.tips.istips = false;
        setTimeout(function () {
          state.tips.icon = null;
          state.tips.title = null;
          state.tips.text = null;
        }, 400);
      }, 2500);
    },
    cancelTips: function cancelTips(state) {
      state.tips.istips = false;
      setTimeout(function () {
        state.tips.icon = null;
        state.tips.title = null;
        state.tips.text = null;
      }, 400);
    }
  },
  actions: {
    logined: function logined(_ref, token) {
      var dispatch = _ref.dispatch,
          commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        commit("logined", token);
        dispatch("getInfo").then(function () {
          resolve();
        })["catch"](function () {
          reject();
        });
      });
    },
    getInfo: function getInfo(_ref2) {
      var commit = _ref2.commit;
      return new Promise(function (resolve, reject) {
        (0, _apiV.getInfoAPI)().then(function (res) {
          commit("setInfo", res.data);
          resolve();
        })["catch"](function (err) {
          commit("logout");
          console.log(err.msg);
          reject();
        });
      });
    },
    logout: function logout(_ref3) {
      var commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        (0, _apiV.logoutAPI)().then(function (res) {
          commit("logout");
        });
      });
    },
    refreshToken: function refreshToken(_ref4, token) {
      var commit = _ref4.commit;
      return new Promise(function (resolve, reject) {
        commit("refreshToken", token);
      });
    }
  },
  modules: {}
});

exports["default"] = _default;