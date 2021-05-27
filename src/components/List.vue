<template>
  <ul>
    <li v-for="(value, index) in fluttened" :key="index">{{ value }}</li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      fluttened: [],
    };
  },

  computed: {
    parseData() {
      return this.$store.state.selected;
    },
  },

  watch: {
    parseData() {
      this.fluttened = this.parseData;
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  width: 30%;
  border: 1px solid grey;
}
li {
  margin-bottom: 10px;
}
</style>