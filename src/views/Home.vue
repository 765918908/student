<template>
  <el-row class="container">

    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!-- 导航菜单
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router v-show="!collapsed">
          <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="!item.leaf">
              <template slot="title"><i :class="item.iconCls"></i>{{item.title}}</template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">
                {{child.title}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>
              <div>{{item.children[0].title}}</div>
            </el-menu-item>
          </template>
        </el-menu> -->

        <!--导航菜单-折叠后-->
        <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">

          <li class="el-submenu item">
            <div class="el-submenu__title" :class="$route.path=='/user/profile'?'is-active':''" @click="$router.push('/user/profile')"><i :class="'fa fa-address-card'"></i>
              <div>个人中心</div>
            </div>
          </li>

          <li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
            <template>
              <div class="el-submenu__title" :class="$route.path==item.path?'is-active':''" @click="$router.push(item.path)"><i :class="item.iconCls"></i>
                <div>{{item.title}}</div>
              </div>
            </template>
          </li>
        </ul>

      </aside>

      <div class="content-container">
        <div class="header" ref="header">
          <subject-list></subject-list>
          <div class='toolbar'>
            <el-row type="flex" justify="space-around">
              <el-col>
                <el-row type="flex" justify="space-end" class="nav">
                  <router-link :to="{name:item.name}" v-for="(item,i) in subMenu" :key="i">
                    <span>{{item.title}}</span>
                  </router-link>
                </el-row>
              </el-col>
              <el-col class="tr">
                <i v-if="currnetLeaf.needSearch" class="el-icon-search fz18"></i>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="grid-content bg-purple-light" :style="{marginTop: headerHeight+'px',height:windowHeight-headerHeight-20+'px'}">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </div>

    </el-col>
  </el-row>
</template>

<script>
import subjectList from "./common/subjectList";

export default {
  data() {
    return {
      sysName: "学生端",
      collapsed: true,
      sysUserName: "",
      sysUserAvatar: "",
      subMenu: [],
      currnetLeaf: {},
      headerHeight: "100",
      windowHeight: window.innerHeight,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  watch: {
    $route: "rebuildSubMenu"
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleopen() {
      //console.log('handleopen');
    },
    handleclose() {
      //console.log('handleclose');
    },
    handleselect: function(a, b) {},
    //退出登录
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem("user");
          _this.$router.push("/login");
        })
        .catch(() => {});
    },
    //折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed;
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    },
    rebuildSubMenu() {
      this.$nextTick(() => {
        this.headerHeight = this.$refs.header.offsetHeight;
      });

      const temp = this.$router.options.routes.filter(
        item => item.name == this.$route.path.split("/")[1]
      )[0];

      this.subMenu = temp.children || [];

      this.currnetLeaf = this.subMenu.filter(
        item => item.path == this.$route.path
      );
      this.currnetLeaf = this.currnetLeaf[0] || {};
    }
  },
  mounted() {
    var user = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.school_name || "";
      this.sysUserAvatar = user.avatar || "";
    }
  },
  components: {
    subjectList
  }
};
</script>
<style>
</style>

<style lang="scss">
@import "~scss_vars";
.router-link-active {
  color: #3263c9;
}
.grid-content {
  overflow: auto;
  background-color: #f0f0f0;
  padding: 10px;
}

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;

  .header {
    position: fixed;
    background-color: #fff;
    left: 80px;
    right: 0px;
    z-index: 2;
  }

  .main {
    display: flex;
    /* background: #324057; */
    position: absolute;
    top: 0px;
    bottom: 0px;
    overflow: hidden;

    aside {
      flex: 0 0 110px;
      width: 110px;

      // position: absolute;
      // top: 0px;
      // bottom: 0px;
      .el-menu {
        height: 100%;
      }

      .collapsed {
        width: 80px;

        .item {
          position: relative;
        }

        .submenu {
          position: absolute;
          top: 0px;
          left: 80px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }

    .menu-collapsed {
      flex: 0 0 80px;
      width: 80px;
    }

    .menu-expanded {
      flex: 0 0 80px;
      width: 80px;
    }

    .content-container {
      // background: #f1f2f7;
      color: #555;
      flex: 1;
      // position: absolute;
      // right: 0px;
      // top: 0px;
      // bottom: 0px;
      // left: 110px;
      overflow-y: scroll;

      .breadcrumb-container {
        //margin-bottom: 15px;
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }

        .breadcrumb-inner {
          float: right;
        }
      }

      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}

.toolbar {
  padding: 10px;
}

.nav {
  // border: 1px solid #4b5cc4;
  background-color: #fff;
  border-radius: 5px;
  z-index: 2;

  a {
    padding: 7px;
  }
}
</style>