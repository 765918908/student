<template>

  <section>

    <div class="scroll_wrapper" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
      <div v-for="(item , i) in list" :key="i" class="cell">

        <el-row type="flex" justify="space-around" class="cell-hd">
          <el-col>
            难度：{{formatLevel(item.level)}}
          </el-col>
          <el-col class="tr">
            <i class="el-icon-delete fz18" @click="del(item.uuid,i)"></i>
          </el-col>
        </el-row>

        <div class="cell-bd" v-html="item.content" @click="showHide(i)"></div>
        <div class="cell-ft" ref="cell_ft">
          <div>
            答案： <div v-html="item.answer"></div>
          </div>
          <div>
            分析：<div v-html="item.analyzing"></div>
          </div>
        </div>

      </div>
    </div>
    <div v-if="list.length==0" class="tc">
      暂无数据！
    </div>
  </section>
</template>

<script>
import { deepObjectMerge } from "@/common/util";
import mixinList from "@/mixin/list";
import mixinModule from "@/views/tiku/common/mixin";
import { collectionList, delCollection } from "@/api/tiku";
import { eleCofirm } from "@/common/ele-again";

export default {
  mixins: [deepObjectMerge(mixinModule, mixinList)],
  data() {
    return {};
  },

  methods: {
    getList() {
      let para = {
        current_page: this.current_page,
        // status: 1,
        subject_code: this.subject_code
      };
      collectionList(para).then(res => {
        this.total = res.data.count || 0;
        this.list.push(...(res.data.data || []));
      });
    },
    del(uuid, i) {
      eleCofirm("确认要取消该收藏吗？").then(res => {
        const para = {
          tiku_uuid: uuid
        };
        delCollection(para).then(res => {
          this.list.splice(i, 1);
        });
      });
    }
  },

  mounted() {
    this.getList();
  }
};
</script>

<style>
.cell-bd img {
  vertical-align: middle;
}
</style>
<style scoped lang="scss">
</style>
<style scoped src="./common/css.css">