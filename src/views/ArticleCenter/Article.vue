<template>
  <div class="article">
    <div class="article-right">
      <div class="article-main">
        <div class="article-all">
          <div class="article-title">{{ articleData.title }}</div>
          <div class="article-info">
            <ul>
              <li>
                <AbiIcon>&#xe601;</AbiIcon>
                {{ articleData.created_time.slice(0, 10) }}
              </li>
              <li><AbiIcon>&#xe608;</AbiIcon> {{ articleData.look_num }}</li>
              <li>
                <AbiIcon>&#xe67a;</AbiIcon> {{ articleData.collection_num }}
              </li>
              <li><AbiIcon>&#xe617;</AbiIcon>{{ articleData.label_name }}</li>
              <li><AbiIcon>&#xe638;</AbiIcon> 测试测试测试</li>
            </ul>
          </div>
          <div class="article-content" v-html="articleData.content"></div>
        </div>
      </div>
    </div>
    <div class="article-left">
      <div class="user-info">
        <div class="user-img">
          <img :src="articleData.user_profile_photo" />
        </div>
        <div class="user-name">
          {{ articleData.user_name }}
        </div>
        <div class="user-email">{{ articleData.user_email }}</div>
        <div class="user-relationship">
          <ul>
            <li>
              关注
              <h4>{{ articleData.user_follow_num }}</h4>
            </li>
            <li>
              粉丝
              <h4>{{ articleData.user_fans_num }}</h4>
            </li>
            <li>
              文章
              <h4>{{ articleData.user_article_num }}</h4>
            </li>
          </ul>
        </div>
      </div>
      <div class="follow-user"><AbiIcon>&#xe6cf;</AbiIcon>关注</div>
      <div class="collection-article"><AbiIcon>&#xe67a;</AbiIcon>收藏文章</div>
    </div>
    <div class="article-comment">
      <div class="write-comment">
        <div class="tips">
          <AbiIcon>&#xe61d;</AbiIcon>
          请勿发布不友善或者负能量的内容,与人为善!
        </div>
        <div class="content">
          <textarea></textarea>
        </div>
        <div class="sub-content"><AbiIcon>&#xe75b;</AbiIcon> 发布</div>
      </div>
      <div
        class="comment-content"
        v-for="(index, item) in articleData._comment"
        :key="item"
      >
        <div class="comment-user-img">
          <img :src="index.profile_photo" alt="" />
        </div>
        <div class="comment-user-info">
          <AbiIcon>&#xe638;</AbiIcon><span>{{ index.user_name }}</span
          ><AbiIcon>&#xe63a;</AbiIcon><span>{{ index.created_at }}</span>
        </div>
        <div class="comment-text">{{ index.comment_text }}</div>
        <div class="comment-reply">
          <span class="del"><AbiIcon>&#xe655;</AbiIcon></span
          ><span
            class="rep"
            @click="
              openReply(item, index.user_name, index.user_id, index.comment_id)
            "
            ><AbiIcon>&#xe603;</AbiIcon></span
          >
        </div>
        <div
          class="reply-content"
          v-for="(_index, _item) in index.reply"
          :key="_item"
        >
          <div class="reply-user-img">
            <img :src="_index.profile_photo" alt="" />
          </div>
          <div class="reply-user-info">
            <AbiIcon>&#xe638;</AbiIcon><span>{{ _index.user_name }}</span
            ><label>回复</label><AbiIcon>&#xe638;</AbiIcon
            ><span>{{ _index.to_user_name }}</span
            ><br /><AbiIcon>&#xe63a;</AbiIcon
            ><span>{{ _index.created_at }}</span>
          </div>
          <div class="reply-text">{{ _index.reply_text }}</div>
          <div class="reply-reply">
            <span class="del"><AbiIcon>&#xe655;</AbiIcon></span
            ><span
              class="rep"
              @click="
                openReply(
                  item,
                  _index.user_name,
                  _index.reply_from_uid,
                  index.comment_id
                )
              "
              ><AbiIcon>&#xe603;</AbiIcon></span
            >
          </div>
        </div>
        <div class="new-reply" v-show="viewStatus.replyKey == item">
          <div class="tips">
            回复:<AbiIcon>&#xe638;</AbiIcon
            ><span>{{ viewStatus.replyUName }}</span>
          </div>
          <div class="content">
            <textarea></textarea>
          </div>
          <div class="sub">
            <span><AbiIcon>&#xe75b;</AbiIcon> 回复</span
            ><span
              @click="
                viewStatus.replyKey = null;
                viewStatus.replyUName = '';
                viewStatus.replyUId = null;
                viewStatus.replyCommentId = null;
              "
              ><AbiIcon>&#xe6da;</AbiIcon> 取消</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Prism from "prismjs";
import { getArticleAPI } from "@/http/v1/apiV1";
import { reactive, onUpdated } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  name: "Article",
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const articleData = reactive({
      title: "",
      content: "",
      look_num: null,
      collection_num: null,
      created_time: "",
      label_id: null,
      label_name: "",
      user_id: null,
      user_name: "",
      user_email: "",
      user_profile_photo: "",
      user_follow_num: "",
      user_fans_num: "",
      user_article_num: "",
      _comment: null,
    });
    const viewStatus = reactive({
      replyKey: null,
      replyUName: "",
      replyUId: null,
      replyCommentId: null,
    });
    const openReply = (key, u_name, u_id, c_id) => {
      viewStatus.replyKey = key;
      viewStatus.replyUName = u_name;
      viewStatus.replyUId = u_id;
      viewStatus.replyCommentId = c_id;
    };
    store.commit("openSubmitload", "构造文章内容中..");
    getArticleAPI({ a_id: route.params.aid })
      .then((res) => {
        articleData.title = res.data.title;
        articleData.content = res.data.content;
        articleData.look_num = res.data.look_num;
        articleData.collection_num = res.data.collection_num;
        articleData.created_time = res.data.created_at;
        articleData.label_id = res.data.label_id;
        articleData.label_name = res.data.label_name;
        articleData.user_id = res.data.user_id;
        articleData.user_name = res.data.user_name;
        articleData.user_email = res.data.user_email;
        articleData.user_profile_photo = res.data.user_profile_photo;
        articleData.user_follow_num = res.data.user_follow_num;
        articleData.user_fans_num = res.data.user_fans_num;
        articleData.user_article_num = res.data.user_article_num;
        articleData._comment = res.data.comment_data;
        console.log(articleData._comment[0]);
      })
      .catch((err) => {
        //文章不存在或删除
        console.log(err.msg);
      });
    onUpdated(() => {
      store.commit("cancelSubmitload");
      Prism.highlightAll();
    });
    return {
      articleData,
      viewStatus,
      openReply,
    };
  },
};
</script>

<style lang="scss">
@media screen and (min-width: 900px) {
  .article {
    //@@debug/00001
    .article-left {
      //@@debug/00002
      .user-info {
        font-size: 15px;
        color: $fontcolor;
        font-family: "Monaco";
        height: 190px;
        background-color: $themecolor;
        border-radius: 10px;
        box-shadow: 0px 0px 5px #000;
        &:hover {
          box-shadow: 0px 0px 10px #000;
        }
        .user-img {
          cursor: pointer;
          padding-top: 10px;
          text-align: center;
          img {
            width: 80px;
            height: 80px;
            border-radius: 50px;
          }
        }
        .user-name,
        .user-email {
          cursor: pointer;
          padding-top: 8px;
          text-align: center;
        }
        .user-relationship {
          ul {
            padding-top: 8px;
            display: flex;
            align-items: center;
            li {
              text-align: center;
              flex: auto;
              &:hover {
                cursor: pointer;
                color: pink;
              }
            }
          }
        }
      }
      .follow-user,
      .collection-article {
        cursor: pointer;
        margin-top: 5px;
        font-size: 15px;
        color: $fontcolor;
        font-family: "Monaco";
        height: 28px;
        background-color: $themecolor;
        border-radius: 10px;
        box-shadow: 0px 0px 5px #000;
        text-align: center;
        padding-top: 8px;
        &:hover {
          color: pink;
          box-shadow: 0px 0px 6px #000;
        }
      }
    }
    .article-right {
      //@debug/00003
      .article-main {
        padding: 1px 0px;
        background-color: $themecolor;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #000;
        .article-all {
          width: 52vw;
          padding: 10px;
          //@error/@back
          margin: 15px auto 15px auto;
          background-color: #eeeeee;
          border-radius: 10px;
          box-shadow: 0px 0px 10px #000;

          .article-title {
            margin: 20px 0px;
            font-family: "Monaco";
            font-size: 26px;
            text-align: center;
            font-weight: 600;
          }
          .article-info {
            margin: 20px 0px;
            ul {
              margin: 0 auto;
              padding: 0px 10px;
              font-family: "Monaco";
              border: 2px solid $subcolorOne;
              border-radius: 10px;
              display: flex;
              align-items: center;
              li {
                padding: 4px 2px 4px 2px;
                margin: 5px;
                font-size: 14px;
                text-align: center;
                i {
                  font-weight: 500;
                }
              }
              li:nth-child(3) {
                i {
                  font-size: 20px;
                }
              }
              li:nth-child(4) {
                cursor: pointer;
                background-color: $themecolor;
                border-radius: 5px;
                color: $fontcolor;
                &:hover {
                  color: pink;
                }
              }
              li:nth-child(5) {
                text-align: right;
                flex: 1;
              }
            }
          }
        }
        //@@at-root/@@图片
        .article-content {
          //自定义start
          font-family: "Monaco";
          ul {
            padding-left: 30px;
            list-style-position: outside;
            li {
              list-style: square;
            }
          }
          ol {
            padding-left: 30px;
            list-style-position: outside;
            li {
              list-style: decimal;
            }
          }
          hr {
            border: 1px solid #4d4d4d;
            box-shadow: 0px 0px 5px #000;
          }
          blockquote {
            background: #f9f9f9;
            border-left: 10px solid rgba(51, 51, 51, 0.9);
            margin: 1em 10px;
            padding: 0.5em 10px;
            quotes: "\201C""\201D""\2018""\2019";
            &:before {
              color: rgba(51, 51, 51, 0.9);
              content: open-quote;
              font-size: 2em;
              line-height: 0.1em;
              vertical-align: -0.4em;
            }
            p {
              display: inline;
            }
          }
          p {
            margin: 5px 0px;
            border: 0px;
            padding: 0px;
            font-size: 16px;
          }
          h2 {
            font-size: 22px;
            margin: 12px 0px;
            border: 0px;
            padding: 0px;
            font-weight: bolder;
          }
          h3 {
            font-size: 18px;
            margin: 10px 0px;
            border: 0px;
            padding: 0px;
            font-weight: bolder;
          }
          img {
            margin: 10px 0px;
            height: auto;
            max-width: 100%;
            border-radius: 5px;
            box-shadow: 0px 0px 10px #000;
          }
          //自定义end
          //prism css
          code[class*="language-"],
          pre[class*="language-"] {
            color: #ccc;
            background: none;
            font-family: "Monaco", "Andale Mono", "Ubuntu Mono", monospace;
            font-size: 14px;
            text-align: left;
            white-space: pre;
            word-spacing: normal;
            word-break: normal;
            word-wrap: normal;
            line-height: 1.5;
            -moz-tab-size: 4;
            -o-tab-size: 4;
            tab-size: 4;
            -webkit-hyphens: none;
            -moz-hyphens: none;
            -ms-hyphens: none;
            hyphens: none;
          }
          pre[class*="language-"] {
            padding: 1em;
            margin: 0.5em 0;
            overflow: auto;
          }
          :not(pre) > code[class*="language-"],
          pre[class*="language-"] {
            background: #2d2d2d;
            border-radius: 10px;
          }
          :not(pre) {
            & > code[class*="language-"] {
              padding: 0.1em;
              border-radius: 0.3em;
              white-space: normal;
            }
          }
          .token.comment,
          .token.block-comment,
          .token.prolog,
          .token.doctype,
          .token.cdata {
            color: #999;
          }
          .token {
            &.punctuation {
              color: #ccc;
            }
            &.function-name {
              color: #6196cc;
            }
            &.italic {
              font-style: italic;
            }
            &.entity {
              cursor: help;
            }
            &.inserted {
              color: green;
            }
          }
          .token.tag,
          .token.attr-name,
          .token.namespace,
          .token.deleted {
            color: #e2777a;
          }
          .token.boolean,
          .token.number,
          .token.function {
            color: #f08d49;
          }
          .token.property,
          .token.class-name,
          .token.constant,
          .token.symbol {
            color: #f8c555;
          }
          .token.selector,
          .token.important,
          .token.atrule,
          .token.keyword,
          .token.builtin {
            color: #cc99cd;
          }
          .token.string,
          .token.char,
          .token.attr-value,
          .token.regex,
          .token.variable {
            color: #7ec699;
          }
          .token.operator,
          .token.entity,
          .token.url {
            color: #67cdcc;
          }
          .token.important,
          .token.bold {
            font-weight: bold;
          }
          pre[class*="language-"].line-numbers {
            position: relative;
            padding-left: 3.8em;
            counter-reset: linenumber;
            & > code {
              position: relative;
              white-space: inherit;
            }
          }
          .line-numbers {
            .line-numbers-rows {
              position: absolute;
              pointer-events: none;
              top: 0;
              font-size: 100%;
              left: -3.8em;
              width: 3em;
              letter-spacing: -1px;
              border-right: 1px solid #999;
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
            }
          }
          .line-numbers-rows {
            & > span {
              display: block;
              counter-increment: linenumber;
              &:before {
                content: counter(linenumber);
                color: #999;
                display: block;
                padding-right: 0.8em;
                text-align: right;
              }
            }
          }
          span {
            &.inline-color-wrapper {
              background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyIDIiPjxwYXRoIGZpbGw9ImdyYXkiIGQ9Ik0wIDBoMnYySDB6Ii8+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0wIDBoMXYxSDB6TTEgMWgxdjFIMXoiLz48L3N2Zz4=");
              background-position: center;
              background-size: 110%;
              display: inline-block;
              height: 1.333ch;
              width: 1.333ch;
              margin: 0 0.333ch;
              box-sizing: border-box;
              border: 1px solid white;
              outline: 1px solid rgba(0, 0, 0, 0.5);
              overflow: hidden;
            }
            &.inline-color {
              display: block;
              height: 120%;
              width: 120%;
            }
          }
          div {
            &.code-toolbar {
              position: relative;
              & > .toolbar {
                position: absolute;
                top: 0.3em;
                right: 0.2em;
                transition: opacity 0.3s ease-in-out;
                opacity: 0;
                .toolbar-item {
                  display: inline-block;
                }
                a {
                  cursor: pointer;
                }
                button {
                  background: none;
                  border: 0;
                  color: inherit;
                  font: inherit;
                  line-height: normal;
                  overflow: visible;
                  padding: 0;
                  -webkit-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                }
              }
              &:hover {
                & > .toolbar {
                  opacity: 1;
                }
              }
              &:focus-within {
                & > .toolbar {
                  opacity: 1;
                }
              }
            }
          }
          div.code-toolbar > .toolbar a,
          div.code-toolbar > .toolbar button,
          div.code-toolbar > .toolbar span {
            color: #bbb;
            font-size: 0.8em;
            padding: 0 0.5em;
            background: #f5f2f0;
            background: rgba(224, 224, 224, 0.2);
            box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.2);
            border-radius: 0.5em;
          }
          div.code-toolbar > .toolbar a:hover,
          div.code-toolbar > .toolbar a:focus,
          div.code-toolbar > .toolbar button:hover,
          div.code-toolbar > .toolbar button:focus,
          div.code-toolbar > .toolbar span:hover,
          div.code-toolbar > .toolbar span:focus {
            color: inherit;
            text-decoration: none;
          }
        }
      }
    }
    .article-comment {
      float: right;

      color: $fontcolor;
      font-family: "Monaco";
      // height: 500px;
      margin: 5px 0px;
      background-color: $themecolor;
      border-radius: 10px;
      box-shadow: 0px 0px 10px #000;
      padding: 1vw 1vw;
      .write-comment {
        background-color: transparent;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #000;
        padding: 10px;
        .tips {
          line-height: 35px;
          height: 35px;
          text-align: center;
          background-color: transparent;
          border-radius: 5px;
          box-shadow: 0px 0px 10px #000;
          margin-bottom: 10px;
        }
        .content {
          margin-bottom: 10px;
          textarea {
            font-size: 16px;
            color: $fontcolor;
            font-family: "Monaco";
            width: 100%;
            height: 100px;
            resize: none;
            background-color: transparent;
            border-radius: 5px;
            border-style: none;
            box-shadow: 0px 0px 10px #000;
            &:hover {
              box-shadow: 0px 0px 15px #000;
            }
          }
        }
        .sub-content {
          cursor: pointer;
          width: 80px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background-color: transparent;
          border-radius: 5px;
          box-shadow: 0px 0px 5px #000;
          &:hover {
            color: pink;
            box-shadow: 0px 0px 10px #000;
          }
        }
      }
      .comment-content {
        margin-top: 10px;
        background-color: transparent;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #000;
        padding: 10px;
        .comment-user-img {
          img {
            cursor: pointer;
            width: 50px;
            height: 50px;
            border-radius: 30px;
          }
        }
        .comment-user-info {
          height: 0px;
          position: relative;
          bottom: 35px;
          left: 55px;
          span {
            padding: 0px 5px;
            &:nth-child(2) {
              cursor: pointer;
              &:hover {
                color: pink;
              }
            }
          }
        }
        .comment-text {
          margin: 10px 0px;
          word-wrap: break-word;
          word-break: normal;
        }
        .comment-reply {
          text-align: right;
          margin-bottom: 5px;
          span {
            padding-left: 5px;
            i {
              cursor: pointer;
              font-size: 25px;
              &:hover {
                color: pink;
              }
            }
          }
        }
        .reply-content {
          margin: 10px 0px 0px 0px;
          font-size: 14px;
          background-color: transparent;
          border-radius: 10px;
          box-shadow: 0px 0px 10px #000;
          padding: 10px;
          .reply-user-img {
            img {
              cursor: pointer;
              width: 40px;
              height: 40px;
              border-radius: 20px;
            }
          }
          .reply-user-info {
            position: relative;
            bottom: 35px;
            left: 45px;
            height: 0px;
            i {
              font-size: 14px;
            }
            label {
              padding: 0px 5px;
              color: pink;
            }
            span {
              padding: 0px 5px;
              &:nth-child(2),
              &:nth-child(5) {
                cursor: pointer;
                &:hover {
                  color: pink;
                }
              }
            }
          }
          .reply-text {
            margin: 5px 0px;
            word-wrap: break-word;
            word-break: normal;
          }
          .reply-reply {
            text-align: right;
            margin-bottom: 5px;
            span {
              padding-left: 3px;
              i {
                cursor: pointer;
                font-size: 22px;
                &:hover {
                  color: pink;
                }
              }
            }
          }
        }
        .new-reply {
          height: 130px;
          margin: 10px 0px 0px 0px;
          font-size: 14px;
          background-color: transparent;
          border-radius: 10px;
          box-shadow: 0px 0px 10px #000;
          padding: 10px;
          .tips {
            span {
              &:nth-child(2) {
                cursor: pointer;
                &:hover {
                  color: pink;
                }
              }
            }
          }
          .content {
            textarea {
              margin-top: 10px;
              font-size: 14px;
              color: $fontcolor;
              font-family: "Monaco";
              width: 100%;
              height: 60px;
              resize: none;
              background-color: transparent;
              border-radius: 5px;
              border-style: none;
              box-shadow: 0px 0px 10px #000;
              &:hover {
                box-shadow: 0px 0px 15px #000;
              }
            }
          }
          .sub {
            margin-top: 10px;
            span {
              margin-right: 5px;
              float: left;
              display: block;
              cursor: pointer;
              width: 80px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              background-color: transparent;
              border-radius: 5px;
              box-shadow: 0px 0px 5px #000;
              &:hover {
                color: pink;
                box-shadow: 0px 0px 10px #000;
              }
            }
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1400px) {
  .article {
    //@@debug/00001
    width: 70vw;
    margin: 70px 15vw 0px 15vw;
    .article-left {
      //@@debug/00002
      float: left;
      width: 14vw;
      margin-right: 1vw;
    }
    .article-right {
      //@debug/00003
      width: 55vw;
      float: right;
    }
    .article-comment {
      width: 53vw;
    }
  }
}
@media screen and (min-width: 900px) and (max-width: 1399px) {
  .article {
    //@@debug/00001
    width: 85vw;
    margin: 70px 7.5vw 0px 7.5vw;
    .article-left {
      //@@debug/00002
      float: left;
      width: 19vw;
      margin-right: 1vw;
    }
    .article-right {
      //@debug/00003
      width: 65vw;
      float: right;
      .article-main {
        .article-all {
          width: 60vw;
        }
      }
    }
    .article-comment {
      width: 63vw;
    }
  }
}
@media screen and (max-width: 899px) {
  .article {
    width: 100vw;
    margin: 60px 0vw 0px 0vw;
    .article-left {
      width: 100vw;
      .user-info {
        ///////丑
        margin-top: 5px;
        font-size: 14px;
        color: $fontcolor;
        font-family: "Monaco";
        height: 120px;
        background-color: $themecolor;
        border-radius: 10px;
        box-shadow: 0px 0px 5px #000;
        &:hover {
          box-shadow: 0px 0px 10px #000;
        }
        .user-img {
          cursor: pointer;
          padding-top: 10px;
          padding-left: 10px;
          text-align: left;
          img {
            width: 60px;
            height: 60px;
            border-radius: 30px;
          }
        }
        .user-name {
          width: 150px;
          height: 0px;
          left: 80px;
          position: relative;
          bottom: 50px;
          cursor: pointer;
          text-align: left;
        }
        .user-email {
          width: 150px;
          left: 80px;
          height: 0px;
          position: relative;
          bottom: 30px;
          cursor: pointer;
          text-align: left;
        }
        .user-relationship {
          ul {
            padding-top: 8px;
            display: flex;
            align-items: center;
            li {
              text-align: center;
              flex: auto;
              &:hover {
                cursor: pointer;
                color: pink;
              }
            }
          }
        }
      }
      .follow-user,
      .collection-article {
        margin-top: 2px;
        cursor: pointer;
        font-size: 15px;
        color: $fontcolor;
        font-family: "Monaco";
        height: 20px;
        line-height: 10px;
        background-color: $themecolor;
        border-radius: 5px;
        box-shadow: 0px 0px 8px #000;
        text-align: center;
        padding-top: 8px;
        &:hover {
          color: pink;
          box-shadow: 0px 0px 10px #000;
        }
      }
    }
    .article-right {
      width: 100vw;
      .article-main {
        padding: 1px 0px;
        background-color: $themecolor;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #000;
        .article-all {
          width: 95vw;
          padding: 2px;
          margin: 5px auto 5px auto;
          background-color: #eeeeee;
          border-radius: 10px;
          box-shadow: 0px 0px 10px #000;
          .article-title {
            margin: 10px 0px;
            font-family: "Monaco";
            font-size: 24px;
            font-weight: 600;
            text-align: center;
          }
          .article-info {
            margin: 5px 0px;
            ul {
              margin: 0 auto;
              padding: 0px 5px;
              font-family: "Monaco";
              border: 2px solid $subcolorOne;
              border-radius: 10px;
              display: flex;
              align-items: center;
              li {
                padding: 5px 0px;
                flex: auto;
                margin: 0px;
                font-size: 12px;
                text-align: center;
                i {
                  font-size: 12px;
                  font-weight: 500;
                }
              }
              li:nth-child(3) {
                i {
                  font-size: 14px;
                }
              }
              li:nth-child(4) {
                cursor: pointer;
                background-color: $themecolor;
                border-radius: 5px;
                color: $fontcolor;
                &:hover {
                  color: pink;
                }
              }
              li:nth-child(5) {
                display: none;
              }
            }
          }
        }

        .article-content {
          //自定义start
          font-family: "Monaco";
          ul {
            //手机字体size
            font-size: 15px;
            padding-left: 30px;
            list-style-position: outside;
            li {
              list-style: square;
            }
          }
          ol {
            //手机字体size
            font-size: 15px;
            padding-left: 30px;
            list-style-position: outside;
            li {
              list-style: decimal;
            }
          }
          hr {
            border: 1px solid #4d4d4d;
            box-shadow: 0px 0px 5px #000;
          }
          blockquote {
            background: #f9f9f9;
            border-left: 10px solid rgba(51, 51, 51, 0.9);
            margin: 1em 10px;
            padding: 0.5em 10px;
            quotes: "\201C""\201D""\2018""\2019";
            &:before {
              color: rgba(51, 51, 51, 0.9);
              content: open-quote;
              font-size: 2em;
              line-height: 0.1em;
              vertical-align: -0.4em;
            }
            p {
              display: inline;
            }
          }
          p {
            margin: 5px 0px;
            border: 0px;
            padding: 0px;
            //手机字体size
            font-size: 15px;
          }
          h2 {
            //手机字体size
            font-size: 20px;
            margin: 12px 0px;
            border: 0px;
            padding: 0px;
            font-weight: bolder;
          }
          h3 {
            //手机字体size
            font-size: 16px;
            margin: 10px 0px;
            border: 0px;
            padding: 0px;
            font-weight: bolder;
          }
          img {
            margin: 10px 0px;
            height: auto;
            max-width: 100%;
            border-radius: 5px;
            box-shadow: 0px 0px 5px #000;
          }
          //自定义end
          //prism css
          code[class*="language-"],
          pre[class*="language-"] {
            color: #ccc;
            background: none;
            font-family: "Monaco", "Andale Mono", "Ubuntu Mono", monospace;
            font-size: 14px;
            text-align: left;
            white-space: pre;
            word-spacing: normal;
            word-break: normal;
            word-wrap: normal;
            line-height: 1.5;
            -moz-tab-size: 4;
            -o-tab-size: 4;
            tab-size: 4;
            -webkit-hyphens: none;
            -moz-hyphens: none;
            -ms-hyphens: none;
            hyphens: none;
          }
          pre[class*="language-"] {
            padding: 1em;
            margin: 0.5em 0;
            overflow: auto;
          }
          :not(pre) > code[class*="language-"],
          pre[class*="language-"] {
            background: #2d2d2d;
            border-radius: 10px;
          }
          :not(pre) {
            & > code[class*="language-"] {
              padding: 0.1em;
              border-radius: 0.3em;
              white-space: normal;
            }
          }
          .token.comment,
          .token.block-comment,
          .token.prolog,
          .token.doctype,
          .token.cdata {
            color: #999;
          }
          .token {
            &.punctuation {
              color: #ccc;
            }
            &.function-name {
              color: #6196cc;
            }
            &.italic {
              font-style: italic;
            }
            &.entity {
              cursor: help;
            }
            &.inserted {
              color: green;
            }
          }
          .token.tag,
          .token.attr-name,
          .token.namespace,
          .token.deleted {
            color: #e2777a;
          }
          .token.boolean,
          .token.number,
          .token.function {
            color: #f08d49;
          }
          .token.property,
          .token.class-name,
          .token.constant,
          .token.symbol {
            color: #f8c555;
          }
          .token.selector,
          .token.important,
          .token.atrule,
          .token.keyword,
          .token.builtin {
            color: #cc99cd;
          }
          .token.string,
          .token.char,
          .token.attr-value,
          .token.regex,
          .token.variable {
            color: #7ec699;
          }
          .token.operator,
          .token.entity,
          .token.url {
            color: #67cdcc;
          }
          .token.important,
          .token.bold {
            font-weight: bold;
          }
          pre[class*="language-"].line-numbers {
            position: relative;
            padding-left: 3.8em;
            counter-reset: linenumber;
            & > code {
              position: relative;
              white-space: inherit;
            }
          }
          .line-numbers {
            .line-numbers-rows {
              position: absolute;
              pointer-events: none;
              top: 0;
              font-size: 100%;
              left: -3.8em;
              width: 3em;
              letter-spacing: -1px;
              border-right: 1px solid #999;
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
            }
          }
          .line-numbers-rows {
            & > span {
              display: block;
              counter-increment: linenumber;
              &:before {
                content: counter(linenumber);
                color: #999;
                display: block;
                padding-right: 0.8em;
                text-align: right;
              }
            }
          }
          span {
            &.inline-color-wrapper {
              background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyIDIiPjxwYXRoIGZpbGw9ImdyYXkiIGQ9Ik0wIDBoMnYySDB6Ii8+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0wIDBoMXYxSDB6TTEgMWgxdjFIMXoiLz48L3N2Zz4=");
              background-position: center;
              background-size: 110%;
              display: inline-block;
              height: 1.333ch;
              width: 1.333ch;
              margin: 0 0.333ch;
              box-sizing: border-box;
              border: 1px solid white;
              outline: 1px solid rgba(0, 0, 0, 0.5);
              overflow: hidden;
            }
            &.inline-color {
              display: block;
              height: 120%;
              width: 120%;
            }
          }
          div {
            &.code-toolbar {
              position: relative;
              & > .toolbar {
                position: absolute;
                top: 0.3em;
                right: 0.2em;
                transition: opacity 0.3s ease-in-out;
                opacity: 0;
                .toolbar-item {
                  display: inline-block;
                }
                a {
                  cursor: pointer;
                }
                button {
                  background: none;
                  border: 0;
                  color: inherit;
                  font: inherit;
                  line-height: normal;
                  overflow: visible;
                  padding: 0;
                  -webkit-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                }
              }
              &:hover {
                & > .toolbar {
                  opacity: 1;
                }
              }
              &:focus-within {
                & > .toolbar {
                  opacity: 1;
                }
              }
            }
          }
          div.code-toolbar > .toolbar a,
          div.code-toolbar > .toolbar button,
          div.code-toolbar > .toolbar span {
            color: #bbb;
            font-size: 0.8em;
            padding: 0 0.5em;
            background: #f5f2f0;
            background: rgba(224, 224, 224, 0.2);
            box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.2);
            border-radius: 0.5em;
          }
          div.code-toolbar > .toolbar a:hover,
          div.code-toolbar > .toolbar a:focus,
          div.code-toolbar > .toolbar button:hover,
          div.code-toolbar > .toolbar button:focus,
          div.code-toolbar > .toolbar span:hover,
          div.code-toolbar > .toolbar span:focus {
            color: inherit;
            text-decoration: none;
          }
        }
      }
    }
    .article-comment {
      //@at-root
      width: 98vw;
      color: $fontcolor;
      font-family: "Monaco";
      margin: 5px 0px;
      background-color: $themecolor;
      border-radius: 10px;
      box-shadow: 0px 0px 10px #000;
      padding: 1vw 1vw;
      .write-comment {
        background-color: transparent;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #000;
        padding: 5px;
        .tips {
          font-size: 14px;
          line-height: 35px;
          height: 35px;
          text-align: center;
          background-color: transparent;
          border-radius: 5px;
          box-shadow: 0px 0px 10px #000;
          margin-bottom: 5px;
          i {
            font-size: 14px;
          }
          padding-left: 2px;
        }
        .content {
          margin-bottom: 5px;
          textarea {
            font-size: 16px;
            color: $fontcolor;
            font-family: "Monaco";
            width: 98%;
            height: 100px;
            resize: none;
            background-color: transparent;
            border-radius: 5px;
            border-style: none;
            box-shadow: 0px 0px 10px #000;
            &:hover {
              box-shadow: 0px 0px 15px #000;
            }
          }
        }
        .sub-content {
          font-size: 14px;
          cursor: pointer;
          width: 80px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background-color: transparent;
          border-radius: 5px;
          box-shadow: 0px 0px 5px #000;
          i {
            font-size: 14px;
          }
          &:hover {
            color: pink;
            box-shadow: 0px 0px 10px #000;
          }
        }
      }

      .comment-content {
        margin-top: 10px;
        background-color: transparent;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #000;
        padding: 10px;
        .comment-user-img {
          img {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 20px;
          }
        }
        .comment-user-info {
          font-size: 14px;
          width: 300px;
          height: 0px;
          position: relative;
          bottom: 30px;
          left: 45px;
          span {
            padding: 0px 5px;
            &:nth-child(2) {
              cursor: pointer;
              &:hover {
                color: pink;
              }
            }
          }
        }
        .comment-text {
          font-size: 14px;
          margin: 10px 0px;
          word-wrap: break-word;
          word-break: normal;
        }
        .comment-reply {
          text-align: right;
          margin-bottom: 5px;
          span {
            padding-left: 5px;
            i {
              cursor: pointer;
              font-size: 25px;
              &:hover {
                color: pink;
              }
            }
          }
        }
        .reply-content {
          margin: 5px 0px 0px 0px;
          background-color: transparent;
          border-radius: 10px;
          box-shadow: 0px 0px 10px #000;
          padding: 10px;
          .reply-user-img {
            img {
              cursor: pointer;
              width: 30px;
              height: 30px;
              border-radius: 15px;
            }
          }
          .reply-user-info {
            font-size: 12px;
            width: 300px;
            position: relative;
            bottom: 30px;
            left: 35px;
            height: 0px;
            i {
              font-size: 14px;
            }
            label {
              padding: 0px 5px;
              color: pink;
            }
            span {
              padding: 0px 5px;
              &:nth-child(2),
              &:nth-child(5) {
                cursor: pointer;
                &:hover {
                  color: pink;
                }
              }
            }
          }
          .reply-text {
            font-size: 12px;
            margin: 5px 0px;
            word-wrap: break-word;
            word-break: normal;
          }
          .reply-reply {
            text-align: right;
            margin-bottom: 5px;
            span {
              padding-left: 3px;
              i {
                cursor: pointer;
                font-size: 22px;
                &:hover {
                  color: pink;
                }
              }
            }
          }
        }
        .new-reply {
          height: 125px;
          margin: 10px 0px 0px 0px;
          font-size: 14px;
          background-color: transparent;
          border-radius: 10px;
          box-shadow: 0px 0px 10px #000;
          padding: 10px;
          .tips {
            font-size: 14px;
            span {
              &:nth-child(2) {
                padding-left: 2px;
                cursor: pointer;
                &:hover {
                  color: pink;
                }
              }
            }
            i {
              font-size: 14px;
            }
          }
          .content {
            textarea {
              margin-top: 10px;
              font-size: 16px;
              color: $fontcolor;
              font-family: "Monaco";
              width: 98%;
              height: 60px;
              resize: none;
              background-color: transparent;
              border-radius: 5px;
              border-style: none;
              box-shadow: 0px 0px 10px #000;
              &:hover {
                box-shadow: 0px 0px 15px #000;
              }
            }
          }
          .sub {
            font-size: 14px;
            margin-top: 10px;
            span {
              margin-right: 5px;
              float: left;
              display: block;
              cursor: pointer;
              width: 70px;
              height: 27px;
              line-height: 27px;
              text-align: center;
              background-color: transparent;
              border-radius: 5px;
              box-shadow: 0px 0px 5px #000;
              i {
                font-size: 14px;
              }
              &:hover {
                color: pink;
                box-shadow: 0px 0px 10px #000;
              }
            }
          }
        }
      }
    }
  }
}
</style>
