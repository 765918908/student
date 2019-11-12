<template>

  <section>

    <div class="scroll_wrapper" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
      <div v-for="(item , i) in list" :key="i" class="cell">

        <el-row type="flex" justify="space-around" class="cell-hd">
          <el-col>
            难度：{{formatLevel(item.level)}}
          </el-col>
          <el-col class="tr">

            <i v-if="item.collection_id == null" class="el-icon-plus fz20" @click="add(item.uuid,i)"></i>
            <span v-else>已收藏</span>
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
import { tikuList, addCollection, delCollection } from "@/api/tiku";
import { eleMessage } from "@/common/ele-again";

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
      tikuList(para).then(res => {
        this.total = res.data.count || 0;
        this.list.push(...(res.data.data || []));
      });
    },
    add(uuid, i) {
      const para = {
        tiku_uuid: uuid,
        subject_code: this.subject_code,
        from: "上海中学"
      };
      addCollection(para).then(res => {
        eleMessage({ msg: "收藏成功" });
        this.list[i].collection_id = 1;
      });
    }
    // del(uuid, i) {
    //   const para = {
    //     tiku_uuid: uuid
    //   };
    //   delCollection(para).then(res => {
    //     eleMessage({ msg: "取消收藏成功" });
    //     this.list[i].collection_id = null;
    //   });
    // }
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