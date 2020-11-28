<template>
  <div class="article-cover-upload">
    <div class="article-cover-upload-result">
      <div
        class="no-result"
        @click="openUpload"
        :class="{ imgShow: coverImg == '' }"
      >
        <input
          type="file"
          name=""
          id="articleCover"
          style="display:none;"
          @change="filePreview"
          accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
        />
      </div>
      <div
        class="result"
        :class="{ imgShow: coverImg != '' }"
        @click="openUpload"
      >
        <img :src="coverImg" alt="" />
      </div>
    </div>
  </div>
  <imgClip
    v-if="Imgdata.open"
    :baseSrc="Imgdata.Img"
    :clipCancel="imgCan"
    :clipSubmit="imgSub"
  />
</template>
<script>
import imgClip from "./imgClip";
import { reactive, ref, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  name: "ImgUpload",
  components: {
    imgClip,
  },
  props: {
    coverImg: {
      type: String,
      default: "",
    },
    setCoverImg: {
      type: Function,
    },
  },
  setup(props) {
    const store = useStore();
    const Imgdata = reactive({
      Img: "",
      open: false,
    });
    //打开上传裁剪界面
    const openUpload = () => {
      document.getElementById("articleCover").click();
    };
    //图片预览
    const filePreview = (e) => {
      let imgfile = e.target.files[0];
      // 判断是否支持FileReader
      let imgformat = imgfile.name
        .substr(imgfile.name.lastIndexOf(".") + 1)
        .toLowerCase();
      if (!e || !window.FileReader)
        return store.commit("openTips", {
          icon: "&#xe632;",
          title: "错误",
          text: "您的浏览器不支持FileReader请更换浏览器!",
        });
      if (
        !(
          imgformat === "jpg" ||
          imgformat === "png" ||
          imgformat === "jpeg" ||
          imgformat === "gif"
        )
      )
        return store.commit("openTips", {
          icon: "&#xe632;",
          title: "错误",
          text: "图片仅支持['jpg','png','jpeg','gif']格式图片",
        });
      let reader = new FileReader();
      reader.readAsDataURL(imgfile);
      reader.onloadend = () => {
        Imgdata.Img = reader.result;
        Imgdata.open = !Imgdata.open;
      };
    };
    const imgSub = (imgBase) => {
      props.setCoverImg(imgBase);
      document.getElementById("articleCover").value = "";
      Imgdata.open = !Imgdata.open;
    };
    const imgCan = () => {
      //重置input file
      document.getElementById("articleCover").value = "";
      Imgdata.open = !Imgdata.open;
    };
    return {
      Imgdata,
      openUpload,
      filePreview,
      imgSub,
      imgCan,
    };
  },
};
</script>

<style lang="scss">
@media screen and (min-width: 900px) {
  .article-cover-upload {
    width: 400px;
    .article-cover-upload-result {
      height: 225px;
      color: $fontcolor;
      text-align: center;
      border: 2px solid $subcolorTwo;
      border-radius: 10px 10px 10px 10px;
      background-color: $themecolor;
      box-shadow: 0px 0px 10px #000;
      color: $subfontcolorOne;
      .no-result {
        display: none;
        cursor: pointer;
        margin: 20px 20px 0px 20px;
        height: 180px;
        border: 2px solid $subcolorTwo;
        border-radius: 10px 10px 10px 10px;
        &::after {
          font-family: "Monaco";
          content: "+";
          margin: 35px 20px 0 0;
          display: inline-block;
          color: $subcolorTwo;
          font-size: 100px;
          transform: rotate(-90deg);
        }
        &:hover {
          box-shadow: 0px 0px 5px #000;
        }
      }
      .result {
        cursor: pointer;
        display: none;
        margin-top: 15px;
        img {
          border-radius: 10px 10px 10px 10px;
          width: 352px;
          height: 198px;
          box-shadow: 0px 0px 5px #000;
          &:hover {
            box-shadow: 0px 0px 15px #000;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 900px) {
  .article-cover-upload {
    width: 320px;
    .article-cover-upload-result {
      height: 180px;
      color: $fontcolor;
      text-align: center;
      border: 2px solid $subcolorTwo;
      border-radius: 10px 10px 10px 10px;
      background-color: $themecolor;
      box-shadow: 0px 0px 10px #000;
      color: $subfontcolorOne;
      .no-result {
        display: none;
        cursor: pointer;
        margin: 20px 20px 0px 20px;
        height: 135px;
        border: 2px solid $subcolorTwo;
        border-radius: 10px 10px 10px 10px;
        &::after {
          font-family: "Monaco";
          content: "+";
          margin: 30px 15px 0 0;
          display: inline-block;
          color: $subcolorTwo;
          font-size: 70px;
          transform: rotate(-90deg);
        }
        &:hover {
          box-shadow: 0px 0px 5px #000;
        }
      }
      .result {
        cursor: pointer;
        display: none;
        margin-top: 10px;
        img {
          border-radius: 10px 10px 10px 10px;
          width: 288px;
          height: 162px;
          box-shadow: 0px 0px 5px #000;
          &:hover {
            box-shadow: 0px 0px 15px #000;
          }
        }
      }
    }
  }
}

.imgShow {
  display: block !important;
}

// clip
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
      width: 660px;
      height: 350px;
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
        padding: 20px 20px 10px 30px;
        font-size: 20px;
        color: $subfontcolorOne;
      }
      hr {
        border: 1px solid $subcolorOne;
        box-shadow: 0px 0px 10px #000;
      }
      .img-cilp-Preview {
        position: absolute;
        top: 90px;
        left: 390px;
        font-size: 18px;
        color: $subfontcolorOne;
      }
      .img-cilp-cancel {
        cursor: pointer;
        position: absolute;
        top: 20px;
        left: 605px;
        i {
          font-size: 22px;
          color: $subfontcolorOne;
        }
      }
      .previewShow {
        box-shadow: 0px 0px 10px #000;
        background-color: $themecolor;
        position: absolute;
        top: 120px;
        left: 390px;
        width: 240px;
        height: 135px;
        overflow: hidden;
      }
      .img-container {
        padding-top: 10px;
        padding-left: 30px;
        width: 320px;
        height: 180px;
      }
      .img-cilp-button {
        cursor: pointer;
        line-height: 30px;
        font-size: 18px;
        text-align: center;
        position: absolute;
        top: 300px;
        left: 170px;
        color: $subfontcolorOne;
        width: 320px;
        height: 30px;
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
      width: 320px;
      height: 500px;
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
        padding: 20px 20px 10px 30px;
        font-size: 18px;
        color: $subfontcolorOne;
      }
      hr {
        border: 1px solid $subcolorOne;
        box-shadow: 0px 0px 10px #000;
      }
      .img-cilp-Preview {
        position: absolute;
        top: 250px;
        left: 30px;
        font-size: 16px;
        color: $subfontcolorOne;
      }
      .img-cilp-cancel {
        cursor: pointer;
        position: absolute;
        top: 20px;
        left: 280px;
        i {
          font-size: 20px;
          color: $subfontcolorOne;
        }
      }
      .previewShow {
        box-shadow: 0px 0px 10px #000;
        background-color: $themecolor;
        position: absolute;
        top: 280px;
        left: 30px;
        width: 264px;
        height: 148px;
        overflow: hidden;
      }
      .img-container {
        padding-top: 10px;
        padding-left: 30px;
        width: 235px;
        height: 135px;
      }
      .img-cilp-button {
        cursor: pointer;
        line-height: 30px;
        font-size: 18px;
        text-align: center;
        position: absolute;
        top: 455px;
        left: 70px;
        color: $subfontcolorOne;
        width: 180px;
        height: 30px;
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
</style>
