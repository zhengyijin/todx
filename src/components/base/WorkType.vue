<!--
 * @Author: 郑义进
 * @Date: 2020-06-02 19:56:32
 * @LastEditTime: 2020-06-06 00:45:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lwbzzm-frontend\src\components\base\WorkType.vue
--> 
<template>
  <div class="work-type">
    <van-popup v-model="isShow" position="bottom" @close="closePopup">
      <van-row class="comfirm-button">
        <van-col span="8" class="t-c" @click="closePopup">取消</van-col>
        <van-col span="8" class="t-c">工种选择</van-col>
        <van-col span="8" class="t-c" @click="confirmPopup">确定</van-col>
      </van-row>

      <van-row>
        <van-search v-model="searchWord" placeholder="请输入搜索关键词" />
      </van-row>

      <van-row>
        <van-checkbox-group v-model="workListItem" class="checkbox-height">
          <van-checkbox
            v-for="(item,index) in searchData"
            :key="index"
            :name="item.pk_costdef"
            class="checkbox-item"
            shape="square"
          >{{item.vname}}</van-checkbox>
        </van-checkbox-group>
      </van-row>
    </van-popup>
  </div>
</template>
<script>
import { getWorkTypes } from "../../request/api";
export default {
  props: ["workTypeShow","workType"],

  computed: {
    //搜索
    searchData() {
      var search = this.searchWord;

      if (search) {
        return this.checkboxList.filter(item => {
          return (
            String(item.vname)
              .toLowerCase()
              .indexOf(search) != -1
          );
        });
      }

      return this.checkboxList;
    }
  },
  watch: {
    workTypeShow(newVal, OldVal) {
      this.isShow = newVal;
    }
  },

  data() {
    return {
      searchWord: "", //搜索关键词
      workListItem: this.workType ? this.workType.split(',') : [], //弹出选择的工种类型
      isShow: false,
      checkboxList: []
    };
  },

  methods: {
    //关闭工种类型选择
    closePopup() {
      this.$emit("closeWorkShow", false);
      this.searchWord = "";
    },

    //选择工种后确定
    confirmPopup() {
      let workList = JSON.parse(JSON.stringify(this.workListItem));
      let workTypeName = [];

      for (let i = 0; i < this.checkboxList.length; i++) {
        for (let j = 0; j < workList.length; j++) {
          if (this.checkboxList[i].pk_costdef == workList[j]) {
            workTypeName.push(this.checkboxList[i].vname);
          }
        }
      }

      let workType = workList.join(",");
      let workTypeNameList = workTypeName.join(",");
      let obj1 = {
        workType: workType,
        workTypeNameList: workTypeNameList,
        close: false
      };
      this.$emit("confirmOK", obj1);
      this.searchWord = "";
    },

    //获取工种
    WorkTypes() {
      getWorkTypes({}).then(res => {
        this.checkboxList = res.data;
      });
    }
  },
  
  created() {
    this.WorkTypes();
  }
};
</script>

<style scoped lang="less">
.work-type {
  .checkbox-height {
    height: 12rem;
    padding-left: 1rem;
    padding-right: 1rem;
    overflow: scroll;
    .checkbox-item {
      margin: 1rem 0;
    }
  }

  .comfirm-button {
    padding-left: 1rem;
    padding-right: 1rem;
    height: 2rem;
    line-height: 2rem;
    margin-top: 10px;
  }
}
</style>
<style lang="less">
.work-type {
  .checkbox-height {
    .van-checkbox__label {
      margin-left: 30%;
    }
  }
}
</style>