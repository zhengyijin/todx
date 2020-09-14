<!--
 * @Author: 郑义进
 * @Date: 2020-06-02 20:40:11
 * @LastEditTime: 2020-06-03 08:52:32
 * @LastEditors: Please set LastEditors
 * @Description: 登录注册页面
 * @FilePath: \lwbzzm-frontend\src\views\register.vue
--> 

<template>
  <div class="register">
    <van-nav-bar title="登录" left-text left-arrow @click-left="onClickLeft" />

    <van-row>
      <van-col span="10">
        <img :src="require('../assets/logo.png')" alt />
      </van-col>
      <van-col span="10">
        <van-row>
          <h3>敏捷劳务</h3>
        </van-row>
        <van-row>
          <h4>敏捷劳务招标信息发布平台</h4>
        </van-row>
      </van-col>
    </van-row>

    <van-field
      v-model="sms"
      center
      label-class="input-class"
      class="field-input-class"
      clearable
      label="验证码"
      placeholder="请输入验证码"
      style="padding-left: 0"
    >
      <template #label>
        <van-dropdown-menu>
          <van-dropdown-item v-model="phoneType" :options="phoneList" />
        </van-dropdown-menu>
      </template>
    </van-field>

    <van-field
      v-model="sms"
      center
      label-class="input-class"
      class="field-input-class"
      clearable
      label="验证码"
      placeholder="请输入验证码"
    >
      <template #button>
        <van-button size="small" class="button-class" type="primary">获取验证码</van-button>
      </template>
    </van-field>

    <van-row>温馨提示：未注册XX账号的手机号，登录时将自动注册</van-row>

    <van-row class="submit-class">
      <van-button type="primary" block color="#20A0B8">提交</van-button>
    </van-row>
  </div>
</template>

<script>
import mixin from "../assets/static/mixin";
export default {
  mixins: [mixin],
  data() {
    return {
      sms: "", //验证码
      phoneType: "86", //国码
      phoneList: [
        { text: "+86", value: "86" },
        { text: "+886", value: "886" }
      ]
    };
  }
};
</script>

<style scoped lang="less">
.register {
  .input-class {
    background-color: #333;
    height: 100%;
    line-height: 3rem;
  }

  .select-class {
    border: none;
    background-color: #f2f2f2;
  }

  .field-input-class {
    background-color: #f2f2f2;
    margin-bottom: 1rem;
    padding: 0px 0px 0px 16px;
    height: 3rem;
  }

  .button-class {
    height: 3rem;
    width: 6rem;
  }
}
</style>

<style lang="less">
.register {
  .van-dropdown-menu__bar {
    background: #f2f2f2;
    box-shadow: none;
  }
}
</style>