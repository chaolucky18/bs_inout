<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="" alt />
        <span>小区管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 侧边栏 -->
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          :unique-opened="true"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409efe"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="navPath"
        >
          <div :key="item.path" v-for="item in routes">
            <el-submenu v-if="item.children != undefined" :index="item.path">
              <template slot="title">
                <i :class="iconsObj[item.meta.id]"></i>
                <span>{{ item.meta.title }}</span>
              </template>

              <el-menu-item
                v-for="subItem in item.children"
                :index="subItem.path"
                :key="subItem.path"
                @click="saveNavState(subItem.path)"
              >
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{ subItem.meta.title }}</span>
                </template>
              </el-menu-item>
            </el-submenu>

            <el-menu-item v-else @click="saveNavState(item.path)">
              <template slot="title">
                <i :class="iconsObj[item.meta.id]"></i>
                <span>{{ item.meta.title }}</span>
              </template>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <!-- 主体区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      iconsObj: {
        125: "iconfont icon-user",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },
      isCollapse: false,
      navPath: "",
    };
  },
  created() {
    this.navPath = window.sessionStorage.getItem("navPath");
  },
  computed: {
    // 左侧菜单：数据来源于router
    routes() {
      return this.$router.options.routes[1].children;
    },
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 点击按钮切换展开与折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      console.log(this.routes);
    },
    saveNavState(nav) {
      this.navPath = nav;
      this.$router.push(nav)
      window.sessionStorage.setItem("navPath", nav);
    },
  },
};
</script>

<style lang="css" scoped>
.iconfont {
  margin-right: 10px;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-header div {
  display: flex;
  align-items: center;
}
.el-header div span {
  margin-left: 15px;
}
.el-header div img {
  margin-left: 30px;
  margin-right: 10px;
  width: 50px;
}
.el-aside {
  background-color: #333744;
  height: 100%;
}
.el-menu {
  border-right: none;
}
.el-main {
  background-color: #eaedf1;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.home-container {
  height: 100%;
}
</style>