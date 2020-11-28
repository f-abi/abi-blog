import { apiV1 } from "@/http/request";
//验证邮箱
export function checkEmailAPI(data) {
  return apiV1.request({
    method: "POST",
    url: "/checkemail",
    data,
  });
}

//发送验证码至邮箱
export function sendCaptchaAPI(data) {
  return apiV1.request({
    method: "POST",
    url: "/sendcaptcha",
    data,
  });
}

//注册
export function registerAPI(data) {
  return apiV1.request({
    method: "POST",
    url: "/register",
    data,
  });
}

//登陆
export function loginAPI(data) {
  return apiV1.request({
    method: "POST",
    url: "/login",
    data,
  });
}

//修改密码
export function changePasswordAPI(data) {
  return apiV1.request({
    method: "POST",
    url: "/changepassword",
    data,
  });
}

//获取文章信息
export function getArticleAPI(data) {
  return apiV1.request({
    method: "POST",
    url: "/getarticle",
    data,
  });
}

//获取用户信息
export function getInfoAPI() {
  return apiV1.request({
    method: "GET",
    url: "/user/info",
  });
}

//退出登陆
export function logoutAPI() {
  return apiV1.request({
    method: "GET",
    url: "/user/logout",
  });
}

//获取保存文章
export function getSaveArticleAPI() {
  return apiV1.request({
    method: "get",
    url: "/user/getsavearticle",
  });
}

//保存文章
export function saveArticleAPI(data) {
  return apiV1.request({
    method: "POST",
    url: "/user/savearticle",
    data,
  });
}
//上传临时图片
export function imgUploadRedisAPI(data) {
  return apiV1.request({
    method: "POST",
    url: "/user/imgupload",
    data,
  });
}

//提交文章审核
export function subreviewarticleAPI(data) {
  return apiV1.request({
    method: "POST",
    url: "/user/subreviewarticle",
    data,
  });
}

//获取用户个人信息
export function getUserInfoAPI() {
  return apiV1.request({
    method: "GET",
    url: "/user/getuserinfo",
  });
}

//设置用户个人信息
export function setUserInfoAPI(data) {
  return apiV1.request({
    method: "POST",
    url: "/user/setuserinfo",
    data,
  });
}
