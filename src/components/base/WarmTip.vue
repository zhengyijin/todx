<!--
 * @Author: 郑义进
 * @Date: 2020-06-03 09:18:20
 * @LastEditTime: 2020-06-12 11:32:45
 * @LastEditors:  
 * @Description: 班组招募申请状态温馨提示
 * @FilePath: \lwbzzm-frontend\src\components\base\WarmTip.vue
--> 

<template>
  <div class="warm-tip" style="padding-left:16px;padding-right:16px">
    <van-row class="warm-tip-item1">
      <van-col span="2">
        <img :src="require('../../assets/icon/warm.png')" alt />
      </van-col>

      <van-col span="22">
        <span>您提交的供方基本信息被驳回</span>
      </van-col>
    </van-row>
    <van-row class="warm-tip-item2">退回原因：{{reason}}</van-row>
  </div>
</template>
<script>
export default {
  props: {
    reason: {
      default: ""
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.warm-tip {
  margin-top: 1rem;
  .warm-tip-item1 {
    img {
      width: 20px;
    }
  }
  .warm-tip-item2 {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
}
</style>