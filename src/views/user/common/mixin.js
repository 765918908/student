
export default {
  data() {

  },
  created() {

  },
  mounted() { },
  methods: {
    formatLevel: function (level) {
      const map = ['一星', '二星', '三星', '四星', '五星'];
      if (level > 5 || level < 1) {
        return '没表示难度';
      } else {
        return map[level - 1];
      }
    },
    showHide(index) {
      const node = this.$refs.cell_ft[index];
      if (node.style.display === "none") {
        node.style.display = "block";
      } else {
        node.style.display = "none";
      }
    },
  }



}
