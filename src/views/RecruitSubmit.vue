<!--
 * @Author: 郑义进
 * @Date: 2020-05-31 09:06:53
 * @LastEditTime: 2020-06-12 19:09:56
 * @LastEditors:  
 * @Description: 班组招募信息搜集页面
 * @FilePath: \lwbzzm-frontend\src\views\Recruit.vue
--> 
<template>
  <div class="recruit">
    <van-form>
      <div class="sub-i padding16">
        <i>需附现场施工图片、合同或其他证明材料</i>
      </div>

      <!-- 项目展示 开始 -->
      <recruit-project-item
        :projectList="projectList"
        :delectShow="true"
        @removeItem="removeProject"
      ></recruit-project-item>
      <!-- 项目展示 结束 -->

      <!-- 添加项目 开始 -->
      <van-row>
        <van-col span="24">
          <div class="van-hairline--bottom padding16" style="padding-top:.8rem;padding-left: 10px;">
            <van-row style="margin-bottom: .5rem">
              <span style="color: red">*</span>现场图片/其他证明材料
            </van-row>
            <van-uploader
              class="no-img-view"
              :before-read="beforeRead"
              v-model="fileList"
              multiple
              :after-read="imgUpload"
              :disabled="imgDisabled"
            />
            <van-row class="img-style clearfix" v-if="images.length > 0">
              <van-image-preview
                v-model="show"
                :images="imgPreviwwList"
                v-if="imgPreviwwList.length > 0"
                :startPosition="index"
              ></van-image-preview>
              <div v-for="(item,index) in images" :key="index" class="float-l img-item">
                <img :src="item.url" alt @click="viewImage(index)" />
                <van-icon
                  name="close"
                  class="delect-icon"
                  @click="delectItem(index,item.id,'img')"
                />
              </div>
            </van-row>
          </div>
        </van-col>
      </van-row>
      <!-- 添加项目 结束 -->
    </van-form>
  </div>
</template>

<script>
import RecruitProjectItem from "../components/recruit/RecruitProjectItem";
import WorkType from "../components/base/WorkType";
import WarmTip from "../components/base/WarmTip";
import mixin from "../assets/static/mixin";
import { setToken, removeToken } from "../utils/token";
import { Dialog } from "vant";
import wxShare from "../static/js/wxShare";
import {
  upload,
  RecruitSubmit,
  DeleteFile,
  getAuthorizedLoginUrl,
  authorizedLogin,
  getStatus,
  GetRecruitInfo,
  GetUserInfo2,
  isBanZu,
  syncNcDb,
} from "../request/api";
import { getUrlKey } from "../static/js/public";

export default {
  mixins: [mixin],

  components: {
    "recruit-project-item": RecruitProjectItem,
    "work-type": WorkType,
    "warm-tip": WarmTip,
  },

  data() {
    return {
      name: "", //姓名
      workType: "", //工种ID
      workTypeName: "", //工种名称
      workList: [], //选择的工种列表
      workTypeShow: false, //工种选择是否弹窗
      phone: "", //电话
      pid: "", //证件号码
      sex: "男", //性别
      sexShow: false, // 性别选择是否弹窗
      sexSelect: ["男", "女"], //性别选择
      pidAddress: "", //身份证地址
      email: "", //电子邮箱
      contractorTime: "", //承包工程年限
      managePersonNum: "", // 管理人员人数
      businessMoney: "", //营业额
      source: "", //供方来源
      projectPersonNum: "", //项目人数
      projectName: "", //项目名称
      projectPlace: "", //工程所在地
      uploadFile: [], //上传文件（附件）
      agreed: true, //同意声明
      isAddProject: false, //是否展开添加项目页面
      companyName: "", //企业名称
      legalPerson: "", // 企业法人
      aptitude: "", //资质
      companyAddress: "", //公司地址
      registerMoney: "", //注册资金
      socialCreditCode: "", //统一社会信用代码
      projectList: [], //项目列表
      projectNameItem: "", // 添加项目项目名称
      projectPlaceItem: "", //添加项目工程所在地
      constructionOrganizationItem: "", //添加项目施工单位
      PMItem: "", //添加项目项目经理
      PMPhoneItem: "", //添加项目项目经理电话
      contractMoney: "", //添加项目合同金额
      fileList: [], //现场图片或者证明材料
      images: [], //添加项目现场图片，传给后台字段
      isBack: false, //是否被驳回
      reason: "", //驳回原因
      fileSuccesList: [],
      recruitFile: [], //附件
      tempFileList: [], //临时存储现场图片list
      fileListId: [], //现场图片或者证明材料id传给后台
      disabled: false, //提交按钮是否禁用
      submitText: "提交", //提交文字
      imgDisabled: false, //是否禁止上传图片
      fileDisabled: false, //是否禁止文件上传
      status: "", //订单状态
      dataList: {},
      isKuNeiBanZu: false, //是否是库内班组
      projectDels: [], //存放删除子项目ID
      imgBase64: [], //压缩后的图片
      show: false, //是否预览图片
      imgPreviwwList: [], //预览图片列表
      index: 1, //图片预览起始位置
    };
  },

  methods: {
    //表单提交
    onSubmit(values) {
      let recruitInfoVo = {
        supplier_name: this.name, //姓名
        work_type: this.workType, //工种
        phone: this.phone, //手机号码
        id_card: this.pid, //身份证号码
        sex: this.sex == "男" ? 1 : this.sex == "女" ? 2 : 0, //性别
        address: this.pidAddress, //身份证地址
        email: this.email, //电子邮箱
        contract_years: this.contractorTime, //承包工程年限
        adminer_number: this.managePersonNum, // 管理人员人数
        annual_turnover: this.businessMoney, //营业额
        supplier_source: this.source, //供方来源
        worker_number: this.projectPersonNum, //项目人数
        company_name: this.companyName, //企业名称
        corporate: this.legalPerson, // 企业法人
        qualification: this.aptitude, //资质
        company_address: this.companyAddress, //公司地址
        registered_capital: this.registerMoney, //注册资金
        unified_social_code: this.socialCreditCode, //统一社会信用代码
        project_name: this.projectName, //项目名称
        project_location: this.projectPlace, //工程所在地
      };

      let projectVoList = [];

      this.projectList.forEach((item) => {
        let list = [];

        item.images.forEach((item1) => {
          list.push(item1.id);
        });

        let projectData = {
          project_name: item.projectNameItem, // 添加项目项目名称
          project_location: item.projectPlaceItem, //添加项目工程所在地
          company_name: item.constructionOrganizationItem, //添加项目施工单位
          project_manager: item.PMItem, //添加项目项目经理
          project_manager_phone: item.PMPhoneItem, //添加项目项目经理电话
          contract_amount: parseFloat(item.contractMoney), //添加项目合同金额
          file_id_list: list, //现场图片
        };
        if (this.status == 2) {
          projectData["id"] = item.id;
        }
        projectVoList.push(projectData);
      });

      //如果是驳回
      if (this.status == 2) {
        recruitInfoVo["id"] = this.dataList.id;
      }

      let data = {
        recruit_info_vo: recruitInfoVo,
        project_vo_list: projectVoList,
        file_id_list: this.uploadFile,
        project_dels: this.projectDels,
      };

      if (!this.name) {
        Dialog({ message: "请输入您的姓名" });
        return;
      }

      if (!this.pid) {
        Dialog({ message: "请输入您的身份证" });
        return;
      }

      if (!this.pidValidator(this.pid)) {
        Dialog({ message: "请输入正确的身份证" });
        return;
      }

      this.isBanZu();
      if (this.isKuNeiBanZu) return;

      if (!this.email) {
        Dialog({ message: "请输入电子邮箱" });
        return;
      }

      if (!this.emailValidator(this.email)) {
        Dialog({ message: "请输入正确的电子邮箱" });
        return;
      }

      if (!this.workType) {
        Dialog({ message: "请选择您的班组工种" });
        return;
      }

      if (!this.phone) {
        Dialog({ message: "请输入您的手机号码" });
        return;
      }

      if (!this.validator(this.phone)) {
        Dialog({ message: "手机号码格式错误" });
        return;
      }

      if (!this.sex) {
        Dialog({ message: "请选择您的性别" });
        return;
      }

      if (!this.pidAddress) {
        Dialog({ message: "请填写您的身份证地址" });
        return;
      }

      if (!this.email) {
        Dialog({ message: "请输入您的电子邮箱地址" });
        return;
      }

      if (!this.contractorTime) {
        Dialog({ message: "请输入您承包工程的年限" });
        return;
      }

      if (!this.managePersonNum) {
        Dialog({ message: "请输入您班组的人数" });
        return;
      }

      if (!this.businessMoney) {
        Dialog({ message: "请输入您的年营业额" });
        return;
      }

      if (!this.source) {
        Dialog({ message: "请填写您是通过何渠道入库" });
        return;
      }

      if (!this.projectPersonNum) {
        Dialog({ message: "请填写您目前在建项目工人人数" });
        return;
      }

      if (!this.companyName) {
        Dialog({ message: "请输入企业名称" });
        return;
      }

      if (!this.legalPerson) {
        Dialog({ message: "请输入企业法人名称" });
        return;
      }

      if (!this.aptitude) {
        Dialog({ message: "请输入您的企业资质" });
        return;
      }

      if (!this.companyAddress) {
        Dialog({ message: "请输入您的公司详细地址" });
        return;
      }

      if (!this.registerMoney) {
        Dialog({ message: "请填写企业的注册资金" });
        return;
      }

      if (!this.socialCreditCode) {
        Dialog({ message: "请填写企业的统一社会信用代码" });
        return;
      }

      if (!this.projectName) {
        Dialog({ message: "请输入项目名称" });
        return;
      }

      if (!this.projectPlace) {
        Dialog({ message: "请输入工程所在地" });
        return;
      }

      if (projectVoList.length < 1) {
        Dialog({ message: "请添加一个项目然后点添加" });
        this.addProject();
        return;
      }

      if (this.uploadFile.length < 1) {
        Dialog({ message: "请至少上传一项附件" });
        return;
      }
      if (!this.agreed) {
        Dialog({ message: "请勾选我已阅知" });
        return;
      }

      this.disabled = true;
      this.submitText = "提交中...";
      RecruitSubmit(data)
        .then((res) => {
          this.disabled = false;
          this.submitText = "提交";
          if (res.status == 200) {
            this.$router.push({ name: "RecruitView" });
          } else if (res.status == 500) {
            Dialog({ message: res.message });
            this.disabled = false;
            this.submitText = "提交";
            return;
          } else {
            Dialog({ message: "*字段为必填字段" });
            this.disabled = false;
            this.submitText = "提交";
            return;
          }
        })
        .catch((err) => {
          Dialog({ message: err.message });
          this.disabled = false;
          this.submitText = "提交";
          return;
        });
    },

    //隐藏性别弹出层并赋值
    sexConfirm(value) {
      this.sex = value;
      this.sexShow = false;
    },

    //添加一个项目
    addProject() {
      this.isAddProject = true;
    },

    // 添加单个项目提交
    submitProjectItem() {
      let projectNameItem = this.projectNameItem;
      let projectPlaceItem = this.projectPlaceItem;
      let constructionOrganizationItem = this.constructionOrganizationItem;
      let PMItem = this.PMItem;
      let PMPhoneItem = this.PMPhoneItem;
      let contractMoney = this.contractMoney;
      let images = JSON.parse(JSON.stringify(this.images));

      if (!projectNameItem) {
        Dialog({ message: "请输入项目名称" });
        return;
      }

      if (!projectPlaceItem) {
        Dialog({ message: "请输入工程所在地" });
        return;
      }

      if (!constructionOrganizationItem) {
        Dialog({ message: "请输入施工单位名称" });
        return;
      }

      if (!PMItem) {
        Dialog({ message: "请输入项目经理" });
        return;
      }

      if (!PMPhoneItem) {
        Dialog({ message: "请输入项目经理电话" });
        return;
      }

      if (!this.validator(this.PMPhoneItem)) {
        Dialog({ message: "项目经理手机号码格式错误" });
        return;
      }

      if (!contractMoney) {
        Dialog({ message: "请输入合同金额" });
        return;
      }

      if (!/\d/.test(contractMoney)) {
        Dialog({ message: "合同金额必须为数字" });
        return;
      }

      if (images.length < 1) {
        Dialog({ message: "请上传现场图片/其他证明材料" });
        return;
      }

      let dict = {
        projectNameItem,
        projectPlaceItem,
        constructionOrganizationItem,
        PMItem,
        PMPhoneItem,
        contractMoney,
        images,
      };

      let obj1 = JSON.parse(JSON.stringify(dict));

      this.projectNameItem = this.projectPlaceItem = this.constructionOrganizationItem = this.PMItem = this.PMPhoneItem = this.contractMoney =
        "";
      this.fileList = this.images = [];
      this.projectList.push(obj1);
      this.isAddProject = false;
      this.fileListId = this.tempFileList;
    },

    //删除项目
    removeProject(val) {
      let delectList = [];

      val.images.forEach((item) => {
        delectList.push(item.id);
      });

      val.images.forEach((item) => {
        this.fileListId.forEach((val) => {
          if (item.id == val) {
            this.fileListId.splice(val, 1);
          }
        });
      });

      this.projectList.splice(val.index, 1);

      if (val.id) {
        this.projectDels.push(val.id);
      }
    },

    //子组件传值父组件，取消时关闭弹窗
    closeWorkShow(val) {
      this.workTypeShow = val;
    },

    //子组件传值父组件，确定时关闭弹窗
    confirmOK(obj) {
      this.workTypeShow = obj.close;
      this.workType = obj.workType;
      this.workTypeName = obj.workTypeNameList;
    },

    //点击按钮触发上传文件按钮
    clickUploadFile(index) {
      document.getElementById("file_" + index).click();
    },

    // 上传前校验
    beforeRead(file) {
      if (file.length > 1) {
        for (var i = 0; i < file.length; i++) {
          if (file[i].size / 1024 / 1024 > 10) {
            Dialog({ message: "第" + (i + 1) + "张图片大小超过 10M" });
            return false;
          } else {
            return true;
          }
        }
      } else {
        if (file.size / 1024 / 1024 > 10) {
          Dialog({ message: "图片大小超过 10M" });
          return false;
        } else {
          return true;
        }
      }
    },
    //上传附件
    uploadFileList(file) {
      let formData = new FormData();
      let imgs = file;

      if (imgs.length > 1) {
        for (let i = 0; i < imgs.length; i++) {
          formData.append("multipartFiles", imgs[i].file, imgs[i].file.name);
        }
      } else {
        formData.append("multipartFiles", imgs.file, imgs.name);
      }
      this.fileDisabled = true;
      upload(formData)
        .then((res) => {
          if (res.status == 200) {
            res.data.forEach((item) => {
              this.fileSuccesList.push(item);
              this.uploadFile.push(item.id);
            });
          } else {
            Dialog({ message: res.message });
          }
          this.fileDisabled = false;
        })
        .catch((err) => {
          this.fileDisabled = false;
          Dialog({ message: err.message });
          return;
        });
    },

    //删除附件/删除现场图片
    delectItem(index, id, falg) {
      DeleteFile([id]).then((res) => {
        if (res.status == 200) {
          if (falg == "file") {
            //附件
            this.fileSuccesList.splice(index, 1);
            this.uploadFile.splice(index, 1);
          } else if (falg == "img") {
            //现场图片
            this.images.splice(index, 1);
            this.tempFileList.splice(index, 1);
          }
        } else {
          Dialog({ message: res.message });
        }
      });
    },

    //现场图片或其他资料证明
    imgUpload(file) {
      let formData = new FormData();
      let imgs = file;
      if (file.length > 1) {
        for (let i = 0; i < file.length; i++) {
          formData.append("multipartFiles", file[i].file, file[i].file.name);
        }
      } else {
        let strFilter = ".jpeg|.gif|.jpg|.png|.bmp|.pic|";
        if (file.file.name.indexOf(".") > -1) {
          let num = file.file.name.lastIndexOf(".");
          var lastStr =
            file.file.name.substring(num, file.file.name.length) + "|";
          lastStr = lastStr.toLowerCase();
          if (strFilter.indexOf(lastStr) > -1 && file.file.size > 2000000) {
            //图片压缩
            let canvas = document.createElement("canvas");
            let context = canvas.getContext("2d");
            let img = new Image();

            img.src = file.content;
            img.onload = () => {
              canvas.width = 400;
              canvas.height = 300;
              context.drawImage(img, 0, 0, 400, 300);
              file.content = canvas.toDataURL(file.file.type, 0.92);
              this.imgBase64.push(file.content);
            };
          } else {
            this.imgBase64.push(file.content);
          }
        }

        formData.append(
          "multipartFiles",
          file.file,
          file.file.name,
          this.imgBase64
        );
      }
      file.status = "uploading";
      file.message = "上传中...";
      this.imgDisabled = true;
      upload(formData)
        .then((res) => {
          if (res.status == 200) {
            res.data.forEach((item) => {
              this.images.push({
                url: item.path,
                id: item.id,
              });
              this.tempFileList.push(item.id);
            });
          } else {
            Dialog({ message: res.message });
          }

          file.status = "";
          file.message = "上传完成";
          this.imgDisabled = false;
        })
        .catch((err) => {
          file.status = "";
          file.message = "";
          this.imgDisabled = false;
          Dialog({ message: err.message });
        });
    },

    //判定是否是驳回
    getStatusInfo() {
      GetRecruitInfo({}).then((res) => {
        //如果是被驳回
        if (res.status == 200 && res.data.recruit_info.audit_status == 2) {
          let file_id_list = res.data.file_id_list;
          let recruit_info = res.data.recruit_info;
          let project_vo_list = res.data.project_vo_list;
          this.status = recruit_info.audit_status;

          let list = [];

          project_vo_list.forEach((item) => {
            let fileIdList = [];
            item.file_id_list.forEach((item1) => {
              fileIdList.push({
                url: item1.path,
                id: item1.id,
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
              id: item.id,
            });
          });

          this.name = recruit_info.supplier_name;

          let workText = [];
          let workID = [];
          recruit_info.work_type_list.forEach((item) => {
            workText.push(item.vname);
            workID.push(item.pk_costdef);
          });
          this.workType = workID.join(",");
          this.workTypeName = workText.join(",");
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
          this.fileSuccesList = file_id_list;
          this.fileSuccesList.forEach((item) => {
            this.uploadFile.push(item.id);
          });
          this.reason = recruit_info.audit_opinion;
          this.dataList["id"] = recruit_info.id;
        } else if (
          res.status == 200 &&
          (res.data.recruit_info.audit_status == 0 ||
            res.data.recruit_info.audit_status == 1)
        ) {
          this.$router.push({ name: "RecruitView" });
        }
      });
    },

    //是否是库内班组
    isBanZu() {
      if (!this.pid || !this.pidValidator(this.pid)) {
        return;
      }

      isBanZu(this.pid).then((res) => {
        if (res.status == 200) {
          if (res.data) {
            this.isKuNeiBanZu = true;
          }
        } else {
          Dialog({ message: res.message });
          return;
        }
      });
    },

    isBanZuConfirm() {
      if (!this.pid || !this.pidValidator(this.pid)) {
        return;
      }
      syncNcDb(this.pid).then((res) => {
        if (res.status == 200) {
          this.$router.push({ name: "RecruitView" });
        } else {
          Dialog({ message: res.message });
          return;
        }
      });
    },

    //改变预览图片索引
    viewImage(index) {
      if (this.imgPreviwwList.length > 0) {
        this.show = true;
        this.index = index;
      }
    },
  },

  watch: {
    //监听是否有勾选同意条款
    agreed(newVal, oldVal) {
      this.disabled = !newVal ? true : false;
    },
  },

  watch: {
    images() {
      //返回图片列表
      let result = this.images
        .filter((item) => {
          let strFilter = ".jpeg|.gif|.jpg|.png|.bmp|.pic|";

          if (item.url.indexOf(".") > -1) {
            let num = item.url.lastIndexOf(".");
            var lastStr = item.url.substring(num, item.length) + "|";
            lastStr = lastStr.toLowerCase();

            return strFilter.indexOf(lastStr) > -1;
          }
        })
        .map((i) => i.url);
      this.imgPreviwwList = result;
    },
  },
};
</script>

// 组件内样式
<style lang="less" scoped>
.recruit {
  margin-bottom: 2rem;
  .title-h3 {
    margin-top: 15px;
    margin-bottom: 25px;
  }

  h3 {
    font-size: 1rem;
  }

  .sub-i {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .recently {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    .p-height {
      line-height: 1.8;
    }
  }

  .add-group-class {
    line-height: 2rem;
    margin-top: 1rem;

    span {
      margin-left: 1rem;
      font-size: 0.9rem;
    }
  }

  .fu-jian {
    margin-top: 3rem;
    margin-bottom: 1.5rem;
  }

  .agreed-class {
    margin-top: 2rem;
  }

  .span-class {
    font-size: 0.9rem;
  }

  .margin-top {
    margin-top: 1.5rem;
  }

  .img-class {
    width: 20px;
    position: relative;
    top: 5px;
  }

  .img-style {
    .img-item {
      position: relative;
      .delect-icon {
        position: absolute;
        top: 4px;
        right: 5px;
        color: #fff;
        font-size: 18px;
        background-color: #969799;
        border-radius: 100%;
      }
      img {
        width: 80px;
        height: 80px;
        margin-right: 10px;
        margin-bottom: 10px;
        margin-top: 10px;
      }
    }
  }
}
</style>>

// 全局样式
<style lang="less">
.recruit {
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

  .van-cell {
    .van-field__label {
      span {
        font-size: 16px;
        color: rgba(16, 16, 16, 1);
        font-family: PingFangSC-regular;
      }
    }
  }

  .no-view {
    .van-uploader__preview {
      display: none;
    }
    .van-uploader {
      border: 1px solid #ebedf0;
      padding: 5px 10px;
    }
  }

  .no-img-view {
    .van-uploader__preview {
      display: none;
    }
  }

  .agreed-class {
    .van-checkbox__label {
      font-size: 12px;
    }
  }

  .van-dialog {
    .van-dialog__header {
      font-weight: 700;
    }
  }
}
</style>
