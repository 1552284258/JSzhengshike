<template>
  <div style="padding:0 50px">
    <h1>{{data.til}}</h1>
    <loop v-for="i in data.children" :data="i" :key="i.til"></loop>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "loop",
  props: ["data"],
  data() {
    return {};
  },
  components: {}
};
</script>
<style lang="less">
</style>