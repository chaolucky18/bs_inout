<template>
  <div class="news">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="title_box grid-content bg-purple">
          <!-- 文章栏 -->
          <div
            class="t_box"
            v-for="item in news"
            :key="item.id"
            @click="getNewsContent(item.id)"
          >
            <div class="t_box_content">
              <p :title="item.title">{{ item.title }}</p>
            </div>
            <div class="t_box_time">
              <span>{{ item.time | date }}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-light">
          <!-- 内容栏 -->
          <div class="c_title">
            <h3>{{ newsCtt.title }}</h3>
            <p>
              {{ newsCtt.time | datetime }}
              <span style="margin-left: 10px">{{ newsCtt.author }}</span>
            </p>
          </div>
          <div v-html="newsCtt.text" class="c_ctt"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import "../../assets/css/editor.scss";

export default {
  data() {
    return {
      news: {},
      newsCtt: {
        title: "",
        time: "",
        text: "",
        author: "",
      },
    };
  },
  mounted() {
    document.title = this.$route.meta.title;
    this.getNews();
    setTimeout(() => {
      this.getNewsContent(this.news[0].id);
    }, 500);
  },
  methods: {
    async getNews() {
      let { data: res } = await this.$http.get("news").then("", (err) => {
        this.$message.error("网络或服务器出错 " + err);
      });
      if (res.flag != 1) {
        this.$message.error(res.msg);
      }
      this.news = res.data;
    },
    getNewsContent(id) {
      // console.log(id)
      this.news.forEach((item) => {
        if (item.id == id) {
          this.newsCtt = {
            title: item.title,
            time: item.time,
            text: item.content,
            author: item.author,
          };
        }
      });
    },
  },
  filters: {
    datetime(val) {
      if (val == "") {
        return "";
      }
      let a = val.split("T");
      let aTime = a[1].toString().split(".");
      return a[0] + " " + aTime[0];
    },
    date(val) {
      let a = val.split("T");
      return a[0].slice(5);
    },
  },
};
</script>

<style lang="scss" scoped>
// @import url('../../assets/css/editor.scss');
.news {
  margin: 25px auto;
  background-color: #fff;
  overflow: hidden;
  border-radius: 10px;
  padding-bottom: 20px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  min-width: 848px;

  .el-row {
    .title_box {
      // min-width: 410px;
      padding: 20px 00px;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;

      .t_box {
        // overflow: hidden;
        padding: 10px 0px;
        border-bottom: 1px solid #ccc;
        position: relative;
        cursor: pointer;
        &:hover {
          background-color: #d3dce6;
        }

        &_content {
          padding: 3px 50px 3px 20px;
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        &_time {
          font-size: 12px;
          // display: none;
          position: absolute;
          bottom: 15px;
          right: 10px;
        }
        p {
          margin: 0;
        }
      }
      .c_title {
        padding-top: 40px;
        padding-bottom: 10px;
        h3 {
          margin: 0;
          text-align: center;
          font-size: 28px;
        }
        p {
          text-align: center;
          color: gray;
          font-size: 12px;
        }
      }
      .c_ctt {
        white-space: pre-line;
        padding: 20px;
        padding-bottom: 40px;
      }
    }
    .bg-purple {
      // background: #d3dce6;
      background: #e5e9f2;
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
  }
}
</style>

<style src="../../assets/css/editor.scss" lang="scss"></style>
