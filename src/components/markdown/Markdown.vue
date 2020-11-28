<template>
  <div class="tinymce-editor">
    <editor v-model="articleContent" :init="markdownContent.init" :disabled="disabled" @blur="saveArticleContent"> </editor>
  </div>
</template>

<script>
import "@/utility/prism.js"; //代码高亮
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver";
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/wordcount"; // 字数统计插件
import "tinymce/plugins/fullscreen"; // 全屏插件
import "tinymce/plugins/codesample"; // code插件
// import "tinymce/plugins/preview"; // 预览插件
import "tinymce/plugins/link"; // 链接插件
import "tinymce/plugins/hr"; // hr插件

import "tinymce/icons/default/icons.min.js"; //图标

import { reactive, watch } from "vue";
import { imgUploadRedisAPI } from "@/http/v1/apiV1";
export default {
  name: "Markdown",
  components: {
    Editor,
  },
  props: {
    articleContent: String,
    setArticleContent: Function,
    setImgCacheName: Function,
    saveArticleContent: Function,
    //高度
    height: {
      type: Number,
      default: 300,
    },
    //网址路径
    baseUrl: {
      type: String,
      default: "http://192.168.1.6:8080",
    },
    //是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    //插件
    plugins: {
      type: [String, Array],
      default: "lists image table wordcount fullscreen codesample link hr",
    },
    //工具栏配置
    toolbar: {
      type: [String, Array],
      default: "undo redo | blockquote codesample  link  image table |formatselect| bullist numlist hr bold italic underline strikethrough forecolor backcolor |alignleft aligncenter alignright| removeformat fullscreen",
      // default: "undo redo styleselect bold italic alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
    },
  },
  setup(props) {
    const markdownContent = reactive({
      init: {
        language_url: `${props.baseUrl}/tinymce/langs/zh_CN.js`,
        language: "zh_CN",
        skin_url: `${props.baseUrl}/tinymce/skins/ui/oxide`,
        //如果你希望在经典模式中，编辑区也可以有与周围相同的样式，此选项可以帮你实现。引入一个css文件，实现编辑区css自定义。
        content_css: `${props.baseUrl}/tinymce/code/prism.css`,
        height: props.height,
        branding: false,
        menubar: true,
        plugins: props.plugins,
        toolbar: props.toolbar,
        //使用代码高亮插件
        codesample_global_prismjs: true,
        //拖动图片
        object_resizing: true,
        //设置图片大小
        image_dimensions: true,
        //换行设置
        // force_br_newlines: true,
        // force_p_newlines: true,
        // forced_root_block: "",
        //字体大小
        fontsize_formats: "14px",
        font_formats: "Monaco;",
        block_formats: "Paragraph=p;Header 2=h2;Header 3=h3",
        codesample_languages: [
          {
            text: "HTML/XML",
            value: "markup",
          },
          {
            text: "JavaScript",
            value: "javascript",
          },
          {
            text: "PHP",
            value: "php",
          },
          {
            text: "Python",
            value: "python",
          },
          {
            text: "TypeScript",
            value: "typescript",
          },
          {
            text: "React JSX",
            value: "jsx",
          },
          {
            text: "React TSX",
            value: "tsx",
          },
          {
            text: "Nginx",
            value: "nginx",
          },
          {
            text: "SQL",
            value: "sql",
          },
          {
            text: "CSS",
            value: "css",
          },
          {
            text: "Less",
            value: "less",
          },
          {
            text: "Sass",
            value: "scss",
          },
        ],
        images_upload_handler: (blobInfo, success, failure) => {
          const img = "data:image/jpeg;base64," + blobInfo.base64();
          imgUploadRedisAPI({ img_base: img })
            .then((res) => {
              success(res.data.url);
              props.setImgCacheName(res.data.cache_name);
            })
            .catch((err) => {
              failure("图片上传失败!");
            });
        },
      },
    });
    watch(
      () => props.articleContent,
      (newValue) => {
        props.setArticleContent(newValue);
      }
    );
    return {
      markdownContent,
    };
  },
};
</script>

<style lang="scss"></style>
