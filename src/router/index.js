import { createRouter, createWebHashHistory } from "vue-router";
import Index from "@/views/Index";

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(
        /* webpackChunkName: "register" */ "../views/userAuthPage/Register.vue"
      ),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/userAuthPage/Login.vue"),
  },
  {
    path: "/management/:option1/:option2",
    name: "Management",
    component: () =>
      import(
        /* webpackChunkName: "ManagementCenter" */ "../views/ArticleCenter/ManagementCenter.vue"
      ),
  },
  {
    path: "/management/Newarticle",
    name: "Newarticle",
    component: () =>
      import(
        /* webpackChunkName: "NewArticle" */ "../views/ArticleCenter/NewArticle.vue"
      ),
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
