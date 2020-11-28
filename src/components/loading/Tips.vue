<template>
  <div
    class="nav-tips"
    :class="store.state.tips.istips ? 'nav-tips-show' : 'nav-tips-hide'"
  >
    <div class="nav-tips-title">
      <AbiIcon v-html="store.state.tips.icon"></AbiIcon>
      {{ store.state.tips.title }}
    </div>
    <div class="nav-tips-cancel" @click="store.commit('cancelTips')">
      <AbiIcon>&#xe604;</AbiIcon>
    </div>
    <hr />
    <div class="nav-tips-text">
      {{ store.state.tips.text }}
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
export default {
  name: "Tips",
  setup(props) {
    const store = useStore();
    return {
      store,
    };
  },
};
</script>

<style lang="scss">
.nav-tips {
  color: $subfontcolorOne;
  position: fixed;
  top: 65px;
  right: -320px;
  width: 300px;
  height: 80px;
  z-index: 1000;
  border-radius: 10px;
  border: 2px solid $themecolor;
  background-color: $themecolor;
  box-shadow: 0px 0px 15px #000;
  .nav-tips-title {
    padding: 10px 0px 2px 10px;
    font-size: 16px;
    i {
      font-size: 16px;
    }
  }
  .nav-tips-cancel {
    cursor: pointer;
    position: absolute;
    top: 10px;
    left: 270px;
    i {
      font-size: 16px;
    }
  }
  hr {
    border: 1px solid $subcolorOne;
    box-shadow: 0px 0px 15px #000;
  }
  .nav-tips-text {
    padding: 5px 10px 0px 10px;
    font-size: 14px;
  }
}
.nav-tips-show {
  transform: translateX(-110%);
  transition: 0.4s ease-in-out;
}
.nav-tips-hide {
  transform: translateX(0%);
  transition: 0.4s ease-in-out;
}
</style>
