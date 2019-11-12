<template>

  <section>
    <div class="list">
      <div class="item" :class="$store.state.subject_code==item.subject_code?'active':''" v-for="(item , i) in list" :key="i" @click="changeFilters(item.subject_code)">
        <img :src="item.subject_icon">
        <div class="lable">{{item.subject_name}}</div>
      </div>
    </div>

  </section>
</template>

<script>
import { getNumFromCourse } from "../../common/util";

import mixinList from "../../mixin/list";
import { subjectList } from "../../api/common";

export default {
  mixins: [mixinList],
  data() {
    return {
      isActive: false,
      currentRow: {}
    };
  },
  methods: {
    getList() {
      subjectList({ type: 3 }).then(res => {
        this.list = res.data;
      });
    },
    changeFilters(subject_code) {
      this.isActive = this.$store.state.subject_code == subject_code;
      this.$store.commit("setSubject", { subject_code: subject_code });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style scoped lang="scss">
@import "~scss_vars";

.list {
  border-bottom: 1px solid #ccc;
  padding: 0px 10px;
  display: flex;
}

.active {
  border-bottom: 2px solid #4b5cc4;
}
.item {
  flex: 1;
  text-align: center;
  padding: 3px 0px;
  img {
    width: 25px;
    height: 25px;
  }
  .lable {
    font-size: 12px;
    color: #4b5cc4;
  }
}
</style>