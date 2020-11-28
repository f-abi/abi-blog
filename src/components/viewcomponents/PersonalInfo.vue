<template>
  <div class="personal-info">
    <div class="personal-info-option">
      <ul>
        <li :class="option == 'user_info' ? 'active' : ''"><AbiIcon>&#xe614;</AbiIcon> 个人信息</li>
        <li><AbiIcon>&#xe6cf;</AbiIcon> 我的关注</li>
        <li><AbiIcon>&#xf0300;</AbiIcon> 我的粉丝</li>
      </ul>
      <hr />
    </div>
    <div class="personal-info-option-content">
      <div class="personal-info-option-content-meinfo" v-if="option == 'user_info'">
        <div class="meinfo-email">
          <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邮箱:</label>
          <span>{{ userInfo.email }}</span>
        </div>
        <div class="meinfo-loginnum">
          <label>登陆次数:</label><span>{{ userInfo.loginNum == null ? "0" : userInfo.loginNum }}次</span>
        </div>
        <div class="meinfo-created">
          <label>注册时间:</label><span>{{ userInfo.regDate.slice(0, 10) }} {{ userInfo.regDate.slice(11, 19) }}</span>
        </div>
        <div class="meinfo-username">
          <label>&nbsp;&nbsp;&nbsp;用户名:</label>
          <span>{{ userInfo.name }}</span>
          <span
            @click="
              pageStatus.openChangeName = !pageStatus.openChangeName;
              pageStatus.ChangeName = userInfo.name;
            "
            ><AbiIcon>&#xe61f;</AbiIcon></span
          >
        </div>
        <div class="meinfo-portrait">
          <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;头像:</label>
          <div class="meinfo-portrait-img">
            <img :src="userInfo.portrait" alt="" @click="openClipPortrait" />
            <input type="file" name="" id="portraitImg" style="display: none" @change="portraitClip" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" />
          </div>
        </div>
        <div class="meinfo-identity">
          <label>用户身份:</label><span>{{ userInfo.identity == "GM" ? "管理用户" : "普通会员" }}</span>
        </div>
        <div class="meinfo-sub" @click="saveInfo"><AbiIcon>&#xe606;</AbiIcon> 更新信息</div>
        <div class="meinfo-personality">
          <h1><span>"Welcome</span><span>to"</span></h1>
          <h1><span>"abi</span><span>blog"</span></h1>
          <h1><span>"Please</span><span>set"</span></h1>
          <h1><span>"Yours</span><span>info"</span></h1>
        </div>
        <div class="meinfo-changename" v-show="pageStatus.openChangeName">
          <div class="meinfo-changename-content">
            <div class="meinfo-changename-content-tips">修改用户名</div>
            <hr />
            <div
              class="meinfo-changename-content-cancel"
              @click="
                pageStatus.openChangeName = !pageStatus.openChangeName;
                pageStatus.ChangeName = ``;
              "
            >
              <AbiIcon>&#xe604;</AbiIcon>
            </div>
            <div class="meinfo-changename-content-name">用户名: <input type="text" v-model="pageStatus.ChangeName" /></div>
            <div class="meinfo-changename-content-sub" @click="changeName">确定</div>
          </div>
        </div>
      </div>
    </div>
    <imgClip v-if="pageStatus.openClip" :baseSrc="pageStatus._portraitClip" :clipCancel="imgCan" :clipSubmit="imgSub" :aspectRatio="1" :tips="`请裁切图片作为头像!`" />
  </div>
</template>

<script>
import imgClip from "@/components/imgupload/imgClip";
import { useStore } from "vuex";
import { ref, reactive } from "vue";
import { getUserInfoAPI, setUserInfoAPI } from "@/http/v1/apiV1";
export default {
  name: "PersonalInfo",
  props: {
    option: {
      type: String,
    },
  },
  components: { imgClip },
  setup(props) {
    const store = useStore();
    const userInfo = reactive({
      email: "",
      loginNum: "",
      regDate: "",
      name: "",
      identity: "",
      portrait: "",
    });
    const pageStatus = reactive({
      openClip: false,
      _portraitClip: "",
      openChangeName: false,
      ChangeName: "",
    });
    getUserInfoAPI()
      .then((res) => {
        console.log(res);
        userInfo.email = res.data.userEmail;
        userInfo.loginNum = res.data.loginNum;
        userInfo.regDate = res.data.regDate;
        userInfo.name = res.data.userName;
        userInfo.identity = res.data.userIdentity;
        userInfo.portrait = res.data.userProfile;
      })
      .catch((err) => {});
    const changeName = () => {
      if (pageStatus.ChangeName != "" && pageStatus.ChangeName.length >= 2 && pageStatus.ChangeName.length <= 6) {
        pageStatus.openChangeName = !pageStatus.openChangeName;
        userInfo.name = pageStatus.ChangeName;
        pageStatus.ChangeName = ``;
      } else {
        store.commit("openTips", {
          icon: "&#xe614;",
          title: "错误",
          text: "用户名必须为2-6字符之间",
        });
      }
    };
    const saveInfo = () => {
      if (userInfo.name != store.state.userName || userInfo.portrait != store.state.userProfile) {
        setUserInfoAPI({
          user_name: userInfo.name,
          user_profile: userInfo.portrait,
        })
          .then((res) => {
            store.commit("openTips", {
              icon: "&#xe614;",
              title: "成功",
              text: "更新信息成功！",
            });
            store.dispatch("getInfo");
          })
          .catch((err) => {
            store.commit("openTips", {
              icon: "&#xe614;",
              title: "错误",
              text: `更新失败!${err.mes}`,
            });
            store.dispatch("getInfo");
          });
      } else {
        store.commit("openTips", {
          icon: "&#xe614;",
          title: "提示",
          text: `你还没有修改任何信息哦,无法更新`,
        });
      }
    };
    let { openClipPortrait, portraitClip, imgCan, imgSub } = portrait(store, userInfo, pageStatus);
    return {
      store,
      openClipPortrait,
      portraitClip,
      userInfo,
      pageStatus,
      imgCan,
      imgSub,
      changeName,
      saveInfo,
    };
  },
};
//上传头像处理
function portrait(store, userInfo, pageStatus) {
  //打开头像上传
  const openClipPortrait = () => {
    document.getElementById("portraitImg").click();
  };
  //选中图片开启裁剪
  const portraitClip = (e) => {
    let imgfile = e.target.files[0];
    // 判断是否支持FileReader
    let imgformat = imgfile.name.substr(imgfile.name.lastIndexOf(".") + 1).toLowerCase();
    if (!e || !window.FileReader)
      return store.commit("openTips", {
        icon: "&#xe614;",
        title: "错误",
        text: "您的浏览器不支持FileReader请更换浏览器!",
      });
    if (!(imgformat === "jpg" || imgformat === "png" || imgformat === "jpeg" || imgformat === "gif"))
      return store.commit("openTips", {
        icon: "&#xe614;",
        title: "错误",
        text: "图片仅支持['jpg','png','jpeg','gif']格式图片",
      });
    let reader = new FileReader();
    reader.readAsDataURL(imgfile);
    reader.onloadend = () => {
      pageStatus._portraitClip = reader.result;
      pageStatus.openClip = !pageStatus.openClip;
    };
  };
  const imgCan = () => {
    document.getElementById("portraitImg").value = "";
    pageStatus.openClip = !pageStatus.openClip;
  };
  const imgSub = (img) => {
    userInfo.portrait = img;
    document.getElementById("portraitImg").value = "";
    pageStatus.openClip = !pageStatus.openClip;
  };
  return {
    openClipPortrait,
    portraitClip,
    imgCan,
    imgSub,
  };
}
</script>

<style lang="scss">
@media screen and (min-width: 900px) {
  .personal-info {
    color: $subfontcolorOne;
    .personal-info-option {
      ul {
        display: flex;
        align-items: center;
        li {
          cursor: pointer;
          text-align: center;
          padding: 20px 20px 5px 20px;
          flex: auto;
          &:hover {
            color: pink;
          }
        }
        li:nth-child(2) {
          i {
            font-size: 18px;
          }
        }
        .active {
          color: pink;
        }
      }
      hr {
        border: 1px solid $subcolorOne;
        box-shadow: 0px 0px 10px #000;
      }
    }
    .personal-info-option-content {
      .personal-info-option-content-meinfo {
        margin: 30px;
        height: 520px;
        .meinfo-email,
        .meinfo-loginnum,
        .meinfo-created,
        .meinfo-username,
        .meinfo-portrait,
        .meinfo-identity {
          padding: 20px;
          span {
            font-family: "Monaco";
            padding-left: 20px;
            i {
              cursor: pointer;
              &:hover {
                color: pink;
              }
            }
          }
          .meinfo-portrait-img {
            position: relative;
            bottom: 15px;
            left: 90px;
            width: 100px;
            height: 100px;
            img {
              cursor: pointer;
              width: 100px;
              height: 100px;
              border-radius: 100px;
              box-shadow: 0px 0px 10px #000;
              &:hover {
                box-shadow: 0px 0px 15px #000;
              }
            }
          }
        }
        .meinfo-sub {
          margin: 30px auto;
          cursor: pointer;
          line-height: 32px;
          font-size: 14px;
          text-align: center;
          color: $subfontcolorOne;
          width: 100px;
          height: 35px;
          border: 2px solid $subcolorTwo;
          border-radius: 10px;
          background-color: transparent;
          box-shadow: 0px 0px 5px #000;
          &:hover {
            box-shadow: 0px 0px 10px #000;
          }
        }
        .meinfo-changename {
          position: fixed;
          width: 100vw;
          height: 100vh;
          background-color: rgba(65, 64, 64, 0.507);
          z-index: 99;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          .meinfo-changename-content {
            width: 340px;
            height: 200px;
            background-color: $themecolor;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            box-shadow: 0px 0px 10px #000;
            border-radius: 20px;
            .meinfo-changename-content-tips {
              margin: 15px 0px 10px 20px;
            }
            hr {
              border: 1px solid $subcolorOne;
              box-shadow: 0px 0px 10px #000;
            }
            .meinfo-changename-content-cancel {
              cursor: pointer;
              width: 0px;
              height: 0px;
              position: relative;
              bottom: 35px;
              left: 300px;
            }
            .meinfo-changename-content-name {
              margin: 30px 0px 0px 20px;
              input {
                font-size: 16px;
                color: $subfontcolorOne;
                text-align: center;
                width: 230px;
                height: 25px;
                border: 2px solid $subcolorTwo;
                border-radius: 10px;
                background-color: transparent;
                box-shadow: 0px 0px 10px #000;
              }
            }
            .meinfo-changename-content-sub {
              cursor: pointer;
              line-height: 30px;
              font-size: 14px;
              text-align: center;
              color: $subfontcolorOne;
              margin: 30px auto;
              width: 80px;
              height: 30px;
              border: 2px solid $subcolorTwo;
              border-radius: 10px;
              background-color: $themecolor;
              box-shadow: 0px 0px 10px #000;
              &:hover {
                box-shadow: 0px 0px 15px #000;
              }
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 899px) {
  .personal-info {
    color: $subfontcolorOne;
    .personal-info-option {
      ul {
        display: flex;
        align-items: center;
        li {
          font-size: 14px;
          cursor: pointer;
          text-align: center;
          padding: 10px 0px 4px 0px;
          flex: auto;
          &:hover {
            color: pink;
          }
        }
        li:nth-child(2) {
          i {
            font-size: 18px;
          }
        }
        .active {
          color: pink;
        }
      }
      hr {
        border: 1px solid $subcolorOne;
        box-shadow: 0px 0px 10px #000;
      }
    }
    .personal-info-option-content {
      .personal-info-option-content-meinfo {
        width: 95vw;
        height: 320px;
        .meinfo-email,
        .meinfo-loginnum,
        .meinfo-created,
        .meinfo-username,
        .meinfo-portrait,
        .meinfo-identity {
          font-size: 14px;
          padding: 10px;
          span {
            font-family: "Monaco";
            padding-left: 20px;
            i {
              cursor: pointer;
              &:hover {
                color: pink;
              }
            }
          }
          .meinfo-portrait-img {
            position: relative;
            bottom: 15px;
            left: 90px;
            width: 70px;
            height: 50px;
            img {
              cursor: pointer;
              width: 70px;
              height: 70px;
              border-radius: 100px;
              box-shadow: 0px 0px 10px #000;
              &:hover {
                box-shadow: 0px 0px 15px #000;
              }
            }
          }
        }
        .meinfo-email {
          padding-left: 5px;
        }
        .meinfo-sub {
          margin: 10px auto;
          cursor: pointer;
          line-height: 28px;
          font-size: 14px;
          text-align: center;
          color: $subfontcolorOne;
          width: 100px;
          height: 30px;
          border: 2px solid $subcolorTwo;
          border-radius: 10px;
          background-color: transparent;
          box-shadow: 0px 0px 5px #000;
          &:hover {
            box-shadow: 0px 0px 10px #000;
          }
        }
        .meinfo-changename {
          position: fixed;
          width: 100vw;
          height: 100vh;
          background-color: rgba(65, 64, 64, 0.507);
          z-index: 99;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          .meinfo-changename-content {
            width: 340px;
            height: 200px;
            background-color: $themecolor;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            box-shadow: 0px 0px 10px #000;
            border-radius: 20px;
            .meinfo-changename-content-tips {
              margin: 15px 0px 10px 20px;
            }
            hr {
              border: 1px solid $subcolorOne;
              box-shadow: 0px 0px 10px #000;
            }
            .meinfo-changename-content-cancel {
              cursor: pointer;
              width: 0px;
              height: 0px;
              position: relative;
              bottom: 35px;
              left: 300px;
            }
            .meinfo-changename-content-name {
              margin: 30px 0px 0px 20px;
              input {
                font-size: 16px;
                color: $subfontcolorOne;
                text-align: center;
                width: 230px;
                height: 25px;
                border: 2px solid $subcolorTwo;
                border-radius: 10px;
                background-color: transparent;
                box-shadow: 0px 0px 10px #000;
              }
            }
            .meinfo-changename-content-sub {
              cursor: pointer;
              line-height: 30px;
              font-size: 14px;
              text-align: center;
              color: $subfontcolorOne;
              margin: 30px auto;
              width: 80px;
              height: 30px;
              border: 2px solid $subcolorTwo;
              border-radius: 10px;
              background-color: $themecolor;
              box-shadow: 0px 0px 10px #000;
              &:hover {
                box-shadow: 0px 0px 15px #000;
              }
            }
          }
        }
      }
    }
  }
}

//clip
@media screen and (min-width: 900px) {
  .img-cilp-mode {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(65, 64, 64, 0.507);
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .img-cilp-mode-content {
      width: 410px;
      height: 280px;
      position: fixed;
      color: $fontcolor;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      text-align: center;
      margin: auto;
      box-shadow: 0px 0px 10px #000;
      background-color: $themecolor;
      border-radius: 20px;
      p {
        text-align: left;
        padding: 15px 20px 5px 20px;
        font-size: 16px;
        color: $subfontcolorOne;
      }
      hr {
        border: 1px solid $subcolorOne;
        box-shadow: 0px 0px 10px #000;
      }
      .img-cilp-Preview {
        position: absolute;
        top: 70px;
        left: 255px;
        font-size: 16px;
        color: $subfontcolorOne;
      }
      .img-cilp-cancel {
        cursor: pointer;
        position: absolute;
        top: 14px;
        left: 370px;
        i {
          font-size: 16px;
          color: $subfontcolorOne;
        }
      }
      .previewShow {
        box-shadow: 0px 0px 10px #000;
        background-color: $themecolor;
        position: absolute;
        top: 90px;
        left: 255px;
        width: 130px;
        height: 130px;
        overflow: hidden;
        border-radius: 100px;
      }
      .img-container {
        padding-top: 10px;
        padding-left: 20px;
        width: 150px;
        height: 150px;
      }
      .img-cilp-button {
        cursor: pointer;
        line-height: 24px;
        font-size: 16px;
        text-align: center;
        position: absolute;
        top: 240px;
        left: 150px;
        color: $subfontcolorOne;
        width: 100px;
        height: 25px;
        border: 2px solid $subcolorTwo;
        border-radius: 10px;
        background-color: transparent;
        box-shadow: 0px 0px 10px #000;
        &:hover {
          box-shadow: 0px 0px 15px #000;
        }
      }
    }
  }
}
@media screen and (max-width: 900px) {
  .img-cilp-mode {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(65, 64, 64, 0.507);
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .img-cilp-mode-content {
      width: 240px;
      height: 480px;
      position: fixed;
      color: $fontcolor;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      text-align: center;
      margin: auto;
      box-shadow: 0px 0px 10px #000;
      background-color: $themecolor;
      border-radius: 20px;
      p {
        text-align: left;
        padding: 15px 20px 5px 20px;
        font-size: 16px;
        color: $subfontcolorOne;
      }
      hr {
        border: 1px solid $subcolorOne;
        box-shadow: 0px 0px 10px #000;
      }
      .img-cilp-Preview {
        position: absolute;
        top: 250px;
        left: 20px;
        font-size: 16px;
        color: $subfontcolorOne;
      }
      .img-cilp-cancel {
        cursor: pointer;
        position: absolute;
        top: 14px;
        left: 200px;
        i {
          font-size: 16px;
          color: $subfontcolorOne;
        }
      }
      .previewShow {
        box-shadow: 0px 0px 10px #000;
        background-color: $themecolor;
        position: absolute;
        top: 270px;
        left: 55px;
        width: 130px;
        height: 130px;
        overflow: hidden;
        border-radius: 100px;
      }
      .img-container {
        padding-top: 10px;
        padding-left: 20px;
        width: 150px;
        height: 150px;
      }
      .img-cilp-button {
        cursor: pointer;
        line-height: 24px;
        font-size: 16px;
        text-align: center;
        position: absolute;
        top: 420px;
        left: 70px;
        color: $subfontcolorOne;
        width: 100px;
        height: 25px;
        border: 2px solid $subcolorTwo;
        border-radius: 10px;
        background-color: transparent;
        box-shadow: 0px 0px 10px #000;
        &:hover {
          box-shadow: 0px 0px 15px #000;
        }
      }
    }
  }
}

//特效
.meinfo-personality {
  display: none;
  height: 0px;
  width: 500px;
}
@media screen and (min-width: 1200px) {
  .meinfo-personality {
    display: block;
    @-webkit-keyframes bop {
      0% {
        -webkit-transform: scale(0.9);
        transform: scale(0.9);
      }
      50%,
      100% {
        -webkit-transform: scale(10);
        transform: scale(10);
      }
    }

    @keyframes bop {
      0% {
        -webkit-transform: scale(0.9);
        transform: scale(0.9);
      }
      50%,
      100% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }
    @-webkit-keyframes bopB {
      0% {
        -webkit-transform: scale(0.9);
        transform: scale(0.9);
      }
      80%,
      100% {
        -webkit-transform: scale(1) rotateZ(-3deg);
        transform: scale(1) rotateZ(-3deg);
      }
    }
    @keyframes bopB {
      0% {
        -webkit-transform: scale(0.9);
        transform: scale(0.9);
      }
      80%,
      100% {
        -webkit-transform: scale(1) rotateZ(-3deg);
        transform: scale(1) rotateZ(-3deg);
      }
    }
    h1 {
      position: relative;
      bottom: 500px;
      left: 25vw;
      margin: 0;
      font-size: 3vw;
      padding: 0;
      color: $subfontcolorOne;
      text-shadow: 0 0.1em 5px black, 0.05em -0.03em 0 black, 0.05em 0.005em 0 black, 0em 0.08em 0 black, 0.05em 0.08em 0 black, 0px -0.03em 0 black, -0.03em -0.03em 0 black, -0.03em 0.08em 0 black, -0.03em 0 0 black;
    }
    h1 span {
      font-family: "Monaco";
      -webkit-transform: scale(0.9);
      transform: scale(0.9);
      display: inline-block;
    }
    h1 span:first-child {
      -webkit-animation: bop 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards infinite alternate;
      animation: bop 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards infinite alternate;
    }
    h1 span:last-child {
      -webkit-animation: bopB 1s 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards infinite alternate;
      animation: bopB 1s 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards infinite alternate;
    }
  }
}
</style>
