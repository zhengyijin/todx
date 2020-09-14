<!--
 * @Author: 郑义进
 * @Date: 2020-06-01 15:50:08
 * @LastEditTime: 2020-06-11 07:52:34
 * @LastEditors:  
 * @Description: 班组招募信息搜集添加项目业绩展示
 * @FilePath: \lwbzzm-frontend\src\components\projectItem.vue
--> 
<template>
  <div class="project-item">
    <van-row class="padding16" v-for="(item,index) in projectList" :key="index">
      <van-row>
        <van-col span="2">
          <van-image :src="require('../../assets/image/fa-map-pin.png')" class="img-class" />
        </van-col>
        <van-col span="21">{{item.projectNameItem}}</van-col>
        <van-col span="1" v-if="delect">
          <van-icon name="close" color="red" @click="delectItem(index,item.images,item.id)" />
        </van-col>
      </van-row>
      <van-row>
        <van-col span="1">.</van-col>
        <van-col span="23" style="color:#999">{{item.projectPlaceItem}}</van-col>
      </van-row>
      <van-row>
        <van-col span="6">施工单位：</van-col>
        <van-col span="18">{{item.constructionOrganizationItem}}</van-col>
      </van-row>
      <van-row>
        <van-col span="6">项目经理：</van-col>
        <van-col span="5">{{item.PMItem}}</van-col>
        <van-col span="5">电话：</van-col>
        <van-col span="8">{{item.PMPhoneItem}}</van-col>
      </van-row>
      <van-row>
        <van-col span="6">合同金额：</van-col>
        <van-col span="18">￥{{item.contractMoney}}</van-col>
      </van-row>
      <van-row gutter="20">
        <van-col span="8" class="img_box" v-for="(item2,index1) of item.images" :key="index1">
          <img :src="item2.url" alt @click="getImg(item.images,index1)" style="max-width:100%" />
        </van-col>
      </van-row>
    </van-row>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  props: {
    projectList: {
      type: Array
    },
    delectShow: {
      default: false
    },
    delect: {
      default: true
    }
  },

  data() {
    return {
      show: false,
      index: 0,
      imageList: []
    };
  },

  computed: {},
  methods: {
    //删除项目
    delectItem(index, images, id) {
      this.$emit("removeItem", { index, images, id });
    },

    getImg(images, index) {
      let list = images.map(item => item.url);

      ImagePreview({
        images: list,
        showIndex: true,
        loop: true,
        startPosition: index
      });
    }
  }
};
</script>

<style lang="less" scoped>
.project-item {
  font-size: 14px;
  .padding16 {
    padding-left: 16px;
    padding-right: 16px;
    margin-bottom: 1rem;
    background: #dfdfdf;
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .image-class {
    margin-right: 10px;
  }

  .img-class {
    width: 20px;
  }

  .img_box {
    margin-top: 15px;
    img {
      height: 100px;
      width: 100px;
    }
  }
}
</style>