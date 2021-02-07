<template>
  <div class="control">
    <el-tabs type="border-card">
      <el-tab-pane label="小区居民">
        <div class="search">
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
                  v-for="(item, i) in resident"
                  :key="item.id"
                  :label="item.name"
                  :value="i"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <!-- 居民进出表单部分 -->
        <div class="form" v-if="isSearched">
          <el-form ref="form" :model="residentInOutData" label-width="80px">
            <el-form-item label="姓名">
              <p>{{ residentInOutData.name }}</p>
            </el-form-item>
            <el-form-item label="大门">
              <el-select
                v-model="residentInOutData.door"
                placeholder="请选择经过大门"
              >
                <el-option label="北1门" value="北1门"></el-option>
                <el-option label="南门" value="南门"></el-option>
                <el-option label="东门" value="东门"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="进出">
              <el-radio-group v-model="residentInOutData.in">
                <el-radio label="1">进</el-radio>
                <el-radio label="0">出</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="体温">
              <el-input v-model="residentInOutData.temperature"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="recordInOut(0)">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="外来人员">
        <!-- 外来人员表单部分 -->
        <div class="form">
          <el-form ref="form" :model="strangersInOutData" label-width="90px">
            <el-form-item label="外来人员姓名">
              <el-input v-model="strangersInOutData.name"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
              <el-input v-model="strangersInOutData.phone"></el-input>
            </el-form-item>
            <el-form-item label="被访问者姓名">
              <p id="tip">
                {{
                  strangersInOutData.resName == ""
                    ? "(请使用下方查询功能，来确认被访问人)"
                    : strangersInOutData.resName
                }}
              </p>
            </el-form-item>
            <el-form-item label="大门">
              <el-select
                v-model="residentInOutData.door"
                placeholder="请选择经过大门"
              >
                <el-option label="北1门" value="北1门"></el-option>
                <el-option label="南门" value="南门"></el-option>
                <el-option label="东门" value="东门"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="体温">
              <el-input v-model="strangersInOutData.temperature"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="width: 25%" type="primary" @click="recordInOut(1)">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
        <Search title="访问居民搜索:" @get-info="getStrangeVisitResInfo" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Search from "@/components/search/index.vue";

export default {
  data() {
    return {
      form: {
        name: "",
      },
      notOnly: false,
      isSearched: false,
      choose: [],
      resident: {},
      residentInOutData: {
        id: "",
        name: "",
        door: "",
        in: "1",
        temperature: "",
        guardId: window.sessionStorage.getItem("guardId"),
      },
      strangersInOutData: {
        resId: "",
        resName: "",
        name: "",
        phone: "",
        door: "",
        temperature: "",
        guardId: window.sessionStorage.getItem("guardId"),
      },
    };
  },
  components: {
    Search,
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
      this.resident = res.data;
      // 结果不唯一，则展示下拉菜单具体选择
      if (res.data.length > 1) {
        // 显示具体用户选择控件
        this.notOnly = true;
      }
      // 唯一结果，可以直接展示搜索记录
      else {
        this.notOnly = false; // 隐藏选择控件
        this.isSearched = true;
        // this.recordInOut(res.data[0].id);
        this.residentInOutData.id = res.data[0].id;
        this.residentInOutData.name = res.data[0].name;
      }
    },
    // 具体人员选择变动处理函数
    checkedResident() {
      this.isSearched = true;
      this.residentInOutData.id = this.resident[this.choose].id;
      this.residentInOutData.name = this.resident[this.choose].name;
    },
    // 获取外来人员要访问的居民的ID
    getStrangeVisitResInfo(info) {
      this.strangersInOutData.resId = info.id;
      this.strangersInOutData.resName = info.name;
    },
    async recordInOut(flag) {
      // 提交居民进出记录
      if (flag === 0) {
        if (
          this.residentInOutData.temperature == "" ||
          this.residentInOutData.door == ""
        ) {
          this.$message.error("表单请填写完整！");
          return;
        }
        let { data: res } = await this.$http
          .post("/new_log", this.residentInOutData)
          .then("", (err) => {
            this.$message.error("网络或服务器出错 " + err);
          });
        if (res.flag == 0) {
          this.$message.info(res.msg);
          return;
        }
        this.$message.success("登记完毕！");
        this.residentInOutData = {
          id: "",
          name: "",
          door: "",
          in: "1",
          temperature: "",
          guardId: window.sessionStorage.getItem("guardId"),
        };
      } else {
        // 提交外来人员进出记录
        if (
          this.strangersInOutData.temperature == "" ||
          this.strangersInOutData.phone == ""
        ) {
          this.$message.error("表单请填写完整！");
          return;
        }
        if (this.strangersInOutData.resName == "") {
          this.$message.error("请登记被访问居民！");
        }
        let { data: res } = await this.$http
          .post("/new_strangelog", this.strangersInOutData)
          .then("", (err) => {
            this.$message.error("网络或服务器出错 " + err);
          });
        if (res.flag == 0) {
          this.$message.info(res.msg);
          return;
        }
        this.$message.success("登记完毕！");
        this.strangersInOutData = {
          resId: "",
          resName: "",
          name: "",
          phone: "",
          door: "",
          temperature: "",
          guardId: window.sessionStorage.getItem("guardId"),
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#tip {
  color: #aaa;
}
.control {
  margin: 0px auto;
  background-color: #fff;
  overflow: hidden;
  border-radius: 10px;
  min-width: 848px;

  h4 {
    line-height: 100%;
    margin: 20px 0 0px;
    font-size: 20px;
    text-align: center;
  }

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
      width: 25%;
      float: left;
      min-width: 240px;
    }
  }

  .form {
    width: 55%;
    margin: 20px auto;

    p {
      margin: 0;
    }
  }
}
</style>