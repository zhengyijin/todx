<!--
 * @Author: 郑义进
 * @Date: 2020-06-01 21:16:42
 * @LastEditTime: 2020-06-12 19:50:24
 * @LastEditors:  
 * @Description: 招募信息查看页面
 * @FilePath: \lwbzzm-frontend\src\views\RecruitView.vue
--> 
<template>
  <div class="recruit-view">
    <!-- <van-nav-bar fixed title="班组个人信息" left-text /> -->

    <van-row class="has-pass">{{statusMap[status]}}</van-row>

    <h3 class="title-h3">基本信息</h3>
    <div class="van-hairline--bottom van-cell-class">
      <van-row>
        <van-col>供方姓名：</van-col>
        <van-col>{{name}}</van-col>
      </van-row>
    </div>

    <div class="van-hairline--bottom van-cell-class">
      <van-row>
        <van-col>工种：</van-col>
        <van-col style="color: #8EA698;font-weight: 700;">{{workTypeName}}</van-col>
      </van-row>
    </div>

    <div class="van-hairline--bottom van-cell-class">
      <van-row>
        <van-col>手机号：</van-col>
        <van-col>{{phone}}</van-col>
      </van-row>
    </div>

    <div class="van-hairline--bottom van-cell-class">
      <van-row>
        <van-col>身份证：</van-col>
        <van-col>{{pid}}</van-col>
      </van-row>
    </div>

    <div class="van-hairline--bottom van-cell-class">
      <van-row>
        <van-col>性别：</van-col>
        <van-col>{{sex}}</van-col>
      </van-row>
    </div>

    <div class="van-hairline--bottom van-cell-class">
      <van-row>
        <van-col>身份证地址：</van-col>
        <van-col>{{pidAddress}}</van-col>
      </van-row>
    </div>

    <div class="van-hairline--bottom van-cell-class">
      <van-row>
        <van-col>电子邮箱：</van-col>
        <van-col>{{email}}</van-col>
      </van-row>
    </div>

    <div class="van-hairline--bottom van-cell-class">
      <van-row>
        <van-col>承包工程年限：</van-col>
        <van-col>{{contractorTime}}</van-col>
      </van-row>
    </div>

    <div class="van-hairline--bottom van-cell-class">
      <van-row>
        <van-col>目前管理人数：</van-col>
        <van-col>{{managePersonNum}}</van-col>
      </van-row>
    </div>

    <div class="van-hairline--bottom van-cell-class">
      <van-row>
        <van-col>年营业额：</van-col>
        <van-col>{{businessMoney}}</van-col>
      </van-row>
    </div>

    <div class="van-hairline--bottom van-cell-class">
      <van-row>
        <van-col>供方来源：</van-col>
        <van-col>{{source}}</van-col>
      </van-row>
    </div>

    <div class="van-hairline--bottom van-cell-class">
      <van-row>
        <van-col>目前在建项目工人人数：</van-col>
        <van-col>{{projectPersonNum}}</van-col>
      </van-row>
    </div>

    <van-row class="padding5 margin-top">
      <van-col span="24">
        <h3>企业基本信息</h3>
      </van-col>
    </van-row>

    <div class="van-hairline--bottom van-cell-class">
      <van-row>
        <van-col>企业名称：</van-col>
        <van-col>{{companyName}}</van-col>
      </van-row>
    </div>

    <div class="van-hairline--bottom van-cell-class">
      <van-row>
        <van-col>企业法人：</van-col>
        <van-col>{{legalPerson}}</van-col>
      </van-row>
    </div>

    <div class="van-hairline--bottom van-cell-class">
      <van-row>
        <van-col>资质：</van-col>
        <van-col>{{aptitude}}</van-col>
      </van-row>
    </div>

    <div class="van-hairline--bottom van-cell-class">
      <van-row>
        <van-col>公司地址：</van-col>
        <van-col>{{companyAddress}}</van-col>
      </van-row>
    </div>

    <div class="van-hairline--bottom van-cell-class">
      <van-row>
        <van-col>注册资金：</van-col>
        <van-col>{{registerMoney}}</van-col>
      </van-row>
    </div>

    <div class="van-hairline--bottom van-cell-class">
      <van-row>
        <van-col>统一社会信用代码：</van-col>
        <van-col>{{socialCreditCode}}</van-col>
      </van-row>
    </div>

    <div class="recently padding5">
      <h3>近两年主要工程业绩</h3>
    </div>

    <!-- 项目展示 开始 -->
    <recruit-project-item :projectList="projectList" :delect="false"></recruit-project-item>
    <!-- 项目展示 结束 -->

    <div class="recently padding5">
      <h3>可提供参考项目</h3>
    </div>

    <div class="van-hairline--bottom van-cell-class">
      <van-row>
        <van-col>项目名称：</van-col>
        <van-col>{{projectName}}</van-col>
      </van-row>
    </div>

    <div class="van-hairline--bottom van-cell-class">
      <van-row>
        <van-col>工程所在地：</van-col>
        <van-col>{{projectPlace}}</van-col>
      </van-row>
    </div>

    <div class="fu-jian padding5">
      <h3>附件资料</h3>
    </div>

    <div class="padding5">
      <div class="van-ellipsis van-a" v-for="(item, index) in fileList" :key="index">
        <a :href="item.path">{{item.name}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import RecruitProjectItem from "../components/recruit/RecruitProjectItem";
import mixin from "../assets/static/mixin";
import {
  GetRecruitInfo,
  getAuthorizedLoginUrl,
  authorizedLogin,
  GetUserInfo2
} from "../request/api";
import { getUrlKey, removeToken } from "../static/js/public";
export default {
  props: {
    dataList: {
      type: Object
    }
  },

  mixins: [mixin],
  components: {
    "recruit-project-item": RecruitProjectItem
  },

  data() {
    return {
      name: "", //供方姓名
      workType: "", //工种ID
      workTypeName: "", //工种名称
      phone: "", //电话
      pid: "", //身份证号码
      sex: "", //性别
      pidAddress: "", //身份证地址
      email: "", //电子邮箱
      contractorTime: "", //承包工程年限
      managePersonNum: "", // 管理人员人数
      businessMoney: "", //年营业额
      source: "", //供方来源
      projectPersonNum: "", //项目人数
      companyName: "", //企业名称
      legalPerson: "", // 企业法人
      aptitude: "", //资质
      companyAddress: "", //公司地址
      registerMoney: "", //注册资金
      socialCreditCode: "", //统一社会信用代码
      projectList: [], //项目列表
      projectName: "", //可供参考项目名称
      projectPlace: "", //可供参考项目工程所在地
      fileList: [], //附件
      status: "",
      statusMap: {
        0: "待审核",
        1: "您提交的资料已经通过",
        2: "驳回"
      }
    };
  },
  methods: {
    getStatusInfo() {
      GetRecruitInfo({}).then(res => {
        if (res.status == 200 && res.data.recruit_info.audit_status != 2) {
          let file_id_list = res.data.file_id_list;
          let recruit_info = res.data.recruit_info;
          let project_vo_list = res.data.project_vo_list;
          this.status = recruit_info.audit_status;

          let list = [];
          project_vo_list.forEach(item => {
            let fileIdList = [];
            item.file_id_list.forEach(item1 => {
              fileIdList.push({
                url: item1.path,
                entityId: item1.entity_id
              });
            });
            list.push({
              projectNameItem: item.project_name,
              projectPlaceItem: item.project_location,
              constructionOrganizationItem: item.company_name,
              PMItem: item.project_manager,
              PMPhoneItem: item.project_manager_phone,
              contractMoney: item.contract_amount,
              images: fileIdList,
              id: item.id
            });
          });
          this.name = recruit_info.supplier_name;

          let workText = "";
          recruit_info.work_type_list.forEach(item => {
            workText += item.vname;
          });

          this.workTypeName = workText;
          this.phone = recruit_info.phone;
          this.pid = recruit_info.id_card;
          this.sex =
            recruit_info.sex == 1
              ? "男"
              : recruit_info.sex == 2
              ? "女"
              : "未知";
          this.pidAddress = recruit_info.address;
          this.email = recruit_info.email;
          this.contractorTime = recruit_info.contract_years;
          this.managePersonNum = recruit_info.adminer_number;
          this.businessMoney = recruit_info.annual_turnover;
          this.source = recruit_info.supplier_source;
          this.projectPersonNum = recruit_info.worker_number;
          this.companyName = recruit_info.company_name;
          this.legalPerson = recruit_info.corporate;
          this.aptitude = recruit_info.qualification;
          this.companyAddress = recruit_info.company_address;
          this.registerMoney = recruit_info.registered_capital;
          this.socialCreditCode = recruit_info.unified_social_code;
          this.projectList = list;
          this.projectName = recruit_info.project_name;
          this.projectPlace = recruit_info.project_location;
          file_id_list.forEach(item => {
            this.fileList.push({ name: item.name, path: item.path });
          });
        } else {
          this.$router.push({ name: "Recruit" });
        }
      });
    }
  },
  created() {
    this.getStatusInfo();
  }
};
</script>
<style lang="less" scoped>
.recruit-view {
  margin-bottom: 2rem;
  padding-left: 10px;
  padding-right: 10px;
  .title-h3 {
    margin-top: 15px;
    margin-bottom: 25px;
  }

  h3 {
    font-size: 1rem;
  }

  .title-algin {
    text-align: left;
  }

  .margin-top {
    margin-top: 1.5rem;
  }

  .padding5 {
    padding-left: 0px;
    padding-right: 5px;
  }

  .recently {
    margin-top: 1rem;
    margin-bottom: 1rem;
    .p-height {
      line-height: 1.8;
    }
  }

  .van-a {
    margin-top: 1rem;
    a {
      color: #0000ee;
    }
  }

  .has-pass {
    margin-top: 1rem;
    margin-bottom: 2rem;
    color: #33ff00;
  }

  .van-cell {
    padding: 10px 5px;
  }

  .fu-jian {
    margin-top: 1rem;
  }

  .van-cell-class {
    margin-top: 15px;
    padding-bottom: 10px;
  }
}
</style>