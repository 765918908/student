<template>

  <section style="display:none">

    <div>最新作业</div>
    <el-table :data="list" highlight-current-row @selection-change="selsChange">
      <el-table-column type="selection" min-width="10%">
      </el-table-column>
      <el-table-column prop="school_name" label="学校名称" min-width="10%">
      </el-table-column>
      <el-table-column prop="school_account" label="学校账号" min-width="10%">
      </el-table-column>
      <el-table-column prop="linkman" label="联系人" min-width="15%">
      </el-table-column>
      <el-table-column prop="phone" label="电话" min-width="15%">
      </el-table-column>
      <el-table-column label="操作" min-width="20%">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="showTeacherList(scope.row)">查看教师</el-button>
          <!-- <el-button type="primary" size="small" @click="showTeacherList(scope.row)">查看工资</el-button> -->
          <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <!-- <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

  </section>
</template>

<script>
import util from "../../../common/util";
import mixinList from "../../../mixin/list";
import { homeworkUsagesNewList } from "../../../api/main";

export default {
  mixins: [mixinList],
  data() {
    return {
      filters: {
        username: ""
      },
      listLoading: false,
      sels: [], //列表选中列

      editFormVisible: false, //编辑界面是否显示

      editLoading: false,
      //编辑界面数据
      editForm: {
        id: 0,
        username: "",
        age: 0
      },

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
      rules: {
        username: [
          { required: true, message: "请输入名字", trigger: "change" }
        ],
        phone: [
          {
            pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
            message: "手机号码格式不对",
            trigger: "change"
          }
        ],
        income: [{ required: true, message: "请输入工资", trigger: "change" }],
        duty: [{ required: true, message: "请输入职务", trigger: "change" }],
        hiredate: [
          { required: true, message: "请选择入职时间", trigger: "change" }
        ]
      },
      user: JSON.parse(sessionStorage.getItem("user"))
    };
  },
  methods: {
    showAdd: function() {
      this.$refs.com_addSchool.dialogVisible = true;
    },

    showTeacherList: function(row) {
      this.$refs.com_teacherList.dialogVisible = true;
      this.$refs.com_teacherList.school_id = row.id;
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

      homeworkUsagesNewList(para).then(res => {
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
    },

    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.editForm);
            para.hiredate =
              !para.hiredate || para.hiredate == ""
                ? ""
                : util.formatDate.format(new Date(para.hiredate), "yyyy/MM/dd");
            editUser(para).then(res => {
              this.editLoading = false;
              //NProgress.done();
              if (res.status) {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
              } else {
                this.$message({
                  message: res.msg,
                  type: "error"
                });
              }

              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getList();
            });
          });
        }
      });
    },

    selsChange: function(sels) {
      this.sels = sels;
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style scoped>
</style>