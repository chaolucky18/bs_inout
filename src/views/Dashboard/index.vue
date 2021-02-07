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
      <el-table :data="inOutData" style="width: 100%" stripe>
        <el-table-column prop="time" label="时间" width="120"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column
          prop="temperature"
          label="体温"
          width="80"
        ></el-table-column>
        <el-table-column prop="door" label="大门" width="80"></el-table-column>
        <el-table-column
          prop="building"
          label="楼栋"
          width="80"
        ></el-table-column>
        <el-table-column prop="unit" label="单元" width="80"></el-table-column>
        <el-table-column prop="room" label="门号" width="80"></el-table-column>
        <el-table-column prop="phone" label="手机号" width=""></el-table-column>
        <el-table-column prop="in" label="动作" width="">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.in == '1' ? 'danger' : 'success'"
              disable-transitions
              >{{ scope.row.in == "1" ? "进" : "出" }}</el-tag
            >
          </template></el-table-column
        >
      </el-table>
    </div>
    <div class="info">
      <h4>体温异常人员</h4>
      <el-table :data="warnData" style="width: 100%" stripe>
        <el-table-column prop="time" label="时间" width="120"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column
          prop="temperature"
          label="体温"
          width="80"
        ></el-table-column>
        <el-table-column prop="door" label="大门" width="80"></el-table-column>
        <el-table-column
          prop="building"
          label="楼栋"
          width="80"
        ></el-table-column>
        <el-table-column prop="unit" label="单元" width="80"></el-table-column>
        <el-table-column prop="room" label="门号" width="80"></el-table-column>
        <el-table-column prop="phone" label="手机号" width=""></el-table-column>
      </el-table>
    </div>
    <div class="info">
      <h4>最近外来人员</h4>
      <el-table :data="strangeData" style="width: 100%" stripe>
        <el-table-column prop="time" label="时间" width="100"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column
          prop="temperature"
          label="体温"
          width="90"
        ></el-table-column>
        <el-table-column
          prop="resname"
          label="访问人"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="guardname"
          label="门卫"
          width="120"
        ></el-table-column>
        <el-table-column prop="phone" label="手机号" width=""></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      dashData: {},
      inOutData: [],
      warnData: [],
      strangeData: [],
    };
  },
  mounted() {
    document.title = this.$route.meta.title;
    this.getDashData();
    // 实时刷新数据
    setInterval(() => {
      this.getDashData();
    }, 10000);
  },
  methods: {
    async getDashData() {
      let { data: res } = await this.$http.get("/dashboard").then("", (err) => {
        this.$message.error("网络或服务器出错 " + err);
      });
      if (res.flag != 0) {
        this.$message.error(res.msg);
        return;
      }
      this.dashData = res.data.overall;
      this.inOutData = res.data.recentInOut;
      this.warnData = res.data.recentWarn;
      this.strangeData = res.data.recentStrange;
    },
  },
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
        font-size: 26px;
        @include center;
      }
      &-data {
        font-size: 24px;
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
    min-width: 848px;

    h4 {
      line-height: 100%;
      margin: 20px 0 0px;
      font-size: 20px;
      text-align: center;
    }
    .el-table {
      padding: 0 20px;

      &::before {
        content: "";
        height: 0;
      }
    }
  }
}
</style>
