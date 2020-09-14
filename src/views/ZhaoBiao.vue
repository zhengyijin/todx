<!--
 * @Author: 郑义进
 * @Date: 2020-06-01 20:55:53
 * @LastEditTime: 2020-06-12 11:54:01
 * @LastEditors:  
 * @Description: 招标提交页面
 * @FilePath: \lwbzzm-frontend\src\views\ZhaoBiao.vue
--> 
<template>
  <div class="zhao-biao" id="zhao_biao">
    <van-form v-if="isValid">
      <!-- <van-nav-bar title="招标信息填写" fixed left-text left-arrow /> -->
      <div class="noite">
        <van-row style="margin-top: 16px">
          <h1>{{title}}</h1>
        </van-row>
        <van-row class="lao-wu">
          <label>敏捷劳务</label>
          <span style="margin-left: 1.5rem">{{updateTime}}</span>
        </van-row>
        <van-row class="m-t">
          <van-col span="24">
            <h3>一、招标条件</h3>
          </van-col>
          <van-col span="24">{{biddingConditions}}</van-col>
        </van-row>
        <van-row class="m-t">
          <van-col span="24">
            <h3>二、概况与招标范围</h3>
          </van-col>
          <van-col span="24">项目概况：{{contact}}</van-col>
          <van-col span="24" style="margin-top:1rem">项目地址：{{projectLocation}}</van-col>
          <van-col span="24" style="margin-top:1rem">招标范围：{{extent}}</van-col>
          <van-col span="24" style="margin-top:1rem">承包方式：{{contract}}</van-col>
        </van-row>
        <van-row class="m-t">
          <van-col span="24">
            <h3>三、投标人资格要求</h3>
          </van-col>
          <van-col span="24" v-html="changeLine(seniority)"></van-col>
        </van-row>
        <van-row class="m-t">
          <van-col span="24">
            <h3>四、招标文件发售时间、地点</h3>
          </van-col>
          <van-col span="24">招标报名起始时间：{{begindate}}</van-col>
          <van-col span="24">招标文件发售地点：{{saleplace}}</van-col>
          <van-col span="24">报名截止时间：{{enddate}}</van-col>
        </van-row>
        <van-row class="m-t">
          <van-col span="24">
            <h3>五、投标截止时间、地点</h3>
          </van-col>
          <van-col span="24">投标截止时间：{{bidDeadline}}</van-col>
          <van-col span="24">投标地点：{{tenderPlace}}</van-col>
        </van-row>
        <van-row class="m-t">
          <van-col span="24">
            <h3>六、开标时间、地点</h3>
          </van-col>
          <van-col span="24">开标时间：{{begintime}}</van-col>
          <van-col span="24">开标地点：{{tenderOpening}}</van-col>
        </van-row>
        <van-row class="m-t">
          <van-col span="24">
            <h3>七、联系方式</h3>
          </van-col>
          <van-col span="24" v-if="contractPerson">公司联系人：{{contractPerson}}</van-col>
          <van-col span="24">联系电话：{{linkman}}</van-col>
          <van-col span="24">
            <label>
              （或通过微信关注
              <span style="font-weight:700">“敏捷招标平台”</span>公众号发布信息点击报名，
              <span style="color:red">未入库班组请完善“班组招募”并上传相关资料，以供进行入库审核，方有机会成为待考察单位</span>）
            </label>
          </van-col>
        </van-row>
        <van-tabbar v-if="buttonShow">
          <van-tabbar-item>
            <van-button type="primary" block color="#20A0B8" @click="nowApply()">立即报名</van-button>
          </van-tabbar-item>
        </van-tabbar>
      </div>

      <div class="apply" v-show="isApply" id="apply">
        <div class="van-hairline--bottom van-cell-class">
          <van-field
            v-model="name"
            label="供方姓名"
            placeholder="请输入您的姓名"
            required
            :clearable="true"
            label-width="100%"
            :rules="[{ required: true, message: '请输入您的姓名' }]"
          />
        </div>
        <div class="van-hairline--bottom van-cell-class">
          <van-field
            v-model="pid"
            label="身份证号码"
            placeholder="请输入您的身份号码"
            required
            :clearable="true"
            label-width="100%"
            @change="byPidGetInfo()"
            :rules="[{ required: true, message: '请输入您的身份号码' }]"
          />
        </div>

        <div class="van-hairline--bottom van-cell-class" @click="workTypeShow = true">
          <van-field
            v-model="workTypeName"
            label="工种"
            placeholder="请选择您的班组工种"
            required
            readonly
            label-width="100%"
            :rules="[{ required: true, message: '请选择您的班组工种' }]"
          >
            <template #button>
              <span class="span-class">请选择</span>
            </template>
          </van-field>
        </div>

        <div class="van-hairline--bottom van-cell-class">
          <van-field
            v-model="phone"
            label="手机号码"
            type="tel"
            placeholder="请输入您的手机号码"
            required
            :clearable="true"
            label-width="100%"
            :rules="[{ validator, message: '请输入您的手机号码' }]"
          />
        </div>

        <div class="van-hairline--bottom van-cell-class">
          <van-field
            v-model="email"
            required
            label="电子邮箱"
            placeholder="请输入您的电子邮箱地址"
            :clearable="true"
            label-width="100%"
            :rules="[{ emailValidator,required: true, message: ' ' }]"
          />
        </div>

        <van-row class="agreed-class padding16">
          <van-col span="24">
            <van-checkbox v-model="isCooperation" shape="square" disabled>是否已与敏捷合作</van-checkbox>
          </van-col>
        </van-row>
      </div>
      <van-tabbar v-if="!buttonShow">
        <van-tabbar-item>
          <van-button type="primary" block color="#20A0B8" @click="submitZhaoBiao">提交</van-button>
        </van-tabbar-item>
      </van-tabbar>

      <!-- 选择工种类型弹窗 开始 -->
      <work-type
        :workTypeShow="workTypeShow"
        :workList="workList"
        ref="child"
        @closeWorkShow="closeWorkShow"
        @confirmOK="confirmOK"
      ></work-type>
      <!-- 选择工种类型弹窗 结束-->
    </van-form>
    <div v-else>
      <div class="fail-message">{{failMessage}}</div>
    </div>
  </div>
</template>

<script>
import mixin from "../assets/static/mixin";
import numMixin from "../assets/static/numMixin";
import WorkType from "../components/base/WorkType";
import {
  ZhaoBiao,
  GetRecruitInfo,
  getNotice,
  getNcDbInfo,
  signature,
} from "../request/api";
import { getUrlKey } from "../static/js/public";
import { Dialog } from "vant";
import wxShare from "../static/js/wxShare";

export default {
  mixins: [mixin, numMixin],
  components: {
    "work-type": WorkType,
  },

  inject: ["reload"], //刷新页面

  data() {
    return {
      name: "", //供方姓名
      pid: "", //证件号码
      workType: "", //工种
      workTypeName: "", //工种名称
      workList: [], //选择的工种列表
      phone: "", //手机号
      email: "", //电子邮箱
      workTypeShow: false, //工种选择是否弹窗
      isCooperation: false, //是否已与敏捷合作
      tenderId: "", //阅读ID
      title: "", //公告标题
      updateTime: "", //更新时间
      biddingConditions: "", //招标条件
      contact: "", //项目概况
      extent: "", //招标范围
      seniority: "", //投标人资格要求
      begintime: "", //开标时间
      contract: "", //承包方式
      tenderOpening: "", //开标地点
      linkman: "", //公司联系人
      isApply: false, //是否展示报名信息
      buttonShow: true, //是否显示报名按钮
      projectLocation: "", //项目地址
      saleplace: "", //招标文件发售地点
      tenderPlace: "", //投标地点
      begindate: "", //招标报名起始时间
      desc: "",
      isValid: true, //公告是否有效
      failMessage: "", //公告失效返回的信息
      bidDeadline: "", //投标截止日期
      contractPerson: "", //联系人
      enddate: "", //报名截止时间
    };
  },
  created() {
    this.tenderId = getUrlKey("acm_id", window.location.href);
    this.getNoticeInfo(this.tenderId);
  },

  watch: {
    extent: "getShare",
  },

  methods: {
    //提交
    submitZhaoBiao() {
      if (!this.name) {
        Dialog({ message: "请输入您的姓名" });
        return;
      }

      if (!this.pid) {
        Dialog({ message: "请输入您的身份证号码" });
        return;
      }

      if (!this.pidValidator(this.pid)) {
        Dialog({ message: "请输入正确的身份证" });
        return;
      }

      if (!this.workType) {
        Dialog({ message: "请选择工种" });
        return;
      }

      if (!this.phone) {
        Dialog({ message: "请输入手机号码" });
        return;
      }

      if (!this.validator(this.phone)) {
        Dialog({ message: "手机号码格式错误" });
        return;
      }

      if (!this.email) {
        Dialog({ message: "请输入电子邮箱" });
        return;
      }
      if (!this.emailValidator(this.email)) {
        Dialog({ message: "请输入正确的电子邮箱" });
        return;
      }

      let data = {
        supplier_name: this.name,
        email: this.email,
        phone: this.phone,
        work_type: this.workType,
        tender_id: this.tenderId,
        id_card: this.pid,
        acm_id: this.tenderId,
        whether: this.isCooperation ? "Y" : "N",
      };

      ZhaoBiao(data).then((res) => {
        if (res.status == 200) {
          if (!this.isCooperation) {
            Dialog.alert({
              title: "报名成功",
              message: "请进一步完善更多班组信息",
            }).then(() => {
              this.$router.push({ name: "Recruit" });
            });
          } else {
            Dialog.alert({ message: "报名成功" }).then(() => {
              this.reload();
            });
          }
        } else if (res.status == 500) {
          Dialog({ message: res.message });
          return;
        }
      });
    },

    //获取招募公告
    getNoticeInfo(data) {
      getNotice(data)
        .then((res) => {
          if (res.status == 200 && res.data) {
            this.isValid = true;
            this.title = res.data.title;
            this.updateTime = res.data.update_time;
            this.biddingConditions = res.data.bidding_conditions;
            this.contact = res.data.contact;
            this.extent = res.data.extent;
            this.seniority = res.data.seniority;
            this.begintime = res.data.begintime;
            this.contract = res.data.contract;
            this.tenderOpening = res.data.tender_opening;
            this.linkman = res.data.linkman;
            this.projectLocation = res.data.project_location;
            this.saleplace = res.data.sale_place;
            this.tenderPlace = res.data.tender_place;
            this.begindate = res.data.begindate;
            this.bidDeadline = res.data.bid_deadline;
            this.contractPerson = res.data.contract_person;
            this.enddate = res.data.enddate;
          }
          if (res.status != 200) {
            this.isValid = false;
            this.failMessage = res.message;
          }
        })
        .catch((err) => {
          this.isValid = false;
          this.failMessage = res.message;
        });
    },

    //立即报名
    nowApply() {
      this.isApply = true;
      this.buttonShow = !this.buttonShow;
      this.$nextTick(() => {
        document.getElementById("apply").scrollIntoView();
      });
    },

    //子组件传值父组件，确定时关闭弹窗
    confirmOK(obj) {
      this.workTypeShow = obj.close;
      this.workType = obj.workType;
      this.workTypeName = obj.workTypeNameList;
    },

    byPidGetInfo() {
      getNcDbInfo(this.pid).then((res) => {
        if (res.status == 200) {
          if (res.data) {
            let childData = this.$refs.child.checkboxList;

            this.isCooperation = true;
            this.name = res.data.vsupdocname;
            this.workType = res.data.pk_costdef;
            this.phone = res.data.vphoneno;
            this.email = res.data.vemail;
            let workTypeList = this.workType.split(",");
            let workTypeNameList = [];

            for (var i = 0; i < childData.length; i++) {
              for (var j = 0; j < workTypeList.length; j++) {
                if (childData[i].pk_costdef == workTypeList[j]) {
                  workTypeNameList.push(childData[i].vname);
                }
              }
            }

            this.workTypeName = workTypeNameList.join(",");
          } else {
            this.isCooperation = false;
            this.phone = this.email = "";
          }
        } else {
          Dialog({ message: res.message });
          this.isCooperation = false;
          this.phone = this.email = "";
          return;
        }
      });
    },

    //初始化分享功能
    getShare() {
      let url = window.location.href.split("#")[0];
      let link = window.location.href;
      let img = this.GLOBAL_CONFIG.shareImg;
      wxShare("班组招标公告", this.title, link, img, url);
    },

    //替换换行符
    changeLine(str) {
      return str.replace(/\n/g, "</br>");
    },
  },
};
</script>

<style lang="less" scoped>
.zhao-biao {
  padding-bottom: 80px;

  .fail-message {
    text-align: center;
    top: 35%;
    position: absolute;
  }

  .padding16 {
    padding-left: 16px;
    padding-right: 16px;
  }

  .button-top {
    margin-top: 2.5rem !important;
    margin-bottom: 1rem;
  }

  .agreed-class {
    margin-top: 2rem;
  }

  .noite {
    padding: 0 10px;
    h1 {
      font-size: 1rem;
    }
    .lao-wu {
      margin-top: 1.5rem;
    }

    .m-t {
      margin-top: 1rem;
      .van-col {
        line-height: 1.7;
      }
    }
  }
}
</style>

// 全局样式
<style lang="less">
.zhao-biao {
  .van-cell-class {
    height: 5rem;
    .van-field__value {
      position: absolute !important;
      top: 3.1rem;
      width: 90%;
    }

    .van-field {
      height: 100%;
    }
  }

  .van-tabbar-item__text {
    width: 100%;
  }
}
</style>
