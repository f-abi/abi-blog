<template>
<div class="silder-check">
  <div class="silder-check-content" :class="silderInfo.status ? 'silder-check-success' : ''">
    <i class="iconfont" :class="silderInfo.reset ? 'reset-i' : ''" @mousedown="blockMovePc" v-if="!silderInfo.isMobile" v-html="silderInfo.status ? resIcon : initIcon"></i>
    <i class="iconfont" :class="silderInfo.reset ? 'reset-i' : ''" @touchstart="blockMoveMobile" v-if="silderInfo.isMobile" v-html="silderInfo.status ? resIcon : initIcon"></i>
    {{ silderInfo.status ? resText : initText }}
  </div>
</div>
</template>

<script>
import {
  reactive
} from "vue";
export default {
  name: "AbiSilder",
  props: {
    resFun: {
      type: Function,
    },
    errFun: {
      type: Function,
    },
    initIcon: {
      type: String,
      default: "&#xe66d;",
    },
    initText: {
      type: String,
      default: "请向右滑动验证",
    },
    resIcon: {
      type: String,
      default: "&#xe75a;",
    },
    resText: {
      type: String,
      default: "验证成功",
    },
  },
  setup(props) {
    let silderInfo = reactive({
      nowXposition: 0,
      status: false,
      isMobile: navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      ),
      reset: false,
    });
    const blockMovePc = (e) => {
      let ele = e.target;
      let initX = e.clientX;
      let eleWidth = ele.offsetWidth;
      let parentWidth = ele.parentElement.offsetWidth;
      let MaxX = parentWidth - eleWidth - 2;
      if (silderInfo.reset) {
        ele.style.transform = "translateX(0)";
        silderInfo.reset = false;
      }
      if (silderInfo.status) {
        //不运行
        return false;
      }
      document.onmousemove = (e) => {
        let endX = e.clientX;
        silderInfo.nowXposition = endX - initX;
        if (silderInfo.nowXposition <= 0) {
          silderInfo.nowXposition = 0;
        }
        if (silderInfo.nowXposition >= MaxX - eleWidth) {
          //减去滑块的宽度,体验效果更好
          silderInfo.nowXposition = MaxX;
        }
        // ele.style.transition = ".1s all";
        ele.style.transform = "translateX(" + silderInfo.nowXposition + "px)";
        e.preventDefault();
      };
      document.onmouseup = () => {
        if (silderInfo.nowXposition !== MaxX) {
          // ele.style.transition = ".1s all";
          ele.style.transform = "translateX(0)";
          //执行失败的函数
          props.errFun && props.errFun();
        } else {
          silderInfo.status = true;
          //执行成功的函数
          props.resFun && props.resFun();
        }
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
    const blockMoveMobile = (e) => {
      let ele = e.target;
      let initX = e.touches[0].clientX;
      let eleWidth = ele.offsetWidth;
      let parentWidth = ele.parentElement.offsetWidth;
      let MaxX = parentWidth - eleWidth - 2;
      if (silderInfo.reset) {
        ele.style.transform = "translateX(0)";
        silderInfo.reset = false;
      }
      document.ontouchmove = (e) => {
        if (!silderInfo.status) {
          let endX = e.touches[0].clientX;
          silderInfo.nowXposition = endX - initX;
          if (silderInfo.nowXposition <= 0) {
            silderInfo.nowXposition = 0;
          }
          if (silderInfo.nowXposition >= MaxX - eleWidth) {
            silderInfo.nowXposition = MaxX;
          }
          // ele.style.transition = ".1s all";
          ele.style.transform = "translateX(" + silderInfo.nowXposition + "px)";
        }
      };
      document.ontouchend = () => {
        if (!silderInfo.status) {
          if (silderInfo.nowXposition !== MaxX) {
            // ele.style.transition = ".1s all";
            ele.style.transform = "translateX(0)";
            props.errFun && props.errFun();
          } else {
            silderInfo.status = true;
            props.resFun && props.resFun();
          }
          document.onmousemove = null;
          document.onmouseup = null;
        }
      };
    };
    const reset = () => {
      silderInfo.status = false;
      silderInfo.nowXposition = 0;
      silderInfo.reset = true;
    };
    return {
      silderInfo,
      blockMovePc,
      blockMoveMobile,
      reset,
    };
  },
};
</script>

<style lang="scss">
@mixin jc-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.silder-check {
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0px 0px 10px #000;

  .silder-check-content {
    background-color: transparent;
    border: 2px solid $subcolorTwo;
    border-radius: 10px;
    position: relative;
    transition: 1s all;
    user-select: none;
    color: $subfontcolorOne;
    @include jc-flex;
    height: 35px;

    /*no*/
    &.silder-check-success {
      background-color: rgb(32, 32, 32);
      color: $subfontcolorOne;

      i {
        color: $subfontcolorOne;
      }
    }

    i {
      font-size: 30px;
      position: absolute;
      left: 0;
      width: 50px;
      /*no*/
      background-color: $themecolor;
      border: 2px solid $subcolorTwo;
      border-radius: 10px;
      box-shadow: 0px 0px 10px #000;
      height: 100%;
      color: #919191;
      cursor: pointer;
      @include jc-flex;
    }

    .reset-i {
      transform: translateX(0) !important;
      transition: 0.2s all;
    }
  }
}
</style>
