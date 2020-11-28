<template>
  <div class="user-management">
    <div class="user-management-left">
      <div class="user-management-info">
        <div class="user-management-info-img">
          <img :src="store.state.userProfile ? store.state.userProfile : require('@/assets/img/defaultProfile.jpg')" alt="" />
        </div>
        <div class="user-management-info-username">
          {{ store.state.userName }}
        </div>
        <div class="user-management-info-relationship">
          <ul>
            <li>
              关注
              <h4>{{ store.state.followNum }}</h4>
            </li>
            <li>
              粉丝
              <h4>{{ store.state.fansNum }}</h4>
            </li>
            <li>
              文章
              <h4>{{ store.state.articleNum }}</h4>
            </li>
          </ul>
        </div>
        <div class="user-management-info-useid">
          Uid:<span>{{ store.state.userId }}</span>
        </div>
        <div class="user-management-info-email">
          Email:<span>{{ store.state.userEmail }}</span>
        </div>
      </div>
      <div class="user-management-option">
        <div class="user-management-option-left">
          <ul>
            <li :class="route.params.option1 == 'personal_center' ? 'active' : ''"><AbiIcon>&#xe66c;</AbiIcon> 个人中心</li>
            <li><AbiIcon>&#xe635;</AbiIcon> 我的文章</li>
            <li><AbiIcon>&#xe67a;</AbiIcon> 我的收藏</li>
            <li><AbiIcon>&#xe667;</AbiIcon> 我的通知</li>
            <li><AbiIcon>&#xe603;</AbiIcon> 我的回复</li>
            <li><AbiIcon>&#xe616;</AbiIcon> 退出登陆</li>
          </ul>
        </div>
        <div class="user-management-option-right">
          <ul>
            <li>&nbsp;</li>
            <li class="user-management-option-right-color">12</li>
            <li class="user-management-option-right-color">5</li>
            <li class="user-management-option-right-color-red">9</li>
            <li class="user-management-option-right-color">10</li>
            <li>&nbsp;</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="user-management-right">
      <div class="user-management-content">
        <PersonalInfo v-if="route.params.option1 == 'personal_center'" :option="route.params.option2" />
      </div>
    </div>
  </div>
</template>

<script>
import PersonalInfo from "@/components/viewcomponents/PersonalInfo";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "ManagementCenter",
  components: {
    PersonalInfo,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    console.log(router);
    return {
      store,
      route,
    };
  },
};
</script>

<style lang="scss">
@media screen and (min-width: 900px) {
  .user-management {
    width: 70vw;
    margin: 100px 15vw 0px 15vw;
    .user-management-left {
      float: left;
      color: $fontcolor;
      .user-management-info {
        width: 200px;
        height: 270px;
        background-color: $themecolor;
        border-radius: 15px;
        box-shadow: 0px 0px 15px #000;
        .user-management-info-img {
          text-align: center;
          padding-top: 15px;
          img {
            box-shadow: 0px 0px 10px #000;
            width: 80px;
            height: 80px;
            border-radius: 50px;
          }
        }
        .user-management-info-username {
          padding-top: 10px;
          text-align: center;
          font-size: 16px;
          text-shadow: 2px 2px 5px #000;
        }
        .user-management-info-relationship {
          padding-top: 5px;
          ul {
            font-size: 14px;
            height: 45px;
            border-top: 2px dashed $subfontcolorOne;
            border-bottom: 2px dashed $subfontcolorOne;
            text-align: center;
            box-shadow: 0px 0px 5px #000;
            margin-top: 10px;
            li {
              cursor: pointer;
              padding-top: 10px;
              width: 66px;
              float: left;
              text-shadow: 2px 2px 5px #000;
              &:hover {
                color: pink;
              }
              span {
                display: block;
                float: right;
              }
            }
          }
        }
        .user-management-info-useid,
        .user-management-info-email {
          padding-top: 15px;
          font-size: 12px;
          font-family: "Monaco";
          text-align: center;
          text-shadow: 2px 2px 5px #000;
        }
      }
      .user-management-option {
        margin-top: 20px;
        width: 200px;
        height: 300px;
        background-color: $themecolor;
        border-radius: 15px;
        box-shadow: 0px 0px 15px #000;
        .user-management-option-left {
          float: left;
          ul {
            padding-top: 10px;
            li {
              cursor: pointer;
              padding: 15px;
              text-align: left;
              &:hover {
                color: pink;
              }
            }
            .active {
              color: pink;
            }
          }
        }
        .user-management-option-right {
          float: right;
          ul {
            li {
              font-size: 16px;
              font-family: "Monaco";
              width: 40px;
              cursor: pointer;
              margin: 25px 15px 30px 15px;
              text-align: center;
              border-radius: 10px;
            }
            .user-management-option-right-color {
              background-color: $subcolorTwo;
            }
            .user-management-option-right-color-red {
              background-color: rgb(255, 97, 97);
            }
          }
        }
      }
    }
    .user-management-right {
      float: right;
      .user-management-content {
        left: 500px;
        background-color: $themecolor;
        border-radius: 15px;
        box-shadow: 0px 0px 15px #000;
      }
    }
  }
}
@media screen and (max-width: 899px) {
  .user-management {
    width: 95vw;
    margin: 65px 2.5vw 0px 2.5vw;
    .user-management-left {
      float: left;
      color: $fontcolor;
      .user-management-info {
        width: 95vw;
        height: 130px;
        background-color: $themecolor;
        border-radius: 15px;
        box-shadow: 0px 0px 15px #000;
        .user-management-info-img {
          text-align: left;
          padding: 10px 0px 0px 20px;
          img {
            box-shadow: 0px 0px 10px #000;
            width: 60px;
            height: 60px;
            border-radius: 30px;
          }
        }
        .user-management-info-username {
          font-family: "Monaco";
          width: 150px;
          height: 0px;
          position: relative;
          bottom: 60px;
          left: 100px;
          font-size: 14px;
          text-shadow: 2px 2px 5px #000;
        }
        .user-management-info-relationship {
          padding-top: 5px;
          ul {
            font-size: 14px;
            height: 35px;
            border-top: 2px solid $subfontcolorOne;
            border-bottom: 2px solid $subfontcolorOne;
            text-align: center;
            box-shadow: 0px 0px 5px #000;
            li {
              cursor: pointer;
              padding-top: 4px;
              width: 30vw;
              float: left;
              text-shadow: 2px 2px 5px #000;
              &:hover {
                color: pink;
              }
              span {
                display: block;
                float: right;
              }
            }
          }
        }
        .user-management-info-useid,
        .user-management-info-email {
          position: relative;
          bottom: 80px;
          left: 100px;
          width: 120px;
          height: 20px;
          font-size: 12px;
          font-family: "Monaco";
          text-shadow: 2px 2px 5px #000;
        }
      }
      .user-management-option {
        font-size: 14px;
        margin-top: 5px;
        width: 95vw;
        height: 205px;
        background-color: $themecolor;
        border-radius: 15px;
        box-shadow: 0px 0px 15px #000;
        .user-management-option-left {
          float: left;
          ul {
            li {
              cursor: pointer;
              padding: 15px 0px 0px 25px;
              text-align: left;
              &:hover {
                color: pink;
              }
            }
            .active {
              color: pink;
            }
          }
        }
        .user-management-option-right {
          float: right;
          ul {
            li {
              font-size: 14px;
              font-family: "Monaco";
              width: 40px;
              cursor: pointer;
              margin: 17px 25px 15px 15px;
              text-align: center;
              border-radius: 10px;
            }
            .user-management-option-right-color {
              background-color: $subcolorTwo;
            }
            .user-management-option-right-color-red {
              background-color: rgb(255, 97, 97);
            }
          }
        }
      }
    }
    .user-management-right {
      float: right;
      margin-top: 5px;
      .user-management-content {
        // left: 500px;
        background-color: $themecolor;
        border-radius: 15px;
        box-shadow: 0px 0px 15px #000;
      }
    }
  }
}

///////////////
@media screen and (min-width: 900px) {
  .user-management-content {
    width: 46vw;
  }
}
@media screen and (min-width: 1100px) {
  .user-management-content {
    width: 50vw;
  }
}
@media screen and (min-width: 1300px) {
  .user-management-content {
    width: 53vw;
  }
}
@media screen and (min-width: 1500px) {
  .user-management-content {
    width: 55vw;
  }
}
@media screen and (min-width: 1700px) {
  .user-management-content {
    width: 57vw;
  }
}
@media screen and (min-width: 1800px) {
  .user-management-content {
    width: 58vw;
  }
}
</style>
