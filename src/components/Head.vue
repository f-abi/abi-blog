<template>
  <div class="head">
    <div class="nav">
      <div class="logo" @click="gotoRouter('')">Abiblog</div>
      <ul class="nav-menu" :class="{ open: isActive }">
        <li class="nav-article">
          <AbiIcon>&#xe615;</AbiIcon>
          文章
        </li>
        <li class="nav-label">
          <AbiIcon>&#xe617;</AbiIcon>
          标签
        </li>
        <li class="nav-filetime">
          <AbiIcon>&#xe605;</AbiIcon>
          归档
        </li>
        <li class="nav-board">
          <AbiIcon>&#xe630;</AbiIcon>
          留言板
        </li>
        <li class="nav-about">
          <AbiIcon>&#xe631;</AbiIcon>
          关于
        </li>
        <li class="nav-search" @click="changeSearchActive">
          <AbiIcon>&#xe602;</AbiIcon>
          搜索
        </li>
        <li class="nav-users">
          <span
            class="user-img"
            @click="gotoRouter('management/personal_center/user_info')"
            ><img
              :src="
                store.state.userProfile
                  ? store.state.userProfile
                  : require('@/assets/img/defaultProfile.jpg')
              "
              alt=""
          /></span>
          <span
            class="users-name"
            @click="gotoRouter('management/personal_center/user_info')"
          >
            {{
              store.state.userName ? " " + store.state.userName : " 未登录"
            }}</span
          >
          <div class="tips" :class="{ isNoShow: store.state.isAuth }">
            <div class="tips-title">登陆后你可以:</div>
            <hr />
            <div class="tips-text">
              <AbiIcon>&#xe615;</AbiIcon>
              写文章
            </div>
            <div class="tips-text">
              <AbiIcon>&#xe617;</AbiIcon>
              创建新标签
            </div>
            <div class="tips-text">
              <AbiIcon>&#xe630;</AbiIcon>
              留言
            </div>
            <hr />
            <div class="tips-reg" @click="gotoRouter('register')">
              <AbiIcon>&#xe6d6;</AbiIcon>
              注册
            </div>
            <div class="tips-login" @click="gotoRouter('login')">
              <AbiIcon>&#xe607;</AbiIcon>
              登陆
            </div>
          </div>
          <div class="user-tips" :class="{ isNoShow: !store.state.isAuth }">
            <div class="user-tips-useremail">
              Email:{{ store.state.userEmail }}
            </div>
            <ul class="user-tips-relationship">
              <li>
                <span>关注</span>
                <h4>{{ store.state.followNum }}</h4>
              </li>
              <li>
                <span>粉丝</span>
                <h4>{{ store.state.fansNum }}</h4>
              </li>
              <li>
                <span>文章</span>
                <h4>{{ store.state.articleNum }}</h4>
              </li>
            </ul>
            <ul class="user-tips-action">
              <li><AbiIcon>&#xe66c;</AbiIcon> 个人中心</li>
              <li><AbiIcon>&#xe635;</AbiIcon> 文章管理</li>
              <li><AbiIcon>&#xe60f;</AbiIcon> 写文章</li>
              <li><AbiIcon>&#xe67a;</AbiIcon> 收藏</li>
              <li>
                <AbiIcon>&#xe667;</AbiIcon> 通知
                <div
                  class="notice-two"
                  :class="{
                    isShow: store.state.noticeNum != 0 && store.state.isAuth,
                  }"
                >
                  {{ store.state.noticeNum > 99 ? 99 : store.state.noticeNum }}
                </div>
              </li>
              <li @click="logout"><AbiIcon>&#xe616;</AbiIcon> 退出</li>
            </ul>
          </div>
          <div
            class="notice"
            :class="{
              isShow: store.state.noticeNum != 0 && store.state.isAuth,
            }"
          >
            {{ store.state.noticeNum > 99 ? 99 : store.state.noticeNum }}
          </div>
        </li>
      </ul>
      <div class="burger" :class="{ active: isActive }" @click="changeActive">
        <div class="one-line"></div>
        <div class="two-line"></div>
        <div class="three-line"></div>
      </div>
    </div>
    <div class="search" :class="{ searchActive: isSearch }">
      <div class="search-input">
        <span class="search-tips">想找点什么呢? </span>
        <hr class="search-hr" />
        <input type="text" />
        <div class="search-click">
          <AbiIcon>&#xe602;</AbiIcon>
        </div>
        <div class="search-cancel" @click="changeSearchActive">
          <AbiIcon>&#xe604;</AbiIcon>
        </div>
      </div>
    </div>
    <Submitload />
    <Tips />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { isCookie, getCookie } from "@/utility/cookie";
import Tips from "@/components/loading/Tips";
import Submitload from "@/components/loading/Submitload";
export default {
  name: "Head",
  components: {
    Submitload,
    Tips,
  },
  setup() {
    const store = useStore();
    let {
      isActive,
      changeActive,
      isSearch,
      changeSearchActive,
    } = changeClass();
    let { gotoRouter } = jumpRouter();
    //退出
    const logout = () => {
      store.dispatch("logout");
    };
    return {
      isActive,
      changeActive,
      isSearch,
      changeSearchActive,
      gotoRouter,
      store,
      logout,
    };
  },
};
//修改class绑定
function changeClass() {
  let isActive = ref(false);
  let isSearch = ref(false);
  const changeActive = () => {
    isActive.value = !isActive.value;
  };
  const changeSearchActive = () => {
    isSearch.value = !isSearch.value;
  };
  return {
    isActive,
    changeActive,
    isSearch,
    changeSearchActive,
  };
}
//跳转
function jumpRouter() {
  const router = useRouter();
  const gotoRouter = (name) => {
    return router.push(`/${name}`);
  };
  return {
    gotoRouter,
  };
}
</script>

<style lang="scss">
.head {
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 15vw;
    height: 60px;
    background-color: $themecolor;
    box-shadow: 0px 0px 10px #000;
    z-index: 99;

    .logo {
      cursor: pointer;
      font-family: "Monaco", "PingFang SC", "Microsoft Yahei", sans-serif;
      font-size: 35px;
      font-weight: 500;
      color: $fontcolor;
      flex: 0.3;
    }

    .nav-menu {
      flex: 1;
      display: flex;

      li {
        cursor: pointer;
        list-style: none;
        color: $fontcolor;
        font-weight: 400;
      }

      // 消息红点
      .notice {
        display: none;
        line-height: 14px;
        text-align: center;
        top: 8px;
        left: 32px;
        font-size: 12px;
        position: absolute;
        width: 15px;
        height: 15px;
        background-color: rgb(255, 97, 97);
        border-radius: 20px;
      }

      .notice-two {
        display: none;
        line-height: 14px;
        text-align: center;
        top: 155px;
        left: 70px;
        font-size: 12px;
        position: absolute;
        width: 15px;
        height: 15px;
        background-color: rgb(255, 97, 97);
        border-radius: 20px;
      }
    }

    .burger {
      div {
        width: 25px;
        height: 3px;
        background-color: $fontcolor;
        margin: 4px;
      }
    }
  }

  //搜索框
  .search {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(65, 64, 64, 0.507);
    z-index: 100;
  }
}

.user-tips {
  display: none;
}
.users-name {
  font-family: "Monaco";
}
@media screen and (min-width: 900px) {
  .nav-menu {
    justify-content: space-between;
  }

  .burger {
    div {
      display: none;
    }
  }

  .nav-users:hover {
    .tips {
      box-shadow: 0px 0px 10px #000;
      display: block;
      width: 120px;
      height: 230px;
      border: 2px solid $themecolor;
      position: absolute;
      top: 55px;
      left: -40px;
      border-radius: 10px;
      background-color: $themecolor;

      &::before {
        content: "";
        width: 0;
        height: 0;
        border: 5px solid;
        position: absolute;
        top: -12px;
        left: 55px;
        border-color: transparent transparent $themecolor;
      }

      .tips-title {
        padding: 10px 10px 0 10px;
      }

      .tips-text {
        padding: 8px;
      }

      .tips-reg,
      .tips-login {
        padding: 8px;

        &:hover {
          color: pink;
        }
      }
    }

    .user-tips {
      box-shadow: 0px 0px 10px #000;
      display: block;
      width: 210px;
      height: 320px;
      border: 2px solid $themecolor;
      position: absolute;
      top: 55px;
      left: -80px;
      border-radius: 10px;
      background-color: $themecolor;

      &::before {
        content: "";
        width: 0;
        height: 0;
        border: 5px solid;
        position: absolute;
        top: -12px;
        left: 95px;
        border-color: transparent transparent $themecolor;
      }

      .user-tips-useremail {
        font-size: 14px;
        padding-top: 14px;
        width: 210px;
        text-align: center;
      }

      .user-tips-relationship {
        position: absolute;
        top: 40px;
        border-top: 2px solid #ffffff;
        border-bottom: 2px solid #ffffff;

        li {
          text-align: center;
          width: 40px;
          padding: 10px 15px;
          float: left;
          font-size: 14px;

          &:hover {
            color: pink;
          }

          h4 {
            padding-top: 5px;
          }
        }
      }

      .user-tips-action {
        position: absolute;
        top: 100px;

        li {
          padding: 10px 10px;

          &:hover {
            color: pink;
          }
        }
      }
    }

    //
  }

  .nav-article,
  .nav-label,
  .nav-filetime,
  .nav-board,
  .nav-about,
  .nav-search {
    padding-top: 15px;

    &:hover {
      padding-top: 13px;
      color: pink !important;
    }
  }

  .search-input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    background-color: $themecolor;
    border-radius: 20px;
    width: 700px;
    height: 200px;
    margin: auto;
    box-shadow: 0px 0px 10px #000;

    .search-tips {
      font-size: 20px;
      position: absolute;
      top: 25px;
      left: 25px;
      color: $subfontcolorOne;
    }

    input {
      font-size: 18px;
      position: absolute;
      top: 120px;
      left: 20px;
      width: 600px;
      height: 40px;
      color: $fontcolor;
      text-align: center;
      border: 2px solid $subcolorTwo;
      border-radius: 10px 0px 0px 10px;
      background-color: $themecolor;
      background-color: transparent;
      box-shadow: 0px 0px 10px #000;
      color: $subfontcolorOne;
    }

    .search-click {
      position: absolute;
      top: 120px;
      left: 625px;
      color: $fontcolor;
      border: 2px solid $subcolorTwo;
      box-shadow: 0px 0px 10px #000;
      border-radius: 0px 10px 10px 0px;

      i {
        font-size: 40px;
        cursor: pointer;
        color: #d6d6d6;
      }
    }

    .search-hr {
      position: absolute;
      width: 700px;
      top: 60px;
      height: 2px;
      background-color: $subcolorOne;
      box-shadow: 0px 0px 10px #000;
      border: none;
    }

    .search-cancel {
      position: absolute;
      top: 25px;
      left: 645px;
      color: #d6d6d6;
      cursor: pointer;

      i {
        font-size: 22px;
      }
    }
  }
}

@media screen and (max-width: 899px) {
  .nav {
    padding: 0 5vw !important;

    .logo {
      flex: 1 !important;
    }
  }

  .nav-menu {
    position: fixed;
    top: 60px;
    right: 0;
    bottom: 0;
    width: 50vw;
    height: calc(100vh - 60px);
    background-color: $themecolor;
    flex-direction: column;
    align-items: center;
    transform: translateX(100%);
    transition: 0.4s ease-in-out;
    justify-content: flex-start;

    li {
      margin: 3vh;
    }
  }

  .search-input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    background-color: $themecolor;
    border-radius: 20px;
    width: 320px;
    height: 160px;
    margin: auto;
    box-shadow: 0px 0px 10px #000;

    .search-tips {
      font-size: 18px;
      position: absolute;
      top: 20px;
      left: 20px;
      color: $subfontcolorOne;
    }

    input {
      font-size: 18px;
      position: absolute;
      top: 90px;
      left: 20px;
      width: 230px;
      height: 40px;
      color: $fontcolor;
      text-align: center;
      border: 2px solid $subcolorTwo;
      border-radius: 10px 0px 0px 10px;
      background-color: $themecolor;
      background-color: transparent;
      box-shadow: 0px 0px 10px #000;
      color: $subfontcolorOne;
    }

    .search-click {
      position: absolute;
      top: 90px;
      left: 255px;
      color: $fontcolor;
      border: 2px solid $subcolorTwo;
      box-shadow: 0px 0px 10px #000;
      border-radius: 0px 10px 10px 0px;

      i {
        font-size: 40px;
        cursor: pointer;
        color: #d6d6d6;
      }
    }

    .search-hr {
      position: absolute;
      width: 320px;
      top: 50px;
      height: 2px;
      background-color: $subcolorOne;
      box-shadow: 0px 0px 10px #000;
      border: none;
    }

    .search-cancel {
      position: absolute;
      top: 20px;
      left: 275px;
      color: #d6d6d6;
      cursor: pointer;

      i {
        font-size: 20px;
      }
    }
  }
}

.active {
  div {
    transition: 0.3s ease-in-out 0.3s;
  }

  .one-line {
    transform: rotate(45deg) translate(4px, 6px);
  }

  .three-line {
    transform: rotate(-45deg) translate(4px, -6px);
  }

  .two-line {
    opacity: 0;
    transform: translateX(10px);
    transition: 0.3s ease-in-out;
  }
}

.open {
  transform: translateX(0);
}

.nav-users {
  position: relative;
  top: -10.5px;

  .user-img {
    img {
      position: relative;
      top: 12px;
      width: 40px;
      height: 40px;
      border-radius: 20px;
    }
  }

  .tips {
    display: none;
  }
}

.searchActive {
  display: block !important;
}

.isShow {
  display: block !important;
}

.isNoShow {
  display: none !important;
}
</style>
