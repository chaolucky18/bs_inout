<template>
  <div class="detail" :style="{ height: detailHeight }">
    <div class="search">
      <p id="title">搜索</p>
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        style="margin-left: 20px"
      >
        <el-form-item label="居民姓名或编号:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="onSearch">搜索</el-button>
        </el-form-item>
        <el-form-item
          style="margin-left: -50px"
          v-if="notOnly"
          label="结果存在多个"
        >
          <el-select
            style="width: 150px"
            v-model="choose"
            @change="checkedResident"
            placeholder="请选择具体居民"
          >
            <el-option
              v-for="item in resident"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="gotInfo" class="info">
      <el-table :data="detailData" stripe style="width: 100%">
        <el-table-column prop="name" label="姓名" width="90"></el-table-column>
        <el-table-column prop="date" label="日期" width="120">
          <template slot-scope="scope">
            {{ scope.row.date.slice(0, -14) }}
          </template>
        </el-table-column>
        <el-table-column prop="time" label="时间" width="90"></el-table-column>
        <el-table-column prop="temperature" label="体温" width="90">
        </el-table-column>
        <el-table-column prop="door" label="大门" width="90">
        </el-table-column>
        <el-table-column prop="guard" label="门卫" width="110">
        </el-table-column>
        <el-table-column prop="in" label="动作" width="">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.in == '1' ? 'danger' : 'success'"
              disable-transitions
              >{{ scope.row.in == "1" ? "进" : "出" }}</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
      },
      gotInfo: false,
      notOnly: false,
      choose: [], // 多个搜索结果的选择列表
      resident: {}, // 居民信息
      detailHeight: "170px", // 父级div高度
      detailData: [],
    };
  },
  mounted() {
    document.title = this.$route.meta.title;
  },
  methods: {
    async onSearch() {
      if (this.form.name == "") {
        this.$message.error("名称或编号不得为空！");
        return;
      }
      let { data: res } = await this.$http
        .get("/query_a_resident?info=" + this.form.name)
        .then("", (err) => {
          this.$message.error("网络或服务器出错 " + err);
        });
      if (res.flag == 0) {
        this.$message.info(res.msg);
        return;
      }
      console.table(res.data);
      this.resident = res.data;
      // 结果不唯一，则展示下拉菜单具体选择
      if (res.data.length > 1) {
        // 显示具体用户选择控件
        this.notOnly = true;
      }
      // 唯一结果，可以直接搜索记录
      else {
        this.notOnly = false; // 隐藏选择控件
        // this.choose = res.data[0].id;
        this.getDetailData(res.data[0].id);
      }
    },
    // 具体人员选择变动处理函数
    checkedResident() {
      this.getDetailData(this.choose);
    },
    // 获取进出数据
    async getDetailData(id) {
      let { data: res } = await this.$http
        .get("/query_resident_inoutdata?id=" + id)
        .then("", (err) => {
          this.$message.error("网络或服务器出错 " + err);
        });
      if (res.flag == 0) {
        this.$message.info(res.msg);
        this.gotInfo = false;
        this.detailHeight = "170px";
        return;
      }
      console.log(res.data);
      this.detailData = res.data;
      this.detailHeight = res.data.length * 49 + 250 + "px";
      this.gotInfo = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  background-color: white;
  box-shadow: 0 0 10px 0px #ccc;
  padding: 15px;
  border-radius: 10px;
  min-width: 848px;
  transition: ease all 400ms;

  .search {
    overflow: hidden; // BFC
    padding-left: 20px;

    #title {
      font-size: 22px;
      font-weight: bold;
    }
    .el-button {
      width: 110px;
      margin-left: -85px;
    }
    .el-form-item {
      width: 25%;
      float: left;
      min-width: 240px;
    }
  }
  .info {
    height: 200px;
    width: 100%;

    .el-table {
      padding: 0 20px;
      margin: 20px auto;

      &::before {
        content: "";
        height: 0;
      }
    }
  }
}
</style>