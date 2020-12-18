import axios from "axios";
import store from "@/store";
import { getCookie, isCookie } from "@/utility/cookie.js";
const apiV1 = axios.create({
  baseURL: "http://192.168.1.5:8000/api/v1",
  timeout: 10000,
});
// 添加请求拦截器
apiV1.interceptors.request.use(
  function(config) {
    // // 在发送请求之前做些什么
    if (isCookie("u_t")) {
      config.headers.Authorization = "Bearer " + store.state.userToken;
    }
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
apiV1.interceptors.response.use(
  function(response) {
    if (response.headers.authorization) {
      store.dispatch("refreshToken", response.headers.authorization.slice(6));
    }
    if (response.data.code === 1) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data);
    }
  },
  function(error) {
    // // 对响应错误做点什么
    // alert("服务器网络错误!请稍后再试!");
    // switch (error.response.status) {
    //   // 如果响应中的 http code 为 401，那么则此用户可能 token 失效了之类的，我会触发 logout 方法，清除本地的数据并将用户重定向至登录页面
    //   case 401:
    //     return store.dispatch("logout");
    //   // 如果响应中的 http code 为 400，那么就弹出一条错误提示给用户
    //   case 400:
    //     return store.error({
    //       title: "错误!",
    //       message: error.response.data.message,
    //     });
    // }
    return Promise.reject(error);
  }
);
export { apiV1 };
