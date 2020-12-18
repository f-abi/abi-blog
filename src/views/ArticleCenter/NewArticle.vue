<template>
  <div class="new-article">
    <div class="new-article-tips">
      <span><AbiIcon>&#xe60f;</AbiIcon> 新建博文</span>
      <div class="new-article-tips-icon">
        <AbiIcon @click="dataStatus.tipsShow = !dataStatus.tipsShow"
          >&#xe632;</AbiIcon
        >
      </div>
    </div>
    <hr class="new-article-tips-hr" />
    <div class="new-article-fill">
      <div class="new-article-info">
        <div class="new-article-info-tips">
          <AbiIcon>&#xe62b;</AbiIcon> 文章标题:
          <input
            type="text"
            v-model="articleData.title"
            @blur="articleTitleCheck"
            @focus="dataStatus.titleError = false"
            :class="dataStatus.titleError ? 'newArticleInputErr' : ''"
          />
        </div>
        <div class="new-article-info-title">
          <AbiIcon>&#xe617;</AbiIcon>
          文章标签:
          <input
            type="text"
            v-model="articleData.label"
            @blur="articleLabelCheck"
            @focus="dataStatus.labelError = false"
            :class="dataStatus.labelError ? 'newArticleInputErr' : ''"
          />
        </div>
        <div class="new-article-cover-tips">
          <AbiIcon>&#xe64a;</AbiIcon>
          文章封面:
        </div>
        <div class="new-article-cover">
          <ImgUpload :coverImg="articleData.cover" :setCoverImg="setCoverImg" />
        </div>
      </div>
    </div>
    <div class="new-article-markdown">
      <Markdown
        :articleContent="articleData.content"
        :setArticleContent="setContent"
        :saveArticleContent="saveArticle"
        :setImgCacheName="setImgCacheName"
        :height="500"
      />
    </div>
    <div class="new-article-choice">
      <div class="new-article-submit" @click="subArticle">
        <AbiIcon>&#xe75b;</AbiIcon>
        提交审核
      </div>
      <div class="new-article-choice-tips">or</div>
      <div class="new-article-preservation" @click="preservation">
        <AbiIcon>&#xe606;</AbiIcon>
        保存草稿
      </div>
    </div>
    <div
      class="new-article-lighting"
      :class="dataStatus.tipsShow ? 'new-article-lighting-show' : ''"
    >
      <div class="new-article-lighting-back"></div>
      <div class="new-article-lighting-tips">
        <div class="new-article-lighting-tips-title">
          编辑注意事项
          <AbiIcon>&#xe632;</AbiIcon>
        </div>
        <hr />
        <div class="new-article-lighting-tips-content">
          <ul>
            <li><span>· </span>文章标题支持2~100个字符.</li>
            <li><span>· </span>文章标签支持2~20个字符.</li>
            <li><span>· </span>文章标签仅能唯一，输入后系统会自动匹配 .</li>
            <li>
              <span>· </span>封面仅支持['jpg','png','jpeg','gif']格式图片.
            </li>
            <li><span>· </span>封面比例为16:9上传时选择范围剪切上传.</li>
            <li><span>· </span>文章内容图片上传后,过期时间为10天.</li>
            <li><span>· </span>图片过期后,会提示重新上传.</li>
            <li><span>· </span>文章通过审核后,图片会永久保存在服务器.</li>
            <li><span>· </span>编辑器预览时，插入的代码不会有样式.</li>
            <li><span>· </span></li>
            <li><span>· </span></li>
          </ul>
        </div>
        <div
          class="new-article-lighting-tips-determine"
          @click="dataStatus.tipsShow = !dataStatus.tipsShow"
        >
          确定
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Markdown from "@/components/markdown/Markdown";
import ImgUpload from "@/components/imgupload/ImgUpload";
import {
  saveArticleAPI,
  getSaveArticleAPI,
  subreviewarticleAPI,
} from "@/http/v1/apiV1";
import { ref, reactive } from "vue";
import { useStore } from "vuex";
export default {
  name: "NewArticle",
  components: {
    Markdown,
    ImgUpload,
  },
  setup(props) {
    const dataStatus = reactive({
      titleError: false,
      labelError: false,
      tipsShow: false,
    });
    const articleData = reactive({
      title: "",
      label: "",
      cover: "",
      content: "",
      cache: [],
    });
    const store = useStore();
    //创建时获取文章数据
    getSaveArticleAPI()
      .then((res) => {
        articleData.title = res.data.title;
        articleData.label = res.data.label;
        if (res.data.cover != null) {
          articleData.cover = res.data.cover;
        }
        articleData.content = res.data.content;
        articleData.cache = JSON.parse(JSON.stringify(res.data.cache));
      })
      .catch((err) => {});
    //自动保存文章
    const saveArticle = () => {
      saveArticleAPI({
        article_data: {
          title: articleData.title,
          label: articleData.label,
          cover: articleData.cover,
          content: articleData.content,
          cache: articleData.cache,
        },
      });
    };
    let { setCoverImg, setContent, setImgCacheName } = setData(
      dataStatus,
      articleData,
      store,
      saveArticle
    );
    let {
      preservation,
      articleTitleCheck,
      articleLabelCheck,
      subArticle,
    } = checkDataAndSub(dataStatus, articleData, store, saveArticle);
    return {
      articleData,
      setCoverImg,
      preservation,
      setContent,
      saveArticle,
      setImgCacheName,
      dataStatus,
      articleTitleCheck,
      articleLabelCheck,
      subArticle,
    };
  },
};
//设置数据
function setData(dataStatus, articleData, store, saveArticle) {
  //设置封面
  const setCoverImg = (img) => {
    articleData.cover = img;
    saveArticle();
  };
  //设置内容
  const setContent = (value) => {
    articleData.content = value;
  };
  //设置图片缓存名称
  const setImgCacheName = (cacheName) => {
    articleData.cache.push(cacheName);
  };
  return {
    setCoverImg,
    setContent,
    setImgCacheName,
  };
}
//校验数据及提交保存
function checkDataAndSub(dataStatus, articleData, store, saveArticle) {
  //保存文章
  const preservation = () => {
    saveArticleAPI({
      article_data: {
        title: articleData.title,
        label: articleData.label,
        cover: articleData.cover,
        content: articleData.content,
        cache: articleData.cache,
      },
    })
      .then((res) => {
        store.commit("openTips", {
          icon: "&#xe606;",
          title: "保存",
          text: "保存成功!",
        });
      })
      .catch((err) => {
        store.commit("openTips", {
          icon: "&#xe606;",
          title: "保存",
          text: "保存失败,请检查文章内容是否错误!",
        });
      });
  };
  //文章标题校验
  const articleTitleCheck = () => {
    if (
      articleData.title == null ||
      articleData.title.length < 2 ||
      articleData.title.length > 100
    ) {
      store.commit("openTips", {
        icon: "&#xe62b;",
        title: "标题错误",
        text: "文章标题仅支持2~100个字符!",
      });
      return (dataStatus.titleError = true);
    }
    saveArticle();
    return (dataStatus.titleError = false);
  };
  //文章标签校验
  const articleLabelCheck = () => {
    if (
      articleData.label == null ||
      articleData.label.length < 2 ||
      articleData.label.length > 20
    ) {
      store.commit("openTips", {
        icon: "&#xe617;",
        title: "标签错误",
        text: "文章标签仅支持2~20个字符!",
      });
      return (dataStatus.labelError = true);
    }
    saveArticle();
    return (dataStatus.labelError = false);
  };
  //提交文章待审核
  const subArticle = () => {
    if (
      articleData.title == null ||
      articleData.title.length < 2 ||
      articleData.title.length > 100
    ) {
      store.commit("openTips", {
        icon: "&#xe62b;",
        title: "标题错误",
        text: "文章标题仅支持2~100个字符!",
      });
      return (dataStatus.titleError = true);
    }
    if (
      articleData.label == null ||
      articleData.label.length < 2 ||
      articleData.label.length > 20
    ) {
      store.commit("openTips", {
        icon: "&#xe617;",
        title: "标题错误",
        text: "文章标签仅支持2~20个字符!",
      });
      return (dataStatus.labelError = true);
    }
    if (articleData.cover == "") {
      return store.commit("openTips", {
        icon: "&#xe64a;",
        title: "封面错误",
        text: "请上传文章封面!",
      });
    }
    if (articleData.content == "") {
      return store.commit("openTips", {
        icon: "&#xe75b;",
        title: "内容错误",
        text: "文章内容不能为空!",
      });
    }
    store.commit("openSubmitload", "提交审核中...");
    subreviewarticleAPI({
      title: articleData.title,
      label: articleData.label,
      cover: articleData.cover,
      content: articleData.content,
      cache: articleData.cache,
    })
      .then((res) => {
        store.commit("cancelSubmitload");
        store.commit("openTips", {
          icon: "&#xe75b;",
          title: "提交成功",
          text: "提交成功，文章等待管理员审核..",
        });
        //成功准备跳转
        // ..
      })
      .catch((err) => {
        store.commit("cancelSubmitload");
        store.commit("openTips", {
          icon: "&#xe75b;",
          title: "提交错误",
          text: err.msg,
        });
      });
  };
  return {
    preservation,
    articleTitleCheck,
    articleLabelCheck,
    subArticle,
  };
}
</script>

<style lang="scss">
.tox-tinymce {
  border-radius: 5px !important;
}
@media screen and (min-width: 900px) {
  .new-article {
    width: 70vw;
    margin: 80px 15vw 0px 15vw;
    border-radius: 10px 10px;
    background-color: $themecolor;
    box-shadow: 0px 0px 10px #000;
    color: $subfontcolorOne;
    .new-article-tips {
      padding-top: 15px;
      padding-bottom: 5px;
      font-size: 20px;
      width: 70vw;
      text-align: center;
      i {
        font-size: 20px;
      }
      .new-article-tips-icon {
        cursor: pointer;
        position: absolute;
        top: 95px;
        right: 16vw;
        i {
          font-size: 22px;
        }
      }
    }
    .new-article-tips-hr {
      border: 2px solid $subcolorOne;
      box-shadow: 0px 0px 10px #000;
    }
    .new-article-fill {
      padding: 5px 0 20px 0;
      .new-article-info-tips {
        padding: 10px 0 0 20px;
        font-size: 16px;
        input {
          font-size: 16px;
          color: $subfontcolorOne;
          text-align: center;
          width: 50vw;
          height: 35px;
          border: 2px solid $subcolorTwo;
          border-radius: 10px;
          background-color: transparent;
          box-shadow: 0px 0px 10px #000;
          &:hover {
            box-shadow: 0px 0px 15px #000;
          }
        }
      }
      .new-article-info-title {
        padding: 15px 0 0 20px;
        font-size: 16px;
        input {
          font-size: 16px;
          color: $subfontcolorOne;
          text-align: center;
          width: 30vw;
          height: 35px;
          border: 2px solid $subcolorTwo;
          border-radius: 10px;
          background-color: transparent;
          box-shadow: 0px 0px 10px #000;
          &:hover {
            box-shadow: 0px 0px 15px #000;
          }
        }
      }
      .new-article-cover-tips {
        font-size: 16px;
        padding: 20px 0 0 20px;
        float: left;
      }
      .new-article-cover {
        margin: 15px 0 0 115px;
      }
    }
    .new-article-markdown {
      padding: 0px 20px;
    }
  }
  .new-article-choice {
    margin: 0 auto;
    padding: 20px 20px 30px 20px;
    .new-article-submit {
      display: inline-block;
      cursor: pointer;
      line-height: 32px;
      font-size: 16px;
      text-align: center;
      color: $subfontcolorOne;
      width: 220px;
      height: 35px;
      border: 2px solid $subcolorTwo;
      border-radius: 10px;
      background-color: $themecolor;
      box-shadow: 0px 0px 10px #000;
      &:hover {
        box-shadow: 0px 0px 15px #000;
      }
    }
    .new-article-preservation {
      display: inline-block;
      cursor: pointer;
      line-height: 32px;
      font-size: 16px;
      text-align: center;
      color: $subfontcolorOne;
      width: 220px;
      height: 35px;
      border: 2px solid $subcolorTwo;
      border-radius: 10px;
      background-color: transparent;
      box-shadow: 0px 0px 10px #000;
      &:hover {
        box-shadow: 0px 0px 15px #000;
      }
    }
    .new-article-choice-tips {
      font-family: "Monaco";
      padding: 0 5px;
      display: inline-block;
      font-size: 20px;
    }
  }
}
@media screen and (max-width: 899px) {
  .new-article {
    width: 95vw;
    margin: 80px 2vw 0px 2vw;
    border-radius: 10px 10px;
    background-color: $themecolor;
    box-shadow: 0px 0px 10px #000;
    color: $subfontcolorOne;
    .new-article-tips {
      padding-top: 15px;
      padding-bottom: 5px;
      font-size: 20px;
      width: 95vw;
      text-align: center;
      i {
        font-size: 20px;
      }
      .new-article-tips-icon {
        cursor: pointer;
        position: absolute;
        top: 95px;
        right: 5vw;
        i {
          font-size: 22px;
        }
      }
    }
    .new-article-tips-hr {
      border: 2px solid $subcolorOne;
      box-shadow: 0px 0px 10px #000;
    }
    .new-article-fill {
      padding: 5px 0 20px 0;
      .new-article-info-tips {
        padding: 10px 0 0 20px;
        font-size: 14px;
        i {
          font-size: 14px;
        }
        input {
          font-size: 16px;
          color: $subfontcolorOne;
          text-align: center;
          width: 60vw;
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
      .new-article-info-title {
        padding: 15px 0 0 20px;
        font-size: 14px;
        i {
          font-size: 14px;
        }
        input {
          font-size: 16px;
          color: $subfontcolorOne;
          text-align: center;
          width: 60vw;
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
      .new-article-cover-tips {
        font-size: 14px;
        padding: 20px 0 0 20px;
        float: left;
        i {
          font-size: 14px;
        }
      }
      .new-article-cover {
        margin: 50px 0 0 20px;
      }
    }
    .new-article-markdown {
      padding: 0px 5px;
    }
  }
  .new-article-choice {
    margin: 0 auto;
    padding: 20px 0px 25px 10px;
    .new-article-submit {
      display: inline-block;
      cursor: pointer;
      line-height: 32px;
      font-size: 14px;
      text-align: center;
      color: $subfontcolorOne;
      width: 150px;
      height: 35px;
      border: 2px solid $subcolorTwo;
      border-radius: 10px;
      background-color: $themecolor;
      box-shadow: 0px 0px 10px #000;
      &:hover {
        box-shadow: 0px 0px 15px #000;
      }
    }
    .new-article-preservation {
      display: inline-block;
      cursor: pointer;
      line-height: 32px;
      font-size: 14px;
      text-align: center;
      color: $subfontcolorOne;
      width: 150px;
      height: 35px;
      border: 2px solid $subcolorTwo;
      border-radius: 10px;
      background-color: transparent;
      box-shadow: 0px 0px 10px #000;
      &:hover {
        box-shadow: 0px 0px 15px #000;
      }
    }
    .new-article-choice-tips {
      font-family: "Monaco";
      padding: 0 5px;
      display: inline-block;
      font-size: 16px;
    }
  }
}

.new-article-lighting {
  display: none;
  .new-article-lighting-back {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(65, 64, 64, 0.507);
    z-index: 99;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .new-article-lighting-tips {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 320px;
    height: 400px;
    background-color: $themecolor;
    border-radius: 20px;
    box-shadow: 0px 0px 15px #000;
    z-index: 100;
    .new-article-lighting-tips-title {
      padding-top: 10px;
      font-size: 16px;
      width: 320px;
      text-align: center;
      i {
        font-size: 14px;
      }
    }
    hr {
      border: 1px solid $subcolorOne;
      box-shadow: 0px 0px 5px #000;
    }
    .new-article-lighting-tips-content {
      width: 300px;
      // 提示编辑区虚线框高度
      height: 280px;
      border: 3px dotted $subcolorOne;
      border-radius: 10px;
      box-shadow: 0px 0px 3px #000;
      margin: 20px auto 12px auto;
    }
    .new-article-lighting-tips-content {
      ul {
        margin-top: 10px;
        li {
          padding: 5px;
          font-size: 14px;
          span {
            font-weight: 600;
          }
        }
      }
    }
    .new-article-lighting-tips-determine {
      margin: 0 auto;
      cursor: pointer;
      line-height: 30px;
      font-size: 14px;
      text-align: center;
      color: $subfontcolorOne;
      width: 100px;
      height: 30px;
      border: 2px solid $subcolorTwo;
      border-radius: 10px;
      background-color: $themecolor;
      box-shadow: 0px 0px 5px #000;
      &:hover {
        box-shadow: 0px 0px 10px #000;
      }
    }
  }
}

.new-article-lighting-show {
  display: block !important;
}

.newArticleInputErr {
  border-color: pink !important;
}
</style>
