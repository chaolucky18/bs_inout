<template>
  <div class="new-user">
    <h4>新增用户</h4>
    <el-steps :active="safeStep" align-center>
      <el-step title="个人" description="填写个人基本信息">
        <!-- 步骤一 -->
      </el-step>
      <el-step title="居住" description="填写居住信息">
        <!-- 步骤二 -->
      </el-step>
      <el-step title="检查" description="确认填写信息无误">
        <!-- 步骤三 -->
      </el-step>
    </el-steps>
    <div class="form">
      <div class="form-step" v-if="safeStep == 1">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="姓名">
            <el-input
              v-model="form.name"
              placeholder="请输入您的姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input
              v-model="form.phone"
              placeholder="请输入您的联系方式"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="step++">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="form-step" v-if="safeStep == 2">
        <el-form ref="form" :model="form" label-width="80px">
          <!-- 2 -->
          <el-form-item label="楼栋">
            <el-input
              v-model="form.building"
              placeholder="填写您所在的楼栋号"
            ></el-input>
          </el-form-item>
          <el-form-item label="单元">
            <el-input
              v-model="form.unit"
              placeholder="填写您居住的单元"
            ></el-input>
          </el-form-item>
          <el-form-item label="房间号">
            <el-input
              v-model="form.room"
              placeholder="填写您的具体房间号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="step++">下一步</el-button>
            <el-button @click="step--">上一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="form-step" v-if="safeStep == 3">
        <el-form ref="form" :model="form" label-width="80px">
          <!-- 3 -->
          <el-form-item label="姓名"
            ><p>{{ form.name }}</p></el-form-item
          >
          <el-form-item label="性别"
            ><p>{{ form.sex == "0" ? "女" : "男" }}</p></el-form-item
          >
          <el-form-item label="联系方式"
            ><p>{{ form.phone }}</p></el-form-item
          >
          <el-form-item label="楼栋号"
            ><p>{{ form.building }}</p></el-form-item
          >
          <el-form-item label="单元"
            ><p>{{ form.unit }}</p></el-form-item
          >
          <el-form-item label="房间号"
            ><p>{{ form.room }}</p></el-form-item
          >
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="step--">上一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      form: {
        name: "",
        sex: "1",
        phone: "",
        building: "",
        unit: "",
        room: ""
      },
    };
  },
  computed: {
    safeStep() {
      if (this.step > 3 || this.step < 1) {
        this.step = 1;
      }
      return this.step;
    },
  },
  methods: {
    async onSubmit() {
      console.dir(this.form);
      let f = this.form;
      if (
        f.name == "" ||
        f.sex == "" ||
        f.phone == "" ||
        f.building == "" ||
        f.unit == "" ||
        f.room == ""
      ) {
        this.$message.error('表单不应有空，请检查所填写内容！')
        return
      }
      let { data: res } = await this.$http.post('/new_resident', this.form).then("", (err) => {
        this.$message.error("网络或服务器出错 " + err);
      })
      if(res.flag != 1) {
        this.$message.error(res.msg)
        return
      }
      this.$message.success("提交成功！")
      this.step = 1
      this.form = {
        name: "",
        sex: "1",
        phone: "",
        building: "",
        unit: "",
        room: ""
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.new-user {
  background-color: white;
  box-shadow: 0 0 10px 0px #ccc;
  padding: 15px;
  border-radius: 10px;
  min-width: 848px;

  h4 {
    margin: 0;
    padding: 5px 0 25px;
    font-size: 20px;
    text-align: center;
  }
  .el-steps {
    margin-bottom: 35px;
  }
  .form {
    width: 55%;
    margin: 0 auto;
    .form-step {
      p {
        margin: 0 0 0 20px;
      }
    }
  }
}
</style>