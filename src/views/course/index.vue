<template>
  <section>

    <course-list ref="com_courseList"></course-list>

  </section>
</template>

<script>
import courseList from "./components/courseList";

export default {
  data() {
    return {};
  },
  components: {
    courseList
  }
};
</script>

<style scoped>
</style>