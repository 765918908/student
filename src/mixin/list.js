//列表页面混入
export default {
  data() {
    return {
      sels: [],
      list: [],
      total: 0,
      current_page: 1,
      busy: false
    }
  },
  created() {
    //console.log('666');
  },
  computed: {
    subject_code() {
      return this.$store.state.subject_code;
    },

  },
  watch: {
    subject_code(newVal, oldVal) {
      if (newVal != oldVal) {
        this.current_page = 1;
        this.list = [];
        this.getList();
      }
    }
  },
  mounted() { },
  methods: {
    selsChange: function (sels) {
      this.sels = sels;
    },
    loadMore: function () {
      if (this.list.length > 0) {
        //console.log("loadMore");
        this.busy = true;
        this.getList();
        this.current_page++;
        this.busy = false;
      }
    },
    // batchRemove: function () {
    //   var ids = this.sels.map(item => item.id).toString();
    //   this.$confirm("确认删除选中记录吗？", "提示", {
    //     type: "warning"
    //   })
    //     .then(() => {

    //       let para = { ids: ids };
    //       batchRemoveUser(para).then(res => {

    //         this.$message({
    //           message: "删除成功",
    //           type: "success"
    //         });
    //         this.getList();
    //       });
    //     })
    //     .catch(() => { });
    // },
  }



}
