<template>
  <div class="img-cilp-mode">
    <div class="img-cilp-mode-content">
      <p>{{ tips }}</p>
      <hr />
      <div class="img-cilp-Preview">预览:</div>
      <div class="img-cilp-cancel" @click="clipCancel">
        <AbiIcon>&#xe604;</AbiIcon>
      </div>
      <div class="previewShow"></div>
      <div class="img-container">
        <img :src="baseSrc" ref="cilpImg" alt="" />
      </div>
      <div class="img-cilp-button" @click="ImgSubmit">确定</div>
    </div>
  </div>
</template>

<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { reactive, ref, onMounted } from "vue";
export default {
  name: "imgClip",
  props: {
    tips: {
      type: String,
      default: "请裁切图片作为封面!",
    },
    baseSrc: {
      type: String,
    },
    clipSubmit: {
      type: Function,
    },
    clipCancel: {
      type: Function,
    },
    aspectRatio: {
      type: Number,
      default: 16 / 9,
    },
  },
  setup(props) {
    const cilpImg = ref(null);
    const myCropper = ref("");
    //提交
    const ImgSubmit = () => {
      props.clipSubmit(
        myCropper.value
          .getCroppedCanvas({
            imageSmoothingQuality: "high",
          })
          .toDataURL("image/jpeg")
      );
    };
    onMounted(() => {
      myCropper.value = new Cropper(cilpImg.value, {
        viewMode: 1,
        dragMode: "none",
        initialAspectRatio: 1,
        aspectRatio: props.aspectRatio,
        preview: ".previewShow",
        background: true,
        autoCropArea: 1,
        zoomOnWheel: false,
      });
    });
    return {
      cilpImg,
      ImgSubmit,
    };
  },
};
</script>

<style lang="scss"></style>
