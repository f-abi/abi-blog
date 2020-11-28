"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkEmailAPI = checkEmailAPI;
exports.sendCaptchaAPI = sendCaptchaAPI;
exports.registerAPI = registerAPI;
exports.loginAPI = loginAPI;
exports.changePasswordAPI = changePasswordAPI;
exports.getInfoAPI = getInfoAPI;
exports.logoutAPI = logoutAPI;
exports.getSaveArticleAPI = getSaveArticleAPI;
exports.saveArticleAPI = saveArticleAPI;
exports.imgUploadRedisAPI = imgUploadRedisAPI;
exports.subreviewarticleAPI = subreviewarticleAPI;
exports.getUserInfoAPI = getUserInfoAPI;
exports.setUserInfoAPI = setUserInfoAPI;

var _request = require("@/http/request");

//验证邮箱
function checkEmailAPI(data) {
  return _request.apiV1.request({
    method: "POST",
    url: "/checkemail",
    data: data
  });
} //发送验证码至邮箱


function sendCaptchaAPI(data) {
  return _request.apiV1.request({
    method: "POST",
    url: "/sendcaptcha",
    data: data
  });
} //注册


function registerAPI(data) {
  return _request.apiV1.request({
    method: "POST",
    url: "/register",
    data: data
  });
} //登陆


function loginAPI(data) {
  return _request.apiV1.request({
    method: "POST",
    url: "/login",
    data: data
  });
} //修改密码


function changePasswordAPI(data) {
  return _request.apiV1.request({
    method: "POST",
    url: "/changepassword",
    data: data
  });
} //获取用户信息


function getInfoAPI() {
  return _request.apiV1.request({
    method: "GET",
    url: "/user/info"
  });
} //退出登陆


function logoutAPI() {
  return _request.apiV1.request({
    method: "GET",
    url: "/user/logout"
  });
} //获取保存文章


function getSaveArticleAPI() {
  return _request.apiV1.request({
    method: "get",
    url: "/user/getsavearticle"
  });
} //保存文章


function saveArticleAPI(data) {
  return _request.apiV1.request({
    method: "POST",
    url: "/user/savearticle",
    data: data
  });
} //上传临时图片


function imgUploadRedisAPI(data) {
  return _request.apiV1.request({
    method: "POST",
    url: "/user/imgupload",
    data: data
  });
} //提交文章审核


function subreviewarticleAPI(data) {
  return _request.apiV1.request({
    method: "POST",
    url: "/user/subreviewarticle",
    data: data
  });
} //获取用户个人信息


function getUserInfoAPI() {
  return _request.apiV1.request({
    method: "GET",
    url: "/user/getuserinfo"
  });
} //设置用户个人信息


function setUserInfoAPI(data) {
  return _request.apiV1.request({
    method: "POST",
    url: "/user/setuserinfo",
    data: data
  });
}