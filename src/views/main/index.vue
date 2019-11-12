<template>
  <section>

    <homework-list ref="com_homeworkList" @afterAdd='refreshPage'></homework-list>

  </section>
</template>

<script>
import util from "../../common/util";

// import addSchool from "./addSchool";
import homeworkList from "./components/homeworkList";
//import NProgress from 'nprogress'

export default {
  data() {
    return {
      filters: {
        username: ""
      },
      listLoading: false,

      addFormVisible: false, //新增界面是否显示
      addBatchFormVisible: false,
      addLoading: false,
      //新增界面数据
      addForm: {
        username: "",
        sex: -1,
        age: 0
      },
      //数据校验

      user: JSON.parse(sessionStorage.getItem("user"))
    };
  },
  methods: {
    showAdd: function() {
      //this.$refs.com_addSchool.dialogVisible = true;
    },

    showhomeworkList: function(row) {
      this.$refs.com_homeworkList.dialogVisible = true;
      this.$refs.com_homeworkList.school_id = row.id;
    },
    refreshPage: function() {
      this.getList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    getList() {
      let para = {
        page: this.page,
        //name: this.filters.name
        school_id: this.user.id
      };

      getSchoolList(para).then(res => {
        if (res.status) {
          this.total = res.data.count;
          this.list = res.data;
        } else {
        }
      });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          let para = { id: row.id };
          removeUser(para).then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getList();
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    //this.getList();
  },
  components: {
    // addSchool,
    homeworkList
  }
};
</script>

<style scoped>
</style>