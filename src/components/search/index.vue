<template>
  <div class="search">
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      style="margin-left: 20px"
    >
      <el-form-item :label="title">
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
            v-for="(item, i) in resident"
            :key="item.id"
            :label="item.name"
            :value="i"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '居民姓名或编号:'
    }
  },
  data() {
    return {
      form: {
        name: "",
      },
      notOnly: false,
      isSearched: false,
      choose: [],
      resident: {}, // 居民信息
    };
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
        this.transDataToFather(res.data[0].id);
      }
    },
    // 具体人员选择变动处理函数
    checkedResident(e) {
      this.transDataToFather(e);
    },
    // 传值给父组件
    transDataToFather(i) {
      let name = ''
      let id = ''
      if(this.notOnly) {
        id = this.resident[i].id
        name = this.resident[i].name
      } else {
        id = this.resident[0].id
        name = this.resident[0].name
      }

      this.$emit("get-info", { id, name });
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  overflow: hidden; // BFC
  padding-left: 15px;
  padding-top: 25px;

  #title {
    font-size: 22px;
    font-weight: bold;
  }
  .el-button {
    width: 110px;
    margin-left: -85px;
  }
  .el-form-item {
    width: 30%;
    float: left;
    min-width: 240px;
  }
}
</style>