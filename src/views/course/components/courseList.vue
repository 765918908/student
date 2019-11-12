<template>

  <section>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
      <div v-for="(item , i) in list" :key="i" class="cell">
        <div>{{item.date}}</div>
        <el-table :data="item.list" border highlight-current-row @selection-change="selsChange">

          <el-table-column prop="subject_code" label="学科" min-width="10%">
          </el-table-column>
          <el-table-column prop="title" label="名称" min-width="30%">
          </el-table-column>

          <el-table-column prop="content" label="课前" min-width="10%">
            <template slot-scope="scope">
              作： {{getNumFromCourse(scope.row.content,["b", "uuid"])}}
              <br />
              资： {{getNumFromCourse(scope.row.content,["b", "f"])}}
            </template>
          </el-table-column>

          <el-table-column prop="content" label="课前" min-width="10%">
            <template slot-scope="scope">
              作：{{getNumFromCourse(scope.row.content,["m", "uuid"])}}
              <br />
              资： {{getNumFromCourse(scope.row.content,["m", "f"])}}
            </template>
          </el-table-column>

          <el-table-column prop="content" label="课前" min-width="10%">
            <template slot-scope="scope">
              作： {{getNumFromCourse(scope.row.content,["a", "uuid"])}}
              <br />
              资： {{getNumFromCourse(scope.row.content,["a", "f"])}}
            </template>
          </el-table-column>

          <el-table-column prop="endtime" label="截止时间" min-width="13%">
            <template slot-scope="scope">
              {{gMixinSpliTimeStr(scope.row.endtime)}}
            </template>
          </el-table-column>

          <el-table-column label="操作" min-width="10%">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="showTeacherList(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-if="list.length==0" class="tc">
      暂无数据！
    </div>
  </section>
</template>

<script>
import { getNumFromCourse } from "@/common/util";

import mixinList from "@/mixin/list";
import { courseUsagesList } from "@/api/course";

export default {
  mixins: [mixinList],
  data() {
    return {
      table_th: {
        backgroundColor: "#EEF4FB",
        color: "#666"
      }
    };
  },

  methods: {
    getList() {
      let para = {
        current_page: this.current_page,

        subject_code: this.subject_code
      };
      courseUsagesList(para).then(res => {
        if (res.code) {
          this.total = res.data.count || 0;
          this.list.push(...(res.data.data || []));
        }
      });
    },

    getNumFromCourse(details, chain) {
      return getNumFromCourse(details, chain);
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style scoped>
.cell {
  margin-bottom: 10px;
}
</style>