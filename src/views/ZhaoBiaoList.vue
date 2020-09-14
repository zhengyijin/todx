<template>
  <div class="zhao-biao-list">
    <div class="search-input">
      <van-search
        v-model="fuzzy"
        background="#E8E8EB"
        placeholder="请输入地区/材料/标题等关键字进行搜索"
        input-align="center"
        show-action
        @keypress="keypressSearch($event)"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </div>
    <div class="content">
      <van-tabs
        v-model="active"
        sticky
        animated
        line-width="116"
        line-height="1"
        title-active-color="#1890FF"
        class="content-tab"
      >
        <van-tab title="材料/工程招标公告" name="1">
          <div class="content-list">
            <van-list
              v-if="active == 1"
              v-model="loading1"
              @load="caiLiaoZhaoBiao(1)"
              :finished="finished1"
              finished-text="没有更多了"
            >
              <ZhaoBiaoItem :dataList="caiLiaoList" :active="active"></ZhaoBiaoItem>
            </van-list>
            <van-list v-else>
              <ZhaoBiaoItem :dataList="caiLiaoList" :active="active"></ZhaoBiaoItem>
            </van-list>
          </div>
        </van-tab>
        <van-tab title="劳务班组招标公告" name="2">
          <div class="content-list">
            <van-list
              v-if="active == 2"
              v-model="loading2"
              @load="banZuZhaoBiao(1)"
              :finished="finished2"
              finished-text="没有更多了"
            >
              <ZhaoBiaoItem :dataList="banZuList" :active="active"></ZhaoBiaoItem>
            </van-list>
            <van-list v-else>
              <ZhaoBiaoItem :dataList="banZuList" :active="active"></ZhaoBiaoItem>
            </van-list>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import ZhaoBiaoItem from "../components/ZhaoBiao/ZhaoBiaoItem";
import { materialList, banZulList } from "../request/api";
export default {
  data() {
    return {
      active: "1",
      fuzzy: "", //搜索关键字
      limit: 10, //结束页数
      caiLiaoPage: 1, //材料公告开始页数
      banZuPage: 1, //班组公告开始页数
      caiLiaoList: [], //材料招标列表
      caiLiaoTotal: 0, //材料公告总数
      banZuList: [], //班组招标列表
      banZuTotal: 0, //班组公告总数
      loading1: false,
      finished1: false,
      loading2: false,
      finished2: false,
    };
  },
  created() {
    // this.caiLiaoZhaoBiao();
    // this.banZuZhaoBiao();
  },
  methods: {
    /**
     * 搜索
     */
    onSearch() {
      if (this.active == 1) {
        this.finished1 = false;
        this.caiLiaoZhaoBiao(2);
      } else if (this.active == 2) {
        this.finished2 = false;
        this.banZuZhaoBiao(2);
      }
    },

    /**
     * 导航切换 材料招标或者班组招标
     * 1 表示材料招标 2表示班组招标
     */
    zhaoBiaoTab(val) {
      if (val == 1) {
        this.caiLiaoZhaoBiao();
      } else if (val == 2) {
        this.banZuZhaoBiao();
      } else {
        console.log("参数错误");
      }
    },

    /**
     * 获取材料招标列表
     * flag 1 获取更多，数据追加
     * flag 2 表示搜索 将起始页数变为1
     */
    caiLiaoZhaoBiao(flag) {
      if (flag == 2) {
        this.caiLiaoPage = 1;
      }

      let data = {
        fuzzy: this.fuzzy,
        limit: this.limit,
        page: this.caiLiaoPage,
      };

      materialList(data)
        .then((res) => {
          if (res.status == 200) {
            let result = res.data.rows;
            this.caiLiaoTotal = res.data.total_recored;

            let list = [];

            result.forEach((element) => {
              list.push({
                title: element.title,
                attributes: element.attributes,
                items: element.items,
                area: element.area,
                startTime: element.release_date,
                endTime: element.expected_data,
                id: element.id,
              });
            });

            if (flag == 1) {
              this.caiLiaoList = this.caiLiaoList.concat(list);
            } else {
              this.caiLiaoList = list;
            }
            if (this.caiLiaoPage > this.caiLiaoTotal / 10) {
              this.finished1 = true;
            }
            
            this.loading1 = false;
            this.caiLiaoPage += 1;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    /**
     * 获取班组招标列表
     * flag 1 获取更多，数据追加
     */
    banZuZhaoBiao(flag) {
      if (flag == 2) {
        this.banZuPage = 1;
      }
      let data = {
        fuzzy: this.fuzzy,
        limit: this.limit,
        page: this.banZuPage,
      };

      banZulList(data)
        .then((res) => {
          if (res.status == 200) {
            let result = res.data.rows;
            this.banZuTotal = res.data.total_recored;

            let list = [];
            result.forEach((item) => {
              list.push({
                title: item.title,
                startTime: item.create_time,
                endTime: item.begintime,
                id: item.id,
              });
            });
            if (flag == 1) {
              this.banZuList = this.banZuList.concat(list);
            } else {
              this.banZuList = list;
            }
            if (this.banZuPage > this.banZuTotal / 10) {
              this.finished2 = true;
            }

            this.loading2 = false;
            this.banZuPage += 1;
          } else {
            console.log(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    /**
     * 获取更多
     * flag 1表示材料招标 2表示班组招标
     */
    moreData(flag) {
      if (flag == 1) {
        this.caiLiaoZhaoBiao(1);
      } else if (flag == 2) {
        this.banZuPage += 1;
        this.banZuZhaoBiao(1);
      }
    },

    /**
     * 回车搜索
     */
    keypressSearch(e) {
      if (e.keyCode == 13) {
        this.onSearch();
      }
    },
  },
  components: {
    ZhaoBiaoItem,
  },
};
</script>


<style lang="less">
.zhao-biao-list {
  .content {
    .content-tab {
      .van-tabs__line {
        background-color: #1890ff;
      }
      .van-tabs__content {
        margin-top: 11px;
      }
    }
  }
}
</style>