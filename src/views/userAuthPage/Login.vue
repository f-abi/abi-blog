<template>
  <div class="login">
    <AnimationOne />
    <div class="login-content">
      <div class="login-title">
        <span class="login-title-text"
          ><span><span class="mobile-line">——</span>———————————</span>
          登陆
          <span><span class="mobile-line">——</span>———————————</span></span
        >
      </div>
      <div class="login-input">
        <span>邮箱:</span>
        <input
          type="text"
          placeholder="注册邮箱"
          :class="{
            'login-input-error-border': loginForm.userEmailETisp != '',
          }"
          v-model="loginForm.userEmail"
          @blur="checkEmail"
        />
        <div
          class="login-input-tips"
          :class="{ 'login-input-error': loginForm.userEmailETisp != '' }"
        >
          * {{ loginForm.userEmailETisp }}
        </div>
        <div class="login-input-icon">
          <AbiIcon>&#xe63e;</AbiIcon>
        </div>
        <div
          class="login-input-reset"
          :class="{ 'login-input-error': loginForm.userEmailETisp != '' }"
          @click="reset(1)"
        >
          <AbiIcon>&#xe6da;</AbiIcon>
        </div>
      </div>
      <div class="login-input">
        <span>密码:</span>
        <input
          type="password"
          placeholder="登陆密码"
          :class="{
            'login-input-error-border': loginForm.passwordETisp != '',
          }"
          v-model="loginForm.password"
          @blur="checkPassword"
        />
        <div
          class="login-input-tips"
          :class="{ 'login-input-error': loginForm.passwordETisp != '' }"
        >
          * {{ loginForm.passwordETisp }}
        </div>
        <div class="login-input-icon">
          <AbiIcon>&#xe762;</AbiIcon>
        </div>
        <div
          class="login-input-reset"
          :class="{ 'login-input-error': loginForm.passwordETisp != '' }"
          @click="reset(2)"
        >
          <AbiIcon>&#xe6da;</AbiIcon>
        </div>
      </div>
      <div class="login-submit">
        <AbiSilder
          :resFun="submitLogin"
          :initText="'向右滑动验证登陆'"
          :resText="'验证成功，等待登陆...'"
          ref="silder"
        ></AbiSilder>
      </div>
      <div class="skip-forgot-password">
        忘记密码?
      </div>
      <div class="skip-register" @click="gotoRouter('register')">
        还没有账号，点此注册>
      </div>
    </div>
  </div>
</template>

<script>
import AnimationOne from "@/components/animation/AnimationOne.vue";
import AbiSilder from "@/components/validator/AbiSilder.vue";
import { useRouter } from "vue-router";
import { checkEmailAPI, loginAPI } from "@/http/v1/apiV1";
import { ref, reactive } from "vue";
import { useStore } from "vuex";
export default {
  name: "Login",
  components: {
    AnimationOne,
    AbiSilder,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    if (store.state.isAuth) {
      router.go(-1);
    }
    let loginForm = reactive({
      userEmail: "",
      password: "",
      userEmailETisp: "",
      passwordETisp: "",
    });
    const silder = ref(null);
    const checkEmail = () => {
      let check = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!loginForm.userEmail) {
        return (loginForm.userEmailETisp = "邮箱不能为空!");
      }
      if (!check.test(loginForm.userEmail)) {
        return (loginForm.userEmailETisp = "邮箱格式不正确!");
      }
      checkEmailAPI({
        email: loginForm.userEmail,
      })
        .then((res) => {
          return (loginForm.userEmailETisp = "邮箱还未注册,无法登陆,请先注册");
        })
        .catch((err) => {
          return (loginForm.userEmailETisp = "");
        });
    };
    const checkPassword = () => {
      if (!loginForm.password) {
        return (loginForm.passwordETisp = "密码不能为空!");
      }
      if (loginForm.password.length < 6) {
        return (loginForm.passwordETisp = "密码不能小于6位!");
      }
      return (loginForm.passwordETisp = "");
    };
    const reset = (value) => {
      if (value === 1) {
        loginForm.userEmail = "";
        loginForm.userEmailETisp = "";
      }
      if (value === 2) {
        loginForm.password = "";
        loginForm.passwordETisp = "";
      }
    };
    const submitLogin = () => {
      checkEmail();
      checkPassword();
      if (loginForm.userEmailETisp === "" && loginForm.passwordETisp === "") {
        store.commit("openSubmitload", "登陆中,请稍后...");

        loginAPI({
          user_email: loginForm.userEmail,
          password: loginForm.password,
        })
          .then((res) => {
            store.commit("cancelSubmitload");
            store.dispatch("logined", res.data.access_token);
            router.go(-1);
          })
          .catch((err) => {
            store.commit("cancelSubmitload");
            if (err.code === -2) {
              loginForm.userEmailETisp = "登陆失败，邮箱还未注册！";
              return silder.value.reset();
            }
            if (err.code === -6) {
              loginForm.passwordETisp = "登陆失败，密码错误!";
              return silder.value.reset();
            }
            loginForm.passwordETisp = "登陆失败，请联系管理员";
            return silder.value.reset();
          });
      } else {
        return silder.value.reset();
      }
    };
    const gotoRouter = (name) => {
      return router.push(`/${name}`);
    };

    return {
      loginForm,
      silder,
      checkEmail,
      checkPassword,
      reset,
      submitLogin,
      gotoRouter,
      store,
    };
  },
};
</script>

<style lang="scss" scoped>
.animation {
  width: 100vw !important;
  height: 100vh !important;
}

@media screen and (min-width: 900px) {
  .login-content {
    width: 800px;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: $themecolor;
    box-shadow: 0px 0px 10px #000;
    border-radius: 20px;

    .login-title {
      padding: 20px 0 20px 0;

      .login-title-text {
        color: $subfontcolorOne;
        font-size: 26px;

        span {
          color: $subcolorOne;
        }
      }
    }

    .login-input {
      padding: 15px 0;
      text-align: center;

      span {
        text-align: end;
        padding-top: 12px;
        font-size: 18px;
        width: 100px;
        position: absolute;
        left: 80px;
        color: $subfontcolorOne;
      }

      input {
        font-size: 16px;
        color: $subfontcolorOne;
        padding-left: 35px;
        padding-right: 35px;

        width: 350px;
        height: 35px;
        border: 2px solid $subcolorTwo;
        border-radius: 10px;
        background-color: transparent;
        box-shadow: 0px 0px 10px #000;

        &::placeholder {
          color: rgb(150, 150, 150);
        }
      }

      .login-input-tips {
        display: none;
        font-size: 14px;
        position: absolute;
        padding-top: 8px;
        left: 190px;
        color: pink;
      }

      .login-input-icon {
        position: relative;

        i {
          position: absolute;
          color: $subfontcolorOne;
          font-size: 20px;
          left: 198px;
          bottom: 8px;
        }
      }

      .login-input-reset {
        position: relative;
        display: none;

        i {
          cursor: pointer;
          position: absolute;
          color: $subfontcolorOne;
          font-size: 20px;
          left: 580px;
          bottom: 10px;
        }
      }
    }

    .login-submit {
      padding: 15px 0 0 190px;
      text-align: center;
      width: 420px;
    }

    .skip-forgot-password {
      font-size: 14px;
      cursor: pointer;
      color: $subfontcolorOne;
      position: absolute;
      top: 270px;
      left: 190px;
    }

    .skip-register {
      font-size: 14px;
      cursor: pointer;
      color: $subfontcolorOne;
      position: absolute;
      top: 270px;
      right: 190px;
    }
  }
}

@media screen and (max-width: 900px) {
  .login-content {
    width: 370px;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: $themecolor;
    box-shadow: 0px 0px 10px #000;
    border-radius: 20px;

    .login-title {
      padding: 20px 0 20px 0;
      text-align: center;

      .login-title-text {
        color: $subfontcolorOne;
        font-size: 22px;

        span {
          color: $subcolorOne;
          font-size: 12px;

          .mobile-line {
            display: none;
          }
        }
      }
    }

    .login-input {
      padding: 15px 0 15px 65px;

      span {
        text-align: end;
        padding-top: 12px;
        font-size: 18px;
        width: 100px;
        position: absolute;
        right: 310px;
        color: $subfontcolorOne;
      }

      input {
        font-size: 16px;
        color: $subfontcolorOne;
        padding-left: 35px;
        padding-right: 35px;
        width: 215px;
        height: 35px;
        border: 2px solid $subcolorTwo;
        border-radius: 10px;
        background-color: transparent;
        box-shadow: 0px 0px 10px #000;

        &::placeholder {
          color: rgb(150, 150, 150);
          font-size: 14px;
        }
      }

      .login-input-tips {
        display: none;
        font-size: 14px;
        position: absolute;
        padding-top: 8px;
        left: 70px;
        color: pink;
      }

      .login-input-icon {
        position: relative;

        i {
          position: absolute;
          color: $subfontcolorOne;
          font-size: 20px;
          right: 275px;
          bottom: 8px;
        }
      }

      .login-input-reset {
        position: relative;
        display: none;

        i {
          cursor: pointer;
          position: absolute;
          color: $subfontcolorOne;
          font-size: 20px;
          left: 260px;
          bottom: 10px;
        }
      }
    }

    .login-submit {
      padding: 15px 0 0 50px;
      text-align: center;
      width: 285px;
    }

    .skip-forgot-password {
      font-size: 14px;
      cursor: pointer;
      color: $subfontcolorOne;
      position: absolute;
      top: 270px;
      left: 55px;
    }

    .skip-register {
      font-size: 14px;
      cursor: pointer;
      color: $subfontcolorOne;
      position: absolute;
      top: 270px;
      left: 185px;
    }
  }
}

.login-input-error {
  display: block !important;
}

.login-input-error-border {
  border-color: pink !important;
}
</style>
