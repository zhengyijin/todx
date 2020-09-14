<!--
 * @Description: 我的页面入口
 * @Author: 郑义进 
 * @Date: 2020-06-12 19:37:44
 * @LastEditTime: 2020-06-12 19:52:25
 * @LastEditors:  
--> 
<template>
  <div class="my-order">
    <van-cell title="我的招募信息" class="item-title" is-link @click="jumpUrl('RecruitView')" />
  </div>
</template>
<script>
import {
  GetUserInfo2,
  authorizedLogin,
  getAuthorizedLoginUrl
} from "../request/api";
import { getUrlKey } from "../static/js/public";
import { setToken, removeToken } from "../utils/token";
export default {
  data() {
    return {};
  },
  methods: {
    jumpUrl(url) {
      this.$router.push({ name: url });
    }
  },
  beforeCreate() {
    GetUserInfo2({}).then(res => {
      if (res.status != 200) {
        let code = getUrlKey("code", window.location.href);
        if (code) {
          //微信授权登录
          authorizedLogin(code).then(res => {
            if (res.status == 200) {
              setToken("token", res.data);
            } else {
              Dialog.alert({
                title: "token获取失败",
                message: res.message
              }).then(() => {
                this.$router.go(-1);
              });
            }
          });
        } else {
          //判定用户是否授权
          getAuthorizedLoginUrl("recruitInfo_submit").then(res => {
            if (res.status == 200) {
              window.location.href = res.data;
            } else {
              Dialog.alert({
                title: "授权失败",
                message: res.message
              }).then(() => {
                this.$router.go(-1);
              });
            }
          });
        }
      }
    });
  }
};
</script>

<style lang="less" scoped>
.item-title {
  margin-top: 20px;
  padding-left: 0;
}
</style>