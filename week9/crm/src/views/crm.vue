<template>
  <el-container>
    <my-aside :ary='option'></my-aside>
    <el-main>CRM</el-main>
  </el-container>
</template>
<script>
// @ is an alias to /src
import nav from '../components/nav.vue'
import option from '@/router/customer.js'
import ary from "@/router/org.js";
export default {
  name: "CRM",
  data() {
    return {
      option:option
    };
  },
  components: {
    'my-aside':nav
  },
};
</script>
<style lang="less">
</style>