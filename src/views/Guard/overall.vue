<template>
  <div class="overall">
    <h4>门卫信息</h4>
    <el-table :data="tableData" stripe>
      <el-table-column prop="id" label="编号" width="70"></el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="120"
      ></el-table-column>
      <el-table-column prop="name" label="名称" width="90"></el-table-column>
      <el-table-column
        prop="phone"
        label="联系方式"
        width="150"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    document.title = this.$route.meta.title;
    this.getResidents();
  },
  methods: {
    async getResidents() {
      let { data: res } = await this.$http.get("getalluser").then("", (err) => {
        this.$message.error("网络或服务器出错 " + err);
      });
      if (res.flag != 1) {
        this.$message.error(res.msg);
      }
      this.tableData = res.data;
    },
  },
};
</script>

<style lang="scss" scoped>
.overall {
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
    width: 450px;
    margin: 20px auto;

    &::before {
      content: "";
      height: 0;
    }
  }
}
</style>