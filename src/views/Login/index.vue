<template>
  <div class="login_container">
    <div class="login_background" :class="{ background_css: isBackCss }"></div>
    <div class="login_box">
      <!-- 登陆表单 -->
      <div class="title">小区进出管理系统</div>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        label-width="0px"
        class="login_form"
        @keyup.enter="submit"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            @focus="/*handleClickBlur(true)*/"
            @blur="/*handleClickBlur(false)*/"
            placeholder="请输入账号"
            prefix-icon="iconfont icon-user"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="passwd">
          <el-input
            @focus="/*handleClickBlur(true)*/"
            @blur="/*handleClickBlur(false)*/"
            type="password"
            placeholder="请输入密码"
            prefix-icon="iconfont icon-3702mima"
            v-model="loginForm.passwd"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="submit">登陆</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  prop: ["form"],
  data() {
    return {
      // 这是登陆表单的数据绑定对象
      loginForm: {
        username: "admin",
        passwd: "123456789",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        passwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
      isBackCss: true, // 背景模糊控制
    };
  },
  methods: {
    submit() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return false;
        let { data: res } = await this.$http
          .post("login", this.loginForm)
          .then("", (err) => {
            this.$message.error("网络或服务器出错 " + err);
          });
        // 登陆出错
        if(res.flag == 0) {
          if(res.msg == "数据为空") {
            this.$message.error('用户名或密码错误！')
            return
          }
          this.$message.error(res.msg)
          return
        }
        this.$message.success("登陆成功");
        // 将用户名写入至sessionStorage
        window.sessionStorage.setItem("token", res.data[0].username);
        window.sessionStorage.setItem("guardId", res.data[0].id);
        // 页面跳转
        this.$router.push("/home");
      });
    },
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    handleClickBlur(data) {
      this.isBackCss = data;
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
$url: "http://47.103.144.215:2020/showtoday";
$src: "../../assets/th.jpg";

.background_css {
  filter: blur(8px) brightness(0.6) !important;
}

.login_container {
  height: 100%;
  overflow: hidden;

  .login_background {
    transition: 400ms ease all;
    position: absolute;
    z-index: -1;
    height: 100%;
    width: 100%;
    background-image: url($src);
    background-position: center center;
    background-size: cover;
    filter: blur(0px) brightness(0.95);
  }
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .title {
      font-size: 24px;
      font-weight: bold;
      height: 100px;
      line-height: 100px;
      user-select: none;
      text-align: center;
    }
  }
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 10px 20px 10px 20px;
    box-sizing: border-box;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
}
</style>