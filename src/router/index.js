import { createRouter, createWebHashHistory } from "vue-router";
import Index from "@/views/Index";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(
        /* webpackChunkName: "register" */ "../views/userAuthPage/Register.vue"
      ),
    beforeEnter: (to, from, next) => {
      if (!store.state.isAuth) next();
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/userAuthPage/Login.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.state.isAuth) next();
    },
  },
  {
    path: "/management/:option1/:option2",
    name: "Management",
    component: () =>
      import(
        /* webpackChunkName: "ManagementCenter" */ "../views/ArticleCenter/ManagementCenter.vue"
      ),
    beforeEnter: (to, from, next) =>
      store.state.isAuth ? next() : next("/login"),
  },
  {
    path: "/management/Newarticle",
    name: "Newarticle",
    component: () =>
      import(
        /* webpackChunkName: "NewArticle" */ "../views/ArticleCenter/NewArticle.vue"
      ),
    beforeEnter: (to, from, next) =>
      store.state.isAuth ? next() : next("/login"),
  },
  {
    path: "/article/:aid",
    name: "Article",
    component: () =>
      import(
        /* webpackChunkName: "test" */ "../views/ArticleCenter/Article.vue"
      ),
  },
  {
    path: "/test",
    name: "Test",
    component: () =>
      import(
        /* webpackChunkName: "test" */ "../components/imgupload/ImgUpload.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
