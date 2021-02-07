<template>
  <div class="info">
    <h4>用户信息</h4>
    <el-table :data="tableData" stripe style="width: 70%">
      <el-table-column prop="id" label="编号" width="70"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="sex" label="姓别" width="90">
        <template slot-scope="scope">
          {{ scope.row.sex == '0' ? '女' : '男' }}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" width="150"></el-table-column>
      <el-table-column prop="building" label="栋" width="90"></el-table-column>
      <el-table-column prop="unit" label="单元" width="90"></el-table-column>
      <el-table-column prop="room" label="房间" width=""></el-table-column>
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
    this.getResidents()
  },
  methods: {
    async getResidents() {
      let { data: res } = await this.$http.get('queryall').then("", (err) => {
        this.$message.error("网络或服务器出错 " + err);
      })
      if(res.flag != 1) {
        this.$message.error(res.msg)
      }
      this.tableData = res.data
    }
  },
};
</script>

<style lang="scss" scoped>
.info {
  margin: 0px auto;
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
    margin: 20px auto;

    &::before {
      content: "";
      height: 0;
    }
  }
}
</style>