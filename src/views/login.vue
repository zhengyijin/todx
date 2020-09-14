<!--
 * @Description: 
 * @Author: 郑义进 
 * @Date: 2020-06-10 16:47:17
 * @LastEditTime: 2020-06-12 16:13:32
 * @LastEditors:  
--> 

<template>
  <div class="login"></div>
</template>

<script>
import { getStatus } from "../request/api";
import { getUrlKey } from "../static/js/public";
export default {
  data() {
    return {};
  },
  methods: {
    getOrderStatu() {
      getStatus({}).then(res => {
        if (res.data == 1 || res.data == 0) {
          let code = getUrlKey("code", window.location.href);
          if (code) {
            this.$router.push({ name: "RecruitView", params: { code: code } });
          } else {
            this.$router.push({ name: "RecruitView" });
          }
        } else {
          this.$router.push({ name: "Recruit" });
        }
      });
    }
  },

  created() {
    this.getOrderStatu();
  }
};
</script>
<style lang="less" scoped>
.login {
}
</style>