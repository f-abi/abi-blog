<template>
  <div class="register">
    <AnimationOne />
    <div class="register-content">
      <div class="register-title">
        <span class="register-title-text"
          ><span><span class="mobile-line">——</span>———————————</span>
          注册
          <span><span class="mobile-line">——</span>———————————</span></span
        >
      </div>
      <div class="register-input">
        <span>用户名:</span>
        <input
          type="text"
          placeholder="支持中英文，不超过6个字符。"
          :class="{
            'register-input-error-border': InputError.userNameETisp != '',
          }"
          v-model="registerForm.username"
          @blur="checkUserName"
        />
        <div
          class="register-input-tips"
          :class="{ 'register-input-error': InputError.userNameETisp != '' }"
        >
          * {{ InputError.userNameETisp }}
        </div>
        <div class="register-input-icon">
          <AbiIcon>&#xe60e;</AbiIcon>
        </div>
        <div
          class="register-input-reset"
          :class="{ 'register-input-error': InputError.userNameETisp != '' }"
          @click="reset(1)"
        >
          <AbiIcon>&#xe6da;</AbiIcon>
        </div>
      </div>
      <div class="register-input">
        <span>邮箱:</span>
        <input
          type="email"
          placeholder="输入注册邮箱，这样才能接收验证码。"
          :class="{
            'register-input-error-border': InputError.emailETisp != '',
          }"
          v-model="registerForm.email"
          @blur="checkEmail"
        />
        <div
          class="register-input-tips"
          :class="{ 'register-input-error': InputError.emailETisp != '' }"
        >
          * {{ InputError.emailETisp }}
        </div>
        <div class="register-input-icon">
          <AbiIcon>&#xe63e;</AbiIcon>
        </div>
        <div
          class="register-input-reset"
          :class="{ 'register-input-error': InputError.emailETisp != '' }"
          @click="reset(2)"
        >
          <AbiIcon>&#xe6da;</AbiIcon>
        </div>
      </div>
      <div class="register-input">
        <span>密码:</span>
        <input
          type="password"
          placeholder="输入大于6位的密码。"
          :class="{
            'register-input-error-border': InputError.passwordETisp != '',
          }"
          v-model="registerForm.password"
          @blur="checkPassword"
        />
        <div
          class="register-input-tips"
          :class="{ 'register-input-error': InputError.passwordETisp != '' }"
        >
          * {{ InputError.passwordETisp }}
        </div>
        <div class="register-input-icon">
          <AbiIcon>&#xe762;</AbiIcon>
        </div>
        <div
          class="register-input-reset"
          :class="{ 'register-input-error': InputError.passwordETisp != '' }"
          @click="reset(3)"
        >
          <AbiIcon>&#xe6da;</AbiIcon>
        </div>
      </div>
      <div class="register-input">
        <span>确认密码:</span>
        <input
          type="password"
          placeholder="重复输入密码，以确认是否正确。"
          :class="{
            'register-input-error-border': InputError.passwordsETisp != '',
          }"
          v-model="registerForm.passwords"
          @blur="checkPasswordS"
        />
        <div
          class="register-input-tips"
          :class="{ 'register-input-error': InputError.passwordsETisp != '' }"
        >
          * {{ InputError.passwordsETisp }}
        </div>
        <div class="register-input-icon">
          <AbiIcon>&#xe613;</AbiIcon>
        </div>
        <div
          class="register-input-reset"
          :class="{ 'register-input-error': InputError.passwordsETisp != '' }"
          @click="reset(4)"
        >
          <AbiIcon>&#xe6da;</AbiIcon>
        </div>
      </div>
      <div class="captcha">
        <span>验证码:</span>
        <input
          type="text"
          placeholder="6位数字验证码"
          :class="{ 'register-input-error-border': InputError.codeETisp != '' }"
          v-model="registerForm.code"
          @blur="checkCode"
        />
        <div
          class="register-input-tips"
          :class="{ 'register-input-error': InputError.codeETisp != '' }"
        >
          * {{ InputError.codeETisp }}
        </div>
        <div class="register-input-icon">
          <AbiIcon>&#xe68a;</AbiIcon>
        </div>
        <div
          class="register-input-reset"
          :class="{ 'register-input-error': InputError.codeETisp != '' }"
          @click="reset(5)"
        >
          <AbiIcon>&#xe6da;</AbiIcon>
        </div>
        <div class="send-captcha" @click="sendCaptcha">{{ captcha.tisp }}</div>
        <div class="captcha-message">
          {{ captcha.message }}
        </div>
      </div>
      <div class="register-bottom">
        <div class="register-confirm" @click="regRequest">
          注册
        </div>
        <div class="skip-login" @click="gotoRouter('login')">
          已有账号，直接登录>
        </div>
        <div class="register-message">
          {{ regMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import AnimationOne from "@/components/animation/AnimationOne.vue";
import { useRouter } from "vue-router";
import { checkEmailAPI, sendCaptchaAPI, registerAPI } from "@/http/v1/apiV1";
import { useStore } from "vuex";
export default {
  name: "Register",
  components: {
    AnimationOne,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    if (store.state.isAuth) {
      router.go(-1);
    }
    let InputError = reactive({
      userNameETisp: "",
      emailETisp: "",
      passwordETisp: "",
      passwordsETisp: "",
      codeETisp: "",
    });
    let registerForm = reactive({
      username: "",
      email: "",
      password: "",
      passwords: "",
      code: "",
    });
    let captcha = reactive({
      tisp: "点击获取验证码",
      time: 1,
      message: "",
    });
    let regMessage = ref("");
    const checkUserName = () => {
      if (!registerForm.username) {
        return (InputError.userNameETisp = "用户名不能为空!");
      }
      if (
        registerForm.username.length < 2 ||
        registerForm.username.length > 6
      ) {
        return (InputError.userNameETisp = "用户名仅支持2-6字符!");
      }
      return (InputError.userNameETisp = "");
    };
    const checkEmail = () => {
      let check = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!registerForm.email) {
        return (InputError.emailETisp = "邮箱不能为空!");
      }
      if (!check.test(registerForm.email)) {
        return (InputError.emailETisp = "邮箱格式不正确!");
      }
      checkEmailAPI({
        email: registerForm.email,
      })
        .then((res) => {
          return (InputError.emailETisp = "");
        })
        .catch((err) => {
          return (InputError.emailETisp = "邮箱已经被注册!");
        });
    };
    const checkPassword = () => {
      if (!registerForm.password) {
        return (InputError.passwordETisp = "密码不能为空!");
      }
      if (registerForm.password.length < 6) {
        return (InputError.passwordETisp = "密码不能小于6位!");
      }
      if (registerForm.passwords != "") {
        checkPasswordS();
      }
      return (InputError.passwordETisp = "");
    };
    const checkPasswordS = () => {
      if (!registerForm.passwords) {
        return (InputError.passwordsETisp =
          "为保证密码正确,二次确认密码不能为空!");
      }
      if (registerForm.password != registerForm.passwords) {
        return (InputError.passwordsETisp = "两次密码不一致!");
      }
      return (InputError.passwordsETisp = "");
    };
    const checkCode = () => {
      if (!registerForm.code) {
        return (InputError.codeETisp = "验证码不能为空!");
      }
      if (registerForm.code.length != 6) {
        return (InputError.codeETisp = "验证码只能是6位数字!");
      }
      if (isNaN(registerForm.code)) {
        return (InputError.codeETisp = "验证码只能是数字!");
      }
      return (InputError.codeETisp = "");
    };
    const reset = (value) => {
      if (value === 1) {
        InputError.userNameETisp = "";
        registerForm.username = "";
      }
      if (value === 2) {
        InputError.emailETisp = "";
        registerForm.email = "";
      }
      if (value === 3) {
        InputError.passwordETisp = "";
        registerForm.password = "";
      }
      if (value === 4) {
        InputError.passwordsETisp = "";
        registerForm.passwords = "";
      }
      if (value === 5) {
        InputError.codeETisp = "";
        registerForm.code = "";
      }
    };
    const sendCaptcha = () => {
      let check = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!registerForm.email) {
        return (InputError.emailETisp = "邮箱不能为空!");
      }
      if (!check.test(registerForm.email)) {
        return (InputError.emailETisp = "邮箱格式不正确!");
      }
      if (InputError.emailETisp === "") {
        if (captcha.time === 1) {
          store.commit("openSubmitload", "发送中,请稍后...");
          captcha.message = "发送中,请稍等。";
          checkEmailAPI({
            email: registerForm.email,
          })
            .then((res) => {
              sendCaptchaAPI({
                email: registerForm.email,
              })
                .then((res) => {
                  store.commit("cancelSubmitload");
                  captcha.message = "验证码已发出,10分钟内有效。";
                  captcha.time = 60;
                  captcha.tisp = "60秒后重新获取验证码";
                  let countDown = setInterval(() => {
                    if (captcha.time != 1) {
                      captcha.time--;
                      captcha.tisp = captcha.time + "秒后重新获取验证码";
                    } else {
                      clearInterval(countDown);
                      captcha.tisp = "点击获取验证码";
                    }
                  }, 1000);
                })
                .catch((err) => {
                  store.commit("cancelSubmitload");
                  if (err.code === -3) {
                    captcha.message = "该邮箱今日发送过多验证码。";
                  } else {
                    captcha.message = "验证码发送失败,请重试。";
                  }
                });
            })
            .catch((err) => {
              store.commit("cancelSubmitload");
            });
        }
      }
    };
    const regRequest = () => {
      checkUserName();
      checkEmail();
      checkPassword();
      checkPasswordS();
      checkCode();
      if (
        InputError.userNameETisp === "" &&
        InputError.emailETisp === "" &&
        InputError.passwordETisp === "" &&
        InputError.passwordsETisp === "" &&
        InputError.codeETisp === ""
      ) {
        store.commit("openSubmitload", "注册中,请稍后...");
        registerAPI({
          user_name: registerForm.username,
          user_email: registerForm.email,
          password: registerForm.password,
          code: registerForm.code,
        })
          .then((res) => {
            store.commit("openSubmitload", "注册成功!登陆中...");
            store.dispatch("logined", res.data.access_token);
            router.go(-1);
            store.commit("cancelSubmitload");
          })
          .catch((err) => {
            store.commit("cancelSubmitload");
            if (err.code === -4) {
              return (regMessage.value =
                "注册失败，验证码已经过期或失效，请重新获取验证码!");
            }
            if (err.code === -5) {
              return (regMessage.value =
                "注册失败，验证码错误，请检查或重新获取验证码!");
            }
            return (regMessage.value = `注册失败，${err.msg}。`);
          });
      }
    };
    const gotoRouter = (name) => {
      return router.push(`/${name}`);
    };
    return {
      InputError,
      registerForm,
      captcha,
      regMessage,
      checkUserName,
      checkEmail,
      checkPassword,
      checkPasswordS,
      checkCode,
      sendCaptcha,
      reset,
      regRequest,
      gotoRouter,
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
  .register-content {
    width: 800px;
    height: 500px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: $themecolor;
    box-shadow: 0px 0px 10px #000;
    border-radius: 20px;

    .register-title {
      padding: 20px 0 20px 0;

      .register-title-text {
        color: $subfontcolorOne;
        font-size: 26px;

        span {
          color: $subcolorOne;
        }
      }
    }

    .register-input {
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

      .register-input-tips {
        display: none;
        font-size: 14px;
        position: absolute;
        padding-top: 8px;
        left: 190px;
        color: pink;
      }

      .register-input-icon {
        position: relative;

        i {
          position: absolute;
          color: $subfontcolorOne;
          font-size: 20px;
          left: 198px;
          bottom: 8px;
        }
      }

      .register-input-reset {
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

    .captcha {
      padding: 15px 0px;

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
        padding-left: 35px;
        padding-right: 35px;
        position: absolute;
        left: 188px;
        color: $subfontcolorOne;
        width: 160px;
        height: 35px;
        border: 2px solid $subcolorTwo;
        border-radius: 10px;
        background-color: transparent;
        box-shadow: 0px 0px 10px #000;

        &::placeholder {
          color: rgb(150, 150, 150);
        }
      }

      .register-input-icon {
        i {
          padding-top: 10px;
          position: absolute;
          color: $subfontcolorOne;
          font-size: 20px;
          left: 198px;
        }
      }

      .register-input-reset {
        display: none;

        i {
          cursor: pointer;
          padding-top: 10px;
          position: absolute;
          color: $subfontcolorOne;
          font-size: 20px;
          left: 390px;
        }
      }

      .send-captcha {
        cursor: pointer;
        line-height: 35px;
        font-size: 16px;
        text-align: center;
        position: absolute;
        left: 428px;
        color: $subfontcolorOne;
        width: 180px;
        height: 35px;
        border: 2px solid $subcolorTwo;
        border-radius: 10px;
        background-color: transparent;
        box-shadow: 0px 0px 10px #000;
      }

      .captcha-message {
        position: absolute;
        color: $subfontcolorOne;
        font-size: 14px;
        right: 180px;
        top: 403px;
      }

      .register-input-tips {
        display: none;
        position: absolute;
        color: pink;
        font-size: 14px;
        left: 190px;
        top: 403px;
      }
    }

    .register-bottom {
      padding: 15px 0;
      text-align: center;

      .register-confirm {
        cursor: pointer;
        line-height: 32px;
        font-size: 18px;
        text-align: center;
        position: absolute;
        top: 425px;
        left: 188px;
        color: $subfontcolorOne;
        width: 420px;
        height: 35px;
        border: 2px solid $subcolorTwo;
        border-radius: 10px;
        background-color: transparent;
        box-shadow: 0px 0px 10px #000;
      }

      .skip-login {
        cursor: pointer;
        position: absolute;
        top: 470px;
        left: 478px;
        color: $subfontcolorOne;
        font-size: 14px;
      }

      .register-message {
        position: absolute;
        top: 470px;
        left: 190px;
        color: $subfontcolorOne;
        font-size: 14px;
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .register-content {
    width: 370px;
    height: 470px;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: $themecolor;
    box-shadow: 0px 0px 10px #000;
    border-radius: 20px;

    .register-title {
      padding: 20px 0 0 0;
      text-align: center;

      .register-title-text {
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

    .register-input {
      padding: 25px 0 0 75px;

      span {
        text-align: end;
        padding-top: 12px;
        font-size: 16px;
        width: 100px;
        position: absolute;
        right: 300px;
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
          font-size: 12px;
        }
      }

      .register-input-tips {
        display: none;
        font-size: 12px;
        position: absolute;
        padding-top: 6px;
        left: 80px;
        color: pink;
      }

      .register-input-icon {
        position: relative;

        i {
          position: absolute;
          color: $subfontcolorOne;
          font-size: 20px;
          left: 10px;
          bottom: 8px;
        }
      }

      .register-input-reset {
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

    .captcha {
      padding: 25px 0px;

      span {
        text-align: end;
        padding-top: 12px;
        font-size: 16px;
        width: 100px;
        position: absolute;
        right: 300px;
        color: $subfontcolorOne;
      }

      input {
        font-size: 16px;
        padding-left: 35px;
        padding-right: 35px;
        position: absolute;
        left: 75px;
        color: $subfontcolorOne;
        width: 65px;
        height: 35px;
        border: 2px solid $subcolorTwo;
        border-radius: 10px;
        background-color: transparent;
        box-shadow: 0px 0px 10px #000;

        &::placeholder {
          color: rgb(150, 150, 150);
          font-size: 12px;
        }
      }

      .register-input-icon {
        i {
          padding-top: 10px;
          position: absolute;
          color: $subfontcolorOne;
          font-size: 20px;
          left: 85px;
        }
      }

      .register-input-reset {
        display: none;

        i {
          cursor: pointer;
          padding-top: 10px;
          position: absolute;
          color: $subfontcolorOne;
          font-size: 20px;
          left: 185px;
        }
      }

      .send-captcha {
        cursor: pointer;
        line-height: 35px;
        font-size: 12px;
        text-align: center;
        position: absolute;
        left: 220px;
        color: $subfontcolorOne;
        width: 140px;
        height: 35px;
        border: 2px solid $subcolorTwo;
        border-radius: 10px;
        background-color: transparent;
        box-shadow: 0px 0px 10px #000;
      }

      .captcha-message {
        position: absolute;
        color: $subfontcolorOne;
        font-size: 12px;
        right: 0px;
        top: 370px;
      }

      .register-input-tips {
        display: none;
        position: absolute;
        color: pink;
        font-size: 12px;
        left: 80px;
        top: 370px;
      }
    }

    .register-bottom {
      padding: 15px 0;
      text-align: center;

      .register-confirm {
        cursor: pointer;
        line-height: 32px;
        font-size: 18px;
        text-align: center;
        position: absolute;
        top: 390px;
        left: 35px;
        color: $subfontcolorOne;
        width: 300px;
        height: 35px;
        border: 2px solid $subcolorTwo;
        border-radius: 10px;
        background-color: transparent;
        box-shadow: 0px 0px 10px #000;
      }

      .skip-login {
        cursor: pointer;
        position: absolute;
        top: 440px;
        left: 200px;
        color: $subfontcolorOne;
        font-size: 14px;
      }

      .register-message {
        position: absolute;
        top: 440px;
        left: 40px;
        color: $subfontcolorOne;
        font-size: 14px;
      }
    }
  }
}

.register-input-error {
  display: block !important;
}

.register-input-error-border {
  border-color: pink !important;
}
</style>
