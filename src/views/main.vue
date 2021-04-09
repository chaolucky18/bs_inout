<template>
  <el-container  class="height100">
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
      <el-aside class="height100" width="200px">
        <!-- 侧边栏菜单区域 -->
        <el-menu
          :unique-opened="false"
          default-active="Dashboard"
          :router="true"
        >
          <div v-for="item in routes" :key="item.name">
            <el-submenu v-if="item.children != undefined" :index="item.path">
              <template slot="title">
                <i :class="iconsObj[item.meta.id]"></i>
                <span slot="title">{{ item.meta.title }}</span>
              </template>
              <el-menu-item
                v-for="subItem in item.children"
                :key="subItem.name"
                :index="subItem.path"
              >
                <span>{{ subItem.meta.title }}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="item.path">
              <i :class="iconsObj[item.meta.id]"></i>
              <span slot="title">{{ item.meta.title }}</span>
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
        125: "el-icon-user-solid",
        103: "el-icon-location",
        101: "el-icon-s-data",
        102: "el-icon-info",
        145: "el-icon-s-custom",
        150: "el-icon-s-claim",
        151: "el-icon-s-comment"
      },
      isCollapse: false,
      navPath: "",
    };
  },
  created() {},
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
    }
  },
};
</script>

<style lang="scss" scoped>
.iconfont {
  margin-right: 10px;
}
.height100 {
  height: 100%;
}
.el-header {
  // background-color: #373d41;
  background-color: #455a64;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;

  div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #90a4ae;
  height: 100%;

  .el-menu {
    // background-color:#cfd8dc;
    box-sizing: border-box;

    .el-submenu {
      text-align: left;

      .el-menu {
        &-item {
          padding-left: 45px !important; 
          padding-right: 10px !important;
        }
      }
    }

    &-item {
      text-align: left;
      padding-left: 20px !important;
    }
  }
}

.el-main {
  background-color: #eaedf1;
}
.home-container {
  height: 100%;
}
</style>