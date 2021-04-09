<template>
  <div class="new">
    <h3>新建信息</h3>
    <el-input v-model="text.title" placeholder="请输入标题"></el-input>
    <div id="editor"></div>
    <button @click="save">保存</button>
  </div>
</template>

<script>
import E from "wangeditor";

export default {
  data() {
    return {
      editor: {},
      text: {
        title: '',
        content: '',
        author: ''
      }
    };
  },
  mounted() {
    const editor = new E("#editor");
    editor.config.height = 450;
    editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "lineHeight",
      "foreColor",
      "backColor",
      "link",
      "list",
      "todo",
      "justify",
      "quote",
      "table",
      "image",
      "code",
      "splitLine",
      "undo",
      "redo",
    ];
    editor.create();
    this.editor = editor;
  },
  methods: {
    async save() {
      // console.log(this.text.title,this.editor.txt.html());
      let t = this.text
      t.content = this.editor.txt.html()
      t.author = window.sessionStorage.getItem('token')
      if(t.title == "" || t.content == "") {
        this.$message.error('标题或内容不得为空！')
        return
      }
      else if(t.author == "") {
        this.$message.error('作者信息为空！请重新登录！')
        return
      }
      let { data: res } = await this.$http.post("newnews", t).then("", (err) => {
        this.$message.error("网络或服务器出错 " + err);
      });
      if (res.flag != 1) {
        this.$message.error(res.msg);
        return
      }
      this.$message.success('保存成功！')
      this.$router.push("/news")
    }
  },
};
</script>

<style lang="scss" scoped>
.new {
  margin: 25px auto;
  background-color: #fff;
  overflow: hidden;
  border-radius: 10px;
  padding-bottom: 20px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  min-width: 848px;

  button {
    cursor: pointer;
    width: 112px;
    height: 40px;
    line-height: 41px;
    line-height: 40px\9;
    background-color: #4e6ef2;
    border-radius: 10px;
    font-size: 17px;
    box-shadow: none;
    font-weight: 400;
    border: 0;
    outline: 0;
    letter-spacing: normal;
    text-align: center;
    color: white;
    font-size: 14px;
  }

  h3 {
    font-size: 28px;
    text-align: center;
  }

  #editor {
    height: 100%;
    width: 100%;
    margin: 20px auto;
  }
}
</style>