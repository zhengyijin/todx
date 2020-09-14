<template>
  <div class="zhao-biao-item">
    <div class="content-item" v-for="(item,index) in dataList" :key="index">
      <div class="title">{{item.title}}</div>

      <van-row class="items" v-if="active == 1">
        <van-col>
          <van-tag color="rgba(234, 161, 83, 1)" class="items-tag">{{item.attributes}}</van-tag>
        </van-col>
        <van-col>
          <van-tag color="rgba(234, 161, 83, 1)" class="items-tag">{{item.items}}</van-tag>
        </van-col>
        <van-col>
          <van-tag color="rgba(234, 161, 83, 1)" class="items-tag">{{item.area}}</van-tag>
        </van-col>
      </van-row>

      <van-row
        class="start-time"
      >公告发布时间：{{item.startTime.toString().indexOf('00:00') != -1 ? item.startTime.toString().split(' ')[0] : item.startTime}}</van-row>
      <van-row class="end-time">
        预计招标时间：
        {{item.endTime.toString().indexOf('00:00') != -1 ? item.endTime.toString().split(' ')[0] : item.endTime}}
      </van-row>
      <van-row>
        <van-cell
          v-if="active == 1"
          class="cell-bgc"
          title="查看详情"
          is-link
          :to="'ZhaoBiaoMaterial?acm_id='+item.id"
        />
        <van-cell
          v-else-if="active == 2"
          class="cell-bgc"
          title="查看详情"
          is-link
          :to="'ZhaoBiao?acm_id='+item.id"
        />
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      default: [],
      type: Array,
    },
    active: {
      default: "active",
    },
  },

  data() {
    return {};
  },
};
</script>

<style scoped lang="less">
.zhao-biao-item {
  .content-item {
    background-color: rgba(247, 247, 247);
    margin-bottom: 20px;
    padding-left: 10px;

    .title {
      padding-top: 10px;
      color: rgba(0, 0, 0, 0.93);
      padding-bottom: 10px;
      border-bottom: 1px solid #ebedf0;
    }
    .items {
      margin-top: 8px;
      .items-tag {
        margin-right: 9px;
        padding: 5px 8px;
        font-size: 12px;
        margin-bottom: 7px;
        height: 16px;
      }
    }

    .cell-bgc {
      background-color: rgba(247, 247, 247);
      padding-left: 0;
      color: #586c94;
    }

    .start-time {
      color: #b1b1b1;
      font-size: 12px;
      margin-bottom: 5px;
      margin-top: 8px;
    }

    .end-time {
      color: #b1b1b1;
      font-size: 12px;
      margin-bottom: 10px;
    }
  }
}
</style>