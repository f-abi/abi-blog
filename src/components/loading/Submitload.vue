<template>
  <div class="loading-box" v-show="store.state.isSubLoad">
    <div class="loader">
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="loading-tips-text">
      {{ store.state.subLoadTips ? store.state.subLoadTips : "加载中..." }}
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "Submitload",
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
};
</script>

<style lang="scss">
@keyframes box1 {
  0%,
  50% {
    transform: translate(100%, 0);
  }

  100% {
    transform: translate(200%, 0);
  }
}

@keyframes box2 {
  0% {
    transform: translate(0, 100%);
  }

  50% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(100%, 0);
  }
}

@keyframes box3 {
  0%,
  50% {
    transform: translate(100%, 100%);
  }

  100% {
    transform: translate(0, 100%);
  }
}

@keyframes box4 {
  0% {
    transform: translate(200%, 0);
  }

  50% {
    transform: translate(200%, 100%);
  }

  100% {
    transform: translate(100%, 100%);
  }
}

.loading-box {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(65, 64, 64, 0.507);
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  .loader {
    --size: 32px;
    --duration: 800ms;
    width: 96px;
    height: 64px;
    margin: 50px auto;
    transform-style: preserve-3d;
    transform-origin: 50% 50%;
    transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    .box {
      width: 32px;
      height: 32px;
      transform-style: preserve-3d;
      position: absolute;
      top: 0;
      left: 0;

      &:nth-child(1) {
        transform: translate(100%, 0);
        animation: box1 800ms linear infinite;
      }

      &:nth-child(2) {
        transform: translate(0, 100%);
        animation: box2 800ms linear infinite;
      }

      &:nth-child(3) {
        transform: translate(100%, 100%);
        animation: box3 800ms linear infinite;
      }

      &:nth-child(4) {
        transform: translate(200%, 0);
        animation: box4 800ms linear infinite;
      }

      & > div {
        --translateZ: calc(var(--size) / 2);
        --rotateY: 0deg;
        --rotateX: 0deg;
        background: rgb(240, 180, 191);
        width: 100%;
        height: 100%;
        transform: rotateY(var(--rotateY)) rotateX(var(--rotateX)) translateZ(var(--translateZ));
        position: absolute;
        top: auto;
        right: auto;
        bottom: auto;
        left: auto;

        &:nth-child(1) {
          top: 0;
          left: 0;
        }

        &:nth-child(2) {
          background: rgb(255, 151, 168);
          right: 0;
          --rotateY: 90deg;
        }

        &:nth-child(3) {
          background: rgb(151, 79, 92);
          --rotateX: -90deg;
        }

        // &:nth-child(4) {
        //   background: #dddddd;
        //   top: 0;
        //   left: 0;
        //   --translateZ: calc(var(--size) * -2);
        // }
      }
    }
  }

  .loading-tips-text {
    color: #ffffff;
    text-align: center;
    width: 150px;
    height: 30px;
    position: absolute;
    top: 130px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    font-size: 14px;
  }
}
</style>
