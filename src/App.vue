<!--
 * @Author: 郑义进
 * @Date: 2020-05-31 08:53:28
 * @LastEditTime: 2020-06-05 19:42:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lwbzzm-frontend\src\App.vue
--> 
<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
    <div class="load_cover" v-if="showLoading">
      <van-loading size="24px" vertical>加载中...</van-loading>
    </div>
  </div>
</template>

<style lang="less">
#app {
  padding: 0 10px;
  .van-loading__circular circle {
    stroke-width: 5px;
  }
  .van-loading {
    width: 70px;
    height: 70px;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
  }
  .load_cover {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    z-index: 999;
    position: fixed;
    left: 0;
    top: 0;
  }
}
</style>
<script>
import { mapState } from "vuex";
export default {
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
  computed: {
    ...mapState(["showLoading"]),
  },
};
</script>