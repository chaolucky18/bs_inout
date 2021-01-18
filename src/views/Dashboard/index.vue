<template>
  <div class="dashboard">
    <div class="overall">
      <div class="overall-data xieqing">
        <div class="overall-data-title">今日进入人数</div>
        <div class="overall-data-data">{{ dashData.in }}</div>
      </div>
      <div class="overall-data huang">
        <div class="overall-data-title">今日外出人数</div>
        <div class="overall-data-data">{{ dashData.out }}</div>
      </div>
      <div class="overall-data huimi">
        <div class="overall-data-title">今日异常体温</div>
        <div class="overall-data-data red">{{ dashData.warn }}</div>
      </div>
      <div class="overall-data zong">
        <div class="overall-data-title">今日外来人员</div>
        <div class="overall-data-data">{{ dashData.strange }}</div>
      </div>
    </div>
    <div class="info">
      <h4>最近进出人员</h4>
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>
    <div class="info">
      <h4>体温异常人员</h4>
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      dashData: {
        out: 152,
        in: 126,
        warn: 5,
        strange: 65
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  mounted() {
    document.title = this.$route.meta.title;
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@mixin center() {
  display: flex;
  justify-content: center;
  align-items: center;
}
.xieqing {
  background-color: #6f9388;
}
.huimi {
  background-color: #c4be8c;
}
.huang {
  background-color: #ec9433;
}
.zong {
  background-color: #cd9b69;
}
.red {
  color: #b80233 !important;
  font-weight: bold;
}
.dashboard {
  padding-top: 10px;
  .overall {
    width: 100%;
    display: flex;
    align-items: center;
    // justify-content: space-around;

    &-data {
      flex: 1;
      width: 300px;
      box-shadow: 0 0 5px 1px #999;
      height: 120px;
      border-radius: 10px;
      margin-right: 20px;
      max-width: 310px;
      min-width: 197px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      &:last-child {
        margin-right: 0;
      }
      &-title {
        height: 40%;
        color: white;
        font-size: 28px;
        @include center;
      }
      &-data {
        font-size: 26px;
        @include center;
        color: #1f1f1f;
      }
    }
  }
  .info {
    margin: 25px auto;
    background-color: #fff;
    overflow: hidden;
    border-radius: 10px;
    padding-bottom: 20px;
    
    h4 {
      line-height: 100%;
      margin: 20px 0 0px;
      font-size: 20px;
    }
    .el-table {
      padding: 0 20px;

      &::before {
        content: '';
        height: 0;
      }
    }
  }
}
</style>
