import { createStore } from "vuex";
import { getInfoAPI, logoutAPI } from "@/http/v1/apiV1";
import { setCookie, delCookie } from "@/utility/cookie";

export default createStore({
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
    //
    tips: {
      istips: false,
      icon: null,
      title: null,
      text: null,
    },
  },
  mutations: {
    logined(state, token) {
      state.isAuth = true;
      state.userToken = token;
      setCookie("u_t", token, 7);
    },
    refreshToken(state, token) {
      state.userToken = token;
      delCookie("u_t");
      setCookie("u_t", token, 7);
    },
    setInfo(state, data) {
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
    logout(state) {
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
      delCookie("u_t");
    },
    openSubmitload(state, tips) {
      state.isSubLoad = true;
      state.subLoadTips = tips;
    },
    cancelSubmitload(state) {
      state.isSubLoad = false;
      state.subLoadTips = null;
    },
    openTips(state, data) {
      if (!state.tips.istips && state.tips.icon == null) {
        console.log("111111111");
        console.log(data);
        state.tips.istips = true;
        state.tips.icon = data.icon;
        state.tips.title = data.title;
        state.tips.text = data.text;
        setTimeout(() => {
          state.tips.istips = false;
          setTimeout(() => {
            state.tips.icon = null;
            state.tips.title = null;
            state.tips.text = null;
          }, 400);
        }, 2500);
      }
    },
    cancelTips(state) {
      state.tips.istips = false;
      setTimeout(() => {
        state.tips.icon = null;
        state.tips.title = null;
        state.tips.text = null;
      }, 400);
    },
  },
  actions: {
    logined({ dispatch, commit }, token) {
      return new Promise(function(resolve, reject) {
        commit("logined", token);
        dispatch("getInfo")
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },
    getInfo({ commit }) {
      return new Promise(function(resolve, reject) {
        getInfoAPI()
          .then((res) => {
            commit("setInfo", res.data);
            resolve();
          })
          .catch((err) => {
            commit("logout");
            console.log(err.msg);
            reject();
          });
      });
    },
    logout({ commit }) {
      return new Promise(function(resolve, reject) {
        logoutAPI().then((res) => {
          commit("logout");
        });
      });
    },
    refreshToken({ commit }, token) {
      return new Promise(function(resolve, reject) {
        commit("refreshToken", token);
      });
    },
  },
  modules: {},
});
