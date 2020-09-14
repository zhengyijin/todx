<!--
 * @Author: 郑义进
 * @Date: 2020-06-02 09:26:56
 * @LastEditTime: 2020-06-09 21:07:15
 * @LastEditors:  
 * @Description: In User Settings Edit
 * @FilePath: \lwbzzm-frontend\src\components\recruit\RecruitStatus.vue
--> 
<template>
  <div class="recruit-status">
    <RecruitSubmit v-if="status == 2" :status="status" :dataList="dataList"></RecruitSubmit>
    <RecruitView v-else :dataList="dataList" :status="status"></RecruitView>
  </div>
</template>

<script>
import RecruitSubmit from "../../views/RecruitSubmit";
import RecruitView from "../../views/RecruitView";
import { GetRecruitInfo } from "../../request/api";
export default {
  components: {
    RecruitSubmit,
    RecruitView
  },
  data() {
    return {
      status: 1, //审核状态：0 待审核 1 已审核，2 驳回
      dataList: {}
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      GetRecruitInfo({}).then(res => {
        if (res.status == 200) {
          let file_id_list = res.data.file_id_list;
          let recruit_info = res.data.recruit_info;
          let project_vo_list = res.data.project_vo_list;
          this.status = recruit_info.audit_status; //根据这个状态展示页面

          this.dataList.fileList = file_id_list;

          let list = [];
          project_vo_list.forEach(item => {
            let fileIdList = [];
            item.file_id_list.forEach(item1 => {
              fileIdList.push({
                url: item1.path,
                entityId:item1.entity_id
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
          this.dataList.projectList = list;

          this.dataList.name = recruit_info.supplier_name;
          this.dataList.workType = recruit_info.work_type;
          this.dataList.phone = recruit_info.phone;
          this.dataList.pid = recruit_info.id_card;
          this.dataList.sex =
            recruit_info.sex == 1
              ? "男"
              : recruit_info.sex == 2
              ? "女"
              : "未知";
          this.dataList.pidAddress = recruit_info.address;
          this.dataList.email = recruit_info.email;
          this.dataList.contractorTime = recruit_info.contract_years;
          this.dataList.managePersonNum = recruit_info.adminer_number;
          this.dataList.businessMoney = recruit_info.annual_turnover;
          this.dataList.source = recruit_info.supplier_source;
          this.dataList.projectPersonNum = recruit_info.worker_number;
          this.dataList.companyName = recruit_info.company_name;
          this.dataList.legalPerson = recruit_info.corporate;
          this.dataList.aptitude = recruit_info.qualification;
          this.dataList.companyAddress = recruit_info.company_address;
          this.dataList.registerMoney = recruit_info.registered_capital;
          this.dataList.socialCreditCode = recruit_info.unified_social_code;
          this.dataList.projectName = recruit_info.project_name;
          this.dataList.projectPlace = recruit_info.project_location;
          this.dataList.reason = recruit_info.audit_opinion;
          this.dataList.id = recruit_info.id
        }
      });
    }
  }
};
</script>

<style>
</style>