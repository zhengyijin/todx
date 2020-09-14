<template>
  <div class="zhao-biao-material">
    <!-- <van-nav-bar title="招标公告" left-text left-arrow fixed /> -->
    <div class="noite" v-if="isValid">
      <van-row>
        <van-col class="title">{{title}}</van-col>
      </van-row>
      <van-row class="items">
        <van-col>
          <van-tag color="rgba(234, 161, 83, 1)" class="items-tag">{{attributes}}</van-tag>
        </van-col>
        <van-col>
          <van-tag color="rgba(234, 161, 83, 1)" class="items-tag">{{items}}</van-tag>
        </van-col>
        <van-col>
          <van-tag color="rgba(234, 161, 83, 1)" class="items-tag">{{area}}</van-tag>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between" class="release-date">
        <van-col style="font-size: 14px;color: #888;">敏捷招标</van-col>
        <van-col style="color:#888;font-size: 12px;line-height: 24px;">发布时间：{{releaseDate}}</van-col>
      </van-row>
      <van-row class="description">
        <van-col v-html="changeLine(description)"></van-col>
      </van-row>
      <van-row class="expected-date">
        <van-col>预计招标时间：{{expectedData}}</van-col>
      </van-row>
      <van-row class="end-date">
        <van-col>报名截止时间：{{endDate}}</van-col>
      </van-row>
    </div>
    <div v-else>
      <div class="fail">{{message}}</div>
    </div>

    <van-tabbar class="zhao-biao-bottom" active-color="#07c160" inactive-color="#000">
      <van-tabbar-item class="zhao-biao-bottom-item">
        <van-row>
          <van-col
            class="zhao-biao-bottom-message"
          >如需提交报名信息或了解更多招标详情，请使用电脑访问易门户官网。 http://zbpt.nimble.nc:8081/</van-col>
        </van-row>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { getUrlKey } from "../static/js/public";
import { zhaoBiaoMaterial, signature } from "../request/api";
import { Dialog } from "vant";
import wx from "weixin-js-sdk";
import numMixin from "../assets/static/numMixin";
import wxShare from "../static/js/wxShare";

export default {
  mixins: [numMixin],
  data() {
    return {
      tenderId: "", //阅读ID
      title: "", //公告标题
      attributes: "", //招标属性
      items: "", //招标分项
      area: "", //招标区域
      releaseDate: "", //发布时间
      description: "", //招标说明
      expectedData: "", //预计招标日期
      endDate: "", //报名截止日期
      message: "", //当公告失效时返回的信息
      isValid: false, //公告是否有效
      desc: "", //用于分享的描述
      imgsrc: require("../assets/image/nimblelogol.jpg"),
    };
  },
  created() {
    this.tenderId = getUrlKey("acm_id", window.location.href);
    this.getZhaoBiaoInfo(this.tenderId);
  },

  methods: {
    getZhaoBiaoInfo(data) {
      zhaoBiaoMaterial(data)
        .then((res) => {
          if (res.status == 200 && res.data) {
            this.isValid = true;
            this.title = res.data.title;
            this.attributes = res.data.attributes;
            this.items = res.data.items;
            this.area = res.data.area;
            this.releaseDate = res.data.update_time
              ? res.data.update_time
              : res.data.release_date;
            this.description = res.data.description;
            this.expectedData = res.data.expected_data;
            this.endDate = res.data.end_date;
          } else {
            this.isValid = false;
            this.message = res.message;
          }
        })
        .catch((err) => {
          this.isValid = false;
          this.message = err.message;
        });
    },

    changeLine(str) {
      return str.replace(/\n/g, "</br>");
    },

    getShare() {
      let url = window.location.href.split("#")[0];
      let link = window.location.href;
      let img = this.GLOBAL_CONFIG.shareImg;
      wxShare("材料/工程招标公告", this.title, link, img, url);
    },
  },

  watch: {
    title: "getShare",
  },
};
</script>

<style lang="less" scoped>
.zhao-biao-material {
  font-size: 16px;
  .noite {
    padding-top: 0.5rem;
    padding-bottom: 95px;

    .title {
      font-family: PingFangSC-bold;
      line-height: 1.5;
      font-size: 26px;
      color: rgba(68, 68, 68, 1);
      word-break: break-word;
      font-weight: 900;
      letter-spacing: 0.3px;
    }

    .items {
      margin-top: 10px;
      .items-tag {
        margin-right: 9px;
        padding: 5px 8px;
        font-size: 12px;
        margin-bottom: 7px;
      }
    }

    .release-date {
      margin-top: 21px;
    }

    .description {
      margin-top: 18px;
      font-size: 18px;
      color: rgba(68, 68, 68, 1);
      font-family: PingFangSC-regular;
      line-height: 34px;
      letter-spacing: 0.2px;
    }

    .expected-date {
      margin-top: 30px;
      font-size: 16px;
      line-height: 23px;
      color: rgba(16, 16, 16, 1);
    }

    .end-date {
      font-size: 16px;
      line-height: 23px;
      color: rgba(16, 16, 16, 1);
      margin-bottom: 37px;
    }
  }

  .fail {
    margin-top: 50%;
    padding: 0 2rem;
  }

  .valid-class {
    margin-top: 60%;
    .valid-item {
      font-size: 22px;
      text-align: center;
      padding: 0 1px;
    }
    .btn-class {
      margin-top: 4rem;
      width: 5rem;
      margin-left: 38%;
    }
  }

  .zhao-biao-bottom {
    text-align: center;
    height: 90px;
    .zhao-biao-bottom-item {
      padding-right: 10px;
      padding-left: 10px;
      padding-bottom: 13px;
      .zhao-biao-bottom-message {
        padding-top: 10px;
        color: rgba(140, 139, 139, 1);
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>